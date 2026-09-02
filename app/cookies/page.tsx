import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

const TITLE = "Podmínky cookies";

export const metadata: Metadata = {
  title: `${TITLE} — coalshift`,
  description: "Informace o používání souborů cookies na webu coalshift.",
  alternates: {
    canonical: "https://coalshift.cz/cookies",
  },
};

export default function CookiesPage() {
  return <LegalPage title={TITLE} containerId="waulterCookies" />;
}
