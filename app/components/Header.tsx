'use client';

import Link from "next/link";
import Image from "next/image";
import logoSvg from "../../public/logo/coalshift_logo_long-dark-color.svg";
import Button from "./Button";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) { // scrollování dolů
        setIsVisible(false);
      } else { // scrollování nahoru
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);

    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  return (
    <header className={`fixed w-full bg-white shadow-lg transition-transform duration-300 z-50 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex justify-between items-center py-3 px-4 lg:px-20 xl:px-32">
        <div className="flex items-start space-x-2">
          <Link 
            href="/"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Image src={logoSvg} alt="Coalshift Logo" className="min-w-32 w-32 lg:min-w-48 w-48" />
          </Link>
        </div>
        
        {/* Hamburger tlačítko pro mobilní zařízení */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-12">
          <nav className="space-x-12 font-lekton font-bold">
            <Link 
              href="#benefits" 
              className="text-cerna hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              O aplikaci
            </Link>
            <Link 
              href="#video-section" 
              className="text-cerna hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ukázka
            </Link>
            <Link 
              href="#logo-carousel" 
              className="text-cerna hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('logo-carousel')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Reference
            </Link>
            <Link 
              href="#pricing-section" 
              className="text-cerna hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ceník
            </Link>
          </nav>
          <Button 
            variant="primaryModra"
            href="https://app.coalshift.cz/"
            target="_blank"
          >
            Vyzkoušet zdarma!
          </Button>
        </div>
      </div>

      {/* Mobilní menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 mt-[72px]
          ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <nav 
          className={`absolute w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center space-y-8 p-6 font-lekton font-bold">
            <Link 
              href="#benefits"
              className="text-cerna hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              O aplikaci
            </Link>
            <Link 
              href="#video-section"
              className="text-cerna hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Ukázka
            </Link>
            <Link 
              href="#logo-carousel"
              className="text-cerna hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('logo-carousel')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Reference
            </Link>
            <Link 
              href="#pricing-section"
              className="text-cerna hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Ceník
            </Link>
            <Button 
              variant="primaryModra"
              href="https://app.coalshift.cz/"
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
            >
              Vyzkoušet zdarma!
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
