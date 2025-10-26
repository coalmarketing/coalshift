'use client';

import Button from './Button';
import Link from 'next/link';

export default function HealthcareHero() {
    return (
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center text-white hero-background px-4 py-12">
        <div className="max-w-[min(90%,1200px)]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-lekton font-bold w-full md:w-[80%] lg:w-[70%] mx-auto mb-8">
              AI plánovač směn. Čas zpátky pro pacienty.
          </h1>
          <h2 className="text-sm sm:text-md md:text-xl font-inter w-full md:w-[70%] lg:w-[70%] mx-auto mb-8 md:mb-12">
            Zdravotníci tráví hodiny plánováním směn v Excelu.<br/>
            My si vaší práce vážíme – a víme, že váš čas patří pacientům, ne tabulkám.<br/>
            Proto máte <b>coalshift na 30 dní zdarma.</b>
          </h2>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center">
            <Button href="https://app.coalshift.cz/register" variant="primaryBila" target="_blank">
              Vyzkoušet zdarma na 30 dní
            </Button>
            <Link 
              href="#video" 
              className="text-white hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Button variant="secondaryBila">
                Podívat se, jak to funguje
              </Button>
            </Link>
          </div>

          {/* Badge */}
          <div className="mt-8">
              <p>"30 dní zdarma pro zdravotnictví"</p>
          </div>
        </div>
      </section>
    );
}
