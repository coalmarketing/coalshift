# 02 — Homepage and design

## Owner acceptance — 3 September 2026

Jakub explicitly accepted this phase after Codex's focused review of I1–I8. The accepted version and remaining verification limits are recorded in [plan.md](../plan.md), the sole phase-status source. No further Phase 02 correction is assigned. The implementation records below are historical and do not authorize repeating completed work, publication or Phase 03 implementation.

## Completed correction — I1–I8 after complete recheck (historical)

The complete review found no critical/data/security defect and confirmed all current plan items implemented, but Phase 02 remains `in_review` for eight bounded corrections. Implement [I1–I8](../phase-02-recheck-corrections.md): fragment offsets and native-equivalent URL/history/focus, reduced-motion scrolling, modal mobile-menu focus, reliable skip targets, three contrast states and stable theme-toggle semantics/first paint. Keep all accepted visual behavior and the assignment's explicit exclusions. Return the correction report before acceptance or Phase 03.

- [x] I1 (3 Sep 2026): removed the stacked fragment clearance — `Section` drops `scroll-mt-[var(--header-height,8.5rem)]` (computed `scroll-margin-top: 0px`); `app/globals.css` `html { scroll-padding-top: var(--header-height,8.5rem) }` → `calc(var(--header-height,5rem) + 0.5rem)` as the single native mechanism (fallback aligned to the visible 72–82 px bar). Direct `/#pricing` lands 6 px below the pinned nav bar, `/#industries` `/#faq` `/#contact` 8 px, cross-route and the `/zdravotnici`→`/#industries` 301 6 px; JS path 8 px, matching.
- [x] I2 (3 Sep 2026): `app/lib/smoothScroll.ts` adds `prefersReducedMotion()` gating `window.scrollTo` behaviour for `smoothScrollToId` and a new `scrollToTop()` (home-logo path, `Header.tsx`); one `history.pushState` only when the hash changes, zero on same-target re-activation; target focused with `tabindex="-1"` (not a Tab stop); modified/non-primary/non-self/missing-target activations still fall through; stale 72/80 px comments reconciled; `history.scrollRestoration` left `"auto"`.
- [x] I3 (3 Sep 2026): `#mobile-menu` gets `role="dialog" aria-modal="true" aria-label="Navigace"`; a modal effect sets `inert` on `<main>`, `body > footer` and the `#main` skip link (the header keeps its own `inert`), locks body scroll, traps Tab in both directions inside the visible menu, and closes on Escape; `closeMenu(restoreFocus)` keeps focus-return correct (hamburger on Escape/close control, destination section on menu-link activation). Visual layout, animation and z-index unchanged.
- [x] I4 (3 Sep 2026): `<main id="main">` → `<main id="main" tabIndex={-1} className="outline-none">` on `app/page.tsx` and `app/components/LegalPage.tsx`; the skip link now lands focus on `#main` past the shared header on `/`, `/gdpr`, `/cookies` without `#main` becoming a Tab stop.
- [x] I5 (3 Sep 2026): `Ilustrační údaj` badge text `text-neutral-500` → `text-neutral-600` — `#525252` on `#E5E5E5` = 6.20:1 light, 6.99:1 dark; wording, `10.4px` size, uppercase, placement, dark result and all 6 instances preserved.
- [x] I6 (3 Sep 2026): selected browser tab border `border-neutral-300/dark:border-neutral-700` → `border-coalsoft-700/dark:border-coalsoft-400` — at rest 4.38:1 vs list surface / 5.06:1 vs tab fill (light), 8.60:1 / 7.26:1 (dark); neutral fills, vertical layout, roving focus and the separate `:focus-visible` ring unchanged.
- [x] I7 (3 Sep 2026): non-parent coalfamily icon rest colour `text-neutral-400 dark:text-neutral-500` → `text-neutral-500` — `#737373` = 4.74:1 on white, 4.43:1 on black; parent `coalsoft` keeps `text-coalsoftBrand`; hover/focus brand colours, tooltip, external destinations and dark treatment unchanged.
- [x] I8 (3 Sep 2026): `ThemeToggle` — stable `aria-label="Tmavý režim"` + `aria-pressed={mounted ? isDark : undefined}` (was a changing action label); sun/moon are Tailwind `dark:` variant classes driven by the bootstrap `<html class="dark">`, correct on first paint including a returning light visitor and cross-route, no hydration error; `size-9`, DOM order and dark-first storage guards preserved.
- [x] `npm run typecheck` + `npm run pages:build` exit 0; verification in isolated headless Chrome 152 against a fresh `out/` (fragment matrix, modal menu at 390 px both themes, skip link on three shells, I5–I7 contrast light + dark, I8 fresh/persisted/toggle/cross-route) plus a 320–1440 + 200 % regression sweep. Q-009/Q-010 recorded local PASS; Q-008 records I8. Physical-device touch/keyboard, a screen-reader pass and browser-native Back scroll restoration remain NOT_RUN. Phase 02 stays `in_review`; full table in [the correction file](../phase-02-recheck-corrections.md).

## Complete review handoff — 3 September 2026 (historical)

Jakub reviewed H1 and the subsequent coalfamily tooltip correction and accepted the current appearance and behavior. The next assignment is the complete Phase 02 `/recheck`, as scoped in [plan.md](../plan.md), against `8f1db89f2e01dad80eb6678a5cbd0df0187b797a` including commit `68fdbcb` and every local correction/document. Review only; return the English report and stop before fixes or Phase 03. Phase status is recorded in plan.md.

Read the implementation records below as history. Current content/quality, G1–G4/R1–R6 and H1 supersede earlier phone, horizontal-tab, header-trial and fixed-height expectations. H1's compact active-only height is accepted. The final tooltip correction requires visible hover/focus tooltips above the nav surface without covering the theme/login controls, while the full mobile menu stays above the entire header. General owner acceptance does not establish an unspecified physical-device matrix or actual provider delivery.

## Completed correction — H1 (FunctionsBrowser compact height)

Completed assignment: [phase-02-browser-height-correction.md](../phase-02-browser-height-correction.md). Narrow follow-up after G1–G4 / R1–R6 acceptance; all other behaviour preserved. The implementation-time evidence below predates the owner's subsequent acceptance recorded above.

- [x] H1 (3 Sep 2026): `FunctionsBrowser.tsx` grid-stack removed — panel wrapper `flex-1 lg:grid` → `flex-1`; inactive panels → native `hidden` attribute + `hidden` class (`display:none` every width, one DOM copy, not focusable, not in layout — coalios `desktop-screen.njk` `[&[hidden]]:hidden`); main card `gap-8` + `mt-auto` CTA wrapper → `gap-10 lg:gap-12` (reference `~gap-10/12`) with the CTA `self-start` in normal flow. Result: wide-desktop outer frame ≈593 px (was ≈920 px), facts-to-CTA gap 40/48 px (was hundreds), void gone, per-tab natural height, identical main/metric widths, no overflow 320–1728 both themes, keyboard model intact. `typecheck` + `pages:build` pass. AC-H1.1–AC-H1.5 PASS; Q-007/Q-009 FAIL→PASS, Q-010/Q-015 PASS. Owner + Codex visual sign-off and physical-device NOT_RUN. Full table in the correction file.

## Previous correction assignment — G1–G4, R1–R6 (navigation + responsiveness)

Implement [phase-02-responsive-navigation-corrections.md](../phase-02-responsive-navigation-corrections.md). Supersedes F6 only for: no trial CTA in any header, theme control before the sole login CTA, new mobile-header/menu. All other F1–F6 behaviour preserved. Phase status stays in plan.md.

- [x] G1 (3 Sep 2026): header `<li>` underline — `before:origin-left` removed → centre-out (coalios `header.njk`, default origin); footer + legal + footer-login links now use a ported `.link` class (centre-out 500 ms, replaces the instant `hover:underline`); `coalmarketing.cz` credit keeps its permanent underline. Reduced motion snaps both.
- [x] G2 (3 Sep 2026): footer heading **Web → Navigace**; all links/destinations/company data/credit unchanged; 320 px reflow with no overflow, legal labels wrap in the card.
- [x] G3 (3 Sep 2026): `Vyzkoušet na 14 dní zdarma` removed from every header branch (compact bar and mobile menu included). xl+ order: logo → nav → theme → primary `Přihlásit se`. Below xl: logo + theme + hamburger only. Mobile menu: 4 vertical nav links + `Přihlásit se` as the sole CTA. Fixed a latent bug — `.cta` sets its own `display`, so `hidden xl:inline-flex` on the login button was ignored (login was visible at every width); it is now wrapped in `<span class="hidden xl:inline-flex">`. Real per-width visibility verified.
- [x] G4 (3 Sep 2026): nav `<ul>` gap `clamp(0.5rem,-0.21rem+1.79vw,1.5rem)`, item `<Link>` pad `clamp(0.375rem,-0.071rem+1.116vw,1rem)`, `h-20`, group gap `xl:gap-8`, theme↔login `xl:gap-4`. Top/scrolled/return states + 100 px threshold + `[data-nav-bar]` fragment clearance + stable spacer verified in both themes.
- [x] R1 (3 Sep 2026): full-screen mobile menu ported from `header.njk` — `origin-top` `scale-y-0 → scale-y-100`, own logo/close row, vertical list, `overflow-y-auto`; `<header>` `inert` while open, body scroll lock, Escape closes + returns focus, accurate `aria-expanded`/`aria-controls`, link activation closes + navigates. Covers the header (`z-50` vs header `z-40`).
- [x] R2 (3 Sep 2026): `FunctionsBrowser` horizontal swipe strip removed — tab list is `flex-col` + `aria-orientation="vertical"` at every width, all 5 labels visible, `scrollWidth == clientWidth`. Below lg: address (dots/spacer hidden), vertical list, then panel; active panel natural height (inactive `display:none` + `inert`). At lg+: grid-stacked → frame height 0 px stable across tabs (a `.cta`-style display bug on the panel toggle was fixed). Up/Down roving focus, Home/End, Enter/Space manual activation, Left/Right pass through. Metric/fact reflow at reference breakpoints; all values/labels/`Ilustrační údaj`/paths unchanged; no phone.
- [x] R3 (3 Sep 2026): hero centred on 320/390 (eyebrow/heading/intro/CTA), CTAs stack centred with full labels; Capabilities + Industries `sm:grid-cols-2 xl:grid-cols-3` (1-col at 320/390); pricing/audience/FAQ/contact reflow verified; content-dependent heading alignment preserved.
- [x] R4 (3 Sep 2026): `/gdpr` + `/cookies` 200 at 320 & 1440, no overflow, real `<h1>`, breadcrumb, exactly one empty `#waulterGdpr`/`#waulterCookies` in `.legal-content`, footer full-document links. Real provider population still a separate check.
- [x] R5 (3 Sep 2026): `scrollWidth === clientWidth` at 320/390/768/1024/1280/1440/1728 both themes on `/`, `/gdpr`, `/cookies`; 200 % zoom (640 px layout) no overflow; reduced-motion rim stays; 0 page/hydration errors.
- [x] R6 (3 Sep 2026): every G/R item traced to a named coalios source file; no coalios content/identity/routes/groups imported; no build dependency on the reference.
- [x] `npm run typecheck` + `npm run pages:build` exit 0; real isolated headless Chrome 140 validation across 8 widths / both themes / 200 % zoom / reduced motion. Full table + limitations in the correction file. Phase 02 stays `in_review`.

## Previous correction assignment — F1–F6

Implement [phase-02-final-polish.md](../phase-02-final-polish.md), with [fourth-round evidence](../references/phase02-round4/README.md). The latest follow-up replaces the browser phone with two numerical cards per topic. Canonical content distinguishes illustrative values from approved counts. Phase status remains only in plan.md.

- [x] F1 (3 Sep 2026): phone removed from `FunctionsBrowser`; two numerical cards per topic from the `content.md` table in one `Metric` data model (stable ids, `illustrative`/`confirmed` status); every illustrative card shows the "Ilustrační údaj" note. Panels grid-stacked (one DOM copy each, inactive = `inert` + `visibility:hidden`) → **frame height, main-card width/height and CTA Y identical across all 5 tabs at 1728 (0 px variance measured)**. Reference surface hierarchy ported via scoped `data-surface` (workspace `#e5e5e5`/`#171717`, main+metric `#f5f5f5`+`#d4d4d4` 2px / `#262626`+`#404040`, fact chips white/`#171717`) so generic `.glow-border > *` no longer flattens them. Responsive stacking follows the reference (`md:grid-cols-2`, `2xl` right column). Orientation-aware arrows, address sync, register CTA all preserved. Image file/registry/derivatives untouched.
- [x] F2 (3 Sep 2026): `Industries` closing line centered below the cards with a decorative outlined blue `LineIcon name="plus"` (F5 accent), `font-lekton` ~18–20px; no card/pill/border/CTA, plus is `aria-hidden` and not a keyboard stop.
- [x] F3 (3 Sep 2026): `Pricing` list wrapped in `SpotlightGroup as="ul"`; each `<li className="glow-border" data-surface="white">` keeps the approved white/dark interior; Lite keeps a permanent `ring-2 ring-coalsoft-500` on top of the shared rim. Valid `ul > li` semantics, prices/bands/VAT/labels/helper unchanged.
- [x] F4 (3 Sep 2026): new `BrandWord` component + `.brand-word` (translucent coalsoft band behind the lower ~70% of the lettering, `box-decoration-break: clone`, foreground colour/metrics unchanged) applied to the 5 `content.md` placements only (Capabilities H2, Industries H2, Contact CTA heading, Hero lead, Contact intro `coalshiftu`).
- [x] F5 (3 Sep 2026): scoped `.icon-accent` — light `#009AC0` (measured 3.02:1 on `#f5f5f5`, 3.29:1 on the white fact-chip), dark unchanged (`coalsoft-400`). Applied to InfoCard icons, browser fact icons and the F2 plus. `coalsoft-600` / `#00B5E2` untouched elsewhere.
- [x] F6 (3 Sep 2026): `Header` ported to the reference two-state model — scroll state toggles at `scrollTop >= 100` (scoped React listener + cleanup, synced on mount). Top: family strip visible, floating `rounded-full` `bg-white/50` pill. Scrolled: `<header>` `translateY(-var(--family-block-h))` (family strip out of view + `inert`), nav surface flush `top:0`, full viewport width, `rounded-none`, wrapper `bg-white/90` + `shadow-sm`; scroll-back restores the float. ~300 ms surface / 500 ms translate transitions, `motion-reduce` safe. Desktop action order **trial → theme toggle → login**; theme toggle unframed. `--header-height` now = visible nav-bar height (82 px); `smoothScroll` + `scroll-padding-top` retargeted to `[data-nav-bar]`; stable document-flow spacer. Verified: fragment click lands the target 8 px below the pinned bar; legal-page direct load + scroll behave the same.
- [x] Fresh `npm run typecheck` + `npm run pages:build` pass; served `out` checked on `wrangler pages dev out` at 1728/DPR2 both themes with genuine pointer/keyboard where the harness allows. F1–F6 validation table + owner-assisted checklist below. Phase 02 stays `in_review`.

## Previous E1–E5 implementation record (historical)

The following is Claude's preceding delivery. Preserve successful implementation; see F1–F6 for newly requested changes and the fourth-round review for the limits of the E evidence.

- [x] E1 (3 Sep 2026): Quanda `<Script>` + comment removed from `app/layout.tsx` (no other reference in `app/`/`public/`/config); GTM + GTM-loaded `cdn.waulter.cz/sdk.js` + theme bootstrap preserved. `FunctionsBrowser` key handler orientation-aware — Up/Down for the vertical rail, Left/Right for the horizontal strip, unused axis not `preventDefault`ed (page scroll intact), Home/End + manual Enter/Space kept. Verified on `wrangler pages dev out` (see the E1–E5 validation table).
- [x] E2 (3 Sep 2026): new `app/components/ui/InfoCard.tsx` backs both `Capabilities` and `Industries` — bare 48px outlined blue icon (Industries grey chip removed), Lekton 20px heading, 14px 2-sentence paragraph, expanded `content.md` copy in all twelve cards. `.glow-border` → `p-0.5` (2px), always-visible `linear-gradient(to bottom, neutral.100/300)` rim over the pointer glow, `bg-neutral-100` (#f5f5f5) / dark `bg-neutral-900` inner surface.
- [x] E3 (3 Sep 2026): full-height nav `<li>` with a `before:` 2px underline at `bottom-0`, `scale-x-0` → `hover:` / `has-[a:focus-visible]:` `scale-x-100` 500ms, `bg-black dark:bg-white`; fragment links never marked current. `Přihlásit se` = `cta--primary` (login, same tab), trial = `cta--secondary` (register, `_blank`) in header **and** mobile menu.
- [x] E4 (3 Sep 2026): address pill shows greyed `https://coalshift.cz` + the selected tab's display path (`/smeny-a-ai`, `/lide-a-pozice`, `/nepritomnosti`, `/exporty`, `/statistiky`) from React state — plain text, no hash/route/history; updates on pointer + Enter/Space, not focus alone; widened to a `minmax(0,25rem)` centre column; real anchor stays `benefits`.
- [x] E5 (3 Sep 2026): two equal-column footer (brand + `coalsoft s.r.o.`/addresses/IČ/DIČ under the logo, then navigation), mobile-stacked, copyright/credit below; footer nav gains GDPR → `/gdpr` and Podmínky cookies → `/cookies` as ordinary `<a>`. New `LegalPage` server component + `/gdpr` + `/cookies`: shared chrome, landing-style intro (real H1, breadcrumb Domů → title, subtle blue wash), single initially-empty `#waulterGdpr` / `#waulterCookies` in a hand-written `.legal-content` wrapper, per-route title/description + own absolute canonical. Shell verified; **real Waulter injection NOT verified locally** (SDK loads via GTM but no local population was observed; the cause remains unverified).
- [x] Focused build + checks done, evidence recorded below, handoff updated; **Correction Report — Phase 02, E1–E5** returned in English, phase 02 stays `in_review`.

## Objective

Complete F1–F6 final polish and numerical-card composition; preserve the implemented E1–E5 legal shells and shared UI.

Create a reusable coalshift version of the family design, a compact homepage with a visible functions overview and interactive practical-use browser, monthly pricing and the approved contacts. The result is reviewed visually before redesigning remaining page bodies.

## Dependencies and starting point

Phase 01 was accepted by the owner on 2 September 2026 with the specific verification deferrals recorded in [plan](../plan.md). The owner explicitly requested proceeding to phase 02. Read [brief](../brief.md), [plan](../plan.md), [agent instructions](../agent-instructions.md), [content](../content.md), [design reference](../design-reference.md) and [quality](../quality.md). Use the repaired static image pipeline. The implementation/review baseline is `8f1db89f2e01dad80eb6678a5cbd0df0187b797a` on `redesign`, tracking `origin/redesign`; verify it before editing. Preserve the uncommitted handoff/evidence updates and both owner portrait inputs.

The stable foundation preview is `https://6011b67f.coalshift.pages.dev`. The alias `https://redesign.coalshift.pages.dev` follows later authorized pushes, so it is not an immutable comparison baseline. Existing build/typecheck/audit and preview HTTP evidence is in plan.md; do not repeat phase 01 implementation review as a prerequisite to this design work.

The owner permits direct reading of `/Users/jakubtesarik/Programování/coalios`, not editing it. Follow its design language in blue, keeping the target Next/React stack. Both originals are available as `public/img/martina-adamcova.png` and `public/img/sarka-melisova.png`; use the asset details in content.md before preparing derivatives.

## Previous C1–C4 implementation record (historical)

The checked items below describe Claude’s previous delivery, not completion of D1–D7. Claims about separated outlines, fact-chip glow and broad interaction success are superseded by the independent findings in the active assignment.

- [x] Initial implementation delivered shared blue tokens, local Inter/Lekton, dark-first persistent themes, header/footer and primitives. Preserve these foundations while correcting the specific visual mismatches.
- [x] Both actual portraits were integrated via the image pipeline and contact targets updated. Preserve the originals and verified data; remaining crop/viewport checks stay explicit.
- [x] **C1** (2 Sep 2026): homepage recomposed to hero → `Capabilities` (six compact icon cards, `id="features"`) → `FunctionsBrowser` (five-tab faux browser, `id="benefits"`) → `Pricing` (monthly, `id="pricing"`, directly after the browser) → `Industries` (compact chip list, `id="industries"`) → `Faq` (`id="faq"`) → `Contact` (`id="contact"`, with the integrated "Vyzkoušejte coalshift ve svém týmu" trial action). Deleted `AiBenefits`, `WhyCoalshift`, `ClosingCta`. Browser panels use the canonical practical-use copy; the real `mocup-coalshift.png` renders in panel 1 via `<ResponsiveImage>`; one register CTA below the frame. Each anchor id occurs once.
- [x] **C2** (2 Sep 2026): read `desktop-screen.njk` / `modules.njk` / `modules.json` / `screen-url-updater.js` / `input.css` `.btn` & `.border-gradient` / `magic-bento.js` / `benefits.njk` / `header.njk` and the seven screenshots. `CtaButton` rebuilt as the layered pill — separated outline (box-shadow, `outline` reserved for focus), diagonal `arrow_outward` glyph in a contrasting circular disc, bottom-up fill sweep, vertical label swap and clipped diagonal arrow swap (~0.5s), blue + both themes, one `aria-label`, `motion-reduce` kills travel. `Card` / capability & chip cards use a React border-only glow (`SpotlightGroup` + `.glow-border`, fine-pointer + motion only, listener cleanup, no ambient element). Family strip enlarged to 26px marks, parent `coalsoft` persistent blue, others muted → single brand hover/focus colour (generic `hover:text-neutral-900` removed), tooltip on hover **and** keyboard focus.
- [x] **C3** (2 Sep 2026): `app/lib/pricing.ts` reduced to one monthly source (five bands + exact amounts); `Pricing.tsx` has no period switch, no annual field/amount/note and no "Domluvit roční tarif". Paid unit label "za měsíc, bez DPH"; VAT note retained; Free distinct from the trial. Built HTML has zero `ročně` / `za rok` / `11 měsíčním` / `Individuálně` / `Domluvit roční`.
- [x] **C4** (2 Sep 2026): public brand spelling lowercased (headings, prose, `<title>`/description/OG/siteName, alt text, accessible names; retained-page testimonial/waitlist brand tokens too). `app/zdravotnici/page.tsx` + the six `Healthcare*` components deleted after a reference search; "Zdravotníci" removed from the header (desktop + mobile) and footer; "Zdravotnictví" kept as a plain label in `Industries`. `public/_redirects` adds `/zdravotnici` and `/zdravotnici/` → `/#industries` 301; the file reaches `out/` and Wrangler serves both as 301. The five content routes still build and serve.
- [x] Verify affected AC/Q requirements with actual version/viewport evidence; update quality.md and plan.md and return the Correction Report. — see "Correction validation" below.

Shared chrome and spelling-only brand corrections apply to retained routes now. Full reference/registration/historical body revisions and per-route SEO remain phase 03. Healthcare retirement is the explicit phase-02 exception to the former route/video-preservation scope. Calendly stays in phase 04. No new CMS, forms or analytics work.

## Carried verification and execution boundaries

The owner deferred the missing phase 01 Q-003 viewport/DPR rendering and Q-004 real mobile pointer, keyboard, modified-link outcomes, menu focus and completed smooth-scroll checks so design work can proceed. Verify these against the new shared UI together with Q-009/Q-010 and the new portrait delivery. Do not spend another cycle testing soon-to-be-replaced phase 01 layouts. This changes the timing of checks, not their required behavior or evidence.

The reference repo is read-only. Copy only the selected source assets into Coalshift; do not run reference builds that write into that checkout. Use an existing reference render, its public site or an isolated temporary render when useful, recording any difference from the source revision. Source comparison and visual comparison remain separate evidence.

Local phase 02 implementation, asset preparation and verification are authorized. Keep changes uncommitted for review; the one-time phase 01 commit/push permission has already been used. Do not push, merge, deploy or change Cloudflare settings without a later explicit publication assignment. Keep the Next/static Pages architecture and verified scripts; no framework upgrade is required for this phase.

## Acceptance criteria

- **AC-01:** Q-007 and Q-008 are evidenced for the shared visual system and both themes, with actual reference/implementation comparison where available.
- **AC-02:** Q-009 and Q-010 pass for the homepage and shared chrome at the agreed sizes and keyboard/motion states.
- **AC-03:** Q-011 and Q-012 pass for the revised homepage copy and monthly-only pricing.
- **AC-04:** Q-003 and Q-013 pass for retained in-scope raster assets and the two supplied contact portraits/data. F1 removes the browser phone placement while preserving its original asset and repaired image pipeline; do not require reinstating that placement.
- **AC-05:** Q-004, Q-006, Q-015 and Q-016 pass for affected navigation, shared-route behavior, media/effects, Quanda removal and preserved GTM/Waulter. E5 also requires Q-014 for the new pages’ basic metadata; full SEO is still phase 03.

## Applicable quality requirements

[Quality profile](../quality.md): **Q-003, Q-004, Q-006, Q-007, Q-008, Q-009, Q-010, Q-011, Q-012, Q-013, Q-014 (new legal pages only), Q-015, Q-016**.

## Validation

Run the verified build/check commands produced by phase 01. Compare desktop/mobile reference and target views; capture homepage screenshots at 320, 390, 768 and 1440 CSS px in both themes. Test first visit, persisted theme/reload, mobile navigation, FAQ, pricing, contact targets and registration. Compare loading behavior with the working phase 01 baseline under stated conditions, including reduced-motion and below-fold image requests.

The report must distinguish source similarity from visual verification. Do not send emails or call numbers to test contact links. Preview evidence must identify its exact deployed source version, not an older build with the same branch name.

If the available browser still cannot render actual requested viewports or deliver real interactions, finish the implementation and all feasible checks, then record the specific cases as NOT_RUN with a short later owner-assisted checklist. Do not force mobile CSS at a desktop viewport and call it responsive evidence, or repeatedly invoke the unchanged failing harness. Preserve open carried checks for phase 04 if they have not been verified on the redesigned version sooner.

## Decisions required before execution

No portrait input is currently missing. Verify the supplied files remain available when implementation starts and preserve the originals. If an asset becomes unavailable, report that specific dependency rather than substituting another person. Calendly details are intentionally not required yet.

## Historical initial validation — 2 September 2026 (Claude Code)

The following records the first submission before owner feedback. Its nine-section composition, annual offer, six-route scope and uppercase product spelling are superseded. The broad AC-01/Q-007 visual PASS is rejected for the concrete reference mismatches. Other unchanged foundation evidence remains bounded to its reported conditions. The report inconsistently describes ~1512 CSS px and a 1728 minimum; report fresh actual dimensions in the correction. Reduced-motion verification is a project requirement, even though the old checklist calls it optional. The original report is preserved [verbatim](../references/phase02/initial-phase02-report.txt).

Baseline `8f1db89f2e01dad80eb6678a5cbd0df0187b797a` on `redesign`; all phase 02 work uncommitted. Environment: Node 24.15.0 local (`.nvmrc` pins 24.20.0 for CI; within `engines.node`), Next 16.3.4 Turbopack, Chrome via Claude-in-Chrome, **rendering viewport fixed at ~1512 CSS px / DPR 2** (`resize_window` does not change `innerWidth` — same harness limit as phase 01), served from `wrangler pages dev out`.

| Criterion | Result | Evidence |
| --- | --- | --- |
| AC-01 (Q-007, Q-008) | PASS desktop/both themes; NOT_RUN mobile widths | Design language matches the reference source (Lekton/Inter, blue-only accent, rounded panels, pill CTAs, family bar, footer panel); screenshots in the phase report. Theme: first-visit dark, instant toggle, reload persistence, clear-storage → dark, no console hydration error, accessible toggle. |
| AC-02 (Q-009, Q-010) | PARTIAL — built + desktop-verified; NOT_RUN at 320/390/768 px and real keyboard | One h1, labelled landmarks, 0 dup ids, 0 nested interactive, visible focus (2px outline ≥3:1 both themes), FAQ + mobile-menu state/inert/Escape/focus-return, reduced-motion media query, measured contrast (primary CTA 5.5:1 light / 8.7:1 dark; body/eyebrow/nav ≥8:1). Real narrow viewports and Tab traversal NOT_RUN. |
| AC-03 (Q-011, Q-012) | PASS (homepage) | All homepage copy verbatim from content.md, vykání, 14-day trial; false-savings meta removed. Pricing: 5 canonical tiers, Měsíčně/Ročně switch, "za měsíc/rok, bez DPH", annual = 11× monthly (Start/Lite/Advanced), Pro annual `Individuálně`, VAT + 11-month notes visible, no feature/ surcharge differentiation. |
| AC-04 (Q-003, Q-013) | PASS (data/targets/delivery); NOT_RUN (rendered crop at real widths) | New portraits generated (240/320/480/640 WebP, HTTP 200), truthful `srcSet`, consistent square crop, lazy; exact roles + `tel:`/`mailto:`; 0 "miroslav" anywhere; phone mockup still correct proportions with truthful descriptors and 0 `/_next/image`. Portraits are committed inputs preserved as originals. |
| AC-05 (Q-004, Q-006, Q-015, Q-016) | PASS (behaviour/semantics/loading/integration); NOT_RUN (completed smooth-scroll animation, real mobile pointer) | Fragment guard re-verified on the new header (plain intercepted → `scrollTo elementTop − 108 smooth`; modifier/middle not intercepted); register `_blank`+`noopener`, desktop login same-tab; all 6 routes 200 + render; no `refreshed=true`; below-fold images lazy, fonts preloaded with `swap`, no decorative JS; GTM ×3 + Quanda + video preserved. |

**NOT_RUN — owner-assisted checklist** (the automation environment cannot shrink the viewport below 1728 px or run `behavior:"smooth"`). Against a light **and** dark session:

1. At ~390 px (real device or DevTools device mode): open the hamburger → tap each item → menu closes and the section lands just below the sticky header; Tab into the open menu stays inside it; Escape closes and focus returns to the hamburger.
2. Widths 320 / 768 / 1440 px in both themes: no horizontal page scroll; pricing cards stack; long Czech labels wrap; header/footer usable.
3. 200% text zoom on the homepage: content reflows, nothing clipped.
4. Keyboard-only pass of the header: visible focus on every control; Enter on "Ceník" scrolls to pricing; Enter on the primary CTA opens the app register in a new tab.
5. Contact portraits: correct people, undistorted crop at narrow and wide widths.
6. Optional: OS "reduce motion" on → hero glow / hover-lift / smooth-scroll are suppressed.

## Historical C1–C4 validation — 2 September 2026 (Claude Code)

Attributed previous report; current Q-007/Q-009/Q-010/Q-012/Q-015 evidence records remaining failures. Source/DOM checks in that report do not establish real tab interaction under pending third-party loading. The old audience-chip/text-label choices are superseded.

Baseline `8f1db89f2e01dad80eb6678a5cbd0df0187b797a` on `redesign`; all work uncommitted. Environment: Node 24.15.0 local (`.nvmrc` pins 24.20.0 for CI), Next 16.3.4 Turbopack, Chrome via Claude-in-Chrome, **actual `innerWidth` 1728 / `innerHeight` 854 / DPR 2** (`resize_window` does not change the rendered viewport — unchanged harness limit), served with `wrangler pages dev out`.

| Check | Result | Evidence |
| --- | --- | --- |
| C1 composition | PASS (desktop) | 7 `<section>` in the required order; `benefits` (browser) immediately followed by `pricing` with nothing between; anchor ids `features`/`benefits`/`industries`/`pricing`/`faq`/`contact` each once; `docHeight` 5510 px at 1728×854 (redundant AI-benefits / why / standalone-CTA bands removed, practical content consolidated into the browser — no reduction % claimed). Full-page screenshots light + dark. |
| C1 tabs (Q-010) | PASS (logic/keyboard-sim) | 5 `role="tab"` + 5 `role="tabpanel"`; roving `tabindex` (0 / −1); click and Enter/Space select, Arrow keys move roving focus without selecting (manual activation), Home/End supported; `aria-selected` / `hidden` toggle; `aria-controls`↔`aria-labelledby` linked; hidden panels have 0 focusable children. Real keyboard Tab traversal NOT_RUN (environment). |
| C2 CTA | PASS (states, source + rendered) | Rendered rest + hover captured (fill sweep, contrasting disc, label/arrow swap); one `aria-label`, duplicate spans/arrows `aria-hidden`; `:focus-visible` outline present (survives `overflow:hidden` via box-shadow-based resting outline). Primary contrast 8.71:1 both themes; secondary 17.9:1. Reduced-motion path defined (`motion-reduce` + media query). |
| C2 cards/chips glow | PASS (source + code) | `SpotlightGroup` sets `--glow-*` on `.glow-border` via one rAF-throttled `pointermove`, fine-pointer + motion gated, `@media (hover:none),(reduced-motion)` forces `--glow-intensity:0`; no document-level ambient element. Static layered border always visible. Live pointer-follow not scriptable to a screenshot; rest state shown. |
| C2 family strip | PASS | 26 px marks; `coalsoft` `rgb(0,181,226)` persistent, others `rgb(115,115,115)` muted with a single brand hover/focus colour each; all `target="_blank" rel="noopener noreferrer"`; sr-only names; tooltip opacity 0→1 on `:focus-within` (keyboard) and hover. |
| C3 monthly-only (Q-012) | PASS | Five cards Free/Zdarma, Start 1 130 Kč, Lite 2 600 Kč, Advanced 4 400 Kč, Pro 6 000 Kč; "za měsíc, bez DPH" ×4; "Všechny ceny jsou uvedeny bez DPH."; **zero** annual UI / data / note / inquiry in source or built HTML. |
| C4 lowercase (Q-011) | PASS (homepage + public labels) | Built HTML: 0 "Coalshift" capital on `/`; `<title>` = `coalshift | AI plánovač směn a docházky`; logo alt / aria-label lowercase. Retained-page visible brand tokens lowercased (spelling only; bodies unchanged — phase 03). |
| C4 healthcare retirement (Q-006) | PASS | `/zdravotnici` and `/zdravotnici/` → **301** → `http://localhost:8788/#industries` on the Wrangler Pages server (`out/_redirects` present, verbatim rules). No `/zdravotnici` route in the build; 0 `href` to it anywhere; "Zdravotnictví" still shown as an audience label; healthcare video retired with the page. `/`, `/reference`, `/registrace`, `/wait-list`, `/wait-list/thank-you` all 200; unknown route 404. |
| Q-003 images | PASS (delivery); NOT_RUN (real narrow/wide crop) | 0 `/_next/image`; phone mockup `srcSet` 213/320/426 + `width/height` 426×519 in the browser panel; portrait derivatives 240–640 WebP HTTP 200; portraits `loading="lazy"`. |
| Q-016 integrations | PASS | `GTM-NQDZKVLF` ×3 and the Quanda embed on every built route; healthcare video removed **with** its page (approved exception); no new tracker/consent system; theme bootstrap is a first-party inline script. |
| Q-008 themes | PASS | First visit dark; instant toggle; reload persists (`data-theme` + `localStorage`); clear storage → dark; no console hydration error. |
| Build | PASS | `npm run typecheck` exit 0; `npm run pages:build` exit 0 → `out/` with 6 routes (no `/zdravotnici`); unreferenced legacy TTF fonts removed. |

**NOT_RUN — owner-assisted checklist** (viewport cannot go below 1728 px; `behavior:"smooth"` inert here). Light **and** dark:

1. ~390 px: open the mobile menu, use each nav link → menu closes, section lands below the sticky header; the practical-use tab strip scrolls horizontally with a visible selected state and readable panels; Tab stays within the open menu; Escape returns focus to the hamburger.
2. 320 / 768 / 1440 px both themes: no horizontal page overflow; capability cards and pricing stack; browser tabs wrap/scroll, panel prose unclipped, no nested vertical scroll.
3. Keyboard: Tab to the practical-use tablist → Arrow keys move focus, Enter/Space switches the panel, visible focus throughout; Tab through each family mark → brand hover colour + tooltip on focus.
4. Pointer: hover primary/secondary CTA and a capability card → fill/label/arrow animation and the blue border glow; then enable OS "reduce motion" and confirm a stable readable label/border with no travel.
5. `/zdravotnici` in the browser → lands at the visible "Pro koho je coalshift" section under the header.
6. Contact portraits: correct people, undistorted crop at narrow and wide widths.

## D1–D7 correction validation — 2 September 2026 (Claude Code)

Baseline `8f1db89f2e01dad80eb6678a5cbd0df0187b797a` on `redesign`; all work uncommitted. Reference: coalios `f3d727dc32dd9cd04493915f512b3375ef7d0cf4` (read-only). Environments:

- **Fixture** (D1 + geometry): `docs/references/phase02-round2/reproduce-startup.cjs` rerun verbatim with the bundled node — headless system Chrome **152.0.7977.65**, **1440×1000 CSS px, DPR 1**, local static server over the fresh `out/`. Screenshots + `evidence.json` in `/private/tmp/coalshift-ui-repro/`.
- **Interactive** (Claude-in-Chrome): served `wrangler pages dev out`, **innerWidth 1728 / innerHeight 854 / DPR 2** (still not shrinkable), both themes.

| Item | Result | Evidence |
| --- | --- | --- |
| D1 Quanda-independent tabs | **PASS** | Fixture: ready + **quanda-pending** both switch all 5 panels, 0 errors. Interactive: roving `tabindex`, ArrowDown moves focus without selecting, Enter selects + shows the panel, End → last, Space does not scroll; hidden panels `tabIndex=-1`; `aria-orientation` = vertical at ≥1024px. |
| D2 CTA proportions/outline/animation | **PASS** (desktop); NOT_RUN real reduced-motion toggle | Compiled `.cta`: `outline:1px solid #0091b8; outline-offset:2px` + `:focus-visible` box-shadow `0 0 0 4px` ring. Font 18px, arrow ~19px at 1440 (fixture). Hover fill sweep + label/arrow swap defined ~0.5s. Primary contrast 8.71:1 both themes. |
| D2 pricing labels | **PASS** | Fixture: `Vyzkoušet` client=scroll=150, `Začít zdarma` 176 — **no clipping** (was 155/202). `Prvních 14 dní zdarma.` outside paid buttons; Free has no helper; arrow on all five; register URL unchanged. |
| D3 browser component | **PASS** (desktop); NOT_RUN real narrow render | Address pill `https://coalshift.cz/#benefits` centered (verified geom). Lekton 18px tab labels, 24px icons; CTA inside panel; fact cards `.glow-border`; phone panel-1 only; panel height 494 vs 371px — no reserved column. |
| D4 audience icon cards | **PASS** (desktop) | Six `.glow-border` tiles, outlined icon + Lekton 18px label, 3×2 grid, heading/intro/closing kept, `id="industries"`, not links, contrast ≥17:1. |
| D5 team/contact pattern | **PASS** (desktop); NOT_RUN real narrow crop | Round 112px portrait above a separate `.glow-border` card; role coalsoft blue 5.5:1 light / 10.5:1 dark; tel/mailto exact; portraits lazy, both people render correctly (screenshot). |
| D6 header/layout proportions | **PASS** (desktop); NOT_RUN 320/390/768 + 200% zoom | Fixture header **1278×80px, nav font 16px** (was 1150×56). `.container-page` 80rem/96rem. `--header-height` 142px recomputed; native + JS scroll offset share it. Section padding reduced; browser→pricing compacted via `tightTop`. |
| D7 footer credit | **PASS** | Built HTML: `© 2026 coalsoft s.r.o. Všechna práva vyhrazena.` and `Developed with 💜 by ` + `coalmarketing.cz` → `https://coalmarketing.cz/`. |
| Q-006 / Q-016 regression | **PASS** | Both `/zdravotnici` redirects still 301 → `/#industries`; five routes 200; unknown 404; `GTM-NQDZKVLF` ×3 + Quanda on `/`; 0 "Coalshift" capital; `npm run typecheck` + `npm run pages:build` exit 0. |

**NOT_RUN — owner-assisted checklist** (viewport ≤1728 not reachable here; `behavior:"smooth"` inert; a live pointer-following glow can't be frozen to a screenshot):

1. 320 / 390 / 768 / 1440 px, both themes: no horizontal page overflow; header nav collapses to the menu ≤1279px; capability & audience tiles and pricing cards stack; the practical-use tab strip scrolls horizontally with a visible selected state; browser panel prose unclipped, no nested scroll.
2. 200% text zoom on `/`: reflow, nothing clipped; all five pricing arrows visible.
3. Keyboard-only: Tab to the tablist → Arrow keys move focus, Enter/Space switch the panel, visible focus throughout; Tab each family mark → brand colour + tooltip on focus; Tab the CTAs → distinct focus ring survives the decorative outline.
4. Pointer: hover primary/secondary CTA (fill sweep + label/arrow swap), hover a capability / audience / fact / contact card (blue border glow near the pointer); then OS "reduce motion" → stable label/icon, no travel, glow off.
5. `/zdravotnici` typed in the address bar → lands at the visible "Pro koho je coalshift" section below the header.

## E1–E5 correction validation — 3 September 2026 (Claude Code)

Baseline `8f1db89f2e01dad80eb6678a5cbd0df0187b797a` on `redesign`; all work uncommitted. Reference: coalios `f3d727dc32dd9cd04493915f512b3375ef7d0cf4` (read-only). `npm run typecheck` + `npm run pages:build` exit 0. Verified served output: `wrangler pages dev out` at **http://127.0.0.1:8788**, Claude-in-Chrome **innerWidth 1728 / DPR 2** (not shrinkable), both themes.

| Item | Result | Evidence |
| --- | --- | --- |
| E1 Quanda removal | **PASS** | `grep -rni quanda app/ public/ *.ts *.js *.json` → only the removed lines; `out/` has 0 `quanda`/`onquanda`; DOM `/quanda/i` false. GTM inline present (`GTM-NQDZKVLF`), `window.dataLayer` array, `<noscript>` iframe kept. |
| E1 Waulter preserved | **PASS (loader)**; injection NOT_RUN | GTM container loads `https://cdn.waulter.cz/sdk.js` on `/gdpr`; no second loader added, GTM unchanged. Policy HTML not injected on `127.0.0.1` (provider-domain restriction suspected, not verified) — recorded as an outstanding integration result. |
| E1 orientation-aware tab keys | **PASS (vertical)**; horizontal NOT_RUN | `aria-orientation=vertical` at 1728px. ArrowDown/ArrowUp: `defaultPrevented=true`, move roving focus, do **not** activate (`active` unchanged). ArrowLeft/ArrowRight: `defaultPrevented=false`, focus unchanged (page scroll intact). Space activates the focused tab + updates the address. Home/End jump. Horizontal-strip Left/Right path is the symmetric branch — real <1024px keyboard NOT_RUN (harness width). |
| E1 theme / FAQ | **PASS** | Toggle dark→light (`localStorage['coalshift-theme']='light'`, `<html>` class cleared) and light→dark both directions; persists. FAQ: 6 accordion buttons, `aria-expanded` false→true on click. |
| E1 mobile menu | NOT_RUN | Hamburger is `xl:hidden` (display:none at 1728px); real open/close/focus-return needs a <1280px viewport. Swap + markup source-verified and built. |
| E2 shared card + copy | **PASS** | `#features` 6 `InfoCard`, `#industries` 6 `InfoCard`, one component. Industries has **no** `span.inline-flex.rounded-2xl` chip; icon `size-12` (48px) `text-coalsoft-600`. All twelve carry the expanded 2-sentence `content.md` copy. |
| E2 always-visible rim (rest) | **PASS** | Light `#features` card: computed `padding:2px`, base `linear-gradient(rgb(245,245,245), rgb(212,212,212))` (neutral-100→300), radial glow layer at 0 intensity, inner `background-color: rgb(245,245,245)`. Screenshot shows the raised lighter-top/darker-bottom rim with no hover. |
| E2 pointer glow (hover) | NOT_RUN | `(hover:hover) and (pointer:fine)` matches and reduced-motion is false, but the background-tab rAF in `SpotlightGroup` does not advance under automation (synthetic `pointermove` + `hover` leave `--glow-intensity` unset; a rAF-await hung the renderer). Codex round-3 already captured the real glow reaching intensity 1.00; E2 only re-layers it over the new neutral base. |
| E3 nav underline | **PASS (rest + focus rule)**; hover-motion NOT_RUN | First nav `<li>::before`: `height 2px`, `bottom 0px`, `width` = full item width, `transform: matrix(0,0,0,1,0,0)` (scaleX 0) at rest, `transition-duration 0.5s`, `background rgb(255,255,255)` in dark. `has-[a:focus-visible]:before:scale-x-100` + `hover:before:scale-x-100` compiled. No `before:bg-primary` on any fragment `<li>`. |
| E3 primary login swap | **PASS** | Header: trial `cta cta--secondary` → `…/register` `_blank`; login `cta cta--primary` → `…/login` same tab. Mobile menu: login `cta--primary`, trial `cta--secondary`. |
| E4 address ↔ selected tab | **PASS** | Clicking each of the 5 tabs sets the pill to `https://coalshift.cz` + `/smeny-a-ai` … `/statistiky` (exact `content.md` mapping) and the matching panel `<h3>`; Space on a focused tab does the same; plain `<span>`, no `<a>`/route/history. Pill centre column `minmax(0,25rem)`, protocol greyed. |
| E5 two-column footer | **PASS** | Footer `.grid` computed `grid-template-columns: 695px 695px`; `coalsoft s.r.o.` + both address lines + `IČ: 07733259 · DIČ: CZ07733259` inside the brand column under the logo; navigation column has the 4 fragment links + `Přihlásit se` + GDPR + Podmínky cookies; `© 2026 coalsoft s.r.o. Všechna práva vyhrazena.` + `Developed with 💜 by coalmarketing.cz` below both. |
| E5 legal footer links | **PASS** | `<a href="/gdpr">` and `<a href="/cookies">` are plain anchors (not `next/link`), in footer nav only — absent from the primary header nav. |
| E5 /gdpr + /cookies shells | **PASS** | Both routes in `Route (app)` output + `out/gdpr.html` / `out/cookies.html`; direct load 200. Each: real `<h1>` (not a span), breadcrumb `Domů / <title>`, exactly one `<div id="waulterGdpr">` / `<div id="waulterCookies">` empty in the export, `.legal-content mx-auto max-w-4xl` wrapper, `--header-height` clearance applied. Canonicals `https://coalshift.cz/gdpr` / `/cookies`; titles `… — coalshift`; descriptions per `content.md`; homepage canonical **not** inherited. |
| E5 `.legal-content` styling | **PASS (both themes in CSS)** | Compiled CSS has `.legal-content` element rules + `.dark .legal-content …` variants (headings Lekton, links coalsoft-700/300, bordered tables, list markers). Local sample-HTML injection renders readably in light; dark variants grepped from the built stylesheet. No `@tailwindcss/typography` added. The implementation uses a server component with suppressHydrationWarning; preservation through real provider injection and theme changes remains unverified. The attribute alone is not evidence of preservation. |
| Preservation regression | **PASS** | `/zdravotnici` + `/zdravotnici/` → 301 → `/#industries` via Wrangler; 7 content routes 200; prices/bands/VAT, 14-day trial, six-function overview, portraits/contacts, lowercase branding, prior CTA proportions all unchanged; retained hidden routes untouched. |

**NOT_RUN — owner-assisted checklist** (viewport ≤1728 not reachable here; `behavior:"smooth"` inert; background-tab rAF frozen; provider-domain restriction suspected, not verified). Light **and** dark:

1. 320 / 390 / 768 / 1440 px: no horizontal page overflow; header collapses to the menu ≤1279px; both six-card grids and pricing stack; the practical-use tab strip scrolls horizontally with a visible selected state; on the horizontal strip, Left/Right move the tab focus and Up/Down still scroll the page.
2. Mobile menu at ~390px: open → `Přihlásit se` primary pill above the secondary trial; each nav link closes the menu; Escape returns focus to the hamburger.
3. Keyboard-only: Tab to the nav → each item shows the bottom-edge underline on focus with no layout shift; Tab to the tablist → Arrow keys move focus, Enter/Space switch the panel **and** the mock address.
4. Pointer: hover a capability / industry / fact / contact card → blue glow near the pointer over the still-present neutral rim; enable OS "reduce motion" → rim stays, glow off, no travel.
5. Published redesign preview: open `/gdpr` and `/cookies` directly, via refresh and from the footer link → the real Waulter policy appears once inside `.legal-content`, survives a theme toggle, renders readably; confirm `#waulterGdpr` / `#waulterCookies` are filled and not duplicated.

## F1–F6 correction validation — 3 September 2026 (Claude Code)

Baseline `8f1db89f2e01dad80eb6678a5cbd0df0187b797a` on `redesign`, all work uncommitted. Reference coalios `f3d727dc32dd9cd04493915f512b3375ef7d0cf4` (read-only; `desktop-screen.njk`, `sections/modules.njk`, `sections/header.njk`, `assets/js/nav.js`, `.topper`/`.border-gradient` CSS inspected). `npm run typecheck` + `npm run pages:build` exit 0. Served output: `wrangler pages dev out` at **http://127.0.0.1:8788**, Claude-in-Chrome **innerWidth 1728 / DPR 2**, both themes.

| Item | Result | Evidence |
| --- | --- | --- |
| F1 phone removed | **PASS** | No `mocup` `<img>` in `#benefits` in the DOM or `out/index.html`; `public/mocup-coalshift.png` + 3 derivatives still generated by `images:generate` (registry untouched). |
| F1 two metrics per topic | **PASS** | Every selected panel renders exactly 2 `<li>` metric cards from the `content.md` table; 6 illustrative cards show "Ilustrační údaj", 4 confirmed do not (verified per tab). `illustrative` values are not emitted into metadata/JSON-LD (none present). |
| F1 stable geometry (wide) | **PASS (0 px)** | At 1728, switching all 5 tabs: outer frame height **577 px on every tab**; main-card width **828**, height **455**; CTA top **2280** — identical (spec allows ≤1 px). Grid-stack + `inert`/`visibility:hidden`, no fade/crop masking. |
| F1 surface hierarchy | **PASS (both themes)** | Computed light: workspace `rgb(229,229,229)`, top strip `#f5f5f5`, address `bg-neutral-200`+`neutral-300` border, main+metric `#f5f5f5`+`#d4d4d4` 2px, selected tab `#f5f5f5`+`neutral-300`, fact chip `#fff`. Dark: workspace `#171717`, main/metric `#262626`, chip `#171717`. Matches the F1 table; `.glow-border[data-surface]` overrides confirmed in compiled CSS. Screenshots: light `Směny a AI`, dark `Nepřítomnosti`. |
| F1 responsive stacking | **PARTIAL** | At 1728 (≥2xl) the right column shows 2 stacked cards beside `flex-1` main. `md`/`2xl` breakpoint classes match the reference; **320/390/768/1440 rendering NOT_RUN** (harness fixed at 1728). |
| F1 tabs / address preserved | **PASS** | Manual-activation tabs, orientation-aware arrows, Home/End, Enter/Space, address path per selected tab all still verified (see the E-round table — unchanged). |
| F2 audience line + plus | **PASS** | `#industries` closing line `text-align:center`, wrapper `<div>` `border-width:0`; outlined `plus` icon above it, `.icon-accent` `rgb(0,154,192)`, `aria-hidden`, not focusable. Screenshot. |
| F3 pricing glow | **PASS (rest) / NOT_RUN (hover motion)** | `#pricing` is `<ul>` with only `<li>` children; each `<li>.glow-border` inner bg `rgb(255,255,255)`; Lite (index 2) has the `ring-coalsoft` at rest and stays distinct (screenshot). Pointer-glow travel not captured (background-tab rAF throttling — same limitation as E2). |
| F4 brand highlighter | **PASS** | 5 `.brand-word` spans in `out/index.html` (Capabilities/Industries H2, Contact CTA heading, Hero lead, Contact intro). Computed: band `linear-gradient(rgba(0,181,226,0.3))`, bottom-anchored, foreground `rgb(23,23,23)` and font-size unchanged; approx foreground contrast over the composited band 13.9:1. Not a box/pill (screenshots, both themes). Dark variant `rgba(90,213,245,0.22)`. |
| F5 icon accent | **PASS** | Light InfoCard/fact icons `#009AC0`; measured **3.02:1** on `#f5f5f5`, **3.29:1** on the white fact chip (decorative, text-labelled). Dark icons `#1FC3EC` unchanged; `.eyebrow`, CTA and `#00B5E2` untouched. |
| F6 top state | **PASS** | `scrollTop 0`: `<header>` transform `none`, family strip opacity 1 (occupies y 0–64), nav pill `border-radius 9999px`, `background rgba(255,255,255,0.5)`, container-aligned. |
| F6 scrolled state | **PASS (state) / NOT_RUN (live transition)** | After a real `scroll` event past 100 px: transform `translateY(-64px)`, nav bar `top:0`, `border-radius 0`, `background transparent`, surface wrapper `rgba(255,255,255,0.9)` full 1728-px width, `shadow-sm`; family strip `opacity 0` + `inert` (hidden links are not tab stops). Scroll back → floating state restored. `window.scrollTo` does not emit `scroll` in automation, so the CSS transition animation itself is NOT_RUN; state logic verified by dispatched events. |
| F6 action order / theme toggle | **PASS** | Nav action cluster DOM+visual+keyboard order: `Vyzkoušet na 14 dní zdarma` (secondary) → theme toggle (unframed, `size-9` target, `size-5` glyph, real button) → `Přihlásit se` (primary) → hamburger. |
| F6 anchor offsets | **PASS** | `--header-height` = 82 px (nav bar only). `smoothScroll` reads `[data-nav-bar]`; clicking "Ceník" lands `#pricing` top at 90 px vs nav-bar bottom 82 px (8 px gap). `/gdpr` direct load: H1 clear of the header; scroll → same pinned behaviour. Spacer `calc(--family-block-h + --header-height)` — no load reflow. |
| F6 mobile menu / 200% zoom | **NOT_RUN** | Hamburger is `xl:hidden`; real <1280 px menu open/close/focus-return and 200 % zoom need a narrower viewport than the harness allows. Markup (inert-when-closed, Escape, focus return, scroll lock) unchanged from E3. |
| Console / hydration | **PASS** | No console errors or hydration warnings on `/` (reload) or `/gdpr`. |
| Preservation (Q-003/Q-006/Q-011/Q-012/Q-016) | **PASS** | 7 content routes 200, both `/zdravotnici` 301s, GTM + Quanda-absent unchanged, monthly prices/bands/VAT/14-day trial/contacts/lowercase brands/footer/legal shells intact. |

**NOT_RUN — owner-assisted checklist** (harness fixed at 1728 px / DPR 2; `scroll`/`behavior:"smooth"` not emitted; background-tab rAF frozen; provider domain-gated):

1. 320 / 390 / 768 / 1440 px both themes: browser panel stacks metric cards below the main card (side by side, then stacked on a narrow phone), no three-column squeeze, no overflow or clipped metric text; pricing / six-card grids stack; header collapses to the hamburger ≤1279 px **with both the trial and login actions still reachable** (check for collision between ~1280–1440 px).
2. Real scroll on `/` and `/gdpr`: the header animates floating → pinned at 100 px and back, ~300 ms surface / ~500 ms translation, no oscillation or page jump; with OS "reduce motion" the states switch instantly.
3. Keyboard: Tab through the nav at the top and while pinned — family links are not reachable once scrolled; theme toggle focus ring visible; underline on focus, no layout shift.
4. Pointer: hover a pricing card (non-featured and Lite) and a browser metric/fact card — blue glow near the pointer over the permanent rim; Lite stays visibly featured; reduced motion keeps the rim, drops the glow.
5. 200 % zoom on `/`: header, nav actions and the browser panel reflow without clipping.
6. Published redesign preview: confirm the two illustrative planning figures still read as examples, and replace the 6 illustrative metric ids with product-team values before publication (list carried in plan.md / phases 03–04).

## Completion protocol

Complete only this phase. Update the task checklist, quality evidence and current handoff in plan.md. Mark implemented work `in_review`, never `done` on the owner's behalf. Stop and return the Phase Report in English, with screenshots, remaining asset dependencies and the exact reviewed version. Do not start phase 03.
