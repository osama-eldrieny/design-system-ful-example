import { defineMeta } from '../meta';

export default defineMeta({
  id: 'tree-view',
  name: 'TreeView',
  category: 'Navigation',
  status: 'stable',
  since: '1.2.0',
  description:
    'A hierarchy of items, such as files in folders or pages in sections, that people expand, collapse and select. Follows the WAI-ARIA tree pattern.',
  imports: [{ name: 'TreeView', from: '@ds/react' }, { name: 'TreeItem', from: '@ds/react' }],
  whenToUse: [
    'To browse nested content more than two levels deep, e.g. a file explorer.',
    'To pick one item from a hierarchy, e.g. a folder to move a file into.',
  ],
  whenNotToUse: [
    { text: 'For a site’s main navigation with one or two levels.', alternative: 'SideNav' },
    { text: 'To show and hide sections of a page.', alternative: 'Accordion' },
    { text: 'For a flat list of items.', alternative: 'List' },
  ],
  anatomy: [
    { name: 'Row', description: 'One item: chevron, optional icon and label, indented by level.' },
    { name: 'Chevron', description: 'Shows whether a branch is open; only on items with children.' },
    { name: 'Icon', description: 'Identifies the kind of item, e.g. folder or file.', optional: true },
    { name: 'Guide', description: 'Lines connecting children to their parent.', optional: true },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Dense sidebars and panels.' },
        { value: 'medium', meaning: 'Default.' },
      ],
    },
    {
      prop: 'guides',
      title: 'Guides',
      values: [
        { value: 'false', meaning: 'Default. Indentation alone shows the levels.' },
        { value: 'true', meaning: 'Adds lines down each open branch, for deep trees.' },
      ],
    },
  ],
  states: [
    { name: 'Collapsed', meaning: 'A branch whose children are hidden.', trigger: 'Id not in expanded.' },
    { name: 'Expanded', meaning: 'A branch whose children show.', trigger: 'Id in expanded.' },
    { name: 'Hover', meaning: 'Highlights the row under the pointer.', trigger: ':hover.' },
    { name: 'Focus', meaning: 'Shows which row the keyboard is on.', trigger: ':focus-visible.' },
    { name: 'Selected', meaning: 'The chosen item.', trigger: 'selected matches the id.' },
    { name: 'Disabled', meaning: 'Cannot be selected.', trigger: 'disabled on the item.' },
  ],
  behavior: [
    { topic: 'Clicking', text: 'Clicking a row selects it; clicking a branch also opens or closes it.' },
    {
      topic: 'Controlled or not',
      text: 'Pass expanded / selected with their change handlers to control them, or the default props to let the tree manage them.',
    },
    { topic: 'One tab stop', text: 'The tree is a single tab stop; arrow keys move between rows.' },
    { topic: 'Right-to-left', text: 'Indentation and chevrons flip, and Left / Right arrows swap meaning.' },
  ],
  content: [
    'Keep labels short; long labels are truncated with an ellipsis.',
    'Use icons consistently: the same icon for every item of the same kind.',
    'Name the tree with label, e.g. "Files" or "Pages".',
  ],
  guidelines: [
    {
      do: 'Open the branch that holds the selected item.',
      dont: 'Start with the selected item hidden in a closed branch.',
      why: 'People need to see where they are.',
    },
    {
      do: 'Use guides for trees deeper than three levels.',
      dont: 'Rely on indentation alone in deep trees.',
      why: 'Lines make it clear which parent a row belongs to.',
    },
    {
      do: 'Use a tree for real hierarchies.',
      dont: 'Use a tree for a flat list or for page navigation.',
      why: 'Tree keyboard behavior is unexpected where there is no hierarchy.',
    },
  ],
  accessibility: {
    role: 'tree, with treeitem rows and group for each branch’s children.',
    keyboard: [
      { keys: 'Up / Down', action: 'Move to the previous or next visible row.' },
      { keys: 'Right', action: 'Opens a closed branch, or moves to its first child.' },
      { keys: 'Left', action: 'Closes an open branch, or moves to the parent.' },
      { keys: 'Home / End', action: 'Move to the first or last visible row.' },
      { keys: 'Enter', action: 'Selects the row and opens or closes a branch.' },
      { keys: 'Space', action: 'Selects the row.' },
    ],
    aria: [
      { attribute: 'aria-label', when: 'From label, on the tree.' },
      { attribute: 'aria-expanded', when: 'On branches: whether they are open.' },
      { attribute: 'aria-selected', when: 'On every row: whether it is selected.' },
      { attribute: 'aria-level', when: 'On every row: its depth, starting at 1.' },
    ],
    focus: 'One row is focusable at a time (roving tabindex); a ring outlines the focused row.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Levels and nesting are exposed with tree roles and aria-level.' },
      { criterion: '2.1.1 Keyboard', how: 'Every action works with the arrow keys, Enter and Space.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Expanded and selected states are exposed on each row.' },
    ],
    notes: ['Selection is shown by background and weight, not color alone.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'File tree',
      description: 'Folders with icons, one branch open.',
      code: `import { TreeView } from '@ds/react';

<TreeView
  label="Files"
  defaultExpanded={['src']}
  items={[
    { id: 'src', label: 'src', children: [{ id: 'app', label: 'App.tsx' }] },
    { id: 'readme', label: 'README.md' },
  ]}
/>`,
    },
    {
      id: 'controlled',
      title: 'Controlled selection',
      description: 'Shows the selected page elsewhere.',
      code: `import { TreeView } from '@ds/react';

<TreeView label="Pages" items={pages} selected={page} onSelect={setPage} />`,
    },
    {
      id: 'guides',
      title: 'Deep tree with guides',
      description: 'Small rows with connecting lines.',
      code: `import { TreeView } from '@ds/react';

<TreeView label="Components" items={items} size="small" guides />`,
    },
  ],
  tokenPrefixes: ['--tree-view-'],
  related: [
    { id: 'side-nav', relation: 'Use for app navigation with one or two levels.' },
    { id: 'accordion', relation: 'Use to show and hide page sections.' },
  ],
  changelog: [{ version: '1.2.0', date: '2026-10-15', changes: ['New component.'] }],
});
