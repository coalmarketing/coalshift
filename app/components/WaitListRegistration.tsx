'use client';
import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import Image from 'next/image';

// Deklarace typu pro Onquanda API
declare global {
  interface Window {
    qnd?: {
      init: () => void;
    };
  }
}

export default function WaitListRegistration() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  // Kompletně přepracovaná inicializace Onquanda
  useEffect(() => {
    // Opouštíme komponentu, vyčistíme HTML formuláře
    return () => {
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  // Oddělená inicializace Onquanda skriptu a formuláře
  useEffect(() => {
    if (typeof window === 'undefined' || scriptLoadedRef.current) return;

    // Funkce pro inicializaci formuláře
    const initForm = () => {
      console.log("Inicializace formuláře...");
      if (window.qnd && formContainerRef.current) {
        try {
          // Resetujem container před inicializací
          const container = formContainerRef.current;
          
          // Vytvoříme nový trigger element
          const trigger = document.createElement('div');
          trigger.className = 'qndTrigger';
          trigger.setAttribute('data-key', '2128f532d89ef03752d1b45d0eac06de');
          trigger.setAttribute('data-form-html-class', '');
          trigger.setAttribute('data-static', 'true');
          trigger.style.display = 'block';
          
          // Vyčistíme container a přidáme nový trigger
          container.innerHTML = '';
          container.appendChild(trigger);
          
          // Inicializujeme formulář
          console.log("Volám qnd.init()");
          setTimeout(() => {
            if (window.qnd) window.qnd.init();
          }, 100);
        } catch (e) {
          console.error("Chyba při inicializaci formuláře:", e);
        }
      } else {
        console.log("qnd nebo container není připraven, zkusím znovu za 200ms");
        setTimeout(initForm, 200);
      }
    };

    // Funkce pro načtení Onquanda skriptu
    const loadScript = () => {
      if (scriptLoadedRef.current) return;
      
      const scriptId = "onquanda-script";
      const existingScript = document.getElementById(scriptId);
      
      if (!existingScript) {
        console.log("Načítám Onquanda skript");
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://webform.onquanda.com/webform/assets/js/qndInitWebform.js';
        script.async = true;
        
        script.onload = () => {
          console.log("Onquanda skript načten úspěšně");
          scriptLoadedRef.current = true;
          // Po načtení skriptu inicializujeme formulář
          setTimeout(initForm, 100);
        };
        
        script.onerror = (e) => {
          console.error("Chyba při načítání Onquanda skriptu:", e);
        };
        
        document.body.appendChild(script);
      } else {
        console.log("Onquanda skript již existuje");
        scriptLoadedRef.current = true;
        // Pokud skript již existuje, inicializujeme formulář
        setTimeout(initForm, 100);
      }
    };

    // Načteme skript po dokončení renderování komponenty
    if (document.readyState === 'complete') {
      loadScript();
    } else {
      window.addEventListener('load', loadScript);
      // Záložní řešení - pokusíme se načíst po krátké prodlevě i když 'load' událost ještě nenastala
      setTimeout(loadScript, 500);
      return () => window.removeEventListener('load', loadScript);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implementovat odeslání na API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsRegistered(true);
    setIsSubmitting(false);
  };

  if (isRegistered) {
    return (
      <section className="max-w-[1200px] mx-auto px-8 pt-16">
        {/* Potvrzení registrace */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-lekton font-bold text-modra mb-6">
            Jste na seznamu čekatelů
          </h1>
          <p className="text-xl font-inter text-gray-600 mb-4">
            Jsme rádi, že jste s námi!
          </p>
          <p className="font-inter text-gray-600">
            Coalshift spouštíme 1. 7. 2025. Jakmile bude vaše přihlášení aktivní, dáme vám vědět e-mailem i notifikací.
          </p>
        </div>

        {/* Bonus pro čekající */}
        <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-lekton font-bold text-modra mb-6">🧠 Učte se dřív než ostatní!</h2>
          <p className="font-inter text-gray-600 mb-6">
            Získejte přístup k tutoriálům a prvním tipům, jak co nejlépe nastavit plánování směn s Coalshiftem – už teď.
          </p>
          <Button variant="primaryModra" className="w-full">
            Prozkoumat ukázky už teď
          </Button>
        </div>

        {/* Co můžete očekávat */}
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-lekton font-bold text-modra mb-6 text-center">Co můžete očekávat dál</h2>
          <div className="grid gap-6">
            <div>
              <h3 className="font-lekton font-bold text-lg mb-2">E-mail s potvrzením</h3>
              <p className="font-inter text-gray-600">Obdržíte potvrzení registrace na váš e-mail</p>
            </div>

            <div>
              <h3 className="font-lekton font-bold text-lg mb-2">Budoucí notifikace</h3>
              <p className="font-inter text-gray-600">Budeme vás informovat o stavu přístupu</p>
            </div>

            <div>
              <h3 className="font-lekton font-bold text-lg mb-2">Spuštění 1. července 2025</h3>
              <p className="font-inter text-gray-600">Přístup bude aktivován automaticky</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1200px] w-full mx-auto px-8 pt-16">
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
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-12 flex flex-col justify-center items-center min-h-[300px]">
        <div ref={formContainerRef} className="w-full">
          {process.env.NODE_ENV === 'development' && <div className="text-xs text-gray-400 text-center">Načítání formuláře...</div>}
        </div>
      </div>
    </section>
  );
} 