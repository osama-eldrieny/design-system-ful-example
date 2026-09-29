import { defineMeta } from '../meta';

export default defineMeta({
  id: 'container',
  name: 'Container',
  category: 'Layout',
  status: 'stable',
  since: '0.4.0',
  description:
    'Container centers page content with a maximum width and page gutters that follow density, with smaller gutters on phones.',
  imports: [{ name: 'Container', from: '@ds/react' }],
  whenToUse: ['To wrap page content so lines don’t get too long on wide screens.'],
  whenNotToUse: [
    { text: 'For spacing between items.', alternative: 'Stack or Inline' },
    { text: 'For boxed content.', alternative: 'Card' },
  ],
  anatomy: [{ name: 'Content', description: 'Centered with side padding.' }],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Reading width.' },
        { value: 'medium', meaning: 'Forms and articles.' },
        { value: 'large', meaning: 'Apps. Default.' },
        { value: 'full', meaning: 'No maximum.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Layout only; not interactive.', trigger: '—' }],
  behavior: [
    { topic: 'Gutters', text: 'Side padding follows density and shrinks on narrow screens.' },
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
      do: 'Use small for long text.',
      dont: 'Let paragraphs run the full screen width.',
      why: 'Long lines are hard to read.',
    },
  ],
  accessibility: {
    role: 'none (a div by default); use `as` for meaningful elements like ul or section.',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [{ attribute: 'none', when: 'Layout only.' }],
    focus: 'None.',
    wcag: [
      { criterion: '1.4.8 Visual Presentation', how: 'Small width keeps lines readable.' },
      { criterion: '1.4.10 Reflow', how: 'Full width on small screens with gutters.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'page',
      title: 'Page',
      description: 'Wrap a page.',
      code: 'import { Container } from \'@ds/react\';\n\n<Container as="main">…</Container>',
    },
    {
      id: 'article',
      title: 'Article',
      description: 'Reading width.',
      code: 'import { Container } from \'@ds/react\';\n\n<Container size="small" as="article">…</Container>',
    },
    {
      id: 'full',
      title: 'Full width',
      description: 'Dashboards.',
      code: 'import { Container } from \'@ds/react\';\n\n<Container size="full">…</Container>',
    },
  ],
  tokenPrefixes: ['--container-'],
  related: [{ id: 'grid', relation: 'Inside a container.' }],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
