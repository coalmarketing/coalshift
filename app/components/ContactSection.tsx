'use client';
import Button from './Button';

export default function ContactSection() {
  return (
    <div className="max-w-[1200px] mx-auto px-8 pb-16 mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-lekton font-bold mb-6">
        Máte další otázky? Kontaktujte nás!
      </h2>
      <div className="mt-6 space-y-3 ">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#00B6E6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className='font-inter font-thin'>+420 123 456 789</span>
        </div>
        
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#00B6E6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className='font-inter font-thin'>info@coalshift.cz</span>
        </div>
      </div>
      
      <Button variant="primaryModra" className="mt-6">
        Kontaktujte nás!
      </Button>
    </div>
  );
} 