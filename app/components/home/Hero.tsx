import CtaButton from "../ui/CtaButton";
import FragmentCta from "../ui/FragmentCta";
import BrandWord from "../ui/BrandWord";
import { REGISTER_URL } from "../../lib/links";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blue glow — content stays fully legible without it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 mx-auto h-[30rem] max-w-4xl rounded-full bg-coalsoft-400/20 blur-3xl dark:bg-coalsoft-500/20"
      />
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center sm:py-24">
        <span className="eyebrow">AI plánování směn</span>

        <h1 className="max-w-4xl text-balance text-4xl font-bold !leading-[1.1] text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white">
          Směny pod kontrolou. Méně administrativy.
        </h1>

        <p className="max-w-2xl text-lg text-neutral-700 sm:text-xl dark:text-neutral-300">
          Plánujte směny, spravujte nepřítomnosti a mějte přehled o svém týmu
          v jedné aplikaci. <BrandWord /> vám s rozpisem pomůže pomocí AI.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:items-center">
          <CtaButton
            href={REGISTER_URL}
            target="_blank"
            label="Vyzkoušet na 14 dní zdarma"
            size="lg"
          />
          <FragmentCta targetId="contact" label="Kontaktovat tým" variant="secondary" size="lg" />
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Pro malé týmy i větší směnné provozy.
        </p>
      </div>
    </section>
  );
}
