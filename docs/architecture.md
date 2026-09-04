# Coalshift — Architecture

Static Czech marketing website for **coalshift**, a product of coalsoft s.r.o. The
site explains the product and links visitors to the separate application at
`app.coalshift.cz` for registration and login. That application, its backend,
billing and product capabilities are outside this repository.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 App Router (`next` `16.3.4`), `output: "export"` — static HTML only |
| UI | React 19.2.x, TypeScript 5.9.x |
| Styling | Tailwind CSS 3.4.x (`darkMode: 'selector'`), PostCSS + autoprefixer |
| Images | Build-time Sharp WebP pipeline + a registry-driven `<ResponsiveImage>` for the two portraits; SVGs/logos are plain `<img>`; `next/image` is unused; no runtime image optimizer |
| Hosting | Cloudflare Pages, Git-integrated deployments, output directory `out` |
| Runtime deps | `next`, `react`, `react-dom` only. `sharp` + `wrangler` are devDependencies |

No CMS, application backend, enquiry-form service, newsletter system, analytics
plan or hosting migration is part of this project. There is no `lint` or `test`
script (Next 16 removed `next lint`; no prior gate existed) — do not add one.

`next.config.ts` pins two load-bearing options: `output: "export"` (static HTML
only) and `trailingSlash: false` (every canonical, sitemap entry and internal
`href` uses `/reference`, never `/reference/`). There is no `images` block —
`next/image` is unused.

## Routes

Seven route files exist; four are public and indexable, three are retained but
unavailable (every request 301s to `/` at the Cloudflare edge). See
[content-and-seo.md](content-and-seo.md) for the full route/redirect matrix with
exact `Location` values, metadata and the sitemap set.

| Path | File | Role |
| --- | --- | --- |
| `/` | `app/page.tsx` | Main marketing page (`Hero` → `Capabilities` → `FunctionsBrowser` → `ProductGallery` → `Pricing` → `Industries` → `Faq` → `Contact`) |
| `/reference` | `app/reference/page.tsx` | Public testimonials subpage; linked in footer **Navigace** |
| `/gdpr` | `app/gdpr/page.tsx` | GDPR policy shell (`<div id="waulterGdpr">`) |
| `/cookies` | `app/cookies/page.tsx` | Cookies policy shell (`<div id="waulterCookies">`) |
| `/registrace` | `app/registrace/page.tsx` | Retained legacy source — 301 to `/` |
| `/wait-list` | `app/wait-list/page.tsx` | Retained legacy source — 301 to `/` |
| `/wait-list/thank-you` | `app/wait-list/thank-you/page.tsx` | Retained legacy source — 301 to `/` |

`/zdravotnici` and `/zdravotnici/` 301 to `/#industries` (the retired healthcare
page; healthcare stays a plain audience label on the homepage).

### Retained legacy source — reactivation implications

`/registrace`, `/wait-list` and `/wait-list/thank-you` render through
`app/components/legacy/LegacyPage.tsx` (which imports `CtaButton`, not the removed
`Button`). Their route bodies are kept in source control for possible future
reactivation but are **not served in production**: `public/_redirects` intercepts
all six URL forms (with and without trailing slash) with HTTP 301 to `/`, and a
static redirect wins over the still-generated `.html` asset. The retained
`noindex, follow` metadata on those routes is defense-in-depth / source history,
not the live indexing mechanism.

Freeze state: the three route bodies are byte-frozen (SHA-256 baselines in
[operations.md](operations.md)). `LegacyPage.tsx` may receive comment-text
corrections only. If a legacy route is ever reactivated, remove its
`public/_redirects` line, restore an indexable `metadataFor()` entry in
`app/lib/seo.ts`, and re-add its internal links and sitemap entry.

## Route/SEO data ownership

`app/lib/seo.ts` is the single source for the production origin and per-route SEO
intent:

- `SITE_ORIGIN` — `https://coalshift.cz`.
- `ROUTES` — one `RouteSeo` record per path (`title`, `description`, `canonical`,
  `indexable`, `sitemap`).
- `metadataFor(path)` — builds the Next `Metadata`: indexable routes get a
  `title.absolute`, self-canonical, text-only Open Graph and Twitter `summary`
  (no image); non-indexable routes get `robots: { index: false, follow: true }`
  and no canonical/social metadata.

`app/sitemap.ts` and `app/robots.ts` derive from `seo.ts` (both
`export const dynamic = "force-static"`, a no-op under export). The sitemap emits
exactly the routes where `sitemap && canonical` is true. `app/robots.ts` is
allow-all with a `Sitemap:` line and no `Disallow`. `app/layout.tsx` sets only
`metadataBase` + a plain title/description fallback (used by the built-in 404) —
nothing there is inherited as a per-route canonical or social card.

The homepage canonical / `og:url` / sitemap `<loc>` render as the bare origin
`https://coalshift.cz` (Next's metadata resolver returns `result.origin` for the
root path under `trailingSlash: false`). Canonical = `og:url` = sitemap `<loc>`
for every route, so the forms are self-consistent; this is an accepted
project-specific root normalization, not a claim that a trailing slash is
impossible through configuration.

## Component and data layout

```
app/
  layout.tsx            metadataBase + <head>: theme bootstrap, GTM, favicon links, font preloads
  page.tsx              homepage composition
  globals.css           Tailwind layers + ported coalios primitives (.cta, .link, .glow-border, .legal-content, .brand-word)
  lib/
    seo.ts              route/SEO single source (SITE_ORIGIN, ROUTES, metadataFor)
    pricing.ts          PRICING_PLANS, PAID_TRIAL_HELPER, VAT_NOTE, PRICING_INTRO
    contacts.ts         CONTACTS (Martina Adamcová, Šárka Melišová)
    links.ts            REGISTER_URL, LOGIN_URL, SECTION (fragment ids)
    smoothScroll.ts     isPlainActivation / shouldSmoothScroll fragment-nav guard + offset
  sitemap.ts / robots.ts   derived from seo.ts
  components/
    Header.tsx          floating→pinned nav, coalfamily strip, modal mobile menu
    Footer.tsx          two-column footer, Navigace (incl. Reference / GDPR / Cookies)
    LegalPage.tsx       /gdpr + /cookies shell (SubpageIntro + Waulter container)
    ResponsiveImage.tsx registry-driven <img> for Sharp-generated rasters
    home/               Hero, Capabilities, FunctionsBrowser, ProductGallery, Pricing, Industries, Faq, Contact
                        ProductGallery.tsx — client island: the 3 real app screenshots as a playful stack (one straight in front, one tilted above/left, one below/right). The three cards are persistent — rendered in stable order, each keyed to its screenshot; navigating only animates the CSS `transform` between roles (`.pg-card*`, ~340 ms), so the actual cards glide (next cycles upper→front→lower→upper, previous reverses) with no image swap; `prefers-reduced-motion` snaps. A single transparent `<button>` overlay at the front-card box is the one focus target / fullscreen trigger; the moving cards are never tab stops. prev/next + counter + touch swipe, wrapping, and an accessible fullscreen dialog with its own accepted slide-in (portaled to body, background inert); no carousel library, no transition timer
    legacy/LegacyPage.tsx        shared shell for the three retained legacy routes
    reference/ReferenceList.tsx  testimonial cards + <details> disclosure
    ui/                 CtaButton, Section, SubpageIntro, InfoCard, BrandWord, SpotlightGroup, FragmentCta
    theme/              ThemeToggle, themeScript (render-blocking bootstrap)
    icons/              LineIcon, FamilyIcons (inline React SVG — no files in public/icons/)
```

Rendered application data and components are the **canonical source for exact
website copy**. [content-and-seo.md](content-and-seo.md) stores the operating
rules, current facts, limitations and source-file pointers — not a duplicate of
every rendered string.

## Image pipeline (design)

- `image-registry.json` records each Sharp-managed raster: `src` (registry key),
  `file` (source path), `name`, native `width`/`height`, and the derivative
  `widths`. Five entries: `martina-adamcova`, `sarka-melisova` (both 1080×1080,
  widths 240/320/480/640); and the three product-gallery screenshots
  `product-gallery-{smeny,pozice,zamestnanci}` under
  `public/img/product-gallery/` (all 2876×1376, widths
  720/1080/1440/1920/2560/2876 — capped at the native width for fullscreen).
- `scripts/generate-image-derivatives.mjs` (Sharp) writes WebP derivatives to
  `public/img/derivatives/` (git-ignored, idempotent). It throws on a missing
  source, a registry dimension that disagrees with the decoded source, an upscale
  request, or a generated file whose real width ≠ its descriptor.
- `app/components/ResponsiveImage.tsx` reads the registry and emits a `srcset`
  whose `w` descriptors match the actual generated files, plus a layout-aligned
  `sizes`. It throws if asked for an unregistered `src`. It is a plain
  presentational component (no hooks, no Node imports), safe in server and client
  components. Used by the two contact portraits (`fill`, lazy) and the product
  gallery (all three inline screenshots = lazy + `sizes` for the ~half-width
  slot, each requested once; fullscreen slide = `priority`). SVGs and logos are
  rendered as ordinary `<img>` elements. `next/image` is not imported anywhere in
  the app,
  so `next.config.ts` carries no `images` block and the static export ships no
  runtime image optimizer.
- The generator runs from `dev`, `build`, `pages:build` and `typecheck` (see
  [operations.md](operations.md) for why the script chains it explicitly rather
  than relying on an npm `pre*` hook).

## Analytics and consent

GTM container `GTM-NQDZKVLF` is loaded from `app/layout.tsx` (inline script +
`<noscript>` iframe) and is owner-managed. The GTM container injects the Waulter
loader (`https://cdn.waulter.cz/sdk.js`); Waulter populates the `#waulterGdpr` /
`#waulterCookies` containers with policy HTML on the production domain. The legal
shells server-render the empty container with `suppressHydrationWarning` so React
never overwrites injected content, and footer links to `/gdpr` / `/cookies` are
full-document `<a href>` so the provider initialises normally.

Quanda was removed at the owner's explicit request and must stay absent. Do not
add a second consent loader, change GTM, or run a cookie audit. Waulter is not
Quanda.
