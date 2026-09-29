import type { ReactNode } from 'react';
import { Source } from '@storybook/addon-docs/blocks';
import { ThemeProvider } from '@ds/react';
import type { ComponentMeta } from '../../../../packages/react/src/meta';
import { useDocsTheme } from './theme-globals';
import './blocks.css';

type MetaProp = { meta: ComponentMeta };

const REPO =
  'https://github.com/osama-eldrieny/design-system-ful-example/tree/main/packages/react/src';

/** Name, status, version, one-paragraph purpose and the import line. */
export function ComponentHeader({ meta }: MetaProp) {
  const importLine = `import { ${meta.imports.map((i) => i.name).join(', ')} } from '${meta.imports[0].from}';`;
  return (
    <div className="docs-block docs-header">
      <div className="docs-header__meta">
        <span className={`docs-badge docs-badge--${meta.status}`}>{meta.status}</span>
        <span>{meta.category}</span>
        <span aria-hidden="true">·</span>
        <span>Since {meta.since}</span>
        <span aria-hidden="true">·</span>
        <a href={`${REPO}/${meta.name}`} target="_blank" rel="noreferrer">
          Source
        </a>
      </div>
      <p className="docs-header__lede">{meta.description}</p>
      <div className="docs-import">{importLine}</div>
    </div>
  );
}

/** When to use it, and when to use something else instead. */
export function WhenToUse({ meta }: MetaProp) {
  return (
    <div className="docs-block docs-columns">
      <div className="docs-card docs-card--good">
        <h4>Use it</h4>
        <ul>
          {meta.whenToUse.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="docs-card docs-card--bad">
        <h4>Use something else</h4>
        <ul>
          {meta.whenNotToUse.map((w) => (
            <li key={w.text}>
              {w.text}
              {w.alternative && <span className="docs-alt"> Use {w.alternative}.</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Every value of one enumerated prop and what it means. */
export function OptionTable({ meta, prop }: MetaProp & { prop: string }) {
  const option = meta.options.find((o) => o.prop === prop);
  if (!option) return null;
  return (
    <div className="docs-block docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th scope="col">
              <code>{option.prop}</code>
            </th>
            <th scope="col">When to use it</th>
          </tr>
        </thead>
        <tbody>
          {option.values.map((v) => (
            <tr key={v.value}>
              <td className="docs-nowrap">
                <code>{v.value}</code>
              </td>
              <td>{v.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatesTable({ meta }: MetaProp) {
  return (
    <div className="docs-block docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th scope="col">State</th>
            <th scope="col">What it tells people</th>
            <th scope="col">When it appears</th>
          </tr>
        </thead>
        <tbody>
          {meta.states.map((s) => (
            <tr key={s.name}>
              <td className="docs-nowrap">{s.name}</td>
              <td>{s.meaning}</td>
              <td>{s.trigger}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Behavior({ meta }: MetaProp) {
  return (
    <div className="docs-block docs-table-wrap">
      <table className="docs-table">
        <tbody>
          {meta.behavior.map((b) => (
            <tr key={b.topic}>
              <th scope="row" className="docs-nowrap">
                {b.topic}
              </th>
              <td>{b.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContentGuidelines({ meta }: MetaProp) {
  return (
    <div className="docs-block docs-card">
      <ul>
        {meta.content.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Do / don't pairs with the reason. Optional visuals render live in the current docs
 * theme, keyed by pair index.
 */
export function DoDont({
  meta,
  visuals = {},
}: MetaProp & { visuals?: Record<number, { do: ReactNode; dont: ReactNode }> }) {
  const [theme] = useDocsTheme();
  return (
    <div className="docs-block docs-dodont">
      {meta.guidelines.map((g, i) => (
        <div key={g.do} className="docs-dodont__pair">
          <div className="docs-card docs-card--good">
            {visuals[i] && (
              <ThemeProvider theme={theme} className="docs-dodont__visual ds-canvas">
                {visuals[i].do}
              </ThemeProvider>
            )}
            <span className="docs-dodont__label docs-dodont__label--good">✓ Do</span>
            <p>{g.do}</p>
          </div>
          <div className="docs-card docs-card--bad">
            {visuals[i] && (
              <ThemeProvider theme={theme} className="docs-dodont__visual ds-canvas">
                {visuals[i].dont}
              </ThemeProvider>
            )}
            <span className="docs-dodont__label docs-dodont__label--bad">✕ Don’t</span>
            <p>{g.dont}</p>
            <p className="docs-why">Why: {g.why}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Copy-paste examples from the metadata (the same ones the AI files use). */
export function Examples({ meta }: MetaProp) {
  return (
    <div className="docs-block" style={{ display: 'grid', gap: 20 }}>
      {meta.examples.map((e) => (
        <div key={e.id} className="docs-example">
          <h4>{e.title}</h4>
          <p className="docs-why">{e.description}</p>
          <Source code={e.code} language="tsx" dark />
        </div>
      ))}
    </div>
  );
}

export function Related({ meta }: MetaProp) {
  return (
    <div className="docs-block docs-table-wrap">
      <table className="docs-table">
        <tbody>
          {meta.related.map((r) => (
            <tr key={r.id}>
              <th scope="row" className="docs-nowrap">
                <code>{r.id}</code>
              </th>
              <td>{r.relation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Changelog({ meta }: MetaProp) {
  return (
    <div className="docs-block" style={{ display: 'grid', gap: 12 }}>
      {meta.changelog.map((c) => (
        <div key={c.version} className="docs-card">
          <h4>
            {c.version} · {c.date}
          </h4>
          <ul>
            {c.changes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
