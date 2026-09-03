import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { metadataFor } from "../lib/seo";

/** Visible H1 / breadcrumb label (the document `<title>` adds " — coalshift"). */
const TITLE = "Zásady ochrany osobních údajů (GDPR)";

export const metadata: Metadata = metadataFor("/gdpr");

export default function GdprPage() {
  return <LegalPage title={TITLE} containerId="waulterGdpr" />;
}
