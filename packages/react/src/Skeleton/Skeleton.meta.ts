import { defineMeta } from '../meta';

export default defineMeta({
  id: 'skeleton',
  name: 'Skeleton',
  category: 'Feedback',
  status: 'stable',
  since: '0.4.0',
  description:
    'A skeleton is a grey placeholder in the shape of content that is loading: lines of text, image blocks and avatar circles. It keeps the layout steady while data arrives.',
  imports: [{ name: 'Skeleton', from: '@ds/react' }],
  whenToUse: ['When loading content whose layout is known: lists, cards, profiles.'],
  whenNotToUse: [
    { text: 'For a short action like saving.', alternative: 'Spinner' },
    { text: 'For measurable tasks.', alternative: 'Progress' },
  ],
  anatomy: [
    { name: 'Text lines', description: 'The last line is shorter.' },
    { name: 'Rect', description: 'Images and media.' },
    { name: 'Circle', description: 'Avatars.' },
  ],
  options: [
    {
      prop: 'variant',
      title: 'Variant',
      values: [
        { value: 'text', meaning: 'Lines of text. Default.' },
        { value: 'rect', meaning: 'A block; set width and height.' },
        { value: 'circle', meaning: 'A circle; set width.' },
      ],
    },
  ],
  states: [
    { name: 'Shimmering', meaning: 'A light sweep; static for reduced motion.', trigger: '—' },
  ],
  behavior: [
    {
      topic: 'Screen readers',
      text: 'Skeletons are hidden. Set aria-busy="true" on the region and announce loading once (e.g. a Spinner or status text).',
    },
    { topic: 'Shape', text: 'Match the real content’s size so nothing jumps when it arrives.' },
  ],
  content: ['Mirror the real layout; don’t add placeholder text.'],
  guidelines: [
    {
      do: 'Match the size of the real content.',
      dont: 'Use one generic block for every layout.',
      why: 'Matching shapes prevent layout shift when content loads.',
    },
    {
      do: 'Mark the region aria-busy.',
      dont: 'Leave screen reader users with an empty region.',
      why: 'Skeletons are silent by design.',
    },
    {
      do: 'Show skeletons only briefly.',
      dont: 'Leave skeletons up after an error.',
      why: 'Replace them with the content or an error message.',
    },
  ],
  accessibility: {
    role: 'none (aria-hidden).',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [{ attribute: 'aria-hidden', when: 'Always; announce loading elsewhere.' }],
    focus: 'None.',
    wcag: [
      { criterion: '2.3.3 Animation from Interactions', how: 'No shimmer for reduced motion.' },
      {
        criterion: '1.3.2 Meaningful Sequence',
        how: 'Hidden placeholders don’t interrupt reading.',
      },
      {
        criterion: '4.1.3 Status Messages',
        how: 'Guidelines require announcing loading separately.',
      },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'text',
      title: 'Text',
      description: 'Three lines.',
      code: `import { Skeleton } from '@ds/react';\n\n<Skeleton lines={3} />`,
    },
    {
      id: 'card',
      title: 'Card',
      description: 'Image, title and text.',
      code: `import { Skeleton } from '@ds/react';\n\n<div aria-busy="true">\n  <Skeleton variant="rect" height={160} />\n  <Skeleton lines={2} />\n</div>`,
    },
    {
      id: 'person',
      title: 'Person',
      description: 'Avatar and name.',
      code: `import { Skeleton } from '@ds/react';\n\n<Skeleton variant="circle" width={40} />\n<Skeleton width="40%" />`,
    },
  ],
  tokenPrefixes: ['--skeleton-'],
  related: [
    { id: 'spinner', relation: 'For unknown layouts or short waits.' },
    { id: 'card', relation: 'A common skeleton shape.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
