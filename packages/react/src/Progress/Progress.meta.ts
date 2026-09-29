import { defineMeta } from '../meta';

export default defineMeta({
  id: 'progress',
  name: 'Progress',
  category: 'Feedback',
  status: 'stable',
  since: '0.4.0',
  description:
    'A progress bar shows how far a task has got, such as an upload or setup steps. Without a value it becomes an indeterminate, animated bar.',
  imports: [{ name: 'Progress', from: '@ds/react' }],
  whenToUse: [
    'For tasks with measurable progress: uploads, downloads, processing.',
    'For completion, e.g. a profile 60% complete or storage used.',
  ],
  whenNotToUse: [
    { text: 'For unknown, short waits in a small area.', alternative: 'Spinner' },
    { text: 'For steps people move through.', alternative: 'Stepper' },
  ],
  anatomy: [
    { name: 'Label', description: 'Names the bar.' },
    { name: 'Value', description: '“45%”.', optional: true },
    { name: 'Track', description: 'The full length.' },
    { name: 'Bar', description: 'The completed part in the tone color.' },
  ],
  options: [
    {
      prop: 'tone',
      title: 'Tone',
      values: [
        { value: 'primary', meaning: 'Default.' },
        { value: 'success', meaning: 'Complete or healthy.' },
        { value: 'warning', meaning: 'Near a limit, e.g. storage 90%.' },
        { value: 'danger', meaning: 'Over a limit or failed.' },
      ],
    },
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'medium', meaning: 'Default.' },
        { value: 'small', meaning: 'Thin; cards and tables.' },
      ],
    },
  ],
  states: [
    { name: 'Determinate', meaning: 'Bar length shows value/max.', trigger: 'value' },
    { name: 'Indeterminate', meaning: 'Animated bar; unknown progress.', trigger: 'no value' },
  ],
  behavior: [
    {
      topic: 'Announcement',
      text: 'A progressbar with aria-valuenow and aria-valuetext (“45%”). Screen readers read it when focused or navigated to; announce completion separately.',
    },
    {
      topic: 'Motion',
      text: 'The bar eases between values; the indeterminate animation slows for reduced motion.',
    },
  ],
  content: ['Label: what is happening, e.g. “Uploading report.pdf”.'],
  guidelines: [
    {
      do: 'Always give a label.',
      dont: 'Show an unlabelled bar.',
      why: 'The label says what is progressing.',
    },
    {
      do: 'Announce completion with an Alert or toast.',
      dont: 'Rely on the bar reaching 100%.',
      why: 'Screen reader users don’t hear the bar change.',
    },
    {
      do: 'Use a tone with a word for limits (“90% used”).',
      dont: 'Show danger color without saying why.',
      why: 'Color alone isn’t enough.',
    },
  ],
  accessibility: {
    role: 'progressbar.',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [
      { attribute: 'aria-labelledby', when: 'The label.' },
      {
        attribute: 'aria-valuenow / min / max / valuetext',
        when: 'Determinate; left out when indeterminate.',
      },
    ],
    focus: 'None.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Labelled progressbar.' },
      { criterion: '1.4.11 Non-text Contrast', how: 'Bar meets 3:1 against the track.' },
      { criterion: '2.3.3 Animation from Interactions', how: 'Slows for reduced motion.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'upload',
      title: 'Upload',
      description: 'With the value shown.',
      code: `import { Progress } from '@ds/react';\n\n<Progress label="Uploading report.pdf" value={45} showValue />`,
    },
    {
      id: 'storage',
      title: 'Storage',
      description: 'Custom format and tone.',
      code: `import { Progress } from '@ds/react';\n\n<Progress label="Storage" value={9.1} max={10} tone="warning" showValue formatValue={(v, m) => \`\${v} of \${m} GB\`} />`,
    },
    {
      id: 'indeterminate',
      title: 'Indeterminate',
      description: 'Unknown progress.',
      code: `import { Progress } from '@ds/react';\n\n<Progress label="Preparing export" />`,
    },
  ],
  tokenPrefixes: ['--progress-'],
  related: [
    { id: 'spinner', relation: 'For unknown waits.' },
    { id: 'stepper', relation: 'For multi-step tasks.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
