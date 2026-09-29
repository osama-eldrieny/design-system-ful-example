import type { ComponentMeta } from '../../../../packages/react/src/meta';
import './blocks.css';

/** Role, keyboard, ARIA, focus and the WCAG criteria the component meets. */
export function Accessibility({ meta }: { meta: ComponentMeta }) {
  const a = meta.accessibility;
  return (
    <div className="docs-block" style={{ display: 'grid', gap: 16 }}>
      <div className="docs-columns">
        <div className="docs-card">
          <h4>Role</h4>
          <p>{a.role}</p>
        </div>
        <div className="docs-card">
          <h4>Focus</h4>
          <p>{a.focus}</p>
        </div>
      </div>

      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th scope="col">Keys</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {a.keyboard.map((k) => (
              <tr key={k.keys}>
                <td className="docs-nowrap">
                  <kbd className="docs-mono">{k.keys}</kbd>
                </td>
                <td>{k.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {a.aria.length > 0 && (
        <div className="docs-table-wrap">
          <table className="docs-table">
            <thead>
              <tr>
                <th scope="col">ARIA</th>
                <th scope="col">When</th>
              </tr>
            </thead>
            <tbody>
              {a.aria.map((x) => (
                <tr key={x.attribute}>
                  <td className="docs-nowrap">
                    <code>{x.attribute}</code>
                  </td>
                  <td>{x.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="docs-table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th scope="col">WCAG 2.2</th>
              <th scope="col">How it is met</th>
            </tr>
          </thead>
          <tbody>
            {a.wcag.map((w) => (
              <tr key={w.criterion}>
                <td className="docs-nowrap">{w.criterion}</td>
                <td>{w.how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {a.notes.length > 0 && (
        <div className="docs-card">
          <h4>Notes</h4>
          <ul>
            {a.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
