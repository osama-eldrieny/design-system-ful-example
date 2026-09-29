/**
 * Node entry: loads the token CSS from disk. Used by tests, the contrast report and the
 * AI export. The parsing and resolution live in core.ts (shared with the docs site).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tokensFromSources, type TokenSet } from './core.ts';

export * from './core.ts';

export const srcDir = join(dirname(fileURLToPath(import.meta.url)), '../src');

const cssFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? cssFiles(join(dir, e.name))
      : e.name.endsWith('.css')
        ? [join(dir, e.name)]
        : [],
  );

/** Loads tokens.css and everything it imports, in cascade order. */
export function loadTokens(): TokenSet {
  const sources = Object.fromEntries(
    cssFiles(srcDir).map((f) => [relative(srcDir, f), readFileSync(f, 'utf8')]),
  );
  return tokensFromSources(sources);
}
