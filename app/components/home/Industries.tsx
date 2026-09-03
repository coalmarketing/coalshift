import Section, { SectionHeading } from "../ui/Section";
import SpotlightGroup from "../ui/SpotlightGroup";
import InfoCard, { type InfoCardData } from "../ui/InfoCard";
import LineIcon from "../icons/LineIcon";
import BrandWord from "../ui/BrandWord";

const INDUSTRIES: InfoCardData[] = [
  {
    title: "Sociální služby",
    text: "Plánujte směny pečujících i dalších členů týmu s přehledem o jejich dostupnosti. Dovolené a změny v obsazení zohledníte při úpravě rozpisu.",
    icon: "social",
  },
  {
    title: "Zdravotnictví",
    text: "Slaďte směny zdravotnického týmu a mějte po ruce přehled pracovních rolí i nepřítomností. Při změnách se snáze zorientujete v aktuálním rozpisu.",
    icon: "health",
  },
  {
    title: "Výroba",
    text: "Rozvrhněte směny podle pracovních rolí a dostupnosti lidí. Přehled obsazení vám pomůže při každodenních změnách ve výrobním provozu.",
    icon: "factory",
  },
  {
    title: "Gastronomie a restaurace",
    text: "Sestavte rozpis pro kuchyni i obsluhu a zohledněte požadavky na volno. Mějte na jednom místě informace, které potřebujete při změnách směn.",
    icon: "restaurant",
  },
  {
    title: "Hotely",
    text: "Koordinujte směny recepce, úklidu a dalších provozních týmů. Barevně odlišené role a přehled nepřítomností usnadní orientaci v plánu.",
    icon: "hotel",
  },
  {
    title: "Maloobchod a pobočkové sítě",
    text: "Naplánujte obsazení prodejny podle pracovních rolí a dostupnosti týmu. Při úpravách směn mějte po ruce údaje o zaměstnancích i jejich volnu.",
    icon: "retail",
  },
];

export default function Industries() {
  return (
    <Section id="industries" labelledBy="industries-heading">
      <div className="flex flex-col gap-10">
        <SectionHeading
          id="industries-heading"
          eyebrow="Pro koho"
          title={<>Pro koho je <BrandWord /></>}
          intro="Pro týmy, kde je potřeba sladit lidi, směny a každodenní provoz."
        />

        <SpotlightGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {INDUSTRIES.map((item) => (
            <InfoCard key={item.title} {...item} />
          ))}
        </SpotlightGroup>

        {/* F2 — centered closing line with a decorative outlined plus. No card,
            pill, border or CTA; the plus is not a keyboard stop. */}
        <div className="flex flex-col items-center gap-2 pt-1 text-center">
          <LineIcon
            name="plus"
            aria-hidden="true"
            className="icon-accent size-6"
            strokeWidth={2}
          />
          <p className="font-lekton text-lg font-bold text-neutral-800 sm:text-xl dark:text-neutral-200">
            A pro všechny další, kdo plánují směny.
          </p>
        </div>
      </div>
    </Section>
  );
}
