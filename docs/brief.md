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

Make the website a coherent member of the current coalfamily visual identity, using coalsoft blue, and correct the supplied content, pricing, mobile navigation and image-delivery issues. Improve the affected accessibility, SEO, responsive behavior and maintainability within the agreed four phases.

The website explains the product and sends users to the separate application for registration or login. The application at `app.coalshift.cz`, its backend, billing and product capabilities are outside this repository's scope. Website copy must not invent new capabilities or contractual terms.

Seven content routes are currently planned: the five previously preserved routes plus two owner-requested legal pages. The owner retired the healthcare page during phase-02 review; the new phrase “only two subpages” is being clarified before any further old-route deletion:

| Route | Role | Scope |
| --- | --- | --- |
| `/` | Main marketing page | Full content and visual revision |
| `/gdpr` | Zásady ochrany osobních údajů (GDPR) | Phase 02: lower subpage intro and exact `waulterGdpr` container, linked in footer |
| `/cookies` | Podmínky cookies | Phase 02: lower subpage intro and exact `waulterCookies` container, linked in footer |
| `/zdravotnici` and `/zdravotnici/` | Retired healthcare page | Phase 02: remove the page and its links; 301 to `/#industries`; healthcare remains an audience label |
| `/reference` | Existing references | Preserve route and existing testimonial attribution; redesign |
| `/registrace` | Registration landing page | Preserve route and registration destination; redesign |
| `/wait-list` | Historical landing page | Preserve route, remove stale launch messaging, redesign |
| `/wait-list/thank-you` | Historical follow-up URL | Preserve route, use truthful current copy, redesign |

Preserve the established navigation scope. A route that was not linked from the homepage must not gain a homepage link just because it is redesigned. A retained historical URL is not evidence that a registration was submitted successfully.

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
| 5 — Calendly | Consultation CTA plus inline booking in contact area, after owner setup | 04 |
| 6 — Pricing | Monthly-only table in content.md supersedes annual pricing in the PDF; prices excluding VAT. Plans differ only in employee count; remove per-tier feature lists and per-employee add-ons | 02 |
| 7 — Page sections | Keep a separate compact key-functions overview; explain practical benefits including AI in a five-tab browser, immediately followed by pricing; compact audience overview | 02 |
| 8 — Contacts | Martina Adamcová and Šárka Melišová with the approved roles, email addresses and phone numbers | 02 |

Additional confirmed decisions:

- **Phase-02 owner revision (2 September 2026):** use the specific coalios browser, CTA outline/circular-arrow animation, icon-card border glow and family-bar behavior documented in [the earlier D1–D7 correction assignment](phase-02-fidelity-corrections.md). Preserve the separate key-functions section as explicitly confirmed in the owner's follow-up; the browser explains its topics from a practical-use perspective. Compact the page by merging repetitive benefits and closing-CTA blocks, not by removing the visible functions overview.
- **Brand spelling:** coalshift and all family brand names use lowercase even in headings and sentence starts. This supersedes earlier title/prose capitalization.
- **Offer:** monthly prices only; remove annual amounts, switch, discount note and annual inquiry. The five employee bands, monthly amounts, VAT status and 14-day trial are unchanged.
- **Route decision:** remove the standalone healthcare page now and redirect its old URL to the homepage audience overview. All other historical/reference/registration pages remain, with unchanged homepage-link visibility. Retire the healthcare-only video with that page; no new homepage video is requested.

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

Until the owner's route wording is clarified, keep the previously approved hidden reference/registration/wait-list URLs. No new deletion is assigned. The owner subsequently withdrew the interaction report after explaining confusion with the dev/IP-served version. Clean local checks passed; the incident is closed by owner clarification and is not a further investigation task.

## Current owner feedback — phase 02, final polish

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
| Calendly account, real event URL and organizer | Jakub | 04 | Build the contact layout in 02 without a fake calendar or dead booking CTA |
| Indexing choice for historical/registration routes | Jakub with Codex recommendation from 03 planning | 03 metadata | Preserve routes and existing availability; do not silently remove them from search |
| Preview branch settings and first Git publication | Jakub; execution permissions in the applicable assignment | Remote validation in 01 | Local work can proceed; report remote checks as unperformed until a real preview exists |

The selected quality areas and deferred work are detailed in [quality.md](quality.md). Cookie management, a new analytics event plan, CMS, new enquiry forms, `llms.txt`, application authentication and product feature work are outside this assignment. Calendly setup is intentionally late and does not block phase 01.

## Acceptance

The result must satisfy the selected quality requirements and each phase's acceptance criteria, preserve the current seven-route inventory and the healthcare redirect, and match the approved content and family design in blue. A local build, a preview deployment and the owner's acceptance are separate outcomes. Production release requires an explicit later instruction; it is not performed automatically on completion of a phase.
