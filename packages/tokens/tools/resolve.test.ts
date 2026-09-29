import { describe, expect, it } from 'vitest';
import { defaultTheme, themeOptions } from '../src/theme.ts';
import { allThemes, loadTokens, resolveTheme } from './resolve.ts';

const tokens = loadTokens();

describe('design tokens', () => {
  it('resolve without missing references or cycles in every theme combination', () => {
    let combinations = 0;
    for (const theme of allThemes(themeOptions)) {
      // Throws on a missing token or a cycle.
      const resolved = resolveTheme(tokens, theme);
      for (const name of tokens.names) {
        expect(resolved.get(name)?.resolved, `${name} in ${JSON.stringify(theme)}`).toBeTruthy();
      }
      combinations++;
    }
    expect(combinations).toBe(6 * 4 * 2 * 3 * 4);
  });

  it('resolve to the expected default values', () => {
    const resolved = resolveTheme(tokens, defaultTheme);
    expect(resolved.get('--button-primary-default-bg-color')?.resolved).toBe('#916dff');
    expect(resolved.get('--button-primary-default-bg-color')?.chain).toEqual([
      '--button-primary-default-bg-color',
      '--color-bg-accent-primary-default',
      '--color-diamond-primary-500',
    ]);
    expect(resolved.get('--section-shadow-blur')?.resolved).toBe('0');
    expect(resolved.get('--button-font-family')?.resolved).toBe("'Inter'");
  });

  it('switch values per theme', () => {
    const amberDark = resolveTheme(tokens, { brand: 'amber', mode: 'dark' });
    const arabic = resolveTheme(tokens, { language: 'ar', typeface: 'sans' });
    const pills = resolveTheme(tokens, { radius: 'pills' });
    expect(amberDark.get('--button-primary-default-bg-color')?.resolved).not.toBe('#916dff');
    expect(arabic.get('--container-direction')?.resolved).toBe('rtl');
    expect(pills.get('--button-medium-border-radius')?.resolved).toBe('999px');
  });

  it('describe every semantic token', () => {
    const semantic = tokens.names.filter((n) =>
      /^--(color-(bg|fg|border|shadow)-|spacing-|radius-(none|\d?x?[a-z]+)$|shadow-(none|\d?x?[a-z]+)$|font-family-(headings|body|action)$|duration-|easing-|z-|focus-ring-)/.test(
        n,
      ),
    );
    expect(semantic.length).toBeGreaterThan(100);
    expect(semantic.filter((n) => !tokens.describe(n))).toEqual([]);
  });
});
