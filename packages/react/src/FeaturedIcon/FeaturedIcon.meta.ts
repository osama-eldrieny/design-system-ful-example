import { defineMeta } from '../meta';

export default defineMeta({
  id: 'featured-icon',
  name: 'FeaturedIcon',
  category: 'Data display',
  status: 'stable',
  since: '1.1.0',
  description:
    'An icon in a colored circle or tile that draws the eye and sets the tone of a block: the top of a modal, an empty state, an alert, a metric card or a feature list. Four appearances, thirteen colors and four sizes.',
  imports: [{ name: 'FeaturedIcon', from: '@ds/react' }],
  whenToUse: [
    'At the top of a modal or empty state, to signal its kind (success, warning, delete).',
    'In metric cards and feature lists, to make each item recognizable at a glance.',
    'Next to a notification or activity item, when there is no avatar.',
  ],
  whenNotToUse: [
    { text: 'For a clickable icon.', alternative: 'IconButton' },
    { text: 'For a person or team.', alternative: 'Avatar' },
    { text: 'For a small inline status.', alternative: 'Badge with withDot' },
  ],
  anatomy: [
    { name: 'Container', description: 'Circle or rounded square, tinted, filled or outlined.' },
    { name: 'Icon', description: 'Any icon; sized by the size option.' },
    {
      name: 'Rings',
      description: 'Outline appearance only: two faint concentric rings.',
      optional: true,
    },
  ],
  options: [
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'light', meaning: 'Tinted background, colored icon. Default.' },
        { value: 'solid', meaning: 'Filled, for the strongest emphasis.' },
        { value: 'outline', meaning: 'Concentric rings, e.g. in a toast or alert.' },
        { value: 'modern', meaning: 'Neutral tile with a border; works on any surface.' },
      ],
    },
    {
      prop: 'tone',
      title: 'Color',
      values: [
        { value: 'primary', meaning: 'Brand. Default.' },
        { value: 'success | warning | danger', meaning: 'Outcome of an action.' },
        { value: 'secondary', meaning: 'Neutral.' },
        {
          value: 'gray | blue | sky | indigo | purple | pink | orange | teal',
          meaning: 'Categories, e.g. one hue per metric.',
        },
      ],
    },
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: '32px, in lists and notifications.' },
        { value: 'medium', meaning: '40px. Default, in cards.' },
        { value: 'large', meaning: '48px, at the top of modals.' },
        { value: 'xlarge', meaning: '56px, in empty states.' },
      ],
    },
    {
      prop: 'shape',
      title: 'Shape',
      values: [
        { value: 'circle', meaning: 'Default.' },
        { value: 'square', meaning: 'Rounded square, follows the radius theme.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Not interactive.', trigger: '—' }],
  behavior: [
    {
      topic: 'Themes',
      text: 'Colors follow brand and mode; category hues are the same in every brand. The square shape follows the radius theme.',
    },
  ],
  content: [
    'Pick an icon that matches the heading next to it, e.g. a trash can for "Delete project?".',
    'Use the same tone as the action: danger for destructive dialogs, success for completion.',
  ],
  guidelines: [
    {
      do: 'Use one featured icon per block.',
      dont: 'Put featured icons on every list item in a dense table.',
      why: 'They draw attention; too many and nothing stands out.',
    },
    {
      do: 'Match the tone to the meaning (danger for delete).',
      dont: 'Use danger red as decoration.',
      why: 'Color carries meaning across the system.',
    },
    {
      do: 'Give it a label when nothing nearby says what it means.',
      dont: 'Label it when a heading next to it already says the same.',
      why: 'Screen readers would read the same thing twice.',
    },
  ],
  accessibility: {
    role: 'None (hidden) by default; img with label.',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [
      { attribute: 'aria-hidden="true"', when: 'Default: decorative.' },
      { attribute: 'role="img" + aria-label', when: 'When label is set.' },
    ],
    focus: 'Not focusable.',
    wcag: [
      {
        criterion: '1.4.11 Non-text Contrast',
        how: 'Icon colors meet 3:1 on their background in every brand and mode (checked in CI).',
      },
    ],
    notes: ['Don’t rely on the color alone: the icon shape and nearby text carry the meaning.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'A tinted icon in a card.',
      code: `import { FeaturedIcon } from '@ds/react';\nimport { Zap } from 'lucide-react';\n\n<FeaturedIcon icon={<Zap />} />`,
    },
    {
      id: 'delete',
      title: 'Delete dialog',
      description: 'Danger, large, at the top of a confirm dialog.',
      code: `import { FeaturedIcon } from '@ds/react';\nimport { Trash2 } from 'lucide-react';\n\n<FeaturedIcon icon={<Trash2 />} tone="danger" size="large" />`,
    },
    {
      id: 'modern',
      title: 'Modern tile',
      description: 'Neutral, for metric cards.',
      code: `import { FeaturedIcon } from '@ds/react';\nimport { Users } from 'lucide-react';\n\n<FeaturedIcon icon={<Users />} appearance="modern" shape="square" />`,
    },
  ],
  tokenPrefixes: ['--featured-icon-'],
  related: [
    { id: 'empty-state', relation: 'Uses a featured icon at the top.' },
    { id: 'modal', relation: 'Shows one in its header.' },
    { id: 'avatar', relation: 'For people instead of things.' },
  ],
  changelog: [{ version: '1.1.0', date: '2026-10-15', changes: ['New component.'] }],
});
