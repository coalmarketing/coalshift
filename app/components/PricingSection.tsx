'use client';
import Button from './Button';

const pricingPlans = [
  {
    title: 'Do 5 zaměstnanců',
    price: 'Zdarma',
    pricePerMonth: '',
    buttonText: 'Vyzkoušet!',
  },
  {
    title: 'Do 500 zaměstnanců',
    price: '499 Kč',
    pricePerMonth: '/ měsíc',
    buttonText: 'Objednat!',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing-section" className="max-w-[1200px] mx-auto px-8 pt-16"> 
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-modra font-lekton font-bold mb-6 sm:mb-8 md:mb-12">
        Ceník
      </h2>
      {pricingPlans.map((plan, index) => (
        <div 
          key={index}
          className="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between border border-gray-200 rounded-lg p-4 md:p-8 mb-4 text-center md:text-left"
        >
          <h3 className="text-xl md:text-2xl font-lekton font-bold">
            {plan.title}
          </h3>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex items-baseline">
              <span className={`text-xl md:text-2xl font-inter font-bold ${plan.price === 'Zdarma' ? 'text-[#00CF00]' : 'text-modra'}`}>
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