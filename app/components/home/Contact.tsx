import Section, { SectionHeading } from "../ui/Section";
import ResponsiveImage from "../ResponsiveImage";
import SpotlightGroup from "../ui/SpotlightGroup";
import LineIcon from "../icons/LineIcon";
import BrandWord from "../ui/BrandWord";
import BookingsDialog from "./BookingsDialog";
import { CONTACTS } from "../../lib/contacts";

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col gap-12">
        <SectionHeading
          id="contact-heading"
          eyebrow="Kontakt"
          title="Pojďme probrat váš provoz"
          intro={
            <>
              Potřebujete poradit s výběrem tarifu nebo s používáním{" "}
              <BrandWord>coalshiftu</BrandWord>? Ozvěte se nám.
            </>
          }
          center={false}
        />

        {/* Desktop: personal contacts occupy the left third, the consultation
            panel the right two-thirds and stretches to match its height.
            Mobile: the consultation action comes first, personal contacts
            follow. Each person is one cohesive glow-border card (portrait +
            name/role/contacts inside a single inner surface — a `.glow-border`
            must have exactly one direct child, or every child gets its own
            rounded surface and the card reads as detached slabs). */}
        <SpotlightGroup className="flex flex-col gap-8 xl:grid xl:grid-cols-3 xl:items-stretch xl:gap-10">
          <div className="order-2 flex flex-col gap-6 sm:flex-row sm:gap-6 xl:order-1 xl:col-span-1 xl:flex-col">
            {CONTACTS.map((c) => (
              <div key={c.id} className="glow-border flex-1" data-surface="white">
                <div className="flex h-full flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-neutral-200 sm:size-20 dark:bg-neutral-800">
                    <ResponsiveImage
                      src={c.portraitSrc}
                      alt={`${c.name} — ${c.role}`}
                      fill
                      className="rounded-full object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <p className="font-lekton text-lg font-bold !leading-none text-neutral-900 dark:text-white">
                        {c.name}
                      </p>
                      <span className="text-sm font-bold !leading-none text-coalsoft-700 dark:text-coalsoft-300">
                        {c.role}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                      <a
                        href={c.phoneHref}
                        className="inline-flex items-center gap-2 text-neutral-800 underline-offset-4 hover:text-coalsoft-700 hover:underline dark:text-neutral-200 dark:hover:text-coalsoft-300"
                      >
                        <LineIcon name="phone" className="size-4 shrink-0" />
                        {c.phoneDisplay}
                      </a>
                      <a
                        href={c.emailHref}
                        className="inline-flex items-center gap-2 break-all text-neutral-800 underline-offset-4 hover:text-coalsoft-700 hover:underline dark:text-neutral-200 dark:hover:text-coalsoft-300"
                      >
                        <LineIcon name="mail" className="size-4 shrink-0" />
                        {c.emailDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation panel — one unified glow-border card (single inner
              surface) with a Microsoft Bookings CTA. Stretches to the
              contacts column's height on `xl`; the CTA + supporting line stay
              anchored near the bottom via `mt-auto`, and a restrained
              coalshift-blue radial wash (decorative, no separate DOM node to
              hide, does not touch text) fills the extra space. */}
          <div className="order-1 flex flex-col xl:order-2 xl:col-span-2">
            <div className="glow-border glow-border--lg h-full" data-surface="white">
              <div className="flex h-full flex-col gap-8 overflow-hidden bg-[radial-gradient(140%_100%_at_100%_0%,rgba(0,181,226,0.08),transparent_55%)] p-6 sm:p-10 dark:bg-[radial-gradient(140%_100%_at_100%_0%,rgba(31,195,236,0.12),transparent_55%)]">
                <div className="flex flex-col gap-4">
                  <span className="eyebrow w-fit self-start">Online konzultace</span>
                  <h3 className="font-lekton text-2xl font-bold !leading-[1.15] text-neutral-900 sm:text-3xl dark:text-white">
                    Vyberte si termín, který vám vyhovuje
                  </h3>
                  <p className="max-w-xl text-base text-neutral-700 sm:text-lg dark:text-neutral-300">
                    Společně projdeme váš provoz, způsob plánování směn a ukážeme, kde vám může coalshift usnadnit
                    každodenní práci.
                  </p>
                </div>

                <div className="mt-auto flex flex-col items-start gap-3">
                  <BookingsDialog />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Online přes Microsoft Teams</span>
                </div>
              </div>
            </div>
          </div>
        </SpotlightGroup>
      </div>
    </Section>
  );
}
