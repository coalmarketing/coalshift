"use client";

import CtaButton from "./CtaButton";
import { shouldSmoothScroll, smoothScrollToId } from "../../lib/smoothScroll";

/**
 * A CTA that points at an in-page section. Ordinary same-page activation is
 * intercepted for a smooth scroll; modifier / middle clicks and a missing
 * target fall through to native `#hash` navigation (see smoothScroll guards).
 */
export default function FragmentCta({
  targetId,
  label,
  variant = "secondary",
  size = "lg",
  className,
}: {
  targetId: string;
  label: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <CtaButton
      href={`#${targetId}`}
      label={label}
      variant={variant}
      size={size}
      className={className}
      onClick={(e) => {
        if (shouldSmoothScroll(e, targetId)) {
          e.preventDefault();
          smoothScrollToId(targetId);
        }
      }}
    />
  );
}
