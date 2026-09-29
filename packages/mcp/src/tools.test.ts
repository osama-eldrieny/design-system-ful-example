// @vitest-environment node
import { describe, expect, it } from 'vitest';
import * as tools from './tools.js';

describe('@ds/mcp tools', () => {
  it('lists and filters components', () => {
    expect(tools.listComponents().length).toBeGreaterThan(40);
    expect(tools.listComponents({ category: 'Overlays' }).every((c) => c.category === 'Overlays')).toBe(true);
  });

  it('returns a contract by name, id or export', () => {
    const button = tools.getComponent({ name: 'Button' }) as { id: string; tokens: unknown };
    expect(button.id).toBe('button');
    expect(typeof button.tokens).toBe('string');
    expect((tools.getComponent({ name: 'IconButton' }) as { id: string }).id).toBe('button');
    expect((tools.getComponent({ name: 'search-field' }) as { id: string }).id).toBe('search-field');
    expect(tools.getComponent({ name: 'Nope' })).toHaveProperty('error');
  });

  it('filters tokens and searches docs', () => {
    const { total, tokens } = tools.getTokens({ filter: '--spacing-' });
    expect(total).toBeGreaterThan(5);
    expect(Object.keys(tokens).every((t) => t.includes('--spacing-'))).toBe(true);
    expect(tools.searchDocs({ query: 'dark mode theme' })[0].score).toBeGreaterThan(0);
  });

  it('validates code', async () => {
    const bad = await tools.validateCode({
      code: "import { Button } from '@ds/react';\nexport const A = () => <><button>Save</button><Button variant=\"nope\" /></>;",
    });
    expect(bad.ok).toBe(false);
    expect(bad.problems.map((p) => p.rule)).toEqual(['ds/no-raw-element', 'ds/valid-props']);
    const good = await tools.validateCode({
      code: "import { Button } from '@ds/react';\nexport const A = () => <Button variant=\"danger\">Delete</Button>;",
    });
    expect(good.ok).toBe(true);
  });

  it('lists changes since a version', () => {
    expect(tools.getChanges({ since: '0.3.0' }).every((c) => c.version > '0.3.0')).toBe(true);
  });
});
