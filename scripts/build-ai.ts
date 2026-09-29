/**
 * Generates the AI-readable files in ai/ from the same sources the docs use:
 * component metadata (*.meta.ts), TypeScript props, the token CSS and the MDX guides.
 *
 *   ai/components.json            index of every component
 *   ai/components/{id}.json       the machine contract: props, options, states, a11y, examples, tokens
 *   ai/components/{id}.md         the same guidance as prose, for reading
 *   ai/tokens.json                every token: purpose, default value, values per theme
 *   ai/foundations.json           compact always-on rules (scales, roles, themes, naming)
 *   ai/docs/{page}.md             Markdown copies of the guide and foundation pages
 *   ai/llms.txt                   index in the llms.txt format (copied to the site root)
 *
 * Run: npm run ai
 */
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import docgen from 'react-docgen-typescript';
import { componentMetaSchema, docsId, type ComponentMeta } from '../packages/react/src/meta';
import { defaultTheme, themeOptions, type Theme } from '../packages/tokens/src/theme';
import { loadTokens, resolveTheme } from '../packages/tokens/tools/resolve';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'ai');
const SITE = 'https://osama-eldrieny.github.io/design-system-ful-example';

const walk = (dir: string, match: (f: string) => boolean): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === 'node_modules' ? [] : walk(p, match);
    return match(p) ? [p] : [];
  });

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'components'), { recursive: true });
mkdirSync(join(out, 'docs'), { recursive: true });

// ---------------------------------------------------------------------------
// Tokens

const tokens = loadTokens();
const defaults = resolveTheme(tokens, defaultTheme);
const brandModes: Theme[] = themeOptions.brand.flatMap((brand) =>
  themeOptions.mode.map((mode) => ({ ...defaultTheme, brand, mode })),
);
const axisThemes = (Object.keys(themeOptions) as (keyof Theme)[])
  .filter((a) => a !== 'brand' && a !== 'mode')
  .flatMap((axis) => themeOptions[axis].map((v) => ({ ...defaultTheme, [axis]: v }) as Theme));
const variants = [...brandModes, ...axisThemes].map((t) => ({ t, r: resolveTheme(tokens, t) }));
const label = (t: Theme) =>
  (Object.keys(t) as (keyof Theme)[])
    .filter((a) => t[a] !== defaultTheme[a] || a === 'brand' || a === 'mode')
    .map((a) => `${a}=${t[a]}`)
    .join(',');

const tokenJson: Record<string, unknown> = {};
for (const name of tokens.names) {
  const d = defaults.get(name);
  if (!d) continue;
  const byTheme: Record<string, string> = {};
  for (const { t, r } of variants) {
    const v = r.get(name)?.resolved;
    if (v !== undefined && v !== d.resolved) byTheme[label(t)] = v;
  }
  tokenJson[name] = {
    description: d.chain.map((c) => tokens.describe(c)).find(Boolean) ?? null,
    references: d.chain[1] ?? null,
    default: d.resolved,
    ...(Object.keys(byTheme).length ? { byTheme } : {}),
  };
}
writeFileSync(
  join(out, 'tokens.json'),
  JSON.stringify({ defaultTheme, themeOptions, tokens: tokenJson }, null, 2) + '\n',
);

// ---------------------------------------------------------------------------
// Foundations: the small, always-on context (keep it short).

const scale = (re: RegExp) =>
  Object.fromEntries(
    tokens.names.filter((n) => re.test(n)).map((n) => [n, defaults.get(n)?.resolved]),
  );
const roles = Object.fromEntries(
  tokens.names
    .filter((n) => /^--color-(bg|fg|border|shadow)-/.test(n) && !/-\d{3,4}$/.test(n))
    .map((n) => [n, tokens.describe(n)]),
);
writeFileSync(
  join(out, 'foundations.json'),
  JSON.stringify(
    {
      rules: [
        'Import components from @ds/react; never recreate them with raw HTML/CSS.',
        'Use only props and values listed in ai/components/{id}.json.',
        'Style custom elements with semantic tokens (--color-*, --spacing-*, --radius-*); never hex values or px sizes.',
        'Component CSS uses only that component’s own tokens: --{component}-{variant}-{appearance?}-{state}-{property}.',
        'Every control needs a visible label or an accessible name; keep WCAG 2.2 AA.',
        'Theme with applyTheme() or <ThemeProvider>; never hardcode a brand or mode.',
      ],
      themes: {
        options: themeOptions,
        default: defaultTheme,
        how: 'data-* attributes on <html> or a ThemeProvider scope',
      },
      colorRoles: roles,
      spacing: scale(/^--spacing-/),
      radius: scale(/^--radius-(none|\d?x?[a-z]+)$/),
      shadow: scale(/^--shadow-(none|\d?x?[a-z]+)$/),
      typography: { ...scale(/^--font-size-/), ...scale(/^--font-family-(headings|body|action)$/) },
      motion: scale(/^--(duration|easing)-/),
      layers: scale(/^--z-/),
      tokenNaming: '--{component}-{variant}-{appearance?}-{state}-{property}',
    },
    null,
    2,
  ) + '\n',
);

// ---------------------------------------------------------------------------
// Components

const metaFiles = walk(join(root, 'packages/react/src'), (f) => f.endsWith('.meta.ts'));
const parser = docgen.withCustomConfig(join(root, 'packages/react/tsconfig.json'), {
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => !prop.parent || !/node_modules/.test(prop.parent.fileName),
});

const index: unknown[] = [];
// Compact prop data for the ESLint plugin (@ds/lint), which ships it inside the package.
const lintData: Record<
  string,
  { status: string; component: string; props: Record<string, string[]> }
> = {};
for (const file of metaFiles) {
  const meta: ComponentMeta = componentMetaSchema.parse(
    (await import(pathToFileURL(file).href)).default,
  );
  const dir = dirname(file);
  const sources = readdirSync(dir)
    .filter((f) => f.endsWith('.tsx') && !/\.(stories|test)\.tsx$/.test(f))
    .map((f) => join(dir, f));
  const docs = parser.parse(sources);
  const components = meta.imports.map((imp) => {
    const doc = docs.find((d) => d.displayName === imp.name);
    return {
      name: imp.name,
      import: `import { ${imp.name} } from '${imp.from}';`,
      description: doc?.description ?? '',
      props: Object.fromEntries(
        Object.values(doc?.props ?? {}).map((p) => [
          p.name,
          {
            type: p.type.raw ?? p.type.name,
            values: (p.type.value as { value: string }[] | undefined)?.map((v) =>
              v.value.replace(/"/g, ''),
            ),
            required: p.required,
            default: p.defaultValue?.value ?? null,
            description: p.description,
          },
        ]),
      ),
    };
  });
  const componentTokens = tokens.names.filter((n) =>
    meta.tokenPrefixes.some((p) => n.startsWith(p)),
  );
  const contract = {
    ...meta,
    components,
    tokens: Object.fromEntries(componentTokens.map((n) => [n, tokenJson[n]])),
    docs: `${SITE}/?path=/docs/${docsId(meta)}`,
  };
  writeFileSync(
    join(out, 'components', `${meta.id}.json`),
    JSON.stringify(contract, null, 2) + '\n',
  );
  writeFileSync(join(out, 'components', `${meta.id}.md`), componentMarkdown(meta, components));
  for (const c of components) {
    lintData[c.name] = {
      status: meta.status,
      component: meta.id,
      props: Object.fromEntries(
        Object.entries(c.props)
          .filter(([, p]) => Array.isArray(p.values) && p.values.length > 0)
          .map(([name, p]) => [name, p.values as string[]]),
      ),
    };
  }
  index.push({
    id: meta.id,
    name: meta.name,
    exports: meta.imports.map((i) => i.name),
    category: meta.category,
    status: meta.status,
    purpose: meta.description.split('. ')[0] + '.',
    contract: `ai/components/${meta.id}.json`,
  });
}
writeFileSync(join(out, 'components.json'), JSON.stringify({ components: index }, null, 2) + '\n');
writeFileSync(
  join(root, 'packages/lint/eslint/components.json'),
  JSON.stringify(lintData, null, 2) + '\n',
);

function componentMarkdown(
  meta: ComponentMeta,
  components: {
    name: string;
    import: string;
    props: Record<string, { type: string; default: string | null; description: string }>;
  }[],
) {
  const lines = [
    `# ${meta.name}`,
    '',
    `> ${meta.description}`,
    '',
    `Status: ${meta.status} · Category: ${meta.category} · Since ${meta.since}`,
    '',
    '```tsx',
    ...components.map((c) => c.import),
    '```',
    '',
    '## When to use',
    ...meta.whenToUse.map((t) => `- ${t}`),
    '',
    '## When not to use',
    ...meta.whenNotToUse.map((w) => `- ${w.text}${w.alternative ? ` Use ${w.alternative}.` : ''}`),
    '',
    ...meta.options.flatMap((o) => [
      `## ${o.title} (\`${o.prop}\`)`,
      ...o.values.map((v) => `- \`${v.value}\`: ${v.meaning}`),
      '',
    ]),
    '## States',
    ...meta.states.map((s) => `- **${s.name}**: ${s.meaning} (${s.trigger})`),
    '',
    '## Props',
    ...components.flatMap((c) => [
      `### ${c.name}`,
      '',
      '| Prop | Type | Default | Description |',
      '| --- | --- | --- | --- |',
      ...Object.entries(c.props).map(
        ([n, p]) =>
          `| \`${n}\` | \`${p.type.replace(/\|/g, '\\|')}\` | ${p.default ?? ''} | ${p.description.replace(/\n/g, ' ')} |`,
      ),
      '',
    ]),
    '## Guidelines',
    ...meta.guidelines.map((g) => `- Do: ${g.do} Don’t: ${g.dont} Why: ${g.why}`),
    '',
    '## Content',
    ...meta.content.map((c) => `- ${c}`),
    '',
    '## Accessibility',
    `- Role: ${meta.accessibility.role}`,
    ...meta.accessibility.keyboard.map((k) => `- ${k.keys}: ${k.action}`),
    ...meta.accessibility.aria.map((a) => `- \`${a.attribute}\`: ${a.when}`),
    `- Focus: ${meta.accessibility.focus}`,
    ...meta.accessibility.wcag.map((w) => `- WCAG ${w.criterion}: ${w.how}`),
    ...meta.accessibility.notes.map((n) => `- ${n}`),
    '',
    '## Examples',
    ...meta.examples.flatMap((e) => [
      `### ${e.title}`,
      e.description,
      '',
      '```tsx',
      e.code,
      '```',
      '',
    ]),
    `Tokens: ${meta.tokenPrefixes.map((p) => `\`${p}*\``).join(', ')} (values per theme in ai/components/${meta.id}.json).`,
    '',
  ];
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Guide and foundation pages as Markdown

const docsPages: { title: string; file: string; section: string }[] = [];
for (const file of walk(
  join(root, 'apps/docs/src'),
  (f) => f.endsWith('.mdx') && !f.includes('/components/'),
)) {
  const src = readFileSync(file, 'utf8');
  const title = src.match(/<Meta title="([^"]+)"/)?.[1] ?? basename(file, '.mdx');
  const md = src
    .replace(/^import .*$/gm, '')
    .replace(/^<Meta [^>]*\/>$/gm, '')
    .replace(/^<[A-Z][\s\S]*?\/>$/gm, '') // live blocks (tables and demos rendered from tokens)
    .replace(/^<([A-Z]\w*)[\s\S]*?<\/\1>$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const slug = relative(join(root, 'apps/docs/src'), file)
    .replace(/\.mdx$/, '')
    .toLowerCase();
  writeFileSync(join(out, 'docs', `${slug.replace(/\//g, '-')}.md`), md + '\n');
  docsPages.push({
    title,
    file: `ai/docs/${slug.replace(/\//g, '-')}.md`,
    section: title.split('/')[0],
  });
}

// ---------------------------------------------------------------------------
// llms.txt

const llms = [
  '# Panda Design System',
  '',
  '> Themeable, accessible React components (@ds/react) and CSS design tokens (@ds/tokens). Three brands (Diamond, Amber, Opal), light and dark, English and Arabic (RTL), two densities, three radius styles, four shadow levels. WCAG 2.2 AA in every theme.',
  '',
  'Use library components instead of raw HTML, only documented props, and tokens instead of raw values. Start with foundations.json for the always-on rules, then fetch a component’s contract before using it.',
  '',
  '## Components',
  ...(index as { id: string; name: string; purpose: string }[]).map(
    (c) =>
      `- [${c.name}](${SITE}/ai/components/${c.id}.md): ${c.purpose} Contract: ${SITE}/ai/components/${c.id}.json`,
  ),
  '',
  '## Foundations and guides',
  `- [Foundations (rules, scales, color roles)](${SITE}/ai/foundations.json): Always-on context.`,
  ...docsPages.map((p) => `- [${p.title}](${SITE}/${p.file})`),
  '',
  '## Tools',
  '- MCP server: `npx ds-mcp` (list_components, get_component, get_tokens, validate_code, …)',
  '- Validator: `npx ds-validate <files> --json`',
  `- [Everything in one file](${SITE}/llms-full.txt)`,
  '',
  '## Optional',
  `- [All tokens with values per theme](${SITE}/ai/tokens.json)`,
  `- [Component index](${SITE}/ai/components.json)`,
  `- [Interactive docs](${SITE}/)`,
  '',
];
writeFileSync(join(out, 'llms.txt'), llms.join('\n'));

// llms-full.txt: every guide and component page in one file, for one-shot loading.
const full = [
  llms.slice(0, 5).join('\n'),
  ...docsPages.map((p) => readFileSync(join(root, p.file), 'utf8')),
  ...(index as { id: string }[]).map((c) =>
    readFileSync(join(out, 'components', `${c.id}.md`), 'utf8'),
  ),
];
writeFileSync(join(out, 'llms-full.txt'), full.join('\n\n---\n\n'));

// DESIGN.md: a portable summary (default theme values + rules) for tools outside this repo.
const value = (name: string) => defaults.get(name)?.resolved ?? '';
const design = [
  '---',
  'name: Panda Design System',
  'theme: diamond / light / English / sans / round / comfortable / flat (default)',
  'colors:',
  ...[
    'bg-base',
    'bg-default',
    'bg-surface',
    'fg-on-surface-primary',
    'fg-on-surface-secondary',
    'bg-accent-primary-default',
    'fg-on-accent-primary-default',
    'bg-accent-danger-default',
    'bg-accent-success-default',
    'bg-accent-warning-default',
    'border-base',
  ].map((n) => `  ${n}: "${value(`--color-${n}`)}"`),
  'typography:',
  `  body: "${value('--font-family-body')}"`,
  ...['sm', 'md', 'lg', 'xl'].map((n) => `  size-${n}: "${value(`--font-size-${n}`)}"`),
  'spacing:',
  ...['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].map(
    (n) => `  ${n}: "${value(`--spacing-${n}`)}"`,
  ),
  'radius:',
  ...['sm', 'md', 'lg', 'xl'].map((n) => `  ${n}: "${value(`--radius-${n}`)}"`),
  '---',
  '',
  '# Panda Design System',
  '',
  'Generated by `npm run ai`. Values above are the default theme; every value is a CSS custom property',
  '(`--color-*`, `--font-*`, `--spacing-*`, `--radius-*`) that changes with the brand, mode, density,',
  'radius and shadow themes. In code, use the tokens and `@ds/react` components, not these literals.',
  '',
  '## Rules',
  '',
  ...(JSON.parse(readFileSync(join(out, 'foundations.json'), 'utf8')).rules as string[]).map(
    (r) => `- ${r}`,
  ),
  '',
  '## Components',
  '',
  ...(index as { name: string; category: string; purpose: string }[]).map(
    (c) => `- **${c.name}** (${c.category}): ${c.purpose}`,
  ),
  '',
];
writeFileSync(join(root, 'DESIGN.md'), design.join('\n'));

console.log(
  `AI files: ${index.length} components, ${tokens.names.length} tokens, ${docsPages.length} docs pages → ai/`,
);
