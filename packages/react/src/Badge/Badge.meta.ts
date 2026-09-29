import { defineMeta } from '../meta';

export default defineMeta({
  id: 'badge',
  name: 'Badge',
  category: 'Feedback',
  status: 'stable',
  since: '0.4.0',
  description:
    'A badge is a small, non-interactive label for a status (“Paid”, “New”) or a count (3 unread). It comes in five tones, solid or subtle, and as a dot.',
  imports: [{ name: 'Badge', from: '@ds/react' }],
  whenToUse: [
    'To show the status of an item in a list or table.',
    'To show a count on navigation or an icon, e.g. unread messages.',
  ],
  whenNotToUse: [
    { text: 'For keywords people can remove or filter by.', alternative: 'Tag' },
    { text: 'For a message that needs reading.', alternative: 'Alert' },
    { text: 'For something clickable.', alternative: 'Button or Link' },
  ],
  anatomy: [
    { name: 'Container', description: 'Pill in the tone color.' },
    { name: 'Text or count', description: 'Short status or a number (max+ above max).' },
  ],
  options: [
    {
      prop: 'tone',
      title: 'Tone',
      values: [
        { value: 'primary', meaning: 'Brand emphasis, e.g. “New”. Default.' },
        { value: 'secondary', meaning: 'Neutral, e.g. “Draft”.' },
        { value: 'success', meaning: 'Done or healthy, e.g. “Paid”.' },
        { value: 'warning', meaning: 'Needs attention, e.g. “Due soon”.' },
        { value: 'danger', meaning: 'Failed or overdue.' },
      ],
    },
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'subtle', meaning: 'Tinted; for statuses in lists. Default.' },
        { value: 'solid', meaning: 'Filled; for counts that must stand out.' },
      ],
    },
    {
      prop: 'dot',
      title: 'Dot',
      values: [
        { value: 'false', meaning: 'Shows text or a count. Default.' },
        { value: 'true', meaning: 'A small dot, e.g. “new activity”; needs label.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Badges are not interactive.', trigger: '—' }],
  behavior: [
    {
      topic: 'Counts',
      text: 'count above max shows “99+”. Pass label (“128 unread messages”) so screen readers hear the full meaning.',
    },
    { topic: 'Dots', text: 'A dot has no text, so label is required.' },
  ],
  content: [
    'One or two words, in sentence case.',
    'Use the same words for the same status everywhere.',
  ],
  guidelines: [
    {
      do: 'Pair color with a word: “Overdue” in danger.',
      dont: 'Use a red badge with no text to mean overdue.',
      why: 'Color alone isn’t seen by everyone (WCAG 1.4.1).',
    },
    {
      do: 'Give counts and dots a label.',
      dont: 'Leave “3” to be announced on its own.',
      why: '“3” means nothing out of context to a screen reader user.',
    },
    {
      do: 'Keep badges static.',
      dont: 'Make a badge clickable.',
      why: 'Badges don’t look interactive; use a Tag, Button or Link.',
    },
  ],
  accessibility: {
    role: 'text (not interactive).',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [
      {
        attribute: 'visually hidden label',
        when: 'label replaces the shown text for screen readers.',
      },
    ],
    focus: 'None.',
    wcag: [
      { criterion: '1.4.1 Use of Color', how: 'Status words, not color alone.' },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Text passes 4.5:1 on every tone in every theme.',
      },
      { criterion: '1.1.1 Non-text Content', how: 'Dots and counts get a text label.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'status',
      title: 'Status',
      description: 'In a table.',
      code: `import { Badge } from '@ds/react';\n\n<Badge tone="success">Paid</Badge>`,
    },
    {
      id: 'count',
      title: 'Count',
      description: 'Unread messages.',
      code: `import { Badge } from '@ds/react';\n\n<Badge appearance="solid" tone="danger" count={128} label="128 unread messages" />`,
    },
    {
      id: 'dot',
      title: 'Dot',
      description: 'New activity.',
      code: `import { Badge } from '@ds/react';\n\n<Badge dot tone="primary" label="New activity" />`,
    },
  ],
  tokenPrefixes: ['--badge-'],
  related: [
    { id: 'tag', relation: 'For removable or selectable labels.' },
    { id: 'alert', relation: 'For messages.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
