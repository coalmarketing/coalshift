# Coalshift — Operations

Build chain, verified environments, the Cloudflare release procedure, rollback,
and the frozen-source SHA baselines.

## Verified environment

Local toolchain verified on Node `24.20.0` / npm `11.19.0`, Next.js `16.3.4`,
React `19.2.x`, TypeScript `5.9.x`. Node is pinned in `.nvmrc` (`24.20.0`) with
`engines.node` `">=24 <25"`. Cloudflare Pages builds on the `.nvmrc` version.

If the pinned Node is not installed locally, run the validation build on the
installed 24.x (`>=24 <25` satisfied) and record the deviation: the local gate
and the shipped Cloudflare artifact are then not bit-identical.

## Commands

| Script | Expansion | Notes |
| --- | --- | --- |
| `npm ci` | install exact locked dependencies | reproducible; `package-lock.json` is committed-shape and coherent |
| `npm run images:generate` | `node scripts/generate-image-derivatives.mjs` | Sharp WebP derivatives → `public/img/derivatives/` (git-ignored, idempotent) |
| `npm run dev` | `npm run images:generate && next dev` | Turbopack; also re-adds the `AGENTS.md` framework block (see below) |
| `npm run build` | `npm run images:generate && next build` | static export → `out/` |
| `npm run pages:build` | `npm run images:generate && next build` | **Cloudflare Pages build command** — name unchanged so the dashboard record stays valid; produces `out/` |
| `npm run typecheck` | `npm run images:generate && next typegen && tsc --noEmit` | 0 errors expected |
| `npm run preview` | `wrangler pages dev out` | serves an already-built `out/` — run `pages:build` first |
| `npm run deploy` | `wrangler pages deploy out` | **direct-upload publish — never used for this project.** Release is exclusively `git push` to the Git-integrated production branch. |

The build/typecheck scripts chain `images:generate` **explicitly** rather than
via an npm `pre*` hook because the Cloudflare dashboard invokes `pages:build` by
name and npm lifecycle hooks do not fire for a named script run that way.

There is no `lint` or `test` script (Next 16 removed `next lint`; no prior gate
existed). Do not add one, run a blanket dependency updater, or `npm audit fix
--force`. A lockfile change is allowed only to drop a verified-unused dependency,
explained separately.

`AGENTS.md` contains a `<!-- BEGIN:nextjs-agent-rules -->…<!-- END:… -->` block
that `next dev` writes and re-adds. Keep it verbatim; commit it with your work if
the generator re-touches it (do not revert).

## Repository weight

`docs/references/` (55 files, ~66 MB of historical Phase 02 screenshots/reports).
Only `docs/references/revize-webu-coalshift.pdf` was present at
`8f1db89f2e01dad80eb6678a5cbd0df0187b797a`; the complete 55-file tree first
appears at `68fdbcbd2562f73db91a683315d259c4fca4ef04` (on `origin/redesign`, an
ancestor of the A0 checkpoint) and is fully recoverable from there
(`git show 68fdbcb:docs/references/<path>`). Deleting the directory from the
working tree therefore loses nothing, but the blobs stay in `.git` (~67 MB) — a
history rewrite (`git filter-repo` + force-push) is **not authorized**.
Fast-forwarding `cloudflare-deploy` carries that history into the branch
Cloudflare re-clones each build. **The cleanup is working-tree + `out/` only;
`.git` / clone size is unchanged by design.**

## Cloudflare Pages configuration

From the owner's dashboard screenshots + confirmations (not a fresh API read):

| Setting | Value |
| --- | --- |
| Project | `coalshift` |
| Repository | `coalmarketing/coalshift` |
| Production branch | `cloudflare-deploy` |
| Preview branch | `redesign` (Custom branches include; the `*` beside `redesign` was removed, exclusions empty) |
| Automatic production deployments | enabled |
| Build command | `npm run pages:build` |
| Output directory | `out` |
| Root directory | (empty) |
| Build system | v3, build cache disabled |
| Production origin | `https://coalshift.cz` |

`wrangler.toml` sets only `pages_build_output_dir = "out"` and **cannot** express
the production branch (dashboard-only for the Git integration). Verify the
production branch from current authenticated Cloudflare data or current
owner-supplied dashboard evidence before any production push — a factual
configuration check.

**Secrets discipline:** never put a token in a repository file or a report; never
echo `wrangler whoami`, `env | grep -i cloudflare`, or deployment-list output
containing account IDs into a report or other output.

## Release procedure (Phase 04 stage B / any later phase)

Release is a `git push` to the Git-integrated branches; Cloudflare performs the
build. Runtime release identity (SHAs, deployment IDs) belongs in the immutable
Release Report, not in tracked documentation — a tracked file cannot reliably
identify the commit that contains itself.

1. **Verify the reviewed version.** Recompute the stage-A fingerprint and assert
   it matches the stage-A report. Record the **current production deployment ID**
   serving the pre-release tip (the rollback target) before touching anything.
2. **Re-fetch and re-verify.** `git fetch --prune origin`. Confirm `origin/master`
   and `origin/cloudflare-deploy` are still ancestors of the release. Confirm
   from current evidence that the Pages production branch is `cloudflare-deploy`.
   Check branch protection: `gh api
   repos/coalmarketing/coalshift/branches/master/protection` (and the production
   branch) — if a branch blocks direct pushes, stop and report.
3. **Commit + push `redesign`.** Reviewed `git status` → explicit path adds
   (**never** `git add -A`; verify nothing under `out/`, `.next/`, `.wrangler/`,
   `public/img/derivatives/`, `.dev.vars` is staged) → the release commit →
   `git push origin redesign`. Obtain the preview deployment ID + build status +
   per-commit URL for that exact SHA; without it the preview leg is
   `PARTIAL`/`BLOCKED`, not `PASS`. Run the smoke matrix against the preview.
4. **Fast-forward `master` and `cloudflare-deploy`** with ref-to-ref pushes so
   the server enforces fast-forward and nothing is checked out:

   ```
   git fetch --prune origin
   REL=$(git rev-parse redesign)
   git merge-base --is-ancestor origin/master "$REL"            || { echo "STOP: master diverged"; exit 1; }
   git merge-base --is-ancestor origin/cloudflare-deploy "$REL" || { echo "STOP: cloudflare-deploy diverged"; exit 1; }
   git push origin "$REL:refs/heads/master"
   git push origin "$REL:refs/heads/cloudflare-deploy"   # last deliberate action → triggers production
   ```

   **Forbidden:** `git switch`/`checkout` of `master`/`cloudflare-deploy`,
   non-`--ff-only` `git merge`, `git reset`, `git rebase` of these branches,
   `git push --force` / `--force-with-lease`, branch deletion, `npm run deploy` /
   `wrangler pages deploy` / any direct-upload path. If a fast-forward is no
   longer possible, stop and report the options (rebase `redesign` then re-check;
   merge commit; owner decision) — take none without owner direction.
5. **Verify production.** Confirm the Cloudflare production deployment identifies
   the exact release SHA (owner-supplied deployment ID if tooling is unavailable
   — HTTP 200 + content match is necessary, not sufficient; label HTTP-only
   evidence `PARTIAL`). Inspect `https://coalshift.cz`: four public routes;
   registration/login navigation (no submission); all eight redirect rules —
   status + `Location`, without following, including the nested
   `/wait-list/thank-you`; canonical / robots / sitemap; portraits + fonts;
   theme + navigation; GTM + `dataLayer`; real Waulter population in
   `#waulterGdpr` / `#waulterCookies` (mark "verify after live" — a
   domain-scoped check, not a release gate).
6. **Handoff + recovery.** Record the production URL, release SHA, deployment ID,
   every check result and remaining limitations in the immutable Release Report.
   Make no post-fingerprint source/documentation edit merely to embed runtime
   IDs.

A cache purge is **not** routine for a Git-integrated Pages release. Use one only
if production evidence demonstrates stale edge content, and record why.

## Rollback

- **Primary:** Cloudflare dashboard → "Rollback to this deployment" on the
  recorded pre-release deployment ID. No Git change.
- **Fallback:** `git revert` the release commit, then fast-forward-push the
  revert to `redesign`, `master` and `cloudflare-deploy` so all three stay
  coherent.
- Force-reset of `cloudflare-deploy` to a prior SHA is forbidden.

## Frozen-source SHA-256 baselines

The three retained legacy route bodies are byte-frozen. `LegacyPage.tsx` accepts
comment-text corrections only; its hash is re-recorded after each such change.

| File | SHA-256 |
| --- | --- |
| `app/registrace/page.tsx` | `2328da7e6ea3c9b33004543f31ca7cded1a03a610ca4c8cc26fb687e3c2a2d51` |
| `app/wait-list/page.tsx` | `27b00163d0043fa028bf8ec87b49c97e4ec90866b5dba66e788d9d3e60d04ddb` |
| `app/wait-list/thank-you/page.tsx` | `363fa58d2cb3c54a16dfe7543210328af6cd2af0def41f664ba154915eb7a4c5` |
| `app/components/legacy/LegacyPage.tsx` | `d374b9a088f20aea806eea49ec2fc339f633fa5969f0892b3140978ed91cb6b5` (Phase 04 A1: docstring corrected — "directly loadable" → redirect-intercepted; comment text only) |

`app/registrace/page.tsx` intentionally retains a docstring pointing at the
deleted `docs/content.md` because its route body is byte-frozen and the freeze is
not lifted for it. The referenced document can be inspected from the A0
checkpoint (`git show 9beb38e:docs/content.md`) if the context is needed.

## Recovery pointers

- `docs/references/revize-webu-coalshift.pdf` (the original revision PDF) —
  recoverable from `8f1db89f2e01dad80eb6678a5cbd0df0187b797a` onward.
- The complete `docs/references/` directory (55 files, deleted in Phase 04) —
  recoverable from `68fdbcbd2562f73db91a683315d259c4fca4ef04` (on
  `origin/redesign` and an ancestor of the A0 checkpoint):
  `git show 68fdbcb:docs/references/<path>`.
- Tracked historical Phase 01–03 documents — `docs/brief.md`, `docs/content.md`,
  `docs/design-reference.md`, `docs/Phases/01–03`, and the seven tracked
  `docs/phase-02-*.md` correction/prompt files — recoverable from the Phase 04
  A0 checkpoint commit `9beb38e2afca1281dc07003a5093ab059632d623` or earlier
  history.
- The eleven **formerly untracked** historical documents
  (`docs/phase-02-browser-height-correction*.md`,
  `docs/phase-02-recheck-corrections*.md`,
  `docs/phase-02-responsive-navigation-corrections*.md`, and the five
  `docs/phase-03-*.md` prompt/recheck/correction files) were never committed to
  any Git branch. They are superseded working notes and exist **only** in the
  temporary safety backup
  `/private/tmp/coalshift-phase04-safety-20260903T215352/untracked-historical-docs/`.
  They become unrecoverable once that backup is removed after Phase 04
  acceptance; their substance is preserved in the `docs/plan.md` "Approved plan
  changes" round-by-round entries and `docs/quality.md`.
- coalios reference revision baseline: `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`
  (see [design-system.md](design-system.md)).
