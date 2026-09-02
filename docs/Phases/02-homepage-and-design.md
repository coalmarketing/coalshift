# 02 — Homepage and design

## Objective

Create a reusable Coalshift version of the current family design and apply the full approved homepage revision, including pricing and new contacts. The result is reviewed visually before redesigning remaining page bodies.

## Dependencies and starting point

Phase 01 must be accepted. Read [brief](../brief.md), [plan](../plan.md), [agent instructions](../agent-instructions.md), [content](../content.md), [design reference](../design-reference.md) and [quality](../quality.md). Use the repaired static image pipeline and record the actual implementation baseline from plan.md.

The owner permits direct reading of `/Users/jakubtesarik/Programování/coalios`, not editing it. Follow its design language in blue, keeping the target Next/React stack. Both originals are available as `public/img/martina-adamcova.png` and `public/img/sarka-melisova.png`; use the asset details in content.md before preparing derivatives.

## Scope and implementation steps

- [ ] Inspect the reference components/assets and, where available, its rendered appearance; record the reference version used.
- [ ] Establish shared theme/color/spacing/type tokens and reusable header, footer, CTA, card and disclosure patterns. Load the required local fonts with Czech glyphs.
- [ ] Add the coalfamily brand bar and accessible theme control. Default to dark, persist explicit light/dark choice, and handle initial rendering and unavailable storage safely.
- [ ] Implement the homepage section hierarchy and Czech text in content.md, retaining the AI-assistant topic and real phone screenshot.
- [ ] Replace pricing using its canonical five-tier data. Ensure all layouts/payment-period states use that source; remove old feature differentiation and per-employee amounts.
- [ ] Replace contacts with Martina and Šárka, their actual supplied portraits and tel/mailto links. Update the footer copyright and remove active obsolete contact data.
- [ ] Prepare the contact layout for the later inline calendar. Until phase 04, keep working contact actions with honest labels; do not display a fake calendar or dead booking link.
- [ ] Fix semantics and interaction issues in touched components: duplicate IDs, hidden focusable menu items, missing expanded states, nested controls, heading relationships and sticky offsets.
- [ ] Apply responsive and reduced-motion behavior to selected decorative effects; measure their actual cost and keep content available without them.
- [ ] Verify the homepage in both themes and smoke-check shared chrome across every retained route. Update evidence and handoff.

Shared header/footer/theme changes naturally appear on other routes. Full healthcare, reference and historical body revisions remain phase 03. Do not pull Calendly integration, a new CMS or analytics work into this phase.

## Acceptance criteria

- **AC-01:** Q-007 and Q-008 are evidenced for the shared visual system and both themes, with actual reference/implementation comparison where available.
- **AC-02:** Q-009 and Q-010 pass for the homepage and shared chrome at the agreed sizes and keyboard/motion states.
- **AC-03:** Q-011 and Q-012 pass for the full homepage copy and every pricing view.
- **AC-04:** Q-003 and Q-013 pass for the actual phone and new contact portraits/data; missing portraits remain an explicit incomplete criterion.
- **AC-05:** Q-004, Q-006, Q-015 and Q-016 pass for affected navigation, shared-route behavior, measured media/effects and preserved integrations.

## Applicable quality requirements

[Quality profile](../quality.md): **Q-003, Q-004, Q-006, Q-007, Q-008, Q-009, Q-010, Q-011, Q-012, Q-013, Q-015, Q-016**.

## Validation

Run the verified build/check commands produced by phase 01. Compare desktop/mobile reference and target views; capture homepage screenshots at 320, 390, 768 and 1440 CSS px in both themes. Test first visit, persisted theme/reload, mobile navigation, FAQ, pricing, contact targets and registration. Compare loading behavior with the working phase 01 baseline under stated conditions, including reduced-motion and below-fold image requests.

The report must distinguish source similarity from visual verification. Do not send emails or call numbers to test contact links. Preview evidence must identify its exact deployed source version, not an older build with the same branch name.

## Decisions required before execution

No portrait input is currently missing. Verify the supplied files remain available when implementation starts and preserve the originals. If an asset becomes unavailable, report that specific dependency rather than substituting another person. Calendly details are intentionally not required yet.

## Completion protocol

Complete only this phase. Update the task checklist, quality evidence and current handoff in plan.md. Mark implemented work `in_review`, never `done` on the owner's behalf. Stop and return the Phase Report in English, with screenshots, remaining asset dependencies and the exact reviewed version. Do not start phase 03.
