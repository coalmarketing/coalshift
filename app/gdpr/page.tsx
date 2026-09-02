import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

const TITLE = "Zásady ochrany osobních údajů (GDPR)";

export const metadata: Metadata = {
  title: `${TITLE} — coalshift`,
  description: "Informace o zpracování osobních údajů na webu coalshift.",
  alternates: {
    canonical: "https://coalshift.cz/gdpr",
  },
};

export default function GdprPage() {
  return <LegalPage title={TITLE} containerId="waulterGdpr" />;
}
