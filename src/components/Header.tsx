import Image from 'next/image'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">
            <Image src="/votica-logo.png" alt="VOTICA" width={55} height={55} />
            <span className="logo-text">VOTICA</span>
          </a>

          <nav>
            <ul className="nav">
              <li><a href="#demo">시연</a></li>
              <li><a href="#contact">문의</a></li>
            </ul>
          </nav>

          <a href="#demo" className="header-cta">무료 체험</a>
        </div>
      </div>
    </header>
  )
}