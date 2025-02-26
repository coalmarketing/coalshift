import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import KeyFeatures from './components/KeyFeatures';
import VideoSection from './components/VideoSection';
import LogoCarousel from './components/LogoCarousel';
import PricingSection from './components/PricingSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-col min-h-screen">
        <h1 className="sr-only">Coalshift - Inteligentní systém pro plánování směn a docházky</h1>
        
        <Hero />
        
        <section id="benefits" aria-labelledby="benefits-heading">
          <Benefits />
        </section>
        
        <section id="features" aria-labelledby="features-heading">
          <KeyFeatures />
        </section>
        
        <section id="how-it-works" aria-labelledby="video-heading">
          <VideoSection />
        </section>
        
        <section id="trusted-by" aria-labelledby="companies-heading">
          <LogoCarousel />
        </section>
        
        <section id="pricing" aria-labelledby="pricing-heading">
          <PricingSection />
        </section>
        
        <section id="faq" aria-labelledby="faq-heading">
          <FAQ />
        </section>

        <section id="contact" aria-labelledby="contact-heading">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
