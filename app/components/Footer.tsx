"use client";

import Link from "next/link";
import type { MouseEvent as ReactMouseEvent } from "react";
import { usePathname } from "next/navigation";
import { shouldSmoothScroll, smoothScrollToId } from "../lib/smoothScroll";
import { LOGIN_URL } from "../lib/links";

const NAV = [
  { id: "features", label: "O aplikaci" },
  { id: "pricing", label: "Ceník" },
  { id: "faq", label: "Nejčastější dotazy" },
  { id: "contact", label: "Kontakt" },
] as const;

// coalios footer `.link` treatment: a centre-out underline that animates in on
// hover / keyboard focus (see `.link` in globals.css), plus a colour shift.
const LINK_CLASS =
  "link inline-block py-1 text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleFragment = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome && shouldSmoothScroll(e, id)) {
      e.preventDefault();
      smoothScrollToId(id);
    }
  };

  const fragmentHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="container-page rounded-4xl border border-neutral-200 bg-neutral-50 px-6 py-10 sm:px-10 sm:py-12 dark:border-neutral-800 dark:bg-neutral-900">
        {/* Two desktop columns: brand + company, then navigation. */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-16">
          {/* Brand + company */}
          <div className="flex flex-col items-start gap-4">
            <img
              src="/logo/coalshift_logo_long-dark-color.svg"
              alt="coalshift"
              width={400}
              height={100}
              className="block h-8 w-auto dark:hidden"
              draggable={false}
            />
            <img
              src="/logo/coalshift_logo_long-light-color.svg"
              alt="coalshift"
              width={400}
              height={100}
              className="hidden h-8 w-auto dark:block"
              draggable={false}
            />
            <p className="max-w-sm text-sm text-neutral-700 dark:text-neutral-300">
              Plánování směn a docházky s pomocí AI.
            </p>
            <div className="mt-2 flex flex-col gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="font-lekton text-sm font-bold text-neutral-900 dark:text-white">
                coalsoft s.r.o.
              </span>
              <address className="not-italic leading-relaxed">
                Koliště 1912/13, 602 00 Brno-střed
                <br />
                Kancelář: U Stadionu 923, 561 51 Letohrad
                <br />
                IČ: 07733259 · DIČ: CZ07733259
              </address>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Patička" className="flex flex-col gap-3 sm:items-start">
            <span className="font-lekton text-sm font-bold text-neutral-900 dark:text-white">
              Navigace
            </span>
            <ul className="flex flex-col gap-1 text-sm">
              {NAV.map((item) => (
                <li key={item.id}>
                  <Link
                    href={fragmentHref(item.id)}
                    onClick={(e) => handleFragment(e, item.id)}
                    className={LINK_CLASS}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={LOGIN_URL} className={LINK_CLASS}>
                  Přihlásit se
                </Link>
              </li>
              <li>
                <Link href="/reference" className={LINK_CLASS}>
                  Reference
                </Link>
              </li>
              {/* Full-document anchors so the Waulter provider initialises
                  normally on the legal pages (not Next client navigation). */}
              <li>
                <a href="/gdpr" className={LINK_CLASS}>
                  Zásady ochrany osobních údajů (GDPR)
                </a>
              </li>
              <li>
                <a href="/cookies" className={LINK_CLASS}>
                  Podmínky cookies
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <p>© 2026 coalsoft s.r.o. Všechna práva vyhrazena.</p>
          <p>
            Developed with 💜 by{" "}
            <a
              href="https://coalmarketing.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              coalmarketing.cz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
