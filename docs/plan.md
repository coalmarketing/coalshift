# Coalshift — Plan and handoff

## Approved scope

See [brief](brief.md), [content](content.md), [design reference](design-reference.md) and [quality profile](quality.md). The owner approved the following four phases. Initialization and planning review are workflow steps, not additional phases.

## Phases

| ID | Phase | Status | Dependencies | Expected outcome |
| --- | --- | --- | --- | --- |
| 01 | [Preview and technical foundation](Phases/01-preview-and-technical-foundation.md) | in_review | Initialization and planning review | Coherent static build, patched dependencies, working images and mobile CTA, documented preview setup |
| 02 | [Homepage and design](Phases/02-homepage-and-design.md) | planned | Accepted 01; supplied portraits | Reusable blue family design, themes and brand bar; revised homepage, pricing and contacts |
| 03 | [Pages and SEO](Phases/03-pages-and-seo.md) | planned | Accepted 02; historical-route indexing decision | All retained pages redesigned, consistent copy and route-specific SEO |
| 04 | [Calendly and handover](Phases/04-calendly-and-handover.md) | planned | Accepted 03; real booking URL and organizer | Booking CTA and inline calendar; focused final verification and release handoff |

Allowed status values: `planned`, `ready`, `in_progress`, `in_review`, `blocked`, `done`. This table is the only source of phase status. `ready` does not start implementation. Only Codex records `done` after review and Jakub's acceptance.

## Quality mapping

Requirements are defined once in [quality.md](quality.md). A later phase rechecks only affected earlier behavior.

| Phase | Requirements |
| --- | --- |
| 01 | Q-001, Q-002, Q-003, Q-004, Q-005, Q-006, Q-016 |
| 02 | Q-003, Q-004, Q-006, Q-007, Q-008, Q-009, Q-010, Q-011, Q-012, Q-013, Q-015, Q-016 |
| 03 | Q-004, Q-006, Q-007, Q-008, Q-009, Q-010, Q-011, Q-014, Q-015, Q-016 |
| 04 | Q-001, Q-002, Q-003, Q-004, Q-006, Q-008, Q-009, Q-010, Q-011, Q-012, Q-013, Q-014, Q-015, Q-016, Q-017, Q-018 |

## Current handoff

- Assignment: phase 01 remains `in_review`, overall `PARTIAL`. Both the preliminary implementation report and the actual `/recheck` report were assessed by Codex on 2 September 2026. Original R1/R2 defects remain resolved. **Codex completed the focused R4/R5 review on 2 September 2026: both corrections pass their local checks.** Actual mobile/keyboard/scroll and remaining viewport/DPR checks, plus remote preview, remain NOT_RUN. No publication is authorized.
- Repository: `/Users/jakubtesarik/Programování/coalshift`.
- Working branch: `redesign`, created locally from `origin/cloudflare-deploy`, with no upstream set.
- Implementation review baseline: `0138dbb2073c31e72a9a61c987ee02a8ae9ce4dd` (HEAD, unchanged). All phase 01 work is **uncommitted** on `redesign`. No commit, push, reset, merge or deployment was performed. The owner has now saved the Preview branch configuration as recorded below; agents have not changed Cloudflare settings.
- Relevant commits: none. The pre-existing untracked planning files and both portrait inputs are preserved. Planning/evidence documents have been updated; `AGENTS.md` also contains the Next-generated guidance block. These are not all byte-unchanged inputs.
- Unrelated changes in target at start: none.
- Work completed (phase 01): dependency/runtime upgrade, coherent static build, Sharp/WebP generation and registry-driven ResponsiveImage, config/font cleanup, Button/navigation repair and removal of forced historical-route reloads. The former custom loader was removed during R1. Implementation changes remain subject to review and the outstanding interaction checks.
- Changed tracked files: `.gitignore`, `README.md`, `next.config.ts`, `package.json`, `package-lock.json`, `tsconfig.json` (Next 16 auto-update), `app/globals.css`, `app/layout.tsx`, `app/registrace/page.tsx`, `app/wait-list/page.tsx`, `app/components/{Button,Header,Hero,HealthcareHero,HealthcareFeatures,Benefits,ContactSection,PricingSection,Footer,FAQ,WaitList}.tsx`; deleted `tailwind.config.ts` and `postcss.config.mjs`. Total: 21 modified tracked files and two tracked deletions. (`References.tsx` returned to baseline after R1 removed its only change.)
- New untracked task files: `.nvmrc`, `image-registry.json`, `app/components/ResponsiveImage.tsx`, `scripts/generate-image-derivatives.mjs`, `app/lib/smoothScroll.ts`. The R1 correction removed `image-loader.ts` (never committed). `public/img/derivatives/` and `.wrangler/` are git-ignored.
- R4/R5 changed files (2 September 2026): `app/lib/smoothScroll.ts` (`isPlainActivation` now also rejects non-self anchor targets, typed `MouseEvent<HTMLAnchorElement>`), `app/components/Header.tsx` + `app/components/Footer.tsx` (fragment-handler param types), and `package-lock.json` (10 transitive nodes updated within existing ranges; `package.json` direct versions unchanged). No new files.
- Selected versions: Next.js `16.3.4`, React/React-DOM `19.2.8`, `@types/react`/`@types/react-dom` `^19.2`, `@types/node` `^24`, TypeScript `5.9.3`, Tailwind `3.4.17`; `wrangler@4.128.0` + `sharp@0.35.4`. `.nvmrc` = `24.20.0`, `engines.node` `">=24 <25"`, npm `11.19.0`.
- Verification: Codex independently ran `npm run pages:build` and `npm run typecheck` successfully on Node 24.20.0 after R1/R2. The build required an escalated local execution and produced fresh `out/`; this supersedes the previous build-tool limitation. Local Wrangler preview returned HTTP 200 for all six routes, all 14 distinct img src URLs returned image Content-Type, and all seven emitted WebP candidates matched Sharp-decoded file widths and returned HTTP 200 image/webp. Clean install/dev/SPA evidence remains attributed to Claude; Codex did not repeat those checks.
- R4/R5 focused verification: Codex reran `npm run pages:build`, `npm run typecheck` and `npm audit --json` on the updated lockfile; all exited 0, audit reported zero vulnerabilities. A temporary in-memory check executed the actual TypeScript module after transpilation: all 12 activation cases, missing destination and absent document passed; a nested event target did not override the anchor's currentTarget. This is guard-logic evidence, not browser interaction. The lockfile matches package.json, the seven corrected package versions and selected direct versions match the report. `npm ci` remains Claude's successful evidence. `git diff --check` passed.
- Discovery checks actually run: Git identity/branch/status and remote comparison; source/configuration reads; visual inspection of all three PDF pages; public HTTP requests for original images (200) and optimizer URLs (404); primary documentation checks. These establish findings, not implementation acceptance.
- Documentation-generation checks (historical): exact inventory of 12 new Markdown files and one PDF copy, 50 internal links, 15 referenced Coalios source paths, 18 quality definitions/evidence rows and matching phase mappings. Trial/price/contact data checks passed; fixed annual prices match 11 monthly payments and the PDF hash matched the original. The absence of tracked application changes applied before implementation, not to the current working tree.
- Checks not run by Codex: browser interactions, install, development startup, client-side navigation and remote preview. Browser initialization failed because its runtime rejected the workspace glob path; this differs from Claude's fixed-viewport limitation. Claude's synthetic events and CSS-forced desktop menu do not prove real mobile pointer/keyboard navigation or completed smooth scrolling. Background throttling remains an explanation reported by Claude, not independently proven. The original focused interaction checks remain open; no broader audit is added.
- Open findings / limitations: the legacy Quanda `<Script>` is retained by design (no consumer in source; it calls `console.clear()`). Per-route metadata, the homepage title, pricing copy, contact people, themes and the blue design system are unchanged and belong to phases 02–03. `PricingSection` still shows the pre-redesign tiers/prices (phase 02). `HealthcareHero`/`/zdravotnici` still say "30 dní" (phase 02/03 trial unification).
- Available inputs: both new contact portraits (1080 × 1080 PNGs) preserved, integrated in phase 02. Deferred: historical-route indexation (03), Calendly (04).
- Preview: no deployment created or verified for `redesign`; no push performed. On 2 September 2026, the owner supplied Preview screenshots and then confirmed saving the corrected branch controls: Custom branches includes only `redesign`, exclusions empty; production remains `cloudflare-deploy` with automatic production deployment enabled. Build settings show `npm run pages:build`, output `out`, repository root, build system v3 and cache disabled. Preview variables/secrets are empty in the screenshot, so no `NODE_VERSION` override is shown. Saving is owner-confirmed, not independently re-read through the Cloudflare API. The first publication is the next prepared Claude assignment.
- Remote snapshot: read-only `git ls-remote --heads origin refs/heads/cloudflare-deploy refs/heads/redesign refs/heads/master` on 2 September 2026 returned production `0138dbb2073c31e72a9a61c987ee02a8ae9ce4dd` and master `2aaef8efea0cb74af2ce632b07deeaf8cbf4045f`; no remote `redesign` branch exists yet. Recheck the destination immediately before an authorized push.
- Review record: initialization/planning reviews, implementation and correction reports, the preliminary implementation review and the actual `/recheck` assessed. The reviewed source scope is unchanged: 21 modified tracked files, two tracked deletions and five new implementation/configuration files, plus task documentation. Codex has changed documentation and run isolated checks only; no application source, dependency, Git or deployment mutation was made in this assessment.
- Reusable learning: Codex recorded L-20260902-02 in shared guidance after verifying npm lifecycle behavior: asset preparation must be tested through the exact hosting command without relying on stale generated files. This clarifies an existing build-verification rule; it changes no project quality criteria or permissions.
- Next action: the Preview settings prerequisite is owner-confirmed. Hand the prepared first commit/push and preview-verification prompt to the owner for execution in Claude Code. That active assignment must explicitly grant the limited commit/push permission; confirmation of saving settings alone is not recorded as publication. R4/R5 need no further correction or full /recheck without a concrete new risk. After authorized publication, verify the actual Cloudflare build and finish the remaining mobile/keyboard/scroll/viewport checks on that exact preview version. Phase 02 is not authorized; phase 01 has not been accepted.

Replace the current handoff with accurate evidence as work progresses; keep material decisions in the change record below. Do not turn planned checks into successful results.

## Implementation review — 2 September 2026

Baseline: `0138dbb2073c31e72a9a61c987ee02a8ae9ce4dd`, branch `redesign`, complete uncommitted phase 01 scope including new source/configuration files. The existing `out/` was inspected as Claude's prior artifact, not represented as a fresh successful Codex build. Codex also reproduced its image attributes directly with the installed Next 16.3.4 `getImgProps`, current loader and configuration; Sharp confirmed actual file dimensions.

### R1 — Responsive-image descriptors (Q-003, local FAIL)

- The portrait emits `adamec-240.webp 32w` through `128w`, `adamec-320.webp 256w`, `adamec-480.webp 384w`, and `adamec-640.webp` for widths through `3840w`. Actual file widths are 240, 320, 480 and 640. Next emits its configured requested width as the descriptor even when the loader rounds/caps the returned asset.
- The phone emits the same 426px asset as both `1x` and `2x` and never offers its generated 213/320px variants. The ceiling/cap rule in the original plan was incomplete as a full responsive-image integration; preserve the native resolution limit, but ensure the final candidate metadata describes the actual files.
- Correct candidate generation and `sizes` for both raster uses. A small registry-driven rendering helper inside this Next application is an acceptable implementation detail if needed; preserve Sharp/WebP generation, browser-safe code, dimensions, existing SVG behavior and static export. Do not upscale originals or replace the pipeline with raw PNG delivery merely to make a check pass.
- Verify final emitted candidates against decoded file widths, then actual browser selection at narrow/wide viewports and DPR 1/2. `naturalWidth` is density-corrected CSS width, not necessarily file pixel width; a density-halved value alone is not evidence of a broken automation bridge. Do not dismiss an unexplained zero/currentSrc result without checking loading state.

Evidence basis: installed `next/dist/shared/lib/get-img-props.js`, current source and existing HTML, Sharp metadata, [HTML srcset requirements](https://html.spec.whatwg.org/multipage/images.html#srcset-attributes) and [naturalWidth semantics](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth), opened 2 September 2026. Actual browser choice remains unverified by Codex.

### R2 — Preserve default link activation (Q-004, local FAIL)

`Header`, `Footer`, `Hero`, `HealthcareHero` and `PricingSection` call `preventDefault()` for fragment links without guarding modifier keys or ensuring a destination exists before cancelling. Header's home-logo handler also intercepts modified clicks. The helper's internal missing-target return occurs too late. This violates the agreed ordinary-activation-only contract: Cmd/Ctrl-click can scroll the current page instead of opening a tab.

Centralize or consistently apply the activation guard: preserve already-handled events, non-primary/modifier activations and non-self targets; intercept only a same-document destination actually handled. Preserve existing hrefs and default navigation otherwise. Retain mobile close behavior without cancelling external registration navigation. Verify mouse/keyboard activation, modified clicks, ordinary section landing and menu focus below the large-screen breakpoint. Observe actual header clearance and fix any proven native/JS mismatch; do not assume hardcoded 72px is sufficient or introduce a menu redesign.

### R3 — Correct evidence and close the focused verification gaps

Re-run the affected pointer/keyboard and image checks in a visible foreground browser with a recorded narrow viewport (for example 390 CSS px) and wide viewport (for example 1440 CSS px). Record actual viewport, DPR, destination/new-tab outcome, menu state/focus and completed scroll landing. Source inspection, an instant-scroll substitute or a desktop-only report cannot establish those outcomes. Keep unavailable checks `NOT_RUN`/`BLOCKED`.

Correct the report's blanket claim that every login opens a new tab: desktop login intentionally remains same-tab; mobile login and the actual new-tab CTAs retain their respective targets. Retain GTM/Quanda/video and the existing commercial/copy boundaries. The real Cloudflare build (Q-002) and Q-004 preview interactions are outstanding phase 01 remote checks alongside Q-001/Q-003/Q-006/Q-016; do not postpone them silently to phase 04.

Codex verification: image generation PASS (seven WebPs, phone maximum 426×519 / 33,522 B, portrait maximum 640×640 / 32,810 B); `npm run typecheck` PASS; direct current-source image-attribute reproduction confirms R1; source review confirms R2. Build verification BLOCKED by internal-port denial after the required escalation retry; interactive verification BLOCKED by browser runtime initialization failure. These tool limitations do not justify changing the application's bundler or stack.

### R1–R3 corrections applied — 2 September 2026 (Claude Code)

- **R1:** replaced the capping `next/image` custom loader with `app/components/ResponsiveImage.tsx` (registry-driven plain `<img>`, JSON registry only) for the two raster assets; `next.config.ts` → `images: { unoptimized: true }` (SVGs/logos keep `next/image`, served as-is); `image-loader.ts` removed; per-image `unoptimized` props removed (global covers them) so `References.tsx` returned to baseline. `image-registry.json` gained native `width`/`height`; `generate-image-derivatives.mjs` now asserts registry↔decoded-source dimensions and descriptor↔file-width. Emitted `srcset` now: phone `213w/320w/426w`, portrait `240w/320w/480w/640w` — every descriptor verified against the decoded file; `sizes` layout-aligned. Browser selection at 1728/DPR2 correct within native limits; `naturalWidth` 299 for the portrait explained as the MDN density-corrected value.
- **R2:** added `isPlainActivation` / `shouldSmoothScroll` to `app/lib/smoothScroll.ts`; every fragment handler in Header (desktop + mobile nav + home-logo), Footer, Hero, HealthcareHero and PricingSection now `preventDefault`s only for an ordinary primary activation whose target exists. Synthetic-event tests confirm modifier clicks and missing targets fall through; a `metaKey` click on a mobile menu link closes the menu without scrolling the page. JS scroll targets computed exactly (`element − 72`); native `#hash` lands at `top: 72`; measured `header.offsetHeight` = 72 = `scroll-padding-top`.
- **R3:** re-verified in a focused browser. The harness renders at a fixed 1728 CSS px / DPR 2 (`resize_window` moves the OS window but not `innerWidth`; no device-emulation tool). The 390/1440 px rendered layouts, the true <1024 px hamburger layout and completed smooth-scroll *animation* (background-tab rAF throttling) are `NOT_RUN`; deterministic guard logic, scroll-target math, native fragment landing, image descriptors/selection, `inert`/`aria` menu state and anchor semantics are verified. Q-003 and Q-004 → PASS (local). The report's earlier "every login opens a new tab" phrasing is corrected: desktop login stays same-tab; mobile login and the new-tab CTAs keep `target="_blank"` + `rel="noopener"`.

Build (`pages:build`) and typecheck pass after the corrections; `npm ci` reproducible. No commit, push or deployment. Bundler and stack unchanged.

## Codex assessment of the correction report — 2 September 2026

- **R1 metadata: PASS.** Fresh exported HTML offers phone 213w/320w/426w and portrait 240w/320w/480w/640w; Sharp confirms the actual file widths. HTTP delivery passes for every variant. The registry-driven component is within the R1 implementation clarification and preserves the static Sharp pipeline. Actual narrow/wide and DPR 1/2 browser selection remains NOT_RUN where not demonstrated.
- **R2 original defects: corrected in source.** All affected callers now guard modifier/primary activation and target existence before cancelling. Claude's synthetic-event checks support this limited result. Real new-tab outcomes, keyboard activation, the native mobile menu and complete smooth scrolling remain unverified. The helper does not inspect the anchor's `target`; the explicit non-self-target clause from the correction assignment remains a review point. Current fragment callers have no non-self target, so no live failure of those callers is claimed from that omission alone.
- **R3: incomplete verification.** Do not rerun the same fixed-viewport harness merely to produce another identical report. `/recheck` can assess the whole implementation now, while the genuine narrow/mobile and pointer/keyboard checks remain prerequisites to phase acceptance. A usable browser or owner-assisted local/authorized-preview check will be needed for those outcomes.
- **Documentation: reconciled by Codex.** README no longer links the removed image-loader.ts. Current evidence separates passing source/build/HTTP checks from missing interaction checks. The earlier report's blanket new-tab claim and the old Codex build limitation are superseded. No change to quality definitions, phase boundaries or permissions.
- **Next review scope:** all 21 modified tracked files, two tracked deletions and new phase files at the current working tree. Include AGENTS.md, CLAUDE.md and docs as task context/evidence. Preserve the unused owner portraits; they are inputs for phase 02, not phase 01 implementation. Generated out/.next/derivatives and local Wrangler state are verification artifacts, not additional source changes. Recheck Git status before review; there are no phase commits or unrelated source changes to omit.

## Assessment of both implementation-review reports — 2 September 2026

The preliminary report and the actual `/recheck` found no critical live application defect. Their scope excludes neither the existing quality gates nor the current lockfile from dependency verification. Proposed refactors and extra tests are suggestions, not automatically new phase requirements. Baseline/branch/source scope are unchanged.

### R4 — Finish the existing non-self-target contract (Q-004)

`app/lib/smoothScroll.ts` guards event modifiers and target existence but does not inspect the activating anchor's target. Current fragment callers have no non-self target, so no current `_blank` failure has been established. Nevertheless, respecting such targets was already part of the R2 assignment; finish that small clause rather than replacing it with a comment.

Use the activating anchor (`event.currentTarget`, not a nested click target). Only absent/empty or `_self` targets may be intercepted; preserve `_blank`, `_parent`, `_top` and named targets. Apply the rule consistently to fragment handlers and the Header home-logo handler through the existing shared guard. Preserve the existing primary/modifier/defaultPrevented/missing-target checks and destinations. Use appropriate anchor event types. Verify the guard matrix directly and keep actual browser navigation evidence separate. A broader handler refactor is not required.

### R5 — Compatible transitive dependency fixes (Q-002/Q-005)

Codex independently ran `npm audit --json` against the current lockfile. Result: **7 affected packages, 5 high, 1 moderate, 1 low, 0 critical**, all marked `fixAvailable: true`. Lockfile entries below are `dev: true`:

| Package | Locked version | Parent/range evidence |
| --- | --- | --- |
| brace-expansion | 2.0.1 | minimatch: ^2.0.1 |
| browserslist | 4.24.4 | autoprefixer: ^4.23.3 |
| glob | 10.4.5 | sucrase: ^10.3.10 |
| minimatch | 9.0.5 | glob: ^9.0.4 |
| picomatch | 2.3.1 | anymatch/micromatch/readdirp: compatible 2.x ranges |
| postcss-selector-parser | 6.1.2 | postcss-nested/Tailwind: compatible 6.x ranges |
| yaml | 2.7.0 | postcss-load-config: ^2.3.4 |

These findings affect development/build dependencies; they do not establish a vulnerability reachable by visitors to the deployed static website. The report's description as only ReDoS/DoS is incomplete: [glob's advisory](https://github.com/advisories/GHSA-5j98-mcp5-4vw2) concerns command injection specifically through its `-c/--cmd` CLI option, not the ordinary library API. No exploit was executed and no exploited Coalshift path is claimed. Audit data, lockfile parent ranges and primary advisory details were inspected. The [brace-expansion advisory](https://github.com/advisories/GHSA-rgw5-rvv9-x895) and [Browserslist advisory](https://github.com/advisories/GHSA-c83g-rgw3-j3cx) were also opened.

Resolve the listed findings through compatible transitive updates within the existing dependency contract. Inspect the actual lockfile delta; do not blindly use `--force`, upgrade the selected framework/runtime or expand this into a security-hardening project. Keep the selected direct versions where no change is needed. Confirm the named advisories are fixed with an actual audit, then verify `npm ci`, `npm run pages:build` and `npm run typecheck`. Record any concrete remaining limitation. This is scoped dependency maintenance in the already approved phase, not a new universal zero-audit criterion.

### Suggestions closed or deferred with reasons

- **Generator negative cases: PASS for three meaningful cases.** Codex copied the unchanged generator and one existing source image into an isolated temporary fixture with the current node_modules available. Missing source, incorrect registry height and width above native resolution each returned exit 1 with the intended message. Project source/registry were untouched. Descriptor/file equality is already checked for all seven real outputs; forcing that assertion's failure would require a mocked transformer. No new framework, generator argument or redundant existsSync loop is required by this review.
- **Historical SPA navigation:** the former temporary fixture was intentionally removed to preserve homepage navigation. Its deletion does not invalidate the recorded test. Recheck the routes in the already-required usable-browser/preview pass; no permanent test page or additional link is requested.
- **Header heights, focus and true mobile interaction:** keep the outstanding real viewport/keyboard/scroll checks. The conflicting w-32/w-48 logo classes and fixed 72px assumptions should be treated together when shared navigation is redesigned in phase 02; no current narrow-viewport result is invented. Source-only claims about orphaned focus need actual interaction evidence before a broader focus rewrite.
- **Media priority:** current exported HTML contains two image preload links for the phone and portrait. The preliminary claim that the plain img wrapper produces no preload is therefore incorrect. Evaluate priority/loading in the agreed Q-015 phase 02 work; no phase 01 loading redesign is required.
- **Duplicate healthcare IDs:** comparison/features/footer-cta appear on both page wrappers and child sections in the existing code. They belong to phase 03 healthcare-body semantics (Q-010), with phase 02 handling shared chrome. Reduced motion and the shared header belong to the already planned phase 02 work.
- **Other minor suggestions:** handler deduplication, replacing sound narrowing assertions, hypothetical /# links, registry validation beyond current invariants, orphan pruning and the stale commented WaitList block are not required to finish this correction. No CSP/GTM/consent work or new test system is added.

Do not repeatedly invoke the unchanged fixed-viewport harness to close NOT_RUN results. Both reports retain their actual evidence limits; the phase remains in_review until the required interactions and authorized preview are verified and the owner accepts it.

## Planning review record and accepted outcome

Initialization and both subsequent planning reports were reviewed on 2 September 2026. The first context response already edited planning documentation; the later `/replan` pass refined it further. These were documentation changes, not authorization to implement or publish. Codex inspected the final files rather than accepting either report as the current specification.

The consolidated [phase 01 specification](Phases/01-preview-and-technical-foundation.md) is now the execution source. The original four phases, AC-01–AC-05 and Q-001–Q-006/Q-016 are retained. Phase readiness does not mean implementation acceptance.

Accepted technical decisions:

- Next.js 16, compatible React 19.2/types and TypeScript, a supported Node 24 patch pinned exactly, and a coherent lockfile. Current official Next documentation identifies 16.3.4 as the review candidate. Verify exact package availability/compatibility when installing.
- Keep the static Cloudflare Pages architecture and `out` export, remove the conflicting adapter, and use explicit local Wrangler preview plus build-time Sharp image derivatives.
- Generate image files before every entry point that needs them: `dev`, `build`, `pages:build` and `typecheck`. The hosting command name remains unchanged.
- Use a browser-safe, path-allowlisted image loader with a shared source registry; preserve unknown/SVG sources and test actual generated image URLs on every route.
- Repair all affected Button/link callers, closed-menu focus behavior, duplicate anchors and native/JS scrolling offsets; preserve offer, destinations and current design.
- Verify active config resolution before cleanup, repair the font/CSS issues, remove the historical forced reload, and keep source/local-browser/remote evidence separate.

Corrections to the two reports and their plan edits:

| Finding | Corrected treatment |
| --- | --- |
| Earlier handoff still described `prebuild`, while /replan changed only some instructions | One command contract in the phase file; exact CI entry tested without stale generated assets |
| Broken image URLs were explicitly allowed in development | Development prepares the same required assets; no knowingly broken dev workflow |
| Loader selected a derivative below the requested width | Select a sufficient candidate when available, capped at the available maximum; verify browser choice and native dimensions |
| Generated ignored manifest could be missing during type checking | Shared source registry and preparation order must work from a clean checkout; client loader imports no Node-only modules |
| “Objednat” was said to link externally | Source already uses `#contact-section`; preserve it and fix only the handler/default-scroll interaction |
| Fixed CSS scroll-padding was described as repairing JS offsets | Native and programmatic scrolling must both use the actual header clearance |
| No build run, yet “current build already fails” and Cloudflare runtime success were stated as executed facts | Configuration diagnosis and provider support are distinguished from actual build/preview evidence |
| Mandatory new ESLint gate was claimed to restore existing lint coverage | No prior lint setup is established in this baseline. Keep agreed build/type/behavior checks; no new lint migration in phase 01 |
| Q-003 used `PARTIAL` and allowed a time-pressure fallback | Q evidence uses PASS/FAIL/NOT_RUN/BLOCKED. PARTIAL is an overall report outcome; do not weaken the planned final image pipeline |
| Cleanup introduced owner/GTM inspection and separate-commit prerequisites | Keep Quanda in phase 01, preserve GTM and video, and proceed locally without a new container audit or commit permission |
| Broad claims about “noreferrer breaks GTM”, “inert is the only method” and indefinite version support | Use the chosen behavior with bounded explanations; do not turn recommendations into universal technical facts |
| “Commit once” / reset instructions conflicted with permissions | Keep local work uncommitted; no reset, commit, push or deployment is part of this assignment |

Git history associates the forced reload with former Quanda form handling. Commit `98b3df2` still contained a Quanda trigger; it is not proof that this commit removed the form entirely or that current routes have been behaviorally tested. Current source has no form consumer. Test route behavior after removing the workaround and preserve the global script as stated above.

Primary evidence rechecked by Codex: [Next support policy](https://nextjs.org/support-policy), [Next 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16), [image loader configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/images), [npm script lifecycle](https://docs.npmjs.com/cli/v11/using-npm/scripts/), [Cloudflare build image](https://developers.cloudflare.com/pages/configuration/build-image/) and [Node release status](https://nodejs.org/en/about/previous-releases). Provider documentation supports the plan; it does not substitute for the forthcoming implementation checks.

## Cloudflare settings and preview instructions

The initial owner screenshot showed project `coalshift`, repository `coalmarketing/coalshift`, production branch **`cloudflare-deploy`**, automatic production deployments enabled, build command **`npm run pages:build`**, output **`out`**, and an empty root-directory setting. Build system is version 3 and build cache is disabled.

The owner supplied new Preview screenshots on 2 September 2026 at about 18:17. They confirm the same build settings, empty variables/secrets and production branch. The open Branch control editor initially contained both `*` and `redesign` as includes. Codex instructed removing only the `*` beside `redesign`, retaining the separate Build watch paths wildcard, leaving exclusions empty and then saving. The owner's subsequent "Hotovo" confirms completion of that correction and save. These are screenshot observations plus owner confirmation, not a fresh API read. No preview hostname or deployment has yet been verified.

Configuration procedure (completed by the owner; retained for the publication handoff):

1. Open Cloudflare → Workers & Pages → `coalshift` → Settings → Branch control. Use the current equivalent location if the dashboard labels have changed.
2. Keep the production branch `cloudflare-deploy` and its current deployment setting.
3. Set preview branch controls to **Custom branches** and include the exact branch `redesign`. For a new rule, leave exclusions empty. Preserve existing rules for other development branches and verify no exclusion matches `redesign`; do not silently erase existing exclusions. The owner confirms the resulting Preview settings before the first push.
4. Ensure the Preview build settings use `npm run pages:build`, `out`, and the repository root. Phase 01 makes `pages:build` prepare images and then run `next build`, producing `out` without renaming the script. Node is pinned by `.nvmrc` to `24.20.0`; if Preview has a `NODE_VERSION` override, align it with that pin. Keep the production environment settings unchanged. This has not yet been tested on a Coalshift preview build.
5. After the separately authorized first push to `redesign`, inspect that branch's deployment in Deployments. Record the actual preview URL, source commit and build result here. Do not substitute the production URL for preview evidence.
6. Verify the preview's `X-Robots-Tag: noindex` behavior and inspect links/canonicals. Search exclusion is not access protection; leave access policy under the owner's control.

Do not invent a working preview address. Cloudflare supplies a deployment URL and branch alias after the branch has been deployed. Do not merge into production, switch the production branch or run the existing deploy script to obtain a preview.

Provider guidance checked on 2 September 2026: [branch build controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/), [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [build image and Node version selection](https://developers.cloudflare.com/pages/configuration/build-image/), [static Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/). Branch, preview and build-image guidance was reopened during the R4/R5 assessment.

### Prepared first publication — awaiting owner authorization

The proposed next Claude assignment is one phase 01 preview publication and its verification, with no phase 02 implementation. Preview settings are now owner-confirmed. This document does not itself authorize publication: the prompt supplied by the owner to Claude Code must explicitly authorize the scoped commit and push, and that later active assignment takes precedence over the earlier no-publication restriction.

- Destination: existing remote `origin` (`https://github.com/coalmarketing/coalshift.git`), local `redesign` to remote `redesign`. Proposed commit title: `Prepare Coalshift technical foundation for preview`.
- Commit scope: the 21 modified tracked files and two tracked deletions listed in the current handoff; the five new implementation/configuration files; generated `AGENTS.md`, `CLAUDE.md`, and `docs/` including the source revision PDF. Inspect the staged diff and exact file list before committing. Preserve both owner portrait inputs untracked for their phase 02 integration. Exclude generated `out/`, `.next/`, image derivatives and local Wrangler state.
- After that permission and the branch/settings checks, the intended push is `git push --set-upstream origin redesign:refs/heads/redesign`. This should trigger the configured Pages preview build. It is not a production merge or the repository's direct deploy command. No force push is part of the proposal.
- Record the new commit SHA and Cloudflare's actual deployment URL/build log before checking all six routes, image responses and rendering, `X-Robots-Tag: noindex`, preserved integrations and the outstanding real mobile/keyboard/scroll/viewport behavior. Reuse existing evidence where unaffected. If browser automation is still unavailable, use owner-assisted checks on the actual preview and keep unperformed checks explicitly NOT_RUN.
- Return an English Preview Verification Report and update the current handoff/evidence. Keep phase 01 `in_review` until the required checks pass and the owner accepts it. No subsequent phase or production publication follows automatically.

## Approved plan changes

- 2 September 2026 — Initial four-phase baseline generated after explicit approval. Free trial finalized at 14 days across the entire site.
- Production evidence resolved the starting branch: use the Cloudflare production baseline, not the stale local master. The already absent Netlify file does not need deletion.
- Owner decisions supersede the PDF's cookie item and obsolete contact identity; Calendly is deferred to 04, with portraits supplied for 02.
- During generation — Both contact portraits became available in `public/img/`; the documentation now names the actual PNG files. No image transformation or website integration has been performed yet.
- 2 September 2026 — First phase 01 planning report received with version/build/image/config/navigation proposals; subsequently assessed and corrected as recorded above.
- 2 September 2026 — /replan report received after five reported review passes. Codex retained the supported fixes and corrected inaccurate or conflicting execution details; the consolidated phase 01 specification supersedes those proposals.

- 2 September 2026 — Codex completed planning assessment, corrected only phase 01/plan documentation, and marked phase 01 ready for local implementation. Phase structure, acceptance criteria, quality IDs and publication permissions remain unchanged.
- 2 September 2026 — Phase 01 implemented locally by Claude Code and marked `in_review`. Next.js 15.1.7 → `16.3.4`, React 19 → `19.2.8`, TypeScript `5.9.3`, Node pinned `24.20.0`; `@cloudflare/next-on-pages` removed, `wrangler` + `sharp` added; `pages:build` = `images:generate && next build` → `out/`. Sharp/WebP build-time image pipeline replaces the failing `/_next/image` dependency. Shared `Button` link/action split, all affected callers and the nested-anchor cases fixed, `inert` closed mobile menu with `aria-expanded`, shared header-height scroll offset. `refreshed=true` reload workaround removed from `/registrace` and `/wait-list`. Duplicate `tailwind.config.ts` / `postcss.config.mjs` and the broken Inter-italic / `CustomFont` / Geist references removed. GTM, Quanda and the `/zdravotnici` video preserved. All work uncommitted; no publication. No change to phase structure, acceptance criteria, quality IDs, commercial terms or permissions.
- 2 September 2026 — Codex review found two local defects (R1 responsive-image descriptors, R2 modifier-click interception) and set Q-003/Q-004 to local FAIL.
- 2 September 2026 — Corrections R1–R3 applied by Claude Code: registry-driven `ResponsiveImage` with truthful `srcset`, `images.unoptimized` global; ordinary-activation guards on every fragment handler; focused-browser re-verification within the harness's fixed 1728 px viewport. Q-003 and Q-004 → PASS (local); harness-blocked interactive checks stay `NOT_RUN`. Q-001/Q-002/Q-005/Q-006/Q-016 unchanged (Q-002/Q-005 PASS, others PASS local / remote NOT_RUN). Phase 01 stays `in_review`, all work uncommitted; no publication. No change to phase structure, acceptance criteria, quality IDs, commercial terms or permissions.

- 2 September 2026 — Codex assessed the R1–R3 correction report, passed a fresh static build/typecheck and focused HTTP/decoded-image checks, reconciled README/current evidence and prepared the first full implementation `/recheck`. Required mobile/keyboard/scroll verification remains NOT_RUN; no acceptance or publication.

- 2 September 2026 — Both implementation-review reports assessed. Codex verified three generator failure cases and confirmed seven transitive development-dependency audit findings. R4/R5 are the bounded remaining local correction assignment; optional refactors/tests were not adopted, and actual mobile/preview gates remain open.
- 2 September 2026 — Corrections R4/R5 applied by Claude Code. R4: `isPlainActivation` in `app/lib/smoothScroll.ts` now also reads the activating anchor's `currentTarget.target` and intercepts only absent/empty or `_self`; `_blank`/`_parent`/`_top`/named targets fall through. Applied through the shared guard used by every fragment handler and the Header home-logo handler (`Header.tsx`/`Footer.tsx` param types adjusted). Guard matrix verified by focused direct checks (12 cases) plus the earlier browser synthetic-event run; no live caller supplies a non-self target, so this is latent hardening. R5: `npm audit fix` (no `--force`) updated 10 transitive dev-dependency nodes within the existing ranges — brace-expansion 2.0.1→2.1.4, browserslist 4.24.4→4.28.8 (+ electron-to-chromium/node-releases/update-browserslist-db), glob 10.4.5→10.5.0, minimatch 9.0.5→9.0.9, picomatch 2.3.1→2.3.2, postcss-selector-parser 6.1.2→6.1.4, yaml 2.7.0→2.9.0. `package.json` and all selected direct versions unchanged. `npm ci`, `npm run pages:build`, `npm run typecheck` exit 0; `npm audit` reports 0 vulnerabilities. Remaining: `glob@10.5.0` prints a maintainer deprecation notice (support-policy message, not a vulnerability; moving to glob 11 needs a `sucrase`/Tailwind update, out of scope). Phase 01 stays `in_review`, all work uncommitted; no commit, push, deploy or Cloudflare change. No change to phase structure, acceptance criteria, quality IDs, commercial terms or permissions.
- 2 September 2026 — Codex completed the focused R4/R5 assessment: actual exported guard checks, fresh static build/typecheck and current audit all passed (0 vulnerabilities). Direct versions remain as selected, remote production is still at the baseline and remote redesign does not yet exist. Current handoff now prepares the first preview publication, pending owner settings confirmation and commit/push authorization. No application code, dependency, Git ref or Cloudflare setting was changed by Codex; phase remains in_review and the outstanding interaction/remote gates remain open.
