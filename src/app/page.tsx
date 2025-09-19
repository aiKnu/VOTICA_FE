'use client'

import dynamic from 'next/dynamic'
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import DemoSection from '../components/DemoSection';
import Footer from '../components/Footer';

const LiveDemoSection = dynamic(() => import('../components/LiveDemoSection'), {
  ssr: false,
  loading: () => (
    <section id="demo" className="live-demo-section">
      <div className="container">
        <div className="demo-title">
          <h2>VOTICA AI <span className="gradient-text">실제 시연</span></h2>
          <p>로딩 중...</p>
        </div>
      </div>
    </section>
  )
})

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <DemoSection />
        <LiveDemoSection />
      </main>
      <Footer />
    </div>
  );
}