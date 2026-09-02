"use client";

import { useId, useState } from "react";
import Section, { SectionHeading } from "../ui/Section";

const ITEMS: { q: string; a: string }[] = [
  {
    q: "Jak mi coalshift pomůže s plánováním směn?",
    a: "coalshift propojuje plánování směn, evidenci nepřítomností a přehled o zaměstnancích. AI vám pomůže připravit rozpis a kontrola pravidel upozorní na možné problémy v plánu.",
  },
  {
    q: "Je coalshift vhodný i pro malý tým?",
    a: "Ano. Tarif Free je určený pro 0 až 5 zaměstnanců. Pro větší týmy si vyberete tarif podle počtu zaměstnanců.",
  },
  {
    q: "Čím se jednotlivé tarify liší?",
    a: "Pouze počtem zaměstnanců. Funkce jsou stejné ve všech tarifech a uvedené ceny jsou bez DPH.",
  },
  {
    q: "Mohu si coalshift nejdříve vyzkoušet?",
    a: "Ano, coalshift si můžete vyzkoušet na 14 dní zdarma.",
  },
  {
    q: "Na koho se mohu obrátit s nastavením nebo dotazem?",
    a: "S dotazy k produktu a nabídce vám pomůže Martina Adamcová. Pro podporu se můžete obrátit na Šárku Melišovou. Kontakty najdete níže.",
  },
  {
    q: "Mohu z aplikace exportovat data?",
    a: "Ano. coalshift podporuje exporty do Excelu, CSV a XML a odeslání podkladů e-mailem.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-lekton text-base font-bold text-neutral-900 dark:text-white"
        >
          {q}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`size-5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!open}
        className="px-5 pb-5 text-sm text-neutral-700 dark:text-neutral-300"
      >
        {a}
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <Section id="faq" labelledBy="faq-heading" className="bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col gap-10">
        <SectionHeading id="faq-heading" eyebrow="Nejčastější dotazy" title="Nejčastější dotazy" />
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </Section>
  );
}
