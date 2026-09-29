import { defineMeta } from '../meta';

export default defineMeta({
  id: 'link',
  name: 'Link',
  category: 'Actions',
  status: 'stable',
  since: '0.3.0',
  description:
    'A link takes people to another page or place. Inline links sit in running text and are always underlined; standalone links stand on their own, like “View all orders”. External links open in a new tab and say so.',
  imports: [{ name: 'Link', from: '@ds/react' }],
  whenToUse: [
    'To go to another page, section or site.',
    'For a secondary, low-emphasis navigation like “View all”.',
  ],
  whenNotToUse: [
    { text: 'To do something (save, delete, open a dialog).', alternative: 'Button' },
    {
      text: 'For a prominent call to action that navigates.',
      alternative: 'Button rendered as a link',
    },
    { text: 'For the site’s main navigation.', alternative: 'Navbar' },
  ],
  anatomy: [
    { name: 'Text', description: 'Says where the link goes.' },
    { name: 'Underline', description: 'Always on for inline links; on hover for standalone.' },
    {
      name: 'Icon',
      description: 'Standalone links; external links get the external icon.',
      optional: true,
    },
  ],
  options: [
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        {
          value: 'inline',
          meaning: 'Inside a sentence; takes the surrounding text size. Default.',
        },
        {
          value: 'standalone',
          meaning: 'On its own line or next to content; has sizes and an icon.',
        },
      ],
    },
    {
      prop: 'variant',
      title: 'Variant',
      values: [
        { value: 'primary', meaning: 'Brand color. Default.' },
        { value: 'secondary', meaning: 'Neutral color for footers, metadata and dense UI.' },
      ],
    },
    {
      prop: 'size',
      title: 'Size (standalone)',
      values: [
        { value: 'small', meaning: 'Small text.' },
        { value: 'medium', meaning: 'Default.' },
        { value: 'large', meaning: 'Larger line height and icon.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Unvisited.', trigger: '—' },
    { name: 'Hover', meaning: 'Darker, thicker underline.', trigger: ':hover' },
    { name: 'Visited', meaning: 'Darker brand color (primary only).', trigger: ':visited' },
    { name: 'Focus', meaning: 'Focus ring.', trigger: ':focus-visible' },
  ],
  behavior: [
    {
      topic: 'External',
      text: 'external opens a new tab with rel="noopener noreferrer", shows an icon and adds “(opens in a new tab)” for screen readers.',
    },
    {
      topic: 'Routers',
      text: 'Pass your router’s link component as `as`; it receives href and className.',
    },
    { topic: 'Right-to-left', text: 'Icons like arrows flip to point the reading direction.' },
  ],
  content: [
    'Say where the link goes: “Read the return policy”, not “Click here”.',
    'Keep link text unique on a page when the destinations differ.',
    'Open new tabs only for other sites, and say so (external does).',
  ],
  guidelines: [
    {
      do: 'Use Link to go somewhere and Button to do something.',
      dont: 'Use a link with onClick to submit or delete.',
      why: 'Screen readers announce links and buttons differently; people expect them to behave differently.',
    },
    {
      do: 'Write descriptive link text.',
      dont: 'Write “Click here” or “More”.',
      why: 'Screen reader users often browse a list of links out of context.',
    },
    {
      do: 'Keep inline links underlined.',
      dont: 'Remove the underline from links in text.',
      why: 'Color alone doesn’t identify a link for everyone (WCAG 1.4.1).',
    },
  ],
  accessibility: {
    role: 'link (native anchor).',
    keyboard: [
      { keys: 'Tab', action: 'Moves to the link.' },
      { keys: 'Enter', action: 'Follows it.' },
    ],
    aria: [
      { attribute: 'aria-hidden on icons', when: 'Always.' },
      { attribute: 'visually hidden text', when: '“(opens in a new tab)” on external links.' },
    ],
    focus: 'Focus ring around the link.',
    wcag: [
      { criterion: '1.4.1 Use of Color', how: 'Inline links are underlined.' },
      { criterion: '2.4.4 Link Purpose', how: 'Guidelines require descriptive text.' },
      { criterion: '3.2.5 Change on Request', how: 'New tabs are announced.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'inline',
      title: 'Inline',
      description: 'In a sentence.',
      code: `import { Link } from '@ds/react';

<p>
  Read our <Link href="/returns">return policy</Link> before you send an item back.
</p>`,
    },
    {
      id: 'standalone',
      title: 'Standalone with an icon',
      description: 'A “view all” link.',
      code: `import { Link } from '@ds/react';
import { ArrowRight } from 'lucide-react';

<Link href="/orders" appearance="standalone" icon={<ArrowRight />}>
  View all orders
</Link>`,
    },
    {
      id: 'router',
      title: 'Router and external',
      description: 'Use your router’s link, or open another site in a new tab.',
      code: `import { Link } from '@ds/react';
import { Link as RouterLink } from 'react-router-dom';

<Link as={RouterLink} to="/settings">Settings</Link>
<Link href="https://www.w3.org/WAI/" external>WCAG guidelines</Link>`,
    },
  ],
  tokenPrefixes: ['--link-'],
  related: [
    { id: 'button', relation: 'For actions.' },
    { id: 'navbar', relation: 'For main navigation.' },
  ],
  changelog: [{ version: '0.3.0', date: '2026-09-29', changes: ['New component.'] }],
});
