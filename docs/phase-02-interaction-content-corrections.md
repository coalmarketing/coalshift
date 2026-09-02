# Phase 02 — Interaction, content and legal-page correction (E1–E5)

> Historical E1–E5 assignment, already delivered. The current assignment is [F1–F6](phase-02-final-polish.md) and its [prompt](phase-02-final-polish-prompt.md), including the latest owner instruction to replace the phone with numerical cards. Do not execute this older prompt again.

## Assignment and precedence

Implement one local phase-02 correction on the existing uncommitted `redesign` tree in `/Users/jakubtesarik/Programování/coalshift`, HEAD `8f1db89f2e01dad80eb6678a5cbd0df0187b797a`. Read current agent instructions, brief, content, design-reference, quality and plan, plus [the latest report/screenshots/diagnostic](references/phase02-round3/README.md). Recheck Git state and preserve prior work. Phase 02 stays `in_review`; no commit, push, deploy, Cloudflare change or phase 03 execution.

The owner now authorizes **complete removal of Quanda**, richer copy in both six-card sections, consistent card icons/effects, reference menu underlines, **login as the primary header action**, dynamically changing mock-browser paths, two-column footer, and `/gdpr` + `/cookies` with the exact supplied Waulter containers. These decisions supersede D1–D7's Quanda preservation and fixed address instructions. Keep the successful CTA proportions/short pricing labels, monthly offer, contacts, lowercase spelling, six-function overview and healthcare redirect.

coalios remains the mandatory read-only source for UI/UX, typography, components, content composition and behavior. Reference root `/Users/jakubtesarik/Programování/coalios`, revision `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`. Read matching templates, styles, data and scripts whenever uncertain. Do not inspect coalios-manual or create a sibling-repository build dependency.

## E1 — Remove unused Quanda and preserve working controls

The owner has withdrawn the inert-tabs/theme report: the confusion concerned the development/IP-served version being viewed. Codex's clean tests on the existing export and localhost:3000 already confirmed all five tab selections and theme switching, including when Quanda remained pending. Treat the reported incident as closed by owner clarification; do not reopen it or claim an independently proven cache/IP root cause.

Remove the Quanda Script and dead Quanda-only comments/config after a reference search. The owner's authorization remains: it will not be used again. Preserve GTM `GTM-NQDZKVLF`, Waulter/consent, the inline theme bootstrap and the rest of the app. **Quanda and Waulter are different integrations.** Do not remove Waulter to satisfy a Quanda search.

The current key handler still consumes all four arrows regardless of orientation even though aria-orientation changes. Correct that remaining source defect: use Up/Down for vertical tabs and Left/Right for horizontal tabs, preserving Home/End and manual Enter/Space activation. Up/Down must remain available for ordinary page scrolling in horizontal mode.

After the change, use genuine input to verify all five panel headings/body copy, both theme directions and reload persistence, FAQ and mobile-menu operation. Record the exact current review URL and start command; distinguish dev from freshly built exported output so the owner can open the version actually tested. A fresh served-output check is sufficient; no further investigation of the withdrawn incident is assigned.

## E2 — Use one populated card pattern and a visible reference border effect

Use the expanded Czech feature and industry copy in content.md. Every one of the twelve cards has an outlined icon, semantic heading and useful short paragraph. Keep two coherent six-card grids and natural heights; do not add filler claims, sector-specific integrations or legal guarantees.

Use one shared information-card implementation for Capabilities and Industries. Follow `src/_includes/sections/benefits.njk`: **bare outlined blue icon**, without the extra gray rounded icon container currently used only in Industries; same icon scale, heading/body type, padding and title spacing in both sections. Reference icons are 48–64px, headings 20–24px, body 14–16px; adapt the source fluid sizing to the approved compact page rather than retaining 32px icons and minimal descriptions. Keep body text readable and cards evenly aligned when Czech titles wrap. Informational tiles are not fake links or keyboard stops.

Read `.border-gradient` in reference input.css/main.css and `magic-bento.js`. The current effect is present in the clean browser: pointer movement changes the gradient, but only a **1px** strip is visible. Codex screenshots differ only across the top pixel row at the tested pointer position. The reference uses **2px inset padding and a neutral vertical gradient**, while target `.glow-border` still uses `p-px` and a flat base. This is a concrete fidelity gap, separate from the owner's noninteractive browser state.

**Resting appearance is mandatory:** on the light page, use the reference's **neutral-100 (`#f5f5f5`) card surface**, with the **always-visible 2px neutral vertical-gradient rim**. Its lighter top and darker lower edge create the subtle raised/3D appearance even without hover. The current white inner surface and flat thin rim do not match. Port the actual `.border-gradient` layers rather than inventing a heavy drop shadow. Keep the equivalent source dark treatment. The blue pointer highlight is an additional layer over this permanent neutral rim; reduced motion and no-hover devices retain the base depth.

Port the 2px layered border, neutral-100/dark-neutral-900 inner surface, pointer-local blue highlight and subtle source lift. Apply the shared border treatment consistently to feature/audience/fact/contact cards without breaking their different layouts. Preserve cleanup and fine-pointer/reduced-motion support; handle preference changes correctly. Verify by actual pointer movement and captured rest/hover frames at the same coordinates/viewport/theme, plus reduced-motion fallback. Do not claim that a style variable alone proves the effect is visible.

## E3 — Reference navigation underline and primary login

Read `src/_includes/sections/header.njk` around the desktop `<li>` rules. Each item spans the navigation's full height; its 2px underline sits on the **bottom edge of the bar**, scales horizontally over roughly 500ms, and follows reference light/dark colors. Port hover and keyboard-focus treatment; do not substitute `text-decoration: underline` just beneath the text. Preserve geometry without hover layout shift and preserve the shared header-height/anchor offset. Never mark all four homepage fragment links as the current page simultaneously.

Swap the action hierarchy in the header and mobile menu: **Přihlásit se** is the filled primary pill with the same arrow/outline as the reference. **Vyzkoušet na 14 dní zdarma** is secondary. Login remains `https://app.coalshift.cz/login`, registration remains `https://app.coalshift.cz/register`. Preserve intentional tab-opening behavior and mobile menu closure. Other page trial CTAs and pricing retain their current hierarchy and 14-day wording. Do not squeeze the header by shrinking labels or changing the desktop breakpoint back to the earlier cramped layout.

## E4 — Synchronize the mock address with the selected topic

The owner explicitly wants the decorative browser address to change with each selected topic and have **no hash**. Read `desktop-screen.njk` and `screen-url-updater.js`; implement its visible behavior using the same React selected-tab state as the panel. Use the exact display mapping in content.md: `/smeny-a-ai`, `/lide-a-pozice`, `/nepritomnosti`, `/exporty`, `/statistiky`, preceded by `https://coalshift.cz`.

These are **illustrative paths inside the faux browser**, expressly requested by the owner. Keep them plain display text, not links, real routes, history updates or redirects. The real browser address and homepage anchor structure remain unaffected. Change the label on selection by pointer or Enter/Space; focus movement alone does not activate a manual tab. Keep the address centered and usable on narrow widths. Fix the current shrink-to-content pill so its desktop proportions follow the reference's 25rem address area instead of a tiny capsule. No extra feature subpages are requested.

## E5 — Two-column footer and exact Waulter pages

Move **coalsoft s.r.o., both address lines, IČ and DIČ** under the coalshift logo/brand copy. Keep the exact existing values. The second desktop column contains navigation, including **Zásady ochrany osobních údajů (GDPR)** → `/gdpr` and **Podmínky cookies** → `/cookies`. Stack on mobile. Keep the existing copyright and `Developed with 💜 by coalmarketing.cz` credit below both columns. Do not add the legal links to the already crowded desktop primary navigation; the owner's requested legal links belong in footer navigation, matching the reference.

Create the two route shells in this correction. The supplied containers are final inputs:

| Route | Heading | Required initially empty container |
| --- | --- | --- |
| `/gdpr` | Zásady ochrany osobních údajů (GDPR) | `<div id="waulterGdpr"></div>` |
| `/cookies` | Podmínky cookies | `<div id="waulterCookies"></div>` |

Read reference `src/_includes/pages/gdpr.njk`, `pages/cookies.njk` and `sections/landing.njk`. The reference already uses these exact IDs. Port its smaller subpage introduction, subtle blue background and breadcrumb **Domů → current title**, with a real H1 instead of the reference's heading-like span. Keep shared header/footer and correct fixed-header clearance. No homepage-sized hero or repeated trial section is needed on legal pages.

The corresponding div must appear once, initially empty in exported HTML, inside a readable wrapper that styles injected headings, paragraphs, lists, tables and links in both themes. Add surrounding classes/wrappers without changing the exact ID or supplying invented legal content. Let the existing owner-managed Waulter script populate it; do not copy another company's provider configuration, install a second loader, call an invented API or use React to overwrite injected HTML during unrelated state updates.

Use ordinary full-document anchors for navigation **to** `/gdpr` and `/cookies` so the existing provider gets a normal page initialization. Do not assume a DOMContentLoaded-only integration reruns on Next client navigation. Verify direct load, refresh and entry from the footer. Include minimal route-appropriate title/description and production canonical so the new pages do not inherit the homepage canonical; full SEO remains phase 03.

Validate the exported shells/IDs separately from real provider injection. With the actual loader available, check that the correct policy appears once, survives a theme change and renders readably. A local test that injects sample HTML can verify styling only; it cannot prove Waulter delivery. If domain configuration or the current runtime prevents real injection, record that precise limitation without modifying GTM or claiming the legal pages are fully populated. Do not frame creating these containers as a legal-content audit.

Preserve the previously approved unlinked reference/registration/wait-list URLs while the owner's phrase “only two subpages” is clarified. These two are the new visible legal subpages. No additional old-route deletion or redirect is authorized by this assignment.

## Verification and completion

Apply existing Q-003/Q-004/Q-006–Q-016 as affected; Q-014 applies here only to minimal metadata for the two new pages. Seven content routes are expected under the current preservation decision, plus both healthcare redirects. The mock-browser display paths are not content routes. No new quality area or phase is introduced.

Run `npm run typecheck` and `npm run pages:build`, then test served `out`. Verify Quanda absence in active source/export/requests, preserved GTM/Waulter, homepage tabs/theme/FAQ/menu, all five address states, both card sets/effects, header actions/underline, footer layout, new legal pages/IDs/links and unchanged prices/contacts/healthcare redirects. Compare actual reference and target at matching viewport/theme. Use the agreed responsive widths, real keyboard, reduced motion and representative long text. Keep source, visual, interaction and provider-injection evidence separate; the isolated headless method in the evidence directory can test actual widths and input.

Update the current handoff by replacing obsolete current-state claims, not appending contradictory statements above them. Preserve prior reports as history. Return **Correction Report — Phase 02, E1–E5** in English with PASS/FAIL/NOT_RUN/BLOCKED per E/AC/Q item, exact served URL/version, screenshots, actual commands/results, remaining provider-delivery limitations and Git actions. Complete only E1–E5, leave phase 02 `in_review` and all changes uncommitted, then stop. Do not start phase 03 or publish.
