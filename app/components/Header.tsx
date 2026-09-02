'use client';

import Link from "next/link";
import Image from "next/image";
import logoSvg from "../../public/logo/coalshift_logo_long-dark-color.svg";
import Button from "./Button";
import { useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { usePathname } from "next/navigation";
import { isPlainActivation, shouldSmoothScroll, smoothScrollToId } from "../lib/smoothScroll";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Desktop/footer fragment link: intercept only an ordinary same-page
  // activation with an existing target; modifier clicks and anchors that target
  // another browsing context fall through to the browser.
  const handleFragment = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHomePage && shouldSmoothScroll(e, id)) {
      e.preventDefault();
      smoothScrollToId(id);
    }
  };

  // Mobile nav item: same interception guard, then return focus to the menu
  // button (before the menu subtree becomes `inert`) and close.
  const closeMenuAndScroll = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHomePage && shouldSmoothScroll(e, id)) {
      e.preventDefault();
      smoothScrollToId(id);
    }
    menuButtonRef.current?.focus();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed w-full bg-white shadow-lg z-50">
        <div className="flex justify-between items-center py-3 px-4 lg:px-20 xl:px-32">
          <div className="flex items-start space-x-2">
            <Link
              href="/"
              onClick={(e) => {
                if (isHomePage && isPlainActivation(e)) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <Image
                src={logoSvg}
                alt="Coalshift Logo"
                className="min-w-32 w-32 lg:min-w-48 w-48"
                sizes="(max-width: 1024px) 8rem, 12rem"
              />
            </Link>
          </div>

          {/* Hamburger tlačítko pro mobilní zařízení */}
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-12">
            <nav className="space-x-12 font-lekton font-bold">
              <Link
                href={isHomePage ? "#benefits" : "/#benefits"}
                className="text-cerna hover:underline"
                onClick={(e) => handleFragment(e, 'benefits')}
              >
                O aplikaci
              </Link>
              <Link
                href={isHomePage ? "#pricing" : "/#pricing"}
                className="text-cerna hover:underline"
                onClick={(e) => handleFragment(e, 'pricing')}
              >
                Ceník
              </Link>
              <Link
                href={isHomePage ? "#faq" : "/#faq"}
                className="text-cerna hover:underline"
                onClick={(e) => handleFragment(e, 'faq')}
              >
                Nejčastější dotazy
              </Link>
              <Link
                href={isHomePage ? "#contact" : "/#contact"}
                className="text-cerna hover:underline"
                onClick={(e) => handleFragment(e, 'contact')}
              >
                Kontakt
              </Link>
            </nav>
            <div className="flex items-center space-x-12">
              <Link
                href="/zdravotnici"
                className="text-cerna hover:underline font-lekton font-bold"
              >
                Zdravotníci
              </Link>
              <Link
                href="https://app.coalshift.cz/login"
                className="text-modra hover:underline font-lekton font-bold"
              >
                Přihlášení
              </Link>
              <Button
                variant="primaryModra"
                href="https://app.coalshift.cz/register"
                target="_blank"
              >
                Vyzkoušet zdarma
              </Button>
            </div>
          </div>
        </div>

        {/* Mobilní menu */}
        <div
          id="mobile-menu"
          inert={!isMenuOpen}
          className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 mt-[72px]
            ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <nav
            className={`absolute w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
              ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center space-y-8 p-6 font-lekton font-bold">
              <Link
                href={isHomePage ? "#benefits" : "/#benefits"}
                className="text-cerna hover:underline"
                onClick={(e) => closeMenuAndScroll(e, 'benefits')}
              >
                O aplikaci
              </Link>
              <Link
                href={isHomePage ? "#pricing" : "/#pricing"}
                className="text-cerna hover:underline"
                onClick={(e) => closeMenuAndScroll(e, 'pricing')}
              >
                Ceník
              </Link>
              <Link
                href={isHomePage ? "#faq" : "/#faq"}
                className="text-cerna hover:underline"
                onClick={(e) => closeMenuAndScroll(e, 'faq')}
              >
                Nejčastější dotazy
              </Link>
              <Link
                href={isHomePage ? "#contact" : "/#contact"}
                className="text-cerna hover:underline"
                onClick={(e) => closeMenuAndScroll(e, 'contact')}
              >
                Kontakt
              </Link>
              <Link
                href="/zdravotnici"
                className="text-cerna hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Zdravotníci
              </Link>
              <div className="flex flex-col space-y-4 w-full">
                <Link
                  href="https://app.coalshift.cz/login"
                  className="text-modra hover:underline font-lekton font-bold text-center"
                  target="_blank"
                  rel="noopener"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Přihlášení
                </Link>
                <Button
                  variant="primaryModra"
                  href="https://app.coalshift.cz/register"
                  target="_blank"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vyzkoušet zdarma
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* Prázdný div pro kompenzaci výšky fixního headeru */}
      <div className="h-[72px]"></div>
    </>
  );
}
