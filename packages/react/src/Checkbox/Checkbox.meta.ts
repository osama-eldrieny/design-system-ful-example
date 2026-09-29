import { defineMeta } from '../meta';

export default defineMeta({
  id: 'checkbox',
  name: 'Checkbox',
  category: 'Forms',
  status: 'stable',
  since: '0.3.0',
  description:
    'A checkbox turns one option on or off, or lets people pick any number of options from a list. The choice applies when the form is submitted. CheckboxGroup puts several under one question with a single legend and error.',
  imports: [
    { name: 'Checkbox', from: '@ds/react' },
    { name: 'CheckboxGroup', from: '@ds/react' },
  ],
  whenToUse: [
    'To pick any number of options, including none, from a short list.',
    'For a single yes/no in a form, e.g. “I accept the terms”.',
    'For a select-all box over a list (indeterminate when some are selected).',
  ],
  whenNotToUse: [
    { text: 'When exactly one option must be chosen.', alternative: 'RadioGroup' },
    { text: 'For a setting that applies immediately.', alternative: 'Switch' },
    {
      text: 'For a long list of options.',
      alternative: 'Select or Combobox with multiple selection',
    },
  ],
  anatomy: [
    { name: 'Box', description: 'Ticked, empty or showing a dash (indeterminate).' },
    { name: 'Label', description: 'Clicking it toggles the box.' },
    { name: 'Description', description: 'Extra detail.', optional: true },
    {
      name: 'Error',
      description: 'For a single checkbox; groups show one error for all.',
      optional: true,
    },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: '14px box, small label; dense lists and tables.' },
        { value: 'medium', meaning: '16px box. Default.' },
        { value: 'large', meaning: '22px box; touch-first forms.' },
      ],
    },
    {
      prop: 'orientation',
      title: 'Orientation (on CheckboxGroup)',
      values: [
        { value: 'vertical', meaning: 'Options stacked. Default; easiest to scan.' },
        { value: 'horizontal', meaning: 'Two or three short options in a row; wraps when narrow.' },
      ],
    },
  ],
  states: [
    { name: 'Unchecked', meaning: 'Off.', trigger: '—' },
    { name: 'Checked', meaning: 'On: filled box with a tick.', trigger: ':checked' },
    {
      name: 'Indeterminate',
      meaning: 'Some, not all: a dash; announced as “mixed”.',
      trigger: 'indeterminate',
    },
    { name: 'Hover', meaning: 'Brand-colored border.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Focus ring around the box.', trigger: ':focus-visible' },
    { name: 'Error', meaning: 'Red border and message.', trigger: 'error' },
    { name: 'Disabled', meaning: 'Dimmed; can’t be changed.', trigger: 'disabled' },
  ],
  behavior: [
    {
      topic: 'Native input',
      text: 'A real <input type="checkbox"> sits on top of the drawn box, so forms, autofill, Space to toggle and screen readers work as usual.',
    },
    {
      topic: 'Groups',
      text: 'Inside CheckboxGroup, each Checkbox’s value is added to or removed from the group’s value array.',
    },
    {
      topic: 'Select all',
      text: 'Set indeterminate when some items are checked; clicking it then checks all (your handler decides).',
    },
  ],
  content: [
    'Labels: positive statements (“Email me updates”), not negatives (“Don’t email me”).',
    'Group legend: the question (“Which topics interest you?”).',
    'Order options logically: by frequency, alphabetically, or in a natural sequence.',
  ],
  guidelines: [
    {
      do: 'Use a CheckboxGroup with a legend for related options.',
      dont: 'Stack loose checkboxes under a paragraph.',
      why: 'The legend is announced with each option, so people know what they’re choosing.',
    },
    {
      do: 'Use a Switch for settings that apply at once.',
      dont: 'Save a checkbox immediately when it’s clicked.',
      why: 'People expect checkboxes to wait for Submit.',
    },
    {
      do: 'Make the label clickable (it is by default).',
      dont: 'Put the label in a separate element that doesn’t toggle.',
      why: 'The label is a much larger, easier target than the box.',
    },
  ],
  accessibility: {
    role: 'checkbox (native input); group is a fieldset with a legend.',
    keyboard: [
      { keys: 'Tab', action: 'Moves to the next checkbox.' },
      { keys: 'Space', action: 'Toggles the focused checkbox.' },
    ],
    aria: [
      { attribute: 'aria-checked="mixed"', when: 'Implied by the native indeterminate property.' },
      { attribute: 'aria-describedby', when: 'Description and error of a single checkbox.' },
      { attribute: 'aria-invalid', when: 'A single checkbox with an error.' },
    ],
    focus: 'Focus ring around the box.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Native checkbox, label and fieldset/legend.',
      },
      { criterion: '1.4.11 Non-text Contrast', how: 'Box borders meet 3:1 in every theme.' },
      { criterion: '2.5.8 Target Size', how: 'The label extends the click target.' },
      {
        criterion: '4.1.2 Name, Role, Value',
        how: 'Checked and mixed states come from the native input.',
      },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'single',
      title: 'Single checkbox',
      description: 'A yes/no in a form, with an error.',
      code: `import { Checkbox } from '@ds/react';

<Checkbox
  name="terms"
  label="I accept the terms and conditions"
  error={errors.terms && 'Accept the terms to continue.'}
  required
/>`,
    },
    {
      id: 'group',
      title: 'Group',
      description: 'Several choices under one legend.',
      code: `import { CheckboxGroup, Checkbox } from '@ds/react';

<CheckboxGroup label="Topics" name="topics" defaultValue={['design']}>
  <Checkbox value="design" label="Design" />
  <Checkbox value="engineering" label="Engineering" />
  <Checkbox value="research" label="Research" description="Studies and interviews" />
</CheckboxGroup>`,
    },
    {
      id: 'select-all',
      title: 'Select all',
      description: 'Indeterminate while some rows are selected.',
      code: `import { Checkbox } from '@ds/react';

const all = selected.length === rows.length;
<Checkbox
  label="Select all"
  checked={all}
  indeterminate={selected.length > 0 && !all}
  onCheckedChange={(on) => setSelected(on ? rows.map((r) => r.id) : [])}
/>`,
    },
  ],
  tokenPrefixes: ['--checkbox-'],
  related: [
    { id: 'radio-group', relation: 'When exactly one option must be chosen.' },
    { id: 'switch', relation: 'For settings that apply immediately.' },
    { id: 'form-field', relation: 'Provides the group’s legend and messages.' },
  ],
  changelog: [{ version: '0.3.0', date: '2026-09-29', changes: ['New component.'] }],
});
