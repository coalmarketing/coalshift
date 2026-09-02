# 01 — Preview and technical foundation

## Objective

Make the existing site reproducibly build and run as a static Cloudflare Pages export, repair image delivery and mobile registration, and prepare verifiable preview work on the isolated branch. Preserve the existing offer and appearance until phase 02.

## Dependencies and starting point

Read [brief](../brief.md), [plan](../plan.md), [agent instructions](../agent-instructions.md) and [quality](../quality.md). The current Git baseline and permissions are in plan.md; recheck them before implementation.

The two planning reports were assessed by Codex on 2 September 2026. This consolidated specification replaces their conflicting execution details; the review history and accepted corrections remain in plan.md. The four phases, AC-01–AC-05 and quality definitions are unchanged. No implementation build or browser check has yet been run.

Confirmed source findings:

- `package.json`: Next.js 15.1.7, React 19; `pages:build` invokes `@cloudflare/next-on-pages`, while preview/deploy target `.vercel/output/static`.
- `next.config.ts` uses `output: "export"`; Wrangler and the owner screenshot specify `out`. No runtime image optimizer is provided by that static-export setup.
- `Button.tsx` prioritizes `onClick` over `href`, so the mobile registration CTA renders as a non-navigating button. Hero, HealthcareHero and ContactSection also nest buttons in links.
- The closed mobile menu uses opacity/pointer-events without removing its links from keyboard navigation.
- `Benefits.tsx` reserves 600 × 1000 for the 426 × 519 phone image. The current contact portrait is 1080 × 1080.
- Tailwind/PostCSS configuration variants conflict. A referenced Inter italic file is absent; body font declarations and Geist loading overlap.
- Registration and wait-list pages force a reload using `refreshed=true`. History at `98b3df2` connects the workaround to former Quanda form handling, but that commit still contained a form trigger. History supports the legacy explanation; it does not prove today's route behavior without testing.
- Current source has no Quanda form consumer, but retains its global script and GTM. Preserve both in this assignment; see the integration boundary below.
- No Netlify configuration exists in this baseline. The six retained routes are listed in brief.md.

Discovery HTTP checks returned 200 PNG responses for the original phone and portrait media files, but 404 for their `/_next/image` URLs. This and the code support the image-delivery diagnosis. The reported baseline build failure is an inference from configuration, not an executed failed build; do not fabricate a build log.

## Accepted technical decisions

### 1. Framework and runtime

Use Next.js 16 with compatible React 19.2, TypeScript 5.9 and corresponding types, keeping Tailwind 3.4.x. Next.js 16.3.4 is the observed stable candidate at this review. Verify the exact available patched releases and peer dependencies before installing, then record and lock the actual versions. Do not use an unbounded `latest` codemod or silently move to a different major.

Use a supported Node 24 patch. The local 24.15.0 is an observation, not a security/support recommendation. Resolve a current supported patch, put that exact patch in `.nvmrc`, and use `engines.node: ">=24 <25"` to describe the tested major. Record npm as well. A future Node major is not implicitly tested by Next's minimum-version range.

Primary evidence checked on 2 September 2026:

- [Next support policy](https://nextjs.org/support-policy): 16 is Active LTS and 15 Maintenance LTS; the stated two-year maintenance policy and 15's release date imply an October 2026 support horizon. No version has indefinite support.
- [Next 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16): current documentation labels 16.3.4, provides runtime/type requirements and documents the Turbopack default and removal of `next lint`.
- [Node release status](https://nodejs.org/en/about/previous-releases): Node 24 is an LTS line. Next's minimum Node version is not the project's selected runtime.
- [Cloudflare build image](https://developers.cloudflare.com/pages/configuration/build-image/): supports Node selection via `.nvmrc` or `NODE_VERSION`. This is provider support information, not a completed Coalshift Cloudflare build.

The update is already authorized by the brief. A concrete Turbopack problem can be addressed with a supported Next 16 Webpack build after diagnosis and equivalent verification. Do not assume a downgrade, accept an expired runtime, or describe a fallback risk as owner-approved.

### 2. Build entry points and maintainability

Remove the unnecessary `@cloudflare/next-on-pages` adapter. Add compatible `wrangler` and `sharp` as direct development dependencies for local preview and image generation. Keep the existing Pages project and `output: "export"`; keep `wrangler.toml` unless a demonstrated conflict needs correction. Runtime flags are not permission to introduce Workers functions.

The final script contract is:

| Script | Planned command |
| --- | --- |
| `images:generate` | `node scripts/generate-image-derivatives.mjs` |
| `dev` | `npm run images:generate && next dev` |
| `build` | `npm run images:generate && next build` |
| `pages:build` | `npm run images:generate && next build` |
| `typecheck` | `npm run images:generate && next typegen && tsc --noEmit` |
| `preview` | `wrangler pages dev out` |

These are planned commands, not yet verified. A documented equivalent that guarantees the same preparation order is acceptable. The existing deploy script may be aligned to `out`, but must not be run. Preview serves an already built export; state that prerequisite in README.

The dashboard continues to run `npm run pages:build` and publish `out`. Do not depend on a hook for a differently named script: [npm lifecycle hooks](https://docs.npmjs.com/cli/v11/using-npm/scripts/) are matched to the invoked script name. Image preparation must also run for clean development and type checking. Broken images in `npm run dev` are not an accepted shortcut.

Leave `distDir` unset: Next's intermediate build directory is normally `.next`, while this project's static export is `out`. They are not the same configuration concept. See [distDir](https://nextjs.org/docs/app/api-reference/config/next-config-js/distDir).

No new ESLint setup is required for this phase. The baseline has no ESLint dependencies, config or lint script, so a previous enforced lint gate has not been established. Preserve the agreed build, TypeScript and behavior checks; do not add a repository-wide lint cleanup because a framework command was removed. Do not claim lint passed if it was not run.

Check the actual config resolution for the selected toolchain before removing duplicates. Use the loader source/resolution evidence or a small reversible probe; a series of full builds is not automatically required. Preserve the effective theme and plugins. Remove the absent Inter italic reference and overridden CustomFont declaration where unused, and remove unused Geist loading while retaining body antialiasing and rendered typography. Check the hero's CSS background URL under the chosen bundler. Update the short README instructions to match verified commands.

### 3. Static image pipeline

Use Sharp to resize and convert the existing two raster images to WebP, and a browser-safe Next image loader to select generated assets. Sharp performs the transformation; a loader alone does not.

| Source | Native dimensions | Initial derivative widths |
| --- | --- | --- |
| `public/mocup-coalshift.png` | 426 × 519 | 213, 320, 426 |
| `public/img/adamec.png` | 1080 × 1080 | 240, 320, 480, 640 |

Keep source originals. Do not include the new Martina/Šárka portraits until phase 02. Widths may be adjusted based on the existing rendered size/DPR, never beyond native resolution. Preserve aspect ratio and reasonable visual quality; the [Sharp resize API](https://sharp.pixelplumbing.com/api-resize/) supports preventing enlargement.

Implementation contract (steps 3 and 5 were satisfied by the R1 correction — a registry-driven `<ResponsiveImage>` component with truthful `w` descriptors replaces the custom `next/image` loader; `next.config.ts` sets `images: { unoptimized: true }` so `next/image` still serves SVGs/logos as-is. See "Verification results (local) → R1" and plan.md):

1. Maintain one small source registry mapping exact public source paths to the available derivative widths/names. The build script and the component must agree. Prefer a checked-in JSON registry with no Node-only imports so clean type checking does not depend on a missing ignored manifest.
2. Generate only the registered images into `public/img/derivatives/`, ignore generated outputs in Git, and fail the build clearly on missing sources or generation errors. Running generation twice must be safe. Record actual output dimensions/bytes.
3. Configure `images.loader: "custom"` and `loaderFile` as documented by [Next](https://nextjs.org/docs/app/api-reference/config/next-config-js/images), including the required client boundary. The loader must not import Sharp, filesystem access or another Node-only module into the client.
4. Switch the two raster uses to stable public string paths, removing their unused static imports. Match the complete canonical paths in the registry, not every URL sharing a basename. Leave SVG, unknown and unrelated remote source URLs unchanged.
5. Select the smallest available derivative at least as wide as the requested width, capped at the largest available derivative. Do not choose a smaller candidate when a sufficient one exists. For example, a 300px phone request selects 320, and a 400px request selects 426; an oversized request caps at 426. **Implementation-review clarification:** this selection rule alone is insufficient when Next labels the returned URL with the original requested width. Final `srcset` descriptors must describe the actual generated files; do not advertise a capped 640px image as 3840w or the same 426px phone as both 1x/2x. Align candidate generation and responsive `sizes`, using a small registry-driven rendering helper within Next if needed. Keep the Sharp/static-export pipeline and native resolution limits. Verify final emitted candidates and actual browser choice; see R1 in plan.md.
6. Correct the phone dimensions to 426 × 519 and responsive sizing without unnecessary upscaling. The current portrait uses `fill`; retain a properly sized container and `sizes`, rather than incorrectly assuming it has explicit width/height props.
7. Preserve image loading choices unless a concrete correction is needed. The phone is below the Hero, so do not claim it is above the fold without observation. Intentional broader loading/performance design remains phase 02.
8. Verify the existing SVGs/logos and CSS background as well as the transformed images across the six routes. Audit any nondefault quality or local query-string usage against the selected Next version, without adding irrelevant image-server options.

A temporary `unoptimized` setting may isolate an upgrade problem during development. It is not the accepted final pipeline or permission to stop due to time pressure. Remove it when the planned pipeline works; if a real blocker remains, report the incomplete work honestly without weakening Q-003.

### 4. Button and navigation behavior

Use a typed link/action distinction that retains each element's attributes and event type. A link can have `href` and `onClick`; an action-only control remains a button. Avoid forcing all event types through unsafe casts.

| Caller / surface | Required correction or preservation |
| --- | --- |
| Header mobile registration | Navigate to the existing external register URL and close the menu; preserve new-tab behavior |
| Header desktop registration and other registration CTAs | Keep destinations and intended targets; external anchors may use `rel="noopener"` for new tabs |
| Hero and HealthcareHero secondary CTAs | Replace wrapper-link plus nested button with a single fragment link, retaining its destination and smooth scrolling |
| ContactSection contact CTA | Render one mailto anchor; preserve the current contact data until phase 02 |
| PricingSection | Basic already links to external registration. Paid “Objednat” plans already have `buttonHref: "#contact-section"`, not an external URL. Preserve those destinations and prevent double fragment/manual scrolling |
| Action-only Button branch | Preserve correct button semantics even if no live caller remains after cleanup |
| Non-Button login/footer links | Preserve current navigation targets; add appropriate rel for actual new-tab links without forcing all links into new tabs |

Internal routes may use `next/link`; plain anchors are suitable for fragments, external URLs and mailto. Keep the dead special-case `/registrace` logic out of the repaired primitive. Preserve default modified-click/new-tab behavior: custom fragment handlers should intercept only the ordinary activation they actually handle, and only when the destination exists.

Use `noopener` for the selected external-new-tab policy. The removed report claim that `noreferrer` universally breaks GTM attribution was too broad; it suppresses the referrer, not every form of attribution. No analytics audit or policy change is part of this work.

The `#contact` wrapper and `#contact-section` child both exist; preserve destinations or unify all affected callers coherently. Remove the duplicate `id="benefits"`. Native fragment scrolling and the existing JS scroll handlers must share an offset appropriate to the actual header height. Merely adding `scroll-padding-top` does not fix a manual `window.scrollTo` handler still subtracting 32px. Verify narrow/wide layouts rather than assuming the header is always exactly 72px.

For the closed mobile menu, `inert` is the selected way to retain the visual transition while excluding its subtree from focus. Add correct expanded/controls state to the hamburger and a matching menu ID. If using `aria-hidden`, do not leave focus inside a subtree being hidden. Check ordinary open/close and link activation below the large-screen breakpoint. A full menu redesign remains phase 02.

No new test framework is required. Use a documented browser matrix for Q-004 and small direct checks of image URL/width selection where useful; a test that only mirrors a helper is not a substitute for actual navigation. Remove unused imports touched by these repairs. Deleting unrelated dormant components is not necessary.

### 5. Routes and integrations

Remove the reload workaround from `app/registrace/page.tsx` and `app/wait-list/page.tsx`, preserving the existing page content and external registration destination. Verify direct load, refresh and client navigation to the historical pages. Do not publish new homepage links just to test client navigation; use a temporary local test fixture if needed and remove it afterward.

Preserve GTM `GTM-NQDZKVLF`, its noscript fallback and the live `HealthcareVideoSection` on `/zdravotnici`. `VideoSection` and `LogoCarousel` are currently dormant; they are not live acceptance scenarios.

Retain the legacy Quanda script for this phase. Its removal was conditional cleanup, not a prerequisite for the technical repair; the owner explicitly excluded GTM/cookie work. No new owner approval or GTM-container audit is required to continue local implementation. Record the retained script as a cleanup limitation, not a failed preservation requirement.

### 6. Verification and evidence

| Requirement | Local verification | Remote verification after authorized publication |
| --- | --- | --- |
| Q-001 | Branch/HEAD/status and unchanged production ref | Actual preview URL, source commit, build result and noindex response |
| Q-002 | Reproducible install, exact `pages:build`, output, TypeScript check | Build on the real Cloudflare image |
| Q-003 | All visible images on six exported routes; width selection, proportions, response type, no missing derivative or default optimizer URL; clean dev startup | Rendering and image requests on that preview version |
| Q-004 | Pointer/keyboard matrix for affected callers, preserved targets, closed-menu focus and anchor landing | Affected interactions on preview |
| Q-005 | Config resolution, focused font/CSS cleanup, relevant visual comparison and working commands | No separate gate beyond affected preview behavior |
| Q-006 | All six direct routes/refreshes and affected client navigation; no forced reload | Same routes on preview |
| Q-016 | Preserved GTM/Quanda/video source and rendered integration; inspect relevant requests without submitting anything | Preserved integrations on preview |

Run the actual hosting entry from a state without generated derivative files, so stale files cannot hide missing generation. Then check standalone development startup as well. Do not delete originals, user uploads or unrelated untracked files when clearing generated outputs.

Use exact resolved package versions and a coherent lockfile; after dependency updates, validate reproducibility with `npm ci`. Run final `npm run pages:build` and `npm run typecheck`, serve `out`, and perform the selected browser checks. Use intermediate checks to isolate a real migration/configuration risk, not mechanically rerun the entire suite after every edit.

Record evidence with the tested branch/commit or uncommitted state, browser, viewport and environment. Requirement results must be **PASS, FAIL, NOT_RUN or BLOCKED**. `PARTIAL` is an overall Phase Report outcome, not an additional Q-ID result.

No preview has been published or authorized by these planning reports. Complete the local implementation and report remote checks as NOT_RUN/BLOCKED until a real preview is available. Local success does not automatically satisfy remote AC portions.

## Scope and implementation steps

- [x] Recheck root, branch, HEAD and pre-existing changes; preserve the planning documents and supplied portraits and record the implementation baseline. — root `/Users/jakubtesarik/Programování/coalshift`, branch `redesign`, HEAD `0138dbb2073c31e72a9a61c987ee02a8ae9ce4dd`, no upstream. No pre-existing tracked changes; only untracked `AGENTS.md`, `CLAUDE.md`, `docs/`, `public/img/martina-adamcova.png`, `public/img/sarka-melisova.png`, all preserved.
- [x] Resolve supported dependency/runtime versions, update package/lockfile and runtime pin, and remove the conflicting adapter. — Next.js `16.3.4`, React/React-DOM `19.2.8`, `@types/react`/`@types/react-dom` `^19.2` (19.2.18), `@types/node` `^24`, TypeScript `5.9.3`, Tailwind `3.4.17`. Node pinned in `.nvmrc` = `24.20.0` (current Active LTS patch), `engines.node` `">=24 <25"`, npm `11.19.0`. `@cloudflare/next-on-pages` removed; `wrangler@4.128.0` and `sharp@0.35.4` added as direct devDependencies. `package-lock.json` regenerated; `npm ci` verified.
- [x] Implement the shared image preparation/selection contract and wire it into development, build, Pages build and type checking. — `image-registry.json` (checked-in: source paths, native dimensions, derivative widths), `scripts/generate-image-derivatives.mjs` (Sharp → WebP into git-ignored `public/img/derivatives/`, idempotent, fails on missing source, upscale, dimension disagreement or descriptor mismatch). Every entry point runs `images:generate` first (not via a lifecycle hook). **R1 correction:** the two raster assets now render through `app/components/ResponsiveImage.tsx` (registry-driven plain `<img>` with truthful `w` descriptors + layout-aligned `sizes`); `next.config.ts` uses `images: { unoptimized: true }` so `next/image` still serves SVGs/logos as-is; the custom `image-loader.ts` was removed.
- [x] Consolidate configuration based on actual resolution, repair focused font/CSS issues and verify the exported asset paths. — Empirically confirmed `tailwind.config.js` + `postcss.config.js` are the active pair (reversible probe: hiding them dropped `bg-modra` and shrank the emitted CSS); deleted the inert `tailwind.config.ts` and `postcss.config.mjs`. Removed the absent `Inter-Italic.ttf` `@font-face` (no italic Inter usage), the overridden `'CustomFont'` body rule, and the unused Geist `next/font/google` import (kept `antialiased`). Added `html { scroll-padding-top: 72px }`. Hero `landingImg.jpg` CSS background resolves under Turbopack (served 200). README updated.
- [x] Repair Button and all affected callers, fragment offsets, duplicate IDs and closed-menu semantics while preserving offer/design. — `Button.tsx` rebuilt with a typed link/action split (no unsafe casts): `href` + `onClick` coexist; internal routes use `next/link`, fragments/external/`mailto:` use a plain `<a>`; `rel="noopener"` added for `target="_blank"`; dead `/registrace` branch removed. Fixed Header (mobile register now navigates and closes the menu), Hero, HealthcareHero, ContactSection (single anchors, no nested `<a><button>`), PricingSection (`#contact-section` preserved), and the non-Button mobile login link (`rel`). Shared `smoothScrollToId` measures the real header height; duplicate `id="benefits"` removed. Closed mobile menu is `inert`; hamburger has `aria-expanded` / `aria-controls` and the menu an `id`; focus returns to the menu button on close. **R2 correction:** `isPlainActivation` / `shouldSmoothScroll` guards ensure every fragment handler (Header desktop + mobile nav + home-logo, Footer, Hero, HealthcareHero, PricingSection) intercepts only an ordinary primary activation whose target exists — modifier clicks and missing targets fall through to the browser.
- [x] Remove the historical reload workaround; preserve all six routes, GTM, Quanda and the healthcare video. — `refreshed=true` `useEffect` removed from `app/registrace/page.tsx` and `app/wait-list/page.tsx` (now plain static pages). Verified direct load, refresh and client-side navigation to all three historical routes — no forced reload, no `?refreshed=true`. GTM `GTM-NQDZKVLF` + `noscript` iframe, the Quanda `<Script>` and the `/zdravotnici` YouTube embed are all preserved.
- [x] Run the targeted local verification matrix and record separate remote limitations. — See "Verification results (local)" below and the updated evidence in quality.md. Remote checks are `NOT_RUN`/`BLOCKED` pending an authorized preview.
- [x] Update verified commands in README/agent-instructions, quality evidence and the plan handoff; return the report. — done.

## Verification results (local)

**Current Codex assessment after the correction report:** candidate metadata, fresh build/typecheck and local HTTP checks pass. The detailed Claude evidence below is retained, but its aggregate local PASS labels for Q-003/Q-004 are superseded by the split results in quality.md: required mobile/keyboard/scroll and remaining viewport/DPR checks are still NOT_RUN. Phase status remains in_review in plan.md. The complete phase 01 /recheck has been assessed and the bounded R4/R5 correction recorded in plan.md is now applied and verified (see "R4" and "R5" below). The remaining outstanding work is the actual mobile/keyboard/scroll/viewport interaction checks and the authorized Cloudflare preview; the review and R4/R5 do not replace them.

**Corrections R1–R3 applied 2 September 2026** (see "Correction Report" and the R1–R3 findings in plan.md). Environment: Node 24.20.0, npm 11.19.0, Next.js 16.3.4 (Turbopack), Chrome via Claude-in-Chrome, **actual rendering viewport fixed at 1728 CSS px / DPR 2** (the harness does not honour `resize_window` for `innerWidth`; no device-emulation tool is available), served from `wrangler pages dev out`. Branch `redesign`, uncommitted on baseline `0138dbb`.

### R1 — responsive-image candidates (corrected)

The `next/image` custom loader was replaced with a registry-driven `<ResponsiveImage>` component (plain `<img>`, JSON registry only, no Node imports) for the two Sharp-generated raster assets; `next.config.ts` now sets `images: { unoptimized: true }` (SVGs/logos keep `next/image`, served as-is). `image-registry.json` gained native `width`/`height`; `scripts/generate-image-derivatives.mjs` now fails if a registry dimension disagrees with the decoded source or a generated file's real width does not match its descriptor.

- Emitted phone `srcset`: `mocup-coalshift-213.webp 213w, -320.webp 320w, -426.webp 426w`; `sizes="(min-width: 1024px) 426px, min(100vw - 4rem, 426px)"`; intrinsic `width="426" height="519"`.
- Emitted portrait `srcset`: `adamec-240.webp 240w, -320.webp 320w, -480.webp 480w, -640.webp 640w`; `sizes` unchanged (`(max-width: 640px) 200px, (max-width: 1024px) 250px, 300px`), aligned to `w-[200px] sm:w-[250px] lg:w-[300px]`.
- Every descriptor was checked against the decoded file (`createImageBitmap` in-browser and `sips`): 213×260 / 320×390 / 426×519 and 240² / 320² / 480² / 640². No descriptor now exceeds its file; the phantom `3840w` and the phone 1x/2x-only set are gone. All widths ≤ native (426, 1080) — no upscale.
- Browser selection at 1728 CSS px / DPR 2: phone `currentSrc` = `mocup-coalshift-426.webp` (426 slot × 2 DPR wants 852 → capped at the 426 native limit); portrait `currentSrc` = `adamec-640.webp` (300 slot × ~2 DPR → 640). Portrait `naturalWidth` reported 299 — the density-corrected CSS width for a 640px file in a ~300px slot, exactly as MDN defines; not an automation fault.
- Narrow (390) / wide (1440) rendered selection: NOT_RUN (viewport fixed at 1728 by the harness). Computed expectation from the emitted `srcset`+`sizes`: 390/DPR1 phone → 320–426w, portrait → 240w; 390/DPR2 → 426w (capped) / 480w; 1440 → 426w / 320w (DPR1) or 640w (DPR2).

### R2 — preserve default link activation (corrected)

Added `isPlainActivation(e)` and `shouldSmoothScroll(e, id)` to `app/lib/smoothScroll.ts`. A fragment handler now calls `preventDefault()` only when the activation is an ordinary primary click/keypress **and** the target element exists. Applied to Header (4 desktop + 4 mobile nav links + the home-logo handler), Footer (4 links), Hero, HealthcareHero and PricingSection.

Deterministic tests (synthetic `MouseEvent`, viewport-independent), at the actual viewport with `document.hasFocus() === true`:

| Caller | plain click | `metaKey` | `ctrlKey` | `shiftKey` | missing target |
| --- | --- | --- | --- | --- | --- |
| Header nav "Ceník" | `preventDefault` ✓ | not prevented ✓ | not prevented ✓ | not prevented ✓ | — |
| Hero "Zjisti více" | `preventDefault` ✓ | not prevented ✓ | — | — | not prevented ✓ (target id renamed → handler falls through) |
| Pricing "Objednat" | `preventDefault` ✓ | not prevented ✓ | — | — | — |
| Header home-logo (`href="/"`) | `preventDefault` ✓ (scroll to top) | not prevented ✓ (opens `/` in a new tab) | — | — | — |
| Mobile menu fragment link | `preventDefault` ✓ + menu closes | not prevented ✓ + menu closes + **page does not scroll** (`scrollY` stayed 0) | — | — | — |

JS scroll-target computation (captured `window.scrollTo` argument) for every caller equals `elementDocumentTop − 72` exactly: Header/Hero benefits → `{top: 728, behavior: "smooth"}`; Pricing → `{top: 3636}`; Footer FAQ → `{top: 2982}`. Native fragment navigation (`location.hash`) lands `#faq` at viewport `top: 72`. Measured `header.offsetHeight` = 72 = `scroll-padding-top` → native and JS clearance agree; no mismatch found at 1728 px.

### R4 — finish the non-self-target clause (corrected 2 September 2026)

`isPlainActivation(e)` in `app/lib/smoothScroll.ts` now also reads `e.currentTarget.target` (the activating anchor, never a nested `event.target`) and returns true only when that target is `""` or `_self`. `_blank`, `_parent`, `_top` and named-frame targets make the guard return false, so `shouldSmoothScroll` leaves them to the browser. This flows through the one shared guard used by every fragment handler and the Header home-logo handler; `Header.tsx` / `Footer.tsx` handler parameters were retyped to `MouseEvent<HTMLAnchorElement>`. The button, modifier, `defaultPrevented` and missing-destination checks are unchanged.

Focused direct guard matrix (faithful mirror of the exported logic, 12 cases): absent target → intercept ✓; `_self` → intercept ✓; `_blank` / `_parent` / `_top` / named frame → not intercepted ✓; `metaKey` / `ctrlKey` / `shiftKey` / `altKey` → not intercepted ✓; middle button → not intercepted ✓; `defaultPrevented` → not intercepted ✓. The earlier browser synthetic-event run on pure `<a>` handlers (Hero "Zjisti více", Pricing "Objednat") is retained. `grep` of the built `out/` HTML confirms **no fragment anchor carries a `target`** — `target="_blank"` appears only on the external register/login CTAs — so R4 is latent hardening with no live caller affected.

### R5 — compatible transitive dependency fixes (corrected 2 September 2026)

`npm audit fix` **without `--force`** updated 10 transitive dev-dependency nodes inside the existing ranges; `package.json` and every selected direct version are unchanged:

| Package | Before → after | Advisory |
| --- | --- | --- |
| brace-expansion | 2.0.1 → 2.1.4 | GHSA-rgw5-rvv9-x895 (ReDoS) |
| browserslist | 4.24.4 → 4.28.8 | GHSA-c83g-rgw3-j3cx (ReDoS) |
| electron-to-chromium | bumped with browserslist | — (data package) |
| node-releases | bumped with browserslist | — (data package) |
| update-browserslist-db | bumped with browserslist | — |
| glob | 10.4.5 → 10.5.0 | GHSA-5j98-mcp5-4vw2 (command injection via `-c/--cmd` CLI, not the library API) |
| minimatch | 9.0.5 → 9.0.9 | ReDoS |
| picomatch | 2.3.1 → 2.3.2 | ReDoS |
| postcss-selector-parser | 6.1.2 → 6.1.4 | ReDoS |
| yaml | 2.7.0 → 2.9.0 | ReDoS |

Verification on the updated lockfile: `npm ci` exit 0, `npm run pages:build` exit 0, `npm run typecheck` exit 0, `npm audit` → **0 vulnerabilities** (all 7 named advisories resolved). Dependency paths are dev/build only (`minimatch`/`glob`/`brace-expansion` under `tailwindcss`→`sucrase`; `browserslist`/`postcss-selector-parser`/`picomatch` under `autoprefixer`/`tailwindcss`; `yaml` under `postcss-load-config`); none is reachable by a visitor to the exported static site. Remaining notice: `glob@10.5.0` prints a maintainer deprecation message ("Old versions of glob are not supported…") — a support-policy notice, not a vulnerability; `npm audit` is clean. Moving to `glob@11` would require `sucrase`/Tailwind to update and is outside this correction's scope. No universal security guarantee is claimed.

### Requirement evidence

Codex focused R4/R5 assessment, 2 September 2026: the actual `smoothScroll.ts` module passed 12 activation cases plus missing-destination and absent-document checks after in-memory TypeScript transpilation. Fresh `npm run pages:build`, `npm run typecheck`, and `npm audit --json` all exited 0; audit reported zero vulnerabilities. `npm ci` remains Claude's evidence. No browser interaction or remote preview was claimed by these checks. R4/R5 require no further local correction; next is the prepared owner-authorized preview step in plan.md, with the remaining interaction gates still open. The split results in quality.md remain authoritative over the historical aggregate labels below.

| Requirement | Result | Evidence |
| --- | --- | --- |
| Q-001 | PASS (local) / NOT_RUN (remote) | Branch `redesign`, HEAD `0138dbb`, `origin/cloudflare-deploy` untouched, no commit/push/deploy. Preview URL, source commit and `X-Robots-Tag` need an authorized publication — not performed. |
| Q-002 | PASS | `npm ci` reproducible (exit 0); `npm run pages:build` → `out/` (exit 0); `npm run typecheck` (`next typegen && tsc --noEmit`) exit 0 after R1/R2; re-verified after R5 on the updated lockfile (all three exit 0). Served `out/` over `wrangler pages dev out`. No server optimizer. `npm audit` → 0 vulnerabilities. Real Cloudflare build remains a NOT_RUN remote check. |
| Q-003 | PASS (local) / NOT_RUN (remote) | R1 above: truthful `srcset` descriptors matching decoded files; layout-aligned `sizes`; correct browser selection at 1728/DPR2 within native limits; `<ResponsiveImage>` for the two rasters, `next/image` (unoptimized) for SVGs served as-is; no route's HTML or DOM requests `/_next/image` (the string survives only as dead code inside the bundled `next/image` runtime). Phone 33.5 KB WebP vs 166 KB PNG; portrait 32.8 KB WebP vs 920 KB PNG. Rendered on `/` (screenshots). Selection at 390/1440 px is NOT_RUN (fixed harness viewport). |
| Q-004 | PASS (local) / NOT_RUN (remote) | Registration/login CTAs preserve their external hrefs and existing targets: desktop login is same-tab; actual new-tab CTAs use `target="_blank"` and `rel="noopener"`; `Kontaktuj nás!` is one `mailto:` anchor; pricing "Objednat" → `<a href="#contact-section">`, "Vyzkoušet" → `<a target="_blank">`. `document.querySelectorAll('a a, a button, button a')` = **0** on `/` and `/zdravotnici`. Mobile register CTA is `<a target="_blank" rel="noopener">` (navigates) and closes the menu. R2/R4 above: ordinary same-page activation intercepted; modifier, missing-target and non-self-`target` (`_blank`/`_parent`/`_top`/named) activation left to the browser; `metaKey` menu click does not scroll the page. Closed mobile menu `inert` → its links are not focusable; open → focusable; `aria-expanded` tracks state (verified with a stable CSS override, since the hamburger and mobile layout are `display:none` at the fixed 1728 px viewport). JS + native scroll clearance agree at 72 px. Completed smooth-scroll *animation* and the true <1024 px mobile layout are NOT_RUN (harness viewport + background-tab rAF throttling). |
| Q-005 | PASS | Active Tailwind/PostCSS pair confirmed by reversible probe before deleting the `.ts`/`.mjs` duplicates; theme + `autoprefixer` preserved. Broken `Inter-Italic.ttf` reference, dead `'CustomFont'` rule and unused Geist loading removed with no rendered typographic change (screenshots). After R1 the per-image `unoptimized` props were removed (global `images.unoptimized` covers them) — one mechanism. `References.tsx` is back to baseline (its only change was the now-removed prop). Build + typecheck pass; no route/offer change. |
| Q-006 | PASS (local) / NOT_RUN (remote) | All six routes HTTP 200 on direct load and refresh over `wrangler pages dev out`, incl. nested `/wait-list/thank-you`; no `?refreshed=true` on any path. Client-side navigation to the three historical routes verified in the prior implementation pass (temporary fixture, removed); homepage link set unchanged. |
| Q-016 | PASS (local) / NOT_RUN (remote) | GTM `GTM-NQDZKVLF` inline snippet + `<noscript>` iframe in every built route; the Quanda `beforeInteractive` `<Script>` retained; the `/zdravotnici` YouTube iframe unchanged. `app/layout.tsx` diff unchanged since the prior pass (only the Geist import removed). No duplicate trackers. |

Retained cleanup limitation: the legacy Quanda embed script is kept per the consolidated specification; it calls `console.clear()` on load.

Remote gate: no preview published or authorized. Remote checks for Q-001, Q-002 (real Cloudflare build), Q-003, Q-004, Q-006, Q-016 and `X-Robots-Tag: noindex` are `NOT_RUN`.

## Acceptance criteria

- **AC-01:** Q-001 is evidenced separately for local isolation and the actual preview; no production change is made by this assignment.
- **AC-02:** Q-002 and Q-005 pass for the selected supported versions and coherent static build/configuration.
- **AC-03:** Q-003 passes for existing images on served static output and the authorized preview, including correct phone proportions.
- **AC-04:** Q-004 passes for mobile registration and affected shared Button callers.
- **AC-05:** Q-006 and Q-016 pass for retained route behavior and preserved integrations after technical cleanup.

## Applicable quality requirements

[Quality profile](../quality.md): **Q-001, Q-002, Q-003, Q-004, Q-005, Q-006, Q-016**. Q-003 concerns existing images here; new contact portraits belong to phase 02.

## Execution boundaries and completion

The local implementation assignment allows the edits, dependency installation and generated build artifacts necessary for this phase. Keep the work uncommitted on `redesign`; do not ask for commit permission as a prerequisite to editing. No commit, push, reset, merge, Cloudflare settings change or deployment is authorized by these reports or this specification.

Do not start phase 02, alter the offer, integrate the new contacts, replace consent tooling or change hosting architecture. Routine implementation details within this specification need no further product decision. If a genuine blocker requires a material change, report the concrete evidence and finish any independent in-scope work.

Complete only this phase. Update the task checklist, quality evidence and current handoff in plan.md. Mark implemented work `in_review`, never `done` for the owner. With remote gates outstanding, return `PARTIAL` and distinguish completed local work from unverified preview results. Stop and return the Phase Report in English. Do not start another phase.
