import type { Metadata } from "next";

/**
 * Single source for production origin and per-route SEO intent.
 *
 * Every `page.tsx` builds its `metadata` from `metadataFor()`, and
 * `app/sitemap.ts` / `app/robots.ts` read the same records — so "exactly four
 * sitemap URLs" and "no route inherits the homepage canonical" are decided in
 * one place. Titles and descriptions are verbatim from
 * `docs/content-and-seo.md` §"Metadata".
 */

export const SITE_ORIGIN = "https://coalshift.cz";

export type RoutePath = "/" | "/reference" | "/gdpr" | "/cookies";

export type RouteSeo = {
  /** Exact document title (used as `title.absolute` — never templated). */
  title: string;
  description: string;
  /** Absolute self-canonical. */
  canonical: string;
  /** Include in `sitemap.xml`. */
  sitemap: boolean;
};

export const ROUTES: Record<RoutePath, RouteSeo> = {
  "/": {
    title: "coalshift | Plánování směn a docházky",
    description:
      "Plánujte směny, spravujte nepřítomnosti a mějte přehled o zaměstnancích. Tarif Free je zdarma až pro 5 zaměstnanců.",
    // Next's metadata resolver returns the bare origin for the root path
    // (`resolveAbsoluteUrlWithPathname` → `result.origin` when pathname === "/"),
    // so the homepage canonical/og:url render as `https://coalshift.cz`. The
    // sitemap entry uses the identical form for slash-consistency.
    canonical: SITE_ORIGIN,
    sitemap: true,
  },
  "/reference": {
    title: "Reference | coalshift",
    description: "Přečtěte si zkušenosti s plánováním směn v coalshiftu.",
    canonical: `${SITE_ORIGIN}/reference`,
    sitemap: true,
  },
  "/gdpr": {
    title: "Zásady ochrany osobních údajů (GDPR) — coalshift",
    description: "Informace o zpracování osobních údajů na webu coalshift.",
    canonical: `${SITE_ORIGIN}/gdpr`,
    sitemap: true,
  },
  "/cookies": {
    title: "Podmínky cookies — coalshift",
    description: "Informace o používání souborů cookies na webu coalshift.",
    canonical: `${SITE_ORIGIN}/cookies`,
    sitemap: true,
  },
};

/**
 * Build the Next.js `Metadata` for a route: self-canonical + complete
 * text-only Open Graph + Twitter `summary` (no social-preview image is
 * created or referenced). `title.absolute` guarantees the string is never
 * modified by a template.
 */
export function metadataFor(path: RoutePath): Metadata {
  const route = ROUTES[path];

  return {
    title: { absolute: route.title },
    description: route.description,
    alternates: { canonical: route.canonical },
    openGraph: {
      type: "website",
      locale: "cs_CZ",
      siteName: "coalshift",
      url: route.canonical,
      title: route.title,
      description: route.description,
    },
    twitter: {
      card: "summary",
      title: route.title,
      description: route.description,
    },
  };
}
