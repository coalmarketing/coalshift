'use client';
import Button from './Button';

const pricingPlans = [
  {
    title: 'Basic',
    subtitle: 'do 10 zaměstnanců',
    price: 'ZDARMA',
    pricePerMonth: '',
    buttonText: 'Vyzkoušet',
    features: [
      'Základní správa směn',
      'Přiřazování zaměstnanců',
      'Přehled směn',
      'Databáze zaměstnanců',
      'Max. 10 zaměstnanců'
    ]
  },
  {
    title: 'Lite',
    subtitle: 'do 50 zaměstnanců',
    price: '399 Kč',
    pricePerMonth: '/ měsíc + 50 Kč/zaměstnanec',
    buttonText: 'Objednat',
    features: [
      'Vše z Basic',
      'Správa dovolených',
      'Základní správa požadavků',
      'Max. 50 zaměstnanců'
    ]
  },
  {
    title: 'Advanced',
    subtitle: 'do 100 zaměstnanců',
    price: '949 Kč',
    pricePerMonth: '/ měsíc + 50 Kč/zaměstnanec',
    buttonText: 'Objednat',
    features: [
      'Vše z Lite',
      'Zaměstnanecké přístupy',
      'Žádosti zaměstnanecké',
      'Generování směn',
      'Správa dovolené a volna',
      'Max. 100 zaměstnanců'
    ]
  },
  {
    title: 'Pro',
    subtitle: 'neomezený počet zaměstnanců',
    price: '2990 Kč',
    pricePerMonth: '/ měsíc + 50 Kč/zaměstnanec',
    buttonText: 'Objednat',
    features: [
      'Vše z Advanced',
      'Neomezený počet zaměstnanců',
      'Napojení na API',
      'Pokročilé generování směn',
      'Náhrady a volna',
      'Rozšířené zaměstnanecké přístupy'
    ]
  }
];

export default function PricingSection() {
  return (
    <section id="pricing-section" className="max-w-[1200px] mx-auto px-8 pt-16"> 
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-modra font-lekton font-bold">
        Ceník
      </h2>
      <p className="text-cerna font-inter text-sm mt-4 mb-8">
        Coalshift nabízí flexibilní cenové plány přizpůsobené potřebám vaší firmy.
      </p>

       {/* Info lišta pro waiting list */}
       <div className="bg-gradient-to-r from-modra/5 to-modra/10 border border-modra/20 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <svg className="w-12 h-12 text-modra" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24 12V24L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-lekton font-bold text-modra">
              Spouštíme 1. července 2025
            </h3>
            <p className="text-sm text-gray-600 font-inter">
              Zaregistrujte se na waiting list a získejte exkluzivní přístup mezi prvními!
            </p>
          </div>
        </div>
        <Button 
          variant="primaryModra"
          href="/wait-list"
          className="whitespace-nowrap"
        >
          Požádat o přístup
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index}
            className="flex flex-col border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-lekton font-bold mb-2">
                {plan.title}
              </h3>
              <p className="text-gray-600 mb-4 font-inter">{plan.subtitle}</p>
              <div className="flex flex-col items-center">
                <span className={`text-2xl font-inter font-bold ${plan.price === 'ZDARMA' ? 'text-[#00CF00]' : 'text-modra'}`}>
                  {plan.price}
                </span>
                <span className="text-black text-sm font-inter mt-1">
                  {plan.pricePerMonth}
                </span>
              </div>
            </div>
            
            <ul className="flex-grow space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm font-inter">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              variant="primaryModra" 
              className="w-full text-center mt-auto"
              href="https://app.coalshift.cz/"
              target="_blank"
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
} 