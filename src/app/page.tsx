import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import DemoSection from '../components/DemoSection';
import LiveDemoSection from '../components/LiveDemoSection';
import Footer from '../components/Footer';

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