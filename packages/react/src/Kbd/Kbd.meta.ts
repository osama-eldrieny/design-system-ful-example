import { defineMeta } from '../meta';

export default defineMeta({
  id: 'kbd',
  name: 'Kbd',
  category: 'Data display',
  status: 'stable',
  since: '0.4.0',
  description:
    'Kbd shows a keyboard key or a shortcut, such as Ctrl + K, in text, menus and tooltips.',
  imports: [{ name: 'Kbd', from: '@ds/react' }],
  whenToUse: ['To show keyboard shortcuts in docs, menus and tooltips.'],
  whenNotToUse: [
    { text: 'For code.', alternative: 'Code' },
    { text: 'For buttons people click.', alternative: 'Button' },
  ],
  anatomy: [
    { name: 'Key', description: 'A key cap.' },
    { name: 'Plus', description: 'Joins keys of a combination.', optional: true },
  ],
  options: [
    {
      prop: 'keys',
      title: 'Keys',
      values: [
        { value: 'children', meaning: 'One key.' },
        { value: 'keys', meaning: "A combination, e.g. ['Ctrl', 'K']." },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Not interactive.', trigger: '—' }],
  behavior: [
    {
      topic: 'Semantics',
      text: 'Rendered as nested <kbd> elements, which screen readers read as text.',
    },
  ],
  content: ['Use the key’s name as printed: Ctrl, Shift, Enter, ⌘ on Mac.'],
  guidelines: [
    {
      do: 'Show platform keys (⌘ on Mac, Ctrl elsewhere).',
      dont: 'Show ⌘ to Windows users.',
      why: 'Wrong keys confuse people.',
    },
    { do: 'Use Kbd for keys only.', dont: 'Use Kbd for code.', why: 'Code has its own component.' },
    {
      do: 'Keep shortcuts short.',
      dont: 'Show four-key chords as the main way to do something.',
      why: 'Long shortcuts are hard to press and remember.',
    },
  ],
  accessibility: {
    role: 'text (kbd elements).',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [{ attribute: 'none', when: 'Keys are read as text.' }],
    focus: 'None.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Uses the kbd element.' },
      { criterion: '1.4.3 Contrast (Minimum)', how: 'Key text passes 4.5:1.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'single',
      title: 'One key',
      description: 'Escape.',
      code: "import { Kbd } from '@ds/react';\n\nPress <Kbd>Esc</Kbd> to close.",
    },
    {
      id: 'combo',
      title: 'Combination',
      description: 'Command K.',
      code: "import { Kbd } from '@ds/react';\n\n<Kbd keys={['Ctrl', 'K']} />",
    },
    {
      id: 'menu',
      title: 'In a menu',
      description: 'As a shortcut hint.',
      code: "import { DropdownMenuItem, Kbd } from '@ds/react';\n\n<DropdownMenuItem shortcut={<Kbd keys={['Ctrl', 'C']} />}>Copy</DropdownMenuItem>",
    },
  ],
  tokenPrefixes: ['--kbd-'],
  related: [
    { id: 'code', relation: 'For code.' },
    { id: 'search-field', relation: 'Shows its shortcut hint.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
