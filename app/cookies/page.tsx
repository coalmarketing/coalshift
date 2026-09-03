import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { metadataFor } from "../lib/seo";

/** Visible H1 / breadcrumb label (the document `<title>` adds " — coalshift"). */
const TITLE = "Podmínky cookies";

export const metadata: Metadata = metadataFor("/cookies");

export default function CookiesPage() {
  return <LegalPage title={TITLE} containerId="waulterCookies" />;
}
