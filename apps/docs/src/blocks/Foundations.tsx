import { useMemo, type CSSProperties, type ReactNode } from 'react';
import { ThemeProvider } from '@ds/react';
import { themeOptions, type Theme } from '@ds/tokens';
import { resolveTheme } from '../../../../packages/tokens/tools/core.ts';
import { checkContrast, contrastRatio } from '../../../../packages/tokens/tools/contrast.ts';
import { tokenSet } from './tokens';
import { useDocsTheme } from './theme-globals';
import './blocks.css';

const isColor = (v: string) => /^#([0-9a-f]{3,8})$/i.test(v);
const title = (s: string) => s[0].toUpperCase() + s.slice(1);
const byPrefix = (re: RegExp) => tokenSet.names.filter((n) => re.test(n));

function useResolved(theme: Partial<Theme>) {
  // Themes are small objects; key the memo on their content, not their identity.
  const key = JSON.stringify(theme);
  return useMemo(() => resolveTheme(tokenSet, JSON.parse(key) as Partial<Theme>), [key]);
}

/** Every brand's primitive palette: families × steps with hex values. */
export function PaletteGrid() {
  const resolved = useResolved({});
  return (
    <div className="docs-block" style={{ display: 'grid', gap: 28 }}>
      {themeOptions.brand.map((brand) => {
        const names = byPrefix(new RegExp(`^--color-${brand}-[a-z]+-\\d+$`));
        const families = [...new Set(names.map((n) => n.split('-')[4]))];
        return (
          <section key={brand} style={{ display: 'grid', gap: 10 }}>
            <h3 style={{ margin: 0 }}>{title(brand)}</h3>
            {families.map((family) => (
              <div key={family} className="docs-palette-row">
                <code className="docs-palette-row__name">{family}</code>
                {names
                  .filter((n) => n.split('-')[4] === family)
                  .map((n) => {
                    const hex = resolved.get(n)!.resolved;
                    const onDark = contrastRatio('#ffffff', hex) > contrastRatio('#1c1b22', hex);
                    return (
                      <div
                        key={n}
                        className="docs-palette-swatch"
                        style={{ background: hex, color: onDark ? '#fff' : '#1c1b22' }}
                        title={`${n}: ${hex}`}
                      >
                        <span>{n.split('-').pop()}</span>
                        <span className="docs-mono">{hex}</span>
                      </div>
                    );
                  })}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}

/** Semantic color roles in the current theme: swatch, value, what points where, purpose. */
export function SemanticColors({ group }: { group: 'bg' | 'fg' | 'border' }) {
  const [theme] = useDocsTheme();
  const resolved = useResolved(theme);
  const names = byPrefix(new RegExp(`^--color-${group}-`)).filter((n) => !/-\d{3,4}$/.test(n));
  return (
    <div className="docs-block docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">
              {title(theme.brand)} {theme.mode}
            </th>
            <th scope="col">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {names.map((n) => {
            const t = resolved.get(n)!;
            return (
              <tr key={n}>
                <td className="docs-nowrap">
                  <code>{n}</code>
                </td>
                <td className="docs-nowrap">
                  {isColor(t.resolved) && (
                    <span className="docs-swatch" style={{ background: t.resolved }} />
                  )}
                  <code>{t.chain.at(-1)?.replace('--color-', '')}</code>
                </td>
                <td>{tokenSet.describe(n)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Pass/fail summary of every checked text/background pair, per brand × mode. */
export function ContrastSummary() {
  const results = useMemo(() => checkContrast(tokenSet), []);
  const themes = [...new Set(results.map((r) => r.theme))];
  const worst = [...results].sort((a, b) => a.ratio - b.ratio).slice(0, 5);
  return (
    <div className="docs-block" style={{ display: 'grid', gap: 16 }}>
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th scope="col">Theme</th>
              <th scope="col">Pairs checked</th>
              <th scope="col">Pass WCAG AA</th>
            </tr>
          </thead>
          <tbody>
            {themes.map((t) => {
              const all = results.filter((r) => r.theme === t);
              const pass = all.filter((r) => r.pass).length;
              return (
                <tr key={t}>
                  <td className="docs-nowrap">{t.replace('-', ' ')}</td>
                  <td>{all.length}</td>
                  <td
                    style={{ color: pass === all.length ? 'var(--docs-good)' : 'var(--docs-bad)' }}
                  >
                    {pass} / {all.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="docs-why">
        Lowest ratios in the system:{' '}
        {worst
          .map(
            (w) =>
              `${w.fg.replace('--', '')} on ${w.bg.replace('--', '')} (${w.theme}) ${w.ratio.toFixed(2)}:1`,
          )
          .join('; ')}
        .
      </p>
    </div>
  );
}

/** The type scale: size, line height and a sample, in the current typeface theme. */
export function TypeScale() {
  const [theme] = useDocsTheme();
  const resolved = useResolved(theme);
  const sizes = byPrefix(/^--font-size-/);
  return (
    <div className="docs-block docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Line height</th>
            <th scope="col">Sample</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((n) => {
            const step = n.replace('--font-size-', '');
            const lh = `--font-line-height-${step}`;
            return (
              <tr key={n}>
                <td className="docs-nowrap">
                  <code>{n}</code> {resolved.get(n)?.resolved}
                </td>
                <td className="docs-nowrap">
                  <code>{lh}</code> {resolved.get(lh)?.resolved}
                </td>
                <td>
                  <ThemeProvider theme={theme} style={{ background: 'transparent' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-family-body)',
                        fontSize: `var(${n})`,
                        lineHeight: `var(${lh})`,
                        color: 'var(--docs-ink)',
                      }}
                    >
                      {theme.language === 'ar' ? 'نظام التصميم' : 'Design system'}
                    </span>
                  </ThemeProvider>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Headings, body and action fonts in every language × typeface. */
export function FontFamilies() {
  return (
    <div className="docs-block docs-matrix">
      {themeOptions.language.flatMap((language) =>
        themeOptions.typeface.map((typeface) => (
          <div key={`${language}-${typeface}`} className="docs-matrix__cell">
            <div className="docs-matrix__label">
              {language === 'en' ? 'English' : 'Arabic'} · {typeface}
            </div>
            <ThemeProvider theme={{ language, typeface }} className="docs-matrix__stage">
              <div style={{ display: 'grid', gap: 6, color: 'var(--color-fg-on-surface-primary)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-family-headings)',
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 700,
                  }}
                >
                  {language === 'en' ? 'Headings' : 'العناوين'}
                </span>
                <span
                  style={{ fontFamily: 'var(--font-family-body)', fontSize: 'var(--font-size-md)' }}
                >
                  {language === 'en'
                    ? 'Body text for reading and most UI.'
                    : 'نص للقراءة ومعظم عناصر الواجهة.'}
                </span>
                <FontName token="--font-family-body" theme={{ language, typeface }} />
              </div>
            </ThemeProvider>
          </div>
        )),
      )}
    </div>
  );
}

function FontName({ token, theme }: { token: string; theme: Partial<Theme> }) {
  const resolved = useResolved(theme);
  return <code className="docs-alt">{resolved.get(token)?.resolved}</code>;
}

/** A scale of lengths (spacing, radius, shadow) drawn to size. */
export function LengthScale({
  prefix,
  kind,
}: {
  prefix: string;
  kind: 'space' | 'radius' | 'shadow';
}) {
  const [theme] = useDocsTheme();
  const resolved = useResolved(theme);
  const names = byPrefix(new RegExp(`^${prefix}`)).filter((n) => !/-\d+$/.test(n));
  const px = (v: string) => Math.max(0, Math.min(parseFloat(v) || 0, 120));
  return (
    <div className="docs-block docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Value</th>
            <th scope="col">Preview</th>
            <th scope="col">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {names.map((n) => {
            const v = resolved.get(n)?.resolved ?? '';
            const style: CSSProperties =
              kind === 'space'
                ? {
                    inlineSize: px(v),
                    blockSize: 12,
                    background: 'var(--docs-accent)',
                    borderRadius: 2,
                  }
                : kind === 'radius'
                  ? {
                      inlineSize: 48,
                      blockSize: 32,
                      border: '2px solid var(--docs-accent)',
                      borderRadius: Math.min(px(v), 999),
                    }
                  : {
                      inlineSize: 64,
                      blockSize: 32,
                      background: 'var(--docs-panel)',
                      borderRadius: 6,
                      boxShadow: `0 ${px(v) / 2}px ${px(v)}px rgb(0 0 0 / 22%)`,
                    };
            return (
              <tr key={n}>
                <td className="docs-nowrap">
                  <code>{n}</code>
                </td>
                <td className="docs-nowrap">
                  <code>{v}</code>
                </td>
                <td>
                  <div style={style} />
                </td>
                <td>{tokenSet.describe(n)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Component tokens that change between the modes of one theme axis. */
export function ModeComparison({ axis }: { axis: 'density' | 'radius' | 'shadow' }) {
  const modes = themeOptions[axis] as readonly string[];
  const perMode = modes.map((m) => resolveTheme(tokenSet, { [axis]: m } as Partial<Theme>));
  const names = tokenSet.names.filter(
    (n) =>
      !/^--(space|radius|shadow|spacing)-/.test(n) &&
      new Set(perMode.map((r) => r.get(n)?.resolved)).size > 1,
  );
  return (
    <div className="docs-block docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th scope="col">Component token</th>
            {modes.map((m) => (
              <th key={m} scope="col">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {names.map((n) => (
            <tr key={n}>
              <td className="docs-nowrap">
                <code>{n}</code>
              </td>
              {perMode.map((r, i) => (
                <td key={modes[i]} className="docs-nowrap">
                  <code>{r.get(n)?.resolved}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Motion tokens with a live demo (still when the viewer prefers reduced motion). */
export function MotionTokens() {
  const resolved = useResolved({});
  const names = byPrefix(/^--(duration|easing)-/);
  return (
    <div className="docs-block docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Value</th>
            <th scope="col">Demo (hover the row)</th>
            <th scope="col">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {names.map((n) => {
            const isEasing = n.startsWith('--easing');
            return (
              <tr key={n} className="docs-motion-row">
                <td className="docs-nowrap">
                  <code>{n}</code>
                </td>
                <td>
                  <code>{resolved.get(n)?.resolved}</code>
                </td>
                <td>
                  <div className="docs-motion-track">
                    <span
                      className="docs-motion-dot"
                      style={{
                        transitionDuration: isEasing ? 'var(--duration-slow)' : `var(${n})`,
                        transitionTimingFunction: isEasing ? `var(${n})` : 'var(--easing-standard)',
                      }}
                    />
                  </div>
                </td>
                <td>{tokenSet.describe(n)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** A labelled grid of examples, e.g. icons. */
export function Gallery({ items }: { items: { label: string; node: ReactNode }[] }) {
  const [theme] = useDocsTheme();
  return (
    <ThemeProvider theme={theme} className="ds-canvas docs-gallery">
      {items.map((i) => (
        <div key={i.label} className="docs-gallery__item">
          {i.node}
          <span>{i.label}</span>
        </div>
      ))}
    </ThemeProvider>
  );
}
