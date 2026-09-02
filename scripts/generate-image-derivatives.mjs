// Build-time image transformation for the static Cloudflare Pages export.
//
// Reads image-registry.json, then uses Sharp to resize each registered raster
// source into WebP derivatives under public/img/derivatives/. Sharp performs the
// transformation; the ResponsiveImage component builds a `srcset` whose `w`
// descriptors match the files generated here.
//
// Safe to run repeatedly (outputs are overwritten). Fails clearly on a missing
// source, a registry dimension that disagrees with the decoded source, an
// upscale request, or a generated file whose real width does not match its
// descriptor.

import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(projectRoot, "image-registry.json");

async function main() {
  const registry = JSON.parse(await readFile(registryPath, "utf8"));
  const outputDir = path.join(projectRoot, registry.outputDir);
  await mkdir(outputDir, { recursive: true });

  let generated = 0;
  for (const image of registry.images) {
    const sourcePath = path.join(projectRoot, image.file);
    if (!existsSync(sourcePath)) {
      throw new Error(`Registered image source is missing: ${image.file}`);
    }

    const metadata = await sharp(sourcePath).metadata();
    if (image.width !== metadata.width || image.height !== metadata.height) {
      throw new Error(
        `Registry dimensions ${image.width}x${image.height} for ${image.file} ` +
          `disagree with the decoded source ${metadata.width}x${metadata.height}`,
      );
    }

    for (const width of image.widths) {
      if (width > metadata.width) {
        throw new Error(
          `Derivative width ${width} exceeds native width ${metadata.width} for ${image.file}`,
        );
      }
      const outputPath = path.join(outputDir, `${image.name}-${width}.webp`);
      const info = await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      if (info.width !== width) {
        throw new Error(
          `Generated ${path.basename(outputPath)} is ${info.width}px wide but is ` +
            `advertised as ${width}w`,
        );
      }
      generated += 1;
      console.log(
        `  ${path.relative(projectRoot, outputPath)}  ${info.width}x${info.height}  ${info.size} B`,
      );
    }
  }

  console.log(`Generated ${generated} image derivative(s) in ${registry.outputDir}/`);
}

main().catch((error) => {
  console.error(`Image derivative generation failed: ${error.message}`);
  process.exit(1);
});
