"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Section, { SectionHeading } from "../ui/Section";
import FragmentCta from "../ui/FragmentCta";
import SpotlightGroup from "../ui/SpotlightGroup";
import LineIcon, { type LineIconName } from "../icons/LineIcon";

type Feature = { title: string; description: string; icon: LineIconName };

/** One supporting numerical card. Every value is an approved product
 *  count/composition from canonical product copy — not an independently
 *  measured performance result — so no card carries an "illustrative" note. */
type Metric = {
  /** Stable id from docs/content-and-seo.md. Also the React key. */
  id: string;
  value: string;
  badge: string;
  note: string;
};

type Tab = {
  id: string;
  label: string;
  icon: LineIconName;
  /** Illustrative path shown in the faux-browser address bar (no hash, not a real route). */
  path: string;
  heading: string;
  text: string;
  features: [Feature, Feature, Feature];
  metrics: [Metric, Metric];
};

const TABS: Tab[] = [
  {
    id: "pozice-a-zamestnanci",
    label: "Pozice a zaměstnanci",
    icon: "users",
    path: "/pozice-a-zamestnanci",
    heading: "Zaměstnanci a pozice přehledně na jednom místě",
    text: "Vytvoříte pracovní pozice a přidáte zaměstnance s jejich úvazky, typem smlouvy a dostupností. coalshift tak získá podklady pro plánování směn.",
    features: [
      {
        title: "Pracovní pozice",
        description: "Barevně rozlišené pozice zpřehlední plánování a přiřazování směn.",
        icon: "roles",
      },
      {
        title: "Úvazky a dostupnost",
        description: "U každého zaměstnance upravíte smlouvu, fond hodin, dovolenou i dostupnost podle dnů a hodin.",
        icon: "availability",
      },
      {
        title: "Rychlé přidání týmu",
        description: "Zaměstnance přidáte jednotlivě, CSV importem nebo e-mailovou pozvánkou.",
        icon: "users",
      },
    ],
    metrics: [
      {
        id: "positions-contracts",
        value: "3",
        badge: "Typy smluv",
        note: "HPP, DPP a DPČ",
      },
      {
        id: "positions-adding",
        value: "3",
        badge: "Způsoby přidání",
        note: "Jednotlivě, CSV importem nebo e-mailovou pozvánkou",
      },
    ],
  },
  {
    id: "smeny",
    label: "Směny",
    icon: "calendar",
    path: "/smeny",
    heading: "Naplánujte směny rychle a s kontrolou pravidel",
    text: "Nastavíte provoz a způsob plánování. coalshift vytvoří rozpis, navrhne obsazení a upozorní na možné kolize s dostupností, nepřítomností a odpočinkem.",
    features: [
      {
        title: "Vytvoření a obsazení směn",
        description: "Zvolíte režim plánování, vygenerujete směny a funkcí Přiřadit vše navrhnete obsazení podle dostupnosti.",
        icon: "calendar",
      },
      {
        title: "Přehled obsazení",
        description: "Kalendář odliší obsazené směny od těch, kterým ještě někdo chybí.",
        icon: "coverage",
      },
      {
        title: "Kontrola pracovní doby",
        description: "Aplikace upozorní na kolize s nepřítomností, odpočinkem a nastaveným rozsahem práce.",
        icon: "rules",
      },
    ],
    metrics: [
      {
        id: "shifts-modes",
        value: "3",
        badge: "Režimy plánování",
        note: "Týdenní rotace, krátký a dlouhý týden nebo freestyle",
      },
      {
        id: "shifts-rest",
        value: "11 h",
        badge: "Kontrola odpočinku",
        note: "Upozornění na standardní minimální denní odpočinek",
      },
    ],
  },
  {
    id: "nepritomnosti",
    label: "Nepřítomnosti",
    icon: "absence",
    path: "/nepritomnosti",
    heading: "Dovolená, nemoc i volno na jednom místě",
    text: "Zaměstnanec požádá o nepřítomnost, správce ji schválí a plán směn s ní automaticky počítá. Při ruční kolizi vás coalshift upozorní.",
    features: [
      {
        title: "Samoobslužné žádosti",
        description: "Zaměstnanci posílají žádosti o dovolenou, nemoc, sick day nebo volno ze svého přístupu.",
        icon: "leave",
      },
      {
        title: "Kontrola kolizí",
        description: "Schválená nepřítomnost se promítne do plánování a ruční konflikt vyvolá upozornění.",
        icon: "rules",
      },
      {
        title: "Fond podle potřeby",
        description: "Roční fond nastavíte společně nebo individuálně a evidovat lze i část dne.",
        icon: "clock",
      },
    ],
    metrics: [
      {
        id: "absence-types",
        value: "5",
        badge: "Druhy nepřítomnosti",
        note: "Dovolená, nemoc, sick day, volno a pracovní volno",
      },
      {
        id: "absence-fund",
        value: "2",
        badge: "Nastavení fondu",
        note: "Globálně pro tým nebo individuálně",
      },
    ],
  },
  {
    id: "exporty-a-statistiky",
    label: "Exporty a statistiky",
    icon: "chart",
    path: "/exporty-a-statistiky",
    heading: "Data a reporty bez ručního přepisování",
    text: "Rozpisy a odpracované hodiny vyexportujete do běžných formátů, rozešlete zaměstnancům a využijete pro přehled o vytížení týmu.",
    features: [
      {
        title: "Připravené exporty",
        description: "Data získáte podle pozice, zaměstnance nebo měsíce.",
        icon: "export",
      },
      {
        title: "Rozpis e-mailem",
        description: "Hotový rozpis odešlete zaměstnancům přímo z aplikace.",
        icon: "mail",
      },
      {
        title: "Vytížení týmu",
        description: "Statistiky propojí docházku, odpracované hodiny a fond pracovní doby.",
        icon: "chart",
      },
    ],
    metrics: [
      {
        id: "exports-formats",
        value: "3",
        badge: "Formáty exportu",
        note: "Excel, CSV a XML",
      },
      {
        id: "exports-views",
        value: "3",
        badge: "Pohledy na data",
        note: "Podle pozice, zaměstnance a měsíce",
      },
    ],
  },
  {
    id: "zamestnanecke-pristupy",
    label: "Zaměstnanecké přístupy",
    icon: "id",
    path: "/zamestnanecke-pristupy",
    heading: "Každý vidí jen to, co potřebuje",
    text: "Správce pracuje s celým provozem. Zaměstnanec vidí své směny a nepřítomnosti, může požádat o volno a domluvit se na výměně směny.",
    features: [
      {
        title: "Přehled zaměstnance",
        description: "Vlastní směny, nepřítomnosti a kolegové na stejné pozici jsou dostupní v jednom účtu.",
        icon: "users",
      },
      {
        title: "Ochrana citlivých údajů",
        description: "Zaměstnanec nevidí mzdu ani typ smlouvy ostatních.",
        icon: "rules",
      },
      {
        title: "Kontrola správce",
        description: "Správce nastavuje tým, schvaluje žádosti a řídí plán.",
        icon: "id",
      },
    ],
    metrics: [
      {
        id: "access-levels",
        value: "2",
        badge: "Úrovně přístupu",
        note: "Správce a zaměstnanec",
      },
      {
        id: "access-overviews",
        value: "3",
        badge: "Osobní přehledy",
        note: "Směny, nepřítomnosti a kolegové na stejné pozici",
      },
    ],
  },
];

const BROWSER_ORIGIN = "https://coalshift.cz";

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <li className="flex flex-col justify-between gap-6 rounded-3xl border-2 border-neutral-300 bg-neutral-100 p-5 sm:p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex items-start justify-between gap-3">
        <span className="font-lekton text-3xl font-bold leading-none text-neutral-900 sm:text-4xl dark:text-white">
          {metric.value}
        </span>
        <span className="eyebrow shrink-0">{metric.badge}</span>
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">{metric.note}</p>
    </li>
  );
}

export default function FunctionsBrowser() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const n = (i + TABS.length) % TABS.length;
    tabRefs.current[n]?.focus();
  };

  // WAI-ARIA APG manual-activation tabs. The tab list is a vertical column at
  // every width (coalios desktop-screen.njk), so Up/Down always move roving
  // focus; Left/Right are left to normal page behaviour. Home/End jump;
  // Enter/Space or click select.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(TABS.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        setActive(i);
        break;
    }
  };

  return (
    <Section id="benefits" labelledBy="browser-heading">
      <div className="flex flex-col gap-10">
        <SectionHeading
          id="browser-heading"
          eyebrow="V praxi"
          title="Správa týmu a směn krok za krokem"
          intro="Projděte si správu zaměstnanců, plánování směn, nepřítomnosti, exporty a zaměstnanecké přístupy."
        />

        {/* Faux-browser frame — ports coalios desktop-screen.njk. Decorative
            chrome (not an iframe or working address bar). Surfaces reproduce the
            reference's layered hierarchy; the outer 2px neutral rim keeps the
            workspace fill via data-surface="workspace". */}
        <div className="glow-border glow-border--lg" data-surface="workspace">
          <div className="rounded-[calc(2rem-2px)] p-2">
            {/* Top chrome strip — the three decorative dots and the balancing
                spacer are hidden below lg (coalios desktop-screen.njk); the
                address is a centred full-width pill on a phone. */}
            <div className="flex items-center justify-center gap-4 rounded-[1.75rem] bg-neutral-100 px-4 py-2.5 lg:justify-between dark:bg-neutral-950">
              <div className="hidden gap-1.5 lg:flex" aria-hidden="true">
                <span className="size-3 rounded-full bg-neutral-300 dark:bg-neutral-800" />
                <span className="size-3 rounded-full bg-neutral-300 dark:bg-neutral-800" />
                <span className="size-3 rounded-full bg-neutral-300 dark:bg-neutral-800" />
              </div>
              {/* Decorative address — illustrative path only, synced to the
                  selected tab. Not a link, real route or history entry. */}
              <span className="w-full select-none truncate rounded-full border border-neutral-300 bg-neutral-200 px-4 py-1.5 text-center text-sm text-neutral-800 lg:max-w-[25rem] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                <span className="text-neutral-500 dark:text-neutral-400">{BROWSER_ORIGIN}</span>
                {TABS[active].path}
              </span>
              <span aria-hidden="true" className="hidden w-12 lg:block" />
            </div>

            {/* Window — stacks below lg (address, then the vertical tab list,
                then the selected panel); rail-left-of-panel at lg+. */}
            <div className="flex flex-col gap-4 py-4 sm:px-2 lg:flex-row lg:gap-8 lg:py-6">
              <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="Přehled funkcí v praxi"
                className="flex w-full flex-col gap-2 lg:w-64 lg:shrink-0"
              >
                {TABS.map((tab, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={tab.id}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`${uid}-${tab.id}-tab`}
                      aria-controls={`${uid}-${tab.id}-panel`}
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-3.5 text-left font-lekton text-lg font-bold transition-colors ${
                        selected
                          ? "border-coalsoft-700 bg-neutral-100 text-neutral-900 dark:border-coalsoft-400 dark:bg-neutral-800 dark:text-white"
                          : "border-transparent text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                      }`}
                    >
                      <LineIcon name={tab.icon} className="size-6 shrink-0" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Only the active panel is in layout at every width (coalios
                  desktop-screen.njk uses the native `hidden` attribute +
                  `[&[hidden]]:hidden`). Each tab keeps one semantic DOM copy;
                  `hidden` removes inactive panels from sizing, focus and AT.
                  The active panel sizes to its own content — no grid-stack, no
                  tallest-hidden-panel row. */}
              <div className="flex-1">
                {TABS.map((tab, i) => {
                  const shown = i === active;
                  return (
                    <div
                      key={tab.id}
                      role="tabpanel"
                      id={`${uid}-${tab.id}-panel`}
                      aria-labelledby={`${uid}-${tab.id}-tab`}
                      tabIndex={shown ? 0 : -1}
                      hidden={!shown}
                      className={`${
                        shown ? "flex" : "hidden"
                      } flex-col gap-4 2xl:flex-row`}
                    >
                      {/* MAIN CONTENT — content group, then the CTA in normal
                          flow with the reference `~gap-10/12` rhythm (no
                          `mt-auto` bottom pinning). */}
                      <div className="flex flex-1 flex-col gap-10 rounded-3xl border-2 border-neutral-300 bg-neutral-100 p-6 sm:p-8 lg:gap-12 lg:p-10 dark:border-neutral-700 dark:bg-neutral-800">
                        <div className="flex flex-col gap-5">
                          <span className="eyebrow self-start">{tab.label}</span>
                          <h3 className="font-lekton text-2xl font-bold !leading-[1.15] text-neutral-900 sm:text-3xl dark:text-white">
                            {tab.heading}
                          </h3>
                          <p className="max-w-2xl text-base text-neutral-700 dark:text-neutral-300">
                            {tab.text}
                          </p>

                          <SpotlightGroup
                            className="grid gap-2 sm:grid-cols-2"
                            radius={150}
                          >
                            {tab.features.map((f) => (
                              <div
                                key={f.title}
                                data-surface="white"
                                className="glow-border glow-border--sm flex"
                              >
                                <div className="flex h-full w-full gap-3 px-4 py-3">
                                  <LineIcon
                                    name={f.icon}
                                    className="icon-accent mt-0.5 size-5 shrink-0"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="font-lekton text-sm font-bold text-neutral-900 dark:text-white">
                                      {f.title}
                                    </span>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {f.description}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </SpotlightGroup>
                        </div>

                        <div className="self-start">
                          <FragmentCta
                            targetId="pricing"
                            label="Vyzkoušet bezplatnou variantu"
                            variant="primary"
                            size="md"
                          />
                        </div>
                      </div>

                      {/* SUPPORTING NUMERICAL CARDS — two per topic. Stacked on a
                          narrow phone, side by side below the main card on
                          tablet, in the right rail where the full desktop row
                          fits. */}
                      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 2xl:max-w-sm 2xl:shrink-0 2xl:grid-cols-1">
                        {tab.metrics.map((m) => (
                          <MetricCard key={m.id} metric={m} />
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
