# 07 — Microsoft Bookings and product video

## Objective

Finish the homepage with two owner-approved external integrations: an unlisted
YouTube product walkthrough inside the existing application showcase and a
Microsoft Bookings consultation flow inside the redesigned contact section.
Keep both integrations useful when the third-party embed is unavailable.

The sole phase status is in [plan.md](../plan.md).

## Starting point and approved inputs

- Phase 06 is accepted and released on `master`.
- Public booking URL:
  `https://bookings.cloud.microsoft/book/coalshift@coalsoft.cz/?ismsaljsauthenabled`.
  It is public configuration; no Microsoft credentials enter the repository.
- The Bookings service is configured outside the repository as **Pojďme probrat
  váš provoz**. Jakub owns its availability, staff, confirmation/reminder
  emails, Czech language and Teams-meeting behavior.
- The 12:57 walkthrough is published on YouTube as **Unlisted** with embedding
  allowed. Owner-approved identifiers:
  - video ID: `DgTN2nTfx_0`
  - direct URL: `https://www.youtube.com/watch?v=DgTN2nTfx_0`
  - privacy-enhanced embed base: `https://www.youtube-nocookie.com/embed/DgTN2nTfx_0`
  - local-poster source: `https://i.ytimg.com/vi/DgTN2nTfx_0/maxresdefault.jpg`
    (verified 1280×720)
  YouTube oEmbed returned the expected title and embed HTML; omit the supplied
  share-only `si` query parameter from source.
- Approved YouTube title: **Jak funguje coalshift | Praktická ukázka aplikace**.
  Description:

  > Podívejte se, jak coalshift pomáhá se správou zaměstnanců, plánováním směn,
  > nepřítomnostmi, exporty a zaměstnaneckými přístupy.
  >
  > Více informací najdete na https://coalshift.cz
  >
  > coalshift je součástí coalfamily od coalsoftu.

- `public/video/coalshift_onboarding_original.mp4` is an untracked 340 MB source
  file, not a deployable asset. It and any conversion intermediates must be
  removed from the repository worktree before commit; do not add video binaries
  or Git LFS to this website.

## Scope and boundaries

### Contact and Microsoft Bookings

- Keep the existing contact heading and the two approved people and contact
  methods. On desktop, place their compact cards in the left one-third and a new
  consultation panel in the right two-thirds. On narrow screens, show the
  consultation panel before the personal contacts.
- Replace the current detached Free-plan offer box in `Contact.tsx`; do not add a
  second competing action to the section.
- Consultation panel copy:
  - eyebrow: **Online konzultace**
  - heading: **Vyberte si termín, který vám vyhovuje**
  - body: **Společně projdeme váš provoz, způsob plánování směn a ukážeme, kde
    vám může coalshift usnadnit každodenní práci.**
  - CTA: **Rezervovat konzultaci**
  - supporting line: **Online přes Microsoft Teams**
- The CTA opens an accessible first-party dialog. The Bookings iframe is created
  only after opening it. Use the approved public URL, a descriptive iframe
  title, a visible close control and a direct **Otevřít rezervaci v novém okně**
  fallback.
- The dialog is contained on desktop and effectively full-screen on mobile. It
  must trap focus, close with Escape, restore focus without scrolling, lock and
  restore page scroll, and leave no `inert`/portal residue after repeated use.
  Do not attempt to restyle or script the cross-origin Bookings document.

### Video and existing screenshots

- Keep this as one homepage section. Add a two-option accessible selector:
  **Video ukázka (13 min)** and **Obrazovky aplikace**. Video is the default.
- Before playback, render a first-party responsive poster/facade with a clear
  play action. Save the verified owner-approved YouTube thumbnail locally
  through the existing image pipeline. Do not contact YouTube on initial page
  load.
- On play, mount a responsive privacy-enhanced
  `youtube-nocookie.com/embed/<VIDEO_ID>` iframe with Czech interface/caption
  preferences, native controls and fullscreen. Playback follows the explicit
  user action; there is no page-load autoplay. Provide a direct YouTube-link
  fallback and unmount the player when leaving Video mode.
- **Obrazovky aplikace** preserves the accepted three persistent screenshot
  cards, their role animation, controls, swipe, counter and fullscreen dialog.
  Do not rebuild or simplify that gallery.
- Keep the section eyebrow, heading and pricing CTA. Update the intro to:
  **Pusťte si praktickou ukázku aplikace nebo si projděte skutečné obrazovky,
  se kterými budete pracovat každý den.**
- YouTube owns the source video and captions; the website stores only the approved
  local poster and does not deploy the original MP4/WebM. Do not add a new standalone video section.

### External-service boundaries

- Use public URL/video identifiers only; no API keys, tenant credentials or
  account automation.
- Preserve GTM, Waulter, existing routes, SEO metadata, pricing, header, gallery
  visuals and all accepted Phase 06 content.
- A real Bookings submission sends invitations and emails and therefore requires
  separate explicit owner authorization. Rendering, keyboard interaction and
  direct-link inspection do not authorize a booking.
- Use YouTube Privacy Enhanced Mode. Third-party failure must not hide the local
  explanatory copy, contacts or direct links.

## Implementation steps

- [x] Record the supplied YouTube URL/ID and verify that the unlisted video allows embedding.
- [x] Add centralized public Bookings/YouTube constants to the existing links data.
- [x] Redesign `Contact.tsx` and add the lazy accessible Bookings dialog.
- [x] Extend `ProductGallery.tsx` with the Video/Obrazovky selector and lazy YouTube facade while preserving the screenshot implementation.
- [x] Add and register the local video poster; remove/ignore all raw video binaries before final Git work (moved the untracked source outside `public/` to `/video-source/` — gitignoring alone does not stop a static export from copying an untracked `public/` file).
- [x] Update only the current architecture, design, content and quality documentation affected by the shipped result.

## Acceptance criteria

- **AC-01:** Desktop contact layout is 1/3 personal contacts + 2/3 consultation
  panel; mobile presents the consultation action first. Both approved people and
  working `tel:`/`mailto:` links remain correct.
- **AC-02:** Bookings opens only from the consultation CTA, lazy-loads the exact
  approved public page, remains usable at mobile/desktop sizes and always offers
  a working new-window fallback. Close/Escape/focus/scroll behavior is clean
  across repeated cycles.
- **AC-03:** The showcase defaults to a local click-to-play video facade and
  makes no YouTube request before activation. The privacy-enhanced player is
  responsive, does not autoplay on page load, exposes controls/fullscreen and
  has a direct YouTube fallback.
- **AC-04:** Switching to screenshots exposes the complete accepted gallery with
  no regression to ordering, animation, swipe, keyboard navigation, fullscreen,
  focus return or reduced motion.
- **AC-05:** Both integrations and selector remain usable in light/dark themes,
  at 320/390/768/1440 CSS px and 200% zoom without page-level overflow or hidden
  controls. A blocked/failed third-party request leaves local content and direct
  links usable.
- **AC-06:** No original or converted video binary enters the build or Git. The
  static export contains only the optimized local poster plus ordinary website
  assets.

## Applicable quality requirements

Apply Q-007–Q-010, Q-013, Q-015, Q-017–Q-019 from
[quality.md](../quality.md). Q-016 is regression-only: preserve the existing
GTM/Waulter integration and do not claim a new consent audit.

## Validation

- Run `npm run typecheck`, `npm run pages:build` and `git diff --check`.
- Serve the final `out/` and test both themes at representative narrow and wide
  widths: selector keyboard semantics, local facade before play, YouTube play /
  fullscreen / fallback, screenshot regression, Bookings open/close/Escape /
  focus return / repeated cycles / fallback, and no horizontal overflow.
- Inspect initial network activity: no YouTube or Bookings request before the
  corresponding user action. Simulate or block the external frames and confirm
  that the direct links remain available.
- Confirm that `out/` and `git status` contain no MP4/WebM/original source video.
- Do not make a real booking unless Jakub separately authorizes it.

## Decisions required before execution

None. The Bookings URL, YouTube ID, copy, layout and interaction choices are
approved.

## Completion protocol

Complete only Phase 07 and mark it ready for owner review, not accepted. Update
current-state documentation rather than appending implementation history. Do not
commit, push or deploy without explicit permission. Return an English Phase
Report of no more than six bullets and stop.

Accepted by the owner (Jakub) and released to `master`. The Microsoft Bookings
iframe was verified rendering correctly on the production HTTPS origin
(`https://coalshift.cz`); its earlier non-render on `localhost` during local
testing was environment-specific, not a product defect.
