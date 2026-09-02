import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Rendered as the section landmark id (fragment target). */
  id?: string;
  /** id of the heading that labels this landmark. */
  labelledBy?: string;
  className?: string;
  /** Inner wrapper width + padding. Set false to lay out the container yourself. */
  contained?: boolean;
  as?: "section" | "div";
  /** Collapse the top padding so this block sits directly under the previous one
   *  (used for pricing immediately after the practical-use browser). */
  tightTop?: boolean;
};

/**
 * Consistent vertical rhythm + reading width for every homepage block, so
 * sections stack predictably and the sticky-header offset stays correct.
 */
export default function Section({
  children,
  id,
  labelledBy,
  className = "",
  contained = true,
  as: Tag = "section",
  tightTop = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-[var(--header-height,8.5rem)] pb-12 sm:pb-16 lg:pb-20 ${
        tightTop ? "pt-2 sm:pt-3 lg:pt-4" : "pt-12 sm:pt-16 lg:pt-20"
      } ${className}`.trim()}
    >
      {contained ? <div className="container-page">{children}</div> : children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  id,
  title,
  intro,
  center = true,
}: {
  eyebrow?: string;
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${center ? "items-start text-left sm:items-center sm:text-center" : "items-start text-left"}`}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2
        id={id}
        className="max-w-3xl text-balance text-3xl font-bold !leading-[1.15] text-neutral-900 sm:text-4xl lg:text-5xl dark:text-white"
      >
        {title}
      </h2>
      {intro ? (
        <p className="max-w-2xl text-base text-neutral-700 sm:text-lg dark:text-neutral-300">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
