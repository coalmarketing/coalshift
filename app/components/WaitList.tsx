import Image from 'next/image';
import Button from './Button';

export default function WaitList() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
          {/* Sekce 1: Potvrzení registrace */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <Image
                src="/illustrations/waiting-list.svg"
                alt="Waiting List Ilustrace"
                width={180}
                height={180}
                className="mx-auto"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Jste na seznamu čekatelů —<br />
              jsme rádi, že jste s námi!
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Coalshift spouštíme 1. 7. 2025. Jakmile bude vaše přihlášení aktivní, dáme vám vědět e-mailem i notifikací.
            </p>
          </div>

          {/* Sekce 2: Bonus pro čekající */}
          <div className="flex items-start gap-4 mb-12 bg-white rounded-xl p-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Image
                  src="/icons/gift-icon.svg"
                  alt="Dárek"
                  width={24}
                  height={24}
                  className="text-emerald-600"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Učte se dřív než ostatní!
              </h2>
              <p className="text-gray-600 mb-4">
                Získejte přístup k tutoriálům a prvním tipům, jak co nejlépe nastavit plánování směn s Coalshiftem – už teď
              </p>
              <Button variant="primaryModra">
                Prozkoumat ukázky už teď
              </Button>
            </div>
          </div>

          {/* Sekce 3: Co můžete očekávat */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Co můžete očekávat dál:
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src="/icons/email-icon.svg"
                    alt="Email"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-gray-700">Potvrzení e-mailem</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src="/icons/bell-icon.svg"
                    alt="Notifikace"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-gray-700">Budoucí notifikace ke stavu přístupu</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src="/icons/calendar-icon.svg"
                    alt="Kalendář"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-gray-700">Přístup bude spuštěn od 1. července 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 