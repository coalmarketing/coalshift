"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import Section, { SectionHeading } from "../ui/Section";
import FragmentCta from "../ui/FragmentCta";
import ResponsiveImage from "../ResponsiveImage";
import { buildYoutubeEmbedUrl, YOUTUBE_POSTER_SRC, YOUTUBE_TITLE, YOUTUBE_URL } from "../../lib/links";
import { pushDataLayerEvent } from "../../lib/dataLayer";
import { loadYoutubeIframeApi, type YTPlayer } from "../../lib/youtubeIframeApi";

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
  "Pusťte si praktickou ukázku aplikace nebo si projděte skutečné obrazovky, se kterými budete pracovat každý den.";

const INLINE_SIZES = "(min-width: 1280px) 45vw, 92vw";
const FULLSCREEN_SIZES = "95vw";

/** How often (ms) the analytics hook polls `getCurrentTime()` while playing. */
const PROGRESS_POLL_MS = 1000;
/**
 * A poll-to-poll jump larger than this many percentage points is treated as a
 * seek, not natural playback progression — any threshold it jumps past is
 * skipped rather than retroactively fired (matching GTM's documented YouTube
 * trigger behavior: seeking past a mark does not claim it as watched). At a
 * 1s poll cadence, normal playback advances well under 1 point per tick even
 * for a short video, so this leaves a wide margin against false positives.
 */
const SEEK_JUMP_THRESHOLD_PERCENT = 3;

type Mode = "video" | "screens";

const MODE_LABEL: Record<Mode, string> = {
  video: "Video ukázka (13 min)",
  screens: "Obrazovky aplikace",
};
const MODE_ORDER: Mode[] = ["video", "screens"];

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

function PlayIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/**
 * Decorative selector-label icons, ported byte-for-byte (path + viewBox) from
 * the authorized read-only coalios reference — `currentColor` fill, no icon
 * package/webfont/runtime request:
 * coalios/src/assets/svgs/video/play_arrow.svg and
 * coalios/src/assets/svgs/kariera/devices.svg (its hardcoded orange fill
 * dropped in favor of `currentColor`).
 */
function PlayArrowGlyph({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
      <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
    </svg>
  );
}

function DevicesGlyph({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
      <path d="M480-540ZM80-160v-80h400v80H80Zm120-120q-33 0-56.5-23.5T120-360v-360q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720H200v360h280v80H200Zm600 40v-320H640v320h160Zm-180 80q-25 0-42.5-17.5T560-220v-360q0-25 17.5-42.5T620-640h200q25 0 42.5 17.5T880-580v360q0 25-17.5 42.5T820-160H620Zm100-300q13 0 21.5-9t8.5-21q0-13-8.5-21.5T720-520q-12 0-21 8.5t-9 21.5q0 12 9 21t21 9Zm0 60Z" />
    </svg>
  );
}

/**
 * Two-option accessible selector between the video walkthrough and the
 * screenshot gallery (WAI-ARIA manual-activation tabs pattern, same model as
 * `FunctionsBrowser`'s tablist but horizontal: Left/Right roving focus,
 * Home/End jump, Enter/Space or click select).
 */
function ModeTabs({
  mode,
  onChange,
  uid,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
  uid: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const n = (i + MODE_ORDER.length) % MODE_ORDER.length;
    refs.current[n]?.focus();
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(MODE_ORDER.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onChange(MODE_ORDER[i]);
        break;
    }
  };

  return (
    <div role="tablist" aria-label="Zobrazení ukázky aplikace" className="inline-flex flex-wrap gap-2">
      {MODE_ORDER.map((m, i) => {
        const selected = mode === m;
        return (
          <button
            key={m}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-${m}-tab`}
            aria-controls={`${uid}-${m}-panel`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(m)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coalsoft-500 ${
              selected
                ? "border-coalsoft-500 bg-coalsoft-500 text-black"
                : "border-neutral-300 bg-white text-neutral-700 hover:border-coalsoft-500 hover:text-coalsoft-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-coalsoft-400 dark:hover:text-coalsoft-300"
            }`}
          >
            {m === "video" ? (
              <PlayArrowGlyph className="size-4 shrink-0" />
            ) : (
              <DevicesGlyph className="size-4 shrink-0" />
            )}
            {MODE_LABEL[m]}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Tracks real YouTube playback state for the currently mounted player and
 * pushes the `coalshift_video` dataLayer contract. Owns exactly one YT.Player
 * instance and one polling interval per activation; both are torn down the
 * moment `active` goes false (mode change or unmount) or the effect re-runs,
 * so nothing ever keeps polling or listening behind the screenshot panel.
 *
 * The YouTube IFrame API script and `YT.Player` are only requested once
 * `active` is true (i.e. after the user has clicked Play) — never earlier.
 * A failure anywhere in this hook (script load, API error) is caught and
 * silently ignored: the iframe already plays via its own `autoplay` URL
 * param regardless of whether analytics ever attaches.
 */
function useYoutubePlaybackAnalytics(iframeRef: RefObject<HTMLIFrameElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let player: YTPlayer | null = null;
    let pollId: number | null = null;
    let started = false;
    let lastPercent: number | null = null;
    const firedThresholds = new Set<25 | 50 | 75 | 100>();

    const emit = (percent: 0 | 25 | 50 | 75 | 100, status: "start" | "progress" | "complete") => {
      pushDataLayerEvent({
        event: "coalshift_video",
        video_title: YOUTUBE_TITLE,
        video_url: YOUTUBE_URL,
        video_percent: percent,
        video_status: status,
        video_provider: "youtube",
      });
    };

    // Guarded by `started` so it's safe to call from both the state-change
    // callback and the poll — whichever observes the first real PLAYING state
    // wins, and the other becomes a no-op. This matters because the IFrame API
    // can attach *after* an already-autoplaying iframe has already entered
    // PLAYING, in which case onStateChange never fires for it and only the
    // poll ever sees PLAYING.
    const emitStartOnce = () => {
      if (started) return;
      started = true;
      emit(0, "start");
    };

    const poll = () => {
      if (!player || !window.YT) return;
      try {
        if (player.getPlayerState() !== window.YT.PlayerState.PLAYING) return;
        emitStartOnce();
        const duration = player.getDuration();
        if (!duration) return;
        const percent = Math.min(100, (player.getCurrentTime() / duration) * 100);
        if (lastPercent === null) {
          // First valid sample for this instance. It may already be well past
          // 0% — a fast seek before this first poll, or (as above) the API
          // attaching after playback had already progressed — so consume
          // every threshold already behind it without emitting: analytics
          // never actually observed that stretch of the video.
          lastPercent = percent;
          for (const threshold of [25, 50, 75] as const) {
            if (percent >= threshold) firedThresholds.add(threshold);
          }
          return;
        }
        const isSeekForward = percent - lastPercent > SEEK_JUMP_THRESHOLD_PERCENT;
        lastPercent = percent;
        if (isSeekForward) {
          // A forward seek skips ahead of natural playback. Every threshold it
          // jumps past is consumed — permanently, for this player instance —
          // without emitting, so a later poll can never fire it retroactively.
          // Thresholds are only ever added here, never removed, so a later
          // backward seek cannot re-arm one already consumed this way.
          for (const threshold of [25, 50, 75] as const) {
            if (percent >= threshold) firedThresholds.add(threshold);
          }
          return;
        }
        for (const threshold of [25, 50, 75] as const) {
          if (percent >= threshold && !firedThresholds.has(threshold)) {
            firedThresholds.add(threshold);
            emit(threshold, "progress");
          }
        }
      } catch {
        // A transient IFrame API error never blocks playback — just skip this tick.
      }
    };

    loadYoutubeIframeApi()
      .then((YT) => {
        if (cancelled || !iframeRef.current) return;
        player = new YT.Player(iframeRef.current, {
          events: {
            onStateChange: (e) => {
              if (e.data === YT.PlayerState.PLAYING) {
                emitStartOnce();
              } else if (e.data === YT.PlayerState.ENDED && !firedThresholds.has(100)) {
                firedThresholds.add(100);
                emit(100, "complete");
              }
            },
          },
        });
        pollId = window.setInterval(poll, PROGRESS_POLL_MS);
      })
      .catch(() => {
        // API unavailable (network/blocked) — playback continues via the iframe's own autoplay.
      });

    return () => {
      cancelled = true;
      if (pollId !== null) window.clearInterval(pollId);
      try {
        player?.destroy();
      } catch {
        // Already-removed iframe — nothing left to clean up.
      }
      player = null;
    };
  }, [active, iframeRef]);
}

/**
 * Video mode — a first-party click-to-play facade over the locally stored,
 * owner-verified YouTube thumbnail (no YouTube contact before activation).
 * On play it mounts a responsive privacy-enhanced `youtube-nocookie.com`
 * iframe (with `enablejsapi=1` + the real runtime origin, so the IFrame API
 * can attach to this exact element without reloading it) and attaches
 * playback analytics; a direct YouTube link is always offered alongside it.
 */
function VideoPanel({ playing, onPlay }: { playing: boolean; onPlay: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useYoutubePlaybackAnalytics(iframeRef, playing);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="glow-border glow-border--lg shadow-sm ring-1 ring-black/5 dark:shadow-none dark:ring-white/10"
        data-surface="white"
      >
        <div className="aspect-[16/9] overflow-hidden rounded-[calc(2rem-2px)]">
          {playing ? (
            <iframe
              ref={iframeRef}
              src={buildYoutubeEmbedUrl(window.location.origin)}
              title={YOUTUBE_TITLE}
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={onPlay}
              aria-label={`Přehrát video: ${YOUTUBE_TITLE}`}
              className="group relative block h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coalsoft-500"
            >
              <ResponsiveImage
                src={YOUTUBE_POSTER_SRC}
                alt=""
                sizes={INLINE_SIZES}
                className="block h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
                <span className="inline-flex size-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform group-hover:scale-105 sm:size-20">
                  <PlayIcon className="size-7 translate-x-0.5 sm:size-9" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
      <a
        href={YOUTUBE_URL}
        target="_blank"
        rel="noopener"
        className="link self-start text-sm font-bold text-coalsoft-700 dark:text-coalsoft-300"
      >
        Sledovat na YouTube
      </a>
    </div>
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
  const [mode, setMode] = useState<Mode>("video");
  const [playing, setPlaying] = useState(false);

  const openerRef = useRef<HTMLButtonElement>(null);
  const dialogLabelId = useId();
  const tabsUid = useId();

  /** Switching away from Video mode unmounts the player — it never keeps
   *  playing in the background and always restarts from the facade. */
  const changeMode = useCallback((m: Mode) => {
    setMode(m);
    if (m !== "video") setPlaying(false);
  }, []);

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
          {/* Single-cell overlap grid ("media stage"): both mode panels stay
              permanently mounted, occupy the same grid cell (`col-start-1
              row-start-1`), and the stage's row height is the CSS grid auto
              max of both panels' natural content height — no JS measurement,
              no fixed pixel height, no layout shift when switching modes.
              The inactive panel crossfades out (opacity + small translate,
              ~220ms, instant under prefers-reduced-motion) and is
              aria-hidden + inert + pointer-events-none, so it exposes no
              links/buttons/fullscreen triggers to keyboard or AT. */}
          <div className="grid">
            <div
              id={`${tabsUid}-video-panel`}
              role="tabpanel"
              aria-labelledby={`${tabsUid}-video-tab`}
              aria-hidden={mode !== "video"}
              inert={mode !== "video" ? true : undefined}
              className={`col-start-1 row-start-1 transition-[opacity,transform] duration-[220ms] ease-out motion-reduce:transition-none ${
                mode === "video"
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 translate-y-1"
              }`}
            >
              <VideoPanel playing={playing} onPlay={() => setPlaying(true)} />
            </div>

            <div
              id={`${tabsUid}-screens-panel`}
              role="tabpanel"
              aria-labelledby={`${tabsUid}-screens-tab`}
              aria-hidden={mode !== "screens"}
              inert={mode !== "screens" ? true : undefined}
              className={`col-start-1 row-start-1 flex flex-col gap-5 transition-[opacity,transform] duration-[220ms] ease-out motion-reduce:transition-none ${
                mode === "screens"
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 translate-y-1"
              }`}
            >
              {/* Playful three-card stack. The padding reserves room for the
                  tilted upper (top) and lower (bottom) cards so a rotated
                  corner never causes page-level horizontal overflow, and the
                  controls still sit clear below the whole stack. */}
              <div className="relative isolate px-8 pb-14 pt-12 sm:px-10 sm:pb-16 sm:pt-14">
                {/* Persistent cards in stable order — each keeps its own
                    screenshot; only its role (front / upper / lower)
                    changes and animates. */}
                {SLIDES.map((s, i) => (
                  <StackCard key={s.src} slide={s} role={roleFor(i, active)} />
                ))}

                {/* Transparent overlay at the front-card box: the single
                    stable focus target + fullscreen trigger + swipe
                    surface. It also gives the padded wrapper its height
                    (front card aspect ratio). The moving cards never take
                    focus. */}
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
          </div>
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
          <ModeTabs mode={mode} onChange={changeMode} uid={tabsUid} />
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
