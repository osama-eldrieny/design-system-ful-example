import { forwardRef, type HTMLAttributes } from 'react';
import { themeAttributes, type Theme } from '@ds/tokens';

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Theme for this subtree. Axes you leave out use the default theme. */
  theme?: Partial<Theme>;
}

/**
 * Scopes a theme to its children. Renders a `div` carrying every theme attribute, so
 * all component tokens inside resolve against this theme. To theme the whole page,
 * call `applyTheme()` from `@ds/tokens` instead.
 */
export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(
  ({ theme, children, ...props }, ref) => (
    <div ref={ref} {...themeAttributes(theme)} {...props}>
      {children}
    </div>
  ),
);

ThemeProvider.displayName = 'ThemeProvider';
