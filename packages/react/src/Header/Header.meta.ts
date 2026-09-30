import { defineMeta } from '../meta';

export default defineMeta({
  id: 'header',
  name: 'Header',
  category: 'Patterns',
  status: 'stable',
  since: '0.2.0',
  description:
    'A page header that introduces a person and their page: avatar, name, job title and the page heading. Use it at the top of portfolio, profile or “about” pages.',
  imports: [{ name: 'Header', from: '@ds/react' }],
  whenToUse: ['At the top of a portfolio, profile or personal page.'],
  whenNotToUse: [
    { text: 'For the site’s navigation.', alternative: 'Navbar' },
    { text: 'For a person in a list or card.', alternative: 'Avatar with text' },
    { text: 'For a page not about a person.', alternative: 'A plain h1' },
  ],
  anatomy: [
    {
      name: 'Avatar',
      description: 'Extra-large Avatar; decorative, since the name is next to it.',
    },
    { name: 'Name', description: 'The person’s name.' },
    { name: 'Job title', description: 'Their role.', optional: true },
    { name: 'Heading', description: 'The page heading (h1 by default).', optional: true },
  ],
  options: [
    {
      prop: 'layout',
      title: 'Layout',
      values: [
        {
          value: 'vertical',
          meaning: 'Photo, name and heading stacked and centered. Default; profile pages.',
        },
        {
          value: 'horizontal',
          meaning: 'Photo and name at the start, heading at the end of one row; compact page tops.',
        },
      ],
    },
    {
      prop: 'headingAs',
      title: 'Heading level',
      values: [
        { value: 'h1', meaning: 'Default: the header opens the page.' },
        { value: 'h2', meaning: 'When the page already has an h1.' },
        { value: 'h3', meaning: 'Inside a nested section.' },
      ],
    },
  ],
  states: [{ name: 'Default', meaning: 'Static content.', trigger: '—' }],
  behavior: [
    {
      topic: 'Landmark',
      text: 'At the top level it is the page’s banner landmark; use it once per page.',
    },
    { topic: 'Photo', text: 'Without avatar, the Avatar shows initials from name.' },
    { topic: 'Density', text: 'Gaps follow the density theme.' },
  ],
  content: [
    'Name: as the person writes it.',
    'Heading: what the page is about, e.g. the project name, in a few words.',
  ],
  guidelines: [
    {
      do: 'Keep one h1 per page: the Header’s heading or the page’s own, not both.',
      dont: 'Leave headingAs at h1 when the page already has one.',
      why: 'One h1 gives screen reader users a clear starting point.',
    },
    {
      do: 'Pass the real name, even with a photo.',
      dont: 'Pass a placeholder name.',
      why: 'The name gives the fallback initials and is the visible identity.',
    },
    {
      do: 'Use it once at the top.',
      dont: 'Repeat it in each section.',
      why: 'It is the page’s banner landmark.',
    },
  ],
  accessibility: {
    role: 'banner landmark (header) at the top level, with a heading.',
    keyboard: [{ keys: '—', action: 'Not interactive.' }],
    aria: [{ attribute: 'aria-hidden avatar', when: 'Always: the name follows it.' }],
    focus: 'None.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'header landmark and a real heading.' },
      { criterion: '2.4.6 Headings and Labels', how: 'The page heading describes the page.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Profile header',
      description: 'Photo, name, job title and page heading.',
      code: `import { Header } from '@ds/react';

<Header
  avatar="/me.png"
  name="Osama Eldrieny"
  jobTitle="Design System Designer"
  heading="Multi-theme design system"
/>`,
    },
    {
      id: 'initials',
      title: 'Without a photo',
      description: 'Initials from the name.',
      code: `import { Header } from '@ds/react';

<Header name="Sarah Chen" jobTitle="Head of Products" heading="Portfolio" />`,
    },
    {
      id: 'nested',
      title: 'Below an existing h1',
      description: 'Lower the heading level.',
      code: `import { Header } from '@ds/react';

<Header name="Sarah Chen" heading="About me" headingAs="h2" />`,
    },
  ],
  tokenPrefixes: ['--header-'],
  related: [{ id: 'avatar', relation: 'Shows the photo or initials.' }],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'role → jobTitle (role is an HTML attribute), title → heading, rendered as a real heading (headingAs, default h1).',
        'name is required; no placeholder defaults.',
        'Surface tokens (--header-bg-color, padding, radius, shadow) replace section tokens.',
      ],
    },
    {
      version: '1.1.0',
      date: '2026-09-30',
      changes: [
        'New layout="horizontal": photo and name at the start, heading at the end of one row.',
      ],
    },
  ],
});
