// Serves dist like GitHub Pages: /lab → lab.html, /lab/ → lab/index.html, anything else → 404.html with status 404.
// Used by the Playwright and Bruno tests.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT ?? 4321);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json',
};

function find(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^[/\\]+/, '');
  const base = path.join(dist, clean);
  if (!base.startsWith(dist)) return null;
  const tries = urlPath.endsWith('/') ? [path.join(base, 'index.html')] : [base, `${base}.html`];
  return tries.find((file) => fs.existsSync(file) && fs.statSync(file).isFile()) ?? null;
}

http
  .createServer((req, res) => {
    const urlPath = new URL(req.url ?? '/', 'http://localhost').pathname;
    let file = find(urlPath);
    let status = 200;
    // GitHub Pages redirects a folder without a slash to the folder with a slash.
    if (!file && !urlPath.endsWith('/') && fs.existsSync(path.join(dist, urlPath, 'index.html'))) {
      res.writeHead(301, { Location: `${urlPath}/` });
      res.end();
      return;
    }
    if (!file) {
      file = path.join(dist, '404.html');
      status = 404;
    }
    res.writeHead(status, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, '127.0.0.1', () => console.log(`serving ${dist} on http://127.0.0.1:${port}`));
