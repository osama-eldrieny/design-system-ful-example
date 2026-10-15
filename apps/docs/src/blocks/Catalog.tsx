import { docsId, type ComponentMeta } from '../../../../packages/react/src/meta';
import { previews } from './catalog-previews';
import './blocks.css';

const metas = Object.values(
  import.meta.glob<{ default: ComponentMeta }>('../../../../packages/react/src/**/*.meta.ts', {
    eager: true,
  }),
).map((m) => m.default);

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** "1 component + 13 variants": exported components, and the values of every option. */
function counts(m: ComponentMeta) {
  const components = Math.max(1, m.imports?.length ?? 1);
  const variants = (m.options ?? []).reduce((n, o) => n + (o.values?.length ?? 0), 0);
  return variants
    ? `${plural(components, 'component')} + ${plural(variants, 'variant')}`
    : plural(components, 'component');
}

/**
 * Every component as a card: a live preview on a faint grid, its name and how many components and
 * variants it has. Each card links to the component's page.
 */
export function Catalog() {
  const sorted = [...metas].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="docs-block docs-catalog">
      {sorted.map((m) => (
        <a
          key={m.id}
          className="docs-catalog__item"
          href={`?path=/docs/${docsId(m)}`}
          target="_top"
        >
          <span className="docs-catalog__preview" aria-hidden="true" inert>
            {previews[m.id] ?? <strong className="docs-catalog__initial">{m.name[0]}</strong>}
          </span>
          <span className="docs-catalog__name">
            {m.name}
            {m.status !== 'stable' && (
              <span className={`docs-badge docs-badge--${m.status}`}>{m.status}</span>
            )}
          </span>
          <span className="docs-catalog__count">{counts(m)}</span>
        </a>
      ))}
    </div>
  );
}
