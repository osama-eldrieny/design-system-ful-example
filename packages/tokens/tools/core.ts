/**
 * Token resolution core: parses token CSS and resolves any token in any theme, the way
 * a browser would. No Node APIs, so the docs site uses it too (TokenTable).
 */
import { themeAttributes, type Theme } from '../src/theme.ts';

/** Joins a relative URL (./a.css, ../b.css) onto a file path, POSIX style. */
const joinPath = (fromFile: string, url: string): string => {
  const parts = fromFile.split('/').slice(0, -1);
  for (const segment of url.split('/')) {
    if (segment === '..') parts.pop();
    else if (segment !== '.') parts.push(segment);
  }
  return parts.join('/');
};

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

type Legend = { test: (name: string) => boolean; description: string; file: string }[];

/**
 * Parses `--name: description` lines from a file header. `{placeholder}` stands for one
 * name segment (e.g. {tone} = primary), `*` for any number of segments, and
 * "--a … --b" for every token declared from --a to --b.
 */
const parseLegend = (css: string, declaredInFile: string[], file: string): Legend => {
  const header = css.match(/^\/\*\*([\s\S]*?)\*\//)?.[1] ?? '';
  const entries: Legend = [];
  for (const [, pattern, description] of header.matchAll(/^\s*\*\s+(--[^:]+?):\s+(.+)$/gm)) {
    const range = pattern.match(/^(--[a-z0-9-]+)\s+…\s+(--[a-z0-9-]+)$/);
    if (range) {
      const from = declaredInFile.indexOf(range[1]);
      const to = declaredInFile.indexOf(range[2]);
      const set = new Set(from >= 0 && to >= from ? declaredInFile.slice(from, to + 1) : []);
      entries.push({ test: (n) => set.has(n), description, file });
      continue;
    }
    const alternatives = pattern.split(/,\s*/).map((p) => {
      const source = p
        .trim()
        .replace(/\{[^}]+\}/g, '\u0000')
        .replace(/\*/g, '\u0001')
        .replace(/[.+?^$()|[\]\\]/g, '\\$&')
        .replaceAll('\u0000', '[a-z0-9]+')
        .replaceAll('\u0001', '[a-z0-9-]+');
      return new RegExp(`^${source}$`);
    });
    entries.push({ test: (n) => alternatives.some((re) => re.test(n)), description, file });
  }
  return entries;
};

/**
 * Builds a token set from CSS sources keyed by path relative to packages/tokens/src
 * (e.g. "themes/color.css"), following @import from `entry` in cascade order. Works in
 * Node and in the browser.
 */
export function tokensFromSources(sources: Record<string, string>, entry = 'tokens.css'): TokenSet {
  const decls: TokenDecl[] = [];
  const legends: Legend = [];
  let order = 0;

  const load = (file: string) => {
    const raw = sources[file];
    if (raw === undefined) throw new Error(`Token file not found: ${file}`);
    for (const [, url] of raw.matchAll(/@import\s+url\(['"]?([^'")]+)['"]?\)/g)) {
      if (url.startsWith('.')) load(joinPath(file, url));
    }
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
    legends.push(...parseLegend(raw, declared, file));
  };
  load(entry);

  // A token is described by the legend of a file that declares it; other files' legends
  // are only a fallback.
  const filesOf = new Map<string, Set<string>>();
  for (const d of decls) {
    if (!filesOf.has(d.name)) filesOf.set(d.name, new Set());
    filesOf.get(d.name)!.add(d.file);
  }
  return {
    decls,
    names: [...new Set(decls.map((d) => d.name))],
    describe: (name) =>
      (
        legends.find((l) => filesOf.get(name)?.has(l.file) && l.test(name)) ??
        legends.find((l) => l.test(name))
      )?.description,
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
