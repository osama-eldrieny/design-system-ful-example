import { defineMeta } from '../meta';

export default defineMeta({
  id: 'inline',
  name: 'Inline',
  category: 'Layout',
  status: 'stable',
  since: '0.4.0',
  description:
    'Inline lays its children out in a row that wraps onto more lines, e.g. buttons, tags or form actions.',
  imports: [{ name: 'Inline', from: '@ds/react' }],
  whenToUse: ['For rows of buttons, tags, badges or metadata.'],
  whenNotToUse: [
    { text: 'For vertical layouts.', alternative: 'Stack' },
    { text: 'For equal-width cards.', alternative: 'Grid' },
  ],
  anatomy: [{ name: 'Children', description: 'In a row; wrap when needed.' }],
  options: [
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
      prop: 'justify',
      title: 'Distribution',
      values: [
        { value: 'start', meaning: 'Default.' },
        { value: 'center / end', meaning: 'Aligned.' },
        { value: 'between', meaning: 'Spread to both ends.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Layout only; not interactive.', trigger: '—' }],
  behavior: [
    { topic: 'Wrapping', text: 'Wraps by default, so rows never overflow narrow screens.' },
    { topic: 'Direction', text: 'Follows the reading direction (RTL).' },
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
      do: 'Keep wrapping on.',
      dont: 'Force long rows with wrap={false}.',
      why: 'Rows that can’t wrap overflow on phones.',
    },
  ],
  accessibility: {
    role: 'none (a div by default); use `as` for meaningful elements like ul or section.',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [{ attribute: 'none', when: 'Layout only.' }],
    focus: 'None.',
    wcag: [
      { criterion: '1.4.10 Reflow', how: 'Wraps instead of scrolling.' },
      { criterion: '1.3.2 Meaningful Sequence', how: 'Order follows the DOM.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'actions',
      title: 'Form actions',
      description: 'At the end.',
      code: 'import { Inline, Button } from \'@ds/react\';\n\n<Inline justify="end">\n  <Button appearance="outline">Cancel</Button>\n  <Button>Save</Button>\n</Inline>',
    },
    {
      id: 'tags',
      title: 'Tags',
      description: 'Wrapping.',
      code: 'import { Inline, Tag } from \'@ds/react\';\n\n<Inline gap="xs">{tags.map((t) => <Tag key={t}>{t}</Tag>)}</Inline>',
    },
    {
      id: 'between',
      title: 'Spread',
      description: 'Title and action.',
      code: 'import { Inline, Button } from \'@ds/react\';\n\n<Inline justify="between"><h2>Orders</h2><Button>New</Button></Inline>',
    },
  ],
  tokenPrefixes: ['--inline-'],
  related: [
    { id: 'stack', relation: 'For vertical layouts.' },
    { id: 'button-group', relation: 'For related buttons.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
