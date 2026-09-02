# Coalshift — Design reference and adaptation

## Authority and access

Read-only reference: `/Users/jakubtesarik/Programování/coalios`.

Observed reference revision: `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`, branch `main`, during discovery on 2 September 2026. Recheck its current state before reuse and record any intentional change in the comparison baseline. Preserve its unrelated `.DS_Store`. The owner explicitly allows Claude Code access to this repository; do not use the separate `coalios-manual` repository.

Coalios supplies the family design language. Coalshift remains a Next.js/React website and a COALsoft product with a blue primary accent. Do not copy the reference's Eleventy/Nunjucks build, Decap CMS, business copy, newsletter workflow or client claims.

Discovery inspected the reference source, not a live browser rendering. During phase 02, use an available reference render/local preview for visual comparison. If a browser or render is unavailable, report that comparison as unperformed rather than claiming visual parity.

## Source map

Paths below are relative to the Coalios reference root.

| Source | What to learn/reuse | Coalshift adaptation |
| --- | --- | --- |
| `tailwind.config.js` | Brand palette, Inter/Lekton typography, radius and fluid spacing | Map primary accent scale to blue; preserve family logo colors |
| `src/assets/css/input.css` | Pill CTA shape, arrow treatment, focus/hover, surfaces and fonts | Accessible React primitives; ensure blue color-pair contrast |
| `src/_includes/sections/header.njk` | Upper family bar, rounded main navigation and scroll behavior | Responsive shared header with working registration and theme control |
| `src/_data/topBar.json` and `src/assets/svgs/coalfamily/` | Family destinations and brand icons | Accessible labeled links; adapt active brand/product context |
| `src/_includes/pages/domu.njk` | Hero scale, layout, badge and dual CTA rhythm | Coalshift title/copy, registration and approved secondary action |
| `src/_includes/sections/benefits.njk` | Rounded card grid and restrained border/spotlight treatment | Benefits and capability cards with Coalshift content |
| `src/_includes/sections/products.njk` | Structured cards and content hierarchy | Reuse relevant layout patterns, not reference products |
| `src/_includes/sections/faq.njk` | Rounded accordion presentation | Keyboard-accessible disclosure with correct state |
| `src/_includes/sections/cta.njk` | Closing CTA layout and subtle decoration | Blue accents, real registration/contact destinations |
| `src/_includes/sections/footer.njk` | Rounded footer panel, spacing and columns | Existing Coalshift navigation scope and exact approved copyright |
| `src/_includes/layouts/base.njk` | Shared page composition and theme setup | Next.js layout/server-client boundary appropriate to static export |
| `src/assets/js/dark.js` | Dark default, manual switch and persistence | Accessible named control, initial render without theme flash, safe storage handling |
| `src/assets/js/react-bits/prism.js`, `magic-bento.js` | Optional visual effects and interaction feel | Selectively adapt blue effects; reduced-motion and touch fallback; no automatic dependency import |
| `src/assets/fonts/` | Local Inter and Lekton WOFF2 files with Latin Extended | Copy needed weights and applicable license material into Coalshift; Czech glyph coverage |

## Visual contract

| Element | Direction |
| --- | --- |
| Primary accent | COALsoft blue `#00B5E2`; derive purposeful hover/focus/tint variants and test each contrast pair |
| Family identity | Coalios orange `#FF9E1B`, coaledu yellow `#F2C700`, coalmarketing purple `#C181C6`, coalfamily green `#26C672` remain brand-icon identities, not Coalshift's main theme |
| Surfaces | Reference near-black `#27251F` and warm light `#E6E4DD` are starting points; use legible theme-specific text, borders and layers |
| Typography | Lekton headings/expressive labels, Inter body/interface; use local fonts with Czech support and an intentional weight set |
| Layout | Generous spacing, clear reading width, strong hero, rounded containers/cards and consistent section rhythm |
| Buttons | Pill form, clear hierarchy, reference arrow motif where useful; links render as links and actions as buttons |
| Decoration | Blue-tinted subtle glow/gradient/spotlight where it supports hierarchy. Text and CTAs remain usable without animation |
| Themes | Dark on first visit, explicit light/dark switch, preference persistence across all six routes |
| Navigation | Family bar above main navigation, shared responsive header, usable sticky offsets and accessible mobile menu |

Do not place small white text directly on bright brand blue unless the measured contrast meets Q-010. Brand color fidelity does not override readability. A decorative reference interaction that hides content or requires hover is not a required behavior to copy.

## Family bar content

The reference lists coalsoft, coalios, coaledu, coalmarketing and coalfamily, pointing respectively to `https://coalsoft.cz/`, `https://coalios.cz/`, `https://coaledu.cz/`, `https://coalmarketing.cz/` and `https://coalfamily.cz/`. Reuse their actual icons and give each link an accessible name. The active-product treatment should make Coalshift's relationship to COALsoft clear without pretending the user is on Coalios. Preserve intentional external navigation behavior and mark new-window links accessibly where appropriate.

The bar may adapt spacing/arrangement on mobile, but its links and theme/navigation controls must remain reachable. Tooltips must not be the only source of a link's name.

## Component and content mapping

- Build shared header, footer, Button/link primitives, container/section spacing, cards, FAQ/disclosure and theme tokens in the target's existing component structure.
- Reuse these for homepage, healthcare and historical routes. Avoid six independent theme implementations.
- Homepage uses the ordered copy sections in content.md: hero, AI benefits with phone mockup, practical benefits, capabilities, audiences, pricing, FAQ and contacts. Layout may combine adjacent sections if all information and hierarchy remain clear.
- Pricing may use a responsive comparison table or labeled cards, but must show both payment periods accurately and remove feature-based tier differentiation.
- Contact cards must have a consistent portrait crop. Build a layout that can receive the later inline calendar without a placeholder booking service or dead CTA.
- Existing illustration/logo assets may be reused after verifying contrast and delivery. Do not invent product UI or change screenshots so they claim functionality the product does not have.

## Implementation and comparison boundaries

Selective asset copying is allowed into Coalshift; runtime or build imports from the sibling repository are not. Inspect the relevant license files before reusing third-party font/effect code and retain required notices. Prefer CSS or existing React primitives for simple effects; justify any added client dependency by the visible result and measured cost.

Test the first shared design on the homepage at the agreed narrow/wide widths and in both themes before propagating it to remaining page bodies. Capture actual screenshots with browser/version/viewport and reference revision in the report. Visual acceptance remains with Jakub; source resemblance alone is insufficient.
