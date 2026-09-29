#!/usr/bin/env node
/**
 * Scaffolds a new component: node skills/ds-builder/scripts/scaffold-component.mjs Rating Forms
 * Creates tokens, component, CSS, meta, stories, tests, index and the docs page, with TODOs.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const [name, category = 'Data display'] = process.argv.slice(2);
if (!name || !/^[A-Z][A-Za-z]+$/.test(name)) {
  console.error('Usage: scaffold-component.mjs <PascalName> [Category]');
  process.exit(2);
}
const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const dir = `packages/react/src/${name}`;
if (existsSync(dir)) {
  console.error(`${dir} already exists.`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });
const write = (path, text) => {
  writeFileSync(path, text);
  console.log('created', path);
};

write(`packages/tokens/src/components/${kebab}.css`, `/**
 * Component tokens: ${kebab}
 *
 * Style this component only with these tokens.
 *
 * Grammar: --${kebab}-{variant?}-{state?}-{property}
 */

:root,
[data-theme] {
  /* TODO: point every token at a semantic token. */
  --${kebab}-bg-color: var(--color-bg-base);
  --${kebab}-text-color: var(--color-fg-on-surface-primary);
  --${kebab}-padding: var(--spacing-md);
}
`);
const tokens = 'packages/tokens/src/tokens.css';
const lines = readFileSync(tokens, 'utf8').split('\n');
const imports = [...new Set([...lines.filter((l) => l.startsWith("@import url('./components/")), `@import url('./components/${kebab}.css');`])].sort();
const out = [];
let done = false;
for (const l of lines) {
  if (l.startsWith("@import url('./components/")) {
    if (!done) out.push(...imports);
    done = true;
  } else out.push(l);
}
writeFileSync(tokens, out.join('\n'));

write(`${dir}/${name}.tsx`, `import { forwardRef, type HTMLAttributes } from 'react';
import './${name}.css';

export interface ${name}Props extends HTMLAttributes<HTMLDivElement> {
  /** TODO: document every prop. */
  children?: React.ReactNode;
}

/** TODO: one sentence on what ${name} is for. */
export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(({ className, ...props }, ref) => (
  <div ref={ref} className={['ds-${kebab}', className].filter(Boolean).join(' ')} {...props} />
));
${name}.displayName = '${name}';
`);
write(`${dir}/${name}.css`, `/** ${name}. Styled only with --${kebab}-* tokens. */

.ds-${kebab} {
  padding: var(--${kebab}-padding);
  background-color: var(--${kebab}-bg-color);
  color: var(--${kebab}-text-color);
}
`);
write(`${dir}/index.ts`, `export { ${name}, type ${name}Props } from './${name}';\n`);
write(`${dir}/${name}.meta.ts`, `import { defineMeta } from '../meta';

// TODO: complete every field; meta.test.ts checks the schema.
export default defineMeta({
  id: '${kebab}',
  name: '${name}',
  category: '${category}',
  status: 'experimental',
  since: '0.5.0',
  description: 'TODO',
  imports: [{ name: '${name}', from: '@ds/react' }],
  whenToUse: ['TODO'],
  whenNotToUse: [{ text: 'TODO', alternative: 'TODO' }],
  anatomy: [{ name: 'TODO', description: 'TODO' }],
  options: [],
  states: [{ name: 'Default', meaning: 'TODO', trigger: '—' }],
  behavior: [{ topic: 'TODO', text: 'TODO' }],
  content: ['TODO'],
  guidelines: [
    { do: 'TODO', dont: 'TODO', why: 'TODO' },
    { do: 'TODO', dont: 'TODO', why: 'TODO' },
    { do: 'TODO', dont: 'TODO', why: 'TODO' },
  ],
  accessibility: {
    role: 'TODO',
    keyboard: [{ keys: 'TODO', action: 'TODO' }],
    aria: [],
    focus: 'TODO',
    wcag: [{ criterion: 'TODO', how: 'TODO' }],
    notes: [],
  },
  examples: [
    { id: 'basic', title: 'TODO', description: 'TODO', code: "import { ${name} } from '@ds/react';\\n\\n<${name} />" },
    { id: 'two', title: 'TODO', description: 'TODO', code: 'TODO' },
    { id: 'three', title: 'TODO', description: 'TODO', code: 'TODO' },
  ],
  tokenPrefixes: ['--${kebab}-'],
  related: [],
  changelog: [{ version: '0.5.0', date: '${new Date().toISOString().slice(0, 10)}', changes: ['New component.'] }],
});
`);
const title = category === 'Patterns' ? `Patterns/${name}` : `Components/${category}/${name}`;
write(`${dir}/${name}.stories.tsx`, `import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { ${name} } from './${name}';

const meta = {
  title: '${title}',
  component: ${name},
  tags: ['!autodocs'],
  args: { children: '${name}' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const RightToLeft: Story = { globals: { language: 'ar' } };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={\`\${brand}-\${mode}\`} theme={{ brand, mode }} className="ds-canvas">
            <${name}>{\`\${brand} \${mode}\`}</${name}>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** TODO: an interaction test. */
export const Behavior: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.ds-${kebab}')).toBeInTheDocument();
  },
};
`);
write(`${dir}/${name}.test.tsx`, `import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders', () => {
    render(<${name}>Hello</${name}>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
`);
const docDir = category === 'Patterns' ? 'apps/docs/src/patterns' : 'apps/docs/src/components';
write(`${docDir}/${name}.mdx`, `import { Meta } from '@storybook/addon-docs/blocks';
import { ${name} } from '@ds/react';
import * as Stories from '../../../../packages/react/src/${name}/${name}.stories';
import meta from '../../../../packages/react/src/${name}/${name}.meta';
import { ComponentPage } from '../blocks';

<Meta of={Stories} name="Docs" />

# ${name}

<ComponentPage meta={meta} stories={Stories} components={[${name}]} behaviorStory="RightToLeft" matrix={<${name}>${name}</${name}>} />
`);
const indexFile = 'packages/react/src/components/index.ts';
writeFileSync(indexFile, readFileSync(indexFile, 'utf8') + `export * from '../${name}';\n`);
console.log(`\nNext: fill the TODOs, then npm run typecheck && npm run lint && npm test && npm run ai.`);
