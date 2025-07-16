import Image from 'next/image';
import calendarIcon from '../../public/icons/calendar-icon.svg';
import adminIcon from '../../public/icons/admin-icon.svg';
import heartIcon from '../../public/icons/heart-icon.svg';
import phoneImage from '../../public/mocup-coalshift.png';
import Button from './Button';
export default function Benefits() {
  return (
    <section id="benefits" className="flex flex-col lg:flex-row justify-between items-center max-w-[1200px] mx-auto px-8 py-16 gap-8 text-cerna lg:mt-32 lg:mb-20">
      <div className="w-full lg:w-1/2 space-y-12 mt-0 lg:mt-[-80px]">
        <div>
        <h2 className="text-modra text-3xl sm:text-4xl md:text-5xl font-lekton font-bold mb-6">
          Klíčové výhody AI asistenta
        </h2>
        <p className="text-cerna font-inter text-sm">Trávíš hodiny nad papírováním a složitým nastavováním směn? Bojíš se chyb v rozvrzích, nedodržení zákonných podmínek a nespokojených zaměstnanců?<br/><br/>Coalshift je tvůj chytrý AI asistent pro plánování směn, který se nikdy neunaví a přebírá náročné rutinní úkoly – ušetří ti hodiny administrativní práce, respektuje preference zaměstnanců, zajišťuje správné dodržování zákonných pravidel a nabízí okamžité přehledné reporty.</p>
        </div>

        <div className="flex items-start gap-4">
          <Image
            src={calendarIcon}
            alt="Kalendář ikona"
            width={48}
            height={48}
            className='w-12'
          />
          <div>
            <h3 className="text-2xl font-lekton font-bold">Automatizované plánování</h3>
            <p className="font-inter font-thin">AI vytvoří optimální směny jedním kliknutím.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Image
            src={adminIcon}
            alt="Admin ikona"
            width={48}
            height={48}
            className='w-12'
          />
          <div>
            <h3 className="text-2xl font-lekton font-bold">Snížení administrativní zátěže</h3>
            <p className="font-inter font-thin">Méně ruční práce, více strategických rozhodnutí.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Image
            src={heartIcon}
            alt="Srdce ikona"
            width={48}
            height={48}
            className='w-12'
          />
          <div>
            <h3 className="text-2xl font-lekton font-bold">Spokojení zaměstnanci</h3>
            <p className="font-inter font-thin">Spravedlivé rozdělení směn, snížení stresu.</p>
          </div>
        </div>

        <div className="flex justify-start mt-8">
          <Button href="https://app.coalshift.cz/register" variant="primaryModra" target="_blank">
            Vyzkoušet zdarma  
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center md:mt-[-100px]">
        <Image
          src={phoneImage}
          alt="Ukázka aplikace na telefonu"
          width={600}
          height={1000}
          className="max-w-[500px] h-auto"
          priority
        />
      </div>
    </section>
  );
} 