import type { Metadata } from "next";
import Link from "next/link";
import LegacyPage from "../../components/legacy/LegacyPage";
import { metadataFor } from "../../lib/seo";
import { REGISTER_URL } from "../../lib/links";

export const metadata: Metadata = metadataFor("/wait-list/thank-you");

export default function ThankYouPage() {
  return (
    <LegacyPage
      title="Děkujeme za zájem o coalshift"
      lead="Chcete pokračovat? Přejděte do aplikace a vyzkoušejte si plánování směn na 14 dní zdarma."
      primary={{ label: "Přejít do aplikace", href: REGISTER_URL, external: true }}
      secondary={
        <Link
          href="/"
          className="link font-semibold text-neutral-800 dark:text-neutral-200"
        >
          Zpět na úvodní stránku
        </Link>
      }
    />
  );
}
