// Writes one static HTML file per route, so GitHub Pages serves real pages (status 200, text in the HTML).
// Run after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssr = path.join(root, 'dist-ssr');
const SITE = 'https://fattahwg.github.io';

const { render, pages } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const escape = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function setMeta(html, page) {
  const url = `${SITE}${page.url === '/' ? '/' : page.url}`;
  const hidden = page.url === '/404' || page.url === '/lab/run';
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${escape(page.description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escape(page.title)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
  if (hidden) out = out.replace('<link rel="canonical"', '<meta name="robots" content="noindex" />\n    <link rel="canonical"');
  return out;
}

let count = 0;
for (const page of pages) {
  const body = render(page.url);
  const html = setMeta(template, page).replace('<!--app-->', body);
  for (const file of page.files) {
    const target = path.join(dist, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, html);
    count += 1;
  }
}
fs.rmSync(ssr, { recursive: true, force: true });
console.log(`prerendered ${pages.length} routes into ${count} files`);
