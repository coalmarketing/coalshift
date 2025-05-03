'use client';

import Image from 'next/image';
import logoSvg from '../../public/logo/coalshift_logo_long-light-mono.svg';
import Button from './Button';
import Link from 'next/link';

export default function Hero() {
    return (
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center text-white hero-background px-4 py-12">
        <div className="max-w-[min(90%,1200px)]">
          <div className="bg-gradient-to-r from-white/10 to-white/20 border border-white/30 rounded-lg p-4 mb-32 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="hidden sm:block">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 12V24L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-lekton font-bold text-white text-center sm:text-left">
                  Spouštíme 1. července 2025
                </h3>
                <p className="text-sm text-gray-200 font-inter text-center sm:text-left">
                  Zaregistrujte se na waiting list a získejte exkluzivní přístup mezi prvními!
                </p>
              </div>
            </div>
            <Button 
              variant="primaryBila"
              href="/wait-list"
              className="whitespace-nowrap w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto text-center"
            >
              Požádat o přístup
            </Button>
          </div>
          <div className="flex items-center justify-center mb-8 md:mb-20 mt-[-4rem]">
            <Image 
              src={logoSvg}
              alt="Coalshift Logo" 
              width={400}
              height={200}
              priority
              className="w-auto h-[80px] sm:h-[100px] md:h-[150px] object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-lekton font-bold w-full md:w-[80%] lg:w-full mx-auto mb-8">
              Plánujte směny chytře a&nbsp;efektivně!
          </h1>
          <h2 className="text-md sm:text-lg md:text-2xl font-inter w-full md:w-[70%] lg:w-[70%] mx-auto mb-8 md:mb-12">
            Ušetřete až 50 % času stráveného plánováním směn. Automatizujte, zrychlete, digitalizujte.
          </h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center">
            <Button href="https://app.coalshift.cz/" target="_blank" variant="primaryBila">
              Vyzkoušet zdarma!
            </Button>
            <Link 
              href="#benefits" 
              className="text-white hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Button variant="secondaryBila">
                Zjistit více...
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
  