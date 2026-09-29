import { defineMeta } from '../meta';

export default defineMeta({
  id: 'textarea',
  name: 'Textarea',
  category: 'Forms',
  status: 'stable',
  since: '0.3.0',
  description:
    'A multi-line text field for longer answers such as messages, comments or descriptions. It has a label, help text, error and success messages, optional auto-resize and a character counter.',
  imports: [{ name: 'Textarea', from: '@ds/react' }],
  whenToUse: ['For answers longer than one line: messages, feedback, descriptions, addresses.'],
  whenNotToUse: [
    { text: 'For short, single-line answers.', alternative: 'InputField' },
    { text: 'For formatted text with bold, links or lists.', alternative: 'A rich-text editor' },
  ],
  anatomy: [
    { name: 'Label', description: 'From FormField; names the field.' },
    {
      name: 'Field',
      description: 'The text area; corners follow the radius theme but never become pills.',
    },
    { name: 'Description', description: 'Help text.', optional: true },
    { name: 'Counter', description: '“12 / 200”; announced after typing pauses.', optional: true },
    { name: 'Message', description: 'Error or success text.', optional: true },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Dense forms and tables.' },
        { value: 'medium', meaning: 'Default.' },
        { value: 'large', meaning: 'Prominent, e.g. a feedback form.' },
      ],
    },
    {
      prop: 'autoResize',
      title: 'Height',
      values: [
        { value: 'false', meaning: 'Fixed at rows lines; people can drag it taller. Default.' },
        { value: 'true', meaning: 'Grows with the text up to maxRows, then scrolls.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Empty or filled.', trigger: '—' },
    { name: 'Hover', meaning: 'Darker border.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Focus ring.', trigger: ':focus-visible' },
    { name: 'Error', meaning: 'Red border and message; aria-invalid.', trigger: 'error' },
    { name: 'Success', meaning: 'Green border and message.', trigger: 'success' },
    { name: 'Read-only', meaning: 'Tinted; can be selected, not edited.', trigger: 'readOnly' },
    { name: 'Disabled', meaning: 'Dimmed; not focusable.', trigger: 'disabled' },
  ],
  behavior: [
    {
      topic: 'Counter',
      text: 'showCount with maxLength shows “count / max”. The counter describes the field, and screen readers hear “N characters left” when typing pauses rather than on every key.',
    },
    {
      topic: 'Limit',
      text: 'maxLength stops typing at the limit; the counter turns red when it is reached.',
    },
    {
      topic: 'Auto-resize',
      text: 'Grows from rows to maxRows lines, then scrolls; manual resizing still works without autoResize.',
    },
  ],
  content: [
    'Label: what to write (“Message”), not an instruction.',
    'Description: what to include or leave out, e.g. “Don’t include passwords”.',
    'Set maxLength only when there is a real limit, and say it in the description if it’s short.',
  ],
  guidelines: [
    {
      do: 'Size the field for the expected answer with rows.',
      dont: 'Use a two-line box for a long description.',
      why: 'The size of the field hints how much to write.',
    },
    {
      do: 'Show a counter when there is a limit.',
      dont: 'Cut text silently at a hidden limit.',
      why: 'People need to know how much room is left.',
    },
    {
      do: 'Keep the label visible.',
      dont: 'Rely on placeholder text to explain the field.',
      why: 'Placeholders disappear while typing and often fail contrast.',
    },
  ],
  accessibility: {
    role: 'textbox (multi-line), labelled by FormField.',
    keyboard: [
      { keys: 'Tab', action: 'Moves into and out of the field.' },
      { keys: 'Enter', action: 'Adds a new line (it doesn’t submit the form).' },
    ],
    aria: [
      { attribute: 'aria-describedby', when: 'Help text, message and counter.' },
      { attribute: 'aria-invalid', when: 'With an error.' },
      { attribute: 'role="status"', when: 'Announces the characters left after typing pauses.' },
    ],
    focus: 'Focus ring around the field.',
    wcag: [
      {
        criterion: '3.3.2 Labels or Instructions',
        how: 'Always labelled; limits shown by the counter.',
      },
      {
        criterion: '4.1.3 Status Messages',
        how: 'The remaining count is announced without moving focus.',
      },
      { criterion: '1.4.10 Reflow', how: 'Full width of its container; no fixed width.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Message',
      description: 'Label and help text.',
      code: `import { Textarea } from '@ds/react';

<Textarea label="Message" description="Tell us how we can help." rows={4} />`,
    },
    {
      id: 'counter',
      title: 'With a limit',
      description: 'Counter and maxLength.',
      code: `import { Textarea } from '@ds/react';

<Textarea label="Bio" maxLength={160} showCount />`,
    },
    {
      id: 'auto',
      title: 'Auto-resize',
      description: 'Grows from 2 to 8 lines.',
      code: `import { Textarea } from '@ds/react';

<Textarea label="Comment" rows={2} autoResize maxRows={8} />`,
    },
  ],
  tokenPrefixes: ['--textarea-'],
  related: [
    { id: 'input-field', relation: 'For single-line answers.' },
    { id: 'form-field', relation: 'Provides the label and messages.' },
  ],
  changelog: [{ version: '0.3.0', date: '2026-09-29', changes: ['New component.'] }],
});
