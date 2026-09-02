import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import Link from "next/link";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

type Shared = {
  /** Visible label. Also the single accessible name (the animated duplicate
   *  label and arrows are decorative and hidden from assistive tech). */
  label: string;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonElementProps = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type LinkElementProps = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type CtaButtonProps = ButtonElementProps | LinkElementProps;

/** The coalios diagonal-arrow motif (arrow_outward.svg). */
function DiagArrow({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
      <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
    </svg>
  );
}

function Inner({ label }: { label: string }) {
  return (
    <>
      <span className="cta__labels" aria-hidden="true">
        <span className="cta__label">{label}</span>
        <span className="cta__label cta__label--in">{label}</span>
      </span>
      <span className="cta__disc" aria-hidden="true">
        <DiagArrow className="cta__arrow" />
        <DiagArrow className="cta__arrow cta__arrow--in" />
      </span>
    </>
  );
}

export default function CtaButton({
  label,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: CtaButtonProps) {
  const classes = `cta cta--${variant} cta--${size} motion-reduce:[&_*]:!transition-none ${className}`.trim();

  if (props.href === undefined) {
    const { type = "button", ...rest } = props as ButtonElementProps;
    return (
      <button type={type} className={classes} aria-label={label} {...rest}>
        <Inner label={label} />
      </button>
    );
  }

  const { href, target, rel, ...rest } = props as LinkElementProps;
  const resolvedRel = target === "_blank" && rel === undefined ? "noopener" : rel;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} aria-label={label} target={target} rel={resolvedRel} {...rest}>
        <Inner label={label} />
      </Link>
    );
  }

  return (
    <a href={href} className={classes} aria-label={label} target={target} rel={resolvedRel} {...rest}>
      <Inner label={label} />
    </a>
  );
}
