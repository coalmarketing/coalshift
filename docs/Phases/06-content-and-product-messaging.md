# 06 — Product copy, theme preference and mobile header stability

## Objective and status

Revise the live homepage from Martina Adamcová's product feedback and Jakub's
final decisions. The phase replaces the trial/AI positioning with the real Free
tier and verified product capabilities, adds employee access to the practical
browser, makes first-visit theme selection follow the system, and fixes the
intermittent mobile top-of-page header shift.

The sole phase status is in [plan.md](../plan.md). Phase 06 is implemented on
local `master` and `in_review`. Calendly moved to Phase 07.

## Locked decisions

- The header keeps **Přihlásit se** as its only CTA. Do not add **Vyzkoušet** to
  any desktop or mobile header state.
- Keep the light/dark toggle. With no valid stored choice, the initial render
  follows `prefers-color-scheme`; a manual choice then persists and overrides the
  system on later routes and reloads. Do not follow later OS changes during an
  already-open page.
- Keep the hero headline **Směny pod kontrolou. Méně administrativy.** and the
  secondary **Kontaktovat tým** action.
- Remove the 14-day trial from all active homepage copy, CTA helpers and homepage
  metadata. The offer is the Free plan for 0–5 employees.
- Remove AI positioning from owner-authored live homepage copy and homepage
  metadata. Preserve the attributed testimonial on `/reference` verbatim even
  though it mentions artificial intelligence.
- Keep the accepted capabilities overview and product gallery structure. Only
  copy directly affected by the new product facts changes.
- Keep two numerical cards per practical-browser topic. Use the approved counts
  below, never invented percentages or measured-savings claims.
- Retained source for `/registrace`, `/wait-list` and `/wait-list/thank-you`
  remains untouched and unavailable behind the existing 301 redirects.
- No pricing amount, contact identity, route, redirect, analytics, consent,
  Waulter, gallery, cursor or spotlight change belongs to this phase.

## Homepage copy and CTA targets

### Hero and surrounding live copy

- Eyebrow: **Plánování směn v jednom systému**.
- Headline: unchanged.
- Lead: **Plánujte směny, spravujte nepřítomnosti a mějte přehled o svém týmu v
  jedné aplikaci.**
- Primary CTA: **Vyzkoušet bezplatnou variantu** → same-page `#pricing` through
  the existing fragment-scroll behavior.
- Secondary CTA: **Kontaktovat tým** → `#contact`, unchanged.
- In the capabilities overview, keep all six cards and rewrite only the Směny
  text so it describes preparing a schedule, occupancy and rule warnings without
  mentioning AI.
- The contact-section offer CTA uses **Vyzkoušet bezplatnou variantu** and also
  leads to `#pricing`.
- Replace the FAQ's AI/trial answers with factual scheduling/rule-warning and
  Free-plan answers. Keep the remaining useful questions.
- Footer description and homepage metadata must describe shift planning without
  AI or a time-limited trial. Target homepage title:
  **coalshift | Plánování směn a docházky**. Target description:
  **Plánujte směny, spravujte nepřítomnosti a mějte přehled o zaměstnancích.
  Tarif Free je zdarma až pro 5 zaměstnanců.**

### Pricing actions

- Keep the five plans, employee ranges, monthly prices, VAT note and visual
  emphasis unchanged.
- Free keeps **Začít zdarma** and its current registration destination.
- Paid plans use the neutral label **Začít** with their current registration
  destination.
- Remove `PAID_TRIAL_HELPER` and the reserved empty helper row when it no longer
  serves layout. Do not replace it with an unconfirmed payment or cancellation
  claim.

## Practical browser content

Section heading:

- Eyebrow: **V praxi**.
- Title: **Správa týmu a směn krok za krokem**.
- Intro: **Projděte si správu zaměstnanců, plánování směn, nepřítomnosti,
  exporty a zaměstnanecké přístupy.**

Retain the accepted faux-browser shell, always-vertical five-tab navigation,
active-panel natural height, keyboard model and two-card metric rail. Extend a
feature item from a one-line label to a short title and description where needed
for the approved content. The five tabs, in this order, are:

### 1. Pozice a zaměstnanci — `/pozice-a-zamestnanci`

- Heading: **Zaměstnanci a pozice přehledně na jednom místě**.
- Lead: **Vytvoříte pracovní pozice a přidáte zaměstnance s jejich úvazky,
  typem smlouvy a dostupností. Coalshift tak získá podklady pro plánování směn.**
- Features:
  - **Pracovní pozice** — Barevně rozlišené pozice zpřehlední plánování a
    přiřazování směn.
  - **Úvazky a dostupnost** — U každého zaměstnance upravíte smlouvu, fond hodin,
    dovolenou i dostupnost podle dnů a hodin.
  - **Rychlé přidání týmu** — Zaměstnance přidáte jednotlivě, CSV importem nebo
    e-mailovou pozvánkou.
- Metrics: **3 / Typy smluv / HPP, DPP a DPČ**; **3 / Způsoby přidání /
  Jednotlivě, CSV importem nebo e-mailovou pozvánkou**.

### 2. Směny — `/smeny`

- Heading: **Naplánujte směny rychle a s kontrolou pravidel**.
- Lead: **Nastavíte provoz a způsob plánování. Coalshift vytvoří rozpis, navrhne
  obsazení a upozorní na možné kolize s dostupností, nepřítomností a odpočinkem.**
- Features:
  - **Vytvoření a obsazení směn** — Zvolíte režim plánování, vygenerujete směny
    a funkcí Přiřadit vše navrhnete obsazení podle dostupnosti.
  - **Přehled obsazení** — Kalendář odliší obsazené směny od těch, kterým ještě
    někdo chybí.
  - **Kontrola pracovní doby** — Aplikace upozorní na kolize s nepřítomností,
    odpočinkem a nastaveným rozsahem práce; copy nesmí slibovat úplnou právní
    shodu.
- Metrics: **3 / Režimy plánování / Týdenní rotace, krátký a dlouhý týden nebo
  freestyle**; **11 h / Kontrola odpočinku / Upozornění na standardní minimální
  denní odpočinek**.

### 3. Nepřítomnosti — `/nepritomnosti`

- Heading: **Dovolená, nemoc i volno na jednom místě**.
- Lead: **Zaměstnanec požádá o nepřítomnost, správce ji schválí a plán směn s ní
  automaticky počítá. Při ruční kolizi vás coalshift upozorní.**
- Features:
  - **Samoobslužné žádosti** — Zaměstnanci posílají žádosti o dovolenou, nemoc,
    sick day nebo volno ze svého přístupu.
  - **Kontrola kolizí** — Schválená nepřítomnost se promítne do plánování a
    ruční konflikt vyvolá upozornění.
  - **Fond podle potřeby** — Roční fond nastavíte společně nebo individuálně a
    evidovat lze i část dne.
- Metrics: **5 / Druhy nepřítomnosti / Dovolená, nemoc, sick day, volno a
  pracovní volno**; **2 / Nastavení fondu / Globálně pro tým nebo individuálně**.

### 4. Exporty a statistiky — `/exporty-a-statistiky`

- Heading: **Data a reporty bez ručního přepisování**.
- Lead: **Rozpisy a odpracované hodiny vyexportujete do běžných formátů,
  rozešlete zaměstnancům a využijete pro přehled o vytížení týmu.**
- Features:
  - **Připravené exporty** — Data získáte podle pozice, zaměstnance nebo měsíce.
  - **Rozpis e-mailem** — Hotový rozpis odešlete zaměstnancům přímo z aplikace.
  - **Vytížení týmu** — Statistiky propojí docházku, odpracované hodiny a fond
    pracovní doby.
- Metrics: **3 / Formáty exportu / Excel, CSV a XML**; **3 / Pohledy na data /
  Podle pozice, zaměstnance a měsíce**.

### 5. Zaměstnanecké přístupy — `/zamestnanecke-pristupy`

- Heading: **Každý vidí jen to, co potřebuje**.
- Lead: **Správce pracuje s celým provozem. Zaměstnanec vidí své směny a
  nepřítomnosti, může požádat o volno a domluvit se na výměně směny.**
- Features:
  - **Přehled zaměstnance** — Vlastní směny, nepřítomnosti a kolegové na stejné
    pozici jsou dostupní v jednom účtu.
  - **Ochrana citlivých údajů** — Zaměstnanec nevidí mzdu ani typ smlouvy ostatních.
  - **Kontrola správce** — Správce nastavuje tým, schvaluje žádosti a řídí plán.
- Metrics: **2 / Úrovně přístupu / Správce a zaměstnanec**; **3 / Osobní
  přehledy / Směny, nepřítomnosti a kolegové na stejné pozici**.

Every active tab uses **Vyzkoušet bezplatnou variantu** → `#pricing`. Numerical
cards are approved product counts/values, use `status: "confirmed"`, and do not
show **Ilustrační údaj**.

## Theme behavior

Update the render-blocking bootstrap rather than applying a post-hydration
correction:

1. Read a valid `light`/`dark` value from local storage when available.
2. With no valid choice, use `matchMedia("(prefers-color-scheme: dark)")`.
3. If storage or `matchMedia` is unavailable, render a usable light fallback.
4. Apply the class, `color-scheme` and `data-theme` before first paint.
5. A manual toggle writes the explicit choice and remains stable across routes
   and reloads, even when it differs from the system.

Verify fresh-storage system-light and system-dark cases, stored overrides in
both directions, blocked storage, toggle persistence and absence of hydration
errors or an opposite-theme flash.

## Intermittent mobile header shift

The owner reproduced an intermittent top-load/reload error in both Chrome and
Safari on mobile: the page can start a few pixels displaced with the coalfamily
strip already hidden and the nav in its pinned state. Fix the cause without a
global `scrollTo(0, 0)`, disabling native history restoration, or breaking
fragments.

Start by comparing the initial CSS geometry with the values published after
mount. The current fallback uses a 5rem nav height while the mobile nav is fixed
at 4.5rem; verify whether that mismatch and the post-mount spacer measurement
cause the mobile drift. Prefer identical first-render and measured values, or a
CSS-owned fixed layout metric, over another timing workaround. Preserve the
100px sticky threshold and accepted floating/pinned design.

Required behavior:

- a fresh `/` arrival at the top and a reload initiated at the top show the
  coalfamily strip and floating nav with `scrollY` remaining 0;
- repeated top reloads do not accumulate vertical displacement;
- an intentional reload below the sticky threshold may preserve that position
  and correctly show the pinned nav;
- `/#pricing`, in-page navigation and browser Back/Forward restoration retain
  their existing destinations and header clearance;
- no focus is moved on page mount.

Run repeatable local narrow-viewport checks in both browser engines if available.
Because the bug is intermittent on physical iOS Chrome and Safari, report those
physical checks as owner-assisted until Jakub confirms them; do not claim a
device PASS from desktop emulation.

## Implementation boundaries

Expected source areas are the header/theme components, homepage copy components,
pricing data, homepage SEO source and the minimal shared types/icons needed by
the practical browser. Reuse the existing Section, CTA, tab, spotlight and
fragment-scroll primitives. Do not redesign the header, gallery, reference page
or legal pages.

After source work, update only current factual documentation:
`content-and-seo.md`, `design-system.md`, `quality.md`, `plan.md`, and this phase
file where implementation evidence changes the plan. Do not create correction
reports, prompt archives or new checklist files.

## Implementation sequence

1. Record the `master` baseline and pre-existing planning-doc changes; inspect
   the current rendered homepage before editing.
2. Correct the theme bootstrap and mobile header geometry first, then verify that
   navigation, fragments and native scroll restoration still work.
3. Apply the approved live copy, CTA and pricing changes from shared data where a
   current single source exists.
4. Replace the practical-browser data/model and adjust only the panel layout
   needed for titled feature descriptions and the new numerical values.
5. Update homepage metadata and current factual documentation, then run the
   focused responsive, theme, keyboard and build checks.

## Acceptance criteria

- **AC-01 — Offer and CTA:** Active homepage copy contains no 14-day-trial
  promise. The three pre-pricing offer CTAs say **Vyzkoušet bezplatnou variantu**
  and land at `#pricing`; header/login and pricing registration destinations are
  correct.
- **AC-02 — Product positioning:** Owner-authored active homepage copy and
  homepage metadata contain no AI positioning. The headline, capabilities
  structure, gallery and attributed `/reference` quote remain intact.
- **AC-03 — Practical browser:** All five approved topics render in order with
  their heading, lead, three feature descriptions and exactly two approved
  numerical cards. The existing vertical-tab keyboard behavior and compact
  active-panel sizing still work.
- **AC-04 — Theme:** Empty storage follows light/dark system preference before
  first paint; a stored manual choice overrides it and persists without a flash
  or hydration error.
- **AC-05 — Mobile header:** Fresh and repeated top loads remain at the top with
  the full floating header. Intentional scrolled reloads, direct fragments and
  Back/Forward remain correct. Owner-assisted Safari and Chrome checks stay
  explicit until run.
- **AC-06 — Pricing/SEO:** Five prices and employee ranges are unchanged; the
  trial helper is absent; homepage title/description match this plan while route,
  canonical, sitemap and redirect behavior remain unchanged.
- **AC-07 — Regression and handoff:** Q-002, Q-004, Q-007–Q-012, Q-014 and Q-018
  are recorded truthfully. `npm run typecheck`, `npm run pages:build` and
  `git diff --check` pass. The report has at most eight bullets and no commit,
  push or deployment is performed.

Test the five tabs, content, metrics, keyboard model and pricing anchors at 320,
390, 768 and 1440 CSS px in both themes. Search active rendered homepage copy
and homepage metadata for removed trial/AI claims, excluding the verbatim
reference quote and unreachable frozen legacy source.

## Implementation evidence — 10 September 2026 (in_review)

Implemented on local `master` (HEAD `86c00d4`, no commit). Changed source:
`Hero.tsx`, `Capabilities.tsx`, `FunctionsBrowser.tsx`, `Faq.tsx`, `Contact.tsx`,
`Pricing.tsx`, `lib/pricing.ts`, `lib/seo.ts`, `layout.tsx`, `Footer.tsx`,
`icons/LineIcon.tsx` (removed six now-orphaned icons: `ai`, `palette`, `sick`,
`excel`, `file`, `hours` — zero consumers in `app/`), `theme/themeScript.ts`,
`Header.tsx`, `globals.css`.

Post-recheck corrections: lowercased two sentence-initial `Coalshift` → `coalshift`
in the practical-browser leads; restored the practical-browser panel CTA to
`variant="primary"` (previously accepted treatment, now identical across all five
panels); removed the five extra orphaned `LineIcon` entries; recorded Q-010
evidence (see AC-07).

- **AC-01 PASS (local):** hero primary, five practical-browser panels and the
  contact offer box are `FragmentCta` → `#pricing`; header keeps only
  `Přihlásit se`; pricing cards keep `REGISTER_URL`. No `14 dní` in active copy.
- **AC-02 PASS (local):** `out/index.html` has 0 `pomocí AI` / `AI plánov` hits;
  headline, capabilities structure, gallery and the `/reference` „umělé
  inteligenci" quote intact.
- **AC-03 PASS (local 1728, light+dark); narrow widths owner-assisted:** five
  topics in order, heading + lead + three titled feature cards + two numerical
  cards each; vertical roving-focus tabs, `hidden`-gated single panel, spotlight
  and metric rail unchanged; no `Ilustrační údaj`. Visual correction: the
  `.glow-border--sm` wrapper is `flex` and its inner surface `h-full w-full`, so
  the white/dark card fills the grid-stretched height — every card in a row is
  equally tall with a uniform 2px rim, no exposed gradient strip (verified across
  all five panels, both themes).
- **AC-04 PASS (local):** `themeScript.ts` = stored → `prefers-color-scheme` →
  light fallback, pre-paint; stored choice overrides system and persists; no
  flash or hydration error.
- **AC-05 PASS desktop (local); BLOCKED physical iOS (owner-assisted):** CSS-owned
  `:root` header-geometry defaults equal the measured `getBoundingClientRect()`
  values, so the document-flow spacer keeps one height across load; repeated top
  reloads stay `scrollY 0`; `/#pricing` and the 100px threshold unchanged; no
  `scrollTo(0,0)` / `scrollRestoration` change.
- **AC-06 PASS (local):** prices/ranges unchanged; `PAID_TRIAL_HELPER` + reserved
  helper row removed; Free `Začít zdarma`, paid `Začít`; homepage
  title/description updated; canonical, sitemap, redirects unchanged. Visual
  correction: the CTA wrapper is `mt-auto … pt-6` inside the `h-full flex-col`
  card, so all five CTAs align on one baseline in the desktop row (verified at
  1728, both themes); mobile stacked cards still size naturally.
- **AC-07 PASS (local):** see the Phase 06 implementation delta in
  [quality.md](../quality.md); `typecheck`, `pages:build`, `git diff --check`
  pass; no commit/push/deploy. **Q-010 PASS (local, both themes):** practical-
  browser tablist keeps `aria-orientation="vertical"` + label, roving tabindex,
  ArrowUp/ArrowDown/Home/End focus movement and Enter/Space activation; one
  `hidden`-gated visible panel with hidden panels' CTAs unfocusable; tab⇄panel
  `aria-controls`/`aria-labelledby`/`aria-selected` wiring intact; the five panel
  CTAs share `aria-label="Vyzkoušet bezplatnou variantu"` as `cta--primary`;
  feature-description (7.1–7.8:1), feature-title, metric-badge and metric-note
  contrast all ≥ 4.5:1 in both themes; no focus moved on mount, no focus-order
  regression. NOT_RUN: physical-device screen-reader pass (carry-forward).
