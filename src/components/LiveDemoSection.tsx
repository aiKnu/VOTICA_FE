'use client'

import { useState, useRef, useCallback } from 'react'

export default function LiveDemoSection() {
  const [isListening, setIsListening] = useState(false)
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)
  const [conversation, setConversation] = useState([])
  const [currentStep, setCurrentStep] = useState('waiting') // waiting, listening, processing, speaking
  const [transcript, setTranscript] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const streamRef = useRef(null)

  // 브라우저별 최적 MIME 타입 선택
  const getBestMimeType = () => {
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
  const convertToWav = async (webmBlob) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 })
    const arrayBuffer = await webmBlob.arrayBuffer()

    try {
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

      // WAV 헤더 생성
      const length = audioBuffer.length
      const buffer = new ArrayBuffer(length * 2 + 44)
      const view = new DataView(buffer)

      // WAV 헤더 작성
      const writeString = (offset, string) => {
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

  // 실제 녹음 시작
  const startRecording = useCallback(async () => {
    if (!streamRef.current) return

    try {
      const mimeType = getBestMimeType()
      const options = { mimeType }
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

        console.log('Audio size:', audioBlob.size, 'bytes')
        console.log('Recording duration:', recordingDuration, 'ms')

        if (audioBlob.size < 1000) {
          setError('오디오 파일이 너무 작습니다. 녹음이 제대로 되었는지 확인하세요.')
          setCurrentStep('waiting')
          return
        }

        if (recordingDuration < 500) {
          setError('녹음 시간이 너무 짧습니다. 최소 0.5초 이상 녹음해주세요.')
          setCurrentStep('waiting')
          return
        }

        // 서버로 전송
        await sendToServer(audioBlob)
      }

      mediaRecorderRef.current.start(100)
      setIsRecording(true)
      setError('')
      console.log('녹음 시작됨')
    } catch (err) {
      setError('녹음을 시작할 수 없습니다.')
      console.error(err)
      setCurrentStep('waiting')
    }
  }, [])

  // 서버로 전송 및 응답 처리
  const sendToServer = async (audioBlob) => {
    setCurrentStep('processing')
    setIsProcessing(true)
    setError('')

    try {
      // WAV로 변환
      const wavBlob = await convertToWav(audioBlob)

      console.log('WAV file size:', wavBlob.size, 'bytes')

      if (wavBlob.size < 1000) {
        console.error('오디오 파일이 너무 작습니다.')
        setError('오디오 파일이 너무 작습니다. 다시 시도해주세요.')
        setIsProcessing(false)
        setCurrentStep('waiting')
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
      const userMessage = {
        type: 'user',
        text: '음성 입력',
        timestamp: new Date()
      }

      const aiMessage = {
        type: 'ai',
        text: 'AI 음성 응답',
        audioUrl: audioUrl,
        timestamp: new Date()
      }

      setConversation(prev => [...prev, userMessage, aiMessage])

      // 음성 자동 재생
      setCurrentStep('speaking')
      setIsAiSpeaking(true)
      const audio = new Audio(audioUrl)
      audio.onended = () => {
        setIsAiSpeaking(false)
        setCurrentStep('waiting')
      }
      await audio.play()

    } catch (err) {
      setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다')
      console.error('전송 실패:', err)
      setCurrentStep('waiting')
    } finally {
      setIsProcessing(false)
    }
  }

  const startConversation = async () => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') {
      console.error('Server side - cannot access browser APIs')
      setError('서버 사이드에서는 마이크에 접근할 수 없습니다.')
      return
    }

    // 더 안전한 navigator API 체크
    if (typeof navigator === 'undefined') {
      setError('브라우저 환경이 감지되지 않습니다.')
      console.error('Navigator not available')
      return
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('음성 녹음을 사용하려면 HTTPS 환경이 필요합니다. http://localhost:3000 으로 접속하거나 HTTPS를 사용해주세요.')
      console.error('MediaDevices not available - HTTPS required')
      return
    }

    // HTTPS 확인 - IP 주소는 localhost로 안내
    const isSecureContext = location.protocol === 'https:' ||
                           location.hostname === 'localhost' ||
                           location.hostname === '127.0.0.1'

    if (!isSecureContext) {
      setError('음성 녹음을 사용하려면 http://localhost:3000 으로 접속하거나 HTTPS를 사용해주세요.')
      console.error('Secure context required for getUserMedia')
      return
    }

    try {
      console.log('마이크 권한 요청 중...')

      // 기본 오디오 제약 조건 (표준 속성들)
      const audioConstraints = {
        channelCount: 1,        // 모노
        sampleRate: 16000,      // 16kHz (Google STT 권장)
        sampleSize: 16,         // 16-bit
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }

      // Chrome 브라우저에서만 Google 전용 속성 추가
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
      if (isChrome) {
        // Chrome 전용 속성들을 동적으로 추가
        Object.assign(audioConstraints, {
          googEchoCancellation: true,
          googAutoGainControl: true,
          googNoiseSuppression: true,
          googHighpassFilter: true
        })
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints
      })

      console.log('마이크 권한 획득 성공')
      streamRef.current = stream
      setError('')

      // 환영 메시지
      setConversation([{
        type: 'ai',
        text: '안녕하세요! 무엇을 도와드릴까요? 말씀해주세요.',
        timestamp: new Date()
      }])

      // 즉시 녹음 시작
      setCurrentStep('listening')
      await startRecording()

    } catch (err) {
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

  const startListening = async () => {
    // 새로운 녹음 시작
    if (streamRef.current) {
      setCurrentStep('listening')
      await startRecording()
    }
  }

  const stopConversation = () => {
    // 녹음 중단하고 API 호출
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    } else {
      setCurrentStep('waiting')
    }
  }

  const resetDemo = () => {
    setConversation([])
    setCurrentStep('waiting')
    setIsListening(false)
    setIsAiSpeaking(false)
    setTranscript('')
  }

  const getStatusText = () => {
    if (isRecording) return '🎤 녹음 중...'
    switch (currentStep) {
      case 'listening': return '🎤 듣고 있어요...'
      case 'processing': return '🤖 분석 중...'
      case 'speaking': return '🗣️ AI 응답 중...'
      default: return '대화 준비 완료'
    }
  }

  // 정리 함수
  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null
    }
    setIsRecording(false)
    setIsProcessing(false)
    setCurrentStep('waiting')
  }

  return (
    <section id="demo" className="live-demo-section">
      <div className="container">
        <div className="demo-title">
          <h2>VOTICA AI <span className="gradient-text">실제 시연</span></h2>
          <p>마이크 버튼을 눌러 AI와 실시간 음성 대화를 체험해보세요</p>
        </div>

        <div className="live-demo-container">
          <div className="live-demo-card">
            <div className="demo-header">
              <div className="demo-info">
                <h3>실시간 AI 음성 대화</h3>
                <p>AI가 질문하면 마이크 버튼을 눌러 음성으로 답변해보세요</p>
              </div>

              <div className="live-indicator">
                <div className={`live-dot ${isRecording || isAiSpeaking ? 'active' : ''}`}></div>
                {getStatusText()}
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* 대화 기록 */}
            <div className="conversation-area">
              {conversation.length === 0 ? (
                <div className="conversation-placeholder">
                  <div className="placeholder-icon">💬</div>
                  <p>대화 시작을 눌러 AI와 여론조사를 체험해보세요</p>
                </div>
              ) : (
                <div className="conversation-history">
                  {conversation.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                      <div className="message-avatar">
                        {message.type === 'ai' ? '🤖' : '👤'}
                      </div>
                      <div className="message-content">
                        <div className="message-text">{message.text}</div>
                        {message.audioUrl && (
                          <button
                            onClick={() => {
                              const audio = new Audio(message.audioUrl)
                              audio.play()
                            }}
                            className="mt-2 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            🔊 다시 듣기
                          </button>
                        )}
                        <div className="message-time">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isRecording && (
                <div className="live-transcript">
                  <span className="transcript-label">녹음 중:</span>
                  <span className="transcript-text">🎤 말씀해주세요...</span>
                </div>
              )}
            </div>

            {/* 제어 버튼 */}
            <div className="demo-controls">
              <div className="control-buttons">
                {currentStep === 'waiting' && conversation.length === 0 && (
                  <button
                    onClick={startConversation}
                    className="demo-button primary large"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    대화 시작
                  </button>
                )}

                {currentStep === 'waiting' && conversation.length > 0 && (
                  <button
                    onClick={startListening}
                    className="demo-button mic"
                    disabled={isListening || isAiSpeaking}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                    음성으로 답변
                  </button>
                )}

                {currentStep === 'listening' && (
                  <button
                    onClick={stopConversation}
                    className="demo-button secondary"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 6h12v12H6z"/>
                    </svg>
                    중지
                  </button>
                )}

                {(currentStep === 'processing' || currentStep === 'speaking') && (
                  <div className="audio-visualizer">
                    <div className="wave-container">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                      ))}
                    </div>
                    <p className="playing-text">{getStatusText()}</p>
                  </div>
                )}

                {conversation.length > 0 && (
                  <button
                    onClick={resetDemo}
                    className="demo-button tertiary"
                    disabled={isListening || isAiSpeaking}
                  >
                    새로 시작
                  </button>
                )}
              </div>
            </div>

            <div className="demo-features">
              <div className="feature-item">
                <div className="feature-icon">🎤</div>
                <div className="feature-text">
                  <strong>Google STT</strong>
                  <span>음성을 텍스트로 변환</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🧠</div>
                <div className="feature-text">
                  <strong>ChatGPT</strong>
                  <span>자연스러운 대화 생성</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔊</div>
                <div className="feature-text">
                  <strong>ElevenLabs TTS</strong>
                  <span>자연스러운 AI 음성</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}