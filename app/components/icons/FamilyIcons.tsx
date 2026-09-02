/**
 * Coalfamily brand marks, inlined so `fill="currentColor"` follows the link's
 * text colour (an external `<img src=".svg">` cannot be recoloured by CSS).
 * Paths copied from the coalios reference `src/assets/svgs/coalfamily/`.
 */
import type { SVGProps } from "react";

const paths: Record<string, string> = {
  coalsoft:
    "M-.016-.014v27.99h27.994V-.014zm24.41 7.154H7.133v2.181h17.265v15.084H3.558v-3.571h17.265V18.65H3.558v-3.57h17.265v-2.184H3.558V3.57h20.836v3.575z",
  coalios:
    "M-.022-.014v27.99h28.006V-.014zM18.68 24.41H3.563V9.319h3.579v11.519h11.539zm0-5.769h-3.575v-5.75h-4.389V9.32h7.964zm5.74.01h-3.575V7.149H10.717V3.575h13.704z",
  coaledu:
    "M14.284 12.996H7.118v2.17h7.166zM20.824 7.248H7.118v2.17h13.706zM-.022-.014v27.99h27.986V-.014zm20.846 24.512H7.118v-2.17h13.706zm3.569-5.756H3.547V3.672h20.846z",
  coalmarketing:
    "M-.016-.016v27.994h27.994V-.016zm3.575 3.579h3.575v15.039H3.559zm20.838 20.728H3.557v-3.575h20.84zm0-20.728v15.082H9.573V9.25h3.575v5.817h7.674V7.136H9.572V3.561h14.825z",
  coalfamily:
    "M-.016-.014v27.98h27.994V-.015zm12.21 3.59h3.571v3.57h-3.57zm-8.63 0H7.14v3.57H3.565zm20.833 20.82h-3.571v-11.57h-5.063v11.57h-3.57v-11.57H7.137v11.57H3.563V9.255h20.832v15.143zm0-17.25h-3.571v-3.57h3.57z",
};

export function FamilyIcon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 28 28" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d={d} />
    </svg>
  );
}
