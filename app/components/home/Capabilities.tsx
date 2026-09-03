import Section, { SectionHeading } from "../ui/Section";
import SpotlightGroup from "../ui/SpotlightGroup";
import InfoCard, { type InfoCardData } from "../ui/InfoCard";
import BrandWord from "../ui/BrandWord";

const ITEMS: InfoCardData[] = [
  {
    title: "Zaměstnanci",
    text: "Mějte úvazky, kontakty a další údaje o zaměstnancích přehledně na jednom místě. Při plánování směn tak máte potřebné informace o svém týmu po ruce.",
    icon: "users",
  },
  {
    title: "Pozice",
    text: "Rozdělte pracovní role a odlište je v plánu směn barvami. Snáze se zorientujete v rozpisu a uvidíte, kdo na jaké pozici pracuje.",
    icon: "roles",
  },
  {
    title: "Směny",
    text: "Připravte rozpis směn s pomocí AI a mějte přehled o jejich obsazení. Kontrola pravidel vás upozorní na možné problémy s pracovní dobou, přestávkami a odpočinkem.",
    icon: "calendar",
  },
  {
    title: "Nepřítomnosti",
    text: "Evidujte dovolené, nemoci i zdravotní volno a mějte po ruce žádosti o volno. Při úpravách rozpisu snadno zjistíte, s kým můžete počítat.",
    icon: "absence",
  },
  {
    title: "Exporty",
    text: "Vyexportujte potřebná data do Excelu, CSV nebo XML a připravte si podklady pro další práci. Hotové výstupy můžete také odeslat e-mailem.",
    icon: "export",
  },
  {
    title: "Statistiky",
    text: "Sledujte odpracované hodiny, fond pracovní doby a nepřítomnosti v přehledných statistikách. Získáte podklady pro vyhodnocení rozpisu i plánování dalšího období.",
    icon: "chart",
  },
];

export default function Capabilities() {
  return (
    <Section id="features" labelledBy="features-heading">
      <div className="flex flex-col gap-10">
        <SectionHeading
          id="features-heading"
          eyebrow="Funkce"
          title={<>Co všechno <BrandWord /> zvládne</>}
        />
        <SpotlightGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ITEMS.map((item) => (
            <InfoCard key={item.title} {...item} />
          ))}
        </SpotlightGroup>
      </div>
    </Section>
  );
}
