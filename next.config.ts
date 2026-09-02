import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export: `next/image` serves originals as-is (used only for SVGs and
    // logos here). The two Sharp-generated raster assets go through the
    // registry-driven <ResponsiveImage> component instead.
    unoptimized: true,
  },
};

export default nextConfig;
