import type { Metadata } from "next";
import LegacyPage from "../components/legacy/LegacyPage";
import { metadataFor } from "../lib/seo";
import { REGISTER_URL, LOGIN_URL } from "../lib/links";

export const metadata: Metadata = metadataFor("/registrace");

/** Reuses the approved practical-use copy from docs/content.md §"Přehled funkcí v praxi". */
const SUPPORT = [
  {
    heading: "Směny",
    text: "S pomocí AI navrhnete směny podle potřeb provozu a dostupnosti zaměstnanců. Při úpravách vidíte, kde někdo chybí, a coalshift vás upozorní na možné problémy s pracovní dobou a odpočinkem.",
  },
  {
    heading: "Nepřítomnosti",
    text: "Dovolené, nemoci a sick days evidujete na jednom místě. Žádosti o volno a přehled nepřítomností máte po ruce při úpravách plánu.",
  },
  {
    heading: "Exporty",
    text: "Data z aplikace vyexportujete do Excelu, CSV nebo XML. Připravené podklady můžete odeslat e-mailem.",
  },
];

export default function RegistracePage() {
  return (
    <LegacyPage
      title="Vyzkoušejte coalshift na 14 dní zdarma"
      lead="Seznamte se s plánováním směn, správou nepřítomností a přehledy pro váš tým. Registraci dokončíte přímo v aplikaci coalshift."
      primary={{ label: "Přejít k registraci", href: REGISTER_URL, external: true }}
      secondary={
        <>
          Už máte účet?{" "}
          <a
            href={LOGIN_URL}
            className="link font-semibold text-neutral-800 dark:text-neutral-200"
          >
            Přihlásit se
          </a>
          .
        </>
      }
    >
      <ul className="grid w-full gap-4 text-left sm:grid-cols-3">
        {SUPPORT.map((item) => (
          <li key={item.heading} className="glow-border h-full">
            <div className="flex h-full flex-col gap-2 p-6">
              <h2 className="font-lekton text-lg font-bold text-neutral-900 dark:text-white">
                {item.heading}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </LegacyPage>
  );
}
