// Converts the remaining project artwork to WebP.
//
//   node scripts/convert-project-images.mjs
//
// Full-bleed shots are sized for a 2x display of the ~1073px row; insets render
// at 26% of that, so they get a much smaller budget. Alpha is preserved, and a
// source is only deleted once its WebP exists and is actually smaller.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = "src/assets/images/projects";
const FULL_WIDTH = 2146; // 2x of the 1073px row
const INSET_WIDTH = 700; // insets draw at ~26% of the row
const QUALITY = 82;

const JOBS = [
  { file: "digiclipse_main.jpg", width: FULL_WIDTH },
  { file: "digiclipse_showcase.png", width: INSET_WIDTH },
  { file: "arcade_thumbnail.png", width: FULL_WIDTH }, // video poster
  { file: "ssc_main.png", width: FULL_WIDTH },
  { file: "ssc_settings.png", width: INSET_WIDTH },
  { file: "sga.png", width: FULL_WIDTH },
  { file: "portfolio.png", width: FULL_WIDTH },
];

const kb = (n) => (n / 1024).toFixed(0) + " KB";
let before = 0;
let after = 0;

for (const job of JOBS) {
  const src = path.join(DIR, job.file);
  if (!fs.existsSync(src)) {
    console.log(`  skip (absent)      ${job.file}`);
    continue;
  }

  const out = path.join(DIR, path.parse(job.file).name + ".webp");
  const meta = await sharp(src).metadata();

  await sharp(src)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 90 })
    .toFile(out);

  const a = fs.statSync(src).size;
  const b = fs.statSync(out).size;

  // Keep the original if WebP somehow lost — small flat PNGs occasionally do.
  if (b >= a) {
    fs.unlinkSync(out);
    console.log(`  kept original      ${job.file.padEnd(26)} webp was larger`);
    continue;
  }

  fs.unlinkSync(src);
  before += a;
  after += b;
  console.log(
    `  ${job.file.padEnd(26)} ${(meta.width + "x" + meta.height).padEnd(11)} ` +
      `${kb(a).padStart(9)} -> ${kb(b).padStart(8)}`
  );
}

console.log(`\nTotal: ${kb(before)} -> ${kb(after)}`);
