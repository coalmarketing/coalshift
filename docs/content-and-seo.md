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
box, pill, border or size change). It is applied to **only these five
placements** (the brand token to highlight is shown emphasised; surrounding Czech
copy is quoted as rendered — this list records placement, not copy):

| Placement | Rendered text |
| --- | --- |
| Hero lead | „…v jedné aplikaci. **coalshift** vám s rozpisem pomůže pomocí AI." |
| Capabilities heading | „Co všechno **coalshift** zvládne" |
| Industries heading | „Pro koho je **coalshift**" |
| Contact heading | „Vyzkoušejte **coalshift** ve svém týmu" |
| Contact intro | „Potřebujete poradit s výběrem tarifu nebo s používáním **coalshiftu**? Ozvěte se nám." |

Never use `BrandWord` for logos, nav/CTA labels, metadata, legal text or
testimonials, and never run a global text-node replacement.

## Trial and CTA wording

- Trial is **14 dní**, everywhere (copy, metadata, accessible labels).
- Default CTA: **Vyzkoušet na 14 dní zdarma** → registration.
- Pricing exception: paid-tier button label **Vyzkoušet**, with **Prvních 14 dní
  zdarma.** rendered *outside* the button (`PAID_TRIAL_HELPER`). Free-tier button
  **Začít zdarma**, with no trial helper.
- The Free plan and the time-limited trial are distinct. Do not add "bez karty",
  automatic renewal, cancellation terms, a trial-plan name or a post-trial charge
  without confirmed product terms.
- Consultation actions use an honest contact action (**Kontaktovat tým** → the
  contact section) until Phase 06. The Calendly booking action
  (**Rezervovat konzultaci** + real event URL) arrives in Phase 06 only. Never
  ship a fake URL or a disabled control presented as working booking.

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

## Homepage numerical cards (`FunctionsBrowser.tsx`)

Exactly two cards per topic. Values, units, badges and status live in one data
model in `app/components/home/FunctionsBrowser.tsx`. `illustrative` cards **must**
display **Ilustrační údaj** (subtle but plainly readable, kept with the number on
mobile and in screenshots). `confirmed` = an approved count/composition from
canonical product copy, **not** an independently measured performance result.

| Topic / metric id | Value | Badge | Status |
| --- | --- | --- | --- |
| Směny a AI / planning-time | 50 % | Úspora času | illustrative |
| Směny a AI / planning-month | 20 h | Měsíčně zpět | illustrative |
| Lidé a pozice / team-place | 1 | Společné místo | confirmed |
| Lidé a pozice / team-search | 40 % | Čas na hledání | illustrative |
| Nepřítomnosti / absence-place | 1 | Přehled volna | confirmed |
| Nepřítomnosti / absence-admin | 30 % | Méně administrativy | illustrative |
| Exporty / export-formats | 3 | Formáty exportu | confirmed |
| Exporty / export-time | 60 % | Úspora času | illustrative |
| Statistiky / reporting-areas | 3 | Oblasti přehledu | confirmed |
| Statistiky / reporting-time | 50 % | Čas na přehledy | illustrative |

**Six illustrative figures** (`planning-time` 50 %, `planning-month` 20 h,
`team-search` 40 %, `absence-admin` 30 %, `export-time` 60 %, `reporting-time`
50 %) are **not measured**. Jakub accepted the reviewed website for release with
these labelled examples in place; that permits keeping the labelled examples, not
describing them as measured results. Confirmed replacement values (with source,
compared workflow, sample and period) remain an owner / product-team content
follow-up. Do not put illustrative figures in metadata, JSON-LD, testimonials or
other sections.

Mock-browser address paths (plain display text, no hash, not navigable):
`/smeny-a-ai`, `/lide-a-pozice`, `/nepritomnosti`, `/exporty`, `/statistiky`.
The real page anchor stays `benefits`.

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
| `/` | `coalshift \| AI plánovač směn a docházky` | Plánujte směny s pomocí AI, spravujte nepřítomnosti a mějte přehled o svém týmu. Vyzkoušejte coalshift na 14 dní zdarma. |
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

- The six `Ilustrační údaj` figures are illustrative, not measured.
- Testimonial provenance is unverified (Michal Uhlíř "coalfamily"; Petr Svoboda
  HR-integration + ROI sentences).
- Real Waulter policy population in `#waulterGdpr` / `#waulterCookies` is
  unverified off the production domain.

Acceptance and publication authorization do not convert any of these into
factual verification.
