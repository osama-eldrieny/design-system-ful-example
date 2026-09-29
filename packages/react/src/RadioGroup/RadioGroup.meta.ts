import { defineMeta } from '../meta';

export default defineMeta({
  id: 'radio-group',
  name: 'RadioGroup',
  category: 'Forms',
  status: 'stable',
  since: '0.2.0',
  description:
    'A radio group lets people pick exactly one option from a short list, with every option visible at once. RadioGroup holds the label and state; each Radio is one option.',
  imports: [
    { name: 'RadioGroup', from: '@ds/react' },
    { name: 'Radio', from: '@ds/react' },
  ],
  whenToUse: [
    'To choose one option from two to six that people should compare side by side.',
    'When the options need a short description each.',
  ],
  whenNotToUse: [
    { text: 'For more than about six options.', alternative: 'Select' },
    { text: 'To turn one setting on or off.', alternative: 'Switch' },
    { text: 'When several options can be chosen.', alternative: 'Checkbox group' },
    { text: 'To switch between views of content.', alternative: 'Tabs' },
  ],
  anatomy: [
    {
      name: 'Group label',
      description: 'Names the choice, e.g. "Time period"; announced with the group.',
    },
    { name: 'Control', description: 'Circle that fills with the brand accent when selected.' },
    { name: 'Option label', description: 'Names the option; clicking it selects the option.' },
    { name: 'Description', description: 'Optional detail under an option.', optional: true },
  ],
  options: [
    {
      prop: 'orientation',
      title: 'Orientation',
      values: [
        { value: 'vertical', meaning: 'Options stacked. Default; easiest to scan.' },
        { value: 'horizontal', meaning: 'Two or three short options in a row, e.g. Yes / No.' },
      ],
    },
  ],
  states: [
    { name: 'Unselected', meaning: 'Option not chosen.', trigger: 'Default.' },
    { name: 'Selected', meaning: 'The chosen option.', trigger: 'value matches the option.' },
    { name: 'Hover', meaning: 'Shows the option responds to the pointer.', trigger: ':hover.' },
    {
      name: 'Focus',
      meaning: 'Shows keyboard focus.',
      trigger: ':focus-visible; adds the focus ring.',
    },
    {
      name: 'Disabled',
      meaning: 'The option or group cannot be changed.',
      trigger: 'disabled on a Radio or the group.',
    },
    {
      name: 'Error',
      meaning: 'The choice is missing or invalid.',
      trigger: 'error prop on the group.',
    },
  ],
  behavior: [
    {
      topic: 'Keyboard',
      text: 'The group is one Tab stop. Arrow keys move the selection between options, skipping disabled ones.',
    },
    {
      topic: 'Default selection',
      text: 'Preselect the safest or most common option when there is one; leave all unselected when people must decide.',
    },
    {
      topic: 'Forms',
      text: 'With a name, the selected value submits in native forms; required prevents submitting without a choice.',
    },
    { topic: 'Right-to-left', text: 'Controls sit on the right of their labels in Arabic.' },
  ],
  content: [
    'Label the group with a noun or question: "Time period", "How should we contact you?".',
    'Keep option labels short, parallel and mutually exclusive.',
    'Order options logically: by size, time or likelihood, not alphabetically by default.',
  ],
  guidelines: [
    {
      do: 'Use a radio group when people must choose exactly one option.',
      dont: 'Use radios for independent on/off settings.',
      why: 'Radios are exclusive; independent settings belong in switches or checkboxes.',
    },
    {
      do: 'Give the group a label.',
      dont: 'Rely on a nearby heading that isn’t connected to the group.',
      why: 'Screen readers announce the group label before the options, giving them context.',
    },
    {
      do: 'Keep to six options or fewer.',
      dont: 'List a long set of options as radios.',
      why: 'Long lists are hard to scan; a Select saves space and keeps the choice clear.',
    },
  ],
  accessibility: {
    role: 'radiogroup containing radio items (Radix RadioGroup).',
    keyboard: [
      {
        keys: 'Tab / Shift+Tab',
        action: 'Moves focus into the group (to the selected option) and out.',
      },
      { keys: 'Arrow keys', action: 'Move to the next or previous option and select it.' },
      { keys: 'Space', action: 'Selects the focused option.' },
    ],
    aria: [
      { attribute: 'aria-labelledby', when: 'Links the group to its visible label.' },
      { attribute: 'aria-describedby', when: 'Links the group description and error message.' },
      { attribute: 'aria-invalid', when: 'Set when the group has an error.' },
      { attribute: 'aria-checked', when: 'Set on each radio from the selection.' },
    ],
    focus: 'Focus lands on the selected option (or the first) and shows the focus ring.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Group, option labels and descriptions are programmatically linked.',
      },
      {
        criterion: '1.4.11 Non-text Contrast',
        how: 'Unselected controls have a 3:1 boundary; the selected fill and dot keep 3:1.',
      },
      { criterion: '2.1.1 Keyboard', how: 'Arrow keys and Space, one Tab stop per group.' },
      {
        criterion: '3.3.1 Error Identification',
        how: 'The error text is shown and announced with the group.',
      },
      {
        criterion: '4.1.2 Name, Role, Value',
        how: 'Exposed as a radio group with named radios and their checked state.',
      },
    ],
    notes: ['The error is shown as text, not only as a red border.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Choose one',
      description: 'A controlled radio group with a label.',
      code: `import { RadioGroup, Radio } from '@ds/react';

<RadioGroup label="Time period" value={period} onValueChange={setPeriod}>
  <Radio value="today" label="Today" />
  <Radio value="week" label="This week" />
  <Radio value="month" label="This month" />
</RadioGroup>`,
    },
    {
      id: 'descriptions',
      title: 'Options with descriptions',
      description: 'Each option can explain itself.',
      code: `import { RadioGroup, Radio } from '@ds/react';

<RadioGroup label="Plan" defaultValue="pro">
  <Radio value="free" label="Free" description="1 project, community support" />
  <Radio value="pro" label="Pro" description="Unlimited projects, email support" />
</RadioGroup>`,
    },
    {
      id: 'error',
      title: 'Required with an error',
      description: 'Show what’s wrong when the choice is missing.',
      code: `import { RadioGroup, Radio } from '@ds/react';

<RadioGroup label="Delivery" required error="Choose a delivery option.">
  <Radio value="standard" label="Standard" />
  <Radio value="express" label="Express" />
</RadioGroup>`,
    },
  ],
  tokenPrefixes: ['--radio-'],
  related: [
    { id: 'select', relation: 'Use for longer lists of options.' },
    { id: 'switch', relation: 'Use for a single on/off setting.' },
    { id: 'checkbox', relation: 'Use when several options can be chosen.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Replaces RadioButton: RadioGroup and Radio with a group label, descriptions, error state, arrow-key navigation and RTL.',
        'Unselected controls now have a 3:1 boundary.',
      ],
    },
  ],
});
