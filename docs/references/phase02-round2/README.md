# Phase 02 — Second owner review and independent evidence

Captured 2 September 2026. Active work: [D1–D7](../../phase-02-fidelity-corrections.md). These files are evidence, not independent operating instructions or owner acceptance.

## Owner inputs and historical handoff

| File | Meaning |
| --- | --- |
| [coalshift-before.png](coalshift-before.png) | Owner's full-page screenshot after C1–C4, original size preserved |
| [coalios-team.png](coalios-team.png) | Reference round portraits and separate highlighted contact cards |
| [coalios-header.png](coalios-header.png) | Reference floating header and family-bar proportions |
| [claude-c1-c4-report.txt](claude-c1-c4-report.txt) | Supplied report, copied verbatim; assertions are attributed to Claude |
| [plan-before-d1-d7.txt](plan-before-d1-d7.txt) | Previous plan/handoff, preserved as history; not the active assignment |

Earlier browser/button/glow references remain in [the first set](../phase02/README.md). Originals were copied byte-for-byte; [manifest.json](manifest.json) records source paths and SHA-256 values. Screenshots contain browser chrome and do not establish the reference CSS viewport by themselves.

## Codex's local diagnostic

Tested the **existing** uncommitted static `out` artifact, without a fresh build or app changes. Target HEAD: `8f1db89f2e01dad80eb6678a5cbd0df0187b797a` plus uncommitted phase 02; the manifest fingerprints index.html and exported JS/CSS. Reference source: coalios `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`.

Environment: isolated headless Google Chrome **152.0.7977.65**, **1440×1000 CSS px, DPR 1**, clean temporary context, local HTTP server. No user's browser profile, production state or external messages were used. The in-app browser bootstrap was unavailable; this permitted alternative used bundled Playwright and the existing Chrome executable. A local-listen sandbox escalation was approved. The diagnostic completed and closed its own browser/server.

- [reproduce-startup.cjs](reproduce-startup.cjs): exact diagnostic script. Its absolute runtime paths are local diagnostic tooling, not an application dependency. It writes results to `/private/tmp/coalshift-ui-repro`; never import it into the website. To rerun locally, use the bundled Node executable `/Users/jakubtesarik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node` with this script, after checking its paths and applicable execution permission.
- [codex-evidence.json](codex-evidence.json): actual panel selection/visible headings after each pointer click, dimensions, pricing geometry and page errors for both fixtures.
- [codex-before-1440.png](codex-before-1440.png): full page in the ready fixture, first panel restored before capture.
- [codex-browser-1440.png](codex-browser-1440.png) and [codex-pricing-1440.png](codex-pricing-1440.png): close-ups, visually inspected by Codex.

The **controlled-ready** fixture fulfills external script requests with empty JavaScript, isolating first-party behavior. All five actual pointer clicks select the corresponding populated panel. This does not test Quanda/GTM functionality.

The **quanda-pending** fixture leaves only `webform.onquanda.com/static/js/webform/embedded.min.js` pending until cleanup; other external scripts receive the same empty responses. Every click leaves the first panel selected and visible. There are no page errors in either fixture. This proves a reproducible startup dependency under a pending download, not the owner's precise browsing conditions or a provider outage. The separate immediate-failure/blocked case was not run in this diagnostic and remains part of D1 verification.

Source corroboration: Quanda is `beforeInteractive` in `app/layout.tsx`; current source search found no other Quanda consumer. Installed Next 16.3.4 `node_modules/next/dist/client/app-bootstrap.js` waits for the initial script sequence's load/error before hydration. D1 should remove that dependency while preserving the integration. [Next Script documentation](https://nextjs.org/docs/app/api-reference/components/script) describes `afterInteractive` as loading after hydration has begun. Its general wording about beforeInteractive execution does not replace the observed pending-download behavior of this installed build.

Pricing measurements: all four paid CTAs are about **154.8px wide**, `clientWidth` **155px**, `scrollWidth` **202px**, label font **14px**, arrow **16px**. Text and arrows clip. Header navigation is **1150×56px** within its 1152px shell. These observations support D2/D6; exact reference values are in [design-reference.md](../../design-reference.md).

The JSON records document height after clicking the last tab. The full-page screenshot restores the first tab. Those heights must not be used as a matched-state before/after reduction statistic. This generic static server does not implement Cloudflare `_redirects`; no redirect evidence is claimed here. No 320/390/768, other DPR, touch, full keyboard or performance/CWV matrix was run in this diagnostic. No corrected implementation has been tested yet.

## Reference checks

Read actual templates, source CSS, compiled CSS and data together. The source mappings and numeric values live in [design-reference.md](../../design-reference.md), including `tym-item.njk` and `footer.json`; the assignment gives implementation/verification details. Preserve source licenses and read-only access.

Relevant primary references opened during this assessment: [WAI-ARIA tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) for orientation/activation behavior and [MDN box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow) for shadow geometry. Visual parity still requires comparing the actual render, not merely using the same CSS property names.
