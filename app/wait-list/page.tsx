'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import WaitListRegistration from "../components/WaitListRegistration";
import { useEffect } from 'react';

// Jednoduchá funkce, která provede refresh stránky pouze jednou
export default function WaitListPage() {
  useEffect(() => {
    // Kontrola, zda jsme v prohlížeči
    if (typeof window === 'undefined') return;
    
    // Klíč pro sessionStorage
    const refreshKey = 'waitlist_refreshed';
    
    // Zkontrolujeme, zda už došlo k obnovení
    const wasRefreshed = sessionStorage.getItem(refreshKey);
    
    if (!wasRefreshed) {
      // Nastavíme příznak, že došlo k obnovení
      sessionStorage.setItem(refreshKey, 'true');
      
      // Provedeme jednoduché obnovení stránky, bez změny URL
      window.location.reload();
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