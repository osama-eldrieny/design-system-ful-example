import { defineMeta } from '../meta';

export default defineMeta({
  id: 'footer',
  name: 'Footer',
  category: 'Patterns',
  status: 'stable',
  since: '0.2.0',
  description:
    'The page footer: a copyright line and secondary links such as Privacy, Terms and Help. It is the page’s content-info landmark.',
  imports: [{ name: 'Footer', from: '@ds/react' }],
  whenToUse: ['Once per page, at the bottom, for legal text and secondary links.'],
  whenNotToUse: [
    { text: 'For the main sections of the site.', alternative: 'Navbar' },
    { text: 'For the end of an article or card.', alternative: 'CardFooter' },
  ],
  anatomy: [
    { name: 'Surface', description: 'Follows the section tokens.' },
    { name: 'Text', description: 'The copyright or company line.', optional: true },
    {
      name: 'Links',
      description: 'A labelled navigation list of secondary links.',
      optional: true,
    },
  ],
  options: [
    {
      prop: 'links[].href',
      title: 'Link type',
      values: [
        { value: 'href set', meaning: 'A link. Use for pages.' },
        { value: 'no href', meaning: 'A button that runs onClick, e.g. “Cookie settings”.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'At rest.', trigger: '—' },
    { name: 'Hover', meaning: 'Darker and underlined.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Focus ring.', trigger: ':focus-visible' },
  ],
  behavior: [
    { topic: 'Wrapping', text: 'Links wrap onto more rows on narrow screens.' },
    {
      topic: 'Landmarks',
      text: 'A top-level footer is the contentinfo landmark; its links are a nav named by linksLabel (default “Footer”).',
    },
  ],
  content: [
    'Text: “© 2026 Company”. Use the current year from code, not a hard-coded one.',
    'Links: short nouns — “Privacy”, “Terms”, “Help”.',
  ],
  guidelines: [
    {
      do: 'Use real links (href) for pages.',
      dont: 'Use buttons that change location in JavaScript.',
      why: 'Links can be opened in new tabs and are announced as links.',
    },
    {
      do: 'Keep footer links secondary.',
      dont: 'Repeat the whole Navbar in the footer.',
      why: 'Duplicate navigation adds noise for keyboard and screen reader users.',
    },
    {
      do: 'Use one Footer per page.',
      dont: 'Add footers to every section.',
      why: 'Several contentinfo landmarks confuse landmark navigation.',
    },
  ],
  accessibility: {
    role: 'contentinfo landmark (footer) with a named navigation list.',
    keyboard: [{ keys: 'Tab / Enter', action: 'Reach and follow each link.' }],
    aria: [
      { attribute: 'aria-label on the links’ nav', when: 'From linksLabel; default “Footer”.' },
    ],
    focus: 'Each link shows the focus ring.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'footer + nav + list semantics.' },
      { criterion: '1.4.3 Contrast (Minimum)', how: 'Text and links pass 4.5:1 in every theme.' },
      { criterion: '2.4.7 Focus Visible', how: 'Links show the focus ring.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Footer',
      description: 'Copyright and legal links.',
      code: `import { Footer } from '@ds/react';

<Footer
  title={\`© \${new Date().getFullYear()} TechHub\`}
  links={[
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Help', href: '/help' },
  ]}
/>`,
    },
    {
      id: 'action',
      title: 'With an in-page action',
      description: 'A link without href becomes a button.',
      code: `import { Footer } from '@ds/react';

<Footer
  title="© 2026 TechHub"
  links={[
    { label: 'Privacy', href: '/privacy' },
    { label: 'Cookie settings', onClick: openCookieSettings },
  ]}
/>`,
    },
    {
      id: 'text-only',
      title: 'Text only',
      description: 'Without links.',
      code: `import { Footer } from '@ds/react';

<Footer title="© 2026 TechHub" />`,
    },
  ],
  tokenPrefixes: ['--footer-'],
  related: [{ id: 'navbar', relation: 'The main navigation at the top.' }],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Links are real links (href) in a labelled nav list; items without href are buttons.',
        'Own --footer-* tokens instead of button and section tokens; hover underlines instead of a raw-color background.',
        'No default title or links.',
      ],
    },
  ],
});
