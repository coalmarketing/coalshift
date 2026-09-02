import type { ReactNode } from "react";

/**
 * Decorative brand-word treatment (F4). Renders one accessible text node with a
 * translucent coalsoft-blue highlighter behind the lower ~70% of the lettering
 * (see `.brand-word` in globals.css). No box, pill, border or size change.
 *
 * Use only for the `coalshift` / `coalshiftu` occurrences listed in content.md —
 * never for logos, nav/CTA labels, metadata, legal text or testimonials.
 */
export default function BrandWord({ children = "coalshift" }: { children?: ReactNode }) {
  return <span className="brand-word">{children}</span>;
}
