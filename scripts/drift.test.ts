// @vitest-environment node
/**
 * Drift guard: docs, AI files and code can't disagree.
 *  - every component folder exported from @ds/react has meta, stories, tests and a docs page
 *  - every example in the metadata passes the design-system lint rules
 *  - every token a component stylesheet uses exists
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ESLint } from 'eslint';
import { parser } from 'typescript-eslint';
import { describe, expect, it } from 'vitest';
import ds from '../packages/lint/eslint/index.js';
import { loadTokens } from '../packages/tokens/tools/resolve';

const root = join(__dirname, '..');
const src = join(root, 'packages/react/src');
const exported = [
  ...readFileSync(join(src, 'components/index.ts'), 'utf8').matchAll(/from '\.\.\/(\w+)'/g),
].map((m) => m[1]);
const docsPage = (name: string) =>
  ['components', 'patterns'].some((d) => existsSync(join(root, 'apps/docs/src', d, `${name}.mdx`)));

describe('drift guard', () => {
  it.each(exported)('%s has meta, stories, tests and a docs page', (name) => {
    for (const file of [`${name}.meta.ts`, `${name}.stories.tsx`, `${name}.test.tsx`]) {
      expect(existsSync(join(src, name, file)), `${name}/${file}`).toBe(true);
    }
    expect(docsPage(name), `docs page for ${name}`).toBe(true);
  });

  it.each(exported)('%s has AllThemes and RightToLeft stories', (name) => {
    const stories = readFileSync(join(src, name, `${name}.stories.tsx`), 'utf8');
    expect(stories).toMatch(/export const AllThemes\b/);
    expect(stories).toMatch(/export const RightToLeft\b/);
  });

  it('metadata examples follow the design-system rules', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ['**/*.tsx'],
          languageOptions: { parser, parserOptions: { ecmaFeatures: { jsx: true } } },
          ...ds.configs.recommended,
          rules: { ...ds.configs.recommended.rules, 'ds/no-raw-style-values': 'off' },
        },
      ],
    });
    const failures: string[] = [];
    for (const name of exported) {
      const meta = readFileSync(join(src, name, `${name}.meta.ts`), 'utf8');
      for (const [, code] of meta.matchAll(/code:\s*`([\s\S]*?)`,?\s*\n\s*\}/g)) {
        const [result] = await eslint.lintText(code.replace(/\\`/g, '`').replace(/\\\$/g, '$'), {
          filePath: `${name}.example.tsx`,
        });
        for (const m of result.messages.filter((x) => x.ruleId?.startsWith('ds/'))) {
          failures.push(`${name}: ${m.message}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });

  it('component stylesheets only use tokens that exist', () => {
    const tokens = new Set(loadTokens().names);
    const missing: string[] = [];
    for (const name of readdirSync(src)) {
      const css = join(src, name, `${name}.css`);
      if (!existsSync(css)) continue;
      const text = readFileSync(css, 'utf8');
      const privates = new Set([...text.matchAll(/(--_[\w-]+)\s*:/g)].map((m) => m[1]));
      for (const [, token] of text.matchAll(/var\(\s*(--[\w-]+)/g)) {
        if (token.startsWith('--radix-') || privates.has(token) || tokens.has(token)) continue;
        // Other components' tokens set on purpose (e.g. MeetingCard sets --avatar-ring-color).
        missing.push(`${name}: ${token}`);
      }
    }
    expect([...new Set(missing)]).toEqual([]);
  });
});
