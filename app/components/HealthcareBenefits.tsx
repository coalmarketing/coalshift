const benefits = [
  {
    icon: "⏱️",
    title: "Ušetřete čas",
    description: "Automatické plánování směn ušetří zdravotníkům i manažerům hodiny práce každý týden."
  },
  {
    icon: "✅",
    title: "Bez chyb a překrývání",
    description: "Systém hlídá zákoník práce a eliminuje chyby v rozvržení směn."
  },
  {
    icon: "😊",
    title: "Spokojený tým",
    description: "Férové rozložení směn a transparentní plánování zvyšuje spokojenost zaměstnanců."
  }
];

export default function HealthcareBenefits() {
  return (
    <section id="benefits" className="max-w-[1200px] mx-auto px-8 py-16 text-cerna">
      <div className="text-center mb-12">
        <h2 className="text-modra text-3xl sm:text-4xl md:text-5xl font-lekton font-bold mb-6">
          Proč zvolit coalshift?
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">{benefit.icon}</span>
            </div>
            <h3 className="text-lg font-lekton font-bold text-cerna mb-2">
              {benefit.title}
            </h3>
            <p className="text-sparta font-inter text-sm">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
