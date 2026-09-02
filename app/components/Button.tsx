"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";

type Variant = "primaryModra" | "primaryBila" | "secondaryModra" | "secondaryBila";

type SharedProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

/** Action-only control: no `href`, renders a real <button>. */
type ButtonElementProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

/**
 * Link control: has an `href` and may also carry an `onClick` (e.g. a fragment
 * link that additionally runs smooth scrolling). Renders next/link for internal
 * app routes and a plain <a> for fragments, external URLs, `mailto:` and `tel:`.
 */
type LinkElementProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonElementProps | LinkElementProps;

const baseStyles =
  "px-10 py-2 rounded-sm transition-colors duration-200 font-lekton font-bold";

const variantStyles: Record<Variant, string> = {
  primaryModra: "bg-modra text-white hover:bg-modraHover",
  primaryBila: "bg-white text-modra hover:bg-bilaHover",
  secondaryBila:
    "bg-transparent text-white border border-white hover:bg-white hover:text-modra",
  secondaryModra:
    "bg-transparent text-modra border border-modra hover:bg-white hover:text-modra",
};

export default function Button({
  variant = "primaryModra",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (props.href === undefined) {
    const { type = "button", ...rest } = props as ButtonElementProps;
    return (
      <button type={type} className={classes} {...rest}>
        {children}
      </button>
    );
  }

  const { href, target, rel, ...rest } = props as LinkElementProps;
  const resolvedRel =
    target === "_blank" && rel === undefined ? "noopener" : rel;

  // Internal application routes use next/link; fragments (`#…`), external URLs,
  // `mailto:` and `tel:` use a plain anchor.
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={resolvedRel}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target={target}
      rel={resolvedRel}
      {...rest}
    >
      {children}
    </a>
  );
}
