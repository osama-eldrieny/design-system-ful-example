import { defaultTheme, themeOptions, type Theme } from '@ds/tokens';
import { useDocsTheme } from './theme-globals';
import './blocks.css';

const LABELS: Record<keyof Theme, string> = {
  brand: 'Brand',
  mode: 'Mode',
  language: 'Language',
  typeface: 'Typeface',
  density: 'Density',
  radius: 'Radius',
  shadow: 'Shadow',
};

/**
 * Previews the page's examples in another theme. Same setting as the toolbar; the docs
 * page itself keeps its neutral style.
 */
export function ThemeBar() {
  const [theme, update] = useDocsTheme();
  const isDefault = (Object.keys(defaultTheme) as (keyof Theme)[]).every(
    (a) => theme[a] === defaultTheme[a],
  );
  return (
    <div className="docs-block docs-themebar" role="group" aria-label="Preview theme">
      <strong>Preview theme</strong>
      {(Object.keys(themeOptions) as (keyof Theme)[]).map((axis) => (
        <label key={axis}>
          {LABELS[axis]}
          <select
            id={`docs-theme-${axis}`}
            value={theme[axis]}
            onChange={(e) => update({ [axis]: e.target.value } as Partial<Theme>)}
          >
            {themeOptions[axis].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
      ))}
      {!isDefault && (
        <button type="button" onClick={() => update({ ...defaultTheme })}>
          Reset to default
        </button>
      )}
    </div>
  );
}
