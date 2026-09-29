import { defineMeta } from '../meta';

export default defineMeta({
  id: 'hover-card',
  name: 'HoverCard',
  category: 'Overlays',
  status: 'stable',
  since: '0.4.0',
  description:
    'A hover card previews what a link points to, such as a person’s profile, when a mouse user points at it or a keyboard user focuses it. The link itself must lead to the same information.',
  imports: [
    { name: 'HoverCard', from: '@ds/react' },
    { name: 'HoverCardTrigger', from: '@ds/react' },
    { name: 'HoverCardContent', from: '@ds/react' },
  ],
  whenToUse: ['To preview a linked person, product or page without leaving the current one.'],
  whenNotToUse: [
    { text: 'For essential information or actions.', alternative: 'Popover or the page itself' },
    { text: 'For a short hint.', alternative: 'Tooltip' },
  ],
  anatomy: [
    { name: 'Trigger', description: 'A link.' },
    { name: 'Card', description: 'The preview.' },
  ],
  options: [
    {
      prop: 'side',
      title: 'Side',
      values: [
        { value: 'bottom', meaning: 'Default.' },
        { value: 'top / left / right', meaning: 'Other placements.' },
      ],
    },
  ],
  states: [
    { name: 'Shown', meaning: 'After a delay on hover or focus.', trigger: 'hover or focus' },
  ],
  behavior: [
    {
      topic: 'Supplementary',
      text: 'The card is extra: screen reader and touch users get the information by following the link.',
    },
    {
      topic: 'Delay',
      text: 'openDelay and closeDelay avoid flicker when moving the pointer across the page.',
    },
  ],
  content: ['Show a small summary: name, role, one line, maybe an avatar.'],
  guidelines: [
    {
      do: 'Preview what the link already leads to.',
      dont: 'Put unique actions in the card.',
      why: 'Keyboard, touch and screen reader users may never see the card.',
    },
    {
      do: 'Use links as triggers.',
      dont: 'Use plain text as a trigger.',
      why: 'Plain text can’t receive keyboard focus.',
    },
    {
      do: 'Keep it small.',
      dont: 'Show a full page in a hover card.',
      why: 'Large cards cover the content people were reading.',
    },
  ],
  accessibility: {
    role: 'supplementary content; not announced by screen readers.',
    keyboard: [{ keys: 'Tab', action: 'Focusing the link opens the card.' }],
    aria: [{ attribute: 'none', when: 'The link carries the meaning.' }],
    focus: 'Stays on the link.',
    wcag: [
      { criterion: '1.4.13 Content on Hover or Focus', how: 'Hoverable, dismissible, persistent.' },
      { criterion: '2.1.1 Keyboard', how: 'Opens on focus too; the link works on its own.' },
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Nothing essential lives only in the card.',
      },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'profile',
      title: 'Profile preview',
      description: 'A user link.',
      code: `import { HoverCard, HoverCardTrigger, HoverCardContent, Link, Avatar } from '@ds/react';

<HoverCard>
  <HoverCardTrigger asChild><Link href="/u/sarah">@sarah</Link></HoverCardTrigger>
  <HoverCardContent><Avatar name="Sarah Chen" /> Sarah Chen · Head of Products</HoverCardContent>
</HoverCard>`,
    },
    {
      id: 'delay',
      title: 'Delays',
      description: 'Open faster, close slower.',
      code: `import { HoverCard, HoverCardTrigger, HoverCardContent, Link } from '@ds/react';

<HoverCard openDelay={300} closeDelay={200}>
  <HoverCardTrigger asChild><Link href="/p/1">Wireless headphones</Link></HoverCardTrigger>
  <HoverCardContent>$299 · In stock</HoverCardContent>
</HoverCard>`,
    },
    {
      id: 'side',
      title: 'Placement',
      description: 'On the right.',
      code: `import { HoverCard, HoverCardTrigger, HoverCardContent, Link } from '@ds/react';

<HoverCard>
  <HoverCardTrigger asChild><Link href="/docs">Docs</Link></HoverCardTrigger>
  <HoverCardContent side="right">Guides and API reference.</HoverCardContent>
</HoverCard>`,
    },
  ],
  tokenPrefixes: ['--hover-card-'],
  related: [
    { id: 'tooltip', relation: 'For short hints.' },
    { id: 'popover', relation: 'For interactive content.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
