import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "./lib/seo";

export const dynamic = "force-static";

/**
 * Allow-all crawl policy + the production sitemap location. `public/_redirects`
 * (not a crawl block) 301s the retired legacy URLs at the Cloudflare edge.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
