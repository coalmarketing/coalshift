'use client';

import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WaitListRegistration from "../components/WaitListRegistration";

export default function WaitListPage() {
  useEffect(() => {
    // Kontrola, zda je to první načtení stránky
    const hasReloaded = sessionStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      // Nastav příznak, že reload proběhl
      sessionStorage.setItem('hasReloaded', 'true');
      // Proveď reload
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