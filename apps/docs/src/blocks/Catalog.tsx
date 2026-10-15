import { docsId, type ComponentMeta } from '../../../../packages/react/src/meta';
import { previews } from './catalog-previews';
import './blocks.css';

const metas = Object.values(
  import.meta.glob<{ default: ComponentMeta }>('../../../../packages/react/src/**/*.meta.ts', {
    eager: true,
  }),
).map((m) => m.default);

/** Category order, a one-line description and an accent hue for the preview surface. */
const categories: { name: string; blurb: string; hue: string }[] = [
  { name: 'Actions', blurb: 'Buttons and links that start something.', hue: 'violet' },
  { name: 'Forms', blurb: 'Fields, choices and pickers that collect input.', hue: 'blue' },
  { name: 'Navigation', blurb: 'Ways to move between pages, steps and sections.', hue: 'teal' },
  { name: 'Data display', blurb: 'Show people, numbers, lists and content.', hue: 'amber' },
  { name: 'Feedback', blurb: 'Status, progress and messages about what happened.', hue: 'green' },
  { name: 'Overlays', blurb: 'Menus, dialogs and panels that open above the page.', hue: 'pink' },
  { name: 'Layout', blurb: 'Containers and spacing primitives for building pages.', hue: 'slate' },
  { name: 'Patterns', blurb: 'Ready-made compositions for common app screens.', hue: 'orange' },
];

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** Every component, grouped by category: a live preview, its name and quick facts. */
export function Catalog() {
  return (
    <div className="docs-block docs-catalog">
      {categories.map((cat) => {
        const items = metas
          .filter((m) => m.category === cat.name)
          .sort((a, b) => a.name.localeCompare(b.name));
        if (!items.length) return null;
        return (
          <section
            key={cat.name}
            className="docs-catalog__group"
            aria-labelledby={`cat-${cat.hue}`}
          >
            <header className="docs-catalog__head">
              <h3 id={`cat-${cat.hue}`}>
                {cat.name} <span className="docs-catalog__total">{items.length}</span>
              </h3>
              <p>{cat.blurb}</p>
            </header>
            <div className="docs-catalog__grid">
              {items.map((m) => {
                const parts = Math.max(1, m.imports?.length ?? 1);
                const variants = (m.options ?? []).reduce((n, o) => n + (o.values?.length ?? 0), 0);
                return (
                  <a
                    key={m.id}
                    className={`docs-catalog__item docs-catalog__item--${cat.hue}`}
                    href={`?path=/docs/${docsId(m)}`}
                    target="_top"
                  >
                    <span className="docs-catalog__preview sb-unstyled" aria-hidden="true" inert>
                      {previews[m.id] ?? (
                        <strong className="docs-catalog__initial">{m.name[0]}</strong>
                      )}
                    </span>
                    <span className="docs-catalog__name">
                      {m.name}
                      <span className="docs-catalog__arrow" aria-hidden="true">
                        →
                      </span>
                    </span>
                    <span className="docs-catalog__facts">
                      {variants > 0 && <span>{plural(variants, 'variant')}</span>}
                      {parts > 1 && <span>{plural(parts, 'part')}</span>}
                      {m.status !== 'stable' && (
                        <span className={`docs-badge docs-badge--${m.status}`}>{m.status}</span>
                      )}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
