# Coalshift — Operations

## Environment and commands

The project uses Node `24.20.0` (`.nvmrc`), npm `11.x`, Next.js `16.3.4`, React
`19.2.x` and TypeScript `5.9.x`.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the committed dependency set |
| `npm run dev` | Generate image derivatives and start the local site |
| `npm run typecheck` | Generate derivatives, Next route types and run TypeScript |
| `npm run pages:build` | Generate derivatives and create the static `out/` export |
| `npm run preview` | Serve an existing `out/` build locally with Wrangler |

There is no lint or test script. Do not add one for a small feature or run a
blanket dependency update. `npm run deploy` is not part of the normal release
path; Cloudflare deploys from GitHub.

`next dev` may regenerate the marked `nextjs-agent-rules` block in `AGENTS.md`.
Keep that block intact.

## Images

Raster sources listed in `image-registry.json` are converted by
`scripts/generate-image-derivatives.mjs` to truthful WebP width variants in
`public/img/derivatives/`. `ResponsiveImage` builds the matching `srcset`.
Generated derivatives are ignored; source images and the registry are committed.
SVGs and logos use ordinary `<img>` elements. The static export has no runtime
image optimizer.

## Branch and production workflow

- GitHub default and sole intended long-lived branch: `master`.
- Cloudflare Pages production branch: `master`.
- Production origin: `https://coalshift.cz`.
- Build command: `npm run pages:build`; output directory: `out`.
- The old Netlify deployment is unused and is not a release target.

For normal work:

1. Work locally on `master` and preserve unrelated changes.
2. Run the checks relevant to the change. For a new interactive section this is
   `npm run typecheck`, `npm run pages:build` and focused browser testing on the
   local build in both themes and representative widths.
3. Commit and push `master` only when the current assignment explicitly permits
   it. A push to `master` triggers the Cloudflare production build.
4. After an authorized push, confirm the Cloudflare build succeeded and perform
   a focused production check of the changed behavior. Do not repeat unrelated
   whole-site audits without a concrete reason.

Never force-push. If remote `master` diverges, preserve both histories and report
the conflict instead of resetting or guessing.

## Rollback

Use Cloudflare's deployment rollback for an immediate hosting rollback, or
`git revert` the faulty commit and push the revert to `master`. Do not rewrite
published history.

## Preserved production behavior

- GTM container `GTM-NQDZKVLF` and the Waulter-provided GDPR/cookies content.
- Four public indexable routes and the redirects recorded in
  [content-and-seo.md](content-and-seo.md).
- The separate registration and login destinations in `app/lib/links.ts`.
- Static export with `output: "export"` and `trailingSlash: false`.

## Frozen legacy source

The unavailable legacy route bodies remain in Git for possible reactivation and
must not be changed as part of unrelated website work.

| File | SHA-256 |
| --- | --- |
| `app/registrace/page.tsx` | `2328da7e6ea3c9b33004543f31ca7cded1a03a610ca4c8cc26fb687e3c2a2d51` |
| `app/wait-list/page.tsx` | `27b00163d0043fa028bf8ec87b49c97e4ec90866b5dba66e788d9d3e60d04ddb` |
| `app/wait-list/thank-you/page.tsx` | `363fa58d2cb3c54a16dfe7543210328af6cd2af0def41f664ba154915eb7a4c5` |
| `app/components/legacy/LegacyPage.tsx` | `d374b9a088f20aea806eea49ec2fc339f633fa5969f0892b3140978ed91cb6b5` |

Historical design/review material remains recoverable from Git history at
`68fdbcbd2562f73db91a683315d259c4fca4ef04`; the accepted cleanup/release is
`bd4aa1e6b36dece928abfac198a09c2dc795af60`.
