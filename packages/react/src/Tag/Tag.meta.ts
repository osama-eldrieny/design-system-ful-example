import { defineMeta } from '../meta';

export default defineMeta({
  id: 'tag',
  name: 'Tag',
  category: 'Feedback',
  status: 'stable',
  since: '0.4.0',
  description:
    'A tag labels an item with a keyword or category. Tags can be removable (e.g. applied filters) or selectable toggle chips (e.g. quick filters).',
  imports: [{ name: 'Tag', from: '@ds/react' }],
  whenToUse: [
    'To show keywords or categories on an item.',
    'To show applied filters people can remove.',
    'For quick filter chips people toggle on and off.',
  ],
  whenNotToUse: [
    { text: 'For a status or count.', alternative: 'Badge' },
    { text: 'To pick values inside a form field.', alternative: 'Combobox with multiple' },
  ],
  anatomy: [
    { name: 'Container', description: 'Rounded by the radius theme.' },
    { name: 'Icon', description: 'Decorative.', optional: true },
    { name: 'Text', description: 'The keyword.' },
    { name: 'Remove button', description: '“Remove {text}”.', optional: true },
  ],
  options: [
    {
      prop: 'tone',
      title: 'Tone',
      values: [
        { value: 'secondary', meaning: 'Neutral. Default.' },
        { value: 'primary', meaning: 'Brand emphasis.' },
        { value: 'success', meaning: 'Positive category.' },
        { value: 'warning', meaning: 'Caution category.' },
        { value: 'danger', meaning: 'Negative category.' },
      ],
    },
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'subtle', meaning: 'Tinted. Default.' },
        { value: 'solid', meaning: 'Filled.' },
      ],
    },
  ],
  states: [
    {
      name: 'Pressed',
      meaning: 'Selectable tag turned on: solid with a border.',
      trigger: 'selected',
    },
    {
      name: 'Focus',
      meaning: 'Focus ring on the toggle or remove button.',
      trigger: ':focus-visible',
    },
    { name: 'Disabled', meaning: 'Dimmed; buttons inactive.', trigger: 'disabled' },
  ],
  behavior: [
    {
      topic: 'Removable',
      text: 'onRemove adds a button named “Remove {text}”. Move focus somewhere sensible after removal.',
    },
    {
      topic: 'Selectable',
      text: 'selected/onSelectedChange make the tag a toggle button (aria-pressed).',
    },
  ],
  content: ['One to three words.', 'Use the same case and wording across a set.'],
  guidelines: [
    {
      do: 'Name remove buttons with the tag (default).',
      dont: 'Give every remove button the same name “Remove”.',
      why: 'Screen reader users need to know which tag they’re removing.',
    },
    {
      do: 'Show pressed state with the solid style (default).',
      dont: 'Show selection by color alone.',
      why: 'The border and fill change are visible without color perception.',
    },
    {
      do: 'Use Badge for statuses.',
      dont: 'Use removable tags for a status.',
      why: 'Statuses aren’t something people remove.',
    },
  ],
  accessibility: {
    role: 'text; with actions, contains buttons (toggle: aria-pressed).',
    keyboard: [
      { keys: 'Tab', action: 'Reaches the toggle and remove buttons.' },
      { keys: 'Enter / Space', action: 'Toggles or removes.' },
    ],
    aria: [
      { attribute: 'aria-pressed', when: 'Selectable tags.' },
      { attribute: 'aria-label', when: 'Remove button: “Remove {text}”.' },
    ],
    focus: 'Focus ring on each button.',
    wcag: [
      { criterion: '1.4.3 Contrast (Minimum)', how: 'Text passes on every tone in every theme.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Named buttons with pressed state.' },
      { criterion: '1.4.1 Use of Color', how: 'Pressed adds a border and fill.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Keywords',
      description: 'Static tags.',
      code: `import { Tag } from '@ds/react';\n\n<Tag>Design</Tag>\n<Tag tone="primary">React</Tag>`,
    },
    {
      id: 'remove',
      title: 'Applied filters',
      description: 'Removable.',
      code: `import { Tag } from '@ds/react';\n\n{filters.map((f) => (\n  <Tag key={f} onRemove={() => removeFilter(f)}>{f}</Tag>\n))}`,
    },
    {
      id: 'select',
      title: 'Filter chips',
      description: 'Toggle on and off.',
      code: `import { Tag } from '@ds/react';\n\n<Tag selected={onSale} onSelectedChange={setOnSale}>On sale</Tag>`,
    },
  ],
  tokenPrefixes: ['--tag-'],
  related: [
    { id: 'badge', relation: 'For statuses and counts.' },
    { id: 'combobox', relation: 'For choosing several values in a form.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
