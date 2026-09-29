import { createContext, forwardRef, useContext, type HTMLAttributes } from 'react';
import { defaultTheme, themeAttributes, type Theme } from '@ds/tokens';

/**
 * The theme of the nearest ThemeProvider, or null when the page theme (applyTheme on <html>)
 * applies. Components that render in a portal (menus, dialogs, tooltips) use it to keep the
 * theme of the place they were opened from.
 */
const ThemeContext = createContext<Theme | null>(null);

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Theme for this subtree. Axes you leave out come from the nearest parent ThemeProvider,
   * or the default theme at the top level.
   */
  theme?: Partial<Theme>;
}

/**
 * Scopes a theme to its children. Renders a `div` carrying every theme attribute, so
 * all component tokens inside resolve against this theme. To theme the whole page,
 * call `applyTheme()` from `@ds/tokens` instead.
 */
export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(
  ({ theme, children, ...props }, ref) => {
    const parent = useContext(ThemeContext);
    const resolved: Theme = { ...defaultTheme, ...parent, ...theme };
    return (
      <ThemeContext.Provider value={resolved}>
        <div ref={ref} {...themeAttributes(resolved)} {...props}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  },
);

ThemeProvider.displayName = 'ThemeProvider';

/**
 * Theme attributes for content rendered outside its ThemeProvider (in a portal), so it keeps
 * the theme it was opened from. Returns {} when the page theme applies.
 */
export function usePortalThemeAttributes(): Record<string, string> {
  const theme = useContext(ThemeContext);
  return theme ? themeAttributes(theme) : {};
}
