import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Compact subpage header — real H1, `Domů → title` breadcrumb and the subtle
 * blue radial wash. Ports coalios `sections/landing.njk`. Shared by the two
 * legal pages (`LegalPage`) and `/reference` so the intro cannot diverge.
 *
 * `intro` is an optional lead paragraph under the breadcrumb (used by
 * `/reference`); the legal pages pass none, so their markup is unchanged.
 */
export default function SubpageIntro({
  title,
  intro,
}: {
  title: string;
  intro?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16 dark:border-neutral-800 dark:bg-black">
      <div className="container-page flex flex-col items-center gap-4 text-center">
        <h1 className="max-w-3xl text-balance font-lekton text-3xl font-bold !leading-[1.15] text-neutral-900 sm:text-4xl dark:text-white">
          {title}
        </h1>
        <nav aria-label="Drobečková navigace">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <li>
              <Link
                href="/"
                className="underline-offset-4 hover:text-neutral-900 hover:underline dark:hover:text-white"
              >
                Domů
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-neutral-900 dark:text-white" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        {intro ? (
          <p className="max-w-2xl text-base text-neutral-700 dark:text-neutral-300">
            {intro}
          </p>
        ) : null}
      </div>
      {/* Subtle blue background wash (reference radial gradient). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_center,rgba(0,181,226,0.18)_0%,rgba(0,181,226,0)_60%)]"
      />
    </section>
  );
}
