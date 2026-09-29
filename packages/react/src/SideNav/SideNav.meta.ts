import { defineMeta } from '../meta';

export default defineMeta({
  id: 'side-nav',
  name: 'SideNav',
  category: 'Navigation',
  status: 'stable',
  since: '0.4.0',
  description:
    'A side navigation lists the pages of an app or docs site in sections, with icons and nested groups that expand and collapse. The current page is highlighted and announced.',
  imports: [{ name: 'SideNav', from: '@ds/react' }],
  whenToUse: ['For apps and docs with many pages or two levels of hierarchy.'],
  whenNotToUse: [
    { text: 'For five or fewer top-level pages.', alternative: 'Navbar' },
    { text: 'For switching views inside a page.', alternative: 'Tabs' },
  ],
  anatomy: [
    { name: 'Section title', description: 'Names a group of links.', optional: true },
    { name: 'Item', description: 'A link; icon optional.' },
    { name: 'Group', description: 'A button that shows its nested items.', optional: true },
    { name: 'Current item', description: 'Tinted with an edge bar.' },
  ],
  options: [
    {
      prop: 'sections',
      title: 'Structure',
      values: [
        { value: 'flat', meaning: 'Items only.' },
        { value: 'nested', meaning: 'Items with items: collapsible groups, indented.' },
      ],
    },
  ],
  states: [
    { name: 'Hover', meaning: 'Tinted background.', trigger: ':hover' },
    {
      name: 'Current',
      meaning: 'Tinted with a bar on the inline start; aria-current="page".',
      trigger: 'currentItem',
    },
    {
      name: 'Expanded',
      meaning: 'Group shows its items; chevron flips.',
      trigger: 'aria-expanded',
    },
    { name: 'Focus', meaning: 'Focus ring.', trigger: ':focus-visible' },
  ],
  behavior: [
    { topic: 'Groups', text: 'Groups containing the current page start expanded.' },
    { topic: 'Keyboard', text: 'Tab through items; Enter or Space toggles groups.' },
    { topic: 'Right-to-left', text: 'The current-page bar and indentation move to the right.' },
  ],
  content: ['Short, specific labels; group titles in sentence case.'],
  guidelines: [
    {
      do: 'Keep nesting to two levels.',
      dont: 'Nest groups three or four deep.',
      why: 'Deep trees are hard to scan and navigate by keyboard.',
    },
    {
      do: 'Set currentItem from the router.',
      dont: 'Highlight items with custom classes.',
      why: 'aria-current tells screen reader users where they are.',
    },
    {
      do: 'Use icons consistently: all items or none in a section.',
      dont: 'Mix items with and without icons.',
      why: 'Mixed icons break the alignment people scan along.',
    },
  ],
  accessibility: {
    role: 'navigation landmark with lists; groups are disclosure buttons.',
    keyboard: [
      { keys: 'Tab', action: 'Moves between items.' },
      { keys: 'Enter / Space', action: 'Follows a link or toggles a group.' },
    ],
    aria: [
      { attribute: 'aria-current="page"', when: 'The current item.' },
      { attribute: 'aria-expanded / aria-controls', when: 'Group buttons.' },
      { attribute: 'aria-labelledby', when: 'Lists named by their section title.' },
    ],
    focus: 'Focus ring on each item.',
    wcag: [
      { criterion: '2.4.8 Location', how: 'Marks the current page.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Disclosure buttons expose expanded state.' },
      { criterion: '1.4.1 Use of Color', how: 'Current page has an edge bar, not just color.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'app',
      title: 'App navigation',
      description: 'Icons and one section.',
      code: `import { SideNav } from '@ds/react';

<SideNav currentItem="orders" sections={[{ items: [
  { id: 'home', label: 'Home', href: '/', icon: <House /> },
  { id: 'orders', label: 'Orders', href: '/orders', icon: <Package /> },
] }]} />`,
    },
    {
      id: 'docs',
      title: 'Docs with groups',
      description: 'Nested pages.',
      code: `import { SideNav } from '@ds/react';

<SideNav currentItem="colors" sections={[
  { title: 'Foundations', items: [{ label: 'Tokens', items: [{ id: 'colors', label: 'Colors', href: '/colors' }] }] },
]} />`,
    },
    {
      id: 'router',
      title: 'With a router',
      description: 'Current from the URL.',
      code: `import { SideNav } from '@ds/react';

<SideNav sections={sections} currentItem={location.pathname} />`,
    },
  ],
  tokenPrefixes: ['--side-nav-'],
  related: [
    { id: 'navbar', relation: 'For a few top-level pages.' },
    { id: 'breadcrumb', relation: 'Shows location in deep hierarchies.' },
  ],
  changelog: [
    { version: '0.4.0', date: '2026-09-29', changes: ['New component.'] },
    {
      version: '1.1.0',
      date: '2026-09-29',
      changes: ['Removed the bar on the current item; its background and text color mark it.'],
    },
  ],
});
