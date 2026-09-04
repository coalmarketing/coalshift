"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import Section, { SectionHeading } from "../ui/Section";
import FragmentCta from "../ui/FragmentCta";
import ResponsiveImage from "../ResponsiveImage";

/**
 * Homepage product gallery — three real application screenshots.
 *
 * Ports the coalios `sections/page-content.njk` layered-image principle into the
 * coalshift design system: an `xl:basis-1/2` split, a `.glow-border--lg` layered
 * rounded frame, and a playful stack of the **three real screenshots** — one
 * straight in front, one tilted above/left, one tilted below/right.
 *
 * The three cards are persistent: `SLIDES` is rendered in stable order, each
 * card keyed by its screenshot identity and keeping its own image forever. Its
 * visual role — `front` / `upper` / `lower` — is derived from the active index,
 * and navigating animates only the CSS `transform` between roles (`.pg-card*` in
 * globals.css, ~340 ms). So the actual cards glide: `next` cycles
 * upper → front → lower → upper, `previous` reverses it; no image ever swaps.
 * `prefers-reduced-motion` switches roles instantly.
 *
 * A single transparent `<button>` overlay sits at the front-card box as the one
 * stable keyboard focus target / fullscreen trigger; the moving cards are
 * `aria-hidden` (bar the front one's alt), `pointer-events-none` and never tab
 * stops. Deliberate previous/next + `1 / 3` counter, wrapping navigation,
 * horizontal touch swipe, and an accessible fullscreen dialog (its own accepted
 * slide-in, unchanged). No carousel library, no autoplay.
 *
 * Focus has a single owner: the fullscreen dialog's own cleanup effect moves
 * focus back to the opener button (`focus({ preventScroll: true })`) after it
 * has removed background `inert` and restored body scrolling. Nothing focuses
 * the opener on mount, so loading the page never steals focus or scrolls to
 * the gallery.
 */

type Slide = {
  /** image-registry key */
  src: string;
  /** short slide name for the live announcement + fullscreen accessible name */
  name: string;
  /** full accessible description (image alt) */
  alt: string;
};

const SLIDES: Slide[] = [
  {
    src: "/img/product-gallery/coalshift-smeny.png",
    name: "Směny",
    alt: "Týdenní plán směn v aplikaci coalshift s přehledem pozic a obsazení.",
  },
  {
    src: "/img/product-gallery/coalshift-pozice.png",
    name: "Pozice",
    alt: "Seznam pracovních pozic v aplikaci coalshift.",
  },
  {
    src: "/img/product-gallery/coalshift-zamestnanci.png",
    name: "Zaměstnanci",
    alt: "Seznam zaměstnanců a pracovních údajů v aplikaci coalshift.",
  },
];

const HEADING = "Podívejte se, jak coalshift vypadá v praxi";
const INTRO =
  "Plánujte směny, kontrolujte obsazení a spravujte pozice i zaměstnance v jednom přehledném prostředí. Prohlédněte si skutečné obrazovky aplikace, se kterými budete pracovat každý den.";

const INLINE_SIZES = "(min-width: 1280px) 45vw, 92vw";
const FULLSCREEN_SIZES = "95vw";

/** min horizontal travel (px) that counts as a swipe */
const SWIPE_THRESHOLD = 48;

function wrap(index: number, length: number): number {
  return (index + length) % length;
}

/** Enter-animation class for the keyed screenshot wrapper. */
function slideClass(direction: 1 | -1): string {
  return direction === 1 ? "pg-slide pg-slide-next" : "pg-slide pg-slide-prev";
}

/**
 * Horizontal-swipe detection that leaves vertical page scrolling untouched and
 * suppresses the click that a browser fires after a swipe ends (so a swipe on
 * the screenshot changes the slide without also opening fullscreen).
 */
function useSwipe(onSwipe: (direction: 1 | -1) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const horizontal = useRef<boolean | null>(null);
  const justSwiped = useRef(false);

  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY };
    horizontal.current = null;
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (horizontal.current === null && Math.abs(dx) + Math.abs(dy) > 10) {
      horizontal.current = Math.abs(dx) > Math.abs(dy);
    }
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    const from = start.current;
    start.current = null;
    if (!from || horizontal.current !== true) return;
    const dx = e.clientX - from.x;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    justSwiped.current = true;
    // the synthetic click lands right after pointerup; clear once it has passed
    setTimeout(() => {
      justSwiped.current = false;
    }, 0);
    onSwipe(dx < 0 ? 1 : -1);
  };

  const handlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: () => {
      start.current = null;
    },
    // `pan-y` keeps the browser in charge of vertical scrolling.
    style: { touchAction: "pan-y" as const },
  };

  return { handlers, justSwiped };
}

/** Previous / counter / next control cluster (inline gallery + fullscreen). */
function Controls({
  active,
  onPrev,
  onNext,
  className = "",
}: {
  active: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  const btn =
    "inline-flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition-colors hover:border-coalsoft-500 hover:text-coalsoft-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coalsoft-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-coalsoft-400 dark:hover:text-coalsoft-300";
  return (
    <div className={`flex items-center justify-end gap-2 ${className}`.trim()}>
      <button type="button" className={btn} onClick={onPrev} aria-label="Předchozí obrázek">
        <ChevronIcon className="size-5 rotate-180" />
      </button>
      <button type="button" className={btn} onClick={onNext} aria-label="Další obrázek">
        <ChevronIcon className="size-5" />
      </button>
      <span
        className="min-w-[3.5rem] text-center font-lekton text-sm font-bold tabular-nums text-neutral-700 dark:text-neutral-300"
        aria-hidden="true"
      >
        {active + 1} / {SLIDES.length}
      </span>
    </div>
  );
}

function ChevronIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CardRole = "front" | "upper" | "lower";

/** Visual role of the slide at `index` given the active index (3-slide cycle). */
function roleFor(index: number, active: number): CardRole {
  const offset = wrap(index - active, SLIDES.length);
  return offset === 0 ? "front" : offset === 1 ? "upper" : "lower";
}

/**
 * One persistent screenshot card. It keeps its own image for the component's
 * whole life; only `role` changes, and `.pg-card--{role}` animates the
 * `transform` (and flips `z-index`) so the card glides between stack positions.
 * Same rounded `.glow-border--lg` frame + clipped corners as every other card.
 * Decorative and non-interactive — the transparent `<button>` overlay is the
 * sole pointer/focus target; only the front card exposes its `alt`.
 */
function StackCard({ slide, role }: { slide: Slide; role: CardRole }) {
  // The outer element owns the absolute placement + animated transform. The
  // `.glow-border` frame forces `position: relative`, so it sits one level in.
  return (
    <div
      aria-hidden={role === "front" ? undefined : true}
      className={`pg-card pg-card--${role} pointer-events-none absolute inset-x-8 top-12 select-none sm:inset-x-10 sm:top-14`}
    >
      <div
        className="glow-border glow-border--lg shadow-sm ring-1 ring-black/5 dark:shadow-none dark:ring-white/10"
        data-surface="white"
      >
        <div className="overflow-hidden rounded-[calc(2rem-2px)]">
          <ResponsiveImage
            src={slide.src}
            alt={role === "front" ? slide.alt : ""}
            sizes={INLINE_SIZES}
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

function FullscreenDialog({
  active,
  direction,
  step,
  onClose,
  labelId,
  openerRef,
}: {
  active: number;
  direction: 1 | -1;
  step: (direction: 1 | -1) => void;
  onClose: () => void;
  labelId: string;
  /** The gallery's opener button — the sole focus-restoration target on close. */
  openerRef: RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const slide = SLIDES[active];
  const swipe = useSwipe((d) => step(d));

  // Focus containment + keyboard model + body scroll lock + background inert.
  // Focus restoration on close is owned entirely here: it happens last, after
  // background `inert` is removed and body scrolling is restored, and targets
  // the opener button explicitly with `preventScroll` so closing never causes
  // a scroll jump.
  useEffect(() => {
    closeRef.current?.focus();

    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>("body > header, body > main, body > footer"),
    );
    for (const el of inertTargets) el.setAttribute("inert", "");

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
        return;
      }
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = bodyOverflow;
      for (const el of inertTargets) el.removeAttribute("inert");
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [onClose, step, openerRef]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      className="fixed inset-0 z-[100] flex flex-col bg-white/95 backdrop-blur-sm dark:bg-black/95"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p id={labelId} className="font-lekton text-sm font-bold text-neutral-800 dark:text-neutral-200">
          {slide.name} · {active + 1} / {SLIDES.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Zavřít"
          className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 hover:border-coalsoft-500 hover:text-coalsoft-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coalsoft-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      <div
        {...swipe.handlers}
        className="flex min-h-0 flex-1 select-none items-center justify-center overflow-hidden px-4 pb-2 sm:px-6"
      >
        {/* Keyed wrapper — replays the slide-in on every slide change. */}
        <div key={active} className={`flex max-h-full max-w-full ${slideClass(direction)}`}>
          <ResponsiveImage
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            sizes={FULLSCREEN_SIZES}
            priority
            className="block h-auto max-h-full w-auto max-w-full rounded-2xl"
          />
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6">
        <Controls active={active} onPrev={() => step(-1)} onNext={() => step(1)} />
      </div>
    </div>,
    document.body,
  );
}

export default function ProductGallery() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [fullscreen, setFullscreen] = useState(false);

  const openerRef = useRef<HTMLButtonElement>(null);
  const dialogLabelId = useId();

  /** Move by one slide (wrapping). `dir` = 1 forward, -1 backward. */
  const step = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setActive((cur) => wrap(cur + dir, SLIDES.length));
  }, []);

  const swipe = useSwipe((dir) => step(dir));

  const openFullscreen = useCallback(() => {
    if (swipe.justSwiped.current) return;
    setFullscreen(true);
  }, [swipe.justSwiped]);

  /** Only closes the dialog — focus restoration is the dialog's own job. */
  const closeFullscreen = useCallback(() => {
    setFullscreen(false);
  }, []);

  const slide = SLIDES[active];

  return (
    <Section labelledBy="gallery-heading" className="bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-16 2xl:gap-24">
        {/* GALLERY column — left on wide screens; on narrow it follows the text. */}
        <div className="order-2 flex flex-col gap-5 xl:order-1 xl:basis-1/2">
          {/* Playful three-card stack. The padding reserves room for the
              tilted upper (top) and lower (bottom) cards so a rotated corner
              never causes page-level horizontal overflow, and the controls
              still sit clear below the whole stack. */}
          <div className="relative isolate px-8 pb-14 pt-12 sm:px-10 sm:pb-16 sm:pt-14">
            {/* Persistent cards in stable order — each keeps its own screenshot;
                only its role (front / upper / lower) changes and animates. */}
            {SLIDES.map((s, i) => (
              <StackCard key={s.src} slide={s} role={roleFor(i, active)} />
            ))}

            {/* Transparent overlay at the front-card box: the single stable
                focus target + fullscreen trigger + swipe surface. It also gives
                the padded wrapper its height (front card aspect ratio). The
                moving cards never take focus. */}
            <button
              ref={openerRef}
              type="button"
              onClick={openFullscreen}
              aria-label={`Zobrazit obrázek ${slide.name} na celou obrazovku`}
              {...swipe.handlers}
              className="relative z-30 block aspect-[2876/1376] w-full cursor-zoom-in select-none rounded-[2rem] border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coalsoft-500"
            />
          </div>

          <Controls active={active} onPrev={() => step(-1)} onNext={() => step(1)} />

          {/* Announce the active slide; decorative layers stay silent. */}
          <p className="sr-only" aria-live="polite">
            {slide.name} — obrázek {active + 1} z {SLIDES.length}
          </p>
        </div>

        {/* TEXT + CTA — right on wide screens; first on narrow screens. */}
        <div className="order-1 flex flex-col items-start gap-8 xl:order-2 xl:basis-1/2">
          <SectionHeading
            id="gallery-heading"
            eyebrow="Ukázka aplikace"
            title={HEADING}
            intro={INTRO}
            center={false}
          />
          <FragmentCta
            targetId="pricing"
            label="Prohlédnout cenové balíčky"
            variant="secondary"
            size="lg"
          />
        </div>
      </div>

      {fullscreen ? (
        <FullscreenDialog
          active={active}
          direction={direction}
          step={step}
          onClose={closeFullscreen}
          labelId={dialogLabelId}
          openerRef={openerRef}
        />
      ) : null}
    </Section>
  );
}
