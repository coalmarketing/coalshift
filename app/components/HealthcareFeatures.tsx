import Button from './Button';

const features = [
  {
    icon: "🕐",
    title: "Hlídá zákoník práce",
    description: "Kontroluje 11/35h odpočinky i délku směn."
  },
  {
    icon: "✏️",
    title: "AI rozpis za minutu",
    description: "Systém navrhne směny podle lidí i provozu."
  },
  {
    icon: "👥",
    title: "Jedna appka pro všechny",
    description: "Přehled pro vedení i zaměstnance."
  },
  {
    icon: "📅",
    title: "Férové rozložení",
    description: "Žádné hádky o noční nebo víkendy."
  },
  {
    icon: "✓",
    title: "Přehled o docházce a kapacitách",
    description: "Jasný pohled na provoz i volno."
  },
  {
    icon: "😊",
    title: "Spokojený tým",
    description: "Méně stresu a více času na důležitou práci."
  }
];

export default function HealthcareFeatures() {
  return (
    <section id="features" className="py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <h2 className="text-modra text-3xl sm:text-4xl md:text-5xl font-lekton font-bold text-center mb-12">
          Klíčové výhody pro zdravotnictví
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 text-left">
              <div className="w-12 h-12 bg-lightBlue rounded-lg flex items-center justify-center mb-4">
                <span className="text-modra text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-lekton font-bold text-modra mb-2">
                {feature.title}
              </h3>
              <p className="text-cerna font-inter text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
