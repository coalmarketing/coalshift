# Coalshift — Plan and current handoff

## Current product scope

Coalshift is a Czech Next.js marketing website for the separate application at
`app.coalshift.cz`. The public website uses the coalfamily design language in
coalsoft blue, exports statically to Cloudflare Pages and is developed directly
on `master`. Work is verified locally before an explicitly authorized push to
`master`, which triggers production deployment.

## Phases

| ID | Phase | Status | Outcome |
| --- | --- | --- | --- |
| 01 | Preview and technical foundation | done | Reproducible static build, supported dependencies and working image pipeline |
| 02 | Homepage and design | done | Reference-faithful responsive homepage in both themes |
| 03 | Pages and SEO | done | References page, four-route SEO and legacy redirects |
| 04 | [Cleanup, optimization and release](Phases/04-cleanup-optimization-and-release.md) | done | Current documentation and purposeful code/assets released to production |
| 05 | [Real product gallery](Phases/05-product-gallery.md) | done | Responsive gallery of three real application screenshots with fullscreen viewing |
| 06 | [Calendly and later integrations](Phases/06-calendly-and-integrations.md) | planned | Owner-approved booking integration and any separately agreed additions |

Only Codex changes a phase to `done` after the owner accepts it.

## Quality mapping

Requirements live in [quality.md](quality.md). Phase 05 applies Q-003, Q-004,
Q-007–Q-011, Q-015, Q-018 and Q-019. Phase 06 applies Q-017 plus the existing
requirements affected by its final scope.

## Current handoff — Phase 05 accepted, release authorized

- The owner accepted Phase 05 on 4 September 2026. The homepage now includes the
  responsive three-screen product gallery documented in
  [05-product-gallery.md](Phases/05-product-gallery.md), including the moving
  stack, swipe, accessible fullscreen viewer and optimized image variants.
- The same accepted release fixes header scroll drift on reload and ports the
  Coalios custom cursors plus its coordinated ambient/card-border spotlight.
- `npm run typecheck`, `npm run pages:build` and `git diff --check` pass. Detailed
  current behavior and remaining physical-device checks are recorded in
  [quality.md](quality.md).
- The owner authorized one final commit and push of this complete working tree to
  `master`. That push triggers the Cloudflare production deployment.

## Phase 06 inputs still required

- Approved Calendly booking URL, event and organizer.
- Final placements and integration mode.
- Any other integration the owner explicitly adds to that phase.
