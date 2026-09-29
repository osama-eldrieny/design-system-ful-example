/**
 * Reads the token CSS the way a browser would and resolves any token in any theme.
 * Shared by the token tests, the contrast report and the AI export.
 */
import { readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { themeAttributes, type Theme } from '../src/theme.ts';

export const srcDir = join(dirname(fileURLToPath(import.meta.url)), '../src');

export interface TokenDecl {
  name: string;
  value: string;
  selectors: string[];
  /** File path relative to packages/tokens/src. */
  file: string;
  order: number;
}

export interface TokenSet {
  decls: TokenDecl[];
  /** Every token name declared anywhere, in first-declared order. */
  names: string[];
  /** Description of a token from the file legends, if any. */
  describe(name: string): string | undefined;
}

export interface ResolvedToken {
  name: string;
  /** Declared value, e.g. `var(--color-bg-accent-primary-default)`. */
  value: string;
  /** Final value with every var() resolved, e.g. `#916dff`. */
  resolved: string;
  /** var() chain from this token to the raw value. */
  chain: string[];
  file: string;
}

/** Removes @media blocks: conditional rules don't apply to the default resolution. */
const stripConditional = (css: string): string => {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const at = css.indexOf('@media', i);
    if (at === -1) {
      out += css.slice(i);
      break;
    }
    out += css.slice(i, at);
    let depth = 0;
    let j = css.indexOf('{', at);
    for (; j < css.length; j++) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}' && --depth === 0) break;
    }
    i = j + 1;
  }
  return out;
};

type Legend = { test: (name: string) => boolean; description: string }[];

/** Parses `--name: description` lines (with {placeholder}, * and "--a … --b" ranges) from a file header. */
const parseLegend = (css: string, declaredInFile: string[]): Legend => {
  const header = css.match(/^\/\*\*([\s\S]*?)\*\//)?.[1] ?? '';
  const entries: Legend = [];
  for (const [, pattern, description] of header.matchAll(/^\s*\*\s+(--[^:]+?):\s+(.+)$/gm)) {
    const range = pattern.match(/^(--[a-z0-9-]+)\s+…\s+(--[a-z0-9-]+)$/);
    if (range) {
      const from = declaredInFile.indexOf(range[1]);
      const to = declaredInFile.indexOf(range[2]);
      const set = new Set(from >= 0 && to >= from ? declaredInFile.slice(from, to + 1) : []);
      entries.push({ test: (n) => set.has(n), description });
      continue;
    }
    const alternatives = pattern.split(/,\s*/).map((p) => {
      const source = p
        .trim()
        .replace(/\{[^}]+\}/g, '\u0000')
        .replace(/\*/g, '\u0000')
        .replace(/[.+?^$()|[\]\\]/g, '\\$&')
        .replaceAll('\u0000', '[a-z0-9-]+');
      return new RegExp(`^${source}$`);
    });
    entries.push({ test: (n) => alternatives.some((re) => re.test(n)), description });
  }
  return entries;
};

/** Loads tokens.css and everything it imports, in cascade order. */
export function loadTokens(entry = join(srcDir, 'tokens.css')): TokenSet {
  const decls: TokenDecl[] = [];
  const legends: Legend = [];
  let order = 0;

  const load = (path: string) => {
    const raw = readFileSync(path, 'utf8');
    for (const [, url] of raw.matchAll(/@import\s+url\(['"]?([^'")]+)['"]?\)/g)) {
      load(join(dirname(path), url));
    }
    const file = relative(srcDir, path);
    const body = stripConditional(raw.replace(/\/\*[\s\S]*?\*\//g, ''));
    const declared: string[] = [];
    for (const [, selectorText, block] of body.matchAll(/([^{}@;]+)\{([^{}]*)\}/g)) {
      const selectors = selectorText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      for (const [, name, value] of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
        decls.push({ name, value: value.trim(), selectors, file, order: order++ });
        if (!declared.includes(name)) declared.push(name);
      }
    }
    legends.push(...parseLegend(raw, declared));
  };
  load(entry);

  return {
    decls,
    names: [...new Set(decls.map((d) => d.name))],
    describe: (name) => legends.find((l) => l.test(name))?.description,
  };
}

/** Specificity of a selector against an element's attributes, or -1 if it doesn't match. */
const matchSelector = (selector: string, attrs: Record<string, string>): number => {
  if (selector === ':root') return 1;
  const parts = [...selector.matchAll(/\[([a-z-]+)(?:=['"]([^'"]*)['"])?\]/g)];
  if (!parts.length || parts.map((p) => p[0]).join('') !== selector) return -1;
  return parts.every(([, attr, value]) =>
    value === undefined ? attr in attrs : attrs[attr] === value,
  )
    ? parts.length
    : -1;
};

/**
 * Resolves every token for an element carrying the given theme (all axes set, as
 * applyTheme() does on <html>).
 */
export function resolveTheme(
  set: TokenSet,
  theme: Partial<Theme> = {},
): Map<string, ResolvedToken> {
  const attrs = themeAttributes(theme);
  const winners = new Map<string, TokenDecl & { spec: number }>();
  for (const decl of set.decls) {
    const spec = Math.max(...decl.selectors.map((s) => matchSelector(s, attrs)));
    if (spec < 0) continue;
    const current = winners.get(decl.name);
    if (!current || spec > current.spec || (spec === current.spec && decl.order > current.order)) {
      winners.set(decl.name, { ...decl, spec });
    }
  }

  const resolved = new Map<string, ResolvedToken>();
  const resolve = (name: string, stack: string[]): ResolvedToken | undefined => {
    const cached = resolved.get(name);
    if (cached) return cached;
    if (stack.includes(name)) throw new Error(`Token cycle: ${[...stack, name].join(' → ')}`);
    const decl = winners.get(name);
    if (!decl) return undefined;
    let chain = [name];
    const value = decl.value.replace(
      /var\((--[a-z0-9-]+)(?:\s*,\s*([^)]*))?\)/g,
      (_, ref: string, fallback?: string) => {
        const inner = resolve(ref, [...stack, name]);
        if (!inner) {
          if (fallback !== undefined) return fallback.trim();
          throw new Error(`Missing token ${ref} (used by ${name} in ${decl.file})`);
        }
        chain = [name, ...inner.chain];
        return inner.resolved;
      },
    );
    const token = { name, value: decl.value, resolved: value, chain, file: decl.file };
    resolved.set(name, token);
    return token;
  };
  for (const name of winners.keys()) resolve(name, []);
  return resolved;
}

/** Every combination of the given theme axis values. */
export function* allThemes(options: {
  [K in keyof Theme]: readonly Theme[K][];
}): Generator<Theme> {
  const axes = Object.keys(options) as (keyof Theme)[];
  function* walk(i: number, acc: Partial<Theme>): Generator<Theme> {
    if (i === axes.length) {
      yield acc as Theme;
      return;
    }
    for (const value of options[axes[i]]) yield* walk(i + 1, { ...acc, [axes[i]]: value });
  }
  yield* walk(0, {});
}
