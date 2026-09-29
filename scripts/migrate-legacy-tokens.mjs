// One-time migration: converts the Figma variable exports in legacy/demo/css/variables-*.css
// (flat, camelCase, resolved values) into the tiered, themeable CSS token source in
// packages/tokens/src. After the migration the CSS files are the source of truth and are
// edited by hand; this script is kept for provenance only.
//
// Tiers produced:
//   primitives.css        raw values (brand palettes, space/radius/shadow scales, fonts)
//   themes/*.css          semantic tokens per theme mode, as var() references to primitives
//   components/*.css      component tokens, as var() references to semantic tokens
//
// Status: done (2026-09-29). packages/tokens/src is now edited by hand; this script will not
// overwrite it without --force.
//
// Usage: node scripts/migrate-legacy-tokens.mjs [--check]
//   --check  only verify that the generated CSS reproduces every legacy value.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const legacyDir = join(root, 'legacy/demo/css');
const outDir = join(root, 'packages/tokens/src');
const checkOnly = process.argv.includes('--check');

// ---------------------------------------------------------------------------
// Helpers

const parse = (name) => {
  const text = readFileSync(join(legacyDir, `variables-${name}.css`), 'utf8');
  const map = new Map();
  for (const [, key, value] of text.matchAll(/^\s*--([A-Za-z0-9]+)\s*:\s*(.+?);\s*$/gm)) {
    // The export writes negative scale steps without their sign in the name
    // (--space4: 4 and --space4: -4), so the second one silently overrides the first.
    if (map.has(key) && map.get(key) !== value && value.startsWith('-')) {
      map.set(key.replace(/(\d+)$/, 'Negative$1'), value);
    } else map.set(key, value);
  }
  return map;
};

const kebab = (name, splitDigits) => {
  let s = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  if (splitDigits) s = s.replace(/([a-z])(\d)/g, '$1-$2');
  return s;
};

// Comparable form of a value: no quotes, lowercase, "16px" and "16" treated alike.
const norm = (v) => {
  const s = String(v).trim().replace(/['"]/g, '').toLowerCase();
  const n = s.match(/^(-?\d*\.?\d+)(px)?$/);
  return n ? String(Number(n[1])) : s;
};

const px = (v) => (/^-?\d*\.?\d+$/.test(v) ? (Number(v) === 0 ? '0' : `${v}px`) : v);
const quote = (v) => `'${v.replace(/['"]/g, '').trim()}'`;
const quoteFont = quote;

const isRamp = (name) => /-(\d{3,4}|1)$/.test(name);
const words = (name) => new Set(name.replace(/^--/, '').split('-'));
const overlap = (a, b) => [...words(a)].filter((w) => words(b).has(w)).length;

// Picks the best alias among candidate token names for a component token.
const rank = (tokenName, candidates) => {
  const prop = tokenName;
  const kindBonus = (c) =>
    (/bg-color$/.test(prop) && c.startsWith('--color-bg-')) ||
    (/(text|font|icon)-color$|-color$/.test(prop) &&
      !/bg-color$|border-color$/.test(prop) &&
      c.startsWith('--color-fg-')) ||
    (/border-color$/.test(prop) && c.startsWith('--color-border-')) ||
    (/shadow-color$/.test(prop) && c.startsWith('--color-shadow'))
      ? 10
      : 0;
  return [...candidates].sort(
    (a, b) =>
      kindBonus(b) - kindBonus(a) ||
      Number(isRamp(a)) - Number(isRamp(b)) ||
      overlap(prop, b) - overlap(prop, a) ||
      a.length - b.length ||
      a.localeCompare(b),
  )[0];
};

// Alias a raw value to the primitive with the same value; prefer names sharing words with `hint`.
const aliasPrimitive = (value, prims, hint = '') => {
  const matches = [...prims].filter(([, v]) => norm(v) === norm(value)).map(([k]) => k);
  if (!matches.length) return null;
  return matches.sort(
    (a, b) =>
      overlap(hint, b) - overlap(hint, a) ||
      Number(a.match(/-(\d+)$/)?.[1] ?? 1e9) - Number(b.match(/-(\d+)$/)?.[1] ?? 1e9) ||
      a.localeCompare(b),
  )[0];
};

// Component token groups → file names.
const COMPONENT_PREFIXES = [
  ['app-notifications', 'apps-notifications'],
  ['section-apps', 'apps-notifications'],
  ['section-meetings', 'meeting-card'],
  ['meeting-card', 'meeting-card'],
  ['meeting1', 'meeting-card'],
  ['meeting2', 'meeting-card'],
  ['meeting3', 'meeting-card'],
  ['choose-card', 'choose-card'],
  ['input-field', 'input-field'],
  ['menu-dropdown', 'dropdown'],
  ['menu', 'dropdown'],
  ['tap', 'tabs'],
  ['radio', 'radio-button'],
  ['alerts', 'alert'],
  ['avatar', 'avatar'],
  ['button', 'button'],
  ['card', 'card'],
  ['header', 'header'],
  ['footer', 'footer'],
  ['logo', 'logo'],
  ['pagination', 'pagination'],
  ['palettes', 'palettes'],
  ['toggle', 'toggle'],
  ['page', 'layout'],
  ['container', 'layout'],
  ['section', 'layout'],
];
const componentOf = (cssName) => {
  const n = cssName.replace(/^--/, '');
  const hit = COMPONENT_PREFIXES.find(([p]) => n === p || n.startsWith(`${p}-`));
  return hit ? hit[1] : 'misc';
};

// Legacy names that change on the way in.
const RENAME = { 'choose-card-border-widrh': 'choose-card-border-width' };
const componentName = (key) => {
  const n = kebab(key, false);
  return `--${RENAME[n] ?? n}`;
};

// ---------------------------------------------------------------------------
// Output model

const primitives = []; // [section, [[name, value]]]
const themes = {}; // file -> [{ selector, comment, decls: [[name, value]] }]
const components = {}; // file -> [[name, value, comment?]]
const report = { unaliased: [], perMode: [] };

const addComponent = (name, value) => {
  const file = componentOf(name);
  (components[file] ??= []).push([name, value]);
};

// Generic single-axis migration (density, radius, shadow).
const migrateAxis = ({
  axis,
  modes,
  defaultMode,
  primRe,
  primName,
  semRe,
  semName,
  primValue = px,
}) => {
  const files = Object.fromEntries(modes.map((m) => [m, parse(`${axis}-${m}`)]));
  const first = files[defaultMode];
  const prims = new Map();
  const semByMode = Object.fromEntries(modes.map((m) => [m, new Map()]));
  const semRaw = Object.fromEntries(modes.map((m) => [m, new Map()]));
  const compKeys = [];

  for (const key of first.keys()) {
    if (primRe.test(key)) {
      const values = new Set(modes.map((m) => files[m].get(key)));
      if (values.size !== 1) throw new Error(`${axis}: primitive ${key} varies by mode`);
      prims.set(primName(key), primValue(first.get(key)));
    } else if (semRe.test(key)) {
      for (const m of modes) {
        const raw = files[m].get(key);
        const name = semName(key);
        semRaw[m].set(name, raw);
        const alias = aliasPrimitive(raw, prims, name);
        semByMode[m].set(name, alias ? `var(${alias})` : primValue(raw));
        if (!alias) report.unaliased.push(`${axis}/${m}: ${name} = ${raw}`);
      }
    } else compKeys.push(key);
  }

  primitives.push([axis, [...prims]]);
  const overrides = Object.fromEntries(modes.map((m) => [m, []]));

  for (const key of compKeys) {
    const name = componentName(key);
    const vals = Object.fromEntries(modes.map((m) => [m, files[m].get(key)]));
    const sems = [...semRaw[defaultMode].keys()].filter((s) =>
      modes.every((m) => norm(semRaw[m].get(s)) === norm(vals[m])),
    );
    if (sems.length) {
      addComponent(name, `var(${rank(name, sems)})`);
      continue;
    }
    const constant = new Set(modes.map((m) => norm(vals[m]))).size === 1;
    if (constant) {
      const alias = aliasPrimitive(vals[defaultMode], prims, name);
      addComponent(name, alias ? `var(${alias})` : vals[defaultMode]);
      if (!alias) report.unaliased.push(`${axis}: ${name} = ${vals[defaultMode]}`);
      continue;
    }
    report.perMode.push(`${axis}: ${name}`);
    for (const m of modes) {
      const alias = aliasPrimitive(vals[m], prims, name);
      overrides[m].push([name, alias ? `var(${alias})` : vals[m]]);
    }
  }

  // Default block first: it also matches :root, and ties on specificity go to the later block.
  themes[axis] = [defaultMode, ...modes.filter((m) => m !== defaultMode)].map((m) => ({
    selector: m === defaultMode ? `:root,\n[data-${axis}='${m}']` : `[data-${axis}='${m}']`,
    comment: `${axis}: ${m}${m === defaultMode ? ' (default)' : ''}`,
    decls: [...semByMode[m], ...overrides[m]],
  }));
};

// ---------------------------------------------------------------------------
// Color: brand × mode

const BRANDS = ['diamond', 'amber', 'opal'];
const MODES = ['light', 'dark'];
{
  const files = {};
  for (const b of BRANDS) for (const m of MODES) files[`${b}-${m}`] = parse(`${b}-${m}`);
  const combos = Object.keys(files);
  const base = files['diamond-light'];

  // Primitives: {brand}Color{Family}{step}, identical in every file.
  const prims = new Map();
  for (const b of BRANDS) {
    const brandPrims = [];
    for (const [key, value] of base) {
      if (!key.startsWith(`${b}Color`)) continue;
      if (new Set(combos.map((c) => files[c].get(key))).size !== 1)
        throw new Error(`color primitive ${key} varies`);
      const name = `--color-${b}-${kebab(key.slice(b.length + 'Color'.length), true)}`;
      prims.set(name, value.toLowerCase());
      brandPrims.push([name, value.toLowerCase()]);
    }
    primitives.push([`color: ${b}`, brandPrims]);
  }

  // Semantic: {brand}(Bg|Fg|Border|Shadow|Image)…, brand-agnostic names, per brand × mode.
  const semRe = (b) => new RegExp(`^${b}(Bg|Fg|Border|Shadow|Image)`);
  const semRaw = {};
  const semOut = {};
  for (const b of BRANDS) {
    const brandPrims = new Map([...prims].filter(([k]) => k.startsWith(`--color-${b}-`)));
    for (const m of MODES) {
      const c = `${b}-${m}`;
      semRaw[c] = new Map();
      semOut[c] = [];
      for (const [key, raw] of files[c]) {
        if (!semRe(b).test(key)) continue;
        const rest = kebab(key.slice(b.length), true);
        const isImage = /^url\(/.test(raw);
        const name = isImage ? `--${rest.replace(/^bg-/, '')}` : `--color-${rest}`;
        semRaw[c].set(name, raw);
        const alias = isImage ? null : aliasPrimitive(raw, brandPrims, name);
        const value = alias
          ? `var(${alias})`
          : isImage
            ? raw.replace('../imgs/', './images/')
            : raw.toLowerCase();
        if (!alias && !isImage) report.unaliased.push(`color/${c}: ${name} = ${raw}`);
        semOut[c].push([name, value]);
      }
    }
  }

  // Component tokens: alias to one semantic token valid in all six brand × mode combinations.
  const overrides = Object.fromEntries(combos.map((c) => [c, []]));
  for (const key of base.keys()) {
    if (BRANDS.some((b) => key.startsWith(b))) continue;
    const name = componentName(key);
    const vals = Object.fromEntries(combos.map((c) => [c, files[c].get(key)]));
    const sems = [...semRaw['diamond-light'].keys()].filter((s) =>
      combos.every((c) => norm(semRaw[c].get(s)) === norm(vals[c])),
    );
    if (sems.length) {
      addComponent(name, `var(${rank(name, sems)})`);
      continue;
    }
    if (new Set(combos.map((c) => norm(vals[c]))).size === 1) {
      addComponent(name, vals['diamond-light']);
      continue;
    }
    report.perMode.push(`color: ${name}`);
    for (const c of combos) {
      const b = c.split('-')[0];
      const brandPrims = new Map([...prims].filter(([k]) => k.startsWith(`--color-${b}-`)));
      const alias = /^#/.test(vals[c]) ? aliasPrimitive(vals[c], brandPrims, name) : null;
      overrides[c].push([name, alias ? `var(${alias})` : vals[c]]);
    }
  }

  themes.color = combos.map((c) => {
    const [b, m] = c.split('-');
    const sel = `[data-brand='${b}'][data-mode='${m}']`;
    return {
      selector: c === 'diamond-light' ? `:root,\n${sel}` : sel,
      comment: `Brand ${b}, ${m} mode${c === 'diamond-light' ? ' (default)' : ''}`,
      decls: [...semOut[c], ...overrides[c]],
    };
  });
}

// ---------------------------------------------------------------------------
// Global: borders, sizes, opacity (no modes)
{
  const g = parse('global');
  const prims = new Map();
  const sems = new Map();
  const PRIM = [
    [/^borderWidth(\d+)$/, (n) => `--border-width-${n}`, px],
    [/^size(\d+)$/, (n) => `--size-${n}`, px],
    [/^opacity(\d+)$/, (n) => `--opacity-${n}`, (v) => String(Number(v) / 100)],
  ];
  const SEM = [
    [/^borderWidth(None|Hairline|Regular|Strong)$/, (n) => `--border-width-${kebab(n, true)}`, px],
    [/^sizing(\w+)$/, (n) => `--sizing-${kebab(n, true)}`, px],
    [/^transparency(\w+)$/, (n) => `--opacity-${kebab(n, true)}`, (v) => String(Number(v) / 100)],
  ];
  const comps = [];
  for (const [key, raw] of g) {
    const p = PRIM.find(([re]) => re.test(key));
    const s = SEM.find(([re]) => re.test(key));
    if (p) prims.set(p[1](key.match(p[0])[1]), p[2](raw));
    else if (s) sems.set(s[1](key.match(s[0])[1]), s[2](raw));
    else comps.push([key, raw]);
  }
  primitives.push(['borders, sizes, opacity', [...prims]]);
  const semDecls = [...sems].map(([name, value]) => {
    const alias = aliasPrimitive(value, prims, name);
    return [name, alias ? `var(${alias})` : value];
  });
  primitives.push(['borders, sizes, opacity: named scale', semDecls]);
  const all = new Map([...sems, ...prims]);
  for (const [key, raw] of comps) {
    const name = componentName(key);
    const value = /opacity$/i.test(key) ? raw : raw;
    const semHit = [...sems].filter(([, v]) => norm(v) === norm(value)).map(([k]) => k);
    const alias = semHit.length ? rank(name, semHit) : aliasPrimitive(value, all, name);
    addComponent(name, alias ? `var(${alias})` : value);
    if (!alias) report.unaliased.push(`global: ${name} = ${value}`);
  }
}

// ---------------------------------------------------------------------------
// Density, radius, shadow

migrateAxis({
  axis: 'density',
  modes: ['comfortable', 'compact'],
  defaultMode: 'comfortable',
  primRe: /^space(Negative)?\d+$/,
  primName: (k) => `--space-${kebab(k.slice(5), true)}`,
  semRe: /^spacing\w+$/,
  semName: (k) => `--spacing-${kebab(k.slice(7), true)}`,
});
migrateAxis({
  axis: 'radius',
  modes: ['square', 'round', 'pills'],
  defaultMode: 'round',
  primRe: /^borderRadius\d+$/,
  primName: (k) => `--radius-${k.slice(12)}`,
  semRe: /^borderRadius(None|2xs|Xs|Sm|Md|Lg|Xl|2xl|3xl|4xl|Full)$/,
  semName: (k) => `--radius-${kebab(k.slice(12), true)}`,
});
migrateAxis({
  axis: 'shadow',
  modes: ['flat', 'subtle', 'default', 'raised'],
  defaultMode: 'flat',
  primRe: /^shadow\d+$/,
  primName: (k) => `--shadow-${k.slice(6)}`,
  semRe: /^shadow(None|2xs|Xs|Sm|Md|Lg|Xl|2xl)$/,
  semName: (k) => `--shadow-${kebab(k.slice(6), true)}`,
});

// ---------------------------------------------------------------------------
// Typography: language × typeface

const LANGS = { english: 'en', arabic: 'ar' };
const FACES = { serif: 'serif', sansserif: 'sans' };
{
  const combos = [];
  const files = {};
  for (const l of Object.keys(LANGS))
    for (const t of Object.keys(FACES)) {
      files[`${l}-${t}`] = parse(`${l}-${t}`);
      combos.push(`${l}-${t}`);
    }
  const base = files['english-sansserif'];
  const prims = new Map();
  const PRIM = [
    [/^fontSize(\w+)$/, (n) => `--font-size-${kebab(n, true)}`, px],
    [/^fontLineHeight(\w+)$/, (n) => `--font-line-height-${kebab(n, true)}`, px],
    [/^fontWeight(\w+)$/, (n) => `--font-weight-${kebab(n, true)}`, (v) => v],
    [
      /^(english|arabic)Font(Serif|SansSerif)$/,
      (l, f) => `--font-family-${LANGS[l]}-${f === 'Serif' ? 'serif' : 'sans'}`,
      quoteFont,
    ],
  ];
  const isSem = (key) =>
    /^(english|arabic)((Action|Headings|Body)FontFamily|BorderWidth(Left|Right))$/.test(key);
  const semName = (key) => {
    const m = key.match(/^(english|arabic)(.*)$/);
    return m[2].endsWith('FontFamily')
      ? `--font-family-${kebab(m[2].replace('FontFamily', ''), true)}`
      : `--direction-${kebab(m[2], true)}`;
  };
  const typePrims = [];
  for (const [key, raw] of base) {
    const p = PRIM.find(([re]) => re.test(key));
    if (!p) continue;
    if (new Set(combos.map((c) => files[c].get(key))).size !== 1)
      throw new Error(`typography primitive ${key} varies`);
    const m = key.match(p[0]);
    const name = p[1](m[1], m[2]);
    prims.set(name, p[2](raw));
    typePrims.push([name, p[2](raw)]);
  }
  primitives.push(['typography', typePrims]);
  const borderPrims = new Map(primitives.find(([s]) => s === 'borders, sizes, opacity')[1]);
  const lookup = new Map([...prims, ...borderPrims]);

  const semRaw = {};
  const semOut = {};
  const overrides = {};
  for (const c of combos) {
    const lang = c.split('-')[0];
    semRaw[c] = new Map();
    semOut[c] = [];
    overrides[c] = [];
    for (const [key, raw] of files[c]) {
      if (!isSem(key) || !key.startsWith(lang)) continue;
      const name = semName(key);
      semRaw[c].set(name, raw);
      const alias = aliasPrimitive(raw, lookup, name);
      semOut[c].push([name, alias ? `var(${alias})` : raw]);
      if (!alias) report.unaliased.push(`typography/${c}: ${name} = ${raw}`);
    }
  }
  for (const key of base.keys()) {
    if (PRIM.some(([re]) => re.test(key)) || isSem(key) || /^languageBorderWidth\d+$/.test(key))
      continue;
    const name = componentName(key);
    const vals = Object.fromEntries(combos.map((c) => [c, files[c].get(key)]));
    const sems = [...semRaw['english-sansserif'].keys()].filter((s) =>
      combos.every((c) => norm(semRaw[c].get(s)) === norm(vals[c])),
    );
    if (sems.length) {
      addComponent(name, `var(${rank(name, sems)})`);
      continue;
    }
    if (new Set(combos.map((c) => norm(vals[c]))).size === 1) {
      const alias = aliasPrimitive(vals['english-sansserif'], lookup, name);
      addComponent(name, alias ? `var(${alias})` : vals['english-sansserif']);
      continue;
    }
    report.perMode.push(`typography: ${name}`);
    for (const c of combos) {
      const alias = /content$|direction$/.test(name) ? null : aliasPrimitive(vals[c], lookup, name);
      // Text for the CSS `content` property must be a quoted string.
      const raw = /content$/.test(name) ? quote(vals[c]) : vals[c];
      overrides[c].push([name, alias ? `var(${alias})` : raw]);
    }
  }
  themes.typography = combos.map((c) => {
    const [l, t] = c.split('-');
    const sel = `[data-language='${LANGS[l]}'][data-typeface='${FACES[t]}']`;
    return {
      selector: c === 'english-sansserif' ? `:root,\n${sel}` : sel,
      comment: `${l[0].toUpperCase() + l.slice(1)}, ${t === 'serif' ? 'serif' : 'sans-serif'}${c === 'english-sansserif' ? ' (default)' : ''}`,
      decls: [...semOut[c], ...overrides[c]],
    };
  });
}

// ---------------------------------------------------------------------------
// Tokens the library uses that the Figma export never had (hand-added to the old
// react-app tokens.css, or referenced but undefined).
const EXTRA = [
  ['--alerts-border-style', 'solid'],
  ['--alerts-warning-border-style', 'dashed'],
  ['--menu-item-active-bg-color', 'var(--color-bg-primary-200)'],
  ['--menu-item-active-font-color', 'var(--color-fg-on-surface-primary)'],
  ['--menu-item-active-icon-color', 'var(--color-fg-on-surface-primary)'],
  ['--radio-default-font-color', 'var(--color-fg-on-surface-primary)'],
  ['--menu-dropdown-gap', 'var(--spacing-2xs)'],
];
for (const [name, value] of EXTRA) addComponent(name, value);

// ---------------------------------------------------------------------------
// Write files

const header = (title, body) =>
  `/**\n * ${title}\n *\n${body
    .split('\n')
    .map((l) => ` * ${l}`.trimEnd())
    .join('\n')}\n */\n`;

const block = (selector, decls, comment) =>
  `${comment ? `/* ${comment} */\n` : ''}${selector} {\n${decls.map(([n, v]) => `  ${n}: ${v};`).join('\n')}\n}\n`;

const files = {};
files['primitives.css'] =
  header(
    'Primitives',
    'Raw values: brand palettes, scales and font families.\nNever use these in components. Components use component tokens, which point at\nsemantic tokens (themes/), which point here.',
  ) +
  '\n' +
  block(
    ':root',
    primitives.flatMap(([section, decls]) => [[`/* ${section} */`, null], ...decls]),
    null,
  ).replace(/ {2}(\/\* .* \*\/): null;/g, '\n  $1');

const THEME_DOCS = {
  color:
    'Semantic colors per brand × mode. Set data-brand (diamond | amber | opal) and\ndata-mode (light | dark) on a theme scope.',
  typography:
    'Font families and text direction per language × typeface. Set data-language\n(en | ar) and data-typeface (serif | sans) on a theme scope.',
  density: 'Spacing scale per density. Set data-density (comfortable | compact).',
  radius: 'Corner radius scale per radius style. Set data-radius (square | round | pills).',
  shadow: 'Shadow scale per elevation style. Set data-shadow (flat | subtle | default | raised).',
};
for (const [axis, blocks] of Object.entries(themes)) {
  files[`themes/${axis}.css`] =
    header(`Theme: ${axis}`, THEME_DOCS[axis]) +
    '\n' +
    blocks.map((b) => block(b.selector, b.decls, b.comment)).join('\n');
}
for (const [file, decls] of Object.entries(components).sort()) {
  files[`components/${file}.css`] =
    header(`Component tokens: ${file}`, 'Style this component only with these tokens.') +
    '\n' +
    block(':root,\n[data-theme]', decls, null);
}
files['tokens.css'] =
  header(
    'Design tokens',
    'Import this one file. Themes switch with data attributes on <html> (or any element\nwith data-theme, which must also carry all theme attributes):\n  data-brand, data-mode, data-language, data-typeface, data-density, data-radius, data-shadow',
  ) +
  "\n@import url('./primitives.css');\n" +
  Object.keys(components)
    .sort()
    .map((f) => `@import url('./components/${f}.css');\n`)
    .join('') +
  Object.keys(themes)
    .map((a) => `@import url('./themes/${a}.css');\n`)
    .join('');

// ---------------------------------------------------------------------------
// Parity check: resolve every legacy token under each theme and compare.

const decls = [];
{
  let order = 0;
  const all = [
    ['primitives.css', files['primitives.css']],
    ...Object.keys(components)
      .sort()
      .map((f) => [`components/${f}.css`, files[`components/${f}.css`]]),
    ...Object.keys(themes).map((a) => [`themes/${a}.css`, files[`themes/${a}.css`]]),
  ];
  for (const [, css] of all) {
    for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      const selectors = m[1].split(',').map((s) => s.trim());
      for (const d of m[2].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g))
        decls.push({ selectors, name: d[1], value: d[2].trim(), order: order++ });
    }
  }
}
const matches = (sel, attrs) => {
  if (sel === ':root') return [true, 1];
  const parts = [...sel.matchAll(/\[([a-z-]+)(?:='([^']*)')?\]/g)];
  if (!parts.length) return [false, 0];
  return [parts.every(([, a, v]) => (v === undefined ? a in attrs : attrs[a] === v)), parts.length];
};
const resolveAll = (attrs) => {
  const winner = new Map();
  for (const d of decls) {
    const spec = Math.max(
      ...d.selectors.map((s) => (matches(s, attrs)[0] ? matches(s, attrs)[1] : -1)),
    );
    if (spec < 0) continue;
    const cur = winner.get(d.name);
    if (!cur || spec > cur.spec || (spec === cur.spec && d.order > cur.order))
      winner.set(d.name, { ...d, spec });
  }
  const resolve = (name, depth = 0) => {
    if (depth > 20) throw new Error(`cycle at ${name}`);
    const v = winner.get(name)?.value;
    if (v === undefined) return undefined;
    return v.replace(/var\((--[a-z0-9-]+)\)/g, (_, n) => resolve(n, depth + 1) ?? `MISSING(${n})`);
  };
  return resolve;
};
const DEFAULTS = {
  'data-theme': '',
  'data-brand': 'diamond',
  'data-mode': 'light',
  'data-language': 'en',
  'data-typeface': 'sans',
  'data-density': 'comfortable',
  'data-radius': 'round',
  'data-shadow': 'flat',
};
const failures = [];
const checkFile = (legacyName, attrs) => {
  const resolve = resolveAll({ ...DEFAULTS, ...attrs });
  for (const [key, expected] of parse(legacyName)) {
    if (
      /^(diamond|amber|opal)/.test(key) ||
      /^(space|spacing|borderRadius|shadow|borderWidth|size|sizing|opacity|transparency|fontSize|fontLineHeight|fontWeight|languageBorderWidth)[A-Z0-9]/.test(
        key,
      ) ||
      /^(english|arabic)/.test(key)
    )
      continue;
    const name = componentName(key);
    const got = resolve(name);
    const exp = expected.replace('../imgs/', './images/');
    if (got === undefined || norm(got) !== norm(exp))
      failures.push(`${legacyName}: ${name} expected ${exp}, got ${got}`);
  }
};
for (const b of BRANDS)
  for (const m of MODES) checkFile(`${b}-${m}`, { 'data-brand': b, 'data-mode': m });
for (const [l, code] of Object.entries(LANGS))
  for (const [t, face] of Object.entries(FACES))
    checkFile(`${l}-${t}`, { 'data-language': code, 'data-typeface': face });
for (const m of ['comfortable', 'compact']) checkFile(`density-${m}`, { 'data-density': m });
for (const m of ['square', 'round', 'pills']) checkFile(`radius-${m}`, { 'data-radius': m });
for (const m of ['flat', 'subtle', 'default', 'raised'])
  checkFile(`shadow-${m}`, { 'data-shadow': m });
checkFile('global', {});

const componentCount = Object.values(components).reduce((n, d) => n + d.length, 0);
const aliased = Object.values(components)
  .flat()
  .filter(([, v]) => v.startsWith('var(')).length;
console.log(
  `Component tokens: ${componentCount} (${aliased} aliased to semantic/primitive tokens)`,
);
console.log(
  `Component tokens varying per theme without a semantic match: ${report.perMode.length}`,
);
console.log(`Unaliased raw values: ${report.unaliased.length}`);
console.log(`Parity failures: ${failures.length}`);
if (failures.length) console.log(failures.slice(0, 40).join('\n'));
if (process.env.REPORT) console.log(JSON.stringify(report, null, 2));

if (
  !checkOnly &&
  !failures.length &&
  existsSync(join(outDir, 'tokens.css')) &&
  !process.argv.includes('--force')
) {
  console.log(
    'packages/tokens/src already exists and is now edited by hand. Not overwriting (pass --force to override).',
  );
} else if (!checkOnly && !failures.length) {
  for (const [file, css] of Object.entries(files)) {
    mkdirSync(dirname(join(outDir, file)), { recursive: true });
    writeFileSync(join(outDir, file), css);
  }
  console.log(`Wrote ${Object.keys(files).length} files to packages/tokens/src`);
}
if (failures.length) process.exitCode = 1;
