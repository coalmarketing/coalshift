import Section, { SectionHeading } from "../ui/Section";
import CtaButton from "../ui/CtaButton";
import SpotlightGroup from "../ui/SpotlightGroup";
import {
  PRICING_PLANS,
  PRICING_INTRO,
  VAT_NOTE,
  PAID_TRIAL_HELPER,
} from "../../lib/pricing";

export default function Pricing() {
  return (
    <Section id="pricing" labelledBy="pricing-heading" tightTop>
      <div className="flex flex-col items-center gap-10">
        <SectionHeading id="pricing-heading" eyebrow="Ceník" title="Ceník" intro={PRICING_INTRO} />

        {/* Shared reference border + pointer glow on the pricing cards. Each
            card keeps its approved white/dark interior via data-surface="white";
            the Lite card keeps a permanent coalsoft ring on top of the shared
            rim. */}
        <SpotlightGroup
          as="ul"
          className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          radius={200}
        >
          {PRICING_PLANS.map((plan) => (
            <li
              key={plan.id}
              data-surface="white"
              className="glow-border h-full"
            >
              <div
                className={`flex h-full flex-col p-6 ${
                  plan.featured
                    ? "ring-2 ring-inset ring-coalsoft-500 dark:ring-coalsoft-400"
                    : ""
                }`}
              >
                <h3 className="font-lekton text-xl font-bold text-neutral-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {plan.employees}
                </p>

                <div className="mt-4 flex flex-col">
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {plan.paid ? "za měsíc, bez DPH" : " "}
                  </span>
                </div>

                <div className="mt-6 flex flex-col items-start gap-2">
                  <CtaButton
                    href={plan.cta.href}
                    target="_blank"
                    label={plan.cta.label}
                    variant={plan.featured ? "primary" : "secondary"}
                    size="md"
                  />
                  <p className="min-h-[1rem] text-xs text-neutral-500 dark:text-neutral-400">
                    {plan.paid ? PAID_TRIAL_HELPER : " "}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </SpotlightGroup>

        <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{VAT_NOTE}</p>
      </div>
    </Section>
  );
}
