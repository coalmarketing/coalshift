# Coalshift — Design system

The coalshift website is a coherent member of the coalfamily visual identity in
**coalsoft blue `#00B5E2`**, with light and dark themes (dark by default) and the
coalfamily brand strip. coalios orange is *not* coalshift's primary color.

## coalios provenance — the reference baseline

`/Users/jakubtesarik/Programování/coalios` is an authorized **read-only** design
reference. Ported patterns below were read at revision
`f3d727dc32dd9cd04493915f512b3375ef7d0cf4`, branch `main`.

Rules:

- coalios patterns are a **mandatory source** for design, UI/UX, typography,
  sizing, spacing and content composition — not loose inspiration. When a detail
  is uncertain, read the matching markup, styles and behavior in coalios and port
  the actual pattern into React; do not invent a smaller or simplified
  replacement.
- Adapt only the blue identity, approved coalshift copy, the React implementation
  and necessary responsive/accessibility behavior. Do **not** import coalios's
  Eleventy/Nunjucks stack, CMS, business copy, newsletter, customer claims,
  metric values, routes or dependencies. The build must not depend on the sibling
  checkout.
- Never inspect or modify `coalios-manual`. Preserve coalios's unrelated files
  (including its `.DS_Store`).
- **If the reference revision changes, re-check every value in this document
  before reuse** and update the SHA above.
- Inspect third-party licenses before copying assets and preserve notices. Fonts
  copied in: local Inter + Lekton (Latin Extended) WOFF2 under `public/fonts/`
  with `public/fonts/FONT-LICENSE.md`.

## Ported-pattern mapping

| coalshift implementation | coalios source | Adaptation notes |
| --- | --- | --- |
| `CtaButton` / `.cta` (`app/globals.css`) | `src/assets/css/input.css` `.btn` + size variants + `.icon`; compiled `main.css` | Outer 1px outline + 2px offset, small gap; bottom-up fill sweep; label + clipped circular diagonal-arrow swap ≈500ms; one `aria-label`; `:focus-visible` ring survives `overflow:hidden`; `motion-reduce` leaves a stable label/icon. Adapted to blue + both themes. |
| Faux browser (`FunctionsBrowser.tsx`) | `src/_includes/components/desktop-screen.njk`; `src/assets/js/screen-url-updater.js` | Decorative chrome (not an iframe), centered address pill, always-vertical icon tab rail, one visible panel, two supporting numerical cards per topic (phone removed). Real WAI-ARIA `tablist`/`tab`/`tabpanel`, roving focus, `aria-orientation="vertical"` at every width. Address pill is plain display text synced to the selected tab. |
| Icon/heading/paragraph cards — `InfoCard` (Capabilities + Industries) | `src/_includes/sections/benefits.njk`; `src/_data/modules.json` | Bare outlined blue icon (no extra frame), source-sized type, neutral-100/#f5f5f5 (light) / neutral-900 (dark) interior, permanent 2px layered border rim, blue pointer highlight added on top. Informational cards — not links or tab stops. |
| Product gallery — `home/ProductGallery.tsx` | `src/_includes/sections/page-content.njk` | On `xl`: image/gallery left, text/CTA right (`flex-col xl:flex-row`, `xl:basis-1/2`, `xl:order-*` swap so on narrow screens the order is text/CTA → screenshot stack → prev/next + counter). Fluid gap; `.glow-border--lg` (2rem radius) layered rounded frame. The coalios stacked-card look uses the reference's real layered-image principle as a **playful, moving** stack: `SLIDES` is rendered in stable order as three persistent cards (each keyed by its screenshot, keeping its own image for the component's life; same rounded frame + clipped corners; `pointer-events-none`, only the front card exposes its `alt`, the rest `aria-hidden`). Each card's role — `front` (straight, readable) / `upper` (above/left) / `lower` (below/right) — comes from the active index; `.pg-card--{role}` in globals.css supplies a lightweight 2D `transform` (`translate` ±3–4% / ±8–12%, `rotate` ∓3°, `scale` .95) plus `z-index`, and only the `transform` is transitioned (~340 ms `cubic-bezier(0.4,0,0.2,1)`). So navigating **moves the actual cards**: `next` cycles upper→front→lower→upper, `previous` reverses; the promoted card takes `z-index: 20` immediately so it rises cleanly, no image swaps, interrupted transitions retarget from the current position (no queue). `prefers-reduced-motion` drops the transition (roles snap). The tilted cards do translate horizontally (±4%, part of the same `transform`); generous wrapper padding (`px-8 pb-14 pt-12 …`) plus the tuned transform/rotation/scale constants keep them within the reserved space at the tested widths → no page-level horizontal overflow and the controls sit clear below. A single transparent `<button>` overlay (z-30, `aspect-[2876/1376]`, `cursor-zoom-in`) at the front-card box is the one stable keyboard focus target and fullscreen trigger — the moving cards are never tab stops; there is no separate fullscreen icon. Keeps the native 2876×1376 ratio (no `object-cover`/`aspect-[3/2]` — never crop the app UI). The fullscreen `role="dialog"` keeps its own accepted keyed slide-in (`.pg-slide` + `.pg-slide-next` / `.pg-slide-prev`, 200 ms), unchanged. Deliberate previous/next + `1 / 3` counter, wrap navigation, no autoplay, `touch-action: pan-y` horizontal swipe (a swipe suppresses the follow-up click so it never opens fullscreen). See [content-and-seo.md](content-and-seo.md) §"Product gallery". |
| Layered border + coordinated spotlight — `.glow-border` + `SpotlightGroup` | `src/assets/css/input.css` `.border-gradient` / `.global-spotlight`; `src/assets/js/react-bits/magic-bento.js` | 2px inset shell (`p-0.5`), rounded neutral inner surface, `linear-gradient` base rim (lighter top, darker bottom). Full `data-spotlight="both"` port: a pointer-following border accent on the nearest `.glow-border` card *and* a fixed ambient circle (`.spotlight-ambient`, coalshift blue, `pointer-events: none`) that follows the pointer through the group — both read the same pointer position and the reference's proximity/fade formula on the same `requestAnimationFrame` tick, so they fade together. One ambient element per `SpotlightGroup` instance, created and removed with the component (no orphans across mount/unmount, never more than one visible at once). Gated to `(hover:hover) and (pointer:fine)` and not `prefers-reduced-motion`; listener + rAF + ambient-element cleanup on unmount. Applied to feature/audience tiles, browser fact cards, contact cards, testimonial cards and the pricing cards. |
| Custom cursors (`app/globals.css`, `public/cursors/`) | `src/assets/css/input.css` custom-cursor block; `tailwind.config.js` `theme.extend.cursor` | Three original SVGs copied byte-identical into `public/cursors/` (`default.svg`, `pointer.svg`, `text.svg`; `grab`/`grabbing` not ported — unused today). `@media (hover:hover) and (pointer:fine)` only: `body` → default, headings/paragraphs/text inputs → text, links/buttons/`summary`/`select`/checkboxes (and their descendants) → pointer — each rule is a plain type/attribute selector (no `:not()` inflation) so any element's own explicit `cursor-*` utility (the gallery's `cursor-zoom-in`, a future `cursor-grab`/`cursor-not-allowed`) is a class selector and always outranks it. The pointer rule is declared after the text rule so an icon/label inside a link or button keeps the pointer cursor (equal-specificity type selectors — later wins) instead of falling back to the text cursor. Failed SVG loads fall back to the trailing `auto` keyword. |
| Header — floating→pinned transition (`Header.tsx`) | `src/_includes/sections/header.njk`; `src/assets/js/nav.js` | At top: coalfamily strip + floating `rounded-full` translucent pill. At `scrollTop >= 100`: strip translates out of view (and becomes `inert`), the bar becomes a full-viewport-width `bg-white/90` / `bg-black/90` surface flush to `top:0`, no rounding; scroll-back restores the float. One scoped scroll listener with cleanup; `motion-reduce:!transition-none`; `mounted` gate so a scroll-restored load snaps without animating. The document-flow spacer (full top-state header height, keeps the fixed header from reflowing the page) carries `overflow-anchor: none` in its initial inline style — without it, the browser's scroll-anchoring heuristic could pick this empty, height-only element as the anchor node as `--family-block-h`/`--header-height` publish after mount, nudging the page down a little further on every reload. |
| Desktop nav underline — `.link` (`globals.css`) | `header.njk` full-height `<li>`; `input.css` `.link` | 2px line pinned to the nav bar's bottom edge, centre-out `scale-x` transition ~500ms, equal keyboard state (`has-[a:focus-visible]`). Used by footer navigation + legal + login links (replaces instant `hover:underline`). |
| Mobile menu (`Header.tsx`) | `header.njk` full-screen menu pattern | `role="dialog" aria-modal="true"`, `origin-top` `scale-y` transition, full-viewport `bg-white dark:bg-black`, own logo + close row, vertical list, `overflow-y-auto`. Opening moves focus onto the close control; `<main>`/`<footer>`/`<header>`/`#main` skip link all `inert`; body scroll lock; focus trap wraps; Escape closes + returns focus to the hamburger; activating a link closes + navigates. |
| coalfamily strip (`FamilyIcons.tsx`) | `src/_data/topBar.json`; `src/assets/svgs/coalfamily/` | Five real marks + destinations (below). Parent `coalsoft` mark keeps a persistent blue `#00B5E2`; the others sit muted and reach their brand color on hover/focus. Accessible names + tooltip on keyboard focus as well as hover. Not `aria-current`. Reuse the inlined paths in `FamilyIcons.tsx` where they match — no invented logos. |
| Team/contact cards (`Contact.tsx`) | `src/_includes/components/tym-item.njk`; `sections/our-team.njk` | Circular portrait above a separate highlighted contact card, offset left; name Lekton, blue role, icon contact rows. Two cards, confirmed contact methods only, no invented social links. |
| Legal shells (`LegalPage.tsx` + `SubpageIntro`) | `src/_includes/pages/gdpr.njk`, `pages/cookies.njk`, `sections/landing.njk` | Shared header/footer, a lower subpage intro (real `<h1>`, `Domů → title` breadcrumb, subtle blue radial wash), the exact initially-empty Waulter container, a `.legal-content` wrapper styling injected headings/lists/tables/links in both themes. Not a full homepage hero. |
| Footer (`Footer.tsx`) | `src/_includes/sections/footer.njk`; `src/_data/footer.json` | Two desktop columns (brand + company details under the logo; navigation), stacked on mobile, copyright + credit below. `© 2026 coalsoft s.r.o. Všechna práva vyhrazena.` + `Developed with 💜 by coalmarketing.cz` (link to `https://coalmarketing.cz/`, keep the purple heart). Do not copy coalios newsletter or company-specific data. |
| Brand-word highlight — `BrandWord` + `.brand-word` | owner request (decoration, not a coalios element) | One translucent `rgba(0,181,226,0.3)` stroke behind the lower ~70–75% of the lettering, `box-decoration-break: clone`; foreground color and text metrics unchanged; no box/pill. Applied only to the five placements listed in [content-and-seo.md](content-and-seo.md) §"Brand-word highlight". No global text-node replacement. |
| Hero, FAQ disclosure, arrow motif | `src/_includes/pages/domu.njk`, `sections/faq.njk`; `src/assets/svgs/arrow_outward.svg` | Compact composition, real diagonal arrow motif (not a horizontal arrow or Unicode glyph), coalshift destinations. |

## Palette and tokens (`tailwind.config.js`)

- **`coalsoft` scale** (`50`–`950`, `DEFAULT #00B5E2`) — the coalshift primary
  accent, derived so hover/focus/tint variants can be chosen against measured
  contrast pairs. Keep the exact base `#00B5E2` for brand/CTA.
- **Family brand identities** — `coalsoftBrand #00B5E2`, `coalios #FF9E1B`,
  `coaledu #F2C700`, `coalmarketing #C181C6`, `coalfamily #26C672`. Tied to their
  own brands; never coalshift's theme color.
- **`borderRadius.4xl`** = `2rem`.
- Scoped light icon accent `.icon-accent`: `#009AC0` on light (measured ~3.0:1 on
  `#f5f5f5`, decorative/UI use only), `#1FC3EC` on dark. Does not touch
  `coalsoft-600` / `#00B5E2` / `.eyebrow`.
- Fonts: Lekton for headings and expressive labels, Inter for body/interface.
  Brand names are always lowercase.

`darkMode: 'selector'` — an explicit choice is a class on `<html>` set by the
render-blocking bootstrap in `app/layout.tsx` before paint; `ThemeToggle`
persists the choice (`localStorage['coalshift-theme']`), stays safe when storage
is blocked, has a stable accessible name and `aria-pressed` for the dark state.
First visit is dark.

## coalfamily strip

| Brand | URL | Treatment on coalshift |
| --- | --- | --- |
| coalsoft | `https://coalsoft.cz/` | Persistent parent-brand blue `#00B5E2` |
| coalios | `https://coalios.cz/` | Muted; orange `#FF9E1B` on hover/focus |
| coaledu | `https://coaledu.cz/` | Muted; yellow `#F2C700` on hover/focus |
| coalmarketing | `https://coalmarketing.cz/` | Muted; purple `#C181C6` on hover/focus |
| coalfamily | `https://coalfamily.cz/` | Muted; green `#26C672` on hover/focus |

Marks ~24–32px. Preserve the muted→brand transition and the external targets.

## Source dimensions to preserve

Read from coalios markup / `input.css` / compiled `main.css` at the revision
above. Reference observations, not invented tokens — re-check if the reference
changes. Do not scale the whole design down to the old 1152px shell.

| Pattern | Reference values |
| --- | --- |
| Container | Breakpoint maxima 640 / 768 / 1024 / 1280 / 1536px at 40 / 48 / 64 / 80 / 96rem. At 1440px viewport the shell uses 1280px; at 1728px, 1536px. `.container-page` = `max-w-[80rem] 2xl:max-w-[96rem]`. |
| Header | Desktop nav items `h-20` (80px); Inter nav text 16px; desktop nav from `xl` (1280px). Family bar `h-11` (~44–48px), marks `size-7` (28px). Scroll threshold 100px. `--header-height` = visible nav-bar height (~82px); `--family-block-h` published for the translate + document-flow spacer `calc(--family-block-h + --header-height)`. |
| Normal CTA | Font `clamp(0.875rem, 0.696rem + 0.446vw, 1.125rem)`; arrow `clamp(0.875rem, 0.607rem + 0.67vw, 1.25rem)`, 6px disc padding. Label padding-left 20px, right 8px, vertical 4–6px, gap 10–12px. |
| Large CTA | Font `clamp(1rem, 0.82rem + 0.45vw, 1.25rem)`; arrow `clamp(1rem, 0.64rem + 0.89vw, 1.5rem)`, 8px disc padding. Label padding-left 20–28px, right 8px, vertical 4–8px, gap 10–14px. |
| CTA outline | 1px solid outline, **2px outline offset**; distinct hover/focus; visible focus ring may be an additional ring distinct from the decorative outline. |
| Browser top bar | Centered address pill capped at 25rem (400px) from `md`; 14px text, 6px vertical padding, 1px border. Decorative dots 12px with balanced opposite-side space. |
| Browser tabs/content | Desktop tab label Lekton 18px bold, icons 20–24px, icon gap 16px, horizontal padding 24–28px, vertical padding 12–16px. Content body 16px. CTA sits inside the panel. Metric `<ul>` `grid-cols-1 md:grid-cols-2 2xl:grid-cols-1 2xl:max-w-sm`. |
| Layered cards | `.border-gradient` = 2px inset shell (`p-0.5`), rounded neutral inner surface, neutral base border, pointer-local accent. Applied to feature/audience tiles, browser facts, contact cards and pricing cards; pricing keeps its own interior + Lite emphasis (permanent `ring-coalsoft`). |
| Team cards | Circular portraits 96–112px (impl. 112px) above the card, offset left 16–24px (`ml-6`); portrait/card gap 16–24px. Card radius 24px, padding 16–24px. Name Lekton 18–20px; role + contact text 14–16px; contact icons 16–20px. Role in coalsoft blue. |
| FunctionsBrowser panels | Inactive panels use the native `hidden` attribute (`display:none` at every width, one DOM copy each, `tabIndex=-1`, not focusable, not in layout, not announced). Only the active panel sizes the frame — natural per-tab content height, no forced fixed/min height, measuring clone or nested scroller. Active main-column + metric-rail widths identical across all five tabs at a given width. CTA follows the content group in normal flow (`gap-10 lg:gap-12`, `self-start`). |

## Visual and interaction contract

- Section density: Hero → compact six-function overview → practical-use browser →
  monthly pricing → six audience tiles → FAQ → contacts with integrated final CTA
  → footer. Browser and pricing are adjacent; no tall intro/closing-CTA bands.
- Header actions, desktop (`xl`+) order: unframed theme toggle → sole primary
  `Přihlásit se` CTA. There is no trial CTA in any header variant. Below `xl` the
  header is logo + theme toggle + hamburger only.
- Bright blue must not produce unreadable small white text. Essential content
  never requires hover. Optional ambient glow must not obscure text or capture
  input.
- Tabs follow the [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):
  `tablist`/`tab`/`tabpanel`, roving focus, arrow keys by orientation, Home/End,
  Enter/Space for manual activation, hidden panels expose no focusable children.
- Contrast targets (WCAG 2.2): normal text ≥4.5:1, large text ≥3:1, required
  control/state boundaries ≥3:1. Reduced motion leaves stable readable
  labels/icons and clear state without travel animation. See Q-010 in
  [quality.md](quality.md) for the checked pairs and open device checks.
