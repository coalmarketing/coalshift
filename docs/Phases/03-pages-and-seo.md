# 03 — Pages and SEO

## Objective

Redesign `/reference` as the sole new public subpage in the accepted coalshift design; keep the accepted homepage unchanged except for its Phase 03 metadata/footer integration; and provide coherent route-specific SEO, a four-URL sitemap and an allow-all robots policy. Source for `/registrace`, `/wait-list` and `/wait-list/thank-you` remains in the repository, but those URLs are unavailable as pages: both slash forms of each permanently redirect to `/` and stay outside the sitemap.

The active product/design surface for this phase is the homepage plus `/reference`. The legacy routes were already rewritten during implementation; retain that harmless working result, but freeze it. Their copy, breadcrumb, layout, link styling and target behavior are no longer review or correction criteria.

## Owner scope clarification — 3 September 2026

Jakub clarified after `/recheck` that the three legacy implementations are intentionally dead and must be ignored for ongoing design/content development. Keep their source bodies for possible future reactivation, but make all six exact URL forms return HTTP 301 with `Location: /`: `/registrace`, `/registrace/`, `/wait-list`, `/wait-list/`, `/wait-list/thank-you`, `/wait-list/thank-you/`. They have no active internal discovery and no sitemap entry. Their retained `noindex` metadata may stay in source, but public body metadata/canonical/social output is irrelevant while redirects win. Do not roll back, delete, review or improve the bodies. Findings about their breadcrumb, repeated link class, same/new-tab behavior, support-constant naming or other presentation/semantics are explicitly non-blocking and out of scope.

The public surfaces under active review are the already accepted homepage and `/reference`. Phase 03 corrections are limited to the two accepted reference-page issues plus the six static 301 rules documented in [the post-recheck correction assignment](../phase-03-post-recheck-corrections.md). This clarification supersedes broader legacy-page review language below; the detailed implementation record remains as history.

## Dependencies and starting point

Phase 02 is accepted (owner, 3 September 2026). Read [brief](../brief.md), [plan](../plan.md), [agent instructions](../agent-instructions.md), [content](../content.md), [design reference](../design-reference.md) and [quality](../quality.md).

**Git baseline (record in plan.md before implementation).** Branch `redesign`, HEAD `68fdbcbd2562f73db91a683315d259c4fca4ef04`, tracking `origin/redesign`. The accepted Phase 02 result (committed `68fdbcb` plus the accepted uncommitted G/R/H1/tooltip/I1–I8 working tree and the `docs/phase-02-*` files) is still uncommitted. Phase 03 builds on that tree; keep the Phase 03 diff separately identifiable from the pre-existing Phase 02 changes and do not commit either.

**Pre-implementation source facts (verified 3 September 2026; historical baseline):**

- `app/layout.tsx` `metadata` holds `metadataBase`, `title: HOME_TITLE`, `description: HOME_DESC`, a full `openGraph` block (`title`, `description`, `url: "https://coalshift.cz"`, `siteName`, `locale`), a `twitter` block (`card: "summary_large_image"` with **no image anywhere**), and `alternates.canonical: "https://coalshift.cz"`. It also holds GTM `GTM-NQDZKVLF` (`<Script>` + `<noscript>` iframe), the theme bootstrap `<script>`, favicon/manifest `<link>`s, font `<link rel="preload">`s and `viewport`.
- `app/page.tsx` exports **no `metadata`** — the homepage inherits title/description/canonical/OG from the layout.
- `app/gdpr/page.tsx` and `app/cookies/page.tsx` already export their own `title`, `description` and `alternates.canonical` (Phase 02). Their bodies come from `app/components/LegalPage.tsx`, which renders `<Header/>`, `<main id="main" tabIndex={-1} className="outline-none">` (the intro + the single empty `<div id="waulterGdpr|Cookies" suppressHydrationWarning/>` in `.legal-content`), then `<Footer/>`.
- `app/reference/page.tsx`, `app/registrace/page.tsx`, `app/wait-list/page.tsx`, `app/wait-list/thank-you/page.tsx` export **no `metadata`** and inherit the homepage canonical, title and OG block.
- `app/reference/page.tsx` wraps `<Header/>`, `<References/>` and `<Footer/>` **inside** a single `<main className="min-h-screen bg-bila">` — the `banner` and `contentinfo` landmarks are nested in `main`, the page is forced light (`bg-bila`, no `dark:`), and there is **no `#main` skip target** and **no `<h1>`** (`References.tsx` heading is an `<h2 className="text-modra">`).
- `app/registrace/page.tsx` and `app/wait-list/page.tsx` are byte-identical and both render `app/components/WaitListRegistration.tsx` (H1 "Buďte mezi prvními", tykání throughout, three obsolete launch-offer cards — "Přednostní přístup", "Speciální cena" / "exkluzivní cenové podmínky a bonusy navíc", "Exkluzivní obsah" — uppercase button "CHCI SI VYZKOUŠET APLIKACI"). Bare `<main>`, no `#main`, no `dark:` styling.
- `app/wait-list/thank-you/page.tsx` renders `<Header/>` + `app/components/WaitList.tsx` and **no `<Footer/>`**. `WaitList.tsx` asserts "Jsi na seznamu čekatelů", "coalshift spouštíme 1. 7. 2025", "Potvrzení e-mailem", "Přístup bude spuštěn od 1. července 2025" — all explicitly forbidden by [content.md](../content.md) — plus tykání, a commented-out "Bonus pro čekající" block referencing a non-existent `/icons/gift-icon.svg`, and a non-Czech alt "Waiting List Ilustrace". Bare `<main>`, no `#main`, no `dark:` styling.
- `app/components/References.tsx` (`'use client'`, no actual interactivity): three long attributed testimonials (Michal Uhlíř — "coalfamily"; Jana Novotná — "HR Manager"; Petr Svoboda — "Provozní ředitel"), each with a hard-coded `stars: 5` five-star graphic (no `role`, no accessible name) and a per-card coalshift mono logo labelled "coalshift logo". The Petr Svoboda quote contains "Integrace s naším stávajícím HR systémem proběhla hladce".
- `app/components/Button.tsx` (variants `primaryModra` etc.) is used **only** by `WaitListRegistration.tsx` and `WaitList.tsx`. `tailwind.config.js` keeps legacy tokens (`modra`, `modraHover`, `cerna`, `bila`, `bilaHover`, `sparta`, `lightBlue`) with a comment that they exist "so the not-yet-redesigned route bodies (phase 03) keep rendering".
- `app/components/Footer.tsx` `NAV` array + `LINK_CLASS` (already `.link`, centre-out). The `/gdpr` and `/cookies` entries are deliberately full-document `<a href>` (so Waulter initialises); the `Přihlásit se` entry is a `<Link>`.
- No `app/sitemap.ts`, `app/robots.ts`, `public/robots.txt`, `public/sitemap.xml`, `app/not-found.tsx`. `public/_redirects` has only the two `/zdravotnici` → `/#industries` 301s. `next.config.ts`: `output: "export"`, `images.unoptimized: true`, **no `trailingSlash`** (defaults to `false`).
- No `?refreshed=`, `location.reload`, `router.refresh` or middleware anywhere in `app/`; the Phase 01 forced-reload workaround was already removed. The "refresh workaround" step below is a **verification-only** regression check.
- No active internal `href` to `/registrace`, `/wait-list` or `/wait-list/thank-you` anywhere in `app/`. Phase 03 must not introduce one.
- Mock-browser display paths (`/smeny-a-ai`, `/lide-a-pozice`, `/nepritomnosti`, `/exporty`, `/statistiky`) are plain text in `FunctionsBrowser.tsx`, not `<a href>` — no crawler treats them as URLs; the only failure mode is a human typing one and hitting the unstyled default 404.

## Locked implementation decisions

These were left open by the previous plan draft, were resolved during `/replan`, and were accepted by Codex on 3 September 2026.

1. **Historical implementation decision — `/registrace` and `/wait-list` split.** This work was completed before the final owner clarification. Preserve the resulting source, but do not continue reviewing or polishing it; the public URLs now redirect to `/`.
2. **Star rating on `/reference`: remove.** `stars: 5` is a component-only invented rating with no accessible name; [content.md](../content.md) forbids inventing "ratings" and rating structured data, and `/reference` becomes indexable. Drop the star graphic and the per-card mono logo (it is the same coalshift logo on every card, not a customer logo). Keep the attributed quote + name + role.
3. **`/reference` card layout: static responsive grid**, not the coalios Embla carousel. Justification: three fixed items do not warrant a JS carousel dependency or its roving/pause/`aria-roledescription` burden; a `md:grid-cols-2 xl:grid-cols-3` grid ports the reference card composition faithfully (the carousel is a container, not the card design). Long quotes use the coalios **native `<details>`/`<summary>` disclosure** pattern (`line-clamp-3` → `group-open:line-clamp-none`, "Zobrazit více" / "Skrýt") — keyboard-operable, static-export-safe, lets `References.tsx` become a server component; the global reduced-motion rule already neutralises its transition.
4. **`/reference` photo slot.** coalshift has no portraits. Use the coalios no-image fallback: a `size-16` neutral circle (`bg-neutral-100 dark:bg-neutral-900`, `text-neutral-600`) containing a person glyph. Do not invent photos; do not omit the slot.
5. **Social preview: metadata-only summary.** No 1200×630 asset exists and the brief forbids inventing product imagery. Do not create an OG image in this phase. Public routes emit complete text metadata (`openGraph` title/description/URL/site name/locale) without `images`; `twitter.card` becomes `"summary"` with matching title/description and no image. Do not leave `summary_large_image` with no image.
6. **Legacy tokens / `Button.tsx`: preserve.** Rewritten dead pages use accepted `CtaButton` and neutral/coalsoft tokens, but removing now-unused `app/components/Button.tsx` or the legacy Tailwind colour block is unrelated cleanup. Leave both untouched and report them as intentionally retained. A later maintainability task may remove them only after a fresh whole-repository usage check.
7. **Branded 404: out of scope.** Do not add `app/not-found.tsx` in this phase. The existing static-export 404 remains acceptable; verify only that removing the global homepage canonical prevents route-specific pages from inheriting it. A branded 404 requires a separate future decision.
8. **`title.template`: do not introduce one.** The [content.md](../content.md) titles are intentionally non-uniform (`Reference | coalshift`; `Vyzkoušejte coalshift na 14 dní zdarma` with no suffix; `— coalshift` em-dash on the legal pages). Every route sets `metadata.title` as the exact plain string. The homepage keeps `HOME_TITLE` unchanged (`app/page.tsx` either sets no `title` and inherits it, or uses `title: { absolute: HOME_TITLE }`).
9. **URL form.** Keep explicit `trailingSlash: false` in `next.config.ts`. Non-root canonicals, sitemap entries and internal `href`s use the no-trailing-slash form. **Codex clarification, 3 September 2026:** the homepage canonical, sitemap and OG `url` consistently use the bare origin `https://coalshift.cz`, matching the current Next 16.3.4 metadata resolver with this project’s `metadataBase` and `trailingSlash: false`. The equivalent root spelling with `/` in the original plan is superseded. Do not change routing configuration or add a workaround just to restore that spelling.

## Shared-file allowlist

Phase 02 was accepted one day earlier. Phase 03 may touch **only**:

- `app/components/Footer.tsx` — add exactly one `<li>` (`<Link href="/reference" className={LINK_CLASS}>Reference</Link>`) in the `NAV`-style list. Do not alter the existing `/gdpr` / `/cookies` full-document `<a>` markup or any other entry.
- `app/layout.tsx` — remove `alternates`, `openGraph` and `twitter` from `metadata` (relocate them to per-route exports); keep `metadataBase`. **Do not touch** GTM, the `<noscript>` iframe, the theme bootstrap `<script>`, the favicon/manifest `<link>`s, the font `<link rel="preload">`s or `viewport`.
- `app/page.tsx` — add an `export const metadata` (title unchanged, description = `HOME_DESC`, self-canonical `https://coalshift.cz`, per-route `openGraph`).
- `app/gdpr/page.tsx` and `app/cookies/page.tsx` — read their existing exact title/description/canonical values from `app/lib/seo.ts` and add the locked text-only Open Graph + Twitter `summary` fields. Do not alter their page bodies or Waulter IDs.
- `app/reference/page.tsx` + new `app/components/reference/*` — full redesign; retire `app/components/References.tsx` and the `bg-bila` wrapper.
- `app/registrace/page.tsx`, `app/wait-list/page.tsx`, `app/wait-list/thank-you/page.tsx` + `app/components/WaitListRegistration.tsx` + `app/components/WaitList.tsx` — copy rewrite, component split, per-route `metadata`, shared-shell shape, `#main` target, dark-safe surfaces.
- New: `app/sitemap.ts`, `app/robots.ts`, `app/lib/seo.ts` (see below).
- `next.config.ts` — add `trailingSlash: false`.
- `public/_redirects` — in the post-recheck correction only, append the six exact 301 rules for the retained legacy URL families; preserve the two healthcare redirect rules.
- Extract a shared `app/components/ui/SubpageIntro.tsx` from `LegalPage.tsx:26-54` (H1 + `Domů → title` breadcrumb + blue radial wash) and have both `LegalPage` and `/reference` consume it, so the two intros cannot diverge. This is the only permitted change to `LegalPage.tsx`; preserve its semantic rendered intro, exact Waulter container and observable visual/interaction behaviour. RSC serialization does not need to be byte-identical.

**Do not** touch `Header.tsx`, `globals.css`, `CtaButton.tsx`, `ThemeToggle.tsx`, `smoothScroll.ts`, `Section.tsx`, the `LegalPage.tsx` Waulter container / `suppressHydrationWarning` / `.legal-content` wrapper, `FunctionsBrowser.tsx`, or any homepage section component, unless a concrete named regression is found — in which case report it as a finding, do not silently fix it.

## Scope and implementation steps

### A. Route metadata ownership and SEO outputs — completed implementation history

- [x] Create `app/lib/seo.ts` as the single source: the production origin (`https://coalshift.cz`), and per-route `{ title, description, canonical | null, indexable, sitemap, openGraph }` for `/`, `/reference`, `/gdpr`, `/cookies`, `/registrace`, `/wait-list`, `/wait-list/thank-you`. Titles/descriptions come verbatim from [content.md](../content.md) §"Metadata copy and intent". Each `page.tsx` builds its `metadata` from this module; `app/sitemap.ts` and `app/robots.ts` import the same production-origin/route data. This makes "exactly four sitemap URLs" and "no route inherits the homepage canonical" mechanically checkable.
- [x] Remove `alternates`, `openGraph`, `twitter` from `app/layout.tsx` `metadata`. Add `export const metadata` to `app/page.tsx` with the exact absolute `HOME_TITLE`, description `HOME_DESC`, self-canonical `https://coalshift.cz`, complete text-only `openGraph`, and text-only `twitter: { card: "summary", ... }`. Do not introduce `title.template`.
- [x] Add `export const metadata` to `app/reference/page.tsx` (title `Reference | coalshift`, description `Přečtěte si zkušenosti s plánováním směn v coalshiftu.`, self-canonical `https://coalshift.cz/reference`, `openGraph`).
- [x] Add `export const metadata` to `app/registrace/page.tsx`, `app/wait-list/page.tsx`, `app/wait-list/thank-you/page.tsx` with the content.md titles/descriptions and `robots: { index: false, follow: true }`. **No `alternates.canonical`, `openGraph` or `twitter`** on these three.
- [x] Confirm `/gdpr` + `/cookies` still emit their Phase 02 self-canonical/title/description unchanged, and add complete text-only `openGraph` plus text-only `twitter.card = "summary"` to each public page. Apply the same social form to `/reference`. No social image is created or referenced.
- [x] Emit no JSON-LD anywhere in this phase — no `Organization`, `WebSite`, `Review`, `AggregateRating` or `sameAs`. State this affirmatively in the report.
- [x] Add `app/sitemap.ts` returning exactly four absolute URLs — `https://coalshift.cz`, `https://coalshift.cz/reference`, `https://coalshift.cz/gdpr`, `https://coalshift.cz/cookies`. Omit `lastModified`, `changeFrequency` and `priority`; no accurate content-change timestamps exist, so do not manufacture them.
- [x] Add `app/robots.ts`: `User-Agent: *`, `Allow: /`, `Sitemap: https://coalshift.cz/sitemap.xml`; do not also create `public/robots.txt` / `public/sitemap.xml` (route collision). This records the completed SEO implementation; the final legacy-URL behavior is defined by the later 301 rules.
- [x] Add `trailingSlash: false` to `next.config.ts`.

### B. `/reference` redesign

- [x] Restructure `app/reference/page.tsx` to the `LegalPage` shape: `<Header/>`, then `<main id="main" tabIndex={-1} className="outline-none">` containing the subpage intro + testimonial grid, then `<Footer/>` — Header and Footer are **siblings** of `main`, not children.
- [x] Use the extracted `SubpageIntro` with H1 **"Reference"** and breadcrumb **Domů → Reference**. Author a short intro paragraph: Czech vykání, neutral, no measured outcomes, no paraphrase of testimonial claims into product promises (register: like the metadata description).
- [x] Testimonial cards from the accepted primitives — `Section`/`SectionHeading` for rhythm, `.glow-border` + `SpotlightGroup` for the card surface, reference `neutral-100 / dark:neutral-900` interior. Not `InfoCard` (short-tile component). Static `md:grid-cols-2 xl:grid-cols-3` grid.
- [x] Each card: neutral-circle person glyph, name as a heading (`<h2>` — no skipped levels, WCAG 1.3.1), role in coalsoft blue, then the quote inside a `<details>`/`<summary>` disclosure (`line-clamp-3` collapsed, "Zobrazit více" / "Skrýt"). Preserve the three quotes and attributions **verbatim** (Michal Uhlíř — coalfamily; Jana Novotná — HR Manager; Petr Svoboda — Provozní ředitel). **Codex source check, 3 September 2026:** quotes/attributions match; collapsed line count and photo-slot backgrounds differed from locked decisions 3–4 (P03-PRE-01/02). **Post-recheck correction P03-C1, 3 September 2026:** collapsed quote realigned to `line-clamp-3` (verified 3 visual lines at 320–1440 in both themes, full quote intact on expand); the `bg-neutral-200 dark:bg-neutral-800` avatar treatment is ratified as-is by the correction assignment (the locked `neutral-100/900` value is invisible against the `.glow-border` card interior). P03-PRE-01 resolved; P03-PRE-02 ratified. Item closed.
- [x] No star rating, no per-card logo, no `Review`/`AggregateRating` markup.
- [x] Delete `app/components/References.tsx` after moving its content into the new component(s); make the new component a server component.
- [x] Both themes: heading `text-neutral-900 dark:text-white`, body `text-neutral-700 dark:text-neutral-300`, all pairs ≥ 4.5:1 (large text / UI ≥ 3:1). No forced `bg-bila`.

### C. Dead legacy pages — completed implementation history, now frozen

The checklist below records already completed work and is not a current requirement. Preserve the resulting source without further edits. Public requests no longer render these bodies because the final owner decision requires 301 redirects to `/`.

- [x] **`/registrace`** — H1 `Vyzkoušejte coalshift na 14 dní zdarma`; lead `Seznamte se s plánováním směn, správou nepřítomností a přehledy pro váš tým. Registraci dokončíte přímo v aplikaci coalshift.`; CTA `Přejít k registraci` → `REGISTER_URL`; secondary `Už máte účet? Přihlásit se.` → `LOGIN_URL`. Supporting blocks may reuse the approved AI-planning / nepřítomnosti / exporty copy. **Remove** the three launch-offer cards ("Přednostní přístup", "Speciální cena" / "exkluzivní cenové podmínky a bonusy navíc", "Exkluzivní obsah") and the uppercase button text.
- [x] **`/wait-list`** — H1 `Začněte s coalshiftem`; lead `Chcete si zjednodušit plánování směn? coalshift si můžete vyzkoušet na 14 dní zdarma.`; CTA `Vyzkoušet na 14 dní zdarma` → `REGISTER_URL`; support `Máte otázky? Kontaktujte náš tým.` → `/#contact` (absolute, cross-route; verify it resolves and scrolls on a non-home route). Split from `/registrace` (own copy + own `metadata`).
- [x] **`/wait-list/thank-you`** — H1 `Děkujeme za zájem o coalshift`; lead `Chcete pokračovat? Přejděte do aplikace a vyzkoušejte si plánování směn na 14 dní zdarma.`; CTA `Přejít do aplikace` → `REGISTER_URL`; secondary `Zpět na úvodní stránku` → `/`. **Delete** the entire "Co můžeš očekávat dál" section (`Potvrzení e-mailem`, `Budoucí notifikace ke stavu přístupu`, `Přístup bude spuštěn od 1. července 2025`), the commented-out "Bonus pro čekající" block and its dead `/icons/gift-icon.svg` reference. Add `<Footer/>` (currently the only route without it). Replace or drop the non-Czech illustration alt.
- [x] Q-011 search (source + built HTML) for the purged strings: `1. 7. 2025`, `1. července 2025`, `seznamu čekatelů`, `Potvrzení e-mailem`, `Přednostní přístup`, `Speciální cena`, `exkluzivní cenové podmínky`, `CHCI SI VYZKOUŠET`, and any remaining tykání (`Zaregistruj`, `Začni`, `Získej`, `tvé`, `dáme ti`) — all must be gone.

### D. Shared shell, footer, cleanup

- [x] Extract `SubpageIntro` from `LegalPage.tsx` (behaviour-preserving; re-verify `/gdpr` + `/cookies`).
- [x] Add the single `Reference` `<li>` to the footer `NAV` list (`<Link>`, `LINK_CLASS`). Historical implementation verification covered all seven generated bodies. Current verification covers the four public routes and confirms **zero** internal `href` to `/registrace`, `/wait-list`, `/wait-list/thank-you` (and none to `/zdravotnici`).
- [x] Leave `app/components/Button.tsx` and the legacy Tailwind colour block untouched; record this intentional non-cleanup in the report.
- [x] Verification-only: confirm no `?refreshed=` / forced reload / forced remount remains (grep + built HTML) and that direct load and browser reload on `/registrace`, `/wait-list` and the two-level `/wait-list/thank-you` render correctly from a served `out/` (Cloudflare Pages maps `out/wait-list/thank-you.html`; `trailingSlash` false).
- [x] Preserve the `/zdravotnici` + `/zdravotnici/` → `/#industries` 301 in `public/_redirects`; keep `/zdravotnici` out of the sitemap and out of per-route metadata; do not recreate its body or video.

### F. Final owner correction — legacy URL redirects

- [x] Append exact static rules to `public/_redirects` for `/registrace`, `/registrace/`, `/wait-list`, `/wait-list/`, `/wait-list/thank-you` and `/wait-list/thank-you/`; every rule returns **301** to `/`.
- [x] Preserve the two existing `/zdravotnici` rules byte-for-byte. Keep every retained legacy route/component/source body unchanged.
- [x] Build and serve fresh `out/` with Wrangler, not `next dev`. Verify all six requests return status 301 with `Location: /`; verify `/` returns 200 and no redirect loop occurs.

### E. Accessibility on touched pages only

Scope for the post-recheck correction: `/reference` only. The legacy bodies are retained, unreachable source and are not an accessibility-review surface while their URLs redirect (homepage + legal Q-010 were settled in Phase 02 / I1–I8).

- [x] One `<h1>` per page; correct heading nesting; `<main>`/`banner`/`contentinfo` as siblings; unique `id`s; breadcrumb `<nav>` semantics via `SubpageIntro`.
- [x] Historical implementation: `<main id="main" tabIndex={-1} className="outline-none">` on every generated route body that renders `<Header/>`; prior verification covered all seven bodies. The post-recheck correction reviews this behavior only on public `/reference` because the three frozen bodies are intercepted by redirects.
- [x] Visible focus (global `:focus-visible` ring — already sufficient), keyboard order, `<details>` summary operability, reduced-motion (global rule already covers the disclosure + `.link`).
- [x] Image alt text in Czech; decorative glyphs `aria-hidden`.

## Owner-approved route and indexing matrix

| Route | HTTP role | Internal discovery | Robots meta | Canonical / sitemap |
| --- | --- | --- | --- | --- |
| `/` | Public content | Header/footer + content links | `index, follow` (default, no meta emitted) | Self-canonical `https://coalshift.cz`; in sitemap |
| `/reference` | Public references subpage | Footer **Navigace** only | `index, follow` (default) | Self-canonical `https://coalshift.cz/reference`; in sitemap |
| `/gdpr` | Public legal page | Footer **Navigace** | `index, follow` (default) | Self-canonical `https://coalshift.cz/gdpr`; in sitemap |
| `/cookies` | Public legal page | Footer **Navigace** | `index, follow` (default) | Self-canonical `https://coalshift.cz/cookies`; in sitemap |
| `/registrace`, `/registrace/` | Retained source; public request 301 to `/` | No internal links | Redirect response; retained source meta is not relied upon | Not a content entry; not in sitemap |
| `/wait-list`, `/wait-list/` | Retained source; public request 301 to `/` | No internal links | Redirect response; retained source meta is not relied upon | Not a content entry; not in sitemap |
| `/wait-list/thank-you`, `/wait-list/thank-you/` | Retained source; public request 301 to `/` | No internal links | Redirect response; retained source meta is not relied upon | Not a content entry; not in sitemap |
| `/zdravotnici`, `/zdravotnici/` | Retired URL | No links | 301 to `/#industries` | Not a content entry; not in sitemap |

The four-URL sitemap follows [Google Search Central sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Legacy URL behavior follows [Cloudflare Pages static redirects](https://developers.cloudflare.com/pages/configuration/redirects/): exact rules in the static asset directory are processed before matching assets, so retained route output can remain while requests receive the configured 301.

## Acceptance criteria

- **AC-01 (Q-006, Q-007, Q-008):** `/reference` uses the accepted responsive design in both themes with a real H1, sibling landmarks, ≥ 4.5:1 text, a working `#main` skip target and the locked three-line collapsed quote. Navigation exposes only owner-approved public links and adds exactly one footer Reference link. All six frozen legacy URL forms return 301 to `/` while their source bodies remain in the repository.
- **AC-02 (Q-011):** public homepage/reference copy uses lowercase brand spelling, vykání, careful wording and no newly promoted testimonial claim. Reference quotes and attributions stay verbatim; the intro uses the approved neutral sentence from metadata. The frozen legacy bodies are not a continuing content-review surface.
- **AC-03 (Q-014):** with the route matrix above — all six dead URL forms return 301 to `/`; each public route has its own self-canonical in the slash-consistent form; `out/sitemap.xml` contains exactly the four production URLs and excludes every dead URL; `out/robots.txt` allows crawling and advertises the production sitemap; the exact homepage title renders once; no preview hostname in any canonical/sitemap/OG output; no JSON-LD. Retained dead-route source metadata is not a public acceptance criterion while redirects are active.
- **AC-04 (Q-004, Q-009, Q-010, Q-015, Q-016):** `/reference` interactions, responsive/theme behavior and preserved integrations pass; homepage and legal shells retain their accepted behavior; GTM/Waulter/theme bootstrap/font preloads remain unchanged; no second consent loader; Quanda remains absent. Legacy-page presentation and secondary-link behavior are outside continuing review.

## Applicable quality requirements

[Quality profile](../quality.md): **Q-004, Q-006, Q-007, Q-008, Q-009, Q-010, Q-011, Q-014, Q-015, Q-016**.

Reuse Phase 02 / I1–I8 evidence where the implementation is unchanged; broaden testing only for a concrete regression risk introduced by this phase. When updating `quality.md`, **append** a dated Phase 03 evidence segment to each row — do not overwrite the Phase 02 result and do not convert any existing `NOT_RUN` / `BLOCKED` item (physical-device, screen-reader, browser-native Back scroll restoration, real Waulter injection, preview build) into `PASS`.

## Validation

### Local (served `out/` + isolated headless browser) — expected to reach PASS/FAIL

- `npm run typecheck` and `npm run pages:build` exit 0; serve `out/` with `wrangler pages dev out` (`npm run preview`). No `lint` or `test` script exists — do not add one.
- Rendered HTML for the four public routes: `<title>`, `<meta name="description">`, `<link rel="canonical">` (present + self in slash-consistent form), `<meta property="og:*">`. Do not treat generated HTML for the redirected legacy source as a public response contract.
- `out/sitemap.xml` = exactly the four absolute production URLs. `out/robots.txt` = allow-all + `Sitemap:` line, no `Disallow`. No `*.pages.dev` / preview hostname anywhere in generated output.
- No internal `href` to `/registrace`, `/wait-list`, `/wait-list/thank-you`, `/zdravotnici` in any public route's HTML. Footer `Reference` link present with centre-out `.link` motion; footer + keyboard order intact on the four public content routes.
- `/reference` at 320 / 390 / 768 / 1024 / 1280 / 1440 CSS px in both themes: no page-level horizontal overflow, keyboard order, visible focus, `<details>` operability, long-quote wrapping, `#main` skip target, one H1, contrast ratios (record actual fg/bg + ratio, light + dark).
- From a fresh Wrangler-served `out/`, request `/registrace`, `/registrace/`, `/wait-list`, `/wait-list/`, `/wait-list/thank-you` and `/wait-list/thank-you/` without following redirects: each status is 301 and each `Location` is `/`. Confirm `/` is 200 and there is no loop.
- Confirm `/zdravotnici` and `/zdravotnici/` still emit their existing 301 to `/#industries`.
- GTM inline + `dataLayer`, `<noscript>` iframe, theme bootstrap, font preloads unchanged in `out/`; no `quanda`; `/gdpr` + `/cookies` still one empty exact-ID Waulter container each; `SubpageIntro` extraction preserves their semantic intro markup and observable visual/interaction behaviour.

### Deployment-only — BLOCKED / NOT_RUN until a separate explicit publish authorization

- Q-001 preview build + branch/HEAD/deploy evidence.
- `X-Robots-Tag` HTTP header behaviour: Cloudflare Pages adds `X-Robots-Tag: noindex` to **preview deployments by default**. Verify an authorized preview’s actual header as evidence of preview exclusion; do not treat it as production indexability evidence or a universal rule for every `*.pages.dev` hostname. Local rendered metadata establishes the route intent. Verify production headers separately after production authorization; do not assume the result from a branch name. See [Cloudflare preview indexing](https://developers.cloudflare.com/pages/configuration/preview-deployments/).
- Production canonical resolution, the six legacy 301 responses, and `/reference` in a real Search Console.
- `_redirects` `Location: /#industries` — re-confirm the fragment is present in the actual `Location` header on an authorized Cloudflare preview (Phase 02 recorded status 301 only).
- Q-016 real Waulter policy injection on `/gdpr` + `/cookies` (still unverified locally; cause unknown).

Record browser/version/viewport and the tested source version for every check. Use the pinned Node 24.20.0 when available. Claude’s implementation report used Node 24.15.0; Codex’s independent typecheck used 24.20.0. Keep those environments separately attributed.

## Constraints and non-goals

Do not redesign the app at `app.coalshift.cz`, add industry URLs, delete historical route source, implement Calendly, modify owner-managed consent/GTM, add a CMS/form/backend/newsletter, add a second consent loader, or restore Quanda. Do not edit or review the dead legacy page bodies; only add their six static redirect rules. Keep the homepage's accepted design and content stable. Do not modify shared `[[AI]]` guidance. Do not commit, push, deploy, or change external/Cloudflare/GTM configuration.

## Decisions and inputs before implementation

The indexing and navigation decision is complete. Still open for the owner at final-publication time, not blocking implementation:

- Confirmation of the three testimonials' attribution and content. Flag specifically: Michal Uhlíř's position "coalfamily" reads as an in-family voice rather than an independent customer, and the Petr Svoboda quote asserts "Integrace s naším stávajícím HR systémem proběhla hladce" — an HR-system integration claim in customer voice that the brief otherwise forbids restoring without owner confirmation. Preserve verbatim in the port; surface both in the report as provenance sign-off items.

Healthcare retirement and monthly-only pricing were decided in Phase 02 and are not open here.

## Completion protocol

Implementation and the bounded post-recheck corrections have been reported complete locally; the sole status table in `plan.md` records `in_review`. Codex's targeted source and local HTTP review found no remaining correction. The next step is owner acceptance of Phase 03; there is no further Claude Code assignment or complete `/recheck`. The implementation completion requirements below remain historical report context, not a new work order:

- Updates the checklist above, the applicable `quality.md` rows (Q-004, Q-006, Q-007, Q-008, Q-009, Q-010, Q-011, Q-014, Q-015, Q-016 — append a dated Phase 03 segment, never overwrite), and the `plan.md` handoff plus a dated `plan.md` "Approved plan changes" entry.
- Marks the implementation `in_review`, never `done` (only Codex records `done` after review and Jakub's acceptance).
- Returns the **Phase Report** in English following the eight-item implementation-report structure in [agent-instructions](../agent-instructions.md) §"Reports" (assignment/outcome; repository/branch/baseline/commits/all changes incl. untracked, pre-existing Phase 02 work identified separately; behaviour changed + files; each AC and quality ID with source/build/HTTP/interactive evidence distinguished; exact checks run vs unperformed with limitations; deviations/remaining findings/missing owner inputs; Git/deployment actions — expected to be **none**; recommended next action without starting Phase 04). Include the final route/metadata matrix and any unresolved content provenance or media limitations. Do not describe the testimonials or their authors as "verified", "confirmed" or "measured evidence".

Do not start Calendly integration or another phase.

## Implementation record — 3 September 2026

Implemented locally by Claude Code on branch `redesign`; HEAD unchanged at `68fdbcbd2562f73db91a683315d259c4fca4ef04`; all work uncommitted; no push/deploy/external change. `npm run typecheck` and `npm run pages:build` (fresh `out/`) both exit 0; verified in isolated headless Chrome 152 against the served export. Phase 03 status moves `ready` → `in_review` (recorded in plan.md).

**Phase 03 delta (new):** `app/lib/seo.ts` (single route/SEO source), `app/sitemap.ts`, `app/robots.ts`, `app/components/ui/SubpageIntro.tsx`, `app/components/reference/ReferenceList.tsx`, `app/components/legacy/LegacyPage.tsx`.
**Phase 03 delta (modified):** `app/layout.tsx` (removed `alternates`/`openGraph`/`twitter`; GTM/noscript/bootstrap/font-preloads/viewport untouched), `app/page.tsx` (own `metadata` export), `app/gdpr/page.tsx` + `app/cookies/page.tsx` (metadata from `seo.ts`, added text-only OG + Twitter `summary`; bodies/Waulter IDs unchanged), `app/reference/page.tsx` (full redesign to the shared shell), `app/registrace/page.tsx` + `app/wait-list/page.tsx` + `app/wait-list/thank-you/page.tsx` (copy rewrite via `LegacyPage`, per-route metadata, split), `app/components/LegalPage.tsx` (consume `SubpageIntro`), `app/components/Footer.tsx` (one `Reference` `<li>`), `next.config.ts` (`trailingSlash: false`).
**Phase 03 delta (deleted):** `app/components/References.tsx`, `app/components/WaitList.tsx`, `app/components/WaitListRegistration.tsx`.
**Left untouched deliberately:** `app/components/Button.tsx` and the legacy Tailwind colour block (now unused; a future maintainability task removes them after a fresh whole-repo usage check).

**Normalization deviation from the plan table:** the homepage canonical / `og:url` / sitemap `<loc>` render as `https://coalshift.cz` (bare origin, no trailing slash), not `https://coalshift.cz/`. Next's metadata resolver returns `result.origin` for the root path (`resolveAbsoluteUrlWithPathname`), and `trailingSlash: false` does not re-add it. All three forms are identical, so slash-consistency is preserved; the `/replan` table's `https://coalshift.cz/` was aspirational.

**Provenance sign-off items for the owner (unchanged, still open before publication):** Michal Uhlíř's role "coalfamily" (in-family voice, not an independent customer); the Petr Svoboda quote's "Integrace s naším stávajícím HR systémem proběhla hladce" (HR-system integration claim in customer voice). Both preserved verbatim on `/reference`; neither is presented as verified.

## Codex pre-recheck assessment — 3 September 2026

The implementation record above is Claude’s report, not final acceptance. Codex independently inspected source/diffs, parsed the existing export, compared all three quotes/names/roles to their original source, and passed `git diff --check` plus `npm run typecheck` on pinned Node 24.20.0. Codex did not repeat the build/browser matrix. P03-PRE-01/02 keep the card-fidelity item open; all other evidence and limitations retain their provenance in `quality.md`.

The bare homepage origin is accepted under decision 9. [Google documents root URL equivalence](https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash). The local Next 16.3.4 resolver reproduces the normalization with the current metadata base and `trailingSlash: false`; a control with different configuration changes the result. Therefore the report’s universal “not achievable through config” learning proposal is not adopted. No shared rule changed.

Proceed only with the scoped `/recheck`; no application fixes, commit, push, deployment or Phase 04 are authorized by this assessment.

## Post-recheck corrections P03-C1–C3 — 3 September 2026 (COMPLETED_FOR_REVIEW)

Bounded correction per [the assignment](../phase-03-post-recheck-corrections.md). Branch `redesign`, HEAD unchanged `68fdbcbd2562f73db91a683315d259c4fca4ef04`, uncommitted, no push/deploy/external change. `npm run typecheck` + `npm run pages:build` exit 0; verified on `wrangler pages dev out` (4.128.0) and isolated headless Chrome 152.

- **P03-C1** — `app/components/reference/ReferenceList.tsx`: collapsed quote `line-clamp-4` → `line-clamp-3` (only). `<details>/<summary>` structure, full expanded quote, all quote/name/role strings, `neutral-200/800` avatar, grid, colours and disclosure labels unchanged. 3 collapsed visual lines verified at 320/390/768/1024/1280/1440 in both themes; full quote intact on expand; pointer + keyboard disclosure and visible focus work; no horizontal overflow.
- **P03-C2** — `app/reference/page.tsx`: intro set exactly to `Přečtěte si zkušenosti s plánováním směn v coalshiftu.` Everything else preserved.
- **P03-C3** — `public/_redirects`: two healthcare rules preserved byte-for-byte; six new 301 rules appended exactly. `out/_redirects` byte-identical to the required 8 lines. All six legacy URL forms → **301** to same-origin `/` (redirect wins over the still-generated route assets); one hop, no loop; `/` → 200; healthcare → 301 `/#industries`; public routes + `/sitemap.xml` + `/robots.txt` → 200; sitemap still the four public URLs; no internal link to any legacy family.

Frozen source SHA-256 identical before/after: `app/registrace/page.tsx` `2328da7e…2d51`, `app/wait-list/page.tsx` `27b00163…4ddb`, `app/wait-list/thank-you/page.tsx` `363fa58d…a4c5`, `app/components/legacy/LegacyPage.tsx` `26e86fcc…d2e8`. No change to `seo.ts`/`sitemap.ts`/`robots.ts`/homepage/header/footer/global styles/legal pages/integrations. Production `Location` header + no-`X-Robots-Tag`/loop on the deployed domain remain deployment-only (BLOCKED until an authorized publish). P03-PRE-01 resolved by P03-C1; P03-PRE-02 ratified. Phase 03 stays `in_review`.

## Owner acceptance — 3 September 2026

Jakub explicitly accepted Phase 03 after P03-C1–C3 and Codex's focused review. The authoritative status is `done` in plan.md. The accepted implementation remains in the uncommitted tree after `68fdbcb`; the new Phase 04 owns cleanup and the authorized Git/production release. Historical phase limitations remain factual evidence limits, not new implementation work for these frozen legacy bodies.
