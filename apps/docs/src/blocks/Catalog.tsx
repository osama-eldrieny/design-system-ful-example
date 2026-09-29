import type { ComponentMeta } from '../../../../packages/react/src/meta';
import './blocks.css';

const metas = Object.values(
  import.meta.glob<{ default: ComponentMeta }>('../../../../packages/react/src/**/*.meta.ts', {
    eager: true,
  }),
).map((m) => m.default);

// Components still on the pre-overhaul implementation; each moves to a documented
// component (with a *.meta.ts) in Phase 3.
const MIGRATING = ['Footer', 'Header', 'Logo', 'Navbar', 'Palettes'];

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

/** Every component with its status; documented ones link to their page. */
export function Catalog() {
  return (
    <div className="docs-block docs-catalog">
      {metas.map((m) => (
        <a
          key={m.id}
          className="docs-catalog__item"
          href={`?path=/docs/components-${slug(m.category)}-${m.id}--docs`}
          target="_top"
        >
          <strong>{m.name}</strong>
          <span className="docs-alt">{m.category}</span>
          <span className={`docs-badge docs-badge--${m.status}`}>{m.status}</span>
        </a>
      ))}
      {MIGRATING.map((name) => (
        <div key={name} className="docs-catalog__item docs-catalog__item--pending">
          <strong>{name}</strong>
          <span className="docs-alt">Being migrated</span>
          <span className="docs-badge">planned</span>
        </div>
      ))}
    </div>
  );
}
