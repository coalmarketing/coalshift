import type { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SubpageIntro from "../ui/SubpageIntro";
import CtaButton from "../ui/CtaButton";

type PrimaryAction = {
  label: string;
  href: string;
  /** Opens the separate application in a new tab. */
  external?: boolean;
};

/**
 * Shared shell for the three dead legacy routes (`/registrace`, `/wait-list`,
 * `/wait-list/thank-you`). They stay directly loadable but carry no promotional
 * sections and no form — a real H1, a lead, one primary action to the app and an
 * optional secondary link. Dark-safe: no legacy colour tokens, themed surfaces.
 */
export default function LegacyPage({
  title,
  lead,
  primary,
  secondary,
  children,
}: {
  title: string;
  lead: string;
  primary: PrimaryAction;
  secondary?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <SubpageIntro title={title} intro={lead} />
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="container-page flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <CtaButton
                href={primary.href}
                label={primary.label}
                variant="primary"
                size="lg"
                {...(primary.external ? { target: "_blank" } : {})}
              />
              {secondary ? (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {secondary}
                </p>
              ) : null}
            </div>
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
