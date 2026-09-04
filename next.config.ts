import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // No-trailing-slash URLs everywhere: canonicals, sitemap entries and internal
  // hrefs all use `/reference` (not `/reference/`). Pinned so it can't drift.
  trailingSlash: false,
};

export default nextConfig;
