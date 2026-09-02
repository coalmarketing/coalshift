# Coalshift — Brief

Approved planning baseline: 2 September 2026. Documentation generation was explicitly authorized by Jakub. Implementation is handed to Claude Code one assignment at a time.

## Project identity

- Work: redesign and revision of the existing Czech marketing website for Coalshift, a product of coalsoft s.r.o.
- Repository: `/Users/jakubtesarik/Programování/coalshift`.
- Remote: `https://github.com/coalmarketing/coalshift.git`.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS; retain this stack.
- Hosting: Cloudflare Pages with Git deployments, confirmed by the owner and a dashboard screenshot.
- Documentation and reports: English. Public website: Czech, consistent formal/plural address (vykání).

## Goal and scope

Make the website a coherent member of the current coalfamily visual identity, using COALsoft blue, and correct the supplied content, pricing, mobile navigation and image-delivery issues. Improve the affected accessibility, SEO, responsive behavior and maintainability within the agreed four phases.

The website explains the product and sends users to the separate application for registration or login. The application at `app.coalshift.cz`, its backend, billing and product capabilities are outside this repository's scope. Website copy must not invent new capabilities or contractual terms.

All existing routes remain available and receive the redesign:

| Route | Role | Scope |
| --- | --- | --- |
| `/` | Main marketing page | Full content and visual revision |
| `/zdravotnici` | Healthcare landing page | Same design system, revised copy and trial duration |
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
| 1 — Browser title | Homepage title: `Coalshift \| AI plánovač směn a docházky`; route-specific metadata elsewhere | 03 |
| 2 — Cookie/GDPR banner | Owner confirmed the deployed banner works and owns it through GTM. Preserve integration; no banner replacement or consent audit | Boundary in 01–04 |
| 3 — Missing phone image and portrait | Repair static image delivery; fix aspect ratio/loading. Replace the obsolete contact with the supplied new people and portraits | 01, 02 |
| 4 — Copyright | `© 2026 coalsoft s.r.o.` for this release | 02 |
| 5 — Calendly | Consultation CTA plus inline booking in contact area, after owner setup | 04 |
| 6 — Pricing | Use the exact table in content.md, prices excluding VAT. Plans differ only in employee count; remove per-tier feature lists and per-employee add-ons | 02 |
| 7 — Page sections | Keep the AI-assistant benefits topic; revise the remainder to the approved benefits, capabilities and audiences in content.md | 02 |
| 8 — Contacts | Martina Adamcová and Šárka Melišová with the approved roles, email addresses and phone numbers | 02 |

Additional confirmed decisions:

- Free trial: **14 days everywhere**, including healthcare, historical landing pages, metadata and hidden accessible labels where applicable. Keep the Free plan distinct from the time-limited trial; do not invent what happens after the trial.
- The design inherits **COALsoft blue `#00B5E2`**, with both light and dark themes, dark by default, and the coalfamily brand bar. Coalios orange is not Coalshift's primary color.
- Rewrite and unify Czech copy. Remove unsupported absolute promises and correct the legal wording about breaks and rest; do not promise universal compliance with labour law.
- An update to a supported, patched Next.js release and compatible React is authorized. Select exact versions against current official guidance during phase 01.
- The obsolete Netlify configuration should be absent. It is already absent from the production branch used as the starting point; do not invent a deletion task or return to the stale master branch.
- Use a separate preview branch so work cannot automatically publish to production. Production is `cloudflare-deploy`; the local working branch is `redesign`.
- No migration to Eleventy, CMS, Workers application runtime or a paid image service is approved by the design reference or the framework update.

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

The result must satisfy the selected quality requirements and each phase's acceptance criteria, preserve all six routes, and match the approved content and family design in blue. A local build, a preview deployment and the owner's acceptance are separate outcomes. Production release requires an explicit later instruction; it is not performed automatically on completion of a phase.
