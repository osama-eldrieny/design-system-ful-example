#!/usr/bin/env node
/**
 * Guards the prototypes: their stylesheets may not draw surfaces (backgrounds, full borders,
 * radii, shadows) for UI. Such UI belongs in @ds/react, so it updates with the library. Layout
 * dividers (single-side borders) are allowed everywhere.
 *
 * Allowed by name: the prototype index chrome, the app shell (sidebar, top bar, rail), the
 * illustrations (maps, generated images, carousel art, sign-in art) and the showcase's own
 * page and theme-bar layout. The two exceptions below are listed on purpose; remove them when
 * the component exists.
 */
import { globSync, readFileSync } from 'node:fs';

const ALLOWED = [
  /^html$/,
  /^\.proto/, // prototype index chrome
  /^\.orbit$/,
  /^\.orbit__/, // app shell: sidebar, top bar, rail, drawer
  /^\.orbit-(map|gen|carousel__slide|auth)/, // illustrations
  /^\.sc$/, // showcase page background
  /^\.sc-bar/, // showcase theme bar layout
  /^\.sc-axis/,
  // Exceptions to resolve: the picker's trigger looks like a Select (its open list is a List);
  // the table edge-to-edge reset around a TableCard.
  /^\.sc-picker/,
  /^\.sc-flush/,
];
const SURFACE = /^(background|background-color|background-image|border|border-radius|box-shadow)$/;
const DIVIDER = /^border-(block|inline)-(start|end)$/;

const files = globSync('apps/prototypes/src/**/*.css');
const violations = [];

function checkRules(css, file) {
  const rule = /([^{}]+)\{((?:[^{}]|\{[^{}]*\})*)\}/g;
  let m;
  while ((m = rule.exec(css))) {
    const head = m[1].replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const body = m[2];
    if (head.startsWith('@media') || head.startsWith('@supports') || head.startsWith('@container')) {
      checkRules(body, file);
      continue;
    }
    if (head.startsWith('@')) continue;
    const props = [...body.matchAll(/(?:^|[;{\s])([a-z-]+)\s*:/g)].map((p) => p[1]);
    const surface = props.filter((p) => SURFACE.test(p) && !DIVIDER.test(p));
    if (surface.length === 0) continue;
    for (const selector of head.split(',').map((s) => s.trim()).filter(Boolean)) {
      if (ALLOWED.some((re) => re.test(selector))) continue;
      violations.push(`${file}: ${selector} sets ${[...new Set(surface)].join(', ')}`);
    }
  }
}

for (const file of files) checkRules(readFileSync(file, 'utf8'), file);

if (violations.length) {
  console.error('Prototype stylesheets draw UI surfaces. Move these into @ds/react:');
  for (const v of violations) console.error('  ' + v);
  process.exit(1);
}
console.log(`Prototype CSS: ${files.length} files, no hand-built UI surfaces.`);
