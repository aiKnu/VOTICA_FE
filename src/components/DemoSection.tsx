'use client'

import { useState } from 'react'

export default function DemoSection() {
  const [showVideo, setShowVideo] = useState(false)

  // 여기에 실제 유튜브 비디오 ID를 입력하세요
  const youtubeVideoId = "eny0BqmSwmM" // 예시 ID, 실제 VOTICA 데모 영상 ID로 교체 필요

  return (
    <section id="video" className="demo-section">
      <div className="container">
        <div className="demo-title">
          <h2>VOTICA AI <span className="gradient-text">시연 영상</span></h2>
          <p>AI가 실제로 진행하는 여론조사 영상을 시청해보세요</p>
        </div>

        <div className="demo-container">
          <div className="demo-card">
            <div className="demo-header">
              <div className="demo-info">
                <h3>AI 음성 여론조사 시연</h3>
                <p>실제 VOTICA 시스템이 진행하는 정치 여론조사 데모</p>
              </div>
            </div>

            <div className="video-container">
              {!showVideo ? (
                <div className="video-placeholder shimmer" onClick={() => setShowVideo(true)}>
                  <div className="play-button">
                    <svg className="play-icon" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="video-overlay">
                    <span>클릭하여 데모 영상 재생</span>
                  </div>
                </div>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                  title="VOTICA AI 음성 여론조사 시연"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="youtube-iframe"
                />
              )}
            </div>

            <div className="demo-stats">
              <div className="stat-item">
                <div className="stat-value">V/A</div>
                <div className="stat-label">응답 참여율</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">V/A</div>
                <div className="stat-label">감정 분석 정확도</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">실시간</div>
                <div className="stat-label">STT 변환</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">자동 운영</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
