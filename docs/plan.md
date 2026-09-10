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
| 06 | [Product copy, theme preference and mobile header stability](Phases/06-content-and-product-messaging.md) | in_review | Free-tier positioning, product-accurate practical browser, system-first theme and stable mobile top load |
| 07 | [Calendly and later integrations](Phases/07-calendly-and-integrations.md) | planned | Owner-approved booking integration and any separately agreed additions |

Only Codex changes a phase to `done` after the owner accepts it.

## Quality mapping

Requirements live in [quality.md](quality.md). Phase 06 applies Q-002, Q-004,
Q-007–Q-012, Q-014 and Q-018. Phase 07 applies Q-017 plus the existing
requirements affected by its final scope.

## Current handoff — Phase 06 implemented, in_review

- Phase 06 is implemented on local `master` (HEAD `86c00d4`, no commit/push/
  deploy). Free-tier positioning, the five-topic product-accurate practical
  browser with ten confirmed values, AI/trial removed from owner-authored
  homepage copy and metadata, system-first theme bootstrap and the mobile
  top-load/header geometry fix are in place.
- `npm run typecheck`, `npm run pages:build` and `git diff --check` pass.
  Evidence is in the Phase 06 implementation delta in [quality.md](quality.md).
- Owner-assisted checks still open: physical iOS Safari/Chrome top-load/reload
  and real 320/390/768/1440 CSS px rendering (harness fixed at 1728).
- Next: owner review of the deployed-preview or local build; Codex records `done`
  only on acceptance. Calendly stays deferred to
  [Phase 07](Phases/07-calendly-and-integrations.md).
