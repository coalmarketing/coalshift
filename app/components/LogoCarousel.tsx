'use client';
import Image from 'next/image';
import { useState } from 'react';
import Button from './Button';

const logos = [
  {
    src: 'logo/coalshift_logo_long-light-mono.svg',
    alt: 'Coalshift',
    width: 150,
    height: 50,
  },
  {
    src: 'logo/coalshift_logo_long-light-mono.svg',
    alt: 'Coalshift',
    width: 150,
    height: 50,
  },
  {
    src: 'logo/coalshift_logo_long-light-mono.svg',
    alt: 'Coalshift',
    width: 150,
    height: 50,
  },
  {
    src: 'logo/coalshift_logo_long-light-mono.svg',
    alt: 'Coalshift',
    width: 150,
    height: 50,
  },
  {
    src: 'logo/coalshift_logo_long-light-mono.svg',
    alt: 'Coalshift',
    width: 150,
    height: 50,
  },
];

export default function LogoCarousel() {
  const [duplicatedLogos] = useState([...logos, ...logos, ...logos]);
  
  return (
    <section id="logo-carousel" className="w-full bg-modra py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-lekton font-bold text-center mb-16">
          Naši spokojení zákazníci
        </h2>
        
        <div className="overflow-hidden mb-12">
          <div className="relative">
            <div 
              className="flex whitespace-nowrap animate-[scroll_40s_linear_infinite]"
              style={{ willChange: 'transform' }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 inline-flex"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain brightness-0 invert hover:brightness-100 hover:invert-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button variant="secondaryBila" href="/reference">
            Zobrazit reference
          </Button>
        </div>
      </div>
    </section>
  );
} 