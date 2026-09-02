import LineIcon, { type LineIconName } from "../icons/LineIcon";

export type InfoCardData = { title: string; text: string; icon: LineIconName };

/**
 * Shared information tile for the Capabilities and Industries grids.
 * Ports coalios `benefits.njk`: a bare outlined blue icon (no gray frame),
 * a semantic heading and a short paragraph, on the layered `.glow-border`
 * surface (neutral-100 interior, always-visible 2px neutral rim).
 * Informational only — not a link or a keyboard stop.
 */
export default function InfoCard({ title, text, icon }: InfoCardData) {
  return (
    <div className="glow-border h-full">
      <div className="flex h-full flex-col gap-3 p-6">
        <LineIcon name={icon} className="icon-accent size-12 shrink-0" />
        <h3 className="font-lekton text-xl font-bold leading-snug text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{text}</p>
      </div>
    </div>
  );
}
