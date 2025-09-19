'use client'

import Header from '@/components/Header'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      <Header />
      <main style={{ backgroundColor: '#000000' }}>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}