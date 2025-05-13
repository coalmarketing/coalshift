'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import WaitListRegistration from "../components/WaitListRegistration";
import { useEffect } from 'react';

// Jednoduchá funkce, která provede refresh stránky pouze jednou
// pomocí proměnné v URL
export default function WaitListPage() {
  useEffect(() => {
    // Kontrola, zda jsme v prohlížeči
    if (typeof window === 'undefined') return;
    
    // Zjistíme, zda URL obsahuje parametr refreshed=true
    const hasRefreshed = window.location.href.includes('refreshed=true');
    
    // Pokud ne, přidáme parametr a provedeme refresh
    if (!hasRefreshed) {
      const separator = window.location.href.includes('?') ? '&' : '?';
      window.location.href = window.location.href + separator + 'refreshed=true';
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