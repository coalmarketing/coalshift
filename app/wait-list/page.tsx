'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "../components/Header";
import Footer from "../components/Footer";
import WaitListRegistration from "../components/WaitListRegistration";

export const dynamic = 'force-dynamic'; 

export default function WaitListPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Vynucení aktualizace stránky při navigaci
    const handleRouteChange = () => {
      if (window.location.pathname === '/wait-list') {
        router.refresh();
      }
    };
    
    handleRouteChange(); // Zkontrolujeme při prvním načtení
    
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [router]);
  
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-gray-50">
        <WaitListRegistration key={Date.now()} />
      </main>
      <Footer />
    </>
  );
} 