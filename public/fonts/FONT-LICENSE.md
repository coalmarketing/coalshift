# Bundled web fonts

These WOFF2 files were copied from the authorised coalios design reference
(`/Users/jakubtesarik/Programování/coalios`, revision
`f3d727dc32dd9cd04493915f512b3375ef7d0cf4`, `src/assets/fonts/`). They are the
"latin-ext" subsets used across the coalfamily identity and provide the Czech
glyph coverage this site needs.

| File | Family | Upstream licence |
| --- | --- | --- |
| `inter-v20-latin-ext-regular.woff2` (400) | Inter | SIL Open Font License 1.1 |
| `inter-v20-latin-ext-500.woff2` (500) | Inter | SIL Open Font License 1.1 |
| `inter-v20-latin-ext-600.woff2` (600) | Inter | SIL Open Font License 1.1 |
| `inter-v20-latin-ext-700.woff2` (700) | Inter | SIL Open Font License 1.1 |
| `lekton-v21-latin-ext-regular.woff2` (400) | Lekton | SIL Open Font License 1.1 |
| `lekton-v21-latin-ext-700.woff2` (700) | Lekton | SIL Open Font License 1.1 |

Both **Inter** (Rasmus Andersson) and **Lekton** (ISIA Urbino) are published
under the SIL Open Font License, Version 1.1, which permits bundling and
redistribution with software/websites. Full licence text:
<https://openfontlicense.org/open-font-license-official-text/>.

The subsetted WOFF2 builds originate from the google-webfonts-helper project
(`gwfh.mranftl.com`); the `v20` / `v21` markers are its font-version tags. The
pre-redesign `.ttf` copies under `public/fonts/inter/` and `public/fonts/lekton/`
were removed in phase 02 — they were no longer referenced by the stylesheet and
only added weight to the static export.
