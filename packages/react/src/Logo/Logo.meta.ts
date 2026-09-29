import { defineMeta } from '../meta';

export default defineMeta({
  id: 'logo',
  name: 'Logo',
  category: 'Patterns',
  status: 'stable',
  since: '0.2.0',
  description:
    'The logo shows the product’s mark and name, usually at the start of the navigation bar, linking to the home page. Its colors, corners and spacing follow the theme.',
  imports: [{ name: 'Logo', from: '@ds/react' }],
  whenToUse: [
    'At the start of the Navbar, linking home.',
    'In sign-in screens, footers and empty states that name the product.',
  ],
  whenNotToUse: [
    { text: 'For a person or team.', alternative: 'Avatar' },
    { text: 'For decorative icons in content.', alternative: 'An icon from lucide-react' },
  ],
  anatomy: [
    { name: 'Mark', description: 'Icon on a brand-colored tile; corners follow the radius theme.' },
    { name: 'Name', description: 'The wordmark; also the accessible name.', optional: true },
  ],
  options: [
    {
      prop: 'hideName',
      title: 'Name',
      values: [
        { value: 'false', meaning: 'Mark and name. Default.' },
        { value: 'true', meaning: 'Mark only, for tight spaces; the name is still announced.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'At rest.', trigger: '—' },
    {
      name: 'Focus',
      meaning: 'A linked logo shows the focus ring.',
      trigger: ':focus-visible with href',
    },
  ],
  behavior: [
    { topic: 'Link', text: 'With href the logo is a single link named by the product name.' },
    {
      topic: 'Themes',
      text: 'Brand, mode, radius and density come from the theme; there are no brand props. Wrap in ThemeProvider to show another brand.',
    },
  ],
  content: ['Use the product name exactly as it is written in the brand.'],
  guidelines: [
    {
      do: 'Link the logo to the home page.',
      dont: 'Add a separate “Home” link next to it that does the same.',
      why: 'People expect the logo to go home; a duplicate link adds noise.',
    },
    {
      do: 'Keep the name visible where there’s room.',
      dont: 'Hide the name everywhere to look minimal.',
      why: 'The name tells new visitors where they are.',
    },
    {
      do: 'Let the theme color the logo.',
      dont: 'Override its colors per brand in page CSS.',
      why: 'Theme tokens keep contrast right in every brand and mode.',
    },
  ],
  accessibility: {
    role: 'link (with href), img (name hidden) or plain text.',
    keyboard: [{ keys: 'Tab / Enter', action: 'Reach and follow a linked logo.' }],
    aria: [
      { attribute: 'aria-hidden on the mark', when: 'Always: the mark is decorative.' },
      { attribute: 'aria-label', when: 'Set to the name when hideName is on.' },
    ],
    focus: 'A linked logo shows the focus ring.',
    wcag: [
      { criterion: '1.1.1 Non-text Content', how: 'The name is always the text alternative.' },
      { criterion: '2.4.4 Link Purpose', how: 'The link is named by the product name.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'link',
      title: 'Home link',
      description: 'The usual case, at the start of the Navbar.',
      code: `import { Logo } from '@ds/react';
import { Flame } from 'lucide-react';

<Logo name="TechHub" icon={<Flame />} href="/" />`,
    },
    {
      id: 'mark',
      title: 'Mark only',
      description: 'For narrow layouts; still named for screen readers.',
      code: `import { Logo } from '@ds/react';

<Logo name="TechHub" hideName href="/" />`,
    },
    {
      id: 'brand',
      title: 'In another brand',
      description: 'The theme sets the colors.',
      code: `import { Logo, ThemeProvider } from '@ds/react';

<ThemeProvider theme={{ brand: 'amber' }}>
  <Logo name="TechHub" />
</ThemeProvider>`,
    },
  ],
  tokenPrefixes: ['--logo-'],
  related: [{ id: 'navbar', relation: 'The logo usually starts the navigation bar.' }],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'name replaces text; href makes it a link; hideName shows the mark only.',
        'brand, radius, density and language props removed: the theme sets them. Hard-coded colors removed.',
        'Default mark is a Lucide icon instead of a Font Awesome class.',
      ],
    },
  ],
});
