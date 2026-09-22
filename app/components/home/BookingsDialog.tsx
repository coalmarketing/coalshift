"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CtaButton from "../ui/CtaButton";
import { BOOKINGS_URL } from "../../lib/links";

/**
 * Consultation CTA + lazy Microsoft Bookings dialog. The iframe is created only
 * after the dialog opens (never on page load), the dialog traps focus, closes
 * on Escape/close button, locks and restores page scroll, and always offers a
 * direct "open in a new window" fallback. Same accessible-dialog contract as
 * `ProductGallery`'s fullscreen viewer (body `inert`, Tab-wrap focus trap,
 * scroll lock, focus restored to the opener on close) adapted for a
 * desktop-contained / mobile-full-screen panel around a cross-origin iframe —
 * the Bookings document itself is never restyled or scripted.
 */
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

export default function BookingsDialog() {
  const [open, setOpen] = useState(false);
  const triggerWrapRef = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

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
        close();
        return;
      }
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, [tabindex]:not([tabindex="-1"])',
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
      triggerWrapRef.current?.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
    };
  }, [open, close]);

  return (
    <>
      <span ref={triggerWrapRef} className="inline-flex">
        <CtaButton
          type="button"
          label="Rezervovat konzultaci"
          variant="primary"
          size="lg"
          onClick={() => setOpen(true)}
        />
      </span>

      {open
        ? createPortal(
            <div className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-6">
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelId}
                className="flex h-[100dvh] w-full flex-col bg-white shadow-xl sm:h-[85vh] sm:max-h-[46rem] sm:w-full sm:max-w-2xl sm:rounded-[2rem] dark:bg-neutral-900"
              >
                <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 sm:px-6 dark:border-neutral-800">
                  <p id={labelId} className="font-lekton text-base font-bold text-neutral-900 dark:text-white">
                    Rezervovat konzultaci
                  </p>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Zavřít"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 hover:border-coalsoft-500 hover:text-coalsoft-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coalsoft-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                  >
                    <CloseIcon className="size-5" />
                  </button>
                </div>

                <div className="min-h-0 flex-1 bg-neutral-50 dark:bg-neutral-950">
                  <iframe
                    src={BOOKINGS_URL}
                    title="Rezervace online konzultace — Microsoft Bookings"
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
                </div>

                <div className="border-t border-neutral-200 px-4 py-3 sm:px-6 dark:border-neutral-800">
                  <a
                    href={BOOKINGS_URL}
                    target="_blank"
                    rel="noopener"
                    className="link text-sm font-bold text-coalsoft-700 dark:text-coalsoft-300"
                  >
                    Otevřít rezervaci v novém okně
                  </a>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
