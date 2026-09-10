# Coalshift — Content and SEO

Operating rules, current facts, limitations and source-file pointers for the
Czech website copy and its SEO surfaces. **Rendered application data and
components are the canonical source for exact wording** — this file is not a
duplicate of every string. Material factual changes (offer, trial terms,
testimonials, contacts) require the owner; editorial refinements may improve
sentence flow without changing the offer.

## Voice and spelling

- Brand names are **always lowercase** — `coalshift`, `coalsoft`, `coalios`,
  `coaledu`, `coalmarketing`, `coalfamily` — including sentence starts, headings,
  metadata, `alt` text and accessible labels. Preserve people's proper names and
  supplied brand artwork.
- Address readers with Czech **vykání**, consistently. No mixing of "ty"/"vy" or
  impersonal slogans. Attributed testimonials are quoted speech, not interface
  copy.
- No invented product capabilities, payment terms, trial conditions,
  testimonials, ratings, measured outcomes, integration claims (WhatsApp / SMS /
  ERP / HELIOS / SAP / Alveno) or booking details. No blanket legal-compliance
  guarantee.

## Brand-word highlight (`BrandWord`)

`app/components/ui/BrandWord.tsx` renders one accessible text node with a
translucent coalsoft-blue highlighter behind the lower ~70% of the lettering (no
box, pill, border or size change). It is applied to **only these four
placements** (the brand token to highlight is shown emphasised; surrounding Czech
copy is quoted as rendered — this list records placement, not copy):

| Placement | Rendered text |
| --- | --- |
| Capabilities heading | „Co všechno **coalshift** zvládne" |
| Industries heading | „Pro koho je **coalshift**" |
| Contact heading | „Vyzkoušejte **coalshift** ve svém týmu" |
| Contact intro | „Potřebujete poradit s výběrem tarifu nebo s používáním **coalshiftu**? Ozvěte se nám." |

The Phase 06 hero lead no longer contains a `coalshift` token, so the former
hero-lead placement is gone.

Never use `BrandWord` for logos, nav/CTA labels, metadata, legal text or
testimonials, and never run a global text-node replacement.

## Offer and CTA wording

- The active offer is the **Free** plan for **0–5 zaměstnanců**. No 14-day trial
  appears in active homepage copy, CTA helpers or homepage metadata. Do not add
  "bez karty", automatic renewal, cancellation terms, a trial-plan name or a
  post-trial charge without confirmed product terms.
- The three pre-pricing offer CTAs — hero primary, every practical-browser panel,
  and the contact-section offer box — read **Vyzkoušet bezplatnou variantu** and
  scroll to `#pricing` through the existing guarded fragment behavior
  (`FragmentCta` / `smoothScroll`). They do not link to registration directly.
- Hero secondary CTA: **Kontaktovat tým** → `#contact`.
- Pricing cards keep the existing registration destination: Free button
  **Začít zdarma**, paid-tier buttons **Začít** (no trial helper, no reserved
  helper row).
- Header keeps **Přihlásit se** as its only CTA (`LOGIN_URL`). No trial or
  registration CTA in any header variant.
- Consultation actions use an honest contact action (**Kontaktovat tým** → the
  contact section) until Phase 07. The Calendly booking action
  (**Rezervovat konzultaci** + real event URL) arrives in Phase 07 only. Never
  ship a fake URL or a disabled control presented as working booking.
- Retained frozen legacy source (`/registrace`, `/wait-list`,
  `/wait-list/thank-you`) still contains 14-day-trial wording; those URLs 301 to
  `/` and are excluded from the active-copy trial check.

Source: `app/lib/links.ts` (`REGISTER_URL` = `https://app.coalshift.cz/register`,
`LOGIN_URL` = `https://app.coalshift.cz/login`, label **Přihlásit se**;
`SECTION` fragment ids), `app/lib/pricing.ts`.

## Commercial facts

Pricing — monthly only, excluding VAT, plans differ only by employee count (no
per-tier feature list, no per-employee surcharge, no billing-period switch, no
annual amount/inquiry). Source: `app/lib/pricing.ts` (`PRICING_PLANS`).

| Tarif | Počet zaměstnanců | Cena měsíčně |
| --- | --- | --- |
| Free | 0–5 | Zdarma |
| Start | 6–20 | 1 130 Kč |
| Lite | 21–50 | 2 600 Kč (featured) |
| Advanced | 51–80 | 4 400 Kč |
| Pro | 81 a více | 6 000 Kč |

Required note: **Všechny ceny jsou uvedeny bez DPH.** (`VAT_NOTE`). Paid amounts
labelled **za měsíc, bez DPH**.

## Contacts

Source: `app/lib/contacts.ts` (`CONTACTS`). Obsolete Miroslav Adamec details must
not appear anywhere in visible copy, labels or metadata.

| | Person 1 | Person 2 |
| --- | --- | --- |
| Name | Martina Adamcová | Šárka Melišová |
| Role | Obchod a produkt | Podpora |
| Phone | +420 728 918 562 (`tel:+420728918562`) | +420 702 244 296 (`tel:+420702244296`) |
| Email | martina.adamcova@coalsoft.cz | sarka.melisova@coalsoft.cz |
| Portrait | `public/img/martina-adamcova.png` (1080×1080) | `public/img/sarka-melisova.png` (1080×1080) |

Footer legal block: `© 2026 coalsoft s.r.o. Všechna práva vyhrazena.` +
`Developed with 💜 by coalmarketing.cz` (link `https://coalmarketing.cz/`, keep
the heart). coalsoft s.r.o. company name, both address lines, IČ and DIČ sit
under the coalshift logo/brand copy in the footer brand column.

## Homepage practical browser (`FunctionsBrowser.tsx`)

Section heading — eyebrow **V praxi**, title **Správa týmu a směn krok za
krokem**, intro **Projděte si správu zaměstnanců, plánování směn, nepřítomnosti,
exporty a zaměstnanecké přístupy.**

Five vertical tabs, in order, each with a heading, lead, three titled feature
descriptions and exactly two numerical cards. Every value is an approved product
count/composition from Phase 06 (`docs/Phases/06-content-and-product-messaging.md`)
— **not** a measured performance result. No card shows **Ilustrační údaj**; there
is no `illustrative` status and no percentage or savings claim anywhere in the
section. The panel CTA on every tab is **Vyzkoušet bezplatnou variantu** →
`#pricing`.

| Tab | Metric id | Value | Badge | Note |
| --- | --- | --- | --- | --- |
| Pozice a zaměstnanci | positions-contracts | 3 | Typy smluv | HPP, DPP a DPČ |
| Pozice a zaměstnanci | positions-adding | 3 | Způsoby přidání | Jednotlivě, CSV importem nebo e-mailovou pozvánkou |
| Směny | shifts-modes | 3 | Režimy plánování | Týdenní rotace, krátký a dlouhý týden nebo freestyle |
| Směny | shifts-rest | 11 h | Kontrola odpočinku | Upozornění na standardní minimální denní odpočinek |
| Nepřítomnosti | absence-types | 5 | Druhy nepřítomnosti | Dovolená, nemoc, sick day, volno a pracovní volno |
| Nepřítomnosti | absence-fund | 2 | Nastavení fondu | Globálně pro tým nebo individuálně |
| Exporty a statistiky | exports-formats | 3 | Formáty exportu | Excel, CSV a XML |
| Exporty a statistiky | exports-views | 3 | Pohledy na data | Podle pozice, zaměstnance a měsíce |
| Zaměstnanecké přístupy | access-levels | 2 | Úrovně přístupu | Správce a zaměstnanec |
| Zaměstnanecké přístupy | access-overviews | 3 | Osobní přehledy | Směny, nepřítomnosti a kolegové na stejné pozici |

Copy for headings, leads and feature descriptions is verbatim from the Phase 06
plan. The "copy nesmí slibovat úplnou právní shodu" line in that plan is an
authoring constraint, not rendered text.

Mock-browser address paths (plain display text, no hash, not navigable):
`/pozice-a-zamestnanci`, `/smeny`, `/nepritomnosti`, `/exporty-a-statistiky`,
`/zamestnanecke-pristupy`. The real page anchor stays `benefits`.

## Product gallery (`app/components/home/ProductGallery.tsx`)

Homepage section between `FunctionsBrowser` and `Pricing`. Copy source:
`docs/Phases/05-product-gallery.md`.

- Eyebrow: **Ukázka aplikace**
- Heading: **Podívejte se, jak coalshift vypadá v praxi**
- Intro: **Plánujte směny, kontrolujte obsazení a spravujte pozice i zaměstnance
  v jednom přehledném prostředí. Prohlédněte si skutečné obrazovky aplikace, se
  kterými budete pracovat každý den.**
- CTA: **Prohlédnout cenové balíčky** → `#pricing` (guarded smooth-scroll).

Three real application screenshots (all 2876×1376, TEST tenant, no real personal
data), in this order — `alt` text is the accessible description:

| Order | File | `alt` |
| --- | --- | --- |
| 1 | `public/img/product-gallery/coalshift-smeny.png` | Týdenní plán směn v aplikaci coalshift s přehledem pozic a obsazení. |
| 2 | `public/img/product-gallery/coalshift-pozice.png` | Seznam pracovních pozic v aplikaci coalshift. |
| 3 | `public/img/product-gallery/coalshift-zamestnanci.png` | Seznam zaměstnanců a pracovních údajů v aplikaci coalshift. |

On narrow screens the order is: eyebrow/heading/text/CTA, then the screenshot
stack, then the previous/next controls + counter. Activating the active
screenshot itself opens the fullscreen dialog — its accessible name is
**„Zobrazit obrázek {název} na celou obrazovku"** (e.g. „Zobrazit obrázek Směny
na celou obrazovku"); there is no separate fullscreen button. Other control
accessible names: **Předchozí obrázek**, **Další obrázek**, **Zavřít**. The
`aria-live` announcement is **„{název} — obrázek {n} z 3"**. All three
screenshots sit on screen at once as a moving stack — one straight in front, the
other two as tilted cards above/left and below/right that glide between
positions on navigation; the two non-active cards carry **empty `alt`** and
`aria-hidden` (announced only via the front card and the live region).
Screenshots are shown uncropped; do not retouch, crop or invent product screens. This is not an
SEO surface — no metadata or structured data changes.

## Testimonials (`app/components/reference/ReferenceList.tsx`)

Three attributed testimonials, quotes / names / roles preserved **verbatim**:
Michal Uhlíř (coalfamily), Jana Novotná (HR Manager), Petr Svoboda (Provozní
ředitel). No star rating, no per-card logo, no review-rating structured data.

**Provenance was not independently verified.** Michal Uhlíř's "coalfamily" role
is an in-family voice; Petr Svoboda's quote contains "Integrace s naším
stávajícím HR systémem proběhla hladce" and "Návratnost investice byla téměř
okamžitá". Jakub's Phase 03 acceptance authorized publication of this reviewed
content; it did **not** establish independent provenance. Do not describe these
as newly verified evidence or promote their claims into general product promises.

## §79 break/rest wording

The supplied PDF connected breaks and rest to §79 of the Labour Code. §79 is
weekly working time; breaks and daily rest are separate (§§88–90). Public copy
therefore says **„Plánování směn s kontrolou přestávek a odpočinku"** with no
inaccurate section reference and no universal compliance guarantee. This is a
marketing-wording correction, not certification of the product's rule engine.
Reference: <https://ppropo.mpsv.cz/zakon_262_2006>.

## Metadata

Source: `app/lib/seo.ts` (`ROUTES`). Homepage title renders exactly as below with
no duplicated template suffix (`title.absolute`, no `title.template`). Titles are
intentionally non-uniform. Descriptions are editorial; none promises numerical
savings.

| Route | Title | Description |
| --- | --- | --- |
| `/` | `coalshift \| Plánování směn a docházky` | Plánujte směny, spravujte nepřítomnosti a mějte přehled o zaměstnancích. Tarif Free je zdarma až pro 5 zaměstnanců. |
| `/reference` | `Reference \| coalshift` | Přečtěte si zkušenosti s plánováním směn v coalshiftu. |
| `/gdpr` | `Zásady ochrany osobních údajů (GDPR) — coalshift` | Informace o zpracování osobních údajů na webu coalshift. |
| `/cookies` | `Podmínky cookies — coalshift` | Informace o používání souborů cookies na webu coalshift. |
| `/registrace` | `Vyzkoušejte coalshift na 14 dní zdarma` | Přejděte k registraci do aplikace coalshift a vyzkoušejte si plánování směn na 14 dní zdarma. |
| `/wait-list` | `Začněte s coalshiftem` | Zjednodušte si plánování směn. Přejděte do aplikace a vyzkoušejte coalshift na 14 dní zdarma. |
| `/wait-list/thank-you` | `Děkujeme za zájem \| coalshift` | Pokračujte do aplikace coalshift nebo se vraťte na úvodní stránku. |

The three legacy rows describe retained source only; public requests are
intercepted by 301 (below), so that body metadata is defense-in-depth, not the
indexing mechanism.

Indexable routes (`/`, `/reference`, `/gdpr`, `/cookies`) emit a production
self-canonical + text-only Open Graph (`type=website`, `locale=cs_CZ`,
`siteName=coalshift`, `url`, `title`, `description`) + Twitter `card=summary`.
**No social-preview image** is created or referenced. Legacy routes emit
`<meta name="robots" content="noindex, follow">`, no canonical, no `og:*`.
No JSON-LD anywhere. Production origin `https://coalshift.cz`. The homepage
canonical / `og:url` / sitemap `<loc>` render as the bare origin (see
[architecture.md](architecture.md)).

`/sitemap.xml` (`app/sitemap.ts`) contains exactly:
`https://coalshift.cz`, `https://coalshift.cz/reference`,
`https://coalshift.cz/gdpr`, `https://coalshift.cz/cookies` — no `lastmod` /
`changefreq` / `priority`.

`/robots.txt` (`app/robots.ts`): `User-Agent: *` / `Allow: /` /
`Sitemap: https://coalshift.cz/sitemap.xml`. **No `Disallow`** — the redirect,
not a crawl block, is what makes the legacy families non-indexable, and crawlers
stay able to fetch the 301.

## Route and redirect matrix — exact `Location` values

Redirects live in `public/_redirects` (Cloudflare parses them at the edge; a
static redirect wins over a generated `.html` asset). All eight rules, verbatim:

```
/zdravotnici /#industries 301
/zdravotnici/ /#industries 301
/registrace / 301
/registrace/ / 301
/wait-list / 301
/wait-list/ / 301
/wait-list/thank-you / 301
/wait-list/thank-you/ / 301
```

| Request | Response | `Location` |
| --- | --- | --- |
| `/`, `/reference`, `/gdpr`, `/cookies` | 200 | — |
| `/zdravotnici`, `/zdravotnici/` | 301 | `/#industries` |
| `/registrace`, `/registrace/` | 301 | `/` |
| `/wait-list`, `/wait-list/` | 301 | `/` |
| `/wait-list/thank-you`, `/wait-list/thank-you/` | 301 | `/` |

Follow-through for every legacy rule = one hop, final `/`, HTTP 200, no loop.
Healthcare stays a plain audience label on the homepage (`id="industries"` is the
stable fragment target). No active internal `href` points to any legacy family or
to `/zdravotnici`.

## Legal pages

`/gdpr` and `/cookies` render the shared `LegalPage` shell (`SubpageIntro`: real
`<h1>` = footer label, `Domů → title` breadcrumb, blue radial wash) with exactly
one initially-empty container each — `<div id="waulterGdpr">` / `<div
id="waulterCookies">` — inside a `.legal-content` wrapper that themes injected
headings/lists/tables/links. `suppressHydrationWarning` keeps React from
rewriting injected HTML. Do not author substitute legal paragraphs or copy
another company's policies. Real provider population is a production-domain check
(see Q-016).

## Content limitations (carry forward)

- Practical-browser numerical cards are approved product counts/compositions, not
  independently measured performance results (Phase 06 removed the six labelled
  illustrative figures).
- Testimonial provenance is unverified (Michal Uhlíř "coalfamily"; Petr Svoboda
  HR-integration + ROI sentences; the `/reference` quote mentions artificial
  intelligence and is preserved verbatim).
- Real Waulter policy population in `#waulterGdpr` / `#waulterCookies` is
  unverified off the production domain.

Acceptance and publication authorization do not convert any of these into
factual verification.
