import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "./lib/seo";

export const dynamic = "force-static";

/**
 * Allow-all crawl policy + the production sitemap location. No `Disallow` for
 * the retained legacy routes: they 301 to `/` at the Cloudflare edge, and the
 * redirect (not a crawl block) is what keeps them out of the index — a crawler
 * still needs to fetch the path to see the 301.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
