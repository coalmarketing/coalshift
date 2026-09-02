import registry from "../../image-registry.json";

/**
 * Registry-driven responsive image for the two Sharp-generated raster assets.
 *
 * `next/image` cannot emit a truthful `srcset` on top of a static export where a
 * loader caps requested widths at the largest generated file — it labels every
 * candidate with the width it *asked* for, not the width that was delivered.
 * This component reads image-registry.json and emits `w` descriptors that match
 * the actual generated WebP files, plus a layout-aligned `sizes`. It is a plain
 * presentational component (no hooks, no Node-only imports) and is safe in both
 * server and client components.
 *
 * SVGs, logos and every other image keep using `next/image` unchanged.
 */

type RegistryImage = {
  src: string;
  name: string;
  width: number;
  height: number;
  widths: number[];
};

const DERIVATIVES_URL: string = registry.derivativesUrl;

const bySrc = new Map<string, RegistryImage>(
  (registry.images as RegistryImage[]).map((image) => [image.src, image]),
);

type ResponsiveImageProps = {
  /** Registry key, e.g. "/mocup-coalshift.png". */
  src: string;
  alt: string;
  /** Layout-aligned `sizes` describing the rendered slot. */
  sizes: string;
  className?: string;
  /** Eager-load with high fetch priority (kept from the previous `priority`). */
  priority?: boolean;
  /** Fill a positioned parent (replaces `next/image` `fill`). */
  fill?: boolean;
};

export default function ResponsiveImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
  fill = false,
}: ResponsiveImageProps) {
  const image = bySrc.get(src);
  if (!image) {
    throw new Error(`ResponsiveImage: "${src}" is not registered in image-registry.json`);
  }

  const widths = [...image.widths].sort((a, b) => a - b);
  const fileUrl = (w: number) => `${DERIVATIVES_URL}/${image.name}-${w}.webp`;
  const srcSet = widths.map((w) => `${fileUrl(w)} ${w}w`).join(", ");
  const largest = widths[widths.length - 1];

  const shared = {
    alt,
    src: fileUrl(largest),
    srcSet,
    sizes,
    decoding: "async" as const,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    ...(priority ? { fetchPriority: "high" as const } : {}),
  };

  if (fill) {
    return <img {...shared} className={`absolute inset-0 h-full w-full ${className}`.trim()} />;
  }

  return <img {...shared} width={image.width} height={image.height} className={className} />;
}
