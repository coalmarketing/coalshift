'use client';

import Image from 'next/image';
import logoSvg from '../../public/logo/coalshift_logo_long-light-mono.svg';
import Button from './Button';
import Link from 'next/link';

export default function Hero() {
    return (
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center text-white hero-background px-4 py-12">
        <div className="max-w-[min(90%,1200px)]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-lekton font-bold w-full md:w-[80%] lg:w-full mx-auto mb-8">
              AI plánovač směn, který se nikdy neunaví
          </h1>
          <h2 className="text-md sm:text-lg md:text-2xl font-inter w-full md:w-[70%] lg:w-[70%] mx-auto mb-8 md:mb-12">
            Automatizuj směny, ušetři až 50 % času a zbav se chaosu na pár kliknutí
          </h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center">
            <Button href="https://app.coalshift.cz/register" variant="primaryBila" target="_blank">
              Vyzkoušet zdarma
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
                Zjisti více
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
  