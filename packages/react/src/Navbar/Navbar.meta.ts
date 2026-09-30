import { defineMeta } from '../meta';

export default defineMeta({
  id: 'navbar',
  name: 'Navbar',
  category: 'Patterns',
  status: 'stable',
  since: '0.2.0',
  description:
    'The navigation bar at the top of a site or app: the logo, links to the main sections, and optional actions such as search. It marks the current page and wraps onto more rows on small screens.',
  imports: [{ name: 'Navbar', from: '@ds/react' }],
  whenToUse: [
    'Once per page, at the top, for the site’s or app’s main sections.',
    'With up to about five top-level destinations.',
  ],
  whenNotToUse: [
    { text: 'To switch views within one page.', alternative: 'Tabs' },
    { text: 'For many or nested destinations.', alternative: 'A side navigation' },
    { text: 'For secondary links such as Privacy.', alternative: 'Footer' },
  ],
  anatomy: [
    { name: 'Bar', description: 'The navigation landmark; surface follows the section tokens.' },
    { name: 'Logo', description: 'Usually a Logo linking home.', optional: true },
    {
      name: 'Items',
      description: 'Links to the main sections; the current one is highlighted and underlined.',
    },
    { name: 'Actions', description: 'Search, buttons or an avatar at the end.', optional: true },
  ],
  options: [
    {
      prop: 'items[].href',
      title: 'Item type',
      values: [
        { value: 'href set', meaning: 'A link to another page. Use for navigation.' },
        { value: 'no href', meaning: 'A button that runs onClick, for app views without URLs.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Another page.', trigger: '—' },
    { name: 'Hover', meaning: 'Tinted background.', trigger: ':hover' },
    {
      name: 'Current',
      meaning: 'Tinted, brand-colored and underlined; announced as “current page”.',
      trigger: 'aria-current="page"',
    },
    { name: 'Focus', meaning: 'Focus ring.', trigger: ':focus-visible' },
  ],
  behavior: [
    {
      topic: 'Current page',
      text: 'Set currentItem from your router. Uncontrolled, clicking an item makes it current.',
    },
    {
      topic: 'Small screens',
      text: 'Items and actions wrap onto more rows instead of scrolling or hiding.',
    },
    {
      topic: 'Positioning',
      text: 'The Navbar doesn’t position itself; make it sticky or absolute in page CSS.',
    },
    {
      topic: 'Several navs',
      text: 'Give each navigation landmark a different aria-label (default “Main”).',
    },
  ],
  content: [
    'Use short, familiar labels: one or two words (“Products”, “Pricing”).',
    'Order items by importance or by the user’s journey.',
  ],
  guidelines: [
    {
      do: 'Mark the current page with currentItem.',
      dont: 'Style the current item with a custom class.',
      why: 'aria-current tells screen reader users where they are; a class only changes the look.',
    },
    {
      do: 'Use real links (href) for pages.',
      dont: 'Use onClick-only buttons for navigation between URLs.',
      why: 'Links can be opened in a new tab, bookmarked and shared.',
    },
    {
      do: 'Keep it to about five items.',
      dont: 'Squeeze every page into the top bar.',
      why: 'Too many items wrap into a crowded bar and are hard to scan.',
    },
  ],
  accessibility: {
    role: 'navigation landmark (nav) with a list of links.',
    keyboard: [
      { keys: 'Tab', action: 'Moves through the logo, items and actions in order.' },
      { keys: 'Enter', action: 'Follows a link or activates a button item.' },
    ],
    aria: [
      { attribute: 'aria-label', when: 'Names the landmark; default “Main”.' },
      { attribute: 'aria-current="page"', when: 'Set on the current item.' },
      { attribute: 'aria-hidden on item icons', when: 'Always: the label names the item.' },
    ],
    focus: 'Each item shows the focus ring.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'A nav landmark containing a list.' },
      {
        criterion: '1.4.1 Use of Color',
        how: 'The current item is also underlined (and underlined text in forced colors).',
      },
      { criterion: '2.4.8 Location', how: 'aria-current announces the current page.' },
      {
        criterion: '1.4.10 Reflow',
        how: 'Items wrap at narrow widths without horizontal scrolling.',
      },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Site navigation',
      description: 'Logo, links and the current page.',
      code: `import { Navbar, Logo } from '@ds/react';

<Navbar
  logo={<Logo name="TechHub" href="/" />}
  items={[
    { label: 'Products', href: '/products' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
  ]}
  currentItem="Products"
/>`,
    },
    {
      id: 'actions',
      title: 'With actions',
      description: 'A sign-in button at the end.',
      code: `import { Navbar, Logo, Button } from '@ds/react';

<Navbar
  logo={<Logo name="TechHub" href="/" />}
  items={items}
  currentItem={pathname}
  actions={<Button size="small">Sign in</Button>}
/>`,
    },
    {
      id: 'router',
      title: 'With a router',
      description: 'Drive the current item from the URL.',
      code: `import { Navbar } from '@ds/react';

const items = [
  { id: '/', label: 'Home', href: '/' },
  { id: '/pricing', label: 'Pricing', href: '/pricing' },
];

<Navbar items={items} currentItem={location.pathname} />`,
    },
  ],
  tokenPrefixes: ['--navbar-'],
  related: [
    { id: 'logo', relation: 'Starts the bar.' },
    { id: 'footer', relation: 'For secondary links.' },
    { id: 'tabs', relation: 'For switching views within a page.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Real links (or buttons) in a labelled nav list, replacing clickable divs; aria-current marks the current page.',
        'currentItem / defaultCurrentItem / onCurrentItemChange replace defaultActiveItem; items take href and a ReactNode icon; new actions slot.',
        'Own --navbar-* tokens instead of --menu-item-*; no fixed width or absolute positioning.',
      ],
    },
    {
      version: '1.1.0',
      date: '2026-09-30',
      changes: [
        'Removed the bar under the current item; its color and background mark it (underlined in forced colors).',
        'New item option static: plain text, not a link or button, for placeholder menus (keeps the hover style).',
      ],
    },
  ],
});
