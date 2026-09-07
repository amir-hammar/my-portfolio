// Inlines dependencies into a prototype so it stays a single self-contained
// file (artifact CSP blocks every external host, CDNs included).
//
//   node prototypes/build.mjs 06-kinetic.html
//
// Two marker kinds, both idempotent (rebuild as often as you like):
//
//   <script>/*__GSAP:gsap,ScrollTrigger,SplitText__*/</script>
//     -> replaced by the named minified files from node_modules/gsap/dist
//
//   <script>/*__ENTRY:08-terminal.entry.js__*/</script>
//     -> the named file (which may `import 'three'` etc.) is bundled with
//        esbuild (iife, minified) and inlined
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const ROOT = dirname(HERE.replace(/[\\/]$/, ''));
const GSAP_DIST = join(ROOT, 'node_modules', 'gsap', 'dist');

const target = process.argv[2];
if (!target) {
  console.error('usage: node prototypes/build.mjs <file.html>');
  process.exit(1);
}

const path = join(HERE, target);
let html = await readFile(path, 'utf8');
let did = [];

// Guard used for every inline script body.
function assertInlinable(code, what) {
  if (/<\/script\s*>/i.test(code)) {
    console.error(`refusing to write: ${what} contains a literal closing script tag`);
    process.exit(1);
  }
}

/* ---------------- GSAP marker ---------------- */
{
  const MARKER  = /<script>\/\*__GSAP:([a-zA-Z,]+)__\*\/<\/script>/;
  const REBUILD = /<script>\/\*__GSAP_BUNDLE:([a-zA-Z,]+)__\*\/[\s\S]*?\/\*__GSAP_END__\*\/<\/script>/;
  const m = html.match(MARKER) || html.match(REBUILD);
  if (m) {
    const names = m[1].split(',');
    let bundle = '';
    for (const n of names) {
      bundle += `/* ${n} */\n` + await readFile(join(GSAP_DIST, `${n}.min.js`), 'utf8') + '\n';
    }
    assertInlinable(bundle, 'GSAP bundle');
    const rep = `<script>/*__GSAP_BUNDLE:${names.join(',')}__*/\n${bundle}/*__GSAP_END__*/</script>`;
    // CRITICAL: replacer *function* — minified code contains `$&`, which a
    // replacement string would interpret as "insert the matched text".
    html = html.replace(html.match(MARKER) ? MARKER : REBUILD, () => rep);
    did.push(`gsap[${names.join('+')}] +${(bundle.length / 1024).toFixed(0)}KB`);
  }
}

/* ---------------- asset marker ----------------
   Injects the downscaled real-site images (see gen-assets.mjs) as
   window.__ASSETS, so both the markup and the bundle can use them. */
{
  const MARKER  = /<script>\/\*__ASSETS__\*\/<\/script>/;
  const REBUILD = /<script>\/\*__ASSETS_BUNDLE__\*\/[\s\S]*?\/\*__ASSETS_END__\*\/<\/script>/;
  const m = html.match(MARKER) || html.match(REBUILD);
  if (m) {
    const json = await readFile(join(HERE, '_assets.json'), 'utf8');
    assertInlinable(json, 'asset manifest');
    const rep = `<script>/*__ASSETS_BUNDLE__*/window.__ASSETS=${json};/*__ASSETS_END__*/</script>`;
    html = html.replace(html.match(MARKER) ? MARKER : REBUILD, () => rep);
    did.push(`assets +${(json.length / 1024).toFixed(0)}KB`);
  }
}

/* ---------------- esbuild entry marker ---------------- */
{
  const MARKER  = /<script>\/\*__ENTRY:([\w.\-]+)__\*\/<\/script>/;
  const REBUILD = /<script>\/\*__ENTRY_BUNDLE:([\w.\-]+)__\*\/[\s\S]*?\/\*__ENTRY_END__\*\/<\/script>/;
  const m = html.match(MARKER) || html.match(REBUILD);
  if (m) {
    const entry = m[1];
    const out = execFileSync(
      process.platform === 'win32' ? 'npx.cmd' : 'npx',
      ['--yes', 'esbuild', join(HERE, entry), '--bundle', '--minify', '--format=iife',
       '--target=es2019', '--legal-comments=none'],
      { cwd: ROOT, maxBuffer: 1 << 26, encoding: 'utf8', shell: process.platform === 'win32' },
    );
    assertInlinable(out, `bundle of ${entry}`);
    const rep = `<script>/*__ENTRY_BUNDLE:${entry}__*/\n${out}/*__ENTRY_END__*/</script>`;
    html = html.replace(html.match(MARKER) ? MARKER : REBUILD, () => rep);
    did.push(`${entry} +${(out.length / 1024).toFixed(0)}KB`);
  }
}

if (!did.length) {
  console.log(`${target}: no markers found — nothing to do`);
  process.exit(0);
}

await writeFile(path, html);
console.log(`${target}: inlined ${did.join(', ')} -> ${(html.length / 1024).toFixed(0)} KB total`);
