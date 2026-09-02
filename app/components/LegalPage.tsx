import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  /** Visible H1 and the current-page breadcrumb label. */
  title: string;
  /** Exact provider container id — filled by the existing Waulter integration. */
  containerId: "waulterGdpr" | "waulterCookies";
};

/**
 * Shell for the /gdpr and /cookies subpages. Ports coalios `landing.njk` +
 * `pages/gdpr.njk`: a small subpage intro (real H1, breadcrumb Domů → title,
 * subtle blue background), shared header/footer, then the single, initially
 * empty provider container inside a readable content wrapper.
 *
 * Server component with static markup: React never re-renders or rewrites the
 * injected policy HTML on theme changes.
 */
export default function LegalPage({ title, containerId }: Props) {
  return (
    <>
      <Header />
      <main id="main">
        {/* Subpage intro */}
        <section className="relative overflow-hidden border-b border-neutral-200 bg-white px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16 dark:border-neutral-800 dark:bg-black">
          <div className="container-page flex flex-col items-center gap-4 text-center">
            <h1 className="max-w-3xl text-balance font-lekton text-3xl font-bold !leading-[1.15] text-neutral-900 sm:text-4xl dark:text-white">
              {title}
            </h1>
            <nav aria-label="Drobečková navigace">
              <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>
                  <Link
                    href="/"
                    className="underline-offset-4 hover:text-neutral-900 hover:underline dark:hover:text-white"
                  >
                    Domů
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-semibold text-neutral-900 dark:text-white" aria-current="page">
                  {title}
                </li>
              </ol>
            </nav>
          </div>
          {/* Subtle blue background wash (reference radial gradient). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_center,rgba(0,181,226,0.18)_0%,rgba(0,181,226,0)_60%)]"
          />
        </section>

        {/* Provider content — the div is initially empty in the export and is
            populated by the existing owner-managed Waulter integration. */}
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="container-page">
            <div className="legal-content mx-auto max-w-4xl">
              <div id={containerId} suppressHydrationWarning />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
