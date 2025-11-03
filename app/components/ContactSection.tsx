'use client';
import Button from './Button';
import Image from 'next/image';
import hajekImage from '../../public/img/adamec.png';
import phoneIcon from '../../public/icons/phone-icon.svg';
import emailIcon from '../../public/icons/email-icon.svg';

export default function ContactSection() {
  return (
    <div id="contact-section" className="max-w-[1200px] mx-auto px-4 sm:px-8">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-4">
        <div className="flex-1 w-full lg:w-auto text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-lekton font-bold mb-8">
            Máš další dotazy? Kontaktuj nás!
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <Image
                src={phoneIcon}
                alt="Telefon"
                width={24}
                height={24}
              />
              <a href="tel:+420608713130" className="text-base sm:text-lg font-inter font-thin hover:text-primary transition-colors">+420 608 713 130</a>
            </div>
            
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <Image
                src={emailIcon}
                alt="Email"
                width={24}
                height={24}
              />
              <a href="mailto:miroslav.adamec@coalsoft.cz" className="text-base sm:text-lg font-inter font-thin hover:text-primary transition-colors">miroslav.adamec@coalsoft.cz</a>
            </div>
          </div>
          
          <a href="mailto:miroslav.adamec@coalsoft.cz">
            <Button variant="primaryModra" className="mt-6">
              Kontaktuj nás!
            </Button>
          </a>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center lg:mt-[-60px]">
          <div className="text-center lg:text-right mb-4 flex flex-col items-center lg:items-end order-2 sm:order-1">
            <h3 className="text-xl sm:text-2xl font-bold font-lekton">Miroslav Adamec</h3>
            <p className="text-gray-600 font-inter font-thin">Development manager, obchodní konzultant</p>
          </div>
          <div className="relative w-[200px] sm:w-[250px] lg:w-[300px] h-[300px] sm:h-[350px] lg:h-[400px] order-1 sm:order-2">
            <Image
              src={hajekImage}
              alt="Miroslav Adamec - Development manager, obchodní konzultant"
              fill
              style={{ objectFit: 'contain' }}
              priority
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 300px"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 