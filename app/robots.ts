import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "./lib/seo";

export const dynamic = "force-static";

/**
 * Allow-all crawl policy + the production sitemap location. No `Disallow` for
 * the dead legacy routes — a crawler must be able to reach them to read their
 * `noindex` meta tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
