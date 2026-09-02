# Phase 02 — Fourth-round owner feedback and E report

Date: 3 September 2026. Current assignment: [F1–F6](../../phase-02-final-polish.md). The owner's follow-up explicitly replaces the phone with two numerical cards for every browser topic, including clearly labelled working numerical examples pending product-team input. It is included in the same assignment as the five final refinements.

## Unchanged supplied inputs

- [Claude E1–E5 report](claude-e1-e5-report.txt) — verbatim; claims are attributed to Claude.
- [Previous plan and handoff](plan-before-f1-f5.txt) — snapshot before Codex's current documentation changes.
- [coalshift / Směny a AI with phone](coalshift-browser-ai.png).
- [coalshift / Lidé a pozice without phone](coalshift-browser-people.png).
- [coalshift / plain audience closing line](coalshift-audience-closing-line.png).
- [coalshift / light feature icons](coalshift-light-icons.png).
- Reference numerical cards: [economy](coalios-metric-cards-economy.png), [inventory](coalios-metric-cards-inventory.png), [production](coalios-metric-cards-production.png), [controlling](coalios-metric-cards-controlling.png), [people](coalios-metric-cards-people.png).

The fourteen images and report are original copies, with original paths and SHA-256 in [sources.json](sources.json). Target screenshots show localhost:3000; reference screenshots show coalios.cz. Browser chrome and image resizing do not establish the CSS viewport. These are appearance references, not proof of automated interaction or the numerical claims shown on the reference site.

## Latest surface/header follow-up

Paired references: [coalios light](coalios-browser-light.png), [coalshift light](coalshift-browser-light.png), [coalios dark](coalios-browser-dark.png), [coalshift dark](coalshift-browser-dark.png), and [coalios full-width pinned header](coalios-pinned-header.png). The owner requires exact surface separation and the reference floating/pinned behavior, order and spacing. F1 includes the surface table; F6 covers the shared header.

## Codex review basis

Target root `/Users/jakubtesarik/Programování/coalshift`, redesign, HEAD `8f1db89f2e01dad80eb6678a5cbd0df0187b797a`, with uncommitted phase 02. Source inspection confirms:

- FunctionsBrowser's `i === 0` conditional phone plus flex-1 text makes other panels expand. All five panels already have real copy and working selected-state handlers. This is a layout issue, not the withdrawn switching failure.
- Pricing uses ordinary bordered list items without SpotlightGroup or glow-border.
- Industries' final line is an uncentered plain paragraph. Both six-card grids already use the same InfoCard with proper gray surface and bare icons.
- InfoCard/browser fact icons use coalsoft-600 = #0091B8. Scoped candidate #009AC0 has calculated opaque sRGB contrast 3.018:1 on #f5f5f5, 3.152:1 on #fafafa and 3.290:1 on white. Actual rendered color/background/opacity still require verification.

Reference checked read-only at main `f3d727dc32dd9cd04493915f512b3375ef7d0cf4`: complete `src/_includes/components/desktop-screen.njk`, `src/_includes/sections/benefits.njk` and `.border-gradient` in `src/assets/css/input.css`. The browser consistently includes its supporting-card area; its responsive layout stacks that area under the main card below wide desktop. The target must adapt that composition with approved coalshift content, not copy ERP statistics. Source `.DS_Store` remained untouched and coalios-manual was not inspected.

Further source inspection: reference `header.njk` uses 50% white/black floating surfaces and 90% white/black full-width scrolled surfaces; removes rounding and moves the family strip away. `nav.js` switches at scrollTop >= 100px. Source theme control precedes the primary CTA. Target Header has no scroll-state handling and ThemeToggle follows the primary CTA. Its shared smoothScroll helper currently measures full header.offsetHeight; F6 must account for the new visible fixed-bar geometry. No application source, build output, Git ref, reference checkout or Cloudflare setting was changed by Codex. No fresh build or new runtime matrix was run during this handoff. The E report's build/types/desktop outcomes remain attributed to Claude; the report's unperformed responsive and pointer checks are not a global tooling impossibility. The prior permitted isolated diagnostic is in the [third-round archive](../phase02-round3/README.md).

E observed a Waulter SDK but no populated local policy containers. Its asserted domain-gating cause has not been independently verified; suppressHydrationWarning alone does not prove provider content preservation. Those existing integration checks remain separate from F1–F6. The original E report remains unchanged even where current documentation qualifies its evidence.
