import Button from './Button';

export default function HealthcareComparison() {
  const comparisonData = [
    {
      before: {
        title: "Ruční rozpis v Excelu",
        description: "Hodiny práce a riziko chyb."
      },
      after: {
        title: "AI návrh směn během minuty",
        description: "Automatický a optimalizovaný plán."
      }
    },
    {
      before: {
        title: "Chaos v komunikaci",
        description: "Zmatky v e-mailech a zprávách."
      },
      after: {
        title: "Automatické notifikace",
        description: "Všichni vědí o změnách okamžitě."
      }
    },
    {
      before: {
        title: "Překrývání směn, stres",
        description: "Nerovnoměrné zatížení a únava."
      },
      after: {
        title: "Férové rozložení a kontrola zákoníku",
        description: "Spravedlivé směny v souladu s pravidly."
      }
    },
    {
      before: {
        title: "Hledání záskoku po telefonu",
        description: "Zdlouhavé obvolávání kolegů."
      },
      after: {
        title: "Burza směn v appce",
        description: "Jednoduché a rychlé hledání náhrady."
      }
    },
    {
      before: {
        title: "Nespokojený tým",
        description: "Pocit nespravedlnosti a frustrace."
      },
      after: {
        title: "Klid, přehled a férové směny",
        description: "Spokojený tým a plynulý provoz."
      }
    }
  ];

  return (
    <section id="comparison" className="py-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-modra text-3xl sm:text-4xl md:text-5xl font-lekton font-bold text-center mb-6">
          3 hodiny týdně nad směnami? To jsou 3 hodiny bez pacientů.
        </h2>
        
        <p className="text-center text-base sm:text-lg max-w-4xl mx-auto mb-12 font-inter">
          Plánování směn v Excelu nebo na papíře stojí zdravotníky i manažery hodiny času každý týden. Navíc hrozí chyby, překrývání směn nebo neohlídané odpočinky. Coalshift to zvládne za minutu – automaticky, přehledně a podle zákoníku práce.
        </p>
        
        <div className="bg-lightBlue rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Před sloupec */}
            <div className="bg-white rounded-md p-8 space-y-6">
              <h3 className="text-modra text-xl font-lekton font-bold">Před coalshiftem</h3>
              
              {comparisonData.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-2xl font-bold leading-none">×</span>
                  </div>
                  <div>
                    <p className="text-modra font-inter font-semibold text-base mb-1">{item.before.title}</p>
                    <p className="text-sparta font-inter text-sm">{item.before.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Po sloupec */}
            <div className="bg-white rounded-md p-8 space-y-6">
              <h3 className="text-modra text-xl font-lekton font-bold">S coalshiftem</h3>
              
              {comparisonData.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xl font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-modra font-inter font-semibold text-base mb-1">{item.after.title}</p>
                    <p className="text-sparta font-inter text-sm">{item.after.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button href="https://app.coalshift.cz/register" variant="primaryModra" target="_blank" className="inline-block">
            Vyzkoušet na 30 dní zdarma
          </Button>
        </div>
      </div>
    </section>
  );
}
