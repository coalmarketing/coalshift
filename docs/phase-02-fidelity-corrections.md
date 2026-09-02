# Phase 02 — Reference fidelity and working interactions (D1–D7)

> Historical D1–D7 material. Current assignment: [F1–F6](phase-02-final-polish.md). The owner now removes Quanda, requests changing display-only browser paths and adds Waulter policy pages; do not execute this older prompt or restore superseded instructions.


## Current assignment

One local phase-02 correction, following the owner's second visual review on 2 September 2026. Phase 02 remains `in_review`; phase 03 is not assigned. Correct the existing uncommitted implementation on `redesign`, baseline `8f1db89f2e01dad80eb6678a5cbd0df0187b797a`. Preserve unrelated changes. No commit, push, deployment or Cloudflare change is authorized.

Read [agent instructions](agent-instructions.md), [plan](plan.md), [content](content.md), [design reference](design-reference.md), [quality](quality.md) and [evidence](references/phase02-round2/README.md). This assignment supersedes conflicting C1–C4 details, including the browser's text-only label, audience chips and long pricing CTA labels. Keep the six-function overview, five browser topics, monthly offer, lowercase brands, healthcare redirect and other five content routes.

**Owner's binding instruction:** `/Users/jakubtesarik/Programování/coalios` is the source for the design system, interaction patterns, layout, typography, spacing and content composition. Whenever uncertain, find and read the matching component, data, styles and behavior there before choosing an implementation. Port the actual pattern into React; adapt the blue identity, approved coalshift copy and necessary responsive/accessibility behavior. Do not redesign an existing reference pattern from memory or approximate screenshots with smaller generic components. Preserve product facts from content.md; coalios ERP claims are not coalshift facts. Reference revision: `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`. Read-only; never inspect `coalios-manual` or introduce a sibling checkout build dependency.

## D1 — Make the five tabs work independently of third-party loading

**Verified:** all five panels already contain the approved text. On the existing exported artifact, genuine pointer clicks select all five panels when third-party script requests complete. In a controlled fixture leaving only the Quanda embed request pending, every click leaves the first panel selected. Chrome 152.0.7977.65, 1440×1000 CSS px, DPR 1; see saved script/JSON/screenshots. This reproduces a failure condition, not the owner's original network trace or a verified provider outage.

`app/layout.tsx` loads Quanda with `beforeInteractive`. In the installed Next 16.3.4 `app-bootstrap.js`, the initial script sequence waits for script load/error before hydration. An indefinitely pending download therefore prevents first-party controls becoming interactive in this fixture. Source search found no other current Quanda consumer.

Retain the integration but remove this dependency from first-party startup, using an appropriate nonblocking Next Script strategy after checking its consumers. `afterInteractive` is a suitable starting point. Preserve any required embed initialization and the script URL; do not delete Quanda or change GTM/consent. This necessary loading correction is authorized within phase 02 and supersedes the former requirement to leave its strategy unchanged. No dependency upgrade is needed.

Test real clicks and visible content for all five tabs with third parties ready, failed/blocked, and **still pending**. Inspect startup/network/console if any panel still fails. Do not substitute manually changed DOM attributes or synthetic state for UI evidence. Also verify FAQ/theme and mobile-menu operation without waiting for Quanda. Fix tablist orientation and arrow behavior to match the actual vertical desktop/horizontal narrow layout; preserve roving focus, Home/End and Enter/Space activation, and ordinary page scrolling. Hidden panels must have no focus targets.

## D2 — Port CTA proportions, outline and animation; fix pricing labels

Read reference `src/assets/css/input.css` and its compiled `main.css`, all `.btn` variants, `.icon`, and `src/assets/svgs/arrow_outward.svg`. Use the measured source values in design-reference.md. Normal reference text scales 14–18px, large 16–20px; normal arrows 14–20px, large 16–24px. The current constant 16px arrow and 14px normal labels do not reproduce those proportions on desktop.

Use the reference's **1px outline with a real 2px separation**, readable label, contrasting circle, fill sweep, vertical label swap and clipped diagonal arrow swap. The current adjacent same-color shadow plus transparent outer shadow does not create the separated outline. Keep distinct visible keyboard focus in both themes. Align both animated label copies to the same resting/hover position, including full-width pricing buttons. Maintain one accessible label and reduced-motion behavior.

Paid pricing cards: button **Vyzkoušet**, followed by **Prvních 14 dní zdarma.** outside the button. Free: **Začít zdarma**, without a time-limited helper. Keep the diagonal arrow visible on every card and use the same registration destination. Preserve all five amounts, employee bands and VAT text. At 1440px the previous paid buttons had clientWidth 155px versus scrollWidth 202px; this is a verified clipping defect. Give cards/buttons enough room; do not fix it by shrinking text, hiding arrows or clipping labels.

## D3 — Finish the actual browser component

Read `desktop-screen.njk`, `modules.njk`, `modules.json`, `screen-url-updater.js` and associated styles. Restore the centered address pill in the top bar: **https://coalshift.cz/#benefits**. This is a real homepage anchor; do not invent absent module routes. Decorative chrome need not become an editable browser or an iframe. Balance both sides so the address is centered rather than pushed off-center by the dots.

Use the reference hierarchy: readable 18px Lekton desktop tab labels, outlined icons, neutral layered frame and panel, appropriate content padding, icon fact cards and the CTA **inside the selected panel**. Preserve the five populated topics and real phone image at its correct ratio in the first panel. Other panels use approved prose and facts, not empty image placeholders or fabricated statistics. Apply the reference border glow to the fact cards too; current fact chips have only a flat border despite the previous report's claim.

Keep natural heights and no nested vertical scrolling. The layout should feel stable when switching panels without reserving a large empty phone column in panels that do not use it. On narrow screens use accessible horizontal tabs and readable content. Pricing follows directly, without a detached CTA row or a large repeated section gap.

## D4 — Give the audience section proper icon cards

Replace the six small text pills with six neutral, outlined-icon tiles using the same reference-derived card treatment as the visible key-functions overview. Keep all six approved industry names, `id="industries"`, intro and closing line. Give this section a heading and hierarchy comparable to the features section; it must remain easy to scan. A compact 3×2 desktop grid and responsive stacking are appropriate. No new industry pages, invented sector capabilities or fake clickable cards. Healthcare remains a plain audience tile and redirect destination.

## D5 — Port the team/contact pattern

Read `src/_includes/components/tym-item.njk`, `sections/our-team.njk` and `pages/nas-tym.njk`. Each approved person has a **round portrait above a separate contact card**, rather than a small rectangular portrait squeezed beside the text. Preserve the reference's spacing, rounded layered border, pointer highlight, name, blue role and icon contact rows. Adapt the grid to the two existing people.

Keep Martina Adamcová and Šárka Melišová, original portraits, image pipeline, exact roles, phones and emails from content.md. Do not copy coalios people or invent social accounts. Preserve lazy loading and correct crops in both themes. Do not send messages or dial numbers during verification.

## D6 — Restore header and layout proportions

Read `header.njk`, `topBar.json`, Tailwind configuration and compiled container styles. Port the reference's approximately 80px desktop navigation height, Inter navigation text, spacing and wider responsive container; the current 56px bar and 1152px maximum squeeze everything. The reference uses desktop navigation from 1280px and container widths up to 1280/1536px at the relevant breakpoints. Use the source proportions rather than reducing font size to keep desktop links visible too early.

Preserve the four navigation destinations, registration/login, theme toggle, correct family marks and individual colors/tooltips. Provide comfortable spacing for the full CTA. Keep mobile menu behavior, focus return, Escape, inert closed state and link-activation guards. Recalculate the shared header-height/anchor offset from the actual layout. No new links to hidden legacy routes.

Rebalance section spacing: current `Section.tsx` still gives each desktop section 96px above and below, leaving 192px between adjacent content areas before their internal margins. Compact the browser/pricing transition and unnecessary empty bands while retaining readable text and card padding. Preserve the separate six-function overview. Use coalios content hierarchy and component composition, adapted to the approved shorter homepage; do not compress the design by making all UI miniature.

## D7 — Use the shared footer credit

Read reference `sections/footer.njk` **and `src/_data/footer.json`**. Include **© 2026 coalsoft s.r.o. Všechna práva vyhrazena.** and **Developed with 💜 by coalmarketing.cz**, with `coalmarketing.cz` linking to `https://coalmarketing.cz/`. Keep the purple heart and lowercase brands. Preserve relevant existing company data, destinations and consent integration. Do not import a newsletter or coalios company details.

## Required verification and report

Existing phase-02 AC-01–AC-05 and Q-003/Q-004/Q-006–Q-013/Q-015/Q-016 remain applicable. Run the repaired `npm run typecheck` and `npm run pages:build`, then inspect served exported output. No reinstall, framework migration or broad audit is required. A focused startup regression fixture is useful; do not add a general test framework merely to restate markup.

For visual comparison, match reference and target **actual CSS viewport and theme**, not outer window size. Capture wide header, primary/secondary CTA rest/hover/focus, all five panels, pricing, audiences, contacts and footer. Observe motion using actual input. Record the source component and any necessary adaptation for each D item. Compare full-page density before/after under equal conditions; do not claim parity from filenames or a successful build. The latest owner screenshots and previous round are available in the evidence directory.

Use the agreed 320/390/768/1440 widths and both themes for changed layout; explicitly check long Czech labels, all five pricing arrows, 200% text zoom, keyboard, reduced motion and pointer effects. Run D1's pending-script scenario in addition to a successful-load test. Real viewport checks are possible with an isolated headless browser; Codex's diagnostic method is documented. Use permitted tools and report actual limitations without modifying access controls. If a case remains unavailable, mark it NOT_RUN and explain why; never relabel a source/DOM check as interaction evidence. Previously deferred unrelated phase-01 checks do not require reopening that phase.

Update checklist, quality evidence and current handoff; preserve attributed historical reports. Return an English **Correction Report — Phase 02, D1–D7** with changed files, source/target revisions, exact environment, screenshot paths, PASS/FAIL/NOT_RUN/BLOCKED per D/AC/Q item, remaining limitations and actual Git actions. Broad visual PASS requires reviewing the rendered comparisons. Owner acceptance is separate. Complete only D1–D7, leave phase 02 `in_review`, then stop and return the report in English. Do not start phase 03.
