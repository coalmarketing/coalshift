import React from 'react';

interface FeatureProps {
  number: string;
  title: string;
  description: string;
}

const Feature = ({ number, title, description }: FeatureProps) => (
  <div className="bg-modra text-white px-8 pt-4 pb-6 xl:pb-0 rounded-md flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6">
    <div className="text-5xl sm:text-7xl md:text-[10rem] font-lekton font-bold leading-none">{number}</div>
    <div>
      <h3 className="text-xl sm:text-2xl font-lekton font-bold mb-1 sm:mb-2 mt-0 sm:mt-4">{title}</h3>
      <p className="font-inter font-light text-sm sm:text-base">{description}</p>
    </div>
  </div>
);

export default function KeyFeatures() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-0 mt-0 lg:mt-[-80px]">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-modra font-lekton font-bold mb-6 sm:mb-8 md:mb-12">
        Klíčové funkce
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <Feature 
          number="1"
          title="Inteligentní plánování směn"
          description="AI se učí z historických dat, analyzuje provozní požadavky a dynamicky reaguje na změny v reálném čase."
        />
        
        <Feature 
          number="2"
          title="Automatizované záměny směn"
          description="Zaměstnanci mohou vyměnit směny, AI analyzuje dostupnost, hledá nejvhodnější náhrady a navrhuje ideální řešení."
        />
        
        <Feature 
          number="3"
          title="Personalizované plánování"
          description="Respektuje preference zaměstnanců, analyzuje pracovní zvyklosti, optimalizuje rozvrh a zlepšuje jejich work-life balance."
        />
        
        <Feature 
          number="4"
          title="Analýzy a predikce výkonu"
          description="Kompletní přehled o efektivitě plánování, detailní data o výkonnosti a přímé úspory na mzdových nákladech a provozu."
        />
        
        <Feature 
          number="5"
          title="Soulad s legislativou"
          description="Automatické hlídání odpočinků, maximálních hodin, přesčasů a všech dalších předpisů dle aktuálních regulací."
        />
        
        <Feature 
          number="6"
          title="Multi-kanálová komunikace"
          description="SMS, WhatsApp, e-mail, kalendářové integrace – zaměstnanci vždy vědí o svých směnách a změnách okamžitě."
        />
      </div>
    </section>
  );
} 