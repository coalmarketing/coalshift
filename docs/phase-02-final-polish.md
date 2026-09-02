# Phase 02 — Final design corrections F1–F6

Owner instructions: 3 September 2026, including the follow-up replacing the phone with numerical cards. This is one local correction assignment within phase 02. Its status remains solely in [plan](plan.md). Read the current [content](content.md), [design reference](design-reference.md), [quality](quality.md) and [evidence](references/phase02-round4/README.md).

## Starting point and boundaries

Target: `/Users/jakubtesarik/Programování/coalshift`, branch `redesign`, verified HEAD `8f1db89f2e01dad80eb6678a5cbd0df0187b797a`, with uncommitted phase-02 work. Reference: `/Users/jakubtesarik/Programování/coalios`, `main`, `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`. Verify these before editing. Read the reference; do not modify it or inspect coalios-manual.

Claude's E1–E5 report states typecheck/build success and records incomplete browser/provider checks. Codex confirmed the relevant source and the owner's screenshots; Codex did not run a fresh build or a new runtime matrix during this handoff. The previously withdrawn nonworking-tabs incident is closed. Do not diagnose cache, Quanda or hydration again without a new reproducible failure.

The owner now explicitly prefers two numerical cards per browser topic instead of the phone. Draft numerical examples are authorized for this design iteration; clearly distinguish them from confirmed facts. This supersedes the first-panel phone requirement and earlier prohibitions on all provisional metric content, only within this component. Preserve original assets and the repaired image pipeline for remaining images.

Local implementation and focused checks are authorized. Leave changes uncommitted. No push, deploy, Cloudflare/GTM change, dependency upgrade or next phase is assigned. Keep approved pricing, cards, contacts, legal shells and route behavior except for the changes below. The latest follow-up additionally requires the browser's exact light/dark surface hierarchy (F1) and the reference floating-to-pinned header, spacing and action order (F6).

## F1 — Stable browser composition with two numerical cards per topic

**Verified cause:** `FunctionsBrowser.tsx` renders the phone only for `i === 0`; its sibling text is `flex-1`. Removing that sibling in other panels expands the text and changes wrapping and total height. The owner's two screenshots show the resulting shift. A fade alone would conceal rather than resolve it.

Read the complete reference `src/_includes/components/desktop-screen.njk`, its data in `src/_data/modules.json`, `sections/modules.njk`, and border CSS. Port its tab rail → main content card → two supporting numerical cards arrangement, in coalsoft blue. Reuse the source hierarchy: large numeral, small topic badge, short explanation near the lower edge, gray surfaces and raised neutral borders. Source numbers and ERP claims are not coalshift facts.

**Surface hierarchy is part of F1, not optional polish.** The latest paired light/dark screenshots show that the target flattens surfaces which the reference deliberately separates. Port these actual source treatments; do not apply one shared background to the entire browser:

| Browser layer | Light reference | Dark reference |
| --- | --- | --- |
| Workspace behind tabs/cards | neutral-200 `#e5e5e5`, opaque | neutral-900 `#171717` |
| Top chrome strip | neutral-100 `#f5f5f5` | neutral-950 `#0a0a0a` |
| Address pill | neutral-200, neutral-300 1px border | neutral-800 `#262626`, neutral-700 `#404040` 1px border |
| Main content / both numerical cards | neutral-100, neutral-300 `#d4d4d4` 2px border | neutral-800, neutral-700 2px border |
| Selected tab | neutral-100, neutral-300 2px border | neutral-800, neutral-700 2px border |
| Small fact-chip interior | white `#ffffff` | neutral-900 |

Preserve the outer 2px layered neutral rim and radii from the reference, the separated top strip, centered address and blue adaptation of badge/icon accents. The target currently uses a translucent workspace, neutral-50 main panel and neutral-900 dark panel, which weakens these distinctions. Check `.glow-border > *` and utility interactions so generic card rules cannot flatten explicit browser surfaces. Use a scoped variant rather than changing all already-approved InfoCards/pricing/contact surfaces. Compare the rendered layers and border visibility in both themes; record computed backgrounds/borders alongside screenshots.

- Replace the phone in the browser with two numerical cards for **every** selected topic, including Směny a AI. Do not move the phone into another homepage section. Preserve its original file/registry/derivatives pipeline; no broad asset cleanup.
- Use the canonical numerical-card table in content.md. Keep value, unit, label, explanation and evidence status together in one small data model. Suggested statuses: `illustrative` and `confirmed`; keep stable IDs for easy later replacement. No new CMS, API or dashboard.
- Each illustrative card visibly includes the unobtrusive Czech note **Ilustrační údaj** near its number/label. The number is a layout example, not a measured product benefit. Confirmed counts are grounded in the listed product features. Do not silently promote an example to confirmed, remove its note, or reuse it in metadata, structured data, sales claims or another section.
- All five topics use the same column tracks, main-card width, internal text measure and supporting-card geometry at any given viewport. Address, main copy, facts and both numerical cards change from the **same selected-tab state**. Keep the five existing illustrative address paths; no actual feature routes/history entries.
- At wide desktop widths, keep the right column visible with two stacked cards and stable main-card/outer-frame height when switching. Derive sufficient space from the actual five texts; do not clip text, reduce font size or insert a nested vertical scrollbar. Keep the CTA aligned consistently near the main card's bottom.
- Follow the reference's responsive behavior: below a comfortable three-column width, place the two metric cards below the main content, side by side when they fit and stacked on a narrow phone. Avoid squeezing three desktop columns into 1024px. Selection must not change which layout/column widths are used. Keep the overall component compact; mobile text may take natural height, but must not be truncated or surrounded by a desktop-sized empty space.
- Preserve manual-activation tabs, orientation-aware arrow keys, Home/End, Enter/Space, focus visibility and hidden-panel exclusion from keyboard/accessibility navigation. Do not introduce duplicate accessible copies to obtain a stable height. Keep server-rendered content and static-export compatibility.

**Acceptance:** switch through all five tabs by real pointer and keyboard. At the same wide viewport, record main-card/text widths, outer-frame height and CTA position before/after; differences caused by selection should be at most 1 CSS px. Verify the responsive arrangement separately at 320/390/768/1440 and a wide 1728 CSS px comparison. Confirm two topic-appropriate metrics per selected tab, one visible panel, correct changing address, no visible phone, no overflow, and no layout-jump masking by animation. This is not a request for a CWV score.

## F2 — Centered audience closing line with a plus

Preserve exactly **A pro všechny další, kdo plánují směny.** Center it below the six audience cards. Add a clean outlined plus in the existing icon language, using the icon accent from F5. Give the line a little more typographic presence (approximately 18–20px, responsive) and balanced spacing without another tall section.

There is **no enclosing card, pill, border, background panel or extra CTA**. The plus is decorative, not a button or additional keyboard stop. A restrained one-off entrance or hover accent is optional; no endless rotation/pulse, and reduced motion must remain static. Keep the wording readable when it wraps on mobile.

## F3 — Pricing-card border glow

**Verified cause:** `Pricing.tsx` uses plain bordered list items and no `SpotlightGroup`/`.glow-border`, so the shared pointer highlight cannot appear there.

Apply the existing reference-derived layered border and pointer-local blue glow to all five pricing cards. Preserve the approved interior layout, white/light and dark surfaces, spacing, CTA proportions, short labels and helper text. Preserve the Lite card's persistent featured emphasis while adding the hover layer; it must not become indistinguishable at rest.

Reuse the existing effect, with only a small explicit variant if needed. Do not paste another global animation implementation. Keep valid list semantics (no div directly inside ul), full label/disc visibility and accessible CTA focus. The entire informational pricing card is not a fake clickable control. Check the border near an edge with genuine mouse movement, including a nonfeatured card and Lite, in light and dark; confirm the permanent rim survives pointer leave, reduced motion and coarse pointers. No pricing data, employee boundary, billing period, VAT or link change.

## F4 — Subtle blue highlighter behind the brand word

Create one small reusable decorative text treatment for **coalshift**, using the exact approved spellings and selected placements in content.md. Use a translucent coalsoft-blue stroke behind the lower roughly 70–75% of the lettering, with the upper portion clear. A slight angled/organic stroke is acceptable if it stays subtle. It must not look like a pill, label, filled box, underline-only line or selection highlight.

Keep the foreground text's normal theme color. Do not change its font size/weight or line metrics. No additional border, large padding, forced line break, hover requirement or entrance animation. Preserve readable wrapping, Czech inflections, one accessible text copy and text selection. Implement with CSS/a small React span component, not DOM-wide search/replace or injected HTML. Logos, navigation/CTA labels, metadata, legal/provider content and attributed testimonials are outside this decorative treatment.

Check the treatment in both themes at heading and paragraph sizes, including zoom. Measure foreground contrast against the composited highlight, rather than only the page background. No text replacement or duplicate screen-reader announcement.

## F5 — Brighter light-theme icon accent, close to the brand hue

Current bare icons and browser facts use `coalsoft-600` = `#0091B8`; the base brand is `#00B5E2`. Introduce a narrowly scoped icon token, initially **`#009AC0`**, for the light-theme bare information-card icons, browser fact icons and F2 plus. Preserve dark-theme icons and the exact parent-brand/CTA blue. Do not globally replace coalsoft-600: it also serves other text, borders and states.

Codex calculated opaque sRGB contrast for the candidate: 3.018:1 against `#f5f5f5`, 3.152:1 against `#fafafa`, 3.290:1 against white. This is a computed starting point, not a rendered approval. Verify actual computed color, background and opacity; adjust minimally if the actual pair requires it. Normal text still follows Q-010's 4.5:1 rule. Text-labelled decorative icons are not automatically required control boundaries; nevertheless retain this useful visibility target on the changed light surfaces. Keep gray card backgrounds and existing icon shapes/sizes.

## F6 — Reference floating and pinned header, spacing and action order

Read `src/_includes/sections/header.njk`, `src/assets/js/nav.js` and relevant compiled CSS in the reference. Source verification: `nav.js` toggles the scroll state at **scrollTop >= 100px**. The header template moves the family strip out of view, expands the header surface and removes rounding. The target currently has no corresponding scroll state and keeps its rounded fixed bar and family strip throughout scrolling.

- **At page top:** family strip visible, separated from a centered floating rounded navigation container. Port reference padding, roughly 48–56px family strip, 8–16px separation, 80px desktop navigation items and 50%-opaque white/black floating surface. Keep the approved family marks, colors and destinations.
- **Scrolled state:** use the reference's 100px transition point, with initial synchronization after refresh/scroll restoration. Move the family strip out of view; the navigation background spans the full viewport width, sits flush at top:0 and has no pill radius, top gap or residual side frame. Its content remains aligned to the page container. Use white/90 or black/90 with the source's restrained shadow/bottom separation; do not substitute an opaque rounded pill or heavy blur. Scrolling back to the top restores the floating state.
- **Motion:** port approximately 300ms surface/padding/radius transitions and 500ms outer translation, respecting reduced motion. Avoid scroll-state oscillation, page jumps or duplicate sticky headers. Adapt the behavior into scoped React/CSS with proper listener cleanup; do not paste the global reference script wholesale.
- **Desktop action order:** navigation → existing secondary trial action → theme switch → primary **Přihlásit se**. The switch is immediately before the primary action, not after it. Preserve the existing trial/login targets and primary/secondary hierarchy. Match the reference's unframed sun/moon control (roughly 28–32px target, 20–24px glyph), while retaining a real accessible button, visible keyboard focus and adequate hit area. Its visible order and keyboard order must agree.
- **Spacing/type:** compare the source's fluid nav-list gaps (~8–24px), link padding (~6–16px) and 16px navigation type, outer group gap and logo alignment. Keep the bottom-edge underline. Match the actual spacing system rather than just replacing a gap value with another guess. Coalshift has an extra secondary CTA; preserve it without compressing labels or colliding at intermediate widths. If the actions genuinely do not fit, use the existing compact navigation with both actions available, documenting the necessary content-driven breakpoint.
- **Offsets and mobile:** keep a stable document-flow spacer separate from the currently occupied fixed-header height if required. Update shared native/JS fragment clearance to the visible bar, not the old full family-strip wrapper or its transformed offsetHeight. Check the existing smoothScroll helper as part of this header change. Hidden family links must not remain offscreen keyboard targets. Preserve mobile menu open/close, Escape, focus return, scroll lock and reachable actions. Theme control stays visible in the compact header. Do not copy unrelated reference dropdown pages or mobile-menu defects.

**Acceptance:** compare top and scrolled states in both themes at matched reference/target dimensions. Record header top edge, full-width background extent, radius, alpha and action order. Test across the transition in both directions, direct load with a fragment, normal homepage section links and entry from a legal page; observe final anchor clearance and preserve modified-link semantics. Check real mobile menu/focus and 200% zoom/reflow for the touched header. No new route or content-body redesign is assigned.

## Validation and handoff

Affected requirements: **Q-004, Q-007, Q-008, Q-009, Q-010, Q-011, Q-012, Q-015**, with **Q-003** limited to preserving remaining images/pipeline after authorized phone removal and **Q-006** to shared-header navigation/direct-fragment regression. Q-016's real provider-delivery check remains separate and unverified; do not reopen integrations during this polish.

1. Record current root/branch/HEAD, uncommitted scope and reference revision. Capture relevant before states at known dimensions before editing.
2. Run the existing `npm run typecheck` and `npm run pages:build`, then serve the fresh `out` locally using the existing preview command on a free port. Record exact URL, browser, viewport and DPR. Do not call `deploy` as a test or confuse the old phase-01 preview with this work.
3. Perform the focused F1–F6 checks above on served output with genuine input. Save wide before/after and all five panel states; include narrow layout, audience line, pricing rest/hover and brand highlight close-ups in both themes. Inspect console/hydration errors, hidden focus targets, reduced motion and overflow. Reuse checks for unchanged components instead of broadening the audit.
4. A fixed-size/background-throttled Chrome bridge does not establish that all browser verification is impossible. Use a foreground tab or a permitted isolated local Playwright/Chrome session when available; the previously working diagnostic is archived under references/phase02-round3. Use only a disposable browser profile and close only resources created for this assignment. Do not bypass tool access restrictions. If unavailable, report the specific untested cases honestly; synthetic events/CSS inspection do not pass real pointer checks.
5. Update F1–F6 checklist, affected quality evidence and plan's current handoff. Keep the original E report untouched. Distinguish completed implementation, illustrative metric data, owner design acceptance and unrun checks. Carry the metric confirmation/replacement list into phase-03 content review and phase-04 release handoff; do not publish unconfirmed examples as verified claims.

Return **Correction Report — Phase 02, F1–F6** in English: each item, files changed, actual check/evidence, remaining limitations, exact current review URL, metric statuses and actual Git/deployment actions. Leave phase 02 in_review and all changes uncommitted. Complete only this assignment, then stop. The next intended workflow step is a review of the complete phase-02 implementation, not automatic phase 03 or publication.
