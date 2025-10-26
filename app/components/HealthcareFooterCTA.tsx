import Button from './Button';

export default function HealthcareFooterCTA() {
  return (
    <section id="footer-cta" className="bg-modra text-white py-16">
      <div className="max-w-[1200px] mx-auto px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-lekton font-bold mb-6">
          Vyzkoušejte coalshift na 30 dní zdarma.
        </h2>
        <p className="text-xl font-inter mb-8 max-w-2xl mx-auto">
          Získejte zpět čas, který patří pacientům.
        </p>
        <div className="text-center">
          <Button href="https://app.coalshift.cz/register" variant="primaryBila" target="_blank" className="inline-block">
            Vyzkoušet na 30 dní zdarma
          </Button>
        </div>
      </div>
    </section>
  );
}
