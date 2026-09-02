# Phase 02 — Third owner review

Active work: [E1–E5](../../phase-02-interaction-content-corrections.md). Inputs and reports are evidence, not independent operating instructions. Date: 2 September 2026.

## Owner inputs

- [D1–D7 report](claude-d1-d7-report.txt), copied verbatim; its test claims are attributed to Claude.
- [Current homepage](coalshift-before.png).
- Reference changing browser paths: [economy](coalios-browser-economy.png), [stocks](coalios-browser-stocks.png), [controlling](coalios-browser-controlling.png).
- [Reference menu underline](coalios-nav-hover.png).
- [Reference gray cards and resting depth](coalios-card-rest.png), supplied in the owner’s final clarification.
- [Preceding plan/handoff](plan-before-e1-e5.txt), historical copy.

The six owner images are unmodified originals, with source paths and SHA-256 in [manifest.json](manifest.json). The screenshots establish appearance, not successful interaction in the target.

The owner separately supplied final route/container pairs: `/gdpr` → `<div id="waulterGdpr"></div>` and `/cookies` → `<div id="waulterCookies"></div>`. These exact IDs also exist in the corresponding coalios page templates. No container markup input is missing.

## Independent Codex check

[diagnose-interactions.cjs](diagnose-interactions.cjs) is the exact local diagnostic; [codex-evidence.json](codex-evidence.json) contains observed selections/headings, theme classes, pointer styles and request/error records. Analytics query parameters are omitted from saved request URLs. The script is diagnostic evidence, not an application dependency: it uses the bundled Playwright runtime/system Chrome and writes to `/private/tmp/coalshift-round3`. Use only permitted tooling/paths if rerunning it.

Target: existing uncommitted D1–D7 export, no fresh build; HEAD `8f1db89f2e01dad80eb6678a5cbd0df0187b797a`. Its index.html fingerprint is recorded in the manifest/JSON. Browser: isolated headless Chrome **152.0.7977.65**, **1440×1000 CSS px, DPR 1**, clean context. Local-listen/browser escalation was approved; the diagnostic's own server/browser were closed. The existing localhost:3000 server was read without restarting it.

| Case | Requests | Genuine pointer-click result |
| --- | --- | --- |
| Existing export, Quanda pending | Local assets loaded; Quanda deliberately held pending and other third-party requests fulfilled with empty JS | All five selected panels/headings match their tabs; theme changes dark → light |
| Existing export, normal | Normal external requests allowed | All five panels switch; theme changes dark → light |
| `http://localhost:3000/`, normal | Normal external requests allowed | All five panels switch; theme changes dark → light |

No page errors were observed. The request log contains aborted requests, including analytics; these did not prevent the recorded interactions. This diagnostic does not prove all third-party services succeeded. The pending fixture specifically isolates first-party startup and cannot test provider functionality.

The current `app/layout.tsx` already uses Quanda `afterInteractive`. The prior pending-beforeInteractive cause no longer reproduces here. **Subsequent owner clarification:** the owner withdrew the inert-tabs/theme report after identifying confusion about the dev/IP-served version. The incident is closed on that basis, consistent with the passing clean checks. This is not independent proof of a cache/IP mechanism. E1 removes the unused Quanda integration and preserves working controls; no further incident investigation is assigned.

The current `FunctionsBrowser.tsx` adjusts aria-orientation but its key handler still cancels all four arrows at both layouts. That source defect remains for E1. This diagnostic did not run real keyboard, touch, 320/390/768 widths, reload persistence or legal-page tests.

## Visible border difference

[Rest card](card-rest-1440.png) and [hover card](card-hover-1440.png) were captured with real pointer movement in the normal export case. The hover frame was visually inspected. Fine pointer is true, reduced motion false, computed intensity becomes 1.00 and the radial-gradient background changes. Pixel comparison of the 395×175 images shows differences only in `(44, 0, 351, 1)`: one top pixel row. Center top pixel changes from RGB `(229,229,229)` to `(82,198,227)`.

Thus the effect exists in this clean browser but is much thinner than the required reference. Target `.glow-border` still uses **1px padding and a flat base**; coalios `benefits.njk` uses **p-0.5 (2px)** and input.css `.border-gradient` layers a neutral vertical gradient under the highlight. Industries adds a gray icon frame that Capabilities does not have. These concrete differences support the shared-card/E2 correction; do not describe the entire effect as absent in the tested context.

## Reference sources inspected

Read-only coalios at `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`: `src/_includes/sections/header.njk` (bottom-edge list-item underline), `benefits.njk` (icons/text/cards), `landing.njk` (subpage introduction), `src/_includes/pages/gdpr.njk`, `cookies.njk` (exact Waulter IDs), `src/assets/js/screen-url-updater.js` (selected-tab display path) and `src/assets/css/input.css` (layered border). Earlier detailed component mappings remain in [design-reference.md](../../design-reference.md).

No application source, Git ref, Cloudflare settings or dependency was changed by Codex. New legal routes, Quanda removal, E copy/design and real policy injection remain implementation/verification work for Claude. Existing old-route preservation stays in place pending the owner's clarification of “only two subpages.”
