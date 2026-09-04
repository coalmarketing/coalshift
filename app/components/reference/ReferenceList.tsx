import Section from "../ui/Section";
import SpotlightGroup from "../ui/SpotlightGroup";

/**
 * The three existing attributed testimonials (docs/content-and-seo.md §"Testimonials").
 * Quotes, names and roles are preserved verbatim from the previous
 * `app/components/References.tsx`. Their provenance was not independently
 * verified in this work — do not present them as measured evidence.
 *
 * Ports coalios `components/reference-item.njk`: person glyph + name + role,
 * then the quote in a native `<details>` disclosure. No carousel, no star
 * rating, no per-card logo, no rating structured data.
 */
const TESTIMONIALS: { name: string; role: string; quote: string }[] = [
  {
    name: "Michal Uhlíř",
    role: "coalfamily",
    quote:
      "coalshift nám výrazně ulehčil plánování směn. Díky umělé inteligenci ušetříme spoustu času a zaměstnanci jsou spokojenější s rozvrhem. Systém je velmi intuitivní a přehledný. Oceňuji především automatické generování rozvrhů, které bere v úvahu preference zaměstnanců i naše firemní požadavky. Za poslední rok jsme díky coalshiftu ušetřili desítky hodin administrativní práce. Doporučuji všem firmám, které chtějí zefektivnit tento proces.",
  },
  {
    name: "Jana Novotná",
    role: "HR Manager",
    quote:
      "Implementace coalshiftu byla jedním z nejlepších rozhodnutí pro naši společnost. Před jeho nasazením jsme trávili hodiny ručním plánováním směn, často docházelo k překryvům a nespokojenosti zaměstnanců. Nyní je celý proces automatizovaný a efektivní. Systém se rychle učí preference našich zaměstnanců a vytváří rozvrhy, které vyhovují všem stranám. Zákaznická podpora je navíc vynikající - vždy rychle reagují na naše dotazy a připomínky. Návratnost investice byla téměř okamžitá.",
  },
  {
    name: "Petr Svoboda",
    role: "Provozní ředitel",
    quote:
      "Po třech měsících používání coalshiftu můžu říct, že tento nástroj předčil všechna naše očekávání. Nejen že šetří čas při plánování směn, ale také významně snížil počet konfliktů v rozvrhu. Zaměstnanci oceňují možnost zadávat své preference a vidět rozvrh v reálném čase. Analytické nástroje nám pomáhají lépe porozumět vytížení týmu a optimalizovat pracovní dobu. Integrace s naším stávajícím HR systémem proběhla hladce. coalshift se stal nepostradatelnou součástí našeho každodenního provozu.",
  },
];

/** coalios `assets/svgs/our-team/person.svg` (Material Symbols, currentColor). */
function PersonGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className="size-8"
    >
      <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
    </svg>
  );
}

export default function ReferenceList() {
  return (
    <Section>
      <SpotlightGroup
        as="ul"
        className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3"
        radius={220}
      >
        {TESTIMONIALS.map((t) => (
          <li key={t.name} className="glow-border h-full">
            <div className="flex h-full flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  <PersonGlyph />
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="font-lekton text-lg font-bold !leading-none text-neutral-900 dark:text-white">
                    {t.name}
                  </h2>
                  <span className="text-sm font-bold !leading-none text-coalsoft-700 dark:text-coalsoft-300">
                    {t.role}
                  </span>
                </div>
              </div>

              <details className="group">
                <summary className="flex cursor-pointer list-none flex-col items-start gap-2 [&::-webkit-details-marker]:hidden">
                  <span className="line-clamp-3 text-sm leading-relaxed text-neutral-700 transition-all group-open:line-clamp-none dark:text-neutral-300">
                    „{t.quote}“
                  </span>
                  <span className="text-xs font-bold text-coalsoft-700 group-open:hidden dark:text-coalsoft-300">
                    Zobrazit více
                  </span>
                  <span className="hidden text-xs font-bold text-coalsoft-700 group-open:inline dark:text-coalsoft-300">
                    Skrýt
                  </span>
                </summary>
              </details>
            </div>
          </li>
        ))}
      </SpotlightGroup>
    </Section>
  );
}
