import { describe, expect, it } from 'vitest';
import { componentMetaSchema, docsId, type ComponentMeta } from './meta';

// Every {Component}.meta.ts in the library.
const metas = import.meta.glob<{ default: unknown }>('./**/*.meta.ts', { eager: true });
// Their stories' source, to check the docs links (the title decides the Storybook id).
const stories = import.meta.glob<string>('./**/*.stories.tsx', {
  eager: true,
  query: '?raw',
  import: 'default',
});

/** Storybook's id for a title, e.g. "Components/Data display/Card" → "components-data-display-card". */
const storyId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9/]+/g, '-')
    .split('/')
    .map((part) => part.replace(/^-|-$/g, ''))
    .join('-');

describe('component metadata', () => {
  it('exists for at least one component', () => {
    expect(Object.keys(metas).length).toBeGreaterThan(0);
  });

  for (const [file, mod] of Object.entries(metas)) {
    it(`${file} matches the schema`, () => {
      const result = componentMetaSchema.safeParse(mod.default);
      expect(result.success ? [] : result.error.issues).toEqual([]);
    });

    it(`${file} links to its docs page`, () => {
      const source = stories[file.replace(/\.meta\.ts$/, '.stories.tsx')];
      const title = source?.match(/const meta = \{\s*title: '([^']+)'/)?.[1];
      expect(title, 'stories file with a title').toBeDefined();
      expect(docsId(mod.default as ComponentMeta)).toBe(`${storyId(title!)}--docs`);
    });
  }
});
