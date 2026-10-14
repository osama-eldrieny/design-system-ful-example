import { defineMeta } from '../meta';

export default defineMeta({
  id: 'command-menu',
  name: 'CommandMenu',
  category: 'Overlays',
  status: 'stable',
  since: '1.1.0',
  description:
    'A searchable list of pages and actions in a dialog, opened with ⌘K (Ctrl+K): type to filter, arrow keys to move, Enter to run. Groups, icons, descriptions and shortcut hints.',
  imports: [{ name: 'CommandMenu', from: '@ds/react' }],
  whenToUse: [
    'Fast navigation and actions in apps with many pages.',
    'A global search over records, with results grouped by type.',
  ],
  whenNotToUse: [
    { text: 'For a few actions on one item.', alternative: 'DropdownMenu' },
    { text: 'For choosing a form value.', alternative: 'Combobox' },
  ],
  anatomy: [
    { name: 'Search field', description: 'Filters the results as you type.' },
    { name: 'Group label', description: 'E.g. "Pages", "Actions".' },
    { name: 'Item', description: 'Icon, label, description and shortcut hint.' },
    { name: 'Empty state', description: 'When nothing matches.', optional: true },
    { name: 'Footer', description: 'Key hints.', optional: true },
  ],
  options: [
    {
      prop: 'hotkey',
      title: 'Hotkey',
      values: [
        { value: 'true', meaning: '⌘K / Ctrl+K toggles the menu anywhere. Default.' },
        { value: 'false', meaning: 'Open it yourself, e.g. from a search button.' },
      ],
    },
  ],
  states: [
    { name: 'Closed', meaning: 'Hidden.', trigger: 'Default.' },
    { name: 'Open', meaning: 'Dialog with focus in the search.', trigger: '⌘K or open.' },
    {
      name: 'Active item',
      meaning: 'Highlighted; Enter runs it.',
      trigger: 'Arrow keys or pointer.',
    },
    { name: 'Empty', meaning: 'Nothing matches.', trigger: 'Search text.' },
  ],
  behavior: [
    { topic: 'Matching', text: 'Matches the label, description and keywords, ignoring case.' },
    { topic: 'Running', text: 'Choosing an item runs onSelect and closes the menu.' },
    { topic: 'Server results', text: 'Use onSearchChange to fetch results and pass new groups.' },
  ],
  content: [
    'Name items as pages ("Orders") or verbs ("New invoice").',
    'Add keywords for synonyms people might type.',
  ],
  guidelines: [
    {
      do: 'Offer a visible search button too.',
      dont: 'Rely on the hotkey alone.',
      why: 'Not everyone knows ⌘K.',
    },
    {
      do: 'Group results by type.',
      dont: 'Mix pages, people and actions in one list.',
      why: 'Groups make long lists scannable.',
    },
    {
      do: 'Keep shortcut hints accurate.',
      dont: 'Show shortcuts that do nothing.',
      why: 'Hints teach faster paths.',
    },
  ],
  accessibility: {
    role: 'dialog with a combobox search field controlling a listbox of options.',
    keyboard: [
      { keys: '⌘K / Ctrl+K', action: 'Opens and closes.' },
      { keys: 'Arrow Up / Down', action: 'Moves between results.' },
      { keys: 'Home / End', action: 'First or last result.' },
      { keys: 'Enter', action: 'Runs the active result.' },
      { keys: 'Escape', action: 'Closes.' },
    ],
    aria: [
      { attribute: 'aria-activedescendant', when: 'Points the search field at the active option.' },
      { attribute: 'role="group" + label', when: 'Each result group.' },
    ],
    focus:
      'Focus stays in the search field; the active option is highlighted. Focus returns on close.',
    wcag: [
      { criterion: '2.1.1 Keyboard', how: 'Everything works from the keyboard.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Combobox and listbox semantics.' },
    ],
    notes: ['⌘K is a convention, not an operating system shortcut; avoid conflicts in your app.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Pages and actions',
      description: 'Opens with ⌘K.',
      code: `import { CommandMenu } from '@ds/react';\n\n<CommandMenu groups={[{ label: 'Pages', items: [{ id: 'orders', label: 'Orders', onSelect: () => go('/orders') }] }]} />`,
    },
    {
      id: 'controlled',
      title: 'From a search button',
      description: 'Controlled open state.',
      code: `import { Button, CommandMenu } from '@ds/react';\n\nconst [open, setOpen] = useState(false);\n<Button onClick={() => setOpen(true)}>Search…</Button>\n<CommandMenu open={open} onOpenChange={setOpen} groups={groups} />`,
    },
    {
      id: 'server',
      title: 'Server results',
      description: 'Fetch as people type.',
      code: `import { CommandMenu } from '@ds/react';\n\n<CommandMenu groups={results} onSearchChange={(q) => fetchResults(q)} />`,
    },
  ],
  tokenPrefixes: ['--command-menu-'],
  related: [
    { id: 'kbd', relation: 'Shortcut hints.' },
    { id: 'combobox', relation: 'For picking a value in a form.' },
  ],
  changelog: [{ version: '1.1.0', date: '2026-10-15', changes: ['New component.'] }],
});
