import type { MouseEvent as ReactMouseEvent } from "react";

/** Click/activation on an `<a>` element. */
type AnchorActivation = ReactMouseEvent<HTMLAnchorElement>;

/** True when the visitor asked for reduced motion (guarded for SSR). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scroll to an in-page element, compensating for the fixed header, and then
 * reproduce the native `<a href="#id">` side effects that `preventDefault`
 * would otherwise suppress:
 *
 * - honour `prefers-reduced-motion` (instant scroll instead of `smooth`);
 * - update the fragment URL exactly once when it actually changes, so the
 *   section stays shareable and Back reverses the jump — no duplicate entry;
 * - move focus to the target without adding it to sequential Tab order.
 *
 * Clearance = the visible pinned nav bar (`[data-nav-bar]`), not the whole
 * header wrapper (which includes the family strip that scrolls out of view),
 * plus an 8px gap. This is the same result as the native
 * `html { scroll-padding-top: calc(var(--header-height) + 0.5rem) }`.
 */
export function smoothScrollToId(id: string): void {
  if (typeof document === "undefined") return;

  const target = document.getElementById(id);
  if (!target) return;

  const navBar = document.querySelector("[data-nav-bar]");
  let headerOffset = 80;
  if (navBar instanceof HTMLElement && navBar.getBoundingClientRect().height > 0) {
    headerOffset = navBar.getBoundingClientRect().height;
  } else {
    const varValue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
    );
    if (Number.isFinite(varValue) && varValue > 0) headerOffset = varValue;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });

  // Deep-link + Back parity: one history entry only when the hash changes.
  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }

  // Keyboard/SR parity: focus the section so the next Tab continues from here.
  // `tabindex="-1"` keeps it out of the sequential Tab order.
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

/** Smoothly return to the top of the page (home-logo activation). */
export function scrollToTop(): void {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  // Drop a stale fragment so the URL matches the top-of-page destination.
  if (window.location.hash) {
    window.history.pushState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }
}

/**
 * True only for an ordinary primary-button activation that this document should
 * handle itself:
 *
 * - not already handled (`defaultPrevented`);
 * - primary (left) button, no Cmd/Ctrl/Shift/Alt modifier — so middle clicks and
 *   "open in new tab/window" keep working;
 * - the activated anchor (`event.currentTarget`, never a nested `event.target`)
 *   has no `target` or `target="_self"`. Anchors that address another browsing
 *   context (`_blank`, `_parent`, `_top`, or a named frame) are left for the
 *   browser.
 */
export function isPlainActivation(e: AnchorActivation): boolean {
  const linkTarget = e.currentTarget.target;
  return (
    !e.defaultPrevented &&
    e.button === 0 &&
    !e.metaKey &&
    !e.ctrlKey &&
    !e.shiftKey &&
    !e.altKey &&
    (linkTarget === "" || linkTarget === "_self")
  );
}

/**
 * True when a fragment link's ordinary activation should be intercepted for a
 * smooth in-page scroll: a plain same-document activation whose target element
 * actually exists. Otherwise the browser's default navigation runs.
 */
export function shouldSmoothScroll(e: AnchorActivation, id: string): boolean {
  return (
    isPlainActivation(e) &&
    typeof document !== "undefined" &&
    document.getElementById(id) !== null
  );
}
