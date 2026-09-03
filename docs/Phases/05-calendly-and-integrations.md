# 05 — Calendly and later integrations

## Objective and status

Add the owner's chosen Calendly integration after the cleaned website is released in Phase 04. Jakub will define any additional integrations before this phase is prepared for implementation. This is the former Phase 04, renumbered by the owner's instruction on 3 September 2026; its general cleanup, final release checks, branch integration and production handover now belong to [Phase 04](04-cleanup-optimization-and-release.md).

The sole phase status is in [plan.md](../plan.md). This phase remains planned and does not block publication of the accepted website without Calendly.

## Inputs required before planning review

- Owner-approved public booking URL, event and organizer; verify any visible duration/language against the actual event.
- Confirm the chosen placements and integration mode. The earlier proposal was a consultation CTA plus inline contact calendar with a direct-link fallback; do not implement it automatically before the owner completes this phase's scope.
- Jakub's list of any additional integrations and their purpose. Do not invent an enquiry form, CRM, newsletter, analytics event plan or account setup.
- Whether a real booking and its resulting notifications are explicitly authorized; link/embed inspection alone does not authorize a booking.

Use the current repository instructions, plan and quality profile. After Phase 04 consolidation, read the architecture, design-system, content-and-SEO and operations documents rather than historical correction prompts.

## Proposed Calendly scope to finalize with the owner

- Verify current provider guidance and the actual account/event constraints. Store only public configuration; no credentials belong in source or reports.
- Connect the approved consultation CTA and selected calendar placement. Provide a useful loading/failure state and direct-link fallback if an embed is chosen.
- Preserve both themes, responsive layout, keyboard access, readable labels and the accepted contact section. Do not assume control over cross-origin widget styling.
- Preserve GTM, Waulter and the owner-managed consent implementation. Report an observed integration conflict specifically; do not replace the consent system or alter external configuration by assumption.
- Verify successful and blocked/failed widget loading, mobile height/scrolling, direct-link navigation and first-party controls independently of the external service. Make a real booking only under its separate explicit authorization.
- Perform focused regression of the touched website behavior and update concise documentation. Any release of this later phase follows the documented operations procedure and that phase's publication authorization; Phase 04 release permission is not a perpetual deployment grant.

## Quality and completion

Q-017 covers Calendly; Q-008, Q-009, Q-010, Q-013, Q-015 and Q-016 apply to affected theme/responsive/contact/loading/integration behavior. Q-004/Q-006/Q-014 apply only if link/route/metadata behavior is touched. Q-018 covers the updated handoff. Final acceptance criteria and verification are completed with the owner before `/replan`; no generic quality catalog adds work here.

Do not change pricing, trial terms, testimonials, legacy redirects, hosting architecture or accepted design without a new requirement. Complete only the eventually assigned Phase 05 scope, return its Phase Report in English and stop. Do not start another phase or perform unassigned external actions.
