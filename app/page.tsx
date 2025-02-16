import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import KeyFeatures from './components/KeyFeatures';
import VideoSection from './components/VideoSection';
import LogoCarousel from './components/LogoCarousel';
import PricingSection from './components/PricingSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Benefits />
      <KeyFeatures />
      <VideoSection />
      <LogoCarousel />
      <PricingSection />
      <FAQ />
      <Footer />
    </main>
  );
}
