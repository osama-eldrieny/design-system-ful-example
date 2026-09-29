import { defineMeta } from '../meta';

export default defineMeta({
  id: 'divider',
  name: 'Divider',
  category: 'Layout',
  status: 'stable',
  since: '0.4.0',
  description:
    'A divider is a thin line that separates groups of content, horizontally or vertically, optionally with a short label such as “or”.',
  imports: [{ name: 'Divider', from: '@ds/react' }],
  whenToUse: [
    'To separate groups in a list, menu or form.',
    'Between sign-in options, labelled “or”.',
  ],
  whenNotToUse: [
    { text: 'To separate page sections.', alternative: 'Spacing or headings' },
    { text: 'Between every list item.', alternative: 'List divided' },
  ],
  anatomy: [
    { name: 'Line', description: 'A hairline in the border color.' },
    { name: 'Label', description: 'Short centered text.', optional: true },
  ],
  options: [
    {
      prop: 'orientation',
      title: 'Orientation',
      values: [
        { value: 'horizontal', meaning: 'Between stacked content. Default.' },
        { value: 'vertical', meaning: 'Between items in a row.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Not interactive.', trigger: '—' }],
  behavior: [
    {
      topic: 'Semantics',
      text: 'A horizontal divider is an <hr> (separator); a labelled one is decorative text; a vertical one has role="separator".',
    },
  ],
  content: ['Labels: one short word.'],
  guidelines: [
    {
      do: 'Prefer spacing and headings.',
      dont: 'Put a divider between every block.',
      why: 'Too many lines add noise.',
    },
    {
      do: 'Keep labels to a word.',
      dont: 'Write a sentence in a divider.',
      why: 'Long labels are hard to read between lines.',
    },
    {
      do: 'Use vertical dividers in toolbars.',
      dont: 'Use a vertical divider as a page border.',
      why: 'It’s meant for small groups of items.',
    },
  ],
  accessibility: {
    role: 'separator (horizontal and vertical); none when labelled.',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [{ attribute: 'aria-orientation', when: 'vertical dividers.' }],
    focus: 'None.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Separators are exposed as such.' },
      {
        criterion: '1.4.11 Non-text Contrast',
        how: 'Dividers are decorative; groups are also separated by space.',
      },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Horizontal',
      description: 'Between groups.',
      code: "import { Divider } from '@ds/react';\n\n<Divider />",
    },
    {
      id: 'label',
      title: 'With a label',
      description: 'Between sign-in options.',
      code: 'import { Divider } from \'@ds/react\';\n\n<Divider label="or" />',
    },
    {
      id: 'vertical',
      title: 'Vertical',
      description: 'In a toolbar.',
      code: "import { Divider } from '@ds/react';\n\n<div style={{ display: 'flex' }}>…<Divider orientation=\"vertical\" />…</div>",
    },
  ],
  tokenPrefixes: ['--divider-'],
  related: [{ id: 'list', relation: 'Lists can draw their own dividers.' }],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
