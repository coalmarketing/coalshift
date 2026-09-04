# Coalshift — Plan and handoff

## Approved scope

Redesign and revision of the existing Czech marketing website for coalshift (a
coalsoft s.r.o. product): a coherent coalfamily identity in coalsoft blue,
corrected content / pricing / mobile navigation / image delivery, and improved
accessibility, SEO, responsive behavior and maintainability, delivered across
five phases and ending with the owner-requested cleanup and production release.
The stack (Next.js App Router + React + TypeScript + Tailwind, static export on
Cloudflare Pages) is retained. The separate application at `app.coalshift.cz` is
out of scope. See [architecture.md](architecture.md),
[design-system.md](design-system.md), [content-and-seo.md](content-and-seo.md),
[operations.md](operations.md) and [quality.md](quality.md).

## Phases

| ID | Phase | Status | Dependencies | Expected outcome |
| --- | --- | --- | --- | --- |
| 01 | Preview and technical foundation | done | Initialization + planning review | Coherent static build, patched dependencies, working images and mobile CTA, documented preview setup |
| 02 | Homepage and design | done | Accepted 01; supplied portraits | Reference-faithful blue design, working homepage controls, monthly pricing/contacts, two Waulter legal pages, healthcare redirect |
| 03 | Pages and SEO | done | Accepted 02 | Public references page, four-route SEO, 301s from retained legacy URLs to `/` |
| 04 | [Cleanup, optimization and release](Phases/04-cleanup-optimization-and-release.md) | in_review | Accepted 03; `/replan` complete 3 Sep 2026 | Concise current documentation, purposeful code/assets, reviewed Git integration, verified Cloudflare production deployment. **Stage A implemented (this review); stage B = the authorized release.** |
| 05 | [Calendly and integrations](Phases/05-calendly-and-integrations.md) | planned | Completed 04; owner finalizes integration scope + supplies event/organizer | Approved Calendly integration and any separately agreed additions |

Allowed status values: `planned`, `ready`, `in_progress`, `in_review`, `blocked`,
`done`. This table is the only source of phase status. Only Codex records `done`
after review and the owner's acceptance.

## Quality mapping

Requirements are defined once in [quality.md](quality.md). A later phase rechecks
only affected earlier behavior.

| Phase | Requirements |
| --- | --- |
| 01 | Q-001, Q-002, Q-003, Q-004, Q-005, Q-006, Q-016 |
| 02 | Q-003, Q-004, Q-006, Q-007, Q-008, Q-009, Q-010, Q-011, Q-012, Q-013, Q-014 (new legal pages only), Q-015, Q-016 |
| 03 | Q-004, Q-006, Q-007, Q-008, Q-009, Q-010, Q-011, Q-014, Q-015, Q-016 |
| 04 | Q-001–Q-016, Q-018; Q-005 expanded to the requested cleanup; earlier UI/content requirements apply as regression protection |
| 05 | Q-017; Q-008, Q-009, Q-010, Q-013, Q-015, Q-016, Q-018 for affected integration behavior |

## Current handoff — Phase 04 stage A implemented; ready for `/recheck`

- **Repository / branch / baseline:** `/Users/jakubtesarik/Programování/coalshift`,
  branch `redesign`. The A0 safety checkpoint
  `9beb38e2afca1281dc07003a5093ab059632d623` ("chore: checkpoint accepted Phase
  02/03 result before Phase 04 cleanup") committed the accepted Phase 02+03 tree
  plus the Phase 04/05 planning docs on top of `68fdbcbd2562f73db91a683315d259c4fca4ef04`.
  It is **not pushed** (`redesign` ahead of `origin/redesign` by 1). `master`
  (`2aaef8e`) and `origin/cloudflare-deploy` (`0138dbb`) remain ancestors of
  `redesign` HEAD — fast-forwardable; re-verify before every stage-B push.
- **Stage A cleanup delta** (uncommitted on top of the A0 checkpoint): the
  `LegacyPage.tsx` docstring correction; the A2 documentation consolidation
  (8 rewrites/condensations + 4 new docs, ~30 historical files deleted); the A3
  dead-code / token / keyframe / asset / registry / stale-comment removal. The
  full inventory, source→target mapping and usage evidence are in the Phase 04
  Stage A Phase Report.
- **Next work:** the bounded `/recheck` for the Phase 04 cleanup delta only
  (Phase 02/03 changes are accepted and not re-reviewed). Then **stage B** — a
  separate continuation prompt naming the reviewed version by its A5 fingerprint:
  recompute + assert the fingerprint, re-fetch + confirm the production branch,
  commit + push `redesign`, obtain preview evidence, fast-forward `master` and
  `cloudflare-deploy`, verify production, Release Report + rollback target. No
  further cleanup edits in stage B; any `/recheck` finding is a stage-A
  iteration.
- **Standing authorization:** Jakub accepted Phase 03 as the production-ready
  content/design result and authorized commit, integration and production
  deployment at the end of Phase 04. Do not re-request that sign-off or a
  testimonial/metric sign-off. Preserve the visible `Ilustrační údaj` labels and
  the recorded testimonial-provenance limitation.
- **Evidence and content limits:** carry-forward `NOT_RUN`/`BLOCKED` items and
  content limitations are enumerated in [quality.md](quality.md). Acceptance and
  publication authorization do not convert any of them into verified fact.

## Pending Phase 05 owner inputs

- Approved public booking URL, event and organizer; confirm placements and
  integration mode (earlier proposal: consultation CTA + inline contact calendar
  with a direct-link fallback).
- Any additional integrations and their purpose.
- Whether a real booking and its notifications are explicitly authorized.

## Approved plan changes

- **2 Sep 2026** — Initial four-phase baseline generated after explicit approval.
  Free trial finalized at 14 days sitewide. Owner decisions supersede the PDF's
  cookie item and obsolete contact identity. Production baseline branch is the
  Cloudflare `cloudflare-deploy` tip, not the stale local master; the already
  absent Netlify config needs no deletion.
- **2 Sep 2026** — Phase 01 implemented and reviewed: Next 15.1.7 → 16.3.4,
  React 19.2.x, TS 5.9.x, Node pinned 24.20.0; `@cloudflare/next-on-pages`
  removed, `wrangler` + `sharp` added; `pages:build` → `out/`; Sharp/WebP image
  pipeline replaces the failing `/_next/image`; link/menu-focus/scroll-offset
  fixes; duplicate config + broken font refs removed. Corrections R1–R5 applied
  (truthful `srcset` + `images.unoptimized`; ordinary-activation guards; non-self
  `target` clause; compatible transitive dependency updates within ranges).
- **2 Sep 2026** — First preview published under explicit authorization: commit
  `8f1db89`, Cloudflare preview `6011b67f-f080-4428-9a64-87d0e0ad8ae6`
  (`https://6011b67f.coalshift.pages.dev`, alias `redesign.coalshift.pages.dev`),
  build success. Owner accepted progression to Phase 02 with Q-003/Q-004
  interaction/rendering deferrals recorded.
- **2–3 Sep 2026** — Phase 02 implemented and corrected across rounds C1–C4,
  D1–D7, E1–E5, F1–F6, G1–G4/R1–R6, H1 and a coalfamily-tooltip fix: coalsoft
  blue design system + both themes (dark default), floating→pinned header,
  modal mobile menu, six-function overview, five-tab practical-use browser with
  two numerical cards per topic (phone removed), monthly-only pricing, ported
  CTA/card/glow/family-bar details, brand-word highlight, scoped icon accent,
  two-column footer, `/gdpr` + `/cookies` Waulter shells, Quanda removed, GTM +
  Waulter preserved, `/zdravotnici` → `/#industries` 301. I1–I8 post-recheck
  corrections (single fragment offset; reduced-motion + history-correct JS
  scroll; contained modal-menu focus; focusable `#main` skip targets; readable
  illustrative labels; selected-tab + family-icon contrast; first-paint
  theme-toggle state). Jakub accepted Phase 02 on 3 Sep 2026 after Codex reviewed
  I1–I8.
- **3 Sep 2026** — Phase 03 `/replan` (7 subagents) accepted with Codex
  corrections, then implemented: `/reference` rebuilt into the accepted system
  (`SubpageIntro`, `.glow-border` cards, native `<details>` disclosure, no
  stars/logo); the three dead routes rewritten to the approved copy in full
  vykání with every stale launch/wait-list string removed; route metadata
  centralised in `app/lib/seo.ts` with `app/sitemap.ts` (four public URLs) +
  `app/robots.ts` (allow-all, no `Disallow`); `next.config.ts` `trailingSlash:
  false`; footer gains one `Reference` `<li>`; `References.tsx` / `WaitList.tsx`
  / `WaitListRegistration.tsx` deleted. Post-recheck P03-C1–C3: `line-clamp-4` →
  `line-clamp-3`; neutral `/reference` intro; six legacy URL forms → 301 to `/`
  in `public/_redirects` (healthcare rules byte-preserved). Frozen source hashes
  recorded. Jakub accepted Phase 03 on 3 Sep 2026 and authorized the Phase 04
  cleanup + release scope; Calendly moved to Phase 05.
- **3 Sep 2026** — Phase 04 `/replan` (6 subagents) completed and accepted with
  Codex corrections: A0 safety checkpoint before cleanup; temporary backup only
  for untracked historical docs (no permanent bundle); extract → mapping matrix →
  "nothing unhomed" → delete gate; every honest `NOT_RUN`/`BLOCKED` preserved;
  usage-verified dead-code/asset removal; clean-build + diff-driven regression
  gates; non-mutating A5 fingerprint; exact fast-forward release mechanics;
  production-branch verification; deployment evidence + concrete rollback.
  Rendered application data/components remain the canonical copy source;
  `content-and-seo.md` stores concise rules/facts/limits/pointers. No repeat
  publication sign-off. Runtime deployment IDs live in the immutable Release
  Report. `.git` / clone size unchanged by design (no history rewrite
  authorized).
- **3 Sep 2026 — Phase 04 stage A implemented locally by Claude Code; phase →
  `in_review`.** A0: `.dev.vars` added to `.gitignore`; untracked historical docs
  backed up to a temporary operational directory; the A0 checkpoint commit
  `9beb38e2afca1281dc07003a5093ab059632d623` created on `redesign` (not pushed).
  A1: `LegacyPage.tsx` docstring corrected (comment text only; new SHA-256
  `d374b9a0…cb6b5` in [operations.md](operations.md)); the three legacy route
  bodies re-confirmed byte-frozen. A2: `README.md` / `AGENTS.md` (framework block
  kept verbatim) / `CLAUDE.md` / `docs/agent-instructions.md` rewritten; new
  `docs/architecture.md`, `docs/design-system.md`, `docs/content-and-seo.md`,
  `docs/operations.md`; `docs/quality.md` + `docs/plan.md` condensed;
  `docs/brief.md`, `docs/content.md`, `docs/design-reference.md`,
  `docs/Phases/01–03`, all top-level `docs/phase-02-*` / `docs/phase-03-*` files
  and `docs/references/` deleted (recovery pointers in
  [operations.md](operations.md)); link check returns zero dangling refs. A3:
  `Button.tsx` + dead Tailwind legacy colour tokens / `background` /
  `background-light` / `fade-up` / `carousel` removed; `page.tsx` metadata export
  moved below the imports; `image-registry.json` reduced to the two portraits;
  unused `public/` scaffold assets, `manifest.json` + root `favicon.png`,
  `public/icons/*.svg`, `waiting-list.svg` and unused `public/logo/*` variants
  deleted with their derivatives; stale comments in `contacts.ts`, `Contact.tsx`,
  `robots.ts`, `seo.ts`, `ResponsiveImage.tsx` corrected. A4: clean build on the
  pinned Node, `typecheck` + `pages:build` exit 0, diff-driven regression on the
  served `out/`, measured savings — details in the Phase 04 Stage A Phase Report.
  A5: non-mutating reviewed-version fingerprint emitted to the report and the
  temporary safety directory. Uncommitted beyond the A0 checkpoint; no push /
  deploy / Cloudflare / GTM change. Phase structure, ACs, quality IDs, commercial
  terms and permissions unchanged. Next: bounded `/recheck` of the cleanup delta,
  then stage B.
- **3 Sep 2026 — Phase 04 stage A documentation-integrity correction (Claude
  Code); phase stays `in_review`.** Comment/doc pointers only, no executable
  change. `docs/quality.md`: Q-011 evidence row's publication gate replaced with
  "carry the two provenance limitations into the Stage B Release Report; no
  repeat publication approval is required" (matches the accepted Phase 03
  decision; the recorded limitations themselves are unchanged); stale
  current-state pointers fixed — Q-006 → `content-and-seo.md`, Q-007 →
  `design-system.md` with the obsolete round labels (F1–F6 / G1–G4/R1–R6 /
  E1–E5) dropped, Q-011/Q-012/Q-013 → `content-and-seo.md`. Source comments
  repointed: `app/globals.css`, `app/components/ui/BrandWord.tsx`,
  `app/lib/pricing.ts`, `app/components/home/FunctionsBrowser.tsx` (frozen
  `app/registrace/page.tsx` left untouched). `docs/Phases/04-*.md` link-check
  example rewritten so it no longer forms a Markdown link to a nonexistent
  target. `git diff --check` clean; retained Markdown has zero dangling local
  links; the `AGENTS.md` `nextjs-agent-rules` block and the three frozen
  registration hashes are byte-identical to the A0 checkpoint. The A5 fingerprint
  was recreated for the corrected delta (previous fingerprint superseded).
  Uncommitted; no push / deploy / merge / `/recheck` / stage-B work.
- **4 Sep 2026 — Phase 04 stage A final corrections after the bounded `/recheck`
  (Claude Code); phase stays `in_review`.** No runtime regression was found. (1)
  Index normalised — the Stage A deletions were unstaged so the whole corrected
  delta is uncommitted **and** unstaged for Stage B. (2) Recovery documentation
  corrected in `operations.md` + `Phases/04-*.md`: `revize-webu-coalshift.pdf`
  recoverable from `8f1db89`, the complete `docs/references/` tree from `68fdbcb`,
  tracked historical docs from the A0 checkpoint, the eleven never-committed
  untracked docs from the temporary safety backup only (lost once it is removed).
  (3) `next/image` confirmed unused app-wide — the `images: { unoptimized: true }`
  block removed from `next.config.ts` (`output: "export"` + `trailingSlash: false`
  kept); `README.md`, `architecture.md`, `plan.md`, `Phases/04-*.md` and the
  `ResponsiveImage.tsx` comment now state that SVGs/logos use ordinary `<img>`
  and there is no runtime image optimizer; the `next` package is retained. (4)
  The five approved `BrandWord` placements are now listed in `content-and-seo.md`;
  `design-system.md` + `BrandWord.tsx` point there, "F4" wording dropped. (5)
  `design-system.md` header action order corrected to "theme toggle → sole
  primary `Přihlásit se`", no trial CTA in any header. (6) Obsolete
  F2/F3/F4/F5/G3/F1 round-label shorthand removed from current comments in
  `globals.css`, `Header.tsx`, `Industries.tsx`, `Pricing.tsx`, `BrandWord.tsx`,
  `design-system.md`, `quality.md` Q-015 and the Phase 04 instruction text
  (behavioural meaning preserved; historical acceptance summaries untouched).
  `git diff --check` clean; `typecheck` + `pages:build` exit 0; served-`out/`
  smoke check unchanged; four frozen hashes + the `AGENTS.md` framework block
  byte-identical to the A0 checkpoint. A5 fingerprint recreated (rev 3;
  git 2.39.3 (Apple Git-146)); rev 2 kept as superseded. Uncommitted and
  unstaged; no push / deploy / merge / stage-B / Phase 05 work.
