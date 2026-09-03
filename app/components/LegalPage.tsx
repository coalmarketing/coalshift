import Header from "./Header";
import Footer from "./Footer";
import SubpageIntro from "./ui/SubpageIntro";

type Props = {
  /** Visible H1 and the current-page breadcrumb label. */
  title: string;
  /** Exact provider container id — filled by the existing Waulter integration. */
  containerId: "waulterGdpr" | "waulterCookies";
};

/**
 * Shell for the /gdpr and /cookies subpages. Shared `SubpageIntro` (real H1,
 * breadcrumb Domů → title, subtle blue background), shared header/footer, then
 * the single, initially empty provider container inside a readable wrapper.
 *
 * Server component with static markup: React never re-renders or rewrites the
 * injected policy HTML on theme changes.
 */
export default function LegalPage({ title, containerId }: Props) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <SubpageIntro title={title} />

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
