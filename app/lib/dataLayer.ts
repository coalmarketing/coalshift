/**
 * Minimal typed helper for pushing to the GTM `dataLayer`. GTM's own inline
 * loader (app/layout.tsx) creates and owns `window.dataLayer` — this only
 * appends events to it, never re-initializes, reads it back, or sends
 * anything directly to GA4. No GTM configuration is touched here.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushDataLayerEvent(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}
