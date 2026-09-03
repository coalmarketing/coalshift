"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Section, { SectionHeading } from "../ui/Section";
import CtaButton from "../ui/CtaButton";
import SpotlightGroup from "../ui/SpotlightGroup";
import LineIcon, { type LineIconName } from "../icons/LineIcon";
import { REGISTER_URL } from "../../lib/links";

type Fact = { text: string; icon: LineIconName };

/** One supporting numerical card. `illustrative` values show the "Ilustrační
 *  údaj" note and must never be treated as measured results or copied into
 *  metadata / structured data / other sections. `confirmed` values are an
 *  approved count or composition from canonical product copy. */
type Metric = {
  /** Stable id from content.md — used for the later product-team replacement. */
  id: string;
  value: string;
  badge: string;
  note: string;
  status: "illustrative" | "confirmed";
};

type Tab = {
  id: string;
  label: string;
  icon: LineIconName;
  /** Illustrative path shown in the faux-browser address bar (no hash, not a real route). */
  path: string;
  heading: string;
  text: string;
  facts: Fact[];
  metrics: [Metric, Metric];
};

const TABS: Tab[] = [
  {
    id: "smeny-ai",
    label: "Směny a AI",
    icon: "ai",
    path: "/smeny-a-ai",
    heading: "Připravte rozpis a mějte přehled o obsazení",
    text: "S pomocí AI navrhnete směny podle potřeb provozu a dostupnosti zaměstnanců. Při úpravách vidíte, kde někdo chybí, a coalshift vás upozorní na možné problémy s pracovní dobou a odpočinkem.",
    facts: [
      { text: "Návrh rozpisu s AI", icon: "ai" },
      { text: "Přehled obsazení směn", icon: "coverage" },
      { text: "Kontrola přestávek a odpočinku", icon: "rules" },
    ],
    metrics: [
      {
        id: "planning-time",
        value: "50 %",
        badge: "Úspora času",
        note: "Při přípravě rozpisu směn pro celý tým.",
        status: "illustrative",
      },
      {
        id: "planning-month",
        value: "20 h",
        badge: "Měsíčně zpět",
        note: "Čas ušetřený při plánování a úpravách směn.",
        status: "illustrative",
      },
    ],
  },
  {
    id: "lide-pozice",
    label: "Lidé a pozice",
    icon: "users",
    path: "/lide-a-pozice",
    heading: "Mějte údaje týmu po ruce při plánování",
    text: "Úvazky a kontakty najdete v databázi zaměstnanců. Barevně odlišené pracovní role vám usnadní orientaci v rozpisu směn.",
    facts: [
      { text: "Databáze zaměstnanců", icon: "id" },
      { text: "Úvazky a kontakty", icon: "users" },
      { text: "Barevné rozlišení pozic", icon: "palette" },
    ],
    metrics: [
      {
        id: "team-place",
        value: "1",
        badge: "Společné místo",
        note: "Úvazky, kontakty a pracovní role v jedné aplikaci.",
        status: "confirmed",
      },
      {
        id: "team-search",
        value: "40 %",
        badge: "Čas na hledání",
        note: "Úspora času při dohledávání údajů o zaměstnancích.",
        status: "illustrative",
      },
    ],
  },
  {
    id: "nepritomnosti",
    label: "Nepřítomnosti",
    icon: "absence",
    path: "/nepritomnosti",
    heading: "Zohledněte volno i změny v dostupnosti",
    text: "Dovolené, nemoci a sick days evidujete na jednom místě. Žádosti o volno a přehled nepřítomností máte po ruce při úpravách plánu.",
    facts: [
      { text: "Dovolené a žádosti o volno", icon: "leave" },
      { text: "Nemoci a sick days", icon: "sick" },
      { text: "Přehled dostupnosti", icon: "availability" },
    ],
    metrics: [
      {
        id: "absence-place",
        value: "1",
        badge: "Přehled volna",
        note: "V jedné aplikaci evidujete dovolené, nemoci i žádosti o volno.",
        status: "confirmed",
      },
      {
        id: "absence-admin",
        value: "30 %",
        badge: "Méně administrativy",
        note: "Úspora času při evidenci volna a změn dostupnosti týmu.",
        status: "illustrative",
      },
    ],
  },
  {
    id: "exporty",
    label: "Exporty",
    icon: "export",
    path: "/exporty",
    heading: "Připravte podklady pro další práci",
    text: "Data z aplikace vyexportujete do Excelu, CSV nebo XML. Připravené podklady můžete odeslat e-mailem.",
    facts: [
      { text: "Excel", icon: "excel" },
      { text: "CSV a XML", icon: "file" },
      { text: "Odeslání e-mailem", icon: "mail" },
    ],
    metrics: [
      {
        id: "export-formats",
        value: "3",
        badge: "Formáty exportu",
        note: "Podklady do Excelu, CSV a XML.",
        status: "confirmed",
      },
      {
        id: "export-time",
        value: "60 %",
        badge: "Úspora času",
        note: "Při přípravě a předání podkladů pro další práci.",
        status: "illustrative",
      },
    ],
  },
  {
    id: "statistiky",
    label: "Statistiky",
    icon: "chart",
    path: "/statistiky",
    heading: "Získejte přehled o hodinách a nepřítomnostech",
    text: "Sledujte odpracované hodiny, fond pracovní doby a nepřítomnosti v přehledných statistikách.",
    facts: [
      { text: "Odpracované hodiny", icon: "hours" },
      { text: "Fond pracovní doby", icon: "clock" },
      { text: "Přehled nepřítomností", icon: "chart" },
    ],
    metrics: [
      {
        id: "reporting-areas",
        value: "3",
        badge: "Oblasti přehledu",
        note: "Odpracované hodiny, fond pracovní doby a nepřítomnosti.",
        status: "confirmed",
      },
      {
        id: "reporting-time",
        value: "50 %",
        badge: "Čas na přehledy",
        note: "Úspora času při přípravě přehledů pro vyhodnocení rozpisu.",
        status: "illustrative",
      },
    ],
  },
];

const BROWSER_ORIGIN = "https://coalshift.cz";

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <li className="flex flex-col justify-between gap-6 rounded-3xl border-2 border-neutral-300 bg-neutral-100 p-5 sm:p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <span className="font-lekton text-3xl font-bold leading-none text-neutral-900 sm:text-4xl dark:text-white">
            {metric.value}
          </span>
          <span className="eyebrow shrink-0">{metric.badge}</span>
        </div>
        {metric.status === "illustrative" ? (
          <span className="w-fit rounded-full bg-neutral-200 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
            Ilustrační údaj
          </span>
        ) : null}
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
          title="Od návrhu směn po podklady pro další práci"
          intro="Podívejte se, jak vám jednotlivé funkce pomohou při plánování a každodenních změnách."
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
                            {tab.facts.map((f) => (
                              <div
                                key={f.text}
                                data-surface="white"
                                className="glow-border glow-border--sm"
                              >
                                <div className="flex items-center gap-3 px-4 py-3">
                                  <LineIcon
                                    name={f.icon}
                                    className="icon-accent size-5 shrink-0"
                                  />
                                  <span className="font-lekton text-sm font-bold text-neutral-900 dark:text-white">
                                    {f.text}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </SpotlightGroup>
                        </div>

                        <div className="self-start">
                          <CtaButton
                            href={REGISTER_URL}
                            target="_blank"
                            label="Vyzkoušet na 14 dní zdarma"
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
