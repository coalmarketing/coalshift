'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import WaitListRegistration from "../components/WaitListRegistration";
import { useEffect } from 'react';

export default function WaitListPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Vytvoříme unikátní ID pro tuto návštěvu - kombinace timestamp a náhodného čísla
    const pageVisitId = `waitlist_visit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Vytvoříme klíč pro localStorage
    const refreshKey = 'waitlist_page_refreshed';
    
    // Načteme současnou hodnotu z localStorage
    const currentValue = localStorage.getItem(refreshKey);
    
    if (!currentValue || currentValue !== pageVisitId) {
      // Uložíme ID této návštěvy do localStorage
      localStorage.setItem(refreshKey, pageVisitId);
      
      // Nastavíme timeout na reload - dáme stránce čas se načíst
      const reloadTimer = setTimeout(() => {
        console.log('Automatické obnovení stránky pro správné načtení formuláře');
        window.location.reload();
      }, 500);
      
      // Cleanup funkce pro useEffect
      return () => clearTimeout(reloadTimer);
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