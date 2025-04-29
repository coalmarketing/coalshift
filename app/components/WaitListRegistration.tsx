'use client';
import { useState, useEffect } from 'react';
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
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Vylepšená funkce pro inicializaci Onquanda formuláře
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let retryCount = 0;
    const maxRetries = 30; // 30 pokusů (3 sekundy)

    const log = (message: string) => {
      console.log(message);
      setDebugInfo(prev => prev + '\n' + message);
    };

    const initOnquanda = () => {
      const trigger = document.querySelector('.qndTrigger');
      log(`DOM check: qndTrigger exists: ${!!trigger}, window.qnd exists: ${!!window.qnd}`);
      
      if (window.qnd && trigger) {
        log("Calling qnd.init() with trigger available");
        try {
          window.qnd.init();
          log("qnd.init() called successfully");
        } catch (error) {
          log(`Error calling qnd.init(): ${error}`);
        }
      } else {
        log("Trigger or qnd not ready yet, retrying...");
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initOnquanda, 100);
        } else {
          log("Max retries reached. Check console for more details.");
        }
      }
    };

    const scriptId = "onquanda-script";
    if (!window.qnd) {
      // Přidat skript jen pokud tam ještě není
      if (!document.getElementById(scriptId)) {
        log("qnd not found, appending script");
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://webform.onquanda.com/webform/assets/js/qndInitWebform.js';
        script.async = true;
        script.onload = () => {
          log("Script loaded, checking if window.qnd exists");
          log(`window.qnd exists directly after load: ${!!window.qnd}`);
          
          // Pokus o přímé volání init po načtení
          if (window.qnd) {
            try {
              log("Trying direct qnd.init() call");
              window.qnd.init();
              log("Direct qnd.init() called");
            } catch (error) {
              log(`Error in direct qnd.init(): ${error}`);
            }
          } else {
            // Pokud qnd neexistuje ihned, nastavíme interval, který bude čekat na qnd
            log("window.qnd not available immediately, waiting...");
            initOnquanda();
          }
        };
        script.onerror = (error) => {
          log(`Failed to load Onquanda script: ${error}`);
        };
        document.body.appendChild(script);
      } else {
        log("Script already appended, waiting for qnd to become ready");
        // Polling dokud nebude qnd dostupné
        intervalId = setInterval(() => {
          log(`Polling for window.qnd: ${!!window.qnd}`);
          if (window.qnd) {
            if (intervalId) clearInterval(intervalId);
            initOnquanda();
          }
          
          // Ukončit interval po maximálním počtu pokusů
          retryCount++;
          if (retryCount > maxRetries) {
            log("Max polling retries reached");
            if (intervalId) clearInterval(intervalId);
          }
        }, 100);
      }
    } else {
      log("qnd found, initializing");
      initOnquanda();
    }

    // Cleanup funkce pro interval
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
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
      <div className="bg-white rounded-xl p-0 border border-gray-200 mb-12 flex flex-col justify-center items-center">
        <div style={{ display: "block" }} className="qndTrigger mx-auto" data-key="2128f532d89ef03752d1b45d0eac06de" data-form-html-class="" data-static="true"></div>
        
        {/* Debugging info pro vývoj */}
        {process.env.NODE_ENV === 'development' && debugInfo && (
          <div className="mt-4 p-4 bg-gray-100 text-xs font-mono w-full overflow-auto max-h-40">
            <div className="font-bold mb-2">Debug Info:</div>
            {debugInfo.split('\n').map((line, i) => <div key={i}>{line}</div>)}
          </div>
        )}
      </div>
    </section>
  );
} 