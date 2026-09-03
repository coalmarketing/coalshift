import type { Metadata } from "next";
import Link from "next/link";
import LegacyPage from "../components/legacy/LegacyPage";
import { metadataFor } from "../lib/seo";
import { REGISTER_URL } from "../lib/links";

export const metadata: Metadata = metadataFor("/wait-list");

export default function WaitListPage() {
  return (
    <LegacyPage
      title="Začněte s coalshiftem"
      lead="Chcete si zjednodušit plánování směn? coalshift si můžete vyzkoušet na 14 dní zdarma."
      primary={{
        label: "Vyzkoušet na 14 dní zdarma",
        href: REGISTER_URL,
        external: true,
      }}
      secondary={
        <>
          Máte otázky?{" "}
          <Link
            href="/#contact"
            className="link font-semibold text-neutral-800 dark:text-neutral-200"
          >
            Kontaktujte náš tým
          </Link>
          .
        </>
      }
    />
  );
}
