import { defineMeta } from '../meta';

export default defineMeta({
  id: 'filter-bar',
  name: 'FilterBar',
  category: 'Forms',
  status: 'stable',
  since: '1.2.0',
  description:
    'A toolbar for narrowing a list or table: an optional search, one menu per filter with checkable options, and the chosen values as removable chips with Clear all.',
  imports: [
    { name: 'FilterBar', from: '@ds/react' },
    { name: 'FilterDefinition', from: '@ds/react' },
    { name: 'FilterValue', from: '@ds/react' },
  ],
  whenToUse: [
    'Above a table or list that people narrow by a few attributes, e.g. status and owner.',
    'When several values of the same filter can apply at once.',
  ],
  whenNotToUse: [
    { text: 'To switch between a few fixed views.', alternative: 'Tabs' },
    { text: 'For a single filter with two or three values.', alternative: 'SegmentedControl' },
    { text: 'For search alone.', alternative: 'SearchField' },
  ],
  anatomy: [
    { name: 'Search', description: 'A SearchField at the start of the bar.', optional: true },
    { name: 'Trigger', description: 'Opens a filter’s menu; shows how many values are chosen.' },
    { name: 'Menu', description: 'Checkable options for one filter (a DropdownMenu).' },
    { name: 'End', description: 'A result count or sort menu at the end.', optional: true },
    { name: 'Chips', description: 'One removable Tag per chosen value, then Clear all.', optional: true },
  ],
  options: [
    {
      prop: 'showChips',
      title: 'Chips',
      values: [
        { value: 'true', meaning: 'Default. Chosen values show as removable chips under the bar.' },
        { value: 'false', meaning: 'Counts on the triggers only, for tight spaces.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'No values chosen for the filter.', trigger: '—' },
    { name: 'Hover', meaning: 'The trigger responds to the pointer.', trigger: ':hover.' },
    { name: 'Focus', meaning: 'Shows keyboard focus on a trigger.', trigger: ':focus-visible.' },
    { name: 'Open', meaning: 'The filter’s menu is open; the chevron flips.', trigger: 'Click or Enter.' },
    { name: 'Active', meaning: 'The filter has chosen values; tinted with a count.', trigger: 'value has entries.' },
  ],
  behavior: [
    { topic: 'Choosing', text: 'Menus stay open while options are checked, so several values can be chosen at once.' },
    {
      topic: 'Controlled or not',
      text: 'Pass value and onValueChange to control the filters (e.g. to sync with the URL), or defaultValue.',
    },
    { topic: 'Removing', text: 'Each chip removes its value; Clear all removes every value.' },
    { topic: 'Narrow screens', text: 'The bar wraps; search takes the first row.' },
  ],
  content: [
    'Name filters with nouns: "Status", "Owner".',
    'Chips read "Filter: value" so they make sense on their own.',
    'Show the number of results in end so people see the effect.',
  ],
  guidelines: [
    {
      do: 'Show the result count next to the filters.',
      dont: 'Leave people guessing whether a filter changed anything.',
      why: 'Immediate feedback confirms the filter applied.',
    },
    {
      do: 'Keep to three to five filters.',
      dont: 'Put every column of the table in the bar.',
      why: 'Too many triggers wrap into a wall of buttons.',
    },
    {
      do: 'Keep chips on when filters can be combined.',
      dont: 'Hide what is filtered in narrow layouts without a count.',
      why: 'People forget active filters and think data is missing.',
    },
  ],
  accessibility: {
    role: 'toolbar, named by label; each filter is a menu button with checkbox items.',
    keyboard: [
      { keys: 'Tab', action: 'Moves between search, triggers, chips and Clear all.' },
      { keys: 'Enter / Space / Down', action: 'Opens a filter’s menu.' },
      { keys: 'Up / Down', action: 'Move between options in the menu.' },
      { keys: 'Enter / Space', action: 'Checks or unchecks an option.' },
      { keys: 'Escape', action: 'Closes the menu and returns focus to its trigger.' },
    ],
    aria: [
      { attribute: 'aria-label', when: 'On the toolbar, from label.' },
      { attribute: 'aria-expanded', when: 'On each trigger, set by the menu.' },
      { attribute: 'menuitemcheckbox', when: 'Each option, with aria-checked.' },
    ],
    focus: 'Triggers show a focus ring; focus returns to the trigger when its menu closes.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Counts are announced with the trigger name, e.g. "Status, 2 selected".' },
      { criterion: '2.1.1 Keyboard', how: 'Menus and chips work fully from the keyboard.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Options expose their checked state.' },
    ],
    notes: ['Active filters are shown by count and chips, not only by tint.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Invoice filters',
      description: 'Search, two filters and a result count.',
      code: `import { FilterBar, SearchField } from '@ds/react';

<FilterBar
  label="Filter invoices"
  search={<SearchField placeholder="Search invoices" />}
  filters={[
    { id: 'status', label: 'Status', options: [{ value: 'paid', label: 'Paid' }, { value: 'due', label: 'Due' }] },
    { id: 'owner', label: 'Owner', options: [{ value: 'lana', label: 'Lana' }, { value: 'omar', label: 'Omar' }] },
  ]}
  end={<span>24 results</span>}
/>`,
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'Keeps filters in state, e.g. to sync them with the URL.',
      code: `import { FilterBar } from '@ds/react';

<FilterBar label="Filter" filters={filters} value={value} onValueChange={setValue} />`,
    },
    {
      id: 'no-chips',
      title: 'Without chips',
      description: 'Counts on the triggers only.',
      code: `import { FilterBar } from '@ds/react';

<FilterBar label="Filter" filters={filters} showChips={false} />`,
    },
  ],
  tokenPrefixes: ['--filter-bar-'],
  related: [
    { id: 'dropdown-menu', relation: 'Each filter’s menu.' },
    { id: 'tag', relation: 'The removable chips.' },
    { id: 'search-field', relation: 'The search at the start.' },
  ],
  changelog: [{ version: '1.2.0', date: '2026-10-15', changes: ['New component.'] }],
});
