import { defineMeta } from '../meta';

export default defineMeta({
  id: 'verification-code-input',
  name: 'VerificationCodeInput',
  category: 'Forms',
  status: 'stable',
  since: '1.1.0',
  description:
    'One box per character of a one-time code sent by email or SMS. Typing moves to the next box, Backspace goes back, pasting fills every box, and the browser can autofill codes from SMS.',
  imports: [{ name: 'VerificationCodeInput', from: '@ds/react' }],
  whenToUse: [
    'Two-factor sign-in and email or phone verification.',
    'Short fixed-length codes: 4 to 8 characters.',
  ],
  whenNotToUse: [
    { text: 'For passwords or long codes.', alternative: 'InputField' },
    { text: 'For codes whose length varies.', alternative: 'InputField' },
  ],
  anatomy: [
    { name: 'Label', description: 'Names the group, e.g. "Verification code".' },
    { name: 'Boxes', description: 'One input per character.' },
    { name: 'Separator', description: 'Optional dash splitting the boxes.', optional: true },
    {
      name: 'Description or error',
      description: 'Where the code was sent, or what went wrong.',
      optional: true,
    },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: '64px boxes, for dialogs and narrow screens.' },
        { value: 'medium', meaning: '80px boxes. Default.' },
        { value: 'large', meaning: '96px boxes, for a full-page verification step.' },
      ],
    },
    {
      prop: 'length',
      title: 'Length',
      values: [
        { value: '4', meaning: 'Short PINs.' },
        { value: '6', meaning: 'Default; most one-time codes.' },
      ],
    },
    {
      prop: 'mode',
      title: 'Mode',
      values: [
        { value: 'numeric', meaning: 'Digits only; opens the number keypad. Default.' },
        { value: 'text', meaning: 'Letters and digits.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Empty, ready.', trigger: 'At rest.' },
    { name: 'Hover', meaning: 'Pointer over a box.', trigger: ':hover' },
    { name: 'Focus', meaning: 'The box being typed in.', trigger: ':focus-visible' },
    { name: 'Filled', meaning: 'Characters entered.', trigger: 'value' },
    { name: 'Error', meaning: 'The code was wrong.', trigger: 'error prop.' },
    { name: 'Disabled', meaning: 'Not editable.', trigger: 'disabled prop.' },
  ],
  behavior: [
    {
      topic: 'Typing',
      text: 'Each character moves focus to the next box; typing into a filled box replaces it.',
    },
    {
      topic: 'Paste and autofill',
      text: 'Pasting fills from the current box on; the first box has autocomplete="one-time-code" so phones can fill it from SMS.',
    },
    {
      topic: 'Completion',
      text: 'onComplete fires once every box is filled, e.g. to submit automatically.',
    },
    {
      topic: 'Right-to-left',
      text: 'Codes read left to right in every language; arrow keys follow the visual order.',
    },
  ],
  content: [
    'Say where the code was sent: "Enter the code we sent to olivia@example.com".',
    'On error, say what to do next: "That code is wrong. Try again or resend it."',
  ],
  guidelines: [
    {
      do: 'Submit automatically with onComplete when the flow allows.',
      dont: 'Make people press Verify after the last digit when nothing else is needed.',
      why: 'Fewer steps for a routine task.',
    },
    {
      do: 'Offer a way to resend the code.',
      dont: 'Leave people stuck when the code expired.',
      why: 'Codes get lost or expire.',
    },
    {
      do: 'Use separatorAfter={3} for six-digit codes.',
      dont: 'Split codes in groups the sender didn’t use.',
      why: 'Matching the message makes copying easier.',
    },
  ],
  accessibility: {
    role: 'group (fieldset with legend); each box is a textbox.',
    keyboard: [
      { keys: 'Characters', action: 'Fill the box and move to the next.' },
      { keys: 'Backspace', action: 'Clear the box, or the previous one when empty.' },
      { keys: 'Arrow Left / Right', action: 'Move between boxes.' },
      { keys: 'Home / End', action: 'First or last box.' },
    ],
    aria: [
      {
        attribute: 'aria-label on each box',
        when: '"Character n of N"; override with digitLabel.',
      },
      { attribute: 'aria-invalid', when: 'On every box when error is set.' },
      { attribute: 'aria-describedby', when: 'Group points at the description and error.' },
    ],
    focus: 'Each box shows the focus ring; focus moves automatically as you type.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'fieldset and legend group the boxes.' },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Text meets 4.5:1 in every theme (checked in CI).',
      },
      { criterion: '3.3.1 Error Identification', how: 'The error is text, linked to the group.' },
    ],
    notes: ['Don’t time out silently; tell people when a code expired.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Six-digit code',
      description: 'Submits when complete.',
      code: `import { VerificationCodeInput } from '@ds/react';\n\n<VerificationCodeInput label="Verification code" onComplete={verify} />`,
    },
    {
      id: 'separator',
      title: 'With a separator',
      description: 'Two groups of three.',
      code: `import { VerificationCodeInput } from '@ds/react';\n\n<VerificationCodeInput label="Code" separatorAfter={3} size="small" />`,
    },
    {
      id: 'error',
      title: 'Error',
      description: 'A wrong code.',
      code: `import { VerificationCodeInput } from '@ds/react';\n\n<VerificationCodeInput label="Code" length={4} error="That code is wrong." />`,
    },
  ],
  tokenPrefixes: ['--verification-code-input-'],
  related: [{ id: 'input-field', relation: 'For any other text.' }],
  changelog: [{ version: '1.1.0', date: '2026-10-15', changes: ['New component.'] }],
});
