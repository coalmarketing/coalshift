'use client';
import Button from './Button';

export default function WaitListRegistration() {
  return (
    <section className="max-w-[1200px] w-full mx-auto px-8 pt-16">
      {/* Hlavní nadpis a popis */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-lekton font-bold text-modra mb-6">
          Buďte mezi prvními
        </h1>
        <p className="text-xl font-inter text-gray-600 mb-8">
          Začni používat revoluční systém pro plánování směn. Zaregistruj se nyní a získej:
        </p>
      </div>

      {/* Výhody */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-lekton font-bold text-lg mb-2">Přednostní přístup</h3>
          <p className="font-inter text-gray-600">
            Získej přístup k aplikaci mezi prvními a začni optimalizovat plánování směn dříve než ostatní.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-lekton font-bold text-lg mb-2">Speciální cena</h3>
          <p className="font-inter text-gray-600">
            Pro první registrované nabízíme exkluzivní cenové podmínky a bonusy navíc.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-lekton font-bold text-lg mb-2">Exkluzivní obsah</h3>
          <p className="font-inter text-gray-600">
            Přístup k tutoriálům, tipům a best practices pro efektivní plánování směn.
          </p>
        </div>
      </div>

      {/* CTA tlačítko */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 mb-12 flex flex-col justify-center items-center">
        <Button 
          variant="primaryModra" 
          href="https://app.coalshift.cz/register"
          target="_blank"
          className="text-xl px-12 py-4"
        >
          CHCI SI VYZKOUŠET APLIKACI
        </Button>
      </div>
    </section>
  );
} 