import type { MouseEvent as ReactMouseEvent } from "react";

/** Click/activation on an `<a>` element. */
type AnchorActivation = ReactMouseEvent<HTMLAnchorElement>;

/**
 * Smoothly scroll to an in-page element, compensating for the fixed header.
 *
 * The compensation is measured from the rendered header element so it stays
 * correct at every viewport width; it falls back to the header spacer height
 * (72px) when the element cannot be measured. Native fragment navigation uses
 * the matching `scroll-padding-top` declared in globals.css.
 */
export function smoothScrollToId(id: string): void {
  if (typeof document === "undefined") return;

  const target = document.getElementById(id);
  if (!target) return;

  const header = document.querySelector("header");
  const headerOffset =
    header instanceof HTMLElement && header.offsetHeight > 0 ? header.offsetHeight : 72;

  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
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
