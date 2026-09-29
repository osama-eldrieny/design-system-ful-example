import { defineMeta } from '../meta';

export default defineMeta({
  id: 'combobox',
  name: 'Combobox',
  category: 'Forms',
  status: 'stable',
  since: '0.3.0',
  description:
    'A combobox is a text field with a list of suggestions: people type to filter and pick one option, or several shown as removable chips. It works with local options or results fetched as people type.',
  imports: [{ name: 'Combobox', from: '@ds/react' }],
  whenToUse: [
    'To pick from a long list people will search, e.g. countries, users or products.',
    'To pick several options without a long checkbox list (multiple).',
    'For search-as-you-type against a server.',
  ],
  whenNotToUse: [
    { text: 'For a short list of known options.', alternative: 'Select or RadioGroup' },
    { text: 'For free-text search without picking a value.', alternative: 'SearchField' },
  ],
  anatomy: [
    { name: 'Label', description: 'From FormField.' },
    {
      name: 'Chips',
      description: 'Selected options in multiple mode, each removable.',
      optional: true,
    },
    { name: 'Input', description: 'Type to filter.' },
    { name: 'Toggle', description: 'Opens the full list.' },
    { name: 'List', description: 'Matching options, “No results” or “Loading…”.' },
  ],
  options: [
    {
      prop: 'multiple',
      title: 'Selection',
      values: [
        { value: 'false', meaning: 'One option; the input shows it. Default.' },
        { value: 'true', meaning: 'Several options as chips; the list stays open to pick more.' },
      ],
    },
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Dense UI.' },
        { value: 'medium', meaning: 'Default.' },
        { value: 'large', meaning: 'Prominent forms.' },
      ],
    },
  ],
  states: [
    { name: 'Open', meaning: 'List shown; chevron flips.', trigger: 'typing, ↓ or the toggle' },
    { name: 'Loading', meaning: '“Loading…” in the list.', trigger: 'loading' },
    { name: 'Empty', meaning: '“No results”.', trigger: 'no matches' },
    {
      name: 'Error / success',
      meaning: 'Border and message from FormField.',
      trigger: 'error / success',
    },
    { name: 'Disabled', meaning: 'Dimmed; can’t type or open.', trigger: 'disabled' },
  ],
  behavior: [
    {
      topic: 'Keyboard',
      text: '↓/↑ move through options, Enter picks, Escape closes (and clears on a second press), Backspace in an empty field focuses the last chip; Delete or Backspace on a chip removes it.',
    },
    {
      topic: 'Filtering',
      text: 'By default a case-insensitive “contains” on labels. For server results, pass filter={false}, drive inputValue/onInputChange and set loading while fetching.',
    },
    { topic: 'Announcements', text: 'The number of results is announced as the list changes.' },
    { topic: 'Forms', text: 'With name, each selected value is submitted as a hidden input.' },
  ],
  content: [
    'Placeholder: what to type, e.g. “Type a country”.',
    'Empty message: help people recover, e.g. “No countries match. Check the spelling.”',
  ],
  guidelines: [
    {
      do: 'Debounce server searches and show loading.',
      dont: 'Fetch on every keystroke with no feedback.',
      why: 'People need to know results are coming.',
    },
    {
      do: 'Use Select for short lists.',
      dont: 'Make people type to find one of five options.',
      why: 'A short list is faster to scan than to search.',
    },
    {
      do: 'Keep chips short and removable.',
      dont: 'Let a multiple combobox grow to dozens of chips.',
      why: 'Long chip lists are hard to review; use a separate list for many items.',
    },
  ],
  accessibility: {
    role: 'combobox input with a listbox (ARIA 1.2 pattern).',
    keyboard: [
      { keys: '↓ / ↑', action: 'Open and move through options.' },
      { keys: 'Enter', action: 'Pick the highlighted option.' },
      { keys: 'Escape', action: 'Close the list.' },
      { keys: 'Backspace / ← on chips', action: 'Move to and remove chips.' },
    ],
    aria: [
      {
        attribute: 'aria-expanded, aria-controls, aria-activedescendant',
        when: 'From Downshift on the input.',
      },
      { attribute: 'aria-labelledby', when: 'The input and list are named by the field label.' },
      { attribute: 'role="status"', when: 'Announces the number of results.' },
      { attribute: 'aria-label on chip buttons', when: '“Remove {option}”.' },
    ],
    focus: 'Focus stays in the input while moving through options.',
    wcag: [
      { criterion: '2.1.1 Keyboard', how: 'Everything works from the keyboard.' },
      {
        criterion: '4.1.2 Name, Role, Value',
        how: 'Labelled combobox and listbox; selected options marked.',
      },
      { criterion: '4.1.3 Status Messages', how: 'Result counts are announced.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'single',
      title: 'Single',
      description: 'Filter a local list.',
      code: `import { Combobox } from '@ds/react';

<Combobox label="Country" placeholder="Type a country" options={countries} onValueChange={setCountry} />`,
    },
    {
      id: 'multiple',
      title: 'Multiple',
      description: 'Chips for several choices.',
      code: `import { Combobox } from '@ds/react';

<Combobox multiple label="Skills" options={skills} defaultValue={['react']} name="skills" />`,
    },
    {
      id: 'async',
      title: 'Async results',
      description: 'Server-filtered options with loading.',
      code: `import { Combobox } from '@ds/react';

const [query, setQuery] = useState('');
const { data = [], isLoading } = useUsers(useDebounce(query, 250));

<Combobox
  label="Assignee"
  options={data.map((u) => ({ value: u.id, label: u.name }))}
  filter={false}
  inputValue={query}
  onInputChange={setQuery}
  loading={isLoading}
/>`,
    },
  ],
  tokenPrefixes: ['--combobox-'],
  related: [
    { id: 'select', relation: 'For short lists without typing.' },
    { id: 'search-field', relation: 'For free-text search.' },
    { id: 'checkbox', relation: 'For a few visible multiple choices.' },
  ],
  changelog: [{ version: '0.3.0', date: '2026-09-29', changes: ['New component.'] }],
});
