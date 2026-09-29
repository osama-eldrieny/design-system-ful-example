import { defineMeta } from '../meta';

export default defineMeta({
  id: 'search-field',
  name: 'SearchField',
  category: 'Forms',
  status: 'stable',
  since: '0.3.0',
  description:
    'A search field has a search icon, a clear button and an optional keyboard shortcut that focuses it from anywhere on the page. Enter searches and Escape clears. It is built on InputField.',
  imports: [{ name: 'SearchField', from: '@ds/react' }],
  whenToUse: [
    'To search or filter content on a page or across the site.',
    'In toolbars and headers, often with a shortcut such as / or ⌘K.',
  ],
  whenNotToUse: [
    { text: 'To pick a value from a known list.', alternative: 'Combobox or Select' },
    { text: 'For other single-line text.', alternative: 'InputField' },
  ],
  anatomy: [
    { name: 'Search icon', description: 'Decorative; signals the field’s purpose.' },
    { name: 'Field', description: 'An InputField of type search.' },
    { name: 'Shortcut hint', description: 'Shown while empty.', optional: true },
    { name: 'Clear button', description: 'Shown once there is text.' },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size (from InputField)',
      values: [
        { value: 'small', meaning: 'Toolbars and dense UI.' },
        { value: 'medium', meaning: 'Default.' },
        { value: 'large', meaning: 'Hero or page-level search.' },
      ],
    },
  ],
  states: [
    { name: 'Empty', meaning: 'Placeholder and shortcut hint.', trigger: '—' },
    { name: 'Filled', meaning: 'Clear button instead of the hint.', trigger: 'a query' },
    { name: 'Focus, hover, disabled', meaning: 'From InputField.', trigger: '—' },
  ],
  behavior: [
    {
      topic: 'Keyboard',
      text: 'Enter calls onSearch; Escape clears; the shortcut focuses the field (a single-key shortcut like / is ignored while typing in another field).',
    },
    {
      topic: 'Label',
      text: 'The label is visually hidden by default (“Search”) but always announced; set showLabel to show it.',
    },
    {
      topic: 'Shortcut',
      text: '“mod+k” means ⌘K on Mac and Ctrl+K elsewhere; exposed as aria-keyshortcuts.',
    },
  ],
  content: [
    'Placeholder: what can be searched, e.g. “Search products”.',
    'Wrap page-level search in a <search> element or role="search" landmark.',
  ],
  guidelines: [
    {
      do: 'Say what is searched in the placeholder or label.',
      dont: 'Write just “Type here”.',
      why: 'People need to know the scope of the search.',
    },
    {
      do: 'Use a familiar shortcut like / or ⌘K.',
      dont: 'Bind letters people type everywhere, like s.',
      why: 'Single-letter shortcuts clash with typing and assistive tech.',
    },
    {
      do: 'Show results as people type only when it’s fast.',
      dont: 'Run a slow search on every keystroke.',
      why: 'Laggy results are worse than pressing Enter.',
    },
  ],
  accessibility: {
    role: 'searchbox (input type="search").',
    keyboard: [
      { keys: 'Shortcut', action: 'Focuses the field.' },
      { keys: 'Enter', action: 'Searches.' },
      { keys: 'Escape', action: 'Clears the query.' },
    ],
    aria: [
      { attribute: 'aria-keyshortcuts', when: 'With shortcut.' },
      { attribute: 'aria-label on the clear button', when: 'From InputField (“Clear”).' },
    ],
    focus: 'Clearing returns focus to the field.',
    wcag: [
      {
        criterion: '2.1.4 Character Key Shortcuts',
        how: 'Single-key shortcuts only fire when not typing elsewhere.',
      },
      { criterion: '3.3.2 Labels or Instructions', how: 'Always has an accessible label.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Native search input.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Search',
      description: 'Searches on Enter.',
      code: `import { SearchField } from '@ds/react';

<SearchField placeholder="Search products" onSearch={(q) => navigate(\`/search?q=\${q}\`)} />`,
    },
    {
      id: 'shortcut',
      title: 'With a shortcut',
      description: '⌘K / Ctrl+K focuses it.',
      code: `import { SearchField } from '@ds/react';

<search>
  <SearchField placeholder="Search docs" shortcut="mod+k" />
</search>`,
    },
    {
      id: 'filter',
      title: 'Live filter',
      description: 'Controlled; filters as people type.',
      code: `import { SearchField } from '@ds/react';

<SearchField label="Filter orders" placeholder="Filter orders" value={q} onValueChange={setQ} size="small" />`,
    },
  ],
  tokenPrefixes: ['--search-field-'],
  related: [
    { id: 'input-field', relation: 'The field it is built on.' },
    { id: 'combobox', relation: 'To pick from suggestions.' },
  ],
  changelog: [{ version: '0.3.0', date: '2026-09-29', changes: ['New component.'] }],
});
