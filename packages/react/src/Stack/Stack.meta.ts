import { defineMeta } from '../meta';

export default defineMeta({
  id: 'stack',
  name: 'Stack',
  category: 'Layout',
  status: 'stable',
  since: '0.4.0',
  description:
    'Stack lays its children out vertically with even spacing from the density-aware spacing scale.',
  imports: [{ name: 'Stack', from: '@ds/react' }],
  whenToUse: ['For vertical rhythm: form fields, card content, page sections.'],
  whenNotToUse: [
    { text: 'For rows.', alternative: 'Inline' },
    { text: 'For columns of cards.', alternative: 'Grid' },
  ],
  anatomy: [{ name: 'Children', description: 'Stacked top to bottom.' }],
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
      prop: 'align',
      title: 'Alignment',
      values: [
        { value: 'stretch', meaning: 'Full width. Default.' },
        { value: 'start / center / end', meaning: 'Shrink to content.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Layout only; not interactive.', trigger: '—' }],
  behavior: [{ topic: 'Density', text: 'Gaps shrink in compact density.' }],
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
      do: 'Nest stacks for hierarchy (larger gaps outside).',
      dont: 'Use one gap everywhere.',
      why: 'Spacing expresses grouping.',
    },
  ],
  accessibility: {
    role: 'none (a div by default); use `as` for meaningful elements like ul or section.',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [{ attribute: 'none', when: 'Layout only.' }],
    focus: 'None.',
    wcag: [
      { criterion: '1.3.2 Meaningful Sequence', how: 'Visual order matches the DOM.' },
      { criterion: '1.4.10 Reflow', how: 'Content stacks naturally at any width.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'form',
      title: 'Form fields',
      description: 'Even spacing.',
      code: 'import { Stack, InputField, Button } from \'@ds/react\';\n\n<Stack gap="md">\n  <InputField label="Name" />\n  <InputField label="Email" />\n  <Button>Save</Button>\n</Stack>',
    },
    {
      id: 'list',
      title: 'As a list',
      description: 'Semantics.',
      code: 'import { Stack } from \'@ds/react\';\n\n<Stack as="ul" gap="xs">{items}</Stack>',
    },
    {
      id: 'center',
      title: 'Centered',
      description: 'Narrow items.',
      code: 'import { Stack } from \'@ds/react\';\n\n<Stack align="center">…</Stack>',
    },
  ],
  tokenPrefixes: ['--stack-'],
  related: [
    { id: 'inline', relation: 'For rows.' },
    { id: 'grid', relation: 'For grids.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
