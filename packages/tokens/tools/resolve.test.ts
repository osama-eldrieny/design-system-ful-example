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
  }, 120_000); // 576 combinations; CI machines are slower than a laptop.

  it('resolve to the expected default values', () => {
    const resolved = resolveTheme(tokens, defaultTheme);
    // Primary fill is step 600 (not 500) so white text passes WCAG AA (approved 2026-09-29).
    expect(resolved.get('--button-primary-default-bg-color')?.resolved).toBe('#794dff');
    expect(resolved.get('--button-primary-default-bg-color')?.chain).toEqual([
      '--button-primary-default-bg-color',
      '--color-bg-accent-primary-strong-default',
      '--color-bg-accent-primary-default',
      '--color-diamond-primary-600',
    ]);
    expect(resolved.get('--section-shadow-blur')?.resolved).toBe('0');
    expect(resolved.get('--button-font-family')?.resolved).toBe("'Inter'");
  });

  it('switch values per theme', () => {
    const amberDark = resolveTheme(tokens, { brand: 'amber', mode: 'dark' });
    const arabic = resolveTheme(tokens, { language: 'ar', typeface: 'sans' });
    const pills = resolveTheme(tokens, { radius: 'pills' });
    expect(amberDark.get('--button-primary-default-bg-color')?.resolved).not.toBe('#794dff');
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

  it('describe tokens from the right legend line', () => {
    expect(tokens.describe('--color-bg-accent-primary-default')).toMatch(/^Solid fill/);
    expect(tokens.describe('--color-fg-on-accent-danger-text-hover')).toMatch(/^Tone-colored text/);
    expect(tokens.describe('--color-diamond-primary-500')).toBe('Brand color ramp.');
    expect(tokens.describe('--spacing-md')).toMatch(/^Default gap/);
    expect(tokens.describe('--radius-lg')).toMatch(/^Controls and small surfaces/);
    expect(tokens.describe('--duration-loop')).toMatch(/repeating animation/);
  });
});
