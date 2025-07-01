'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import WaitListRegistration from "../components/WaitListRegistration";
import { useEffect } from 'react';

// Jednoduchá funkce, která provede refresh stránky pouze jednou
// pomocí proměnné v URL a poté ji odstraní
export default function RegistracePage() {
  useEffect(() => {
    // Kontrola, zda jsme v prohlížeči
    if (typeof window === 'undefined') return;
    
    const url = new URL(window.location.href);
    const hasRefreshed = url.searchParams.get('refreshed') === 'true';
    
    if (hasRefreshed) {
      // Pokud máme parametr refreshed=true, odstraníme ho z URL
      url.searchParams.delete('refreshed');
      window.history.replaceState({}, document.title, url);
    } else {
      // Pokud ne, přidáme parametr a provedeme refresh
      url.searchParams.set('refreshed', 'true');
      window.location.href = url.toString();
    }
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-gray-50">
        <WaitListRegistration />
      </main>
      <Footer />
    </>
  );
} 