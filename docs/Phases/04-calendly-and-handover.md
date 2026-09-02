# 04 — Calendly and handover

## Objective

Connect the approved consultation CTA and inline contact calendar to the owner's real Calendly event, verify the resulting site, and prepare a concrete release handoff without automatically deploying production.

The third phase-02 correction adds `/gdpr` and `/cookies` with the exact Waulter containers and footer links. Preserve these pages and their provider integration; Quanda is retired by owner instruction. Previously approved hidden legacy routes remain pending clarification, not automatic deletion. The mock-browser display paths are not additional routes.

## Dependencies and starting point

Phase 03 must be accepted. Read [brief](../brief.md), [plan](../plan.md), [agent instructions](../agent-instructions.md), [content](../content.md) and [quality](../quality.md). Reuse the prepared contact section and accepted shared theme system.

Jakub creates/configures the Calendly account and supplies the final public booking URL, intended event and organizer. Confirm any user-visible duration or language against that actual event. No DNS change, account creation, token or custom subdomain is assumed necessary for a normal link/inline integration. Recheck current provider guidance before implementation.

## Scope and implementation steps

- [ ] Verify the owner-provided URL and event/organizer identity. Record public configuration only; no account credentials belong in source or reports.
- [ ] Set consultation CTAs to the approved “Rezervovat konzultaci” action and real event link.
- [ ] Add the inline calendar to the contact section with appropriate loading behavior, accessible title, responsive space and a visible direct-link fallback.
- [ ] Verify both themes, mobile scrolling/height, keyboard behavior and blocked/failed embed loading. Style the surrounding section consistently without assuming control over cross-origin content.
- [ ] Preserve the existing GTM/consent implementation. Document Calendly's own loading behavior; coordinate an actual consent/configuration conflict with the owner without taking over the cookie system.
- [ ] Run a focused final regression of the seven content routes and the retired healthcare URL redirects, CTA/image/theme/monthly-pricing/contact/metadata behavior, checking the final diff for changed values since earlier acceptance. Recheck earlier requirements only where this final integration/version affects them.
- [ ] Account for the Q-003/Q-004 viewport/DPR and real navigation checks explicitly deferred by the owner when accepting phase 01. Reuse valid evidence from the redesigned UI in phases 02–03 where unaffected; complete any still-unperformed scenario before release handoff, or present its exact remaining limitation for an explicit owner decision. Do not assume that accepting phase 01 made these checks pass.
- [ ] If the owner explicitly authorizes a real booking test and resulting notifications, perform that exact test and report confirmation separately. Otherwise verify link/embed operation without making a booking and list the unperformed end-to-end action.
- [ ] Produce the release handoff in plan.md: reviewed version, current commands, actual preview and test evidence, remaining owner actions, production procedure and recovery plan.

Do not change pricing, trial terms, legal claims, application functionality, phase structure or hosting architecture here. Do not add a new lead form or tracking plan. Production publication is a separate authorized action, not an automatic completion step.

## Acceptance criteria

- **AC-01:** Q-017 passes for the real consultation link and inline calendar, with any unperformed notification-producing test explicitly recorded.
- **AC-02:** Q-008, Q-009, Q-010, Q-015 and Q-016 pass for the new embedding/loading behavior and its effect on the accepted UI.
- **AC-03:** The final-version regression preserves Q-002, Q-003, Q-004, Q-006, Q-011 and Q-014; recheck canonical pricing/contact data after the final diff without rewriting accepted content.
- **AC-04:** Q-001 and Q-018 are evidenced with the actual preview/version and a clear production/recovery handoff. Any unverified environment remains explicit.

## Applicable quality requirements

[Quality profile](../quality.md): **Q-001, Q-002, Q-003, Q-004, Q-006, Q-008, Q-009, Q-010, Q-011, Q-012, Q-013, Q-014, Q-015, Q-016, Q-017, Q-018**. For Q-012/Q-013, first inspect the final diff; retain earlier evidence if the accepted pricing/contact behavior is unchanged and recheck affected behavior if it changed.

## Validation

Run the current verified static build/type checks and the focused browser scenarios. Inspect network/loading behavior with Calendly available and blocked, mobile scrolling and direct fallback navigation. Record whether a booking was actually made and which confirmation was observed; loading the calendar is not proof of a completed booking.

Review all seven exported content routes, both healthcare 301 paths to `/#industries`, and the exact final preview version. Preserve lowercase branding and monthly-only pricing; do not restore the retired page or annual offer. Include a concise release procedure based on the actual branch/configuration, identifying the last accepted production deployment/version and a practical way to recover it. Do not execute that production procedure without the owner's instruction.

## Decisions required before execution

The real public booking URL, event and organizer must be supplied before this phase starts. If a material account limitation appears, report the observed limitation and available choices rather than inventing a service plan or altering DNS. A real booking test additionally needs explicit permission for its external effects.

## Completion protocol

Complete only this phase. Update task checklist, evidence and current handoff; mark implementation `in_review`. Stop and return the Phase Report in English with the tested version, actual Calendly validation and release limitations. Do not merge, publish production or mark the project accepted on the owner's behalf.
