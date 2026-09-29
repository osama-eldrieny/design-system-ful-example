import { defineMeta } from '../meta';

export default defineMeta({
  id: 'empty-state',
  name: 'EmptyState',
  category: 'Feedback',
  status: 'stable',
  since: '0.4.0',
  description:
    'An empty state fills a space that has nothing to show yet, like an empty list or no search results, and explains why and what to do next.',
  imports: [{ name: 'EmptyState', from: '@ds/react' }],
  whenToUse: [
    'For empty lists, tables and dashboards.',
    'For searches or filters with no results.',
  ],
  whenNotToUse: [
    { text: 'For errors.', alternative: 'Alert' },
    { text: 'While loading.', alternative: 'Skeleton or Spinner' },
  ],
  anatomy: [
    { name: 'Icon', description: 'Decorative.' },
    { name: 'Title', description: 'What’s empty; a heading.' },
    { name: 'Description', description: 'Why, and what to do.', optional: true },
    { name: 'Actions', description: 'Next steps.', optional: true },
  ],
  options: [
    {
      prop: 'titleAs',
      title: 'Heading level',
      values: [
        { value: 'h2', meaning: 'Default.' },
        { value: 'h3 / h4', meaning: 'Inside sections.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Shown when there’s no content.', trigger: '—' }],
  behavior: [{ topic: 'Placement', text: 'Centered in the space the content would fill.' }],
  content: [
    'Title: what’s empty (“No orders yet”).',
    'Description: how to fill it.',
    'Action: a verb (“Create order”).',
  ],
  guidelines: [
    {
      do: 'Offer the next step.',
      dont: 'Leave people at a dead end.',
      why: 'An action gets people going.',
    },
    {
      do: 'Match the situation (first use vs. no results).',
      dont: 'Use the same message everywhere.',
      why: 'The fix differs: create vs. change filters.',
    },
    { do: 'Keep it short.', dont: 'Write a paragraph.', why: 'People scan empty states.' },
  ],
  accessibility: {
    role: 'text with a heading.',
    keyboard: [{ keys: 'Tab', action: 'Reaches the actions.' }],
    aria: [{ attribute: 'aria-hidden on the icon', when: 'Always.' }],
    focus: 'None.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'A real heading.' },
      { criterion: '2.4.6 Headings and Labels', how: 'The title describes the empty area.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'first',
      title: 'First use',
      description: 'Nothing created yet.',
      code: 'import { EmptyState, Button } from \'@ds/react\';\n\n<EmptyState title="No orders yet" description="Orders appear here once customers buy." actions={<Button>Create order</Button>} />',
    },
    {
      id: 'search',
      title: 'No results',
      description: 'Filters too narrow.',
      code: 'import { EmptyState, Button } from \'@ds/react\';\nimport { SearchX } from \'lucide-react\';\n\n<EmptyState icon={<SearchX />} title="No results" description="Try other words or clear filters." actions={<Button appearance="outline">Clear filters</Button>} />',
    },
    {
      id: 'level',
      title: 'Heading level',
      description: 'Inside a section.',
      code: 'import { EmptyState } from \'@ds/react\';\n\n<EmptyState titleAs="h3" title="No comments" />',
    },
  ],
  tokenPrefixes: ['--empty-state-'],
  related: [
    { id: 'alert', relation: 'For errors.' },
    { id: 'skeleton', relation: 'While loading.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
