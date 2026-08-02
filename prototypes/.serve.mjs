// Minimal read-only static server for viewing the prototypes.
//   node prototypes/.serve.mjs   ->  http://localhost:4321/01-pipeline.html
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
};

createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405); res.end('method not allowed'); return;
  }
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/') p = '/01-pipeline.html';

  // Resolve inside this folder only — never serve outside it.
  const file = join(ROOT, normalize(p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }

  try {
    const buf = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : buf);
  } catch {
    res.writeHead(404); res.end('not found');
  }
}).listen(4321, () => console.log('prototypes on http://localhost:4321'));
