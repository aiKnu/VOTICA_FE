'use client'

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TechSection from '../components/TechSection';
import DemoSection from '../components/DemoSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TechSection />
        <DemoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}