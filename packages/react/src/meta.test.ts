import { describe, expect, it } from 'vitest';
import { componentMetaSchema } from './meta';

// Every {Component}.meta.ts in the library.
const metas = import.meta.glob<{ default: unknown }>('./**/*.meta.ts', { eager: true });

describe('component metadata', () => {
  it('exists for at least one component', () => {
    expect(Object.keys(metas).length).toBeGreaterThan(0);
  });

  for (const [file, mod] of Object.entries(metas)) {
    it(`${file} matches the schema`, () => {
      const result = componentMetaSchema.safeParse(mod.default);
      expect(result.success ? [] : result.error.issues).toEqual([]);
    });
  }
});
