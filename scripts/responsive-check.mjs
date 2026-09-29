/* global document, getComputedStyle -- used inside page.evaluate(), which runs in the browser */
/**
 * Responsive check: every docs page and prototype at 375 / 768 / 1024 / 1440 px must not
 * scroll sideways (WCAG 1.4.10 Reflow). Run after `npm run build`:
 *   node scripts/responsive-check.mjs
 * Serves site/ itself; exits 1 and lists offenders when something overflows.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const widths = [375, 768, 1024, 1440];
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  let path = join('site', decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
  if (!existsSync(path)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' }).end(readFileSync(path));
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const index = JSON.parse(readFileSync('site/index.json', 'utf8')).entries;
const pages = [
  ...Object.values(index)
    .filter((e) => e.type === 'docs')
    .map((e) => ({ name: e.id, url: `${base}/iframe.html?id=${e.id}&viewMode=docs` })),
  { name: 'prototype admin', url: `${base}/prototypes/#/admin` },
  { name: 'prototype admin/orders', url: `${base}/prototypes/#/admin/orders` },
  { name: 'prototype admin/team', url: `${base}/prototypes/#/admin/team` },
  { name: 'prototype settings', url: `${base}/prototypes/#/settings` },
  { name: 'prototype demo', url: `${base}/prototypes/#/demo` },
];

const browser = await chromium.launch();
const problems = [];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const p of pages) {
    await page.goto(p.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      if (doc.scrollWidth <= doc.clientWidth + 1) return null;
      // The widest element that sticks out, to point at the cause.
      let worst = null;
      const clipped = (el) => {
        for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
          if (getComputedStyle(a).overflowX !== 'visible') return true;
        }
        return false;
      };
      for (const el of document.body.querySelectorAll('*')) {
        if (clipped(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.right > doc.clientWidth + 1 && (!worst || r.right > worst.right)) {
          worst = { right: Math.round(r.right), tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 80) };
        }
      }
      return { scrollWidth: doc.scrollWidth, worst };
    });
    if (overflow) problems.push({ width, page: p.name, ...overflow });
  }
  await page.close();
}
await browser.close();
server.close();

if (problems.length) {
  for (const p of problems) console.log(`${p.width}px  ${p.page}  scrollWidth ${p.scrollWidth}  ← ${p.worst?.tag}.${p.worst?.cls}`);
  console.log(`\n${problems.length} overflow(s) in ${pages.length} pages × ${widths.length} widths.`);
  process.exitCode = 1;
} else {
  console.log(`✓ No horizontal scroll: ${pages.length} pages × ${widths.length} widths.`);
}
