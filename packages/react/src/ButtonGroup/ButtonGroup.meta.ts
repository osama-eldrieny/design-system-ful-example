import { defineMeta } from '../meta';

export default defineMeta({
  id: 'button-group',
  name: 'ButtonGroup',
  category: 'Actions',
  status: 'stable',
  since: '0.3.0',
  description:
    'A button group shows related action buttons together, spaced or attached into one control. It holds actions only; to pick one of a few options or views, use Tabs with the segmented appearance.',
  imports: [{ name: 'ButtonGroup', from: '@ds/react' }],
  whenToUse: [
    'For two to five related actions, e.g. Previous / Next or Bold / Italic / Underline.',
  ],
  whenNotToUse: [
    { text: 'To switch between panels of content.', alternative: 'Tabs' },
    {
      text: 'To pick one of a few options or views, e.g. Day / Week / Month.',
      alternative: 'Tabs (appearance="segmented")',
    },
    { text: 'To pick a value for a form.', alternative: 'RadioGroup' },
    { text: 'For many actions.', alternative: 'DropdownMenu' },
  ],
  anatomy: [
    { name: 'Group', description: 'Named by aria-label.' },
    {
      name: 'Buttons',
      description: 'Regular Buttons, each with its own action.',
    },
  ],
  options: [
    {
      prop: 'attached',
      title: 'Layout',
      values: [
        { value: 'false', meaning: 'Spaced buttons. Default.' },
        { value: 'true', meaning: 'Joined into one control; inner corners squared.' },
      ],
    },
    {
      prop: 'orientation',
      title: 'Orientation',
      values: [
        { value: 'horizontal', meaning: 'In a row. Default.' },
        { value: 'vertical', meaning: 'Stacked, full width.' },
      ],
    },
  ],
  states: [
    { name: 'Button states', meaning: 'Hover, focus and disabled come from Button.', trigger: '—' },
  ],
  behavior: [
    {
      topic: 'Focus',
      text: 'Every button is a Tab stop; in attached groups the focus ring stays above neighbours.',
    },
  ],
  content: ['Use short, parallel labels, or icons with aria-labels (IconButton).'],
  guidelines: [
    {
      do: 'Group only closely related actions.',
      dont: 'Put Save and Delete in one attached group.',
      why: 'Attached buttons read as one control; a destructive action needs space.',
    },
    {
      do: 'Name the group with aria-label.',
      dont: 'Leave a group of icon buttons unnamed.',
      why: 'The name tells screen reader users what the buttons control.',
    },
    {
      do: 'Use segmented Tabs to pick one of a few options.',
      dont: 'Use a button group as a selector.',
      why: 'Tabs expose the selection and support arrow-key navigation.',
    },
  ],
  accessibility: {
    role: 'group of buttons.',
    keyboard: [
      { keys: 'Tab', action: 'Moves between buttons.' },
      { keys: 'Enter / Space', action: 'Activates a button.' },
    ],
    aria: [{ attribute: 'role="group" + aria-label', when: 'Always.' }],
    focus: 'Each button shows its focus ring.',
    wcag: [{ criterion: '1.3.1 Info and Relationships', how: 'A named group.' }],
    notes: [],
  },
  examples: [
    {
      id: 'spaced',
      title: 'Spaced',
      description: 'Related actions.',
      code: `import { ButtonGroup, Button } from '@ds/react';

<ButtonGroup aria-label="Pages">
  <Button appearance="outline" variant="secondary">Previous</Button>
  <Button appearance="outline" variant="secondary">Next</Button>
</ButtonGroup>`,
    },
    {
      id: 'attached',
      title: 'Attached',
      description: 'Joined into one control.',
      code: `import { ButtonGroup, Button } from '@ds/react';

<ButtonGroup aria-label="Zoom" attached>
  <Button appearance="outline">−</Button>
  <Button appearance="outline">100%</Button>
  <Button appearance="outline">+</Button>
</ButtonGroup>`,
    },
    {
      id: 'icons',
      title: 'Icon buttons',
      description: 'A toolbar of related icon actions, each named with a label.',
      code: `import { ButtonGroup, IconButton } from '@ds/react';
import { Bold, Italic, Underline } from 'lucide-react';

<ButtonGroup aria-label="Text style" attached>
  <IconButton icon={<Bold />} label="Bold" variant="secondary" appearance="outline" />
  <IconButton icon={<Italic />} label="Italic" variant="secondary" appearance="outline" />
  <IconButton icon={<Underline />} label="Underline" variant="secondary" appearance="outline" />
</ButtonGroup>`,
    },
  ],
  tokenPrefixes: ['--button-group-'],
  related: [
    { id: 'button', relation: 'The buttons inside.' },
    {
      id: 'tabs',
      relation: 'For switching content panels, and (segmented) for picking one option.',
    },
  ],
  changelog: [
    { version: '0.3.0', date: '2026-09-29', changes: ['New component.'] },
    {
      version: '1.2.0',
      date: '2026-10-15',
      changes: [
        'Breaking: segmented selection (value, defaultValue, onValueChange) removed. Use Tabs with appearance="segmented".',
      ],
    },
  ],
});
