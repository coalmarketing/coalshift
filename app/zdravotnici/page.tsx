import Header from "../components/Header";
import Footer from "../components/Footer";
import HealthcareHero from "../components/HealthcareHero";
import HealthcareVideoSection from "../components/HealthcareVideoSection";
import HealthcareBenefits from "../components/HealthcareBenefits";
import HealthcareComparison from "../components/HealthcareComparison";
import HealthcareFeatures from "../components/HealthcareFeatures";
import HealthcareFooterCTA from "../components/HealthcareFooterCTA";

export default function ZdravotniciPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-col min-h-screen">
        <h1 className="sr-only">Coalshift pro zdravotnictví - AI plánovač směn pro zdravotníky</h1>
        
        <HealthcareHero />
        
        <section id="video" aria-labelledby="video-heading">
          <HealthcareVideoSection />
        </section>
        
        <section id="comparison" aria-labelledby="comparison-heading">
          <HealthcareComparison />
        </section>
        
        <section id="features" aria-labelledby="features-heading">
          <HealthcareFeatures />
        </section>
        
        <section id="footer-cta" aria-labelledby="footer-cta-heading">
          <HealthcareFooterCTA />
        </section>
      </main>
      <Footer />
    </>
  );
}
