import { defineMeta } from '../meta';

export default defineMeta({
  id: 'breadcrumb',
  name: 'Breadcrumb',
  category: 'Navigation',
  status: 'stable',
  since: '0.4.0',
  description:
    'A breadcrumb shows where the current page sits in the site’s hierarchy, with links back up each level. Long trails collapse into an expandable “…”.',
  imports: [{ name: 'Breadcrumb', from: '@ds/react' }],
  whenToUse: [
    'On pages two or more levels deep in a hierarchy: product categories, docs, settings.',
  ],
  whenNotToUse: [
    { text: 'On the home page or top-level pages.', alternative: 'Nothing' },
    { text: 'For steps of a task.', alternative: 'Stepper' },
    { text: 'For browsing history.', alternative: 'A back link' },
  ],
  anatomy: [
    { name: 'Links', description: 'Each level above the current page.' },
    { name: 'Separator', description: 'Chevron; flips in RTL; hidden from screen readers.' },
    { name: '“…” button', description: 'Expands collapsed levels.', optional: true },
    { name: 'Current page', description: 'Last; not a link; aria-current="page".' },
  ],
  options: [
    {
      prop: 'maxItems',
      title: 'Collapsing',
      values: [
        { value: 'undefined', meaning: 'Shows every level. Default.' },
        { value: 'n (≥ 3)', meaning: 'Shows the first, “…”, and the last n − 2.' },
      ],
    },
  ],
  states: [
    { name: 'Hover', meaning: 'Link color changes.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Focus ring.', trigger: ':focus-visible' },
    { name: 'Expanded', meaning: 'All levels shown after pressing “…”.', trigger: '“…” click' },
  ],
  behavior: [
    { topic: 'Wrapping', text: 'Wraps onto more lines on narrow screens instead of scrolling.' },
    {
      topic: 'Landmark',
      text: 'A navigation landmark named “Breadcrumb”; the trail is an ordered list.',
    },
  ],
  content: [
    'Use each page’s real title, shortened if long.',
    'Don’t include the site name unless it’s a level.',
  ],
  guidelines: [
    {
      do: 'Mirror the site hierarchy.',
      dont: 'Show the path people happened to click through.',
      why: 'Breadcrumbs show location, not history.',
    },
    {
      do: 'Collapse long trails with maxItems.',
      dont: 'Let a trail wrap onto three lines.',
      why: 'Long trails push the page content down.',
    },
    {
      do: 'Keep the current page as plain text.',
      dont: 'Link the current page to itself.',
      why: 'A link to the same page is confusing.',
    },
  ],
  accessibility: {
    role: 'navigation landmark with an ordered list.',
    keyboard: [{ keys: 'Tab / Enter', action: 'Reach and follow each link or the “…” button.' }],
    aria: [
      { attribute: 'aria-label="Breadcrumb"', when: 'Names the landmark.' },
      { attribute: 'aria-current="page"', when: 'On the last item.' },
      { attribute: 'aria-hidden on separators', when: 'Always.' },
    ],
    focus: 'Pressing “…” keeps focus in the trail.',
    wcag: [
      { criterion: '2.4.8 Location', how: 'Shows the page’s place in the site.' },
      { criterion: '1.3.1 Info and Relationships', how: 'Ordered list inside a named nav.' },
      { criterion: '1.4.10 Reflow', how: 'Wraps at narrow widths.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Breadcrumb',
      description: 'Three levels.',
      code: `import { Breadcrumb } from '@ds/react';

<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Audio', href: '/audio' },
  { label: 'Wireless headphones' },
]} />`,
    },
    {
      id: 'collapse',
      title: 'Collapsed',
      description: 'A long trail.',
      code: `import { Breadcrumb } from '@ds/react';

<Breadcrumb maxItems={4} items={trail} />`,
    },
    {
      id: 'router',
      title: 'With a router',
      description: 'Handle clicks yourself.',
      code: `import { Breadcrumb } from '@ds/react';

<Breadcrumb items={trail.map((t) => ({ ...t, onClick: (e) => { e.preventDefault(); navigate(t.href); } }))} />`,
    },
  ],
  tokenPrefixes: ['--breadcrumb-'],
  related: [
    { id: 'navbar', relation: 'The main navigation.' },
    { id: 'side-nav', relation: 'For navigating many pages.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
