"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { usePathname } from "next/navigation";
import {
  isPlainActivation,
  shouldSmoothScroll,
  smoothScrollToId,
} from "../lib/smoothScroll";
import ThemeToggle from "./theme/ThemeToggle";
import CtaButton from "./ui/CtaButton";
import { FamilyIcon } from "./icons/FamilyIcons";
import { REGISTER_URL, LOGIN_URL } from "../lib/links";

type FamilyLink = {
  key: string;
  href: string;
  label: string;
  parent?: boolean;
  /** brand hover/focus colour class */
  hover: string;
};

const FAMILY: FamilyLink[] = [
  { key: "coalsoft", href: "https://coalsoft.cz/", label: "coalsoft", parent: true, hover: "" },
  { key: "coalios", href: "https://coalios.cz/", label: "coalios", hover: "hover:text-coalios focus-visible:text-coalios" },
  { key: "coaledu", href: "https://coaledu.cz/", label: "coaledu", hover: "hover:text-coaledu focus-visible:text-coaledu" },
  { key: "coalmarketing", href: "https://coalmarketing.cz/", label: "coalmarketing", hover: "hover:text-coalmarketing focus-visible:text-coalmarketing" },
  { key: "coalfamily", href: "https://coalfamily.cz/", label: "coalfamily", hover: "hover:text-coalfamily focus-visible:text-coalfamily" },
];

// Homepage in-page anchors. "O aplikaci" points at the key-functions overview
// (`features`); the practical-use browser owns `benefits`.
const NAV = [
  { id: "features", label: "O aplikaci" },
  { id: "pricing", label: "Ceník" },
  { id: "faq", label: "Nejčastější dotazy" },
  { id: "contact", label: "Kontakt" },
] as const;

// coalios nav.js toggles its scroll state at scrollTop >= 100.
const SCROLL_THRESHOLD = 100;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const familyRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Publish the family-strip block height (translated away on scroll) and the
  // visible nav-bar height (fragment clearance) so the JS/native scroll offsets
  // and the document-flow spacer stay correct at every width.
  useEffect(() => {
    const fam = familyRef.current;
    const nav = navRef.current;
    if (!fam || !nav) return;
    const publish = () => {
      const root = document.documentElement;
      root.style.setProperty(
        "--family-block-h",
        `${Math.round(fam.getBoundingClientRect().height)}px`,
      );
      root.style.setProperty(
        "--header-height",
        `${Math.round(nav.getBoundingClientRect().height)}px`,
      );
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(fam);
    ro.observe(nav);
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publish);
    };
  }, []);

  // Scroll state — synced immediately (handles reload / scroll restoration).
  useEffect(() => {
    const update = () => {
      const y =
        document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
      setScrolled(y >= SCROLL_THRESHOLD);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Enable the surface/translation transitions only after the first paint so a
  // scroll-restored load snaps to the correct state without animating.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const closeMenu = useCallback(() => {
    // Move focus back to the toggle before the menu subtree becomes inert.
    menuButtonRef.current?.focus();
    setMenuOpen(false);
  }, []);

  // Body scroll lock + Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const fragmentHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const handleFragment = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome && shouldSmoothScroll(e, id)) {
      e.preventDefault();
      smoothScrollToId(id);
    }
  };

  const handleMobileFragment = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome && shouldSmoothScroll(e, id)) {
      e.preventDefault();
      smoothScrollToId(id);
    }
    closeMenu();
  };

  const handleLogo = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (isHome && isPlainActivation(e)) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-neutral-900 dark:focus:bg-neutral-900 dark:focus:text-white"
      >
        Přeskočit na hlavní obsah
      </a>

      <header
        className="fixed inset-x-0 top-0 z-50 flex flex-col ease-in-out motion-reduce:!transition-none"
        style={{
          transform: scrolled ? "translateY(calc(-1 * var(--family-block-h, 4rem)))" : undefined,
          transition: mounted ? "transform 500ms ease-in-out" : undefined,
        }}
      >
        {/* coalfamily bar — floats at the top, translated out of view on scroll
            and made inert so the hidden links are not offscreen tab stops. */}
        <div
          ref={familyRef}
          inert={scrolled ? true : undefined}
          className={`px-4 pb-2 pt-3 duration-300 ease-in-out motion-reduce:!transition-none sm:px-6 ${
            mounted ? "transition-opacity" : ""
          } ${scrolled ? "opacity-0" : "opacity-100"}`}
        >
          <div className="mx-auto flex h-11 w-full max-w-[80rem] items-center justify-end gap-3 px-2 2xl:max-w-[96rem]">
            <span className="hidden font-lekton text-sm leading-none text-neutral-500 sm:inline dark:text-neutral-400">
              coalfamily<span className="text-coalsoft-500">:</span>
            </span>
            <ul className="flex items-center gap-2.5">
              {FAMILY.map((item) => (
                <li key={item.key} className="group relative">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded p-1 transition-colors ${
                      item.parent
                        ? "text-coalsoftBrand"
                        : `text-neutral-400 dark:text-neutral-500 ${item.hover}`
                    }`}
                  >
                    <span className="sr-only">
                      {item.label}
                      {item.parent ? " (mateřská značka)" : ""} — otevře se v novém okně
                    </span>
                    <FamilyIcon name={item.key} className="size-7" />
                  </a>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-[calc(100%+0.4rem)] -translate-x-1/2 whitespace-nowrap rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[0.7rem] leading-none text-neutral-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation surface — a floating rounded pill at the top; a flush,
            full-viewport-width bar once scrolled (coalios header.njk / nav.js). */}
        <div
          className={`px-4 duration-300 ease-in-out motion-reduce:!transition-none sm:px-6 ${
            mounted ? "transition-colors" : ""
          } ${scrolled ? "bg-white/90 shadow-sm dark:bg-black/90" : ""}`}
        >
          <div
            ref={navRef}
            data-nav-bar
            className={`mx-auto w-full max-w-[80rem] duration-300 ease-in-out motion-reduce:!transition-none 2xl:max-w-[96rem] ${
              mounted ? "transition-[background-color,border-color,border-radius,box-shadow]" : ""
            } ${
              scrolled
                ? "rounded-none border border-transparent bg-transparent shadow-none backdrop-blur-none"
                : "rounded-full border border-neutral-200/80 bg-white/50 shadow-md backdrop-blur dark:border-neutral-800/80 dark:bg-black/50"
            }`}
          >
            <nav
              aria-label="Hlavní navigace"
              className="flex h-[4.5rem] items-center justify-between gap-4 pl-6 pr-4 xl:h-20 xl:gap-6 xl:pl-8"
            >
              <Link href="/" onClick={handleLogo} className="shrink-0" aria-label="coalshift — domů">
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
              </Link>

              {/* Desktop nav — Inter 16px, shown from xl (1280px) like the
                  reference. Each <li> spans the full nav height; a 2px underline
                  on the bar's bottom edge scales in on hover / keyboard focus.
                  Homepage fragment links are never marked "current". */}
              <ul className="hidden items-stretch gap-6 font-inter text-base font-medium xl:flex">
                {NAV.map((item) => (
                  <li
                    key={item.id}
                    className="relative flex h-20 items-center before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-black before:transition-transform before:duration-500 before:ease-in-out hover:before:scale-x-100 has-[a:focus-visible]:before:scale-x-100 dark:before:bg-white"
                  >
                    <Link
                      href={fragmentHref(item.id)}
                      onClick={(e) => handleFragment(e, item.id)}
                      className="flex h-full items-center text-neutral-700 transition-colors hover:text-coalsoft-700 dark:text-neutral-200 dark:hover:text-coalsoft-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Action order (F6): secondary trial → theme switch → primary
                  login. Visible order and keyboard order agree. */}
              <div className="flex items-center gap-2 sm:gap-3">
                <CtaButton
                  href={REGISTER_URL}
                  target="_blank"
                  label="Vyzkoušet na 14 dní zdarma"
                  variant="secondary"
                  size="md"
                  className="hidden sm:inline-flex"
                />
                <ThemeToggle />
                <CtaButton
                  href={LOGIN_URL}
                  label="Přihlásit se"
                  variant="primary"
                  size="md"
                  className="hidden sm:inline-flex"
                />
                <button
                  ref={menuButtonRef}
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-800 xl:hidden dark:border-neutral-700 dark:text-neutral-100"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  aria-label={menuOpen ? "Zavřít navigaci" : "Otevřít navigaci"}
                  onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col gap-8 overflow-y-auto bg-white px-6 pb-10 pt-[calc(var(--header-height,5rem)+2rem)] transition-opacity duration-200 xl:hidden dark:bg-black ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 font-lekton text-lg font-bold">
          {NAV.map((item) => (
            <li key={item.id}>
              <Link
                href={fragmentHref(item.id)}
                onClick={(e) => handleMobileFragment(e, item.id)}
                className="block rounded-lg px-2 py-3 text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          <CtaButton href={LOGIN_URL} variant="primary" label="Přihlásit se" size="lg" onClick={closeMenu} />
          <CtaButton href={REGISTER_URL} target="_blank" variant="secondary" label="Vyzkoušet na 14 dní zdarma" size="lg" onClick={closeMenu} />
        </div>
      </div>

      {/* Document-flow spacer — the full top-state header height, so scrolling
          (which only transforms the fixed header) never reflows the page. */}
      <div
        aria-hidden="true"
        style={{
          height:
            "calc(var(--family-block-h, 4rem) + var(--header-height, 5rem))",
        }}
      />
    </>
  );
}
