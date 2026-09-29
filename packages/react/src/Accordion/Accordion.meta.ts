import { defineMeta } from '../meta';

export default defineMeta({
  id: 'accordion',
  name: 'Accordion',
  category: 'Data display',
  status: 'stable',
  since: '0.4.0',
  description:
    'An accordion stacks sections whose content shows and hides when their heading is pressed, such as an FAQ. One or several sections can be open.',
  imports: [
    { name: 'Accordion', from: '@ds/react' },
    { name: 'AccordionItem', from: '@ds/react' },
  ],
  whenToUse: [
    'For FAQs and long pages people scan for one answer.',
    'For optional detail that would crowd the page.',
  ],
  whenNotToUse: [
    {
      text: 'When people need to compare sections side by side.',
      alternative: 'Tabs or a plain page',
    },
    { text: 'For content most people need.', alternative: 'Show it directly' },
  ],
  anatomy: [
    { name: 'Heading button', description: 'A real heading containing the toggle button.' },
    { name: 'Chevron', description: 'Flips when open.' },
    { name: 'Content', description: 'Shown when open.' },
  ],
  options: [
    {
      prop: 'type',
      title: 'Type',
      values: [
        { value: 'single', meaning: 'One section open at a time; add collapsible to allow none.' },
        { value: 'multiple', meaning: 'Any number open.' },
      ],
    },
  ],
  states: [
    { name: 'Open', meaning: 'Content shown; chevron up.', trigger: 'aria-expanded="true"' },
    { name: 'Hover', meaning: 'Tinted heading.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Focus ring inside the heading.', trigger: ':focus-visible' },
    { name: 'Disabled', meaning: 'Can’t open.', trigger: 'disabled' },
  ],
  behavior: [
    {
      topic: 'Keyboard',
      text: 'Tab moves between headings; Enter or Space toggles; ↑ ↓ Home End move between headings.',
    },
    { topic: 'Headings', text: 'Choose headingLevel to fit the page outline (default h3).' },
    { topic: 'Motion', text: 'Height animates; no animation for reduced motion.' },
  ],
  content: ['Headings: the question or topic, specific enough to scan.'],
  guidelines: [
    {
      do: 'Write headings people can scan.',
      dont: 'Use vague headings like “More”.',
      why: 'People decide what to open from the heading alone.',
    },
    {
      do: 'Pick the heading level that fits the page.',
      dont: 'Leave every accordion at h3 regardless of context.',
      why: 'Screen reader users navigate by heading level.',
    },
    {
      do: 'Show essential content directly.',
      dont: 'Hide required information in closed sections.',
      why: 'Many people never open accordions.',
    },
  ],
  accessibility: {
    role: 'headings containing buttons that control regions.',
    keyboard: [
      { keys: 'Tab', action: 'Moves between headings.' },
      { keys: 'Enter / Space', action: 'Toggles a section.' },
      { keys: '↑ ↓ Home End', action: 'Move between headings.' },
    ],
    aria: [{ attribute: 'aria-expanded / aria-controls', when: 'On each heading button (Radix).' }],
    focus: 'Focus ring inside the heading.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Real headings and button semantics.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Expanded state exposed.' },
      { criterion: '2.1.1 Keyboard', how: 'Fully keyboard operable.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'faq',
      title: 'FAQ',
      description: 'One at a time.',
      code: `import { Accordion, AccordionItem } from '@ds/react';

<Accordion type="single" collapsible>
  <AccordionItem value="shipping" title="How long does shipping take?">3–5 working days.</AccordionItem>
  <AccordionItem value="returns" title="Can I return an item?">Yes, within 30 days.</AccordionItem>
</Accordion>`,
    },
    {
      id: 'multiple',
      title: 'Several open',
      description: 'Settings sections.',
      code: `import { Accordion, AccordionItem } from '@ds/react';

<Accordion type="multiple" defaultValue={['profile']}>
  <AccordionItem value="profile" title="Profile">…</AccordionItem>
  <AccordionItem value="security" title="Security">…</AccordionItem>
</Accordion>`,
    },
    {
      id: 'level',
      title: 'Heading level',
      description: 'Under an h2.',
      code: `import { Accordion, AccordionItem } from '@ds/react';

<h2>Help</h2>
<Accordion type="single" collapsible>
  <AccordionItem value="a" title="Question" headingLevel={3}>Answer.</AccordionItem>
</Accordion>`,
    },
  ],
  tokenPrefixes: ['--accordion-'],
  related: [{ id: 'tabs', relation: 'For switching between views.' }],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
