import stylelint from 'stylelint';
import { describe, expect, it } from 'vitest';
import plugin from './component-tokens-only.js';

const lint = async (code: string, file = 'Button.css') => {
  const { results } = await stylelint.lint({
    code,
    codeFilename: `/virtual/${file}`,
    config: {
      plugins: [plugin],
      rules: { 'ds/component-tokens-only': [true, { prefixes: { Alert: ['alerts'] } }] },
    },
  });
  return results[0].warnings.map((w) => w.text);
};

describe('ds/component-tokens-only', () => {
  it('accepts the component’s own tokens and zero', async () => {
    expect(
      await lint(
        '.btn { color: var(--button-primary-default-text-color); margin: 0; padding: var(--button-medium-padding-y) 0; }',
      ),
    ).toEqual([]);
  });

  it('uses the prefix map for components named differently', async () => {
    expect(await lint('.alert { color: var(--alerts-primary-font-color); }', 'Alert.css')).toEqual(
      [],
    );
  });

  it('rejects other components’ tokens and semantic tokens', async () => {
    const warnings = await lint(
      '.btn { color: var(--section-title-font-color); background: var(--color-bg-surface); }',
    );
    expect(warnings).toHaveLength(2);
    expect(warnings[0]).toMatch(/--section-title-font-color/);
  });

  it('allows private helpers declared in the same file, but not undeclared ones', async () => {
    const warnings = await lint(
      '.btn { --_bg: var(--button-primary-default-bg-color); background: var(--_bg); color: var(--_fg); }',
    );
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toMatch(/--_fg/);
  });

  it('rejects raw values assigned to private helpers', async () => {
    expect(await lint('.btn { --_bg: #fff; background: var(--_bg); }')).toHaveLength(1);
  });

  it('rejects raw colors and lengths, including inside var() fallbacks', async () => {
    const warnings = await lint(
      '.btn { color: #fff; border: 1px solid rgb(0 0 0 / 10%); width: var(--button-width, 24px); }',
    );
    expect(warnings.filter((w) => w.includes('Raw color'))).toHaveLength(2);
    expect(warnings.filter((w) => w.includes('Raw length'))).toHaveLength(2);
  });
});
