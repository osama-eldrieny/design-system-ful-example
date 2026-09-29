import { defineMeta } from '../meta';

export default defineMeta({
  id: 'form-field',
  name: 'FormField',
  category: 'Forms',
  status: 'stable',
  since: '0.3.0',
  description:
    'FormField puts a label, help text and an error or success message around a form control and wires them together, so screen readers announce the label, hint and error with the control. Library fields like Textarea use it internally; use it directly to build fields from other controls.',
  imports: [
    { name: 'FormField', from: '@ds/react' },
    { name: 'useFormField', from: '@ds/react' },
  ],
  whenToUse: [
    'To label a control that has no label of its own, e.g. a third-party date picker.',
    'To group related controls (switches, checkboxes) under one question with group.',
  ],
  whenNotToUse: [
    {
      text: 'Around InputField, Textarea or RadioGroup: they already include it.',
      alternative: 'The field’s own label, description and error props',
    },
    { text: 'For a heading over a whole form section.', alternative: 'A heading element' },
  ],
  anatomy: [
    { name: 'Label', description: 'Names the control (a legend for groups).' },
    {
      name: 'Required / optional marker',
      description: 'Asterisk or “(optional)” after the label.',
      optional: true,
    },
    { name: 'Control', description: 'Any input, or several for groups.' },
    { name: 'Description', description: 'Help text, announced with the control.', optional: true },
    {
      name: 'Message',
      description: 'Error or success text, announced with the control.',
      optional: true,
    },
  ],
  options: [
    {
      prop: 'group',
      title: 'Structure',
      values: [
        { value: 'false', meaning: 'One control: a label linked to it by id. Default.' },
        {
          value: 'true',
          meaning: 'Several controls answering one question: a fieldset and legend.',
        },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Label and optional help text.', trigger: '—' },
    { name: 'Error', meaning: 'Red message; control marked aria-invalid.', trigger: 'error' },
    { name: 'Success', meaning: 'Green confirmation message.', trigger: 'success' },
    { name: 'Disabled', meaning: 'Control (or the whole group) disabled.', trigger: 'disabled' },
  ],
  behavior: [
    {
      topic: 'Wiring',
      text: 'A single child element gets id, aria-describedby, aria-invalid, required and disabled merged in; props the child already sets win. For controls that need the props elsewhere, pass a function child.',
    },
    {
      topic: 'Custom controls',
      text: 'Inside a FormField, useFormField() returns the same control props.',
    },
    {
      topic: 'Groups',
      text: 'With group, the fieldset’s disabled disables every control inside; description and message describe the group.',
    },
  ],
  content: [
    'Label: a short noun phrase (“Email address”), not an instruction.',
    'Description: what or how to enter, e.g. “We’ll only use this for receipts”.',
    'Error: say what went wrong and how to fix it: “Enter a date in the future”.',
  ],
  guidelines: [
    {
      do: 'Give every control a visible label.',
      dont: 'Use placeholder text as the label.',
      why: 'Placeholders disappear while typing and often fail contrast.',
    },
    {
      do: 'Use group for a set of checkboxes or switches.',
      dont: 'Put a plain label above a group of controls.',
      why: 'A legend names the group for screen readers; a label can point at one control only.',
    },
    {
      do: 'Write errors that say how to fix the problem.',
      dont: 'Write “Invalid input”.',
      why: 'People need to know what to change.',
    },
  ],
  accessibility: {
    role: 'label + control, or fieldset (group) + legend.',
    keyboard: [{ keys: '—', action: 'From the control. Clicking the label focuses the control.' }],
    aria: [
      { attribute: 'aria-describedby', when: 'Points at the description and message.' },
      { attribute: 'aria-invalid', when: 'Set on the control when there is an error.' },
      {
        attribute: 'aria-hidden on the asterisk',
        when: 'The control’s required attribute already says it.',
      },
    ],
    focus: 'From the control.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Label, legend and descriptions are programmatically linked.',
      },
      {
        criterion: '3.3.1 Error Identification',
        how: 'Errors are text, linked to the control and marked aria-invalid.',
      },
      {
        criterion: '3.3.2 Labels or Instructions',
        how: 'Every control gets a label; help text is announced.',
      },
    ],
    notes: ['Explain the asterisk once per form, e.g. “Fields marked * are required”.'],
  },
  examples: [
    {
      id: 'custom',
      title: 'Label any control',
      description: 'The child gets id and the ARIA wiring.',
      code: `import { FormField } from '@ds/react';

<FormField label="Start date" description="The first day of your trip." required>
  <DatePicker />
</FormField>`,
    },
    {
      id: 'group',
      title: 'Group of switches',
      description: 'A fieldset with a legend.',
      code: `import { FormField, Switch } from '@ds/react';

<FormField group label="Email me about">
  <Switch label="Comments" defaultChecked />
  <Switch label="New followers" />
</FormField>`,
    },
    {
      id: 'render',
      title: 'Render function',
      description: 'Put the props where a third-party control needs them.',
      code: `import { FormField } from '@ds/react';

<FormField label="Country" error={errors.country}>
  {(control) => <CountrySelect inputProps={control} />}
</FormField>`,
    },
  ],
  tokenPrefixes: ['--form-field-'],
  related: [
    { id: 'textarea', relation: 'Built on FormField.' },
    { id: 'input-field', relation: 'Has the same label and messages built in.' },
  ],
  changelog: [
    { version: '0.3.0', date: '2026-09-29', changes: ['New component.'] },
    {
      version: '1.1.0',
      date: '2026-09-30',
      changes: [
        'Groups: help text sits under the legend, and more space separates the legend from the controls.',
      ],
    },
  ],
});
