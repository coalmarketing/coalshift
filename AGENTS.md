# Coalshift

Read [docs/agent-instructions.md](docs/agent-instructions.md) before working in this repository. The quality requirements are in [docs/quality.md](docs/quality.md). For the current state of the codebase see [docs/architecture.md](docs/architecture.md), [docs/design-system.md](docs/design-system.md), [docs/content-and-seo.md](docs/content-and-seo.md) and [docs/operations.md](docs/operations.md).

Work only on the single task assigned in the current prompt. Website copy is Czech with consistent vykání; implementation reports are English. Preserve GTM `GTM-NQDZKVLF`, the Waulter loader + the `[data-waulter-document]` containers on `/gdpr`/`/cookies`, the owner-managed cookie system, the current routes/redirects and accepted design/content. Do not start unrelated follow-up work automatically, and do not commit, push or deploy without an explicit assignment that authorizes it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
