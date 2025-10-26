'use client';

import Button from './Button';

export default function HealthcareVideoSection() {
  return (
    <section id="video-section" className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-modra text-xl sm:text-xl md:text-4xl font-lekton font-bold mb-6">
          „Hele, to přece nejde, abyste pořád plánovali směny v Excelu."
        </h2>
        <p className="text-cerna font-inter text-md max-w-4xl mx-auto">
          Marek Bartoš – tvář coalshiftu a autor AI plánovače směn – ukazuje, jak ušetřit čas a zachovat klid na oddělení.
        </p>
      </div>
      
      {/* Video container */}
      <div className="relative w-full max-w-4xl mx-auto mb-8">
        <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/X4EybJeE-Fk?si=j5RLIDtGwS7Eax5v"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
      
      <div className="text-center">
      <Button href="https://app.coalshift.cz/register" variant="primaryModra" target="_blank" className="inline-block">
            Vyzkoušet na 30 dní zdarma
          </Button>
      </div>


    </section>
  );
}
