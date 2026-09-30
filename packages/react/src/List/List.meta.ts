import { defineMeta } from '../meta';

export default defineMeta({
  id: 'list',
  name: 'List',
  category: 'Data display',
  status: 'stable',
  since: '0.4.0',
  description:
    'A list shows related items one per row, with an optional icon or avatar, a second line and trailing meta such as a date. Rows can be links or buttons.',
  imports: [
    { name: 'List', from: '@ds/react' },
    { name: 'ListItem', from: '@ds/react' },
  ],
  whenToUse: [
    'For files, people, notifications or settings.',
    'For navigation-like lists of records.',
  ],
  whenNotToUse: [
    { text: 'For data people compare across columns.', alternative: 'Table' },
    { text: 'For site navigation.', alternative: 'SideNav' },
  ],
  anatomy: [
    { name: 'Icon', description: 'Or an Avatar.', optional: true },
    { name: 'Title', description: 'Main text.' },
    { name: 'Description', description: 'Second line.', optional: true },
    { name: 'Meta', description: 'Trailing detail.', optional: true },
  ],
  options: [
    {
      prop: 'divided',
      title: 'Dividers',
      values: [
        { value: 'false', meaning: 'Spaced items. Default.' },
        { value: 'true', meaning: 'Lines between items.' },
      ],
    },
    {
      prop: 'ordered',
      title: 'Order',
      values: [
        { value: 'false', meaning: 'Bulleted meaning (ul). Default.' },
        { value: 'true', meaning: 'Numbered meaning (ol).' },
      ],
    },
  ],
  states: [
    { name: 'Hover', meaning: 'Interactive rows are tinted.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Focus ring on the row.', trigger: ':focus-visible' },
  ],
  behavior: [
    {
      topic: 'Interactive rows',
      text: 'With href the row is a link; with onClick a button. Meta sits outside so controls in it stay separate.',
    },
  ],
  content: ['Titles: short and scannable; put details in the description.'],
  guidelines: [
    {
      do: 'Make the whole row the target.',
      dont: 'Add a separate “Open” link per row.',
      why: 'One target per row is simpler to use.',
    },
    {
      do: 'Use Table for multiple attributes.',
      dont: 'Squeeze five columns into a list.',
      why: 'Tables align values for comparison.',
    },
    {
      do: 'Keep meta short.',
      dont: 'Put paragraphs in meta.',
      why: 'It’s for dates, counts and badges.',
    },
  ],
  accessibility: {
    role: 'list of list items; interactive rows are links or buttons.',
    keyboard: [
      { keys: 'Tab', action: 'Moves between interactive rows and meta controls.' },
      { keys: 'Enter', action: 'Opens the row.' },
    ],
    aria: [{ attribute: 'none', when: 'Native list semantics.' }],
    focus: 'Focus ring on rows.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Real list markup.' },
      { criterion: '2.4.4 Link Purpose', how: 'Row links are named by their text.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Files',
      description: 'With icons and dates.',
      code: 'import { List, ListItem } from \'@ds/react\';\nimport { FileText } from \'lucide-react\';\n\n<List divided>\n  <ListItem icon={<FileText />} title="Report.pdf" description="2.4 MB" meta="Today" href="/files/1" />\n</List>',
    },
    {
      id: 'people',
      title: 'People',
      description: 'With avatars.',
      code: 'import { List, ListItem, Avatar } from \'@ds/react\';\n\n<List>\n  <ListItem icon={<Avatar name="Sarah Chen" decorative />} title="Sarah Chen" description="Head of Products" />\n</List>',
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'With switches in meta.',
      code: 'import { List, ListItem, Switch } from \'@ds/react\';\n\n<ListItem title="Email updates" meta={<Switch aria-label="Email updates" />} />',
    },
  ],
  tokenPrefixes: ['--list-'],
  related: [
    { id: 'table', relation: 'For comparing attributes.' },
    { id: 'apps-notifications', relation: 'A pattern built on the same idea.' },
  ],
  changelog: [
    { version: '0.4.0', date: '2026-09-29', changes: ['New component.'] },
    {
      version: '1.1.0',
      date: '2026-09-30',
      changes: [
        'Bigger item icons (--list-icon-size: 22px).',
        'Slightly darker dividers (--list-divider-color), matching Table borders.',
      ],
    },
  ],
});
