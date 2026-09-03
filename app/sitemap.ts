import type { MetadataRoute } from "next";
import { ROUTES } from "./lib/seo";

export const dynamic = "force-static";

/**
 * Exactly the four public production URLs. `lastModified` / `changeFrequency` /
 * `priority` are omitted on purpose — no accurate content-change timestamp
 * exists for a static export, and Google ignores the last two anyway.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES)
    .filter((route) => route.sitemap && route.canonical)
    .map((route) => ({ url: route.canonical as string }));
}
