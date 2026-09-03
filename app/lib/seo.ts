import type { Metadata } from "next";

/**
 * Single source for production origin and per-route SEO intent (Phase 03).
 *
 * Every `page.tsx` builds its `metadata` from `metadataFor()`, and
 * `app/sitemap.ts` / `app/robots.ts` read the same records — so "exactly four
 * sitemap URLs" and "no route inherits the homepage canonical" are decided in
 * one place. Titles and descriptions are verbatim from
 * `docs/content.md` §"Metadata copy and intent".
 */

export const SITE_ORIGIN = "https://coalshift.cz";

export type RoutePath =
  | "/"
  | "/reference"
  | "/gdpr"
  | "/cookies"
  | "/registrace"
  | "/wait-list"
  | "/wait-list/thank-you";

export type RouteSeo = {
  /** Exact document title (used as `title.absolute` — never templated). */
  title: string;
  description: string;
  /** Absolute self-canonical for indexable routes; `null` for the dead legacy
   *  routes, which must not emit a public canonical. */
  canonical: string | null;
  /** `false` → emit `robots: noindex, follow` and no social metadata. */
  indexable: boolean;
  /** Include in `sitemap.xml` (only the four public routes). */
  sitemap: boolean;
};

export const ROUTES: Record<RoutePath, RouteSeo> = {
  "/": {
    title: "coalshift | AI plánovač směn a docházky",
    description:
      "Plánujte směny s pomocí AI, spravujte nepřítomnosti a mějte přehled o svém týmu. Vyzkoušejte coalshift na 14 dní zdarma.",
    // Next's metadata resolver returns the bare origin for the root path
    // (`resolveAbsoluteUrlWithPathname` → `result.origin` when pathname === "/"),
    // so the homepage canonical/og:url render as `https://coalshift.cz`. The
    // sitemap entry uses the identical form for slash-consistency.
    canonical: SITE_ORIGIN,
    indexable: true,
    sitemap: true,
  },
  "/reference": {
    title: "Reference | coalshift",
    description: "Přečtěte si zkušenosti s plánováním směn v coalshiftu.",
    canonical: `${SITE_ORIGIN}/reference`,
    indexable: true,
    sitemap: true,
  },
  "/gdpr": {
    title: "Zásady ochrany osobních údajů (GDPR) — coalshift",
    description: "Informace o zpracování osobních údajů na webu coalshift.",
    canonical: `${SITE_ORIGIN}/gdpr`,
    indexable: true,
    sitemap: true,
  },
  "/cookies": {
    title: "Podmínky cookies — coalshift",
    description: "Informace o používání souborů cookies na webu coalshift.",
    canonical: `${SITE_ORIGIN}/cookies`,
    indexable: true,
    sitemap: true,
  },
  "/registrace": {
    title: "Vyzkoušejte coalshift na 14 dní zdarma",
    description:
      "Přejděte k registraci do aplikace coalshift a vyzkoušejte si plánování směn na 14 dní zdarma.",
    canonical: null,
    indexable: false,
    sitemap: false,
  },
  "/wait-list": {
    title: "Začněte s coalshiftem",
    description:
      "Zjednodušte si plánování směn. Přejděte do aplikace a vyzkoušejte coalshift na 14 dní zdarma.",
    canonical: null,
    indexable: false,
    sitemap: false,
  },
  "/wait-list/thank-you": {
    title: "Děkujeme za zájem | coalshift",
    description:
      "Pokračujte do aplikace coalshift nebo se vraťte na úvodní stránku.",
    canonical: null,
    indexable: false,
    sitemap: false,
  },
};

/**
 * Build the Next.js `Metadata` for a route:
 * - indexable → self-canonical + complete text-only Open Graph + Twitter
 *   `summary` (no image is created or referenced in this phase);
 * - dead legacy → `noindex, follow`, no canonical, no social metadata.
 * `title.absolute` guarantees the string is never modified by a template.
 */
export function metadataFor(path: RoutePath): Metadata {
  const route = ROUTES[path];

  if (route.indexable && route.canonical) {
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

  return {
    title: { absolute: route.title },
    description: route.description,
    robots: { index: false, follow: true },
  };
}
