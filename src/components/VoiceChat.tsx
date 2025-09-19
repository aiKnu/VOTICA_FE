'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, Loader2, Send, X, Play, Pause } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  text: string
  audioUrl?: string
  timestamp: Date
}

export default function VoiceChat() {
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
const [conversationState, setConversationState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle')

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const autoRecordTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoStopTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 브라우저별 최적 MIME 타입 선택
  const getBestMimeType = (): string => {
    const types = [
      'audio/webm;codecs=opus',  // Chrome, Edge
      'audio/ogg;codecs=opus',    // Firefox
      'audio/mp4',                // Safari
      'audio/wav'                 // Fallback
    ]

    for (const type of types) {
      if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
        return type
      }
    }
    return 'audio/webm'
  }

  // WebM/Opus를 WAV로 변환
  const convertToWav = async (webmBlob: Blob): Promise<Blob> => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 })
    const arrayBuffer = await webmBlob.arrayBuffer()

    try {
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

      // WAV 헤더 생성
      const length = audioBuffer.length
      const buffer = new ArrayBuffer(length * 2 + 44)
      const view = new DataView(buffer)

      // WAV 헤더 작성
      const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i))
        }
      }

      writeString(0, 'RIFF')
      view.setUint32(4, length * 2 + 36, true)
      writeString(8, 'WAVE')
      writeString(12, 'fmt ')
      view.setUint32(16, 16, true) // fmt chunk size
      view.setUint16(20, 1, true) // PCM format
      view.setUint16(22, 1, true) // mono
      view.setUint32(24, 16000, true) // sample rate
      view.setUint32(28, 32000, true) // byte rate (16000 * 2)
      view.setUint16(32, 2, true) // block align
      view.setUint16(34, 16, true) // bits per sample
      writeString(36, 'data')
      view.setUint32(40, audioBuffer.length * 2, true)

      // PCM 데이터 작성
      const channelData = audioBuffer.getChannelData(0)
      let offset = 44
      for (let i = 0; i < channelData.length; i++) {
        const sample = Math.max(-1, Math.min(1, channelData[i]))
        view.setInt16(offset, sample * 0x7FFF, true)
        offset += 2
      }

      return new Blob([buffer], { type: 'audio/wav' })
    } catch (error) {
      console.error('WAV 변환 실패:', error)
      return webmBlob // 변환 실패시 원본 반환
    }
  }

  // 대화 세션 시작
  const startSession = async () => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') {
      console.error('Server side - cannot access browser APIs')
      return
    }

    // navigator API 체크
    if (!navigator?.mediaDevices?.getUserMedia) {
      setError('이 브라우저는 음성 녹음을 지원하지 않습니다. Chrome, Firefox, 또는 Safari를 사용해주세요.')
      console.error('getUserMedia not supported')
      return
    }

    try {
      console.log('마이크 권한 요청 중...')
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,        // 모노
          sampleRate: 16000,      // 16kHz (Google STT 권장)
          sampleSize: 16,         // 16-bit
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      console.log('마이크 권한 획득 성공')
      streamRef.current = stream
      setIsSessionActive(true)
      setError('')
      setConversationState('listening')

      // 환영 메시지
      setMessages([{
        id: Date.now().toString(),
        type: 'ai',
        text: '안녕하세요! 무엇을 도와드릴까요? 말씀해주세요.',
        timestamp: new Date()
      }])

      // 즉시 첫 번째 녹음 시작
      setTimeout(() => {
        startRecording()
      }, 1000) // 1초 후 자동 시작
    } catch (err: any) {
      console.error('getUserMedia error:', err)

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('마이크 권한이 필요합니다. 브라우저 설정에서 마이크 권한을 허용해주세요.')
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('마이크를 찾을 수 없습니다. 마이크가 연결되어 있는지 확인해주세요.')
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('마이크가 다른 앱에서 사용 중입니다. 다른 앱을 종료 후 다시 시도해주세요.')
      } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
        setError('마이크 설정이 지원되지 않습니다. 다시 시도해주세요.')
      } else if (err.name === 'TypeError' || !navigator.mediaDevices) {
        setError('HTTPS 연결이 필요합니다. https:// 또는 localhost에서 접속해주세요.')
      } else {
        setError('마이크 접근에 실패했습니다: ' + (err.message || err.name || '알 수 없는 오류'))
      }
    }
  }

  // 대화 세션 종료
  const endSession = () => {
    // 자동 녹음 타이머 취소
    cancelAutoRecording()

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
    }
    setIsSessionActive(false)
    setIsRecording(false)
    setIsProcessing(false)
    setConversationState('idle')
  }

  // 녹음 시작
  const startRecording = useCallback(async () => {
    if (!streamRef.current) return

    // 자동 녹음 타이머 취소 (수동 녹음 시작 시)
    cancelAutoRecording()

    try {
      const mimeType = getBestMimeType()
      const options: MediaRecorderOptions = { mimeType }
      const recordingStartTime = Date.now()

      mediaRecorderRef.current = new MediaRecorder(streamRef.current, {
        ...options,
        audioBitsPerSecond: 128000
      })
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = async () => {
        const recordingDuration = Date.now() - recordingStartTime
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType })

        // 파일 크기 및 녹음 시간 확인
        console.log('Audio size:', audioBlob.size, 'bytes')
        console.log('Recording duration:', recordingDuration, 'ms')

        if (audioBlob.size < 1000) {
          setError('오디오 파일이 너무 작습니다. 녹음이 제대로 되었는지 확인하세요.')
          setConversationState('listening')
          startAutoRecordingCountdown() // 실패 시 다시 시도
          return
        }

        if (recordingDuration < 500) {
          setError('녹음 시간이 너무 짧습니다. 최소 0.5초 이상 녹음해주세요.')
          setConversationState('listening')
          startAutoRecordingCountdown() // 실패 시 다시 시도
          return
        }

        setConversationState('processing')
        await sendToServer(audioBlob)
      }

      mediaRecorderRef.current.start(100)
      setIsRecording(true)
      setError('')

      // 10초 후 자동으로 녹음 종료
      autoStopTimeoutRef.current = setTimeout(() => {
        if (mediaRecorderRef.current && isRecording) {
          console.log('자동 녹음 종료 (10초)')
          stopRecording()
        }
      }, 10000)
    } catch (err) {
      setError('녹음을 시작할 수 없습니다.')
      console.error(err)
      setConversationState('listening')
      startAutoRecordingCountdown() // 실패 시 다시 시도
    }
  }, [])

  // 녹음 중지
  const stopRecording = useCallback(() => {
    // 자동 종료 타이머 클리어
    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current)
      autoStopTimeoutRef.current = null
    }

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }, [isRecording])

  // 서버로 전송 및 응답 처리
  const sendToServer = async (audioBlob: Blob) => {
    setIsProcessing(true)
    setError('')

    try {
      // WAV로 변환
      const wavBlob = await convertToWav(audioBlob)

      // 파일 크기 확인 (디버깅용)
      console.log('WAV file size:', wavBlob.size, 'bytes')

      if (wavBlob.size < 1000) {
        console.error('오디오 파일이 너무 작습니다. 녹음이 제대로 되었는지 확인하세요.')
        setError('오디오 파일이 너무 작습니다. 다시 시도해주세요.')
        setIsProcessing(false)
        return
      }

      const formData = new FormData()
      formData.append('file', wavBlob, 'recording.wav')
      formData.append('language', 'ko-KR')

      // API 호출
      const response = await fetch('/api/voice-assistant', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.text()
        console.error('서버 오류:', error)
        throw new Error(`서버 오류: ${response.status}`)
      }

      // 음성 응답 처리 (서버가 MP3 오디오 직접 반환)
      const audioData = await response.blob()
      const audioUrl = URL.createObjectURL(audioData)

      // 메시지 추가
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: '음성 입력',
        timestamp: new Date()
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: 'AI 음성 응답',
        audioUrl: audioUrl,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage, aiMessage])

      setConversationState('processing')

      // 음성 자동 재생
      const audio = new Audio(audioUrl)
      audio.onended = () => {
        setIsPlaying(false)
        setConversationState('listening')
        // AI 응답 완료 후 자동으로 다음 녹음 준비
        startAutoRecordingCountdown()
      }
      setIsPlaying(true)
      setConversationState('speaking')
      await audio.play()

    } catch (err) {
      setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다')
      console.error('전송 실패:', err)
      setConversationState('listening')
    } finally {
      setIsProcessing(false)
    }
  }

  // 자동 녹음 카운트다운 시작
  const startAutoRecordingCountdown = () => {
    // 기존 타이머가 있으면 클리어
    if (autoRecordTimeoutRef.current) {
      clearTimeout(autoRecordTimeoutRef.current)
    }

    // 1초 후 자동으로 다음 녹음 시작
    autoRecordTimeoutRef.current = setTimeout(() => {
      if (isSessionActive && !isRecording && !isProcessing) {
        console.log('자동 녹음 시작')
        startRecording()
      }
    }, 1000)
  }

  // 자동 녹음 카운트다운 취소
  const cancelAutoRecording = () => {
    if (autoRecordTimeoutRef.current) {
      clearTimeout(autoRecordTimeoutRef.current)
      autoRecordTimeoutRef.current = null
    }
  }

  // 오디오 재생 제어
  const togglePlayAudio = (audioUrl: string) => {
    if (!audioRef.current) return

    if (audioRef.current.src === audioUrl && !audioRef.current.paused) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  // 오디오 재생 완료 이벤트
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false)
    }
  }, [])

  // 컴포넌트 언마운트 시 클린업
  useEffect(() => {
    return () => {
      // 모든 타이머 클린업
      cancelAutoRecording()
      if (autoStopTimeoutRef.current) {
        clearTimeout(autoStopTimeoutRef.current)
      }

      // 미디어 스트림 정리
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }

      // MediaRecorder 정리
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            AI 음성 대화
          </h1>
          <p className="text-gray-400">AI와 자연스러운 음성 대화를 나눠보세요</p>
        </motion.div>

        {/* 메인 대화 영역 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6"
        >
          {!isSessionActive ? (
            /* 시작 화면 */
            <div className="text-center py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 mb-6"
              >
                <Mic className="w-16 h-16 text-white" />
              </motion.div>

              <h2 className="text-2xl font-semibold mb-4">대화를 시작하시겠습니까?</h2>
              <p className="text-gray-400 mb-8">마이크 권한이 필요합니다</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startSession}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                대화 시작
              </motion.button>
            </div>
          ) : (
            /* 대화 화면 */
            <div>
              {/* 대화 내역 */}
              <div className="h-[400px] overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.type === 'user' ? 'order-1' : ''}`}>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                            : 'bg-gray-800 text-gray-100'
                        }`}>
                          <p className="text-sm font-medium mb-1">
                            {message.type === 'user' ? '나' : 'AI'}
                          </p>
                          <p>{message.text}</p>

                          {message.audioUrl && (
                            <button
                              onClick={() => togglePlayAudio(message.audioUrl!)}
                              className="mt-2 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            >
                              {isPlaying && audioRef.current?.src === message.audioUrl ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-800 rounded-2xl px-4 py-3 flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      <span className="text-gray-400">AI가 생각중...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 에러 메시지 */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* 상태 표시 및 컨트롤 */}
              <div className="text-center space-y-4">
                {/* 상태 시각적 표시 */}
                <div className="flex items-center justify-center">
                  {conversationState === 'listening' && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
                    >
                      <Volume2 className="w-8 h-8 text-white" />
                    </motion.div>
                  )}

                  {isRecording && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center"
                    >
                      <Mic className="w-8 h-8 text-white" />
                    </motion.div>
                  )}

                  {conversationState === 'processing' && (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}

                  {conversationState === 'speaking' && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                    >
                      <Volume2 className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* 대화 종료 버튼 */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={endSession}
                  className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-all"
                >
                  대화 종료
                </motion.button>
              </div>

              <p className="text-center text-gray-500 text-sm mt-4">
                {conversationState === 'listening' && '🎧 잠시 후 녹음이 시작됩니다...'}
                {isRecording && '🎙️ 녹음 중... 말씀해주세요 (최대 10초)'}
                {conversationState === 'processing' && '🤖 AI가 답변을 생성하고 있습니다...'}
                {conversationState === 'speaking' && '🔊 AI가 답변하고 있습니다...'}
                {conversationState === 'idle' && '대화를 시작해주세요'}
              </p>
            </div>
          )}
        </motion.div>

        {/* 사용 안내 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>💡 팁: 조용한 환경에서 명확하게 말씀해주시면 더 정확한 인식이 가능합니다</p>
        </motion.div>
      </div>

      {/* 오디오 플레이어 (숨김) */}
      <audio ref={audioRef} className="hidden" />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #06b6d4, #a855f7);
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}