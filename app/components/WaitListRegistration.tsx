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
  const [formLoaded, setFormLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const formInitialized = useRef(false);
  const formContainer = useRef<HTMLDivElement>(null);

  // Manuální vložení formuláře Onquanda
  useEffect(() => {
    // Kontrola, zda jsme v prohlížeči a zda už nebyl formulář inicializován
    if (typeof window === 'undefined' || formInitialized.current) return;
    
    // Označení, že jsme začali inicializaci
    formInitialized.current = true;
    
    // Funkce pro inicializaci formuláře
    const initForm = () => {
      // Kontrola, zda existuje container
      if (!formContainer.current) {
        console.error("Kontejner formuláře není k dispozici");
        setLoadingError(true);
        return;
      }
      
      try {
        // Vytvořit nový trigger element
        const triggerDiv = document.createElement('div');
        triggerDiv.className = "qndTrigger mx-auto";
        triggerDiv.dataset.key = "2128f532d89ef03752d1b45d0eac06de";
        triggerDiv.dataset.formHtmlClass = "";
        triggerDiv.dataset.static = "true";
        triggerDiv.style.display = "block";
        
        // Vložit trigger do kontejneru
        formContainer.current.innerHTML = '';
        formContainer.current.appendChild(triggerDiv);
        
        // Načíst Onquanda skript
        const scriptId = "onquanda-script";
        
        // Odstranit existující skript, pokud existuje
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          existingScript.remove();
        }
        
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://webform.onquanda.com/webform/assets/js/qndInitWebform.js';
        script.async = true;
        
        script.onload = () => {
          console.log("Onquanda skript načten");
          
          // Inicializovat formulář po krátkém zpoždění
          setTimeout(() => {
            if (window.qnd) {
              try {
                window.qnd.init();
                setFormLoaded(true);
                console.log("Formulář inicializován");
              } catch (err) {
                console.error("Chyba při inicializaci qnd:", err);
                setLoadingError(true);
              }
            } else {
              console.error("qnd objekt není dostupný po načtení skriptu");
              setLoadingError(true);
            }
          }, 200);
        };
        
        script.onerror = (err) => {
          console.error("Chyba při načítání Onquanda skriptu:", err);
          setLoadingError(true);
        };
        
        document.body.appendChild(script);
      } catch (err) {
        console.error("Chyba při vytváření formuláře:", err);
        setLoadingError(true);
      }
    };
    
    // Spustit inicializaci s krátkým zpožděním
    setTimeout(initForm, 300);
    
    // Nastavit timeout pro případ, že se formulář nenačte
    const timeoutId = setTimeout(() => {
      if (!formLoaded) {
        console.error("Vypršel časový limit pro načtení formuláře");
        setLoadingError(true);
      }
    }, 10000);
    
    // Cleanup při unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [formLoaded]);

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
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-12 flex flex-col justify-center items-center">
        <div ref={formContainer} className="w-full">
          {!formLoaded && !loadingError && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-modra mx-auto mb-6"></div>
              <p className="text-xl font-inter text-gray-700 mb-2">Načítání formuláře...</p>
              <p className="text-sm text-gray-500">Počkejte prosím, formulář se právě připravuje</p>
            </div>
          )}
          
          {loadingError && (
            <div className="text-center py-12">
              <div className="text-red-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-xl font-inter text-gray-700 mb-4">Nepodařilo se načíst formulář</p>
              <p className="text-sm text-gray-500 mb-6">Došlo k chybě při načítání registračního formuláře</p>
              
              <Button 
                variant="primaryModra" 
                onClick={() => window.location.reload()}
                className="px-6"
              >
                Zkusit znovu
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 