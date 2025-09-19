export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <p>AI 음성 자동응답 시스템 VOTICA로 차세대 여론조사를 경험해보세요</p>

        <ul className="footer-links">
          <li><a href="mailto:contact@votica.ai">문의하기</a></li>
          <li><a href="#demo">시연 보기</a></li>
          <li><a href="#">서비스 소개서</a></li>
        </ul>

        <p style={{ marginTop: '20px', fontSize: '0.8rem' }}>
          © 2025 VOTICA. All rights reserved.
        </p>
      </div>
    </footer>
  )
}