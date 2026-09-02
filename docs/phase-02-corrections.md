# Phase 02 — Owner corrections: compact content and reference fidelity

> Historical C1–C4 assignment. Claude returned this round for review. Current corrections are [D1–D7](phase-02-fidelity-corrections.md); follow the current canonical content/design/quality documents. The text-only browser label, audience chips, long pricing button labels and reported visual PASS are superseded.

## Assignment and evidence

This is one bounded correction of **phase 02**, authorized by the owner's feedback on 2 September 2026. It is not phase 03 and does not accept phase 02. The owner subsequently confirmed that the **separate key-functions section stays**; the browser may revisit those functions from another perspective. This clarification overrides any earlier proposal to absorb the entire overview into tabs.

Read [brief](brief.md), [content](content.md), [design reference](design-reference.md), [quality](quality.md), [phase 02](Phases/02-homepage-and-design.md), [plan](plan.md), and [reference screenshots/report](references/phase02/README.md). The current canonical copy and monthly offer supersede the original PDF and initial report where they differ.

Verified target: `/Users/jakubtesarik/Programování/coalshift`, branch `redesign`, HEAD `8f1db89f2e01dad80eb6678a5cbd0df0187b797a`. Phase-02 app changes, supplied portraits and documentation are uncommitted. Preserve them and correct in place. Recheck state on entry; do not reset to the phase-01 baseline. Reference: read-only `/Users/jakubtesarik/Programování/coalios`, `f3d727dc32dd9cd04493915f512b3375ef7d0cf4` at inspection. Do not inspect `coalios-manual`.

The initial implementation provides repaired images, portraits, dark/light themes and shared primitives. The earlier nine-block composition and annual offer were in our documentation, so these are partly revised owner decisions, not evidence that Claude ignored earlier copy. The CTA/card/family treatment is a specific source and screenshot mismatch. No corrected application has yet been built or visually accepted by Codex.

## C1 — Preserve quick scanning and consolidate practical benefits

**Evidence:** `app/page.tsx` renders nine blocks; `ui/Section.tsx` repeatedly applies `py-16 sm:py-20 lg:py-24`. Related information is spread across AI benefits, practical benefits and capabilities. See `coalshift-before.png`. The latest owner instruction preserves the separate key-functions overview.

**Implement:**

- Keep `Capabilities` or an equivalent standalone section with **six compact icon cards**: Zaměstnanci, Pozice, Směny, Nepřítomnosti, Exporty, Statistiky. All remain visible without opening a tab.
- Replace the separate `AiBenefits` and `WhyCoalshift` blocks with one React adaptation of `desktop-screen.njk`. Read its CSS/data/scripts too. Use five tabs: **Směny a AI, Lidé a pozice, Nepřítomnosti, Exporty, Statistiky**.
- Use content.md's short practical-use headings, paragraphs and icon facts. Revisit functions through usage and benefits, not identical paragraphs. Keep AI, absence handling, shift coverage and cautious working-time/rest wording. Use the real phone image in the first panel via `ResponsiveImage`; no invented UI or metric values.
- Compose hero → compact key functions → practical-use browser → monthly pricing → compact audiences → FAQ → contacts with integrated final trial CTA → footer. Browser and pricing form a coherent product area with no unrelated section between them.
- Fold the detached closing CTA into contact. Shorten redundant intros and action-only strips; use content-appropriate spacing, readable text and natural content heights.
- Preserve working anchors: overview `features`, browser `benefits`, audience `industries`, pricing `pricing`, FAQ `faq`, contact `contact`. IDs occur once. Update shared navigation and actual header clearance; do not add homepage links to previously unlinked legacy pages.
- Implement keyboard-operable tabs with roving focus, correct hidden panels, responsive selection and reduced-motion behavior. Keep real text in static output; this is a feature explainer, not an embedded application.

**Verify:** overview plus five populated tabs; no clipped content, hidden focus targets or page overflow; first/last/longest panel; keyboard selection and ordinary page navigation; anchor/registration semantics. Capture full-page before/after at a matched measured viewport/theme. Report actual height evidence rather than an invented reduction percentage.

## C2 — Finish the reference design details

**Evidence:** `ui/CtaButton.tsx` uses a plain pill and optional horizontal SVG arrow with a small x-translation. It lacks the separated outline, circular arrow, layered fill and text/diagonal-arrow transition. `ui/Card.tsx` only lifts on hover. Family marks exist, but the row is undersized and combines generic and brand-specific hover colors.

**Implement:** read the mandatory sources in design-reference.md. Adapt actual CTA resting/hover/focus/reduced-motion states, outlined icons, layered card/chip borders and fine-pointer glow in blue. Keep one accessible label despite animated duplicate spans. Preserve button/link semantics, focus visibility and existing activation guards. Reuse shared primitives for header, hero, browser, pricing and contact actions.

Reproduce the family strip with the **five actual marks**, parent coalsoft blue, muted inactive icons and their orange/yellow/purple/green hover/focus colors. Compare proportions and tooltip treatment to the source/screenshots in both themes. Eliminate competing generic hover colors; do not invent logos or turn every brand blue.

Adapt to React with lifecycle cleanup, coarse-pointer and reduced-motion fallbacks. Avoid the reference's unguarded optional ambient element in border-only glow. No framework migration, copied global script, unnecessary effect library or sibling-repository runtime import.

**Verify:** close-up resting/hover/focus screenshots for primary/secondary CTA and card/chip; observe arrow animation; check every brand's hover/focus colors in both themes. Reduced motion keeps content readable. Distinguish source checks from interactions. Measure changed contrast pairs; previous measurements do not prove new variants.

## C3 — Monthly-only pricing

**Evidence:** `app/lib/pricing.ts` and `home/Pricing.tsx` implement the earlier annual offer and switch. The owner now explicitly removed that offer.

**Implement:** remove the period switch, annual state/fields/amounts, annual billing labels, 11-month note and “Domluvit roční tarif”. Keep one monthly data source with the five employee bands and exact amounts in content.md. Free remains distinct from the 14-day trial. Preserve VAT wording and registration destination; no feature-based tariff differences or per-employee surcharge.

**Verify:** five cards and boundaries/amounts against canonical copy; paid amount unit “za měsíc, bez DPH”; no annual controls, note/inquiry or former annual amounts in active source data or generated public copy. Historical PDF/report files remain unchanged.

## C4 — Lowercase branding and retire healthcare page

**Implement:** use `coalshift` and lowercase family brand names throughout public headings, prose, titles/descriptions/OG, accessible names and image alt text. Apply spelling-only corrections to retained pages now; full body redesign and per-route SEO remain phase 03. Preserve proper person names, company facts, contact details and quoted testimonial substance. Do not rename every internal TypeScript identifier or alter brand artwork unnecessarily.

Remove `app/zdravotnici/page.tsx` and unreferenced healthcare-only components after a reference search. Remove healthcare page links from desktop/mobile header, footer and `Industries`. Keep **Zdravotnictví** in the compact audience overview at `/#industries`. Retire its video with the page; it need not move elsewhere.

Add these static Pages rules in `public/_redirects` (merge with existing rules if any):

```text
/zdravotnici /#industries 301
/zdravotnici/ /#industries 301
```

The [Cloudflare Pages redirect format](https://developers.cloudflare.com/pages/configuration/redirects/) supports a fragment destination. Ensure the file reaches `out`; verify on Wrangler's Pages server, not a generic server that ignores `_redirects`. No `!` suffix or Next.js server redirect is needed. Deployed behavior changes only after later authorized publication.

Five content routes stay: `/`, `/reference`, `/registrace`, `/wait-list`, `/wait-list/thank-you`. Preserve their existing homepage-link visibility and direct/refresh behavior. Remove the retired route from any active metadata/sitemap inventory. Phase 03 must not recreate it.

**Verify:** both healthcare paths return 301 to `/#industries`; browser navigation lands at the visible audience section below the header. No healthcare body remains in static output. All five retained routes still serve correct content; no internal links target the retired page; app login/register destinations remain. Search public capitalization separately from internal identifiers and historical documentation.

## Validation and report

Affected requirements: **Q-003, Q-004, Q-006–Q-013, Q-015 and Q-016**. Existing phase-02 AC-01–AC-05 still apply with these owner-approved changes. Canonical requirements and evidence live in quality.md. Full SEO, Calendly, new forms, analytics expansion and production release remain outside this correction.

Run `npm run pages:build` and `npm run typecheck`, inspect static output and serve it with `npm run preview`. Do not reinstall dependencies, repeat the phase-01 audit or add a test framework without a concrete changed-code reason. Preserve image generation/descriptors, portraits, fonts, theme persistence, GTM `GTM-NQDZKVLF`, Quanda and navigation guards. Retirement of the healthcare video is the explicit exception to earlier video-preservation instructions.

Use the agreed 320/390/768/1440 CSS px and both-theme checks for changed UI. Record actual `innerWidth`, `innerHeight` and DPR; the initial report inconsistently mentions ~1512 and a minimum of 1728, so do not copy either as a fresh measurement. Capture composition, all panels, CTA/card/family states and redirects. Perform focused mobile/keyboard/motion/image checks where possible. If the unchanged harness cannot perform a scenario, record it as NOT_RUN, finish useful checks and provide a short owner-assisted list. Owner-approved deferrals remain; do not reopen a repeated phase-01 review cycle.

Update the phase-02 checklist, quality evidence and plan.md; leave phase 02 `in_review`. Return an English **Correction Report** mapping C1–C4 and AC/Q IDs to changes and PASS/FAIL/NOT_RUN/BLOCKED evidence, source/reference versions, actual screenshots, limitations and Git actions. The original broad Q-007 PASS is not current acceptance. Do not claim measured loading/CWV improvement without data or present the old phase-01 remote preview as the correction.

Local implementation, asset preparation and verification are authorized. Leave changes uncommitted for review; no push, merge, deployment, Cloudflare settings change, booking or external message is authorized. Complete only these phase-02 corrections, then stop and return the Correction Report in English. Do not start phase 03.
