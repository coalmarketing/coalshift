import Section, { SectionHeading } from "../ui/Section";
import ResponsiveImage from "../ResponsiveImage";
import CtaButton from "../ui/CtaButton";
import SpotlightGroup from "../ui/SpotlightGroup";
import LineIcon from "../icons/LineIcon";
import BrandWord from "../ui/BrandWord";
import { CONTACTS } from "../../lib/contacts";
import { REGISTER_URL } from "../../lib/links";

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col gap-12">
        {/* Integrated final trial action — replaces the former detached closing CTA. */}
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-coalsoft-500/40 bg-gradient-to-br from-coalsoft-50 to-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:from-coalsoft-950 dark:to-neutral-950">
          <p className="font-lekton text-xl font-bold text-neutral-900 dark:text-white">
            Vyzkoušejte <BrandWord /> ve svém týmu
          </p>
          <CtaButton
            href={REGISTER_URL}
            target="_blank"
            label="Vyzkoušet na 14 dní zdarma"
            size="lg"
          />
        </div>

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

        {/* Round portrait above a separate contact card (ports tym-item.njk).
            The Calendly consultation calendar (Phase 05) is added into this
            area; no placeholder calendar is shown now. */}
        <SpotlightGroup className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <div key={c.id} className="flex flex-col gap-5">
              <div className="relative ml-6 size-28 shrink-0 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                <ResponsiveImage
                  src={c.portraitSrc}
                  alt={`${c.name} — ${c.role}`}
                  fill
                  className="rounded-full object-cover"
                  sizes="112px"
                />
              </div>

              <div className="glow-border">
                <div className="flex flex-col gap-5 p-6">
                  <div className="flex flex-col gap-1">
                    <p className="font-lekton text-xl font-bold !leading-none text-neutral-900 dark:text-white">
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
        </SpotlightGroup>
      </div>
    </Section>
  );
}
