import { defineMeta } from '../meta';

export default defineMeta({
  id: 'grid',
  name: 'Grid',
  category: 'Layout',
  status: 'stable',
  since: '0.4.0',
  description:
    'Grid lays children out in equal columns: a fixed number, or as many as fit (auto), so it reflows on small screens.',
  imports: [{ name: 'Grid', from: '@ds/react' }],
  whenToUse: ['For card grids, galleries and dashboards.'],
  whenNotToUse: [
    { text: 'For tabular data.', alternative: 'Table' },
    { text: 'For a single row.', alternative: 'Inline' },
  ],
  anatomy: [{ name: 'Cells', description: 'Equal-width columns.' }],
  options: [
    {
      prop: 'stretch',
      title: 'Stretch',
      values: [
        {
          value: 'false',
          meaning: 'Steady column width, room for more items. Default; card grids.',
        },
        { value: 'true', meaning: 'Items share leftover space; form fields and stat rows.' },
      ],
    },
    {
      prop: 'gap',
      title: 'Gap',
      values: [
        {
          value: 'none … 3xl',
          meaning: 'Steps of the spacing scale; they shrink in compact density.',
        },
      ],
    },
    {
      prop: 'columns',
      title: 'Columns',
      values: [
        { value: 'auto', meaning: 'As many as fit at minItemWidth. Default; responsive.' },
        { value: 'n', meaning: 'Exactly n columns.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Layout only; not interactive.', trigger: '—' }],
  behavior: [
    {
      topic: 'Responsive',
      text: 'columns="auto" drops to fewer columns as space shrinks, down to one.',
    },
  ],
  content: ['Use layout components instead of margins on children.'],
  guidelines: [
    {
      do: 'Use gap steps from the scale.',
      dont: 'Add margins to children.',
      why: 'Gap keeps spacing consistent and density-aware.',
    },
    {
      do: 'Use `as` for meaning (ul, section).',
      dont: 'Use a div where a list is meant.',
      why: 'Semantics help assistive tech.',
    },
    {
      do: 'Prefer auto columns.',
      dont: 'Fix 4 columns on every screen.',
      why: 'Fixed columns get too narrow on phones.',
    },
  ],
  accessibility: {
    role: 'none (a div by default); use `as` for meaningful elements like ul or section.',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [{ attribute: 'none', when: 'Layout only.' }],
    focus: 'None.',
    wcag: [
      { criterion: '1.4.10 Reflow', how: 'Auto columns reflow to one column.' },
      { criterion: '1.3.2 Meaningful Sequence', how: 'Reading order follows the DOM.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'cards',
      title: 'Card grid',
      description: 'Auto columns.',
      code: 'import { Grid, ProductCard } from \'@ds/react\';\n\n<Grid minItemWidth="16rem">{products.map((p) => <ProductCard key={p.id} {...p} />)}</Grid>',
    },
    {
      id: 'fixed',
      title: 'Fixed columns',
      description: 'Dashboard.',
      code: 'import { Grid, Stat } from \'@ds/react\';\n\n<Grid columns={4} gap="lg">{stats}</Grid>',
    },
    {
      id: 'list',
      title: 'As a list',
      description: 'Semantics.',
      code: 'import { Grid } from \'@ds/react\';\n\n<Grid as="ul">{items}</Grid>',
    },
  ],
  tokenPrefixes: ['--grid-'],
  related: [
    { id: 'card', relation: 'Common grid content.' },
    { id: 'stack', relation: 'For vertical layouts.' },
  ],
  changelog: [
    {
      version: '1.1.0',
      date: '2026-09-29',
      changes: ['New stretch prop: auto-fit columns that share leftover space.'],
    },
    { version: '0.4.0', date: '2026-09-29', changes: ['New component.'] },
  ],
});
