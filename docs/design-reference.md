# coalshift — Design reference and adaptation

## Authority and access

Read-only reference: `/Users/jakubtesarik/Programování/coalios`. Revision rechecked on 2 September 2026: `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`, branch `main`. Record any subsequent change before reuse. Preserve its unrelated `.DS_Store`; do not inspect `coalios-manual`. Direct reading and selective asset copying are authorized; builds must not depend on the sibling checkout.

coalshift remains a Next.js/React static website and a coalsoft product. Adapt the family design in blue. Do not import the reference's Eleventy/Nunjucks stack, CMS, business copy, newsletter, customer claims or metric values.

**Mandatory source, not loose inspiration:** the owner explicitly requires coalios patterns for design, UI/UX, typography, sizing, spacing and content composition. Whenever unsure, read the matching markup, data, styles and behavior in this repository. Port the actual pattern into React, then adapt blue identity and approved coalshift copy. Do not invent a smaller or simplified replacement when the reference already provides the answer.

The owner's [first seven screenshots](references/phase02/README.md) and [latest feedback/evidence](references/phase02-round2/README.md) show the expected details and successive coalshift pages. They are source references, not tests of the correction. Read the corresponding code for motion; a still screenshot does not demonstrate interaction. The initial broad claim of visual parity is superseded by [current F1–F6 corrections](phase-02-final-polish.md).

## Required source inspection

Paths are relative to the reference root. Read markup, styles and behavior together; listing filenames is not evidence of adaptation.

| Source | Required adaptation |
| --- | --- |
| `src/_includes/components/desktop-screen.njk` | Faux-browser frame, decorative top bar, vertical icon tabs, content panel and icon chips. Use five practical-use panels from content.md. The latest owner follow-up requires two supporting numerical cards per topic, replacing the phone. Use content.md values/statuses; do not copy reference results. |
| `src/_includes/sections/modules.njk`, `src/_data/modules.json` | Section heading/intro, content model and icon language, without ERP copy. |
| `src/assets/js/screen-url-updater.js` | Reference display changes with the selected tab. Use selected-tab React state for both panel and dynamic displayed path. The owner now requests hash-free illustrative paths from content.md; they are plain text inside the faux browser, not navigable routes. |
| `src/assets/css/input.css`: `.btn`, size variants and `.icon` (around lines 56–154 at this revision) | Outside outline and gap, fill layer, text transition and clipped circular diagonal-arrow animation. Read all variant/state selectors. |
| `src/assets/css/main.css` | Committed compiled CSS resolves fluid sizes/container rules from input.css and Tailwind; inspect it when a utility does not reveal its exact value. |
| `src/_includes/components/tym-item.njk`, `src/_includes/sections/our-team.njk`, `src/_includes/pages/nas-tym.njk` | Round portraits above separate highlighted contact cards; adapt to the two approved coalshift people and their confirmed contact methods. |
| `src/_data/footer.json` | Exact copyright wording and `Developed with 💜 by` credit; combine with the target company name and coalmarketing.cz link. |
| `src/assets/svgs/arrow_outward.svg` | Actual diagonal arrow motif, not a horizontal arrow or Unicode glyph. |
| `src/assets/css/input.css`: `.border-gradient` / `.global-spotlight`; `src/assets/js/react-bits/magic-bento.js` | Layered border, pointer coordinates, radius and glow. Adapt to blue, React lifecycle, reduced motion and coarse pointers. |
| `src/_includes/sections/benefits.njk` | Outlined icons, neutral card surfaces and border highlight. Keep the six key functions as a compact standalone overview; do not inherit oversized empty padding. |
| `src/_includes/sections/header.njk` | Family strip above floating rounded navigation, icon sizing, active/muted states and tooltips; exact floating-to-full-width pinned transition with nav.js, source opacity, spacing and theme-before-primary order. Retain correct visible-header offsets and mobile navigation. |
| `src/_data/topBar.json`, `src/assets/svgs/coalfamily/` | Five actual marks and destinations, not generic replacement symbols. |
| `tailwind.config.js`, `src/assets/fonts/`, `src/assets/js/dark.js` | Palette, local Inter/Lekton Latin Extended, radii, dark-first theme. Preserve integrated fonts/licenses and safe theme persistence. |
| `src/_includes/pages/domu.njk`, `src/_includes/sections/faq.njk`, `src/_includes/sections/cta.njk`, `src/_includes/sections/footer.njk` | Hero, disclosure, CTA and footer details adapted to compact composition and coalshift destinations. |

## Earlier third-round requirements (preserved by F1–F6)

The [latest screenshots and diagnostic](references/phase02-round3/README.md) accompany E1–E5. Use the same populated icon/heading/paragraph card component for both six-card sections; no extra gray icon frame in just one grid. Port reference `benefits.njk` icon scale (48–64px), headings (20–24px), text (14–16px), neutral inner surface and **2px** border shell. Before E2, the 1px flat-base implementation was visibly weaker even though pointer variables updated; E2 now implements the required 2px layered base.

The owner's latest [resting-card screenshot](references/phase02-round3/coalios-card-rest.png) makes the base treatment explicit: neutral-100 (`#f5f5f5`) light card interiors on the white page, with a permanent 2px gradient rim (lighter top, darker bottom) creating subtle depth. This is visible before hover. The blue pointer highlight adds to the base; it does not replace it. Preserve the base for reduced motion/coarse pointers. Do not leave white card interiors or add an unrelated heavy shadow.

The desktop menu underline comes from the full-height list item in `header.njk`: 2px line at the navigation bar's bottom edge, scale-x hover transition around 500ms, equivalent keyboard state. Primary header/mobile-menu CTA is now **Přihlásit se**; trial becomes secondary there.

Port `pages/gdpr.njk`, `pages/cookies.njk` and `sections/landing.njk` for the two legal pages. The reference already uses `waulterGdpr` and `waulterCookies`; keep those exact initially empty IDs. Give the lower subpage intro a semantic H1 and blue treatment. Reference decorative markup should not create duplicate layers or violate reduced-motion behavior.

Footer uses two columns: logo/brand/company details and navigation (including both legal links); retain the exact credit below. The mock address now changes with selection using the explicit display-only paths in content.md.

## Latest final-polish requirements — 3 September 2026

[F1–F6](phase-02-final-polish.md) and [fourth-round screenshots](references/phase02-round4/README.md) govern the current correction. The owner explicitly prefers numerical cards over the phone. Read the full reference desktop-screen composition, including its supporting-card column and responsive stacking, and use it on all five topics. Main-content width, supporting-card tracks and desktop frame/CTA geometry stay consistent across selection. Two supporting cards appear for every topic. The former conditional phone and unequal natural panel heights are superseded.

Port the reference's large numeral / small badge / lower explanatory text and gray resting surfaces into blue. Values and `illustrative`/`confirmed` statuses come only from content.md; all illustrative values have a visible **Ilustrační údaj** note. They are a working layout input, not measured claims. The photo is removed only from this browser placement, without inventing substitute product images or deleting originals.

F2 adds a centered, open audience closing line with a decorative plus; no card or pill. F3 adds pointer-border glow to every pricing card, preserving approved pricing typography, surfaces and featured emphasis. F4 introduces a restrained translucent blue stroke behind the lower 70–75% of selected brand words, without changing typography or line height. F5 introduces a scoped light icon accent starting at `#009AC0`; keep the exact base `#00B5E2` for brand/CTA and preserve dark icons and other semantic color tokens. See the assignment for measured starting contrast and actual-render verification.

The latest paired screenshots also make browser surface contrast binding: use the F1 source color/border table, including opaque neutral-200/900 workspace and neutral-100/800 main/metric panels. Preserve different chrome, address, selected-tab and fact surfaces. For the header, read `src/_includes/sections/header.njk` and `src/assets/js/nav.js`: the reference toggles at 100px scroll, moves the family strip away, changes the floating rounded bar into a full-width top-flush white/90 or black/90 surface and restores it on return. Port source gaps/padding and put the theme button immediately before primary login. See F6 for offset/mobile/focus verification.

## Visual and interaction contract

| Element | Expected result |
| --- | --- |
| Header states/order | At top: family strip + floating translucent pill. From the reference 100px scroll state: family strip moves away; full-width white/90 or black/90 bar at top:0 with no rounding. Desktop actions trial → theme → primary login. Source spacing and responsive fit per F6. |
| Palette | coalsoft primary `#00B5E2`; family colors below belong only to the corresponding identities. Use intentional accessible variants in both themes. |
| Typography | Lekton headings/expressive labels, Inter body, Czech glyphs and intentional weights. Brand names always lowercase. |
| Density | Hero → compact six-function overview → practical-use browser → monthly pricing → six audience icon tiles → FAQ → contacts with integrated final CTA → footer. Browser and pricing are adjacent. Merge the former tall AI/practical-benefits/closing-CTA bands. |
| Surfaces | Rounded frame and layered neutral borders/surfaces; clear hierarchy and reading width without excessive padding or minimum-height sections. |
| CTA rest | Pill with an outside 1px outline separated by a small gap, padded label and diagonal arrow inside a contrasting circular disc. Coherent primary/secondary variants. |
| CTA hover | Fill sweeps from the bottom; text moves vertically; the first arrow exits upper-right as its twin enters from lower-left inside the clipped disc. Match reference timing/shape (roughly 500ms at this revision), adapted to blue and both themes. |
| CTA keyboard/motion | Visible focus survives outline/overflow. One accessible label; duplicate animation text and arrows are decorative. Reduced motion leaves a stable readable label/icon and clear state without travel animations. Preserve link/action semantics and activation guards. |
| Cards/chips | Actual outlined icons, inset surface and thin layered border. Fine-pointer movement creates a restrained blue border highlight near the pointer. Lifting alone is insufficient. Informational cards are not fake links or unnecessary tab stops. |
| Browser | Real accessible React tabs and one selected panel. Decorative chrome is not an iframe or working address bar. Consistent main-content width and supporting metric tracks; stable wide-desktop height across all five topics, responsive natural height where necessary, unclipped prose and no nested vertical scrolling. All six overview functions remain visible outside tabs. |
| Mobile | Compact selector that wraps or scrolls within its strip, visible selected state, readable panels. No page-level overflow, tiny text or forced desktop layout. |

Bright blue must not create unreadable small white text. Measure changed color pairs under Q-010. Essential content never requires hover. Optional ambient glow must not obscure text or capture input.

## Source dimensions to preserve

These values were read from reference markup/input.css and compiled main.css at the revision above. They are reference observations, not newly invented design tokens. Recheck them if the reference changes. Do not scale the whole design down to fit the old 1152px shell.

| Pattern | Reference values / target adaptation |
| --- | --- |
| Container | Breakpoint maxima 640 / 768 / 1024 / 1280 / 1536px at 40 / 48 / 64 / 80 / 96rem. At a 1440px viewport the reference shell can use 1280px; at 1728px it can use 1536px. Keep edge gutters and narrower prose measure where appropriate. |
| Header | Desktop nav items `h-20` (80px), Inter navigation text 16px, desktop navigation from `xl` (1280px). Preserve the floating pill and scroll transition. Family bar roughly 48–56px, marks 24–32px. |
| Normal CTA | Font `clamp(0.875rem, 0.696rem + 0.446vw, 1.125rem)`; arrow `clamp(0.875rem, 0.607rem + 0.67vw, 1.25rem)` with 6px disc padding. Label padding-left 20px, right padding 8px, vertical padding 4–6px, gap 10–12px. |
| Large CTA | Font `clamp(1rem, 0.82rem + 0.45vw, 1.25rem)`; arrow `clamp(1rem, 0.64rem + 0.89vw, 1.5rem)` with 8px disc padding. Label padding-left 20–28px, right padding 8px, vertical padding 4–8px, gap 10–14px. |
| CTA outline | 1px solid outline, **2px outline offset**; distinct hover/focus states. A transparent outer shadow does not produce this geometry. Preserve genuine separation on all surfaces. |
| Browser top bar | Centered full-width address pill, capped at 25rem (400px) from md; 14px text, 6px vertical padding, 1px border. Decorative dots 12px with balanced space on the opposite side. |
| Browser tabs/content | Desktop tab label Lekton 18px bold, icons 20–24px, icon gap 16px, horizontal padding 24–28px, vertical padding 12–16px. Content body 16px; keep source heading hierarchy and responsive panel padding. CTA sits inside the panel. |
| Layered cards | `.border-gradient` uses a 2px inset shell (`p-0.5`), rounded neutral inner surface, neutral base border and pointer-local accent highlight. Apply to feature/audience tiles, browser facts and contact cards; extend the effect to pricing under F3 while preserving its approved interior and Lite emphasis. |
| Team cards | Circular portraits 96–112px above the card, offset left 16–24px; portrait/card gap 16–24px. Card radius 24px, padding 16–24px. Name Lekton 18–20px; role and contact text 14–16px; contact icons 16–20px. Role uses coalsoft blue in the target. |

Pricing uses the normal reference CTA proportions with the short labels in content.md; leave enough card width for label and disc. The full trial label remains appropriate in larger placements. Do not shrink type or remove arrows as a fitting strategy. Preserve visible accessible focus even if it needs an additional ring distinct from the decorative outline.

Reference composition does not mean copying unrelated ERP content or the exact length of the reference homepage. Preserve the approved coalshift section order, six visible functions and five practical-use topics. Reduce excessive inter-section gaps, especially browser → pricing; do not reduce legibility or create small chip substitutes for requested cards.

## Family strip

| Brand | URL | Treatment on coalshift |
| --- | --- | --- |
| coalsoft | `https://coalsoft.cz/` | Persistent parent-brand blue `#00B5E2` |
| coalios | `https://coalios.cz/` | Muted base; orange `#FF9E1B` on hover/focus |
| coaledu | `https://coaledu.cz/` | Muted base; yellow `#F2C700` on hover/focus |
| coalmarketing | `https://coalmarketing.cz/` | Muted base; purple `#C181C6` on hover/focus |
| coalfamily | `https://coalfamily.cz/` | Muted base; green `#26C672` on hover/focus |

The reference uses roughly 24–32px marks and a distinct upper strip; compare proportions instead of keeping the miniature 22px row unchanged. Reuse the correct inlined paths already in `FamilyIcons.tsx` where they match; no invented replacement logos.

C2 removed the competing generic header hover colors; preserve that fix and inspect every brand state in both themes. Preserve the muted-to-brand transition; icons need not all be permanently saturated. Provide accessible names and tooltip behavior on keyboard focus as well as hover. Parent-brand emphasis is not `aria-current="page"` for another website. Preserve intentional external targets.

## React adaptation and comparison

Use component-scoped behavior, listener cleanup and existing dependencies where practical. Do not paste global reference scripts unchanged. `MagicBento.handleMouseMove` accesses `this.globalSpotlight.style` even in border-only mode where that element may not be created. Guard optional ambient elements; implement border-only glow without that assumption. Respect fine/coarse pointer and reduced-motion states.

Use `tablist`, `tab`, `tabpanel`, selection/label/control relationships and roving focus. Arrow keys follow orientation; support Home/End and Enter/Space for manual activation. Hidden panels expose no focusable children. Follow the [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) rather than the reference's all-tabs-`tabindex="0"` shortcut. Keep static-export compatibility and readable server-rendered text.

Capture full-page before/after at the same actual viewport/theme, close-up rest/hover/focus states, all panels and both themes. Compare document height under equal conditions; no invented percentage reduction or performance score. Record actual `innerWidth`, `innerHeight`, DPR and browser. Supplied screenshots contain browser chrome and do not establish a 1440px content viewport.

Inspect applicable licenses before copying third-party code/assets and preserve notices. Source resemblance, reference screenshots, implementation rendering and owner acceptance are separate evidence; a build or source filenames do not demonstrate visual parity.
