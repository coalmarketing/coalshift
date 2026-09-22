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

- Implemented locally on `master` (no commit/push/deploy) per the phase file:
  centralized `BOOKINGS_URL`/`YOUTUBE_*` constants in `app/lib/links.ts`;
  redesigned `Contact.tsx` (1/3 personal contacts + 2/3 consultation panel
  desktop, consultation first on mobile, each contact and the consultation
  panel a single cohesive `.glow-border` card — a single inner surface
  wrapper, not multiple direct children — with a new lazy accessible
  `BookingsDialog.tsx`); extended `ProductGallery.tsx` with a Video
  ukázka/Obrazovky aplikace selector (coalios-ported icons) defaulting to a
  click-to-play local facade that mounts a `youtube-nocookie.com` iframe only
  on activation, both modes sharing one CSS-grid overlap media stage so
  switching never shifts the section, preserving the accepted screenshot
  gallery unchanged.
- The verified 1280×720 YouTube thumbnail is stored locally
  (`public/img/product-video-poster.jpg`, registry key
  `product-video-poster`) and served through the existing Sharp/
  `ResponsiveImage` pipeline; the site never contacts YouTube before user
  activation.
- Found and fixed two real defects during implementation. `output: "export"`
  copies the whole `public/` tree from disk regardless of `.gitignore`, so the
  340 MB untracked source video was landing in local `out/` even though it was
  gitignored. Moved it outside `public/` to `/video-source/` (also gitignored)
  so it can never enter the static export; confirmed `out/` and `git status`
  now contain no MP4/WebM. Separately, an owner visual review found the
  consultation panel and contact cards reading as detached white slabs — the
  cause was `.glow-border > *` styling every direct child as its own rounded
  surface; fixed by giving every card exactly one inner surface wrapper, and
  the product-gallery mode switch was rebuilt on a stable-height CSS grid so
  it no longer moves the Pricing section below it.
- `npm run typecheck` and `npm run pages:build` both exit 0 (Node 24.20.0 / npm
  11.19.0); `git diff --check` clean. Local browser verification covered both
  themes, the Bookings dialog's open/close/Escape/focus-trap/repeated-cycle
  behavior with its direct-link fallback, the video facade → play →
  `youtube-nocookie.com` playback path, mode-selector keyboard semantics
  (manual-activation tabs), and screenshot-gallery regression (navigation +
  fullscreen unaffected). The Bookings iframe did not render on `localhost` in
  local testing (direct-link fallback confirmed working regardless); this was
  environment-specific — the owner verified the iframe renders correctly on
  the production HTTPS origin (`https://coalshift.cz`) after release.
- Accepted by the owner; released to `master` and live on `https://coalshift.cz`.
