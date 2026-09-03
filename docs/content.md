# coalshift — Canonical website content

This file supplies Czech implementation copy under the owner's authorization to refine and unify the text. Commercial facts and contact data come from the approved PDF and conversation. Do not invent additional features, trial conditions, testimonials or booking details. The owner expressly authorizes the clearly labelled numerical examples in the F1 table below for this design iteration; they are not verified product claims. Editorial refinements may improve sentence flow without changing the offer. Material factual changes require the owner.

The owner requires the coalios reference to guide content hierarchy and composition as well as visual components. When uncertain, inspect its matching section, data and styles. Adapt that pattern to the approved coalshift facts below; do not copy unrelated ERP claims. See [F1–F6](phase-02-final-polish.md) for the active correction, including the owner’s follow-up replacing the browser phone with two numerical cards per topic.

## Global rules and destinations

- Brand spelling is always lowercase: **coalshift**, **coalsoft**, **coalios**, **coaledu**, **coalmarketing**, **coalfamily**, including sentence starts, headings, metadata and accessible labels. Preserve supplied brand artwork and people’s proper names. Legal footer: **© 2026 coalsoft s.r.o.**
- Address readers consistently with Czech vykání. Avoid mixing “ty”, “vy” and impersonal slogans across edited copy. Attributed existing testimonials are quoted speech, not interface copy.
- Trial: **14 dní**. Default CTA: **Vyzkoušet na 14 dní zdarma**. Pricing exception: paid-tier button **Vyzkoušet**, immediately followed by **Prvních 14 dní zdarma.** outside the button. Free remains **Začít zdarma**, without this time-limited helper.
- Registration: `https://app.coalshift.cz/register`. Login: `https://app.coalshift.cz/login`, label **Přihlásit se**. In the header/mobile menu, login is the primary filled CTA and the 14-day trial is secondary. Desktop action order is trial → theme switch → login; the theme switch is immediately before the primary action. Other trial placements stay primary. This project does not change those application flows.
- Free plan and trial are distinct. Do not add “bez karty”, automatic renewal, cancellation conditions, a trial plan name or a post-trial charge without confirmed product terms.
- Before Phase 05, consultation actions use an honest contact action such as **Kontaktovat tým** pointing to the contact section. In Phase 05, once its scope is finalized, the proposed booking action becomes **Rezervovat konzultaci** with the real Calendly URL. Never publish a fake URL or disabled button presented as working booking.
- Shared pricing, contacts and trial wording should have a single source in implementation so alternate layouts cannot drift.

## Decorative brand highlighter — F4

Use one reusable translucent coalsoft-blue stroke behind the lower roughly 70–75% of the lettering. Keep the actual text/foreground color and line metrics; no box or pill. Initial placements:

- **Co všechno coalshift zvládne** — highlight only `coalshift`.
- **Pro koho je coalshift** — highlight only `coalshift`.
- **Vyzkoušejte coalshift ve svém týmu** — highlight only `coalshift` in the compact contact-area heading.
- Hero lead — highlight its single `coalshift` occurrence.
- Contact intro — highlight the inflected `coalshiftu` without changing the sentence.

Keep FAQ wording, other paragraphs, logos, menu/button labels, metadata, attributed testimonials and injected legal content unchanged. This deliberately limits repetition while applying the requested treatment to headings and selected prose. The component may be reused in a later approved content edit; do not run a global replacement across text nodes or HTML.

## Homepage `/`

Current composition follows the owner's phase-02 feedback and follow-up of 2 September 2026:

1. Hero: clear proposition and the two existing actions.
2. **Keep the separate key-functions overview**: six compact icon cards for quick scanning.
3. One faux-browser component: five tabs explain practical uses and benefits of those functions. Repetition of the topics is approved; verbatim repetition of whole blocks is unnecessary.
4. Monthly pricing **immediately after the browser**, in the same coherent product area.
5. Six audience icon tiles, including healthcare as a plain industry label; use the key-functions card hierarchy.
6. Concise FAQ, then contacts with an integrated final trial action, then footer.

Merge the former standalone AI-benefits and practical-benefits blocks into the browser. Keep the AI topic; the 3 September follow-up replaces the browser phone with numerical cards for every topic. Fold the separate closing CTA into the contact area. Remove redundant intros and repeated standalone CTA sections; do not shorten the page by making text tiny or hiding every feature behind tabs. Key functions remain visible without tab interaction. Match spacing to content, not a large minimum-height template.


### Hero

Optional eyebrow: **AI plánování směn**

H1: **Směny pod kontrolou. Méně administrativy.**

Lead: **Plánujte směny, spravujte nepřítomnosti a mějte přehled o svém týmu v jedné aplikaci. coalshift vám s rozpisem pomůže pomocí AI.**

Primary CTA: **Vyzkoušet na 14 dní zdarma** → registration.

Secondary CTA: **Kontaktovat tým** → contact section; replace with **Rezervovat konzultaci** → approved Calendly event in Phase 05, subject to its final owner-approved scope.

Support line: **Pro malé týmy i větší směnné provozy.**

Do not retain unsupported numerical savings such as a guaranteed number of saved hours or a percentage productivity improvement from the old hero/metadata.

### Klíčové funkce — separate overview

Eyebrow: **Funkce**. Heading: **Co všechno coalshift zvládne**.

| Heading | Card copy | Icon topic |
| --- | --- | --- |
| Zaměstnanci | Mějte úvazky, kontakty a další údaje o zaměstnancích přehledně na jednom místě. Při plánování směn tak máte potřebné informace o svém týmu po ruce. | People |
| Pozice | Rozdělte pracovní role a odlište je v plánu směn barvami. Snáze se zorientujete v rozpisu a uvidíte, kdo na jaké pozici pracuje. | Work roles |
| Směny | Připravte rozpis směn s pomocí AI a mějte přehled o jejich obsazení. Kontrola pravidel vás upozorní na možné problémy s pracovní dobou, přestávkami a odpočinkem. | Calendar |
| Nepřítomnosti | Evidujte dovolené, nemoci i zdravotní volno a mějte po ruce žádosti o volno. Při úpravách rozpisu snadno zjistíte, s kým můžete počítat. | Absence/calendar |
| Exporty | Vyexportujte potřebná data do Excelu, CSV nebo XML a připravte si podklady pro další práci. Hotové výstupy můžete také odeslat e-mailem. | Export/file |
| Statistiky | Sledujte odpracované hodiny, fond pracovní doby a nepřítomnosti v přehledných statistikách. Získáte podklady pro vyhodnocení rozpisu i plánování dalšího období. | Chart |

Keep all six cards in a compact standalone section. Use the same shared icon/heading/paragraph card component as the audience section: bare outlined blue icon, without an additional icon frame, source-sized type and 2px layered border treatment. These are information cards, not fake buttons. They need no large empty illustration area or extra CTA per card.

### Přehled funkcí v praxi — interactive browser

Eyebrow: **V praxi**. Heading: **Od návrhu směn po podklady pro další práci**.

Intro: **Podívejte se, jak vám jednotlivé funkce pomohou při plánování a každodenních změnách.**

The five tabs below contain the canonical detailed copy. They explain practical use of the visible overview above; do not repeat those cards verbatim. One tab is visible at a time. Use real HTML content in the static export, not an iframe or fabricated application screenshot.

| Tab | Panel heading | Panel text | Compact icon facts |
| --- | --- | --- | --- |
| Směny a AI | Připravte rozpis a mějte přehled o obsazení | S pomocí AI navrhnete směny podle potřeb provozu a dostupnosti zaměstnanců. Při úpravách vidíte, kde někdo chybí, a coalshift vás upozorní na možné problémy s pracovní dobou a odpočinkem. | Návrh rozpisu s AI; Přehled obsazení směn; Kontrola přestávek a odpočinku |
| Lidé a pozice | Mějte údaje týmu po ruce při plánování | Úvazky a kontakty najdete v databázi zaměstnanců. Barevně odlišené pracovní role vám usnadní orientaci v rozpisu směn. | Databáze zaměstnanců; Úvazky a kontakty; Barevné rozlišení pozic |
| Nepřítomnosti | Zohledněte volno i změny v dostupnosti | Dovolené, nemoci a sick days evidujete na jednom místě. Žádosti o volno a přehled nepřítomností máte po ruce při úpravách plánu. | Dovolené a žádosti o volno; Nemoci a sick days; Přehled dostupnosti |
| Exporty | Připravte podklady pro další práci | Data z aplikace vyexportujete do Excelu, CSV nebo XML. Připravené podklady můžete odeslat e-mailem. | Excel; CSV a XML; Odeslání e-mailem |
| Statistiky | Získejte přehled o hodinách a nepřítomnostech | Sledujte odpracované hodiny, fond pracovní doby a nepřítomnosti v přehledných statistikách. | Odpracované hodiny; Fond pracovní doby; Přehled nepřítomností |

The owner now prefers two numerical cards for every topic instead of the phone, matching the reference browser's content + supporting-cards composition. Remove the phone from this component, without relocating it into another homepage section. Preserve its source file and the repaired image pipeline. All topics retain the same main-content width and supporting-card tracks at a given breakpoint, with stable wide-desktop height and CTA position. Responsive stacking must not depend on which topic is selected.

#### Numerical cards — working content, 3 September 2026

Exactly two cards accompany each selected topic. These values and areas are proposed under the owner's express instruction to use provisional numbers while the product team supplies evidence. `illustrative` numbers MUST display **Ilustrační údaj** in the card. `confirmed` here means an approved count/composition from existing canonical product copy, not independently measured performance. Keep values/units/text/status in one data source. Do not borrow the reference's results or promote working figures to measured claims.

| Topic / stable metric ID | Value | Badge | Explanation (Czech) | Status / basis |
| --- | --- | --- | --- | --- |
| Směny a AI / planning-time | 50 % | Úspora času | Při přípravě rozpisu směn pro celý tým. | illustrative — proposed reduction in planning time |
| Směny a AI / planning-month | 20 h | Měsíčně zpět | Čas ušetřený při plánování a úpravách směn. | illustrative — proposed hours saved per month |
| Lidé a pozice / team-place | 1 | Společné místo | Úvazky, kontakty a pracovní role v jedné aplikaci. | confirmed — composition stated in approved feature copy |
| Lidé a pozice / team-search | 40 % | Čas na hledání | Úspora času při dohledávání údajů o zaměstnancích. | illustrative — proposed reduction in lookup time |
| Nepřítomnosti / absence-place | 1 | Přehled volna | V jedné aplikaci evidujete dovolené, nemoci i žádosti o volno. | confirmed — scope stated in approved absence copy |
| Nepřítomnosti / absence-admin | 30 % | Méně administrativy | Úspora času při evidenci volna a změn dostupnosti týmu. | illustrative — proposed reduction in absence-administration time |
| Exporty / export-formats | 3 | Formáty exportu | Podklady do Excelu, CSV a XML. | confirmed — the three named format families in approved export copy |
| Exporty / export-time | 60 % | Úspora času | Při přípravě a předání podkladů pro další práci. | illustrative — proposed reduction in preparation time |
| Statistiky / reporting-areas | 3 | Oblasti přehledu | Odpracované hodiny, fond pracovní doby a nepřítomnosti. | confirmed — the three named reporting areas in approved copy; not an exhaustive product limit |
| Statistiky / reporting-time | 50 % | Čas na přehledy | Úspora času při přípravě přehledů pro vyhodnocení rozpisu. | illustrative — proposed reduction in reporting time |

Use large normal-color numerals, a small blue badge, short supporting copy and the reference's gray raised-card surface. The **Ilustrační údaj** note is subtle but plainly readable and stays with each illustrative number, including mobile and screenshots. There are six illustrative values and four approved product counts; do not add performance guarantees or pretend these are customer results.

**Product-team follow-up:** Jakub supplies confirmed values or replacement text for the six illustrative IDs. For performance figures, record the source, compared workflow, team/sample and period; percentages of time saved need the baseline time and hours saved need the time period. The two planning figures must describe consistent assumptions if presented together. A number becomes `confirmed` only after supporting input; otherwise keep the illustration label and its unverified status. On 3 September 2026 Jakub accepted the current website and authorized its Phase 04 release; this permits retaining the reviewed labelled examples, not describing them as measured results. Confirmed replacement values remain an owner/product-team content follow-up. Do not include illustrative metrics in page metadata, JSON-LD, testimonials or other sections.


Browser address pill: display `https://coalshift.cz` plus the path matching the **selected** tab:

| Selected tab | Display path |
| --- | --- |
| Směny a AI | `/smeny-a-ai` |
| Lidé a pozice | `/lide-a-pozice` |
| Nepřítomnosti | `/nepritomnosti` |
| Exporty | `/exporty` |
| Statistiky | `/statistiky` |

These are owner-requested illustrative paths in the mock browser, without a hash. They are plain text: no real feature routes, clickable URLs or browser-history changes. Pointer and keyboard activation update the address with the panel. Keep it centered and proportioned like the coalios address area. The real page anchor remains `benefits`. Keep the registration CTA inside the selected panel, without a separate row before pricing.

Do not amplify planning/checking claims into a universal guarantee of legal compliance, predictive performance, or unconfirmed WhatsApp/SMS/ERP integrations.

### Ceník — directly after the interactive browser

Intro: **Vyberte si tarif podle počtu zaměstnanců. Funkce jsou stejné ve všech tarifech.**

| Tarif | Počet zaměstnanců | Cena měsíčně |
| --- | --- | --- |
| Free | 0–5 | Zdarma |
| Start | 6–20 | 1 130 Kč |
| Lite | 21–50 | 2 600 Kč |
| Advanced | 51–80 | 4 400 Kč |
| Pro | 81 a více | 6 000 Kč |

Required note: **Všechny ceny jsou uvedeny bez DPH.** Label paid amounts **za měsíc, bez DPH**.

The owner explicitly chose **monthly-only pricing** on 2 September 2026. Remove the billing-period switch, all annual fields and amounts, the 11-month note and the individual annual Pro inquiry. They are no longer part of the active offer; their appearance in the original PDF and initial report is historical, not an instruction to restore them.

Free CTA: **Začít zdarma** → registration, without a trial helper. Paid-tier CTA: **Vyzkoušet** → registration, with **Prvních 14 dní zdarma.** immediately below the button. Keep the arrow and entire label visible at rest and during hover. Remove per-employee surcharges and per-tier feature checklists; plans differ only by employee count. Do not introduce a new monthly discount, billing commitment or checkout.

### Pro koho je coalshift — compact audience overview

Intro: **Pro týmy, kde je potřeba sladit lidi, směny a každodenní provoz.**

| Industry | Card copy |
| --- | --- |
| Sociální služby | Plánujte směny pečujících i dalších členů týmu s přehledem o jejich dostupnosti. Dovolené a změny v obsazení zohledníte při úpravě rozpisu. |
| Zdravotnictví | Slaďte směny zdravotnického týmu a mějte po ruce přehled pracovních rolí i nepřítomností. Při změnách se snáze zorientujete v aktuálním rozpisu. |
| Výroba | Rozvrhněte směny podle pracovních rolí a dostupnosti lidí. Přehled obsazení vám pomůže při každodenních změnách ve výrobním provozu. |
| Gastronomie a restaurace | Sestavte rozpis pro kuchyni i obsluhu a zohledněte požadavky na volno. Mějte na jednom místě informace, které potřebujete při změnách směn. |
| Hotely | Koordinujte směny recepce, úklidu a dalších provozních týmů. Barevně odlišené role a přehled nepřítomností usnadní orientaci v plánu. |
| Maloobchod a pobočkové sítě | Naplánujte obsazení prodejny podle pracovních rolí a dostupnosti týmu. Při úpravách směn mějte po ruce údaje o zaměstnancích i jejich volnu. |

Closing line: **A pro všechny další, kdo plánují směny.** Center it below the cards, with a decorative outlined blue plus and slightly more expressive type. No enclosing card, pill, border, background panel or new CTA. Keep it readable when wrapping on mobile.

Use six proper icon/heading/paragraph tiles through the same component as the separate key-functions cards: bare blue outlined icons without an extra gray frame, matching typography, light-gray neutral-100 interiors, always-visible 2px neutral-gradient rim for resting depth and additional blue pointer highlight. Do not use tiny text pills/chips. Keep a readable, compact grid rather than six separate sections. Keep `id="industries"` as the stable destination for menu links and the retired healthcare URL. Healthcare is a plain industry label, not a link to a separate page. No other industry routes are requested. This block follows pricing so nothing separates the interactive browser from its pricing.

### Nejčastější dotazy

**Jak mi coalshift pomůže s plánováním směn?**

coalshift propojuje plánování směn, evidenci nepřítomností a přehled o zaměstnancích. AI vám pomůže připravit rozpis a kontrola pravidel upozorní na možné problémy v plánu.

**Je coalshift vhodný i pro malý tým?**

Ano. Tarif Free je určený pro 0 až 5 zaměstnanců. Pro větší týmy si vyberete tarif podle počtu zaměstnanců.

**Čím se jednotlivé tarify liší?**

Pouze počtem zaměstnanců. Funkce jsou stejné ve všech tarifech a uvedené ceny jsou bez DPH.

**Mohu si coalshift nejdříve vyzkoušet?**

Ano, coalshift si můžete vyzkoušet na 14 dní zdarma.

**Na koho se mohu obrátit s nastavením nebo dotazem?**

S dotazy k produktu a nabídce vám pomůže Martina Adamcová. Pro podporu se můžete obrátit na Šárku Melišovou. Kontakty najdete níže.

**Mohu z aplikace exportovat data?**

Ano. coalshift podporuje exporty do Excelu, CSV a XML a odeslání podkladů e-mailem.

Do not restore the old blanket HELIOS/SAP/Alveno integration claim without owner confirmation of the specific supported integration.

### Kontakt

Integrate the final trial action into this area: **Vyzkoušejte coalshift ve svém týmu** with **Vyzkoušet na 14 dní zdarma** → registration. Keep it compact; do not recreate the former detached closing-CTA section. Preserve space for the selected calendar integration in Phase 05 without displaying an empty calendar placeholder now.

Heading: **Pojďme probrat váš provoz**

Intro: **Potřebujete poradit s výběrem tarifu nebo s používáním coalshiftu? Ozvěte se nám.**

| Field | Person 1 | Person 2 |
| --- | --- | --- |
| Name | Martina Adamcová | Šárka Melišová |
| Role | Obchod a produkt | Podpora |
| Phone display | +420 728 918 562 | +420 702 244 296 |
| Phone target | `tel:+420728918562` | `tel:+420702244296` |
| Email display | martina.adamcova@coalsoft.cz | sarka.melisova@coalsoft.cz |
| Email target | `mailto:martina.adamcova@coalsoft.cz` | `mailto:sarka.melisova@coalsoft.cz` |

Use the coalios team pattern from `tym-item.njk`: circular portrait above a separate contact card, name, blue role and icon contact rows with the reference border highlight. Keep two cards and only the confirmed contact methods below; no invented social links.

Portrait upload directory: `/Users/jakubtesarik/Programování/coalshift/public/img/`.

Actual supplied files, present and visually inspected on 2 September 2026:

| Person | Original path | Dimensions / format | Source size |
| --- | --- | --- | --- |
| Martina Adamcová | `public/img/martina-adamcova.png` | 1080 × 1080, RGB PNG | 705,202 bytes |
| Šárka Melišová | `public/img/sarka-melisova.png` | 1080 × 1080, RGB PNG | 719,576 bytes |

Both portraits have an opaque dark background; do not assume transparent cutouts when designing the light theme. These originals were preserved without modification. Prepare web-sized derivatives in phase 02, keeping faces correctly cropped and mapped to the supplied filenames. The existing `adamec.png` is the old contact and must not illustrate either new person. Do not generate replacement people. Source-file availability is not yet proof of correct rendering on the website.

Remove active Miroslav Adamec contact details from visible copy, accessible labels and metadata. There is no need to delete unrelated historical source assets merely to remove the old contact from the page.

Phase 05 proposed booking block (final mode and placement pending owner decision):

- Heading: **Rezervujte si konzultaci**
- Intro: **Vyberte si termín, který vám vyhovuje. Společně probereme, jak může coalshift pomoci vašemu týmu.**
- Direct CTA: **Rezervovat konzultaci**
- Embed fallback: **Kalendář se nenačetl? Otevřít rezervaci v Calendly.**

Use the owner's real event URL for both placements. Duration and organizer must come from the supplied event; do not infer them from the replaced contact in the old PDF text.

### Footer

Brand sentence: **Plánování směn a docházky s pomocí AI.**

Copyright: **© 2026 coalsoft s.r.o. Všechna práva vyhrazena.**

Credit: **Developed with 💜 by coalmarketing.cz**. Link **coalmarketing.cz** to `https://coalmarketing.cz/`; preserve the purple heart. This exact family credit comes from the reference footer template and `src/_data/footer.json`.

Preserve existing useful links and the owner-managed privacy/consent integration. Move the existing coalsoft s.r.o. company name, both address lines, IČ and DIČ under the coalshift logo/brand copy. Use exactly two desktop columns: brand/company and navigation, stacked on mobile; keep copyright/credit below. Footer **Navigace** contains the existing homepage links plus **Reference** → `/reference`, **Zásady ochrany osobních údajů (GDPR)** → `/gdpr` and **Podmínky cookies** → `/cookies`. Use the accepted centre-out link animation. Do not add `/registrace`, `/wait-list` or `/wait-list/thank-you` anywhere in the active link graph. Preserve existing company values. Do not copy coalios newsletter or company-specific footer data.

## Legal pages — `/gdpr` and `/cookies`

The owner supplied the exact routes and provider containers during the third phase-02 review. Implement these route shells now, using coalios `pages/gdpr.njk`, `pages/cookies.njk` and `sections/landing.njk` as the reference. Use shared header/footer, a smaller subpage introduction, a real H1, subtle blue background and breadcrumbs **Domů → current title**. Do not create a full homepage hero.

| Route | H1 and footer label | Initially empty exported container | Page title |
| --- | --- | --- | --- |
| `/gdpr` | Zásady ochrany osobních údajů (GDPR) | `<div id="waulterGdpr"></div>` | Zásady ochrany osobních údajů (GDPR) — coalshift |
| `/cookies` | Podmínky cookies | `<div id="waulterCookies"></div>` | Podmínky cookies — coalshift |

Descriptions: `/gdpr` **Informace o zpracování osobních údajů na webu coalshift.**; `/cookies` **Informace o používání souborů cookies na webu coalshift.** Production canonicals: `https://coalshift.cz/gdpr` and `https://coalshift.cz/cookies` (respect the chosen static URL normalization consistently). Full SEO remains phase 03; do not inherit the homepage canonical on these new pages.

Each div occurs once and is empty before the existing Waulter integration inserts the policy. Do not author substitute legal paragraphs or copy another company's policies/provider configuration. Style a surrounding readable content area for injected headings, lists, tables and links in both themes. Keep React from rewriting injected content on theme changes. Native full-document footer links ensure normal provider initialization; do not assume Next client navigation triggers it again. Verify real provider content separately from the page shell; missing local/domain delivery is a specific outstanding integration result, not permission to change GTM.

Quanda is explicitly retired and must be removed. Waulter and the existing GTM-managed cookie integration remain; these are different services. The two legal pages and `/reference` are the visible subpages. Source for the three dead legacy pages stays in the repository, but requests to all six slash/no-slash URL forms redirect with HTTP 301 to `/`.

## Retired healthcare URL `/zdravotnici`

The owner explicitly withdrew the separate healthcare page during phase-02 review on 2 September 2026. Remove its page body and navigation entries during the current correction; do not redesign or recreate it in phase 03. Healthcare remains in the homepage audience overview.

Preserve visits to the old URL with a Cloudflare Pages **301** redirect from `/zdravotnici` and `/zdravotnici/` to `/#industries`. Add the rules in `public/_redirects` and verify their presence and behavior in the built `out` served by Wrangler. Do not replace this with a fake 200 page or a client-side redirect.

The healthcare-only video is retired with its page. It is not required to move to the homepage. Remove unreferenced healthcare-only components after a reference search; preserve assets or utilities still used by other pages. Remove this route from active metadata/sitemap inventories; the three historical/registration implementations remain in source, while their six public URL forms redirect to `/` and stay outside the sitemap.

## Dead registration and historical pages

**Final owner clarification, 3 September 2026:** these three implementations are deliberately dead and are not an ongoing design/content surface. Keep their current working source bodies as-is so they can be reactivated or revised later; do not roll them back, remove them or refine them. They are not available as public pages. `/registrace`, `/registrace/`, `/wait-list`, `/wait-list/`, `/wait-list/thank-you` and `/wait-list/thank-you/` must each return HTTP 301 with `Location: /`. They have no active internal link and stay outside the sitemap. The route-specific copy below records retained source state only and is no longer a public requirement or a source for further polish.

Keep the route files/components and their current bodies in the repository, but make the deployed URLs unavailable through Cloudflare Pages static redirects in `public/_redirects`. Static redirect behavior takes precedence over generated route assets. Do not link to them from the header, footer, page content, sitemap or another generated discovery surface. Retained `noindex` metadata may remain as defense-in-depth/source history, but it is not the public mechanism and does not replace the required 301 response. Do not change their copy, structure, styling, CTA targets or shared legacy component in the current correction. The full accepted-design port is reserved for `/reference`.

### `/registrace`

H1: **Vyzkoušejte coalshift na 14 dní zdarma**

Lead: **Seznamte se s plánováním směn, správou nepřítomností a přehledy pro váš tým. Registraci dokončíte přímo v aplikaci coalshift.**

CTA: **Přejít k registraci** → registration URL.

Secondary text/link: **Už máte účet? Přihlásit se.** → login URL.

Supporting blocks may reuse the approved AI planning, absences and export copy. Remove “přednostní přístup”, “speciální cena pro první registrované” and other obsolete launch offers.

### `/wait-list`

H1: **Začněte s coalshiftem**

Lead: **Chcete si zjednodušit plánování směn? coalshift si můžete vyzkoušet na 14 dní zdarma.**

CTA: **Vyzkoušet na 14 dní zdarma** → registration URL.

Support line: **Máte otázky? Kontaktujte náš tým.** → existing homepage contact anchor, matching the implemented ID.

### `/wait-list/thank-you`

H1: **Děkujeme za zájem o coalshift**

Lead: **Chcete pokračovat? Přejděte do aplikace a vyzkoušejte si plánování směn na 14 dní zdarma.**

CTA: **Přejít do aplikace** → registration URL.

Secondary link: **Zpět na úvodní stránku** → `/`.

This is a neutral follow-up page. Do not display “registrace proběhla úspěšně”, “jste na seznamu čekatelů”, promised confirmation email, or a future launch on 1 July 2025 without a real matching flow and evidence.

## References `/reference`

H1: **Reference**

The three existing attributed testimonials now live in `app/components/reference/ReferenceList.tsx` (ported from the former `References.tsx`): Michal Uhlíř (coalfamily), Jana Novotná (HR Manager), Petr Svoboda (Provozní ředitel). Redesign the complete page with the accepted coalshift visual system, shared header/footer, a compact subpage introduction and responsive cards in both themes. Add **Reference** to footer **Navigace**; do not add it to the desktop or mobile header. Remove the hard-coded five-star graphic and repeated coalshift card logo: neither is supplied customer content, and the stars would present an unverified rating. Do not invent new customers, quotes, company logos, ratings or measured outcomes. Their provenance was not independently verified in this task, so do not describe them in reports as newly verified evidence or promote their claims into general product promises. Do not add review-rating structured data from these cards. Jakub accepted Phase 03 and authorized publication of the current reviewed content on 3 September 2026; this is publication acceptance, not independent provenance verification. Retain that distinction in the compact documentation.

## Metadata copy and intent

Implement per-route metadata in phase 03. The homepage title must render exactly as below, without an accidentally duplicated template suffix. Descriptions are editorial copy; none promises numerical savings. `/`, `/reference`, `/gdpr` and `/cookies` are public/indexable, use production self-canonicals and appear in the sitemap. The metadata rows for `/registrace`, `/wait-list` and `/wait-list/thank-you` describe retained source only; public requests are intercepted by HTTP 301 redirects to `/`. They have no active internal links and no sitemap entries.

| Route | Title | Description |
| --- | --- | --- |
| `/` | coalshift \| AI plánovač směn a docházky | Plánujte směny s pomocí AI, spravujte nepřítomnosti a mějte přehled o svém týmu. Vyzkoušejte coalshift na 14 dní zdarma. |
| `/reference` | Reference \| coalshift | Přečtěte si zkušenosti s plánováním směn v coalshiftu. |
| `/registrace` | Vyzkoušejte coalshift na 14 dní zdarma | Přejděte k registraci do aplikace coalshift a vyzkoušejte si plánování směn na 14 dní zdarma. |
| `/wait-list` | Začněte s coalshiftem | Zjednodušte si plánování směn. Přejděte do aplikace a vyzkoušejte coalshift na 14 dní zdarma. |
| `/wait-list/thank-you` | Děkujeme za zájem \| coalshift | Pokračujte do aplikace coalshift nebo se vraťte na úvodní stránku. |

Apply the lowercase spelling to existing public titles/labels. Full per-route SEO remains phase 03. Use `https://coalshift.cz` as the production origin. Move route-specific canonical responsibility out of global layout metadata so a nested public page cannot inherit `/` as its canonical. The sitemap contains only `https://coalshift.cz`, `/reference`, `/gdpr` and `/cookies` (bare homepage origin accepted by Codex on 3 September 2026 to match current metadata output; see Phase 03 URL decision). Public routes use complete text-only Open Graph metadata and `twitter.card = "summary"`; no social-preview image is created or referenced in this phase. The three dead URL families rely on their 301 responses, not crawler-readable body metadata. Do not invent ratings, organization identifiers or social URLs for structured data. Only include structured data if supported by the implemented content and confirmed facts.

## Legal wording rationale

The PDF connected breaks and rest to §79. In the [MPSV Labour Code reference](https://ppropo.mpsv.cz/zakon_262_2006), §79 concerns weekly working time; breaks and daily rest are addressed separately, including §§88–90. The approved public copy therefore says **„Plánování směn s kontrolou přestávek a odpočinku“** without an inaccurate section reference or a universal compliance guarantee.

Sources were checked on 2 September 2026. This is a correction of marketing wording, not certification of the product's legal rule engine. Do not add specific healthcare exemptions or numeric legal limits without a separate verified reason.
