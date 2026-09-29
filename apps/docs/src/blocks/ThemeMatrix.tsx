import type { ReactNode } from 'react';
import { ThemeProvider } from '@ds/react';
import { themeOptions } from '@ds/tokens';
import { useDocsTheme } from './theme-globals';
import './blocks.css';

const title = (s: string) => s[0].toUpperCase() + s.slice(1);

/** The same example in every brand × mode, keeping the other theme axes from the toolbar. */
export function ThemeMatrix({ children }: { children: ReactNode }) {
  const [theme] = useDocsTheme();
  return (
    <div className="docs-block docs-matrix">
      {themeOptions.brand.flatMap((brand) =>
        themeOptions.mode.map((mode) => (
          <div key={`${brand}-${mode}`} className="docs-matrix__cell">
            <div className="docs-matrix__label">
              {title(brand)} · {mode}
            </div>
            <ThemeProvider theme={{ ...theme, brand, mode }} className="docs-matrix__stage">
              {children}
            </ThemeProvider>
          </div>
        )),
      )}
    </div>
  );
}
