# Coalshift — Quality profile

Canonical definition of the quality bar for the Czech marketing website: four
public routes, a static Cloudflare Pages export, the coalfamily design
system, the Microsoft Bookings and YouTube integrations, and owner-managed
GTM/Waulter consent. This does not certify the separate coalshift
application at `app.coalshift.cz`.

## Areas covered

Content/SEO, technical SEO and semantics, responsive UI and family design,
accessibility, performance and media, maintainability, dependency/security/
privacy boundaries, and release verification. Analytics and the cookie
banner are owner-managed through GTM and out of scope here. No CMS, no new
enquiry form, no GEO/`llms.txt` artifact.

## External references

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
  and [Cloudflare static Next.js deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) —
  `out/` is the static output; there is no runtime image optimizer.
- [WCAG 2.2 contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
  [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and
  [reduced-motion](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) —
  basis for the accessibility checks below. This project does not claim full
  WCAG certification.
- [Microsoft Bookings FAQ](https://learn.microsoft.com/en-us/microsoft-365/bookings/bookings-faq?view=o365-worldwide) —
  the iframe-plus-direct-link pattern this site uses.
- [YouTube privacy-enhanced embeds](https://support.google.com/youtube/answer/171780) —
  `youtube-nocookie.com`, used for the product walkthrough.

## Requirements and current status

`local` = `npm run typecheck` + `npm run pages:build` (both must exit 0) plus
focused browser testing of the local build. `production` = the live
`https://coalshift.cz` origin. A `NOT_RUN` result stays `NOT_RUN` until
someone actually performs that check — a clean build never upgrades it.

| ID | Requirement | Status | Notes |
| --- | --- | --- | --- |
| Q-001 | Work happens on the sole `master` branch; only an explicitly authorized push triggers Cloudflare production | current practice | Confirm branch/status before work; verify the Cloudflare build after an authorized push |
| Q-002 | `npm run pages:build` reproducibly produces `out/` on the pinned toolchain (Node 24.20.0, npm 11.x) | PASS (local) | Re-run after any source or dependency change |
| Q-003 | Raster assets render via the Sharp/`ResponsiveImage` pipeline with a truthful `srcset` and correct proportions; no `/_next/image` (unused, not configured) | PASS (metadata/HTTP, local); NOT_RUN (real narrow/wide rendering + DPR-2 on a device) | |
| Q-004 | Header/CTA destinations are correct: desktop shows only theme toggle + `Přihlásit se`, no trial CTA anywhere; hero/practical-browser/contact CTAs scroll to `#pricing`; pricing cards link to `REGISTER_URL` | PASS (logic + semantics, local); NOT_RUN (real mobile pointer/keyboard, completed smooth-scroll on a device) | |
| Q-005 | Code, assets, configuration and documentation describe only the current system; no dead imports, components, config or docs | PASS (local) | Re-audit whenever a component, asset or dependency is added or removed |
| Q-006 | The four public routes load directly and after refresh; the six retired legacy URL forms and both `/zdravotnici` forms 301 via `public/_redirects`; no active internal link points at a retired path | PASS (local); NOT_RUN (production `Location` headers) | |
| Q-007 | Visual and interaction fidelity to `docs/design-system.md` in both themes: browser shell, product gallery, contact/consultation cards, header, footer | PASS (local, both themes, 1728 CSS px); NOT_RUN (real 320/390/768/1440 rendering — the local harness has no device emulation) | |
| Q-008 | Theme is system-first on first visit; an explicit choice persists across routes/reload; no flash or hydration error; the toggle has an accessible name and state | PASS (local) | |
| Q-009 | No page-level horizontal overflow at 320/390/768/1440 CSS px in either theme; a fresh/reloaded page stays at a stable scroll position; fragment landings clear the sticky header | PASS (1728 CSS px, local); NOT_RUN (real narrow-viewport and physical-device reload) | |
| Q-010 | Logical headings and landmarks, visible focus, full keyboard operation, WCAG-AA contrast, reduced motion respected | PASS (keyboard/focus/contrast, local, both themes); NOT_RUN (physical-device screen-reader pass) | |
| Q-011 | Public copy matches `docs/content-and-seo.md`: consistent vykání, lowercase family names, no unsupported product/legal claim | PASS (local) | |
| Q-012 | Pricing cards show only the canonical monthly offer excluding VAT, differing solely by employee count | PASS (local) | |
| Q-013 | The contact section shows the two current people with correct portraits and working `tel:`/`mailto:` links | PASS (data + desktop render, local, both themes); NOT_RUN (real narrow/wide portrait crop) | |
| Q-014 | Each public route has an accurate Czech title/description, a self-canonical, and correct social metadata; the sitemap lists exactly the four canonicals; `robots.txt` is allow-all with the sitemap URL | PASS (local export); NOT_RUN (production canonical resolution and crawler behavior) | |
| Q-015 | Media loads responsively without avoidable layout shift; third-party loading never blocks first-party controls | PASS (local); no Core Web Vitals value is claimed | |
| Q-016 | GTM `GTM-NQDZKVLF` stays exactly as owner-configured; `/gdpr` and `/cookies` each expose one initially empty `[data-waulter-document]` container that the owner-managed Waulter SDK populates | PASS (container structure + GTM, local); NOT_RUN (real Waulter content population — confirm on `https://coalshift.cz` directly; local/preview builds have never populated it) | |
| Q-017 | Microsoft Bookings opens through a lazy accessible dialog with a direct-link fallback; the YouTube walkthrough uses a click-to-play privacy-enhanced embed with a direct-link fallback; neither is contacted before its user action. The YouTube IFrame API and its `coalshift_video` `dataLayer` event (see `docs/content-and-seo.md` §"Playback analytics") load only after Play, never duplicate the script, and never block playback if analytics fails | PASS (local mechanics and production Bookings-iframe render confirmed; API-script-once/no-pre-activation-request/mode-switch-teardown confirmed for the video) | Real playback never progressed past 0:00 in local browser-automation testing (a sandboxed-environment limitation observed for this specific video throughout this project, not a code defect), so the `start`/`progress`/`complete` events firing from genuine YouTube playback state are `NOT_RUN` locally — verify on `https://coalshift.cz` by watching the video and checking GTM Preview |
| Q-018 | Handoffs and reports state only the changed result, the checks performed and any remaining real limitation | ongoing practice | |
| Q-019 | The product gallery's three-screenshot stack supports previous/next, a counter, swipe and an accessible fullscreen dialog without autoplay | PASS (local, both themes, 1728 CSS px); NOT_RUN (real 320/390/768/1440 rendering + 200% zoom) | |

## Known current limitations

Real, currently open gaps — not closed by a documentation edit:

- Real narrow/wide rendering (320/390/768/1440 CSS px) and 200% zoom: the
  local testing setup fixes the viewport with no device emulation. Affects
  Q-003, Q-007, Q-009, Q-013, Q-019.
- Real mobile pointer/keyboard interaction and a physical-device
  screen-reader pass have not been performed (Q-004, Q-010).
- Real Waulter content population has only ever been confirmed on the
  production origin — after any change to the legal pages, verify on
  `coalshift.cz` directly, never from a local build (Q-016).
- Production-only checks to re-run after any relevant change: redirect
  `Location` headers, canonical/crawler resolution (Q-006, Q-014).
- Testimonial provenance on `/reference` is unverified (Michal Uhlíř
  "coalfamily"; Petr Svoboda's HR-integration and ROI sentences). Preserve
  the quotes verbatim regardless.

No Core Web Vitals or Lighthouse score is claimed anywhere in this project.
