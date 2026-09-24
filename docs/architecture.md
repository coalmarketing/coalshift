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

Four route files exist, all public and indexable. `public/_redirects` 301s
six retired legacy URL forms and both `/zdravotnici` forms at the Cloudflare
edge; no route source exists for them. See [content-and-seo.md](content-and-seo.md)
for the full redirect matrix with exact `Location` values.

| Path | File | Role |
| --- | --- | --- |
| `/` | `app/page.tsx` | Main marketing page (`Hero` → `Capabilities` → `FunctionsBrowser` → `ProductGallery` → `Pricing` → `Industries` → `Faq` → `Contact`) |
| `/reference` | `app/reference/page.tsx` | Public testimonials subpage; linked in footer **Navigace** |
| `/gdpr` | `app/gdpr/page.tsx` | GDPR policy shell (`<div data-waulter-document="AG0774">`) |
| `/cookies` | `app/cookies/page.tsx` | Cookies policy shell (`<div data-waulter-document="AG0775">`) |

`/zdravotnici` and `/zdravotnici/` 301 to `/#industries` (the retired healthcare
page; healthcare stays a plain audience label on the homepage).

## Route/SEO data ownership

`app/lib/seo.ts` is the single source for the production origin and per-route SEO
intent:

- `SITE_ORIGIN` — `https://coalshift.cz`.
- `ROUTES` — one `RouteSeo` record per path (`title`, `description`,
  `canonical`, `sitemap`).
- `metadataFor(path)` — builds the Next `Metadata`: `title.absolute`,
  self-canonical, text-only Open Graph and Twitter `summary` (no image).

`app/sitemap.ts` and `app/robots.ts` derive from `seo.ts` (both
`export const dynamic = "force-static"`, a no-op under export). The sitemap emits
every route with `sitemap: true`. `app/robots.ts` is allow-all with a
`Sitemap:` line and no `Disallow`. `app/layout.tsx` sets only `metadataBase` +
a plain title/description fallback (used by the built-in 404) — nothing there
is inherited as a per-route canonical or social card.

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
    links.ts            REGISTER_URL, LOGIN_URL, SECTION (fragment ids), BOOKINGS_URL,
                         YOUTUBE_VIDEO_ID/YOUTUBE_URL/YOUTUBE_TITLE/YOUTUBE_POSTER_SRC,
                         buildYoutubeEmbedUrl(origin) — appends enablejsapi=1 + the
                         real runtime origin for the IFrame Player API
    dataLayer.ts        pushDataLayerEvent(payload) — the only way app code appends
                         to GTM's window.dataLayer; never re-initializes GTM
    youtubeIframeApi.ts loadYoutubeIframeApi() — dependency-free singleton loader
                         for https://www.youtube.com/iframe_api, requested only
                         after Play; chains onto any pre-existing
                         window.onYouTubeIframeAPIReady instead of overwriting it
    smoothScroll.ts     isPlainActivation / shouldSmoothScroll fragment-nav guard + offset
  sitemap.ts / robots.ts   derived from seo.ts
  components/
    Header.tsx          floating→pinned nav, coalfamily strip, modal mobile menu
    Footer.tsx          two-column footer, Navigace (incl. Reference / GDPR / Cookies)
    LegalPage.tsx       /gdpr + /cookies shell (SubpageIntro + [data-waulter-document] container)
    ResponsiveImage.tsx registry-driven <img> for Sharp-generated rasters
    home/               Hero, Capabilities, FunctionsBrowser, ProductGallery, Pricing, Industries, Faq, Contact, BookingsDialog
                        ProductGallery.tsx — client island: a two-option accessible selector (WAI-ARIA manual-activation tabs, horizontal roving focus, decorative icons ported byte-for-byte from coalios `play_arrow.svg`/`devices.svg`) switches between the video walkthrough and the screenshot gallery, defaulting to video. Both mode panels are permanently mounted as two real `role="tabpanel"` elements (their own ids, `aria-labelledby` to the matching tab) stacked in one CSS-grid "media stage" (`col-start-1 row-start-1`) — the stage's height is the grid's natural max of both panels' content, so switching modes never shifts the section or the content below it; no JS height measurement. The inactive panel crossfades out (opacity + small translate, ~220ms, instant under `prefers-reduced-motion`) and is `aria-hidden` + `inert` + `pointer-events-none`, exposing no controls to keyboard/AT. Video mode renders a first-party click-to-play facade (local poster only, no YouTube contact before activation) that mounts a responsive `youtube-nocookie.com` iframe on play (`enablejsapi=1` + the real `window.location.origin`, via `buildYoutubeEmbedUrl`), plus a direct YouTube-link fallback; leaving Video mode unmounts the player (`playing` resets whenever `mode !== "video"`, and the panel is inert either way). A `useYoutubePlaybackAnalytics` hook attaches only after Play: it loads the YouTube IFrame API on demand (`loadYoutubeIframeApi`, never before activation, never twice), wraps the mounted iframe in a `YT.Player`, and pushes a `coalshift_video` `dataLayer` event (`video_status`: `start` once per player instance on the first real `PLAYING` state, `progress` once each at 25/50/75% via a 1s poll of `getCurrentTime()`/`getDuration()`, `complete` at 100% on `ENDED`; a poll-to-poll jump bigger than a few points is treated as a seek and never retroactively fires a skipped threshold). The interval and `YT.Player` instance are torn down whenever `playing` goes false (mode change or unmount); any API/script failure is caught and never blocks the iframe's own `autoplay` playback. This never emits GTM's own `gtm.video` event and never calls GA4 directly — see [content-and-seo.md](content-and-seo.md) §"Video walkthrough" for the exact event contract. Screenshot mode: the 3 real app screenshots as a playful stack (one straight in front, one tilted above/left, one below/right). The three cards are persistent — rendered in stable order, each keyed to its screenshot; navigating only animates the CSS `transform` between roles (`.pg-card*`, ~340 ms), so the actual cards glide (next cycles upper→front→lower→upper, previous reverses) with no image swap; `prefers-reduced-motion` snaps. A single transparent `<button>` overlay at the front-card box is the one focus target / fullscreen trigger; the moving cards are never tab stops. prev/next + counter + touch swipe, wrapping, and an accessible fullscreen dialog with its own accepted slide-in (portaled to body, background inert); no carousel library, no transition timer
                        BookingsDialog.tsx — client island: the "Rezervovat konzultaci" CTA plus a lazy accessible dialog (focus trap, Escape, body scroll lock, background inert, focus restored on close — same contract as the gallery's fullscreen dialog) around a Microsoft Bookings iframe, created only on open, with a permanent direct-link fallback. Rendered by `Contact.tsx`, which lays out the left one-third personal contacts + right two-thirds consultation panel on desktop (the panel stretches to the contacts column's height), consultation first on mobile. Each contact is one cohesive `.glow-border` card (portrait + name/role/contact links inside a single inner surface wrapper); the consultation panel is likewise one `.glow-border--lg` card with exactly one inner surface (a restrained coalshift-blue radial-gradient wash, CTA anchored near the bottom via `mt-auto`) — `.glow-border > *` styles every direct child as its own rounded surface, so each card keeps exactly one direct child
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
  `widths`. Six entries: `martina-adamcova`, `sarka-melisova` (both 1080×1080,
  widths 240/320/480/640); the three product-gallery screenshots
  `product-gallery-{smeny,pozice,zamestnanci}` under
  `public/img/product-gallery/` (all 2876×1376, widths
  720/1080/1440/1920/2560/2876 — capped at the native width for fullscreen); and
  `product-video-poster` (`public/img/product-video-poster.jpg`,
  1280×720, widths 480/640/960/1280) — the verified YouTube thumbnail for the
  video facade, stored locally so the site never contacts YouTube for the
  poster.
- The raw 340 MB source video (`coalshift_onboarding_original.mp4`) is kept
  outside `public/` at `/video-source/` (gitignored) specifically because
  `output: "export"` copies the entire `public/` tree verbatim from disk,
  ignoring `.gitignore` — an untracked file under `public/` would still land in
  `out/` on a local build. YouTube hosts the only deployed copy of the video;
  no MP4/WebM enters `out/` or Git.
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
loader (`https://cdn.waulter.cz/sdk.js`); Waulter populates the
`[data-waulter-document="AG0774"]` / `[data-waulter-document="AG0775"]`
containers on `/gdpr` / `/cookies` with policy HTML on the production domain.
The legal shells server-render the empty container with
`suppressHydrationWarning` so React never overwrites injected content, and
footer links to `/gdpr` / `/cookies` are full-document `<a href>` so the
provider initialises normally.

Quanda was removed at the owner's explicit request and must stay absent. Do not
add a second consent loader, change GTM, or run a cookie audit. Waulter is not
Quanda.
