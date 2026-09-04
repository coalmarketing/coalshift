# 05 — Real product gallery

## Outcome

Add one homepage section showing three real coalshift application screenshots.
It follows the coalios image-left/text-right `page-content.njk` composition in
coalsoft blue, adds deliberate carousel controls and an accessible fullscreen
viewer, and leads visitors to the existing pricing section.

Place it between `FunctionsBrowser` and `Pricing`. Do not change the header,
pricing, product application, routes, SEO, GTM/Waulter or other homepage copy.

## Content

- Eyebrow: **Ukázka aplikace**
- Heading: **Podívejte se, jak coalshift vypadá v praxi**
- Text: **Plánujte směny, kontrolujte obsazení a spravujte pozice i zaměstnance
  v jednom přehledném prostředí. Prohlédněte si skutečné obrazovky aplikace, se
  kterými budete pracovat každý den.**
- CTA: **Prohlédnout cenové balíčky** → existing `#pricing` section through the
  project's guarded smooth-scroll component.

Slides, in this order:

| Slide | Public source | Accessible description |
| --- | --- | --- |
| Směny | `public/img/product-gallery/coalshift-smeny.png` | Týdenní plán směn v aplikaci coalshift s přehledem pozic a obsazení. |
| Pozice | `public/img/product-gallery/coalshift-pozice.png` | Seznam pracovních pozic v aplikaci coalshift. |
| Zaměstnanci | `public/img/product-gallery/coalshift-zamestnanci.png` | Seznam zaměstnanců a pracovních údajů v aplikaci coalshift. |

Use the exact supplied files named in the implementation prompt. Do not recreate,
retouch, crop or invent product screens. Preserve their native 2876×1376 aspect
ratio and all visible UI.

## Design and behavior

- Port the actual layout, spacing, typography, rounded layered border and subtle
  stacked-card treatment from coalios
  `src/_includes/sections/page-content.njk` at reference revision
  `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`. Use existing coalshift blue tokens,
  `Section`, `CtaButton`/`FragmentCta` and established light/dark surfaces.
- Render all three real screenshots as a playful, **moving** stack — three
  persistent cards in stable order (each keyed by its screenshot, keeping its own
  image; requested once), one straight in front and readable, one tilted
  above/left, one below/right. Each card's role (front / upper / lower) comes
  from the active index; navigating animates only a lightweight 2D `transform`
  (~340 ms) plus `z-index` so the actual cards glide between roles — `next`
  cycles upper→front→lower→upper, `previous` reverses; the promoted card rises
  cleanly, no image swaps, interrupted transitions retarget without a queue.
  Non-active cards are decorative (`aria-hidden`, empty alt, no pointer events,
  never tab stops). `prefers-reduced-motion` snaps roles.
- On wide screens: image/gallery left, content right. On narrow screens: content,
  gallery and controls stack vertically without page-level horizontal overflow.
  Never crop the application UI.
- Put previous and next arrow buttons beneath the image at its right edge, with a
  visible `1 / 3` counter. Fullscreen opens by activating the front screenshot
  itself (a transparent `<button>` overlay) — no separate fullscreen icon.
  Navigation wraps at both ends; there is no autoplay.
- Support horizontal touch swipe on the inline image and in fullscreen while
  preserving normal vertical page scrolling. Buttons remain the non-gesture
  fallback.
- Fullscreen uses an accessible modal dialog: contained focus, visible close,
  previous/next controls, counter, Left/Right navigation, Escape close and focus
  return to the opener. The image fits within the viewport without clipping.
- Announce the active slide name/counter without announcing decorative layers.
  Every control has a Czech accessible name and visible keyboard focus. Respect
  `prefers-reduced-motion`.

## Image delivery

Add the three sources to the existing Sharp registry and generate WebP variants
appropriate for the inline half-width slot and fullscreen viewing (up to, but
never beyond, the 2876px native width). Reuse `ResponsiveImage`; provide truthful
`sizes`, width/height and `srcset` descriptors. Keep the below-fold images lazy;
the inline slot requests each screenshot once at its ~half-width derivative (the
two rear cards included) and never the full 2876px source, and the fullscreen
image loads `priority` on open. Do not add an image/carousel library.

## Implementation scope

- New `app/components/home/ProductGallery.tsx`.
- `app/page.tsx` composition.
- The three named source images, `image-registry.json`, and only the minimal
  style/helper changes genuinely needed by the gallery.
- Concise current-state updates to `architecture.md`, `design-system.md`,
  `content-and-seo.md`, `quality.md` and `plan.md` after implementation.

## Acceptance and local verification

1. All three exact screenshots appear in the approved order; arrows, counter,
   swipe and wrapping work inline and fullscreen.
2. Dialog open/close, focus return, Escape and Left/Right work with keyboard;
   controls remain readable in light/dark and reduced-motion modes.
3. Layout is usable at 320, 390, 768 and 1440 CSS px, at 200% zoom, and has no
   page-level horizontal overflow or covered controls.
4. CTA lands at `#pricing`. Existing homepage sections and navigation still work.
5. Generated image candidates exist, their real widths match descriptors, no
   screenshot is stretched/cropped, and the browser console/network show no
   gallery errors.
6. `npm run typecheck` and `npm run pages:build` pass on the pinned Node version.

Implement and validate locally on `master`. Stop for owner review with a concise
report (maximum eight bullets). Do not commit, push or deploy in this phase.
