'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import WaitListRegistration from "../components/WaitListRegistration";
import { useEffect } from 'react';

export default function WaitListPage() {
  useEffect(() => {
    // Kontrola, zda jsme v prohlížeči
    if (typeof window === 'undefined') return;
    
    // Použijeme sessionStorage pro sledování, zda už jsme provedli refresh
    const hasRefreshed = sessionStorage.getItem('waitlist_refreshed');
    
    if (!hasRefreshed) {
      // Označíme, že jsme provedli refresh
      sessionStorage.setItem('waitlist_refreshed', 'true');
      // Provedeme refresh stránky
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