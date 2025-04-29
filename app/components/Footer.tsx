'use client';
import Image from 'next/image';
import Link from 'next/link';
import logoSvg from '../../public/logo/coalshift_logo_long-light-mono.svg';
import Button from './Button';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 32; // 2rem = 32px
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="bg-[#4A4A4A] text-white font-inter py-0 pt-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Levá strana */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Image
                src={logoSvg}
                alt="Coalshift logo"
                width={48}
                height={48}
                className="w-auto h-[50px] sm:h-[60px] md:h-[70px] object-contain"
              />
            </div>
            
            <nav className="flex flex-col space-y-4 text-sm">
              <Link 
                href={isHomePage ? "#benefits" : "/#benefits"} 
                className="underline"
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    scrollToSection('benefits');
                  }
                }}
              >
                O aplikaci
              </Link>
              <Link 
                href={isHomePage ? "#pricing" : "/#pricing"} 
                className="underline"
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }
                }}
              >
                Ceník
              </Link>
              <Link 
                href={isHomePage ? "#faq" : "/#faq"} 
                className="underline"
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    scrollToSection('faq');
                  }
                }}
              >
                Nejčastější dotazy
              </Link>
              <Link 
                href={isHomePage ? "#contact" : "/#contact"} 
                className="underline"
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    scrollToSection('contact');
                  }
                }}
              >
                Kontakt
              </Link>
            </nav>
          </div>

          {/* Pravá strana */}
          <div className="space-y-8">
            <div>
              <h3 className="font-lekton font-bold text-3xl mb-2">coalshift</h3>
              <div className="space-y-1 text-sm">
                <p>coalsoft s.r.o.</p>
                <p>Koliště 1912/13, 602 00 Brno-střed</p>
                <p>IČ: 07733259</p>
                <p>DIČ: CZ07733259</p>
              </div>
            </div>

            <div className='text-sm'>
              <h3 className="font-bold text-xl mb-2">Kancelář Letohrad</h3>
              <p>U Stadionu 923, 561 51 Letohrad</p>
            </div>
          </div>
        </div>

        {/* Podpis designéra */}
      </div>
      <div className="text-center mt-16 bg-white p-3">
          <p className="text-sm text-cerna">
            Designed with ♥ by{' '}
            <Link href="https://coalmarketing.cz" className="underline">
              coalmarketing
            </Link>
            .
          </p>
        </div>
    </footer>
  );
} 