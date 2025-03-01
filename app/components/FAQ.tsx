'use client';
import { useState } from 'react';
import Button from './Button';
import ContactSection from './ContactSection';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Jak mi coalshift pomůže s plánováním směn?',
    answer: 'coalshift vám umožní efektivně plánovat směny, automaticky kontrolovat konflikty a spravovat dostupnost zaměstnanců. Systém také nabízí přehledné statistiky a reporty.'
  },
  {
    question: 'Je coalshift vhodný i pro malé firmy?',
    answer: 'Ano! coalshift je navržen jak pro menší provozy s několika zaměstnanci, tak pro velké podniky s komplexním směnným provozem. Nabízíme flexibilní cenové plány, včetně bezplatné verze pro menší týmy.'
  },
  {
    question: 'Je coalshift vhodný pro moji firmu?',
    answer: 'Ano! coalshift využívají firmy od malých týmů po velké výrobní podniky.'
  },
  {
    question: 'Mohu si coalshift nejdříve vyzkoušet?',
    answer: 'Ano! Nabízíme 14denní bezplatnou zkušební verzi.'
  },
  {
    question: 'Jak probíhá implementace a je složitá?',
    answer: 'Implementace je jednoduchá a intuitivní. Náš tým vám poskytne kompletní podporu při nastavení systému a zaškolení zaměstnanců.'
  },
  {
    question: 'Jak probíhá integrace s naším systémem?',
    answer: 'coalshift se snadno napojuje na HELIOS, SAP, Alveno a další systémy.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-[1200px] mx-auto px-8 py-16 mb-8">
      <h2 className="text-modra text-3xl sm:text-4xl md:text-5xl font-lekton font-bold mb-12">
        Nejčastější dotazy
      </h2>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div 
            key={index}
            className="border-b border-gray-200"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full py-3 flex items-center justify-between text-left"
            >
              <span className="text-lg sm:text-xl md:text-xl font-lekton font-bold">
                {item.question}
              </span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="pb-6 text-cerna font-inter text-sm">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 