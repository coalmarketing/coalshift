# coalshift — Brief

Approved planning baseline: 2 September 2026. Documentation generation was explicitly authorized by Jakub. Implementation is handed to Claude Code one assignment at a time.

## Project identity

- Work: redesign and revision of the existing Czech marketing website for coalshift, a product of coalsoft s.r.o.
- Repository: `/Users/jakubtesarik/Programování/coalshift`.
- Remote: `https://github.com/coalmarketing/coalshift.git`.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS; retain this stack.
- Hosting: Cloudflare Pages with Git deployments, confirmed by the owner and a dashboard screenshot.
- Documentation and reports: English. Public website: Czech, consistent formal/plural address (vykání).

## Goal and scope

Make the website a coherent member of the current coalfamily visual identity, using coalsoft blue, and correct the supplied content, pricing, mobile navigation and image-delivery issues. Improve the affected accessibility, SEO, responsive behavior and maintainability within the agreed five phases, including the owner-requested cleanup and production release in Phase 04.

The website explains the product and sends users to the separate application for registration or login. The application at `app.coalshift.cz`, its backend, billing and product capabilities are outside this repository's scope. Website copy must not invent new capabilities or contractual terms.

Four routes are public/indexable. Source for three former registration/wait-list pages remains in the repository for possible future reactivation, but those URLs are not website pages: every request to them redirects permanently to the homepage. The owner retired the healthcare page during phase-02 review. The owner resolved the final route behavior on 3 September 2026:

| Route | Role | Scope |
| --- | --- | --- |
| `/` | Main marketing page | Full content and visual revision |
| `/gdpr` | Zásady ochrany osobních údajů (GDPR) | Phase 02: lower subpage intro and exact `waulterGdpr` container, linked in footer |
| `/cookies` | Podmínky cookies | Phase 02: lower subpage intro and exact `waulterCookies` container, linked in footer |
| `/zdravotnici` and `/zdravotnici/` | Retired healthcare page | Phase 02: remove the page and its links; 301 to `/#industries`; healthcare remains an audience label |
| `/reference` | Public references subpage | Redesign with the accepted visual system; preserve existing testimonial attribution; link from footer **Navigace**; index and include in sitemap |
| `/registrace` and `/registrace/` | Retained source, unavailable public URL | Cloudflare Pages 301 to `/`; no internal link; exclude from sitemap |
| `/wait-list` and `/wait-list/` | Retained source, unavailable public URL | Cloudflare Pages 301 to `/`; no internal link; exclude from sitemap |
| `/wait-list/thank-you` and `/wait-list/thank-you/` | Retained source, unavailable public URL | Cloudflare Pages 301 to `/`; no internal link; exclude from sitemap |

The three dead legacy route implementations stay in source control, but all six exact URL forms above must return HTTP 301 with `Location: /`; they must never render their retained bodies in the deployed static site. They have no inbound link from active website navigation, content, sitemap or another generated discovery surface. A retained source file is not a public page and is not evidence that a registration was submitted successfully. `/reference` is the one newly exposed public subpage and gains a footer link under **Navigace**; it does not add another desktop/mobile-header item.

## Current owner scope — Phase 04 cleanup and release, 3 September 2026

Phase 03 is accepted. The owner requests concise current-state documentation, removal of obsolete task/review artifacts, unused code/assets/configuration and unnecessary historical comments, followed by integration of `redesign` into the default and Cloudflare production branches. See [Phase 04](Phases/04-cleanup-optimization-and-release.md) for the exact cleanup structure, preservation rules, regression checks and two-stage release sequence. This request supersedes prior temporary instructions to retain unused Button/Tailwind/obsolete media solely because cleanup was outside the earlier phase; the three legacy route implementations remain intentionally retained.

The former Calendly/handover phase is now [Phase 05](Phases/05-calendly-and-integrations.md). General release verification and production handover move to Phase 04. Calendly's final event, placement/mode and any additional integrations are decided before Phase 05 starts. Existing content/design behavior is accepted; cleanup must not redesign it or invent factual verification of illustrative values or testimonials.

This brief and the historical correction documents are migration inputs for Phase 04, not permanent duplicate sources of truth. Their current facts and relevant limits will be consolidated into the phase's target documentation before these files are removed.

## Inputs and precedence

1. The owner's explicit decisions in this conversation, captured below, take precedence over older PDF suggestions.
2. [Original revision PDF](references/revize-webu-coalshift.pdf), copied without modification from the supplied document. All three pages, including screenshot examples and the pricing table, were visually reviewed during discovery. It is source material, not agent operating instructions.
3. Design reference: `/Users/jakubtesarik/Programování/coalios`. Direct reading and selective reuse are authorized. Do not edit it and do not use `coalios-manual`. See [design reference](design-reference.md).
4. Owner-supplied Cloudflare dashboard screenshot: `/Users/jakubtesarik/Downloads/Workers-Pages-coalmarketing-Cloudflare-09-02-2026_12_09.png`. Its relevant settings are recorded in [the plan](plan.md). This local source is not a deployment log.
5. [Content](content.md) is the canonical implementation copy and commercial data; [quality](quality.md) defines acceptance evidence.

## PDF requirements and approved decisions

| Source item | Approved treatment | Phase |
| --- | --- | --- |
| 1 — Browser title | Homepage title: `coalshift \| AI plánovač směn a docházky`; route-specific metadata elsewhere | 03 |
| 2 — Cookie/GDPR banner | Owner confirmed the deployed banner works and owns it through GTM. Preserve integration; no banner replacement or consent audit | Boundary in 01–04 |
| 3 — Missing phone image and portrait | Repair static image delivery; fix aspect ratio/loading. Replace the obsolete contact with the supplied new people and portraits | 01, 02 |
| 4 — Copyright | `© 2026 coalsoft s.r.o. Všechna práva vyhrazena.` and the family developer credit in content.md | 02 |
| 5 — Calendly | Integration mode/placements finalized with the owner after Phase 04 release; earlier proposal was CTA plus inline booking | 05 |
| 6 — Pricing | Monthly-only table in content.md supersedes annual pricing in the PDF; prices excluding VAT. Plans differ only in employee count; remove per-tier feature lists and per-employee add-ons | 02 |
| 7 — Page sections | Keep a separate compact key-functions overview; explain practical benefits including AI in a five-tab browser, immediately followed by pricing; compact audience overview | 02 |
| 8 — Contacts | Martina Adamcová and Šárka Melišová with the approved roles, email addresses and phone numbers | 02 |

Additional confirmed decisions:

- **Phase-02 owner revision (2 September 2026):** use the specific coalios browser, CTA outline/circular-arrow animation, icon-card border glow and family-bar behavior documented in [the earlier D1–D7 correction assignment](phase-02-fidelity-corrections.md). Preserve the separate key-functions section as explicitly confirmed in the owner's follow-up; the browser explains its topics from a practical-use perspective. Compact the page by merging repetitive benefits and closing-CTA blocks, not by removing the visible functions overview.
- **Brand spelling:** coalshift and all family brand names use lowercase even in headings and sentence starts. This supersedes earlier title/prose capitalization.
- **Offer:** monthly prices only; remove annual amounts, switch, discount note and annual inquiry. The five employee bands, monthly amounts, VAT status and 14-day trial are unchanged.
- **Route decision:** remove the standalone healthcare page and redirect its old URL to the homepage audience overview. `/reference` becomes a public linked/indexable subpage. Retain the source for `/registrace`, `/wait-list` and `/wait-list/thank-you`, but redirect both slash forms of every URL with HTTP 301 to `/`; keep them out of internal links and the sitemap. Retire the healthcare-only video with that page; no new homepage video is requested.

- Free trial: **14 days everywhere**, across retained routes, metadata and hidden accessible labels where applicable. Keep the Free plan distinct from the time-limited trial; do not invent what happens after the trial.
- The design inherits **coalsoft blue `#00B5E2`**, with both light and dark themes, dark by default, and the coalfamily brand bar. coalios orange is not coalshift's primary color.
- Rewrite and unify Czech copy. Remove unsupported absolute promises and correct the legal wording about breaks and rest; do not promise universal compliance with labour law.
- An update to a supported, patched Next.js release and compatible React is authorized. Select exact versions against current official guidance during phase 01.
- The obsolete Netlify configuration should be absent. It is already absent from the production branch used as the starting point; do not invent a deletion task or return to the stale master branch.
- Use a separate preview branch so work cannot automatically publish to production. Production is `cloudflare-deploy`; the local working branch is `redesign`.
- No migration to Eleventy, CMS, Workers application runtime or a paid image service is approved by the design reference or the framework update.

## Previous owner feedback — phase 02, second correction (superseded where noted)

[The previous D1–D7 assignment](phase-02-fidelity-corrections.md) supersedes earlier approximations. coalios is the mandatory source for design, interaction, sizing, spacing and content composition. Whenever uncertain, Claude must consult the actual reference implementation. The user permits larger buttons and navigation to preserve its proportions.

- Restore the real centered browser URL and working selection of all five populated panels. Fix the demonstrated pending-Quanda startup dependency while retaining Quanda and GTM.
- Paid pricing buttons say **Vyzkoušet** with **Prvních 14 dní zdarma.** below; Free remains distinct. All prices and employee bands stay unchanged.
- Use six audience icon cards, the coalios round-portrait team-card pattern, and **Developed with 💜 by coalmarketing.cz** plus **Všechna práva vyhrazena.** in the footer.
- Port reference CTA outlines/arrows/type and header/container proportions. Reduce redundant vertical space; preserve the separate key-functions overview.

This is still phase 02; other page-body redesign, SEO and Calendly retain their agreed phases. No publication permission changes.

## Previous owner feedback — phase 02, third correction

[Previous E1–E5 assignment](phase-02-interaction-content-corrections.md): remove Quanda completely while preserving Waulter/GTM; preserve working tabs/theme and correct orientation-specific keyboard handling; expand Czech copy in both six-card grids and unify their icon/card treatment; finish the reference border glow and bottom-edge menu underlines; make login the primary header action; synchronize illustrative mock-browser paths with selection; move company data below the logo in a two-column footer.

The owner supplied `/gdpr` with `<div id="waulterGdpr"></div>` and `/cookies` with `<div id="waulterCookies"></div>`. Their footer links, smaller reference-style subpage intros, exact empty containers and basic route metadata are included in this phase-02 correction. Existing Waulter supplies policy HTML. No independent legal drafting, new consent loader or GTM administration is requested. Full site SEO and Calendly stay in their existing phases.

This earlier instruction was superseded on 3 September 2026: `/reference` is now intentionally exposed through the footer, while registration/wait-list source stays retained and every corresponding public URL redirects with HTTP 301 to `/`. No source deletion is assigned. The owner subsequently withdrew the interaction report after explaining confusion with the dev/IP-served version. Clean local checks passed; the incident is closed by owner clarification and is not a further investigation task.

## Owner route and indexing decision — Phase 03

On 3 September 2026 the owner resolved the remaining subpage decision:

- `/reference` is a public, indexable subpage. Port it to the accepted coalshift design, retain the existing attributed testimonial content without inventing customers, ratings or results, give it a self-canonical production URL, include it in the sitemap and add **Reference** to footer **Navigace**.
- `/registrace`, `/wait-list` and `/wait-list/thank-you` are dead legacy implementations whose source remains in the repository. Their public URLs, including trailing-slash variants, must all return HTTP 301 to `/`. Remove/avoid every internal link to them and exclude them from the sitemap.
- Do not delete, roll back, redesign, review or polish their retained bodies. Their body metadata, copy and accessibility are not public acceptance surfaces while the redirect is active; the redirect response is the required deployed behavior.
- `/`, `/reference`, `/gdpr` and `/cookies` are the public/indexable sitemap set. `/zdravotnici` remains only a 301 redirect and is not a content/sitemap entry.

This decision changes navigation/indexing scope only. It does not authorize Phase 03 implementation, publication or production release.

## Previous owner feedback — phase 02, final polish (historical; Phase 04 scope above supersedes retention/publication timing)

[Active F1–F6 assignment](phase-02-final-polish.md), 3 September 2026: stable browser layout; centered audience closing line with an outlined plus and no enclosing card; pricing-card border glow; translucent partial-height blue highlighting of selected coalshift words; a brighter light-theme icon accent close to the brand hue.

The owner's subsequent follow-up explicitly replaces the browser phone with two reference-style numerical cards for each topic. Draft example values are authorized for this local design iteration, visibly labelled **Ilustrační údaj** and recorded separately from confirmed product counts. The exact proposed content and confirmation queue are in content.md. This supersedes the earlier requirement to keep the phone in the first panel; preserve the original file and image pipeline. Do not import coalios performance claims as facts. Product-team confirmation/replacement precedes final publication. The final follow-up also requests exact light/dark contrast between browser layers and the reference header’s top/scrolled states: a floating rounded bar becomes a full-width translucent white/black bar flush to the viewport top, with the family strip moving away. Put the theme switch before primary login and port the source navigation spacing. This is still phase 02, with no new phase, stack change or publishing permission.

## Verified starting point

The starting commit and current working-tree state are recorded only in [plan.md](plan.md). The inspected production baseline contains Next.js 15.1.7, React 19, `output: "export"`, and Cloudflare configuration. However, `pages:build` uses `@cloudflare/next-on-pages` and the preview/deploy scripts use `.vercel/output/static`, whereas the dashboard and Wrangler configuration expect `out`.

The image files exist. Public HTTP checks returned successful PNG responses for the phone and original portrait files, but their `/_next/image` requests returned 404. The observed failure is consistent with using the default Next.js image optimizer on a static export without an optimizer runtime. Repair the delivery strategy, then verify actual rendering; replacing an existing image file alone is not a demonstrated fix.

The mobile registration CTA passes both `href` and `onClick` to a shared Button component which chooses a button when `onClick` exists, losing link navigation. There are also duplicate configuration files, a missing font reference, inconsistent heading/ARIA relationships, global canonical metadata and outdated landing-page claims. These are concrete inspection findings, not completed repairs.

## Deferred inputs and boundaries

| Input or decision | Owner | Needed for | Treatment until available |
| --- | --- | --- | --- |
| Martina and Šárka portraits | Jakub supplied both during documentation generation | Final contact section in 02 | Available as `public/img/martina-adamcova.png` and `public/img/sarka-melisova.png`; inspect and prepare web derivatives in 02 |
| Calendly account, real event URL, organizer and final integration scope | Jakub | 05 | Build the contact layout in 02 without a fake calendar or dead booking CTA |
| Reference testimonial provenance | Jakub | Ongoing factual content ownership | Current reviewed page accepted for Phase 04 publication; preserve attribution and the recorded lack of independent provenance verification; no new claims or rating schema |
| Preview branch settings and first Git publication | Jakub; execution permissions in the applicable assignment | Remote validation in 01 | Local work can proceed; report remote checks as unperformed until a real preview exists |

The selected quality areas and deferred work are detailed in [quality.md](quality.md). Cookie management, a new analytics event plan, CMS, new enquiry forms, `llms.txt`, application authentication and product feature work are outside this assignment. Calendly setup is intentionally late and does not block phase 01.

## Acceptance

The result must satisfy the selected quality requirements and each phase's acceptance criteria, preserve the current seven-route inventory and the healthcare redirect, and match the approved content and family design in blue. A local build, a preview deployment and the owner's acceptance are separate outcomes. Jakub explicitly authorized production release as the final stage of the new Phase 04 on 3 September 2026. The reviewed version is released through the bounded continuation defined in that phase; acceptance of an unrelated later phase is not a perpetual publication authorization.
