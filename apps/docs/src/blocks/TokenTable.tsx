import { useMemo, useState } from 'react';
import { resolveTheme } from '../../../../packages/tokens/tools/core.ts';
import { tokenSet } from './tokens';
import { useDocsTheme } from './theme-globals';
import './blocks.css';

const isColor = (v: string) => /^#([0-9a-f]{3,8})$/i.test(v);

/**
 * A component's tokens with their value in the current theme, what each one points to,
 * and what it's for. Switch themes in the toolbar to see values change.
 */
export function TokenTable({ prefixes }: { prefixes: string[] }) {
  const [theme] = useDocsTheme();
  const [query, setQuery] = useState('');
  const resolved = useMemo(() => resolveTheme(tokenSet, theme), [theme]);

  const rows = tokenSet.names
    .filter((n) => prefixes.some((p) => n.startsWith(p)))
    .filter((n) => !query || n.includes(query.trim().toLowerCase()))
    .map((name) => {
      const token = resolved.get(name);
      const chain = token?.chain ?? [name];
      // Component tokens take the description of the semantic token they point to.
      const described = chain.map((c) => tokenSet.describe(c)).find(Boolean);
      return { name, value: token?.resolved ?? '', chain: chain.slice(1), described };
    });

  return (
    <div className="docs-block docs-tokens">
      <div className="docs-tokens__tools">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Filter ${prefixes.join(', ')} tokens`}
          aria-label="Filter tokens"
        />
        <span className="docs-alt">
          {rows.length} tokens · values for {theme.brand} {theme.mode}, {theme.density},{' '}
          {theme.radius}
        </span>
      </div>
      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Value</th>
              <th scope="col">Points to</th>
              <th scope="col">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td className="docs-nowrap">
                  <code>{r.name}</code>
                </td>
                <td className="docs-nowrap">
                  {isColor(r.value) && (
                    <span className="docs-swatch" style={{ background: r.value }} />
                  )}
                  <code>{r.value}</code>
                </td>
                <td className="docs-chain">{r.chain.join(' → ') || '—'}</td>
                <td>{r.described ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
