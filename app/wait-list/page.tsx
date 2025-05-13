'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import WaitListRegistration from "../components/WaitListRegistration";
import { useEffect } from 'react';

export default function WaitListPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Jednoduchý příznak v sessionStorage, který zabrání opakovanému obnovení
    const refreshKey = 'waitlist_page_refreshed';
    
    // Zkontrolujeme, zda jsme již jednou obnovili
    const wasRefreshed = sessionStorage.getItem(refreshKey) === 'true';
    
    if (!wasRefreshed) {
      // Nastavíme příznak, že jsme obnovili stránku
      sessionStorage.setItem(refreshKey, 'true');
      
      // Jednorázové obnovení stránky po krátkém zpoždění
      console.log('Provádím jednorázový refresh pro načtení formuláře');
      setTimeout(() => window.location.reload(), 100);
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