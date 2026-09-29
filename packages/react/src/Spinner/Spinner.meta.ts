import { defineMeta } from '../meta';

export default defineMeta({
  id: 'spinner',
  name: 'Spinner',
  category: 'Feedback',
  status: 'stable',
  since: '0.4.0',
  description:
    'A spinner shows that something is loading when the time it takes is unknown. It announces its label once, politely, to screen readers.',
  imports: [{ name: 'Spinner', from: '@ds/react' }],
  whenToUse: ['For short waits of unknown length: loading a panel, saving, fetching results.'],
  whenNotToUse: [
    { text: 'When progress is known, e.g. uploads.', alternative: 'Progress' },
    { text: 'When the page layout is known.', alternative: 'Skeleton' },
  ],
  anatomy: [
    { name: 'Circle', description: 'Track with a turning arc.' },
    { name: 'Label', description: 'Hidden text announced as a status.' },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Inside buttons and fields.' },
        { value: 'medium', meaning: 'Default.' },
        { value: 'large', meaning: 'Page areas.' },
      ],
    },
  ],
  states: [{ name: 'Spinning', meaning: 'While shown.', trigger: '—' }],
  behavior: [
    { topic: 'Announcement', text: 'role="status" announces the label once when it appears.' },
    { topic: 'Motion', text: 'Spins slower for people who prefer reduced motion.' },
  ],
  content: ['Say what is loading: “Loading orders”, not just “Loading”.'],
  guidelines: [
    {
      do: 'Say what’s loading in the label.',
      dont: 'Leave the default label for every spinner.',
      why: 'Specific labels tell screen reader users what they’re waiting for.',
    },
    {
      do: 'Use one spinner per loading area.',
      dont: 'Show a spinner in every card at once.',
      why: 'Many spinners are noisy visually and for screen readers.',
    },
    {
      do: 'Show a Skeleton when the layout is known.',
      dont: 'Replace a whole page with a spinner.',
      why: 'Skeletons reduce layout jumps and feel faster.',
    },
  ],
  accessibility: {
    role: 'status.',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [{ attribute: 'role="status"', when: 'Always; the label is its text.' }],
    focus: 'None.',
    wcag: [
      { criterion: '4.1.3 Status Messages', how: 'Loading is announced without moving focus.' },
      { criterion: '2.3.3 Animation from Interactions', how: 'Slows for reduced motion.' },
      { criterion: '1.4.11 Non-text Contrast', how: 'Arc color meets 3:1.' },
    ],
    notes: ['Mark the loading region aria-busy="true" until it’s ready.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Loading a panel',
      description: 'With a specific label.',
      code: `import { Spinner } from '@ds/react';\n\n<Spinner label="Loading orders" />`,
    },
    {
      id: 'button',
      title: 'In a button',
      description: 'Small size.',
      code: `import { Button, Spinner } from '@ds/react';\n\n<Button disabled><Spinner size="small" label="Saving" /> Saving…</Button>`,
    },
    {
      id: 'region',
      title: 'Busy region',
      description: 'Mark the area busy.',
      code: `import { Spinner } from '@ds/react';\n\n<section aria-busy={loading}>\n  {loading ? <Spinner size="large" label="Loading report" /> : <Report />}\n</section>`,
    },
  ],
  tokenPrefixes: ['--spinner-'],
  related: [
    { id: 'progress', relation: 'For known progress.' },
    { id: 'skeleton', relation: 'For loading known layouts.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
