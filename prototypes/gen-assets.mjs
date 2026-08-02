// Downscales the real site images into inlineable data URIs.
//
//   node prototypes/gen-assets.mjs   ->  prototypes/_assets.json
//
// The originals are far too big to inline (avatar_circle.jpeg alone is 1.8 MB,
// aspire.jpg is 11 MB). Everything here is resized to the largest size the
// layout actually displays and encoded as WebP, which handles both
// screenshots and photos well and supports transparency for the logos.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const ROOT = dirname(HERE.replace(/[\\/]$/, ''));
const IMG = join(ROOT, 'src', 'assets', 'images');

// key -> [path relative to src/assets/images, target width, quality]
const MANIFEST = {
  // background-removed portrait (see cutout.mjs) — WebP keeps the alpha
  avatar:        ['home/avatar_circle.jpeg', 480, 84],
  ets:           ['home/ets.png',            150, 88],

  stingray:      ['logos/stingray.png',      120, 88],
  ssc:           ['logos/ssc.png',           120, 88],
  matrox:        ['logos/matrox.png',        120, 88],
  addatech:      ['logos/addatech.png',      120, 88],

  digiclipse:    ['projects/digiclipse_main.jpg',      520, 76],
  digiclipse2:   ['projects/digiclipse_showcase.png',  520, 76],
  arcade:        ['projects/arcade_thumbnail.png',     560, 76],
  aspire:        ['projects/aspire.jpg',               560, 76],
  database:      ['projects/database.jpg',             560, 76],
  translator:    ['projects/voice_translator.jpg',     560, 76],
  sscMain:       ['projects/ssc_main.png',             520, 76],
  sscSettings:   ['projects/ssc_settings.png',         520, 76],
  sga:           ['projects/sga.png',                  560, 76],
  portfolio:     ['projects/portfolio.png',            560, 76],
};

const out = {};
let originalTotal = 0;
let encodedTotal = 0;

for (const [key, [rel, width, quality]] of Object.entries(MANIFEST)) {
  const src = join(IMG, rel);
  const raw = await readFile(src);
  originalTotal += raw.length;

  const buf = await sharp(raw)
    .rotate()                                   // honour EXIF orientation
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();

  encodedTotal += buf.length;
  out[key] = 'data:image/webp;base64,' + buf.toString('base64');
  console.log(
    `${key.padEnd(13)} ${(raw.length / 1024).toFixed(0).padStart(6)} KB  ->  ` +
    `${(buf.length / 1024).toFixed(0).padStart(5)} KB`
  );
}

await writeFile(join(HERE, '_assets.json'), JSON.stringify(out));

console.log(
  `\ntotal ${(originalTotal / 1024 / 1024).toFixed(1)} MB -> ` +
  `${(encodedTotal / 1024).toFixed(0)} KB ` +
  `(${(100 - (encodedTotal / originalTotal) * 100).toFixed(1)}% smaller)`
);
