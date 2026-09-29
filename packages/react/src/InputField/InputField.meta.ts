import { defineMeta } from '../meta';

export default defineMeta({
  id: 'input-field',
  name: 'InputField',
  category: 'Forms',
  status: 'stable',
  since: '0.2.0',
  description:
    'An input field lets people enter a single line of text: a name, an email address, a search term. It always has a label, and can show help text, an error or a success message, icons and a clear button.',
  imports: [{ name: 'InputField', from: '@ds/react' }],
  whenToUse: [
    'To enter short free-form text: names, emails, numbers, search terms.',
    'When the answer isn’t one of a known, short list of options.',
  ],
  whenNotToUse: [
    { text: 'For long or multi-line text.', alternative: 'Textarea' },
    { text: 'To choose from known options.', alternative: 'Select or RadioGroup' },
    { text: 'For dates.', alternative: 'DatePicker' },
  ],
  anatomy: [
    {
      name: 'Label',
      description: 'Says what to enter. Always present; can be visually hidden for search boxes.',
    },
    { name: 'Field', description: 'The bordered box that holds the text, icons and clear button.' },
    {
      name: 'Start icon',
      description: 'Optional icon hinting at the content, e.g. a mail icon.',
      optional: true,
    },
    { name: 'Input text', description: 'What the person typed, or the placeholder while empty.' },
    {
      name: 'Help text',
      description: 'Optional hint under the field; replaced visually by error or success.',
      optional: true,
    },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Dense UI: filters, tables, toolbars.' },
        { value: 'medium', meaning: 'Default for forms.' },
        { value: 'large', meaning: 'Prominent single-field forms, e.g. a hero search.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Ready for input.', trigger: 'At rest.' },
    {
      name: 'Hover',
      meaning: 'Shows the field responds to the pointer.',
      trigger: ':hover on the field.',
    },
    {
      name: 'Focus',
      meaning: 'The field is receiving input.',
      trigger: ':focus-within; brand border and focus ring.',
    },
    { name: 'Error', meaning: 'The value is missing or invalid.', trigger: 'error prop.' },
    { name: 'Success', meaning: 'The value was checked and is valid.', trigger: 'success prop.' },
    {
      name: 'Read-only',
      meaning: 'The value can be read and copied but not changed.',
      trigger: 'readOnly prop.',
    },
    {
      name: 'Disabled',
      meaning: 'The field isn’t available right now.',
      trigger: 'disabled prop.',
    },
  ],
  behavior: [
    {
      topic: 'Labels',
      text: 'The label is required by the API. Placeholders disappear while typing, so they never replace a label.',
    },
    {
      topic: 'Validation',
      text: 'Show errors after the person leaves the field or submits, not on every keystroke. The error text is announced with the field.',
    },
    {
      topic: 'Clear button',
      text: 'With clearable, a clear button appears while the controlled value isn’t empty; it calls onClear and returns focus to the field.',
    },
    {
      topic: 'Types',
      text: 'Use the right type (email, tel, url, search, number) so phones show the matching keyboard.',
    },
    {
      topic: 'Right-to-left',
      text: 'Icons and padding use logical sides, so the start icon sits on the right in Arabic.',
    },
  ],
  content: [
    'Labels are short nouns in sentence case: "Email address", not "Enter your email address:".',
    'Use placeholders for examples of the format ("name@company.com"), never for instructions people need later.',
    'Write errors that say how to fix the problem: "Enter an email address like name@company.com".',
    'Mark optional fields "(optional)" when most fields are required, or required fields with * when most are optional.',
  ],
  guidelines: [
    {
      do: 'Always give the field a label.',
      dont: 'Use the placeholder as the only label.',
      why: 'Placeholders vanish while typing and are not reliably announced.',
    },
    {
      do: 'Explain how to fix an error in words.',
      dont: 'Show only a red border.',
      why: 'Color alone is missed by people with color blindness and by screen readers.',
    },
    {
      do: 'Match the field width to the expected answer, e.g. short for a postal code.',
      dont: 'Stretch every field to the full width regardless of content.',
      why: 'Width hints at the expected length and makes forms easier to scan.',
    },
  ],
  accessibility: {
    role: 'textbox (native <input>) with a <label>.',
    keyboard: [
      {
        keys: 'Tab / Shift+Tab',
        action: 'Moves focus to and from the field (and to the clear button).',
      },
      { keys: 'Enter', action: 'Submits the surrounding form.' },
    ],
    aria: [
      { attribute: 'aria-invalid', when: 'Set automatically when there is an error.' },
      {
        attribute: 'aria-describedby',
        when: 'Links the help text and the error or success message.',
      },
      { attribute: 'aria-required', when: 'From the native required attribute.' },
      { attribute: 'aria-label on the clear button', when: 'From clearLabel (default "Clear").' },
    ],
    focus: 'The whole field shows the brand border and a focus ring while typing.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Label, help text and messages are programmatically tied to the input.',
      },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Text, placeholder and messages pass 4.5:1 in every theme.',
      },
      {
        criterion: '1.4.11 Non-text Contrast',
        how: 'The field border keeps 3:1 against the background.',
      },
      {
        criterion: '3.3.1 Error Identification',
        how: 'Errors are described in text and announced.',
      },
      {
        criterion: '3.3.2 Labels or Instructions',
        how: 'Every field has a label; the API requires it.',
      },
    ],
    notes: [
      'A visually hidden label is still announced; use hideLabel only when the purpose is obvious, e.g. search with a search icon.',
    ],
  },
  examples: [
    {
      id: 'basic',
      title: 'Labelled field',
      description: 'A controlled field with help text.',
      code: `import { InputField } from '@ds/react';

<InputField
  label="Email address"
  type="email"
  description="We’ll send the receipt here."
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`,
    },
    {
      id: 'error',
      title: 'Validation error',
      description: 'Say how to fix the problem.',
      code: `import { InputField } from '@ds/react';

<InputField
  label="Email address"
  type="email"
  required
  value={email}
  error={invalid ? 'Enter an email address like name@company.com.' : undefined}
  onChange={(e) => setEmail(e.target.value)}
/>`,
    },
    {
      id: 'search',
      title: 'Search with clear button',
      description: 'A search box with a hidden label, icon and clear button.',
      code: `import { InputField } from '@ds/react';
import { Search } from 'lucide-react';

<InputField
  label="Search products"
  hideLabel
  type="search"
  placeholder="Search products…"
  iconStart={<Search />}
  clearable
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
/>`,
    },
  ],
  tokenPrefixes: ['--input-field-'],
  related: [
    { id: 'textarea', relation: 'Use for multi-line text.' },
    { id: 'select', relation: 'Use to choose from known options.' },
    { id: 'form-field', relation: 'Wraps other controls with the same label and message layout.' },
  ],
  changelog: [
    {
      version: '1.1.0',
      date: '2026-09-29',
      changes: [
        'New optional prop: “(optional)” after the label, matching FormField and Textarea.',
      ],
    },
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Required label (with hideLabel), help text, error and success messages, required marker.',
        'Sizes, iconStart/iconEnd (replacing icon/prefix), clear button, read-only style.',
        'Typed text uses the primary text color; the border meets 3:1; keyboard focus ring.',
      ],
    },
  ],
});
