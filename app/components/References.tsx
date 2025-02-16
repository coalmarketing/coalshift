'use client';
import Image from 'next/image';

const references = [
  {
    logo: '/logo/coalshift_logo_long-light-mono.svg',
    alt: 'Coalshift Logo',
    stars: 5,
    testimonial: 'Coalshift nám výrazně ulehčil plánování směn. Díky umělé inteligenci ušetříme spoustu času a zaměstnanci jsou spokojenější s rozvrhem. Systém je velmi intuitivní a přehledný. Oceňuji především automatické generování rozvrhů, které bere v úvahu preference zaměstnanců i naše firemní požadavky. Za poslední rok jsme díky Coalshiftu ušetřili desítky hodin administrativní práce. Doporučuji všem firmám, které chtějí zefektivnit tento proces.',
    author: 'Michal Uhlíř',
    position: 'coalfamily'
  },
  {
    logo: '/logo/coalshift_logo_long-light-mono.svg',
    alt: 'Coalshift Logo',
    stars: 5,
    testimonial: 'Implementace Coalshiftu byla jedním z nejlepších rozhodnutí pro naši společnost. Před jeho nasazením jsme trávili hodiny ručním plánováním směn, často docházelo k překryvům a nespokojenosti zaměstnanců. Nyní je celý proces automatizovaný a efektivní. Systém se rychle učí preference našich zaměstnanců a vytváří rozvrhy, které vyhovují všem stranám. Zákaznická podpora je navíc vynikající - vždy rychle reagují na naše dotazy a připomínky. Návratnost investice byla téměř okamžitá.',
    author: 'Jana Novotná',
    position: 'HR Manager'
  },
  {
    logo: '/logo/coalshift_logo_long-light-mono.svg',
    alt: 'Coalshift Logo',
    stars: 5,
    testimonial: 'Po třech měsících používání Coalshiftu můžu říct, že tento nástroj předčil všechna naše očekávání. Nejen že šetří čas při plánování směn, ale také významně snížil počet konfliktů v rozvrhu. Zaměstnanci oceňují možnost zadávat své preference a vidět rozvrh v reálném čase. Analytické nástroje nám pomáhají lépe porozumět vytížení týmu a optimalizovat pracovní dobu. Integrace s naším stávajícím HR systémem proběhla hladce. Coalshift se stal nepostradatelnou součástí našeho každodenního provozu.',
    author: 'Petr Svoboda',
    position: 'Provozní ředitel'
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <span key={i} className="text-2xl text-white">★</span>
      ))}
    </div>
  );
};

export default function References() {
  return (
    <section className="w-full pt-32">
      <div className="max-w-[1200px] mx-auto px-4">

      <h2 className="text-modra text-3xl sm:text-4xl md:text-5xl font-lekton font-bold">
        Reference
      </h2>
        
        <div className="grid gap-6 my-16">
          {references.map((reference, index) => (
            <div 
              key={index}
              className="bg-[#00B5E2] rounded-lg p-8 text-white relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-grow">
                  <StarRating rating={reference.stars} />
                  <p className="text-sm mb-6 leading-relaxed font-inter">
                    "{reference.testimonial}"
                  </p>
                  <div className="flex items-center gap-2 text-2xl">
                    <p className="font-lekton font-bold">{reference.author},</p>
                    <p className="font-lekton">{reference.position}</p>
                  </div>
                </div>
                <div className="lg:w-32 flex justify-end mt-auto">
                  <Image
                    src={reference.logo}
                    alt={reference.alt}
                    width={100}
                    height={100}
                    className="object-contain min-w-32"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 