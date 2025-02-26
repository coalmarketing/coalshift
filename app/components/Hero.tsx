'use client';

import Image from 'next/image';
import logoSvg from '../../public/logo/coalshift_logo_long-light-mono.svg';
import Button from './Button';
import Link from 'next/link';

export default function Hero() {
    return (
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center text-white hero-background px-4 py-12 pt-[100px]">
        <div className="max-w-[min(90%,1200px)]">
          <div className="flex items-center justify-center mb-8 md:mb-20">
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
  