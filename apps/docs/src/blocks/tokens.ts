import { tokensFromSources, type TokenSet } from '../../../../packages/tokens/tools/core.ts';

// The token CSS as text, keyed by path relative to packages/tokens/src.
const raw = import.meta.glob('../../../../packages/tokens/src/**/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const sources = Object.fromEntries(
  Object.entries(raw).map(([path, css]) => [path.replace(/^.*\/packages\/tokens\/src\//, ''), css]),
);

/** Every token, parsed from the same CSS that ships to projects. */
export const tokenSet: TokenSet = tokensFromSources(sources);
