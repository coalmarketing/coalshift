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
| 06 | [Product copy, theme preference and mobile header stability](Phases/06-content-and-product-messaging.md) | done | Free-tier positioning, product-accurate practical browser, system-first theme and stable mobile top load |
| 07 | [Microsoft Bookings and product video](Phases/07-bookings-and-product-video.md) | done | Accessible consultation booking and an unlisted YouTube walkthrough integrated into the existing homepage sections |

Only Codex changes a phase to `done` after the owner accepts it.

## Quality mapping

Requirements live in [quality.md](quality.md). Phase 07 applies Q-007–Q-010,
Q-013, Q-015 and Q-017–Q-019. Q-016 is regression-only for the preserved
GTM/Waulter integration.

## Current handoff — Phase 07 accepted and released

- Phase 07 is accepted by the owner, released on `master` and deployed to
  production: `https://coalshift.cz` serves the redesigned contact section
  (1/3 personal contacts + 2/3 Microsoft Bookings consultation panel,
  consultation-first on mobile) and the product-showcase Video
  ukázka/Obrazovky aplikace selector (click-to-play local facade, no YouTube
  contact before activation).
- Production-verified: the video facade plays through
  `youtube-nocookie.com`, the screenshot gallery is unaffected, and the
  Microsoft Bookings iframe renders correctly on the production HTTPS origin
  (its earlier non-render on `localhost` during local testing was
  environment-specific, not a product defect).
- Evidence, quality-gate results and carry-forward limitations are recorded in
  [quality.md](quality.md)'s Phase 07 delta.
