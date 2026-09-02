# 03 — Pages and SEO

## Objective

Apply the accepted design to every remaining route, replace stale or conflicting public copy, and implement coherent route-specific metadata and technical SEO while preserving URLs and navigation scope.

## Dependencies and starting point

Phase 02 must be accepted. Read [brief](../brief.md), [plan](../plan.md), [agent instructions](../agent-instructions.md), [content](../content.md), [design reference](../design-reference.md) and [quality](../quality.md).

Relevant source areas include `app/zdravotnici`, `app/reference`, `app/registrace`, `app/wait-list`, `app/layout.tsx` and their components. The inspected baseline has a global homepage canonical, no per-route metadata, duplicate heading/ID relationships and old trial/launch language. Verify which issues are already resolved by preceding phases before changing them again.

## Scope and implementation steps

- [ ] During planning, record the agreed indexing treatment for registration and historical pages. Keep all routes available; do not infer noindex from lack of a homepage link.
- [ ] Redesign the healthcare page with accepted shared patterns and content.md copy, retain the existing usable video and unify trial duration.
- [ ] Redesign the reference page while preserving the existing attributed quotes and recording their unverified provenance. Do not invent social proof or rating structured data.
- [ ] Redesign registration, wait-list and thank-you page bodies. Use truthful current copy and working app/contact destinations; remove stale launch offers and unverified success/email claims.
- [ ] Verify that the phase 01 refresh-workaround removal still works with the new layouts and all nested routes.
- [ ] Give each route appropriate metadata from content.md, production-origin canonical treatment and social preview metadata using real available assets. Ensure the exact homepage title is not duplicated by a title template.
- [ ] Implement sitemap/robots consistent with the owner's indexing decision. Avoid preview-domain canonicals and broad root canonicalization. Do not add organization identifiers or ratings without confirmed facts.
- [ ] Resolve remaining page headings, unique anchors, landmark/label relationships, image alt text and accessible video/interactive controls.
- [ ] Verify the route inventory, navigation scope, both themes and responsive content; update evidence and handoff.

This phase does not redesign the application at app.coalshift.cz, add industry URLs, delete historical routes, implement Calendly or modify owner-managed consent. Keep the homepage's accepted design/content stable except for necessary shared-component and SEO corrections.

## Acceptance criteria

- **AC-01:** Q-006, Q-007 and Q-008 pass across all remaining routes using the accepted design system without adding homepage links to unlinked historical pages.
- **AC-02:** Q-011 passes for all edited page bodies/metadata, including the 14-day trial, careful legal wording and truthful follow-up copy.
- **AC-03:** Q-014 passes with the recorded indexation decision, exact homepage title and verified generated per-route metadata.
- **AC-04:** Q-004, Q-009, Q-010, Q-015 and Q-016 pass for the touched page interactions, media, responsive/theme behavior and preserved integrations.

## Applicable quality requirements

[Quality profile](../quality.md): **Q-004, Q-006, Q-007, Q-008, Q-009, Q-010, Q-011, Q-014, Q-015, Q-016**.

## Validation

Run the current verified build/type checks and inspect exported HTML and served routes directly, including refresh on `/wait-list/thank-you`. Review actual metadata/canonicals/sitemap/robots, main-heading structure, internal links and social image URLs. Search old text variants in both source and generated output, distinguishing preserved testimonial quotes from general product claims.

Check each page at narrow/wide sizes in both themes, keyboard navigation and key registration/contact actions. Reuse phase 02 checks where the implementation is unchanged; broaden testing only to address a concrete regression risk. Record browser/version/viewport and deployed source version for preview evidence.

## Decisions required before execution

Jakub and Codex must settle the indexing treatment of historical/registration routes during this phase's planning review. Preserve route availability regardless of the decision. If later discovery shows the retained video itself contains a conflicting offer, identify the exact issue and owner input needed; changing page copy is not evidence that the video was corrected.

## Completion protocol

Complete only this phase. Update checklist, applicable evidence and the handoff in plan.md, marking implementation `in_review`. Stop and return the Phase Report in English. Include the final route/metadata matrix and any unresolved content provenance or media limitations. Do not start Calendly integration or another phase.
