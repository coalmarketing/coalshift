# 04 — Cleanup, optimization and release

## Status

Done and accepted on 4 September 2026. Release commit:
`bd4aa1e6b36dece928abfac198a09c2dc795af60`.

## Delivered result

- Removed verified dead components, assets, configuration and obsolete working
  documents while preserving the intentionally retained legacy route source.
- Consolidated the repository documentation around the current architecture,
  design, content/SEO, quality and operations.
- Preserved the static Sharp/WebP image pipeline, GTM `GTM-NQDZKVLF`, Waulter,
  redirects, accepted content and responsive behavior.
- Released the redesigned website to `https://coalshift.cz`; the owner confirmed
  the production result.
- Consolidated ongoing work and Cloudflare production onto `master`. The previous
  redesign/deployment branches and unused Netlify site are no longer part of the
  working release process.

Historical implementation details and removed material remain recoverable from
Git history. Current release instructions are in [operations.md](../operations.md).
