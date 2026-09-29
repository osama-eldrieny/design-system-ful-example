/**
 * Theme axes and the helpers that apply them.
 *
 * Every theme is a set of data attributes. The token CSS (tokens.css) switches values
 * based on them, on <html> or on any element marked with data-theme.
 */

export const themeOptions = {
  brand: ['diamond', 'amber', 'opal'],
  mode: ['light', 'dark'],
  language: ['en', 'ar'],
  typeface: ['serif', 'sans'],
  density: ['comfortable', 'compact'],
  radius: ['square', 'round', 'pills'],
  shadow: ['flat', 'subtle', 'default', 'raised'],
} as const;

export type ThemeAxis = keyof typeof themeOptions;
export type Theme = { [A in ThemeAxis]: (typeof themeOptions)[A][number] };

export const defaultTheme: Theme = {
  brand: 'diamond',
  mode: 'light',
  language: 'en',
  typeface: 'sans',
  density: 'comfortable',
  radius: 'round',
  shadow: 'flat',
};

/**
 * The attributes a theme scope needs. A scope always carries every axis, so nested
 * scopes never mix values from their parent.
 */
export function themeAttributes(theme: Partial<Theme> = {}): Record<string, string> {
  const t = { ...defaultTheme, ...theme };
  return {
    'data-theme': '',
    'data-brand': t.brand,
    'data-mode': t.mode,
    'data-language': t.language,
    'data-typeface': t.typeface,
    'data-density': t.density,
    'data-radius': t.radius,
    'data-shadow': t.shadow,
    lang: t.language,
    dir: t.language === 'ar' ? 'rtl' : 'ltr',
  };
}

/** Applies a theme to an element, <html> by default. */
export function applyTheme(
  theme: Partial<Theme> = {},
  element: HTMLElement = document.documentElement,
): void {
  for (const [name, value] of Object.entries(themeAttributes(theme))) {
    element.setAttribute(name, value);
  }
}
