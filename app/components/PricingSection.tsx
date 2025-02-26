'use client';
import Button from './Button';

const pricingPlans = [
  {
    title: 'Basic',
    subtitle: 'do 5 zaměstnanců',
    price: 'ZDARMA',
    pricePerMonth: '',
    buttonText: 'Vyzkoušet',
  },
  {
    title: 'Standard',
    subtitle: 'do 500 zaměstnanců',
    price: '499 Kč',
    pricePerMonth: '/ měsíc',
    buttonText: 'Objednat',
  },
  {
    title: 'Enterprise',
    subtitle: 'nad 500 zaměstnanců',
    price: 'Individuální nabídka',
    pricePerMonth: '',
    buttonText: 'Poptat',
  }
];

export default function PricingSection() {
  return (
    <section id="pricing-section" className="max-w-[1200px] mx-auto px-8 pt-16"> 
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-modra font-lekton font-bold">
        Ceník
      </h2>
      <p className="text-cerna font-inter text-sm mt-4 mb-4 sm:mb-6 md:mb-8">Coalshift nabízí flexibilní cenové plány přizpůsobené potřebám vaší firmy.</p>
      {pricingPlans.map((plan, index) => (
        <div 
          key={index}
          className="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between border border-gray-200 rounded-lg p-4 md:p-8 mb-4 text-center md:text-left"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-lekton font-bold">
              {plan.title}
            </h3>
            <p className="text-gray-600 mt-1">{plan.subtitle}</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex items-baseline">
              <span className={`text-xl md:text-2xl font-inter font-bold ${plan.price === 'ZDARMA' ? 'text-[#00CF00]' : 'text-modra'}`}>
                {plan.price}
              </span>
              <span className="text-black ml-1">
                {plan.pricePerMonth}
              </span>
            </div>
            
            <Button 
              variant="primaryModra" 
              className="w-48 text-center"
              href="https://app.coalshift.cz/"
              target="_blank"
            >
              {plan.buttonText}
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
} 