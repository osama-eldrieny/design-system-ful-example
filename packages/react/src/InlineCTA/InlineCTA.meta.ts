import { defineMeta } from '../meta';

export default defineMeta({
  id: 'inline-cta',
  name: 'InlineCTA',
  category: 'Patterns',
  status: 'stable',
  since: '1.2.0',
  description:
    'A call to action placed inside page content, such as between dashboard sections or at the end of an article: a title, a short description and one or two actions.',
  imports: [{ name: 'InlineCTA', from: '@ds/react' }],
  whenToUse: [
    'To suggest a next step in context, e.g. "Invite your team" under an empty member list.',
    'To promote an upgrade or feature within a page without interrupting it.',
  ],
  whenNotToUse: [
    { text: 'For warnings, errors or system status.', alternative: 'Alert' },
    { text: 'For a page-wide announcement at the top.', alternative: 'PageHeader' },
    { text: 'When there is nothing yet on the page.', alternative: 'EmptyState' },
  ],
  anatomy: [
    { name: 'Icon', description: 'A tile with an icon that hints at the offer.', optional: true },
    { name: 'Title', description: 'The offer in a few words; a real heading.' },
    { name: 'Description', description: 'One or two sentences on the benefit.', optional: true },
    { name: 'Actions', description: 'One primary and at most one secondary action.' },
  ],
  options: [
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'subtle', meaning: 'Default. A grey panel that sits quietly in content.' },
        { value: 'brand', meaning: 'A brand-colored border and icon tile, for upgrades and new features.' },
        { value: 'outline', meaning: 'Bordered, on the page background, for cards and dense layouts.' },
      ],
    },
    {
      prop: 'layout',
      title: 'Layout',
      values: [
        { value: 'horizontal', meaning: 'Default. Actions at the end; they wrap below on narrow screens.' },
        { value: 'stacked', meaning: 'Actions under the text, for sidebars and narrow columns.' },
      ],
    },
  ],
  states: [{ name: 'Default', meaning: 'A static panel; its buttons have their own states.', trigger: '—' }],
  behavior: [
    { topic: 'Responsive', text: 'In horizontal layout, actions wrap under the text when there is no room beside it.' },
    { topic: 'Headings', text: 'The title is an h3 by default; set headingLevel to fit the page outline.' },
    { topic: 'Right-to-left', text: 'The icon sits on the right and actions on the left in Arabic.' },
  ],
  content: [
    'Write the title as the benefit or the action: "Invite your team".',
    'Use a verb on the primary button that matches the title.',
    'Keep the description to two lines.',
  ],
  guidelines: [
    {
      do: 'Use one InlineCTA per screen.',
      dont: 'Stack several calls to action on the same page.',
      why: 'Competing offers dilute each other.',
    },
    {
      do: 'Pair one primary button with an optional secondary.',
      dont: 'Add three or more actions.',
      why: 'A single clear next step converts better.',
    },
    {
      do: 'Use brand appearance for upgrades and new features.',
      dont: 'Use the CTA to report errors.',
      why: 'Status messages belong in an Alert so they are announced and colored by tone.',
    },
  ],
  accessibility: {
    role: 'region-less section with a real heading, so it appears in the heading outline.',
    keyboard: [{ keys: 'Tab', action: 'Moves through the actions.' }],
    aria: [{ attribute: 'aria-hidden', when: 'On the icon, which is decorative.' }],
    focus: 'Only the actions take focus.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'The title is a heading at a configurable level.' },
      { criterion: '1.4.3 Contrast', how: 'Text passes AA on every appearance in every theme.' },
      { criterion: '1.4.10 Reflow', how: 'Actions wrap under the text at narrow widths.' },
    ],
    notes: ['Use Buttons or Links for actions so they keep their own focus and states.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Invite your team',
      description: 'Subtle, with an icon and two actions.',
      code: `import { Button, InlineCTA } from '@ds/react';
import { Users } from 'lucide-react';

<InlineCTA
  icon={<Users />}
  title="Invite your team"
  description="Projects move faster together. Invite up to 5 people for free."
  actions={<><Button variant="secondary" appearance="outline">Later</Button><Button>Invite</Button></>}
/>`,
    },
    {
      id: 'brand',
      title: 'Upgrade',
      description: 'Brand-tinted for an upgrade offer.',
      code: `import { Button, InlineCTA } from '@ds/react';

<InlineCTA appearance="brand" title="Unlock advanced reports" actions={<Button>Upgrade</Button>} />`,
    },
    {
      id: 'stacked',
      title: 'In a sidebar',
      description: 'Stacked layout for narrow columns.',
      code: `import { Button, InlineCTA } from '@ds/react';

<InlineCTA layout="stacked" appearance="outline" title="Need help?" description="Our team replies within an hour." actions={<Button>Contact support</Button>} />`,
    },
  ],
  tokenPrefixes: ['--inline-cta-'],
  related: [
    { id: 'alert', relation: 'Use for status and errors.' },
    { id: 'empty-state', relation: 'Use when the page has no content yet.' },
  ],
  changelog: [{ version: '1.2.0', date: '2026-10-15', changes: ['New pattern.'] }],
});
