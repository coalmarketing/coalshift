import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SubpageIntro from "../components/ui/SubpageIntro";
import ReferenceList from "../components/reference/ReferenceList";
import { metadataFor } from "../lib/seo";

export const metadata: Metadata = metadataFor("/reference");

export default function ReferencePage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <SubpageIntro
          title="Reference"
          intro="Přečtěte si zkušenosti s plánováním směn v coalshiftu."
        />
        <ReferenceList />
      </main>
      <Footer />
    </>
  );
}
