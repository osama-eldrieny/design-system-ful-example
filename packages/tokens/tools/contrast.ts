/**
 * WCAG contrast checks for token pairs (text on background) in every brand × mode.
 */
import type { Theme } from '../src/theme.ts';
import { themeOptions } from '../src/theme.ts';
import { resolveTheme, type TokenSet } from './core.ts';

export interface Pair {
  fg: string;
  bg: string;
  /** Text needs 4.5:1 (WCAG 1.4.3); icons and focus rings need 3:1 (WCAG 1.4.11). */
  kind: 'text' | 'ui';
}

export interface PairResult extends Pair {
  theme: string;
  fgValue: string;
  bgValue: string;
  ratio: number;
  required: number;
  pass: boolean;
}

const TONES = ['primary', 'secondary', 'success', 'danger', 'warning'];
const STATES = ['default', 'hover', 'focus'];

const luminance = (hex: string): number => {
  let h = hex.replace('#', '');
  if (h.length === 3 || h.length === 4) h = [...h.slice(0, 3)].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrastRatio = (a: string, b: string): number => {
  const [la, lb] = [luminance(a), luminance(b)];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

const isHex = (v: string) => /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v);

/** The text/background pairs the system promises to keep readable. */
export function contrastPairs(set: TokenSet): Pair[] {
  const has = new Set(set.names);
  const pairs: Pair[] = [];
  const add = (fg: string, bg: string, kind: Pair['kind'] = 'text') => {
    if (has.has(fg) && has.has(bg)) pairs.push({ fg, bg, kind });
  };

  for (const tone of TONES) {
    for (const state of STATES) {
      add(`--color-fg-on-accent-${tone}-${state}`, `--color-bg-accent-${tone}-${state}`);
      // Tone text (text buttons, links) sits on surfaces and directly on the page background.
      add(`--color-fg-on-accent-${tone}-text-${state}`, '--color-bg-surface');
      add(`--color-fg-on-accent-${tone}-text-${state}`, '--color-bg-default');
    }
    for (const level of ['high', 'medium', 'low']) {
      add(`--color-fg-on-${tone}-${level}`, `--color-bg-${tone}-1`);
    }
    // Strong borders mark component boundaries (e.g. a field's outline): 3:1 (WCAG 1.4.11).
    // Medium and subtle borders are decorative dividers and are exempt.
    add(`--color-border-${tone}-strong`, '--color-bg-surface', 'ui');
    add(`--color-border-${tone}-strong`, '--color-bg-default', 'ui');
  }
  for (const bg of ['--color-bg-surface', '--color-bg-default']) {
    add('--color-fg-on-surface-primary', bg);
    add('--color-fg-on-surface-secondary', bg);
    add('--focus-ring-color', bg, 'ui');
    // Field outlines show where to type: 3:1 (WCAG 1.4.11).
    add('--color-border-field', bg, 'ui');
  }

  // Component tokens: a text/icon color and the nearest background sharing its prefix, e.g.
  // --meeting-card-primary-title-text-color → --meeting-card-primary-bg-color.
  for (const name of set.names) {
    const m = name.match(/^(--.+)-(text|font|icon)-color$/);
    if (!m || name.startsWith('--color-')) continue;
    if (NOT_ON_COMPONENT_BG.some((re) => re.test(name))) continue;
    const kind = m[2] === 'icon' ? 'ui' : 'text';
    const segments = m[1].split('-');
    for (let end = segments.length; end >= 3; end--) {
      const prefix = segments.slice(0, end).join('-');
      const bg = [`${prefix}-bg-color`, `${prefix}-bgcolor`].find((b) => has.has(b));
      if (bg) {
        add(name, bg, kind);
        break;
      }
    }
  }
  return pairs;
}

/**
 * Text colors that don't sit on their component's background, so the nearest-prefix match
 * would pair them wrongly. Their semantic colors are checked against the page instead.
 */
const NOT_ON_COMPONENT_BG = [
  // Only enclosed tabs paint --tabs-bg-color; line and pill tabs sit on the page.
  /^--tabs-(line|pill)-/,
];

/** Checks every pair in every brand × mode (other axes at their defaults). */
export function checkContrast(set: TokenSet): PairResult[] {
  const pairs = contrastPairs(set);
  const results: PairResult[] = [];
  for (const brand of themeOptions.brand) {
    for (const mode of themeOptions.mode) {
      const theme: Partial<Theme> = { brand, mode };
      const resolved = resolveTheme(set, theme);
      for (const pair of pairs) {
        const fgValue = resolved.get(pair.fg)?.resolved ?? '';
        const bgValue = resolved.get(pair.bg)?.resolved ?? '';
        if (!isHex(fgValue) || !isHex(bgValue)) continue;
        const ratio = contrastRatio(fgValue, bgValue);
        const required = pair.kind === 'text' ? 4.5 : 3;
        results.push({
          ...pair,
          theme: `${brand}-${mode}`,
          fgValue,
          bgValue,
          ratio,
          required,
          pass: ratio >= required,
        });
      }
    }
  }
  return results;
}

export const resultKey = (r: Pick<PairResult, 'fg' | 'bg' | 'theme'>) =>
  `${r.theme} ${r.fg} on ${r.bg}`;
