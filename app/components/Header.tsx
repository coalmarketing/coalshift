"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { usePathname } from "next/navigation";
import {
  isPlainActivation,
  shouldSmoothScroll,
  smoothScrollToId,
  scrollToTop,
} from "../lib/smoothScroll";
import ThemeToggle from "./theme/ThemeToggle";
import CtaButton from "./ui/CtaButton";
import { FamilyIcon } from "./icons/FamilyIcons";
import { LOGIN_URL } from "../lib/links";

type FamilyLink = {
  key: string;
  href: string;
  label: string;
  parent?: boolean;
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

// Reference fluid values (coalios header.njk): nav list gap and link padding.
const NAV_GAP = "gap-[clamp(0.5rem,-0.21rem+1.79vw,1.5rem)]";
const NAV_LINK_PAD = "px-[clamp(0.375rem,-0.071rem+1.116vw,1rem)]";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const familyRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const restoreFocusRef = useRef(true);
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

  // `restoreFocus` = true for Escape / the close control (return to the
  // hamburger); false when a menu link handled its own destination focus.
  const closeMenu = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setMenuOpen(false);
  }, []);

  // Focus management: into the menu's close control on open; back to the
  // hamburger on an Escape/close-control dismissal only.
  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
      menuCloseRef.current?.focus();
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      if (restoreFocusRef.current) menuButtonRef.current?.focus();
      restoreFocusRef.current = true;
    }
  }, [menuOpen]);

  // Modal mobile menu: body scroll lock, background inert (skip link + main +
  // footer; the header is inert via its own prop), Escape close and a Tab focus
  // wrap so forward/reverse Tab never leaves the visible menu.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const menuEl = document.getElementById("mobile-menu");
    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>("main, body > footer"),
    ).filter((el) => !menuEl || !el.contains(menuEl));
    for (const el of inertTargets) el.setAttribute("inert", "");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const menu = document.getElementById("mobile-menu");
      if (!menu) return;
      const focusables = menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !menu.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      for (const el of inertTargets) el.removeAttribute("inert");
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
      // Close first so the modal effect lifts `inert` from <main>; only then can
      // the destination section take programmatic focus. `restoreFocus = false`
      // keeps the focus effect from pulling focus back to the hamburger.
      closeMenu(false);
      setTimeout(() => smoothScrollToId(id), 0);
      return;
    }
    closeMenu();
  };

  const handleLogo = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (isHome && isPlainActivation(e)) {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <>
      <a
        href="#main"
        inert={menuOpen ? true : undefined}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-neutral-900 dark:focus:bg-neutral-900 dark:focus:text-white"
      >
        Přeskočit na hlavní obsah
      </a>

      <header
        inert={menuOpen ? true : undefined}
        className="fixed inset-x-0 top-0 z-40 flex flex-col ease-in-out motion-reduce:!transition-none"
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
          className={`relative z-20 px-4 pb-2 pt-3 duration-300 ease-in-out motion-reduce:!transition-none sm:px-6 ${
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
                        : `text-neutral-500 ${item.hover}`
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
                    className="pointer-events-none absolute left-1/2 top-[calc(100%+0.3rem)] z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-0.5 text-[0.7rem] leading-none text-neutral-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
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
              className="flex h-[4.5rem] items-center justify-between gap-4 pl-6 pr-4 xl:h-20 xl:gap-8 xl:pl-8"
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

              {/* Desktop nav — Inter 16px, shown from xl (1280px). Each <li>
                  spans the full nav height; a 2px underline on the bar's bottom
                  edge scales in from its centre on hover / keyboard focus
                  (coalios header.njk — no origin-left). Fragment links are never
                  marked "current". */}
              <ul
                className={`hidden items-stretch font-inter text-base font-medium xl:flex ${NAV_GAP}`}
              >
                {NAV.map((item) => (
                  <li
                    key={item.id}
                    className="relative flex h-20 items-center before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:scale-x-0 before:bg-black before:transition-transform before:duration-500 before:ease-in-out hover:before:scale-x-100 has-[a:focus-visible]:before:scale-x-100 dark:before:bg-white"
                  >
                    <Link
                      href={fragmentHref(item.id)}
                      onClick={(e) => handleFragment(e, item.id)}
                      className={`flex h-full items-center text-neutral-700 transition-colors hover:text-coalsoft-700 dark:text-neutral-200 dark:hover:text-coalsoft-300 ${NAV_LINK_PAD}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Action cluster (G3): below xl only the theme control + hamburger;
                  at xl+ theme control then the sole primary login CTA. No trial
                  CTA in any header variant. */}
              <div className="flex items-center gap-2 xl:gap-4">
                <ThemeToggle />
                {/* Wrapper toggles visibility — `.cta` sets its own display, so a
                    `hidden` class on the button itself would be overridden. */}
                <span className="hidden xl:inline-flex">
                  <CtaButton
                    href={LOGIN_URL}
                    label="Přihlásit se"
                    variant="primary"
                    size="md"
                  />
                </span>
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

      {/* Full-screen mobile menu — ports coalios header.njk: top-origin scale
          transition, full-viewport surface, own logo/close row, vertical list,
          internal scroll. Covers the (inert) header; login is the only CTA. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigace"
        inert={!menuOpen}
        className={`fixed inset-0 z-50 flex h-[100dvh] w-screen origin-top flex-col gap-10 overflow-y-auto bg-white px-6 py-6 transition-transform duration-300 ease-in-out motion-reduce:!transition-none xl:hidden dark:bg-black ${
          menuOpen ? "scale-y-100" : "pointer-events-none scale-y-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" onClick={(e) => { handleLogo(e); closeMenu(); }} aria-label="coalshift — domů">
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
          <button
            ref={menuCloseRef}
            type="button"
            onClick={() => closeMenu()}
            aria-label="Zavřít navigaci"
            className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-800 dark:border-neutral-700 dark:text-neutral-100"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobilní navigace">
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
        </nav>

        <div className="mt-auto">
          <CtaButton
            href={LOGIN_URL}
            variant="primary"
            label="Přihlásit se"
            size="lg"
            onClick={() => closeMenu(false)}
          />
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
