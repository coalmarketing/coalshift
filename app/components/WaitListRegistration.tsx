'use client';
import { useState, useEffect } from 'react';
import Button from './Button';
import Image from 'next/image';
import Script from 'next/script';
import { useRouter } from 'next/navigation';

export default function WaitListRegistration() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implementovat odeslání na API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Přesměrování na stránku thank-you
    router.push('/wait-list/thank-you');
  };

  // Detekce a zpracování odeslání formuláře z iFrame
  useEffect(() => {
    // Funkce pro naslouchání zpráv z iFrame (Onquanda formulář)
    const handleOnquandaMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'formSubmitted') {
        // Přesměrování na stránku thank-you po odeslání formuláře
        router.push('/wait-list/thank-you');
      }
    };

    // Přidání event listeneru pro zprávy z iFrame
    window.addEventListener('message', handleOnquandaMessage);

    return () => {
      // Odstranění event listeneru při unmount komponenty
      window.removeEventListener('message', handleOnquandaMessage);
    };
  }, [router]);

  return (
    <section className="max-w-[1200px] mx-auto px-8 pt-16">
      {/* Hlavní nadpis a popis */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-lekton font-bold text-modra mb-6">
          Buďte mezi prvními
        </h1>
        <p className="text-xl font-inter text-gray-600 mb-8">
          Připravujeme revoluční systém pro plánování směn. Zaregistrujte se nyní a získejte:
        </p>
      </div>

      {/* Výhody */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-lekton font-bold text-lg mb-2">Přednostní přístup</h3>
          <p className="font-inter text-gray-600">
            Získejte přístup k aplikaci jako první a začněte optimalizovat plánování směn dříve než ostatní.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-lekton font-bold text-lg mb-2">Speciální cena</h3>
          <p className="font-inter text-gray-600">
            Pro první registrované nabízíme exkluzivní cenové podmínky a bonusy navíc.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-lekton font-bold text-lg mb-2">Early Access Program</h3>
          <p className="font-inter text-gray-600">
            Možnost ovlivnit vývoj produktu a získat funkce šité na míru vašim potřebám.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-lekton font-bold text-lg mb-2">Exkluzivní obsah</h3>
          <p className="font-inter text-gray-600">
            Přístup k tutoriálům, tipům a best practices pro efektivní plánování směn.
          </p>
        </div>
      </div>

      {/* Kontejner pro Onquanda formulář */}
      <div className="bg-white rounded-xl p-0 border border-gray-200 mb-12 flex justify-center items-center">
        <div style={{ display: "block" }} className="qndTrigger mx-auto" data-key="2128f532d89ef03752d1b45d0eac06de" data-form-html-class="" data-static="true" data-redirect="/wait-list/thank-you">&nbsp;</div>
      </div>
    </section>
  );
} 