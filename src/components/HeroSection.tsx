export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            AI가 만드는 <br />
            <span className="gradient-text">스마트한 민심조사</span>
          </h1>

          <p>
            음성 자동응답(ARS)과 AI 기술을 결합하여 CATI급 응답률을 실현하고,
            실시간 감정분석과 인사이트 리포트까지 제공하는 차세대 여론조사 플랫폼
          </p>

          <a href="#video" className="cta-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            시연 보기
          </a>
        </div>
      </div>
    </section>
  )
}
