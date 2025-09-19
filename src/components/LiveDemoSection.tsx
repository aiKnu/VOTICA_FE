'use client'

import { useState, useRef, useEffect } from 'react'

export default function LiveDemoSection() {
  const [isListening, setIsListening] = useState(false)
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)
  const [conversation, setConversation] = useState([])
  const [currentStep, setCurrentStep] = useState('waiting') // waiting, listening, processing, speaking
  const [transcript, setTranscript] = useState('')

  const recognitionRef = useRef(null)

  useEffect(() => {
    // Web Speech API 초기화
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'ko-KR'

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setTranscript(transcript)
        handleUserResponse(transcript)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('음성 인식 오류:', event.error)
        setIsListening(false)
        setCurrentStep('waiting')
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const startConversation = async () => {
    // 대화 초기화 및 AI 첫 질문 시작
    setConversation([])
    setCurrentStep('speaking')
    setIsAiSpeaking(true)

    const firstQuestion = "안녕하세요. 정부 정책에 대한 국민 의견을 수렴하고 있습니다. 현재 정부의 경제 정책에 대해 어떻게 생각하시나요?"

    // 대화 기록에 AI 질문 추가
    setConversation([{ type: 'ai', text: firstQuestion, timestamp: new Date() }])

    // 여기에 실제 TTS API 호출이 들어갈 예정
    // 현재는 시뮬레이션
    setTimeout(() => {
      setIsAiSpeaking(false)
      setCurrentStep('waiting')
    }, 3000)
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setCurrentStep('listening')
      setIsListening(true)
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  const handleUserResponse = async (userText) => {
    setCurrentStep('processing')

    // 사용자 응답을 대화에 추가
    setConversation(prev => [...prev, { type: 'user', text: userText, timestamp: new Date() }])

    // AI 응답 생성 시뮬레이션
    setTimeout(async () => {
      setCurrentStep('speaking')
      setIsAiSpeaking(true)

      // 간단한 AI 응답 로직 (실제로는 GPT API 연결 예정)
      const aiResponse = generateAiResponse(userText)
      setConversation(prev => [...prev, { type: 'ai', text: aiResponse, timestamp: new Date() }])

      // 여기에 실제 TTS API 호출이 들어갈 예정
      setTimeout(() => {
        setIsAiSpeaking(false)
        setCurrentStep('waiting')
      }, 2500)
    }, 1500)
  }

  const generateAiResponse = (userText) => {
    // 간단한 응답 로직 (실제로는 GPT API로 교체 예정)
    const responses = [
      "네, 좋은 의견 감사합니다. 그럼 다음 질문드리겠습니다. 현재 정부의 복지 정책에 대해서는 어떻게 생각하시나요?",
      "의견 잘 들었습니다. 마지막으로, 정부가 우선적으로 개선해야 할 부분이 있다면 무엇이라고 생각하시나요?",
      "귀중한 의견 감사합니다. 설문조사가 완료되었습니다. 참여해 주셔서 감사합니다."
    ]
    return responses[Math.min(conversation.filter(c => c.type === 'ai').length, responses.length - 1)]
  }

  const stopConversation = () => {
    setCurrentStep('waiting')
    setIsListening(false)
    setIsAiSpeaking(false)
    if (recognitionRef.current) {
      recognitionRef.current.stop()
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
    switch (currentStep) {
      case 'listening': return '🎤 듣고 있어요...'
      case 'processing': return '🤖 분석 중...'
      case 'speaking': return '🗣️ AI 응답 중...'
      default: return '대화 준비 완료'
    }
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
                <div className={`live-dot ${isListening || isAiSpeaking ? 'active' : ''}`}></div>
                {getStatusText()}
              </div>
            </div>

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
                        <div className="message-time">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {transcript && isListening && (
                <div className="live-transcript">
                  <span className="transcript-label">인식 중:</span>
                  <span className="transcript-text">{transcript}</span>
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