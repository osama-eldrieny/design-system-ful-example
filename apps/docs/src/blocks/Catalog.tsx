import { docsId, type ComponentMeta } from '../../../../packages/react/src/meta';
import './blocks.css';

const metas = Object.values(
  import.meta.glob<{ default: ComponentMeta }>('../../../../packages/react/src/**/*.meta.ts', {
    eager: true,
  }),
).map((m) => m.default);

/** Every component with its status; documented ones link to their page. */
export function Catalog() {
  return (
    <div className="docs-block docs-catalog">
      {metas.map((m) => (
        <a
          key={m.id}
          className="docs-catalog__item"
          href={`?path=/docs/${docsId(m)}`}
          target="_top"
        >
          <strong>{m.name}</strong>
          <span className="docs-alt">{m.category}</span>
          <span className={`docs-badge docs-badge--${m.status}`}>{m.status}</span>
        </a>
      ))}
    </div>
  );
}
