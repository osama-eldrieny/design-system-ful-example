import { defineMeta } from '../meta';

export default defineMeta({
  id: 'table',
  name: 'Table',
  category: 'Data display',
  status: 'stable',
  since: '0.4.0',
  description:
    'A table shows rows and columns of data people compare: sortable columns, selectable rows with select-all, a sticky header, striped or compact rows, and loading and empty states. It is a real HTML table with a caption.',
  imports: [{ name: 'Table', from: '@ds/react' }],
  whenToUse: ['For records people scan, compare and act on: orders, users, invoices.'],
  whenNotToUse: [
    { text: 'For page layout.', alternative: 'Grid or Stack' },
    { text: 'For a simple list with one or two attributes.', alternative: 'List' },
  ],
  anatomy: [
    { name: 'Caption', description: 'Names the table (can be visually hidden).' },
    { name: 'Header', description: 'Column headings; sortable ones are buttons.' },
    { name: 'Select column', description: 'Row checkboxes and select-all.', optional: true },
    { name: 'Rows', description: 'Hover and selected tints.' },
  ],
  options: [
    {
      prop: 'selectable',
      title: 'Selection',
      values: [
        { value: 'false', meaning: 'No checkboxes. Default.' },
        {
          value: 'true',
          meaning: 'Row checkboxes plus select-all (mixed when some are selected).',
        },
      ],
    },
    {
      prop: 'compact',
      title: 'Density',
      values: [
        { value: 'false', meaning: 'Follows the density theme. Default.' },
        { value: 'true', meaning: 'Tighter rows for data-heavy screens.' },
      ],
    },
  ],
  states: [
    { name: 'Sorted', meaning: 'Arrow shows direction; aria-sort on the header.', trigger: 'sort' },
    { name: 'Selected', meaning: 'Row tinted; aria-selected.', trigger: 'selected' },
    { name: 'Loading', meaning: 'Skeleton rows; aria-busy.', trigger: 'loading' },
    { name: 'Empty', meaning: 'Message across the table.', trigger: 'no rows' },
  ],
  behavior: [
    {
      topic: 'Sorting',
      text: 'Clicking a sortable header cycles ascending → descending → unsorted. Use manualSort to sort on the server.',
    },
    {
      topic: 'Selection',
      text: 'Select-all checks every row shown; it’s mixed when some are selected.',
    },
    {
      topic: 'Overflow',
      text: 'Wide tables scroll horizontally in their frame; stickyHeader keeps headings visible when the frame has a height.',
    },
    { topic: 'Numbers', text: 'align="end" lines up digits (tabular numbers).' },
  ],
  content: [
    'Column headers: short nouns.',
    'Right-align numbers and money; keep units in the header.',
  ],
  guidelines: [
    {
      do: 'Give every table a caption (hide it if the page heading already says it).',
      dont: 'Leave tables unnamed.',
      why: 'The caption names the table for screen readers.',
    },
    {
      do: 'Align numbers to the end.',
      dont: 'Center or left-align money.',
      why: 'Aligned digits are easy to compare.',
    },
    {
      do: 'Paginate or virtualize long data.',
      dont: 'Render thousands of rows at once.',
      why: 'Huge tables are slow and hard to navigate.',
    },
  ],
  accessibility: {
    role: 'table with caption, column headers (scope="col") and sort state.',
    keyboard: [
      { keys: 'Tab', action: 'Reaches sort buttons and checkboxes.' },
      { keys: 'Enter / Space', action: 'Sorts or toggles selection.' },
    ],
    aria: [
      { attribute: 'aria-sort', when: 'On sortable headers.' },
      { attribute: 'aria-selected', when: 'On rows of a selectable table.' },
      { attribute: 'aria-busy', when: 'While loading.' },
    ],
    focus: 'Focus rings on sort buttons and checkboxes.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Native table semantics with headers and caption.',
      },
      { criterion: '1.4.10 Reflow', how: 'Scrolls in its own frame instead of the page.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Named checkboxes and sort state.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Orders',
      description: 'Sortable, with money aligned.',
      code: `import { Table } from '@ds/react';

<Table
  caption="Recent orders"
  columns={[
    { key: 'id', header: 'Order', sortable: true },
    { key: 'customer', header: 'Customer', sortable: true },
    { key: 'total', header: 'Total', align: 'end', sortable: true, render: (r) => \`$\${r.total}\` },
  ]}
  rows={orders}
/>`,
    },
    {
      id: 'select',
      title: 'Selectable',
      description: 'Bulk actions.',
      code: `import { Table } from '@ds/react';

<Table caption="Invoices" selectable selected={selected} onSelectionChange={setSelected}
  rowLabel={(r) => \`Select invoice \${r.id}\`} columns={columns} rows={invoices} />`,
    },
    {
      id: 'server',
      title: 'Server sorting',
      description: 'Loading while fetching.',
      code: `import { Table } from '@ds/react';

<Table caption="Users" hideCaption columns={columns} rows={data} loading={isLoading}
  manualSort sort={sort} onSortChange={setSort} stickyHeader />`,
    },
  ],
  tokenPrefixes: ['--table-'],
  related: [
    { id: 'list', relation: 'For simple lists.' },
    { id: 'pagination', relation: 'For long data sets.' },
    { id: 'checkbox', relation: 'Row selection.' },
  ],
  changelog: [
    { version: '0.4.0', date: '2026-09-29', changes: ['New component.'] },
    {
      version: '1.1.0',
      date: '2026-09-30',
      changes: ['Slightly darker cell borders (--table-border-color), so rows read clearly.'],
    },
  ],
});
