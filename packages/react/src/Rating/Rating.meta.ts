import { defineMeta } from '../meta';

export default defineMeta({
  id: 'rating',
  name: 'Rating',
  category: 'Forms',
  status: 'stable',
  since: '1.2.0',
  description:
    'Stars for giving a score, such as rating a template, or for showing one, such as an average of 4.5 out of 5. Interactive ratings are a radio group; read-only ratings can show halves.',
  imports: [{ name: 'Rating', from: '@ds/react' }],
  whenToUse: [
    'To let people score something on a short scale, e.g. "Rate this template".',
    'To show an average score next to products, reviews or templates.',
  ],
  whenNotToUse: [
    { text: 'To pick a number from a wide range.', alternative: 'Slider' },
    { text: 'For a yes / no reaction.', alternative: 'Button' },
    { text: 'To show progress toward a goal.', alternative: 'ProgressBar' },
  ],
  anatomy: [
    { name: 'Stars', description: 'One star per score; filled stars show the rating.' },
    { name: 'Value', description: 'The number after the stars, e.g. "4.5".', optional: true },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'In lists, cards and table rows.' },
        { value: 'medium', meaning: 'Default.' },
        { value: 'large', meaning: 'For a dedicated rating form or review dialog.' },
      ],
    },
    {
      prop: 'readOnly',
      title: 'Read only',
      values: [
        { value: 'false', meaning: 'Default. People choose a score.' },
        { value: 'true', meaning: 'Shows a score, including halves, without letting people change it.' },
      ],
    },
    {
      prop: 'showValue',
      title: 'Show value',
      values: [
        { value: 'false', meaning: 'Default. Stars only.' },
        { value: 'true', meaning: 'Adds the number after the stars.' },
      ],
    },
  ],
  states: [
    { name: 'Not rated', meaning: 'No score chosen yet; all stars are empty.', trigger: 'value is 0.' },
    { name: 'Rated', meaning: 'Stars up to the score are filled.', trigger: 'value is 1 to max.' },
    { name: 'Hover', meaning: 'Previews the score up to the star under the pointer.', trigger: ':hover.' },
    { name: 'Focus', meaning: 'Shows keyboard focus on the current star.', trigger: ':focus-visible.' },
    { name: 'Read only', meaning: 'Shows a score that cannot be changed.', trigger: 'readOnly prop.' },
  ],
  behavior: [
    { topic: 'Choosing', text: 'Clicking a star sets the score to it. Arrow keys move the score up and down.' },
    {
      topic: 'Controlled or not',
      text: 'Pass value and onValueChange to control it, or defaultValue to let it manage its own state.',
    },
    { topic: 'Halves', text: 'Read-only ratings fill stars partly, so 4.5 shows four and a half stars.' },
    { topic: 'Right-to-left', text: 'Stars run from the right in Arabic, and partial stars fill from the right.' },
  ],
  content: [
    'Name what is rated in the label: "Rate this template", not "Rating".',
    'Show the number next to read-only stars when exact values matter.',
    'Translate starLabel and summaryLabel in other languages.',
  ],
  guidelines: [
    {
      do: 'Give the rating a label that says what is rated.',
      dont: 'Leave stars without a name.',
      why: 'Screen readers announce the label as the group name.',
    },
    {
      do: 'Use read-only stars with the value for averages.',
      dont: 'Use interactive stars to show someone else’s score.',
      why: 'Interactive stars invite a click that would change the score.',
    },
    {
      do: 'Keep the scale at five stars.',
      dont: 'Use ten or more stars.',
      why: 'Long scales are slow to scan and hard to hit on touch screens.',
    },
  ],
  accessibility: {
    role: 'radiogroup of native radio inputs; read-only ratings are role="img" with a summary.',
    keyboard: [
      { keys: 'Tab', action: 'Moves focus to the chosen star (or the first one).' },
      { keys: 'Arrow keys', action: 'Change the score.' },
    ],
    aria: [
      { attribute: 'aria-label', when: 'From label on the group; each star is named "N stars".' },
      { attribute: 'role="img"', when: 'Read-only ratings, named "Label: Rated 4.5 out of 5".' },
    ],
    focus: 'A focus ring appears around the focused star.',
    wcag: [
      { criterion: '1.1.1 Non-text Content', how: 'Read-only stars have a text summary of the score.' },
      { criterion: '2.1.1 Keyboard', how: 'Native radio inputs: Tab to the group, arrows to change.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'A named radio group whose checked star is the value.' },
    ],
    notes: ['Filled and empty stars differ in shape fill as well as color.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Rate something',
      description: 'A controlled rating.',
      code: `import { Rating } from '@ds/react';

<Rating label="Rate this template" value={score} onValueChange={setScore} />`,
    },
    {
      id: 'average',
      title: 'Average score',
      description: 'Read-only, with a half star and the number.',
      code: `import { Rating } from '@ds/react';

<Rating label="Customer rating" value={4.5} readOnly showValue size="small" />`,
    },
    {
      id: 'arabic',
      title: 'Translated',
      description: 'Custom words for each star.',
      code: `import { Rating } from '@ds/react';

<Rating label="قيّم القالب" starLabel={(n) => \`\${n} من 5\`} />`,
    },
  ],
  tokenPrefixes: ['--rating-'],
  related: [
    { id: 'radio-group', relation: 'Use for scores that need words, e.g. "Poor" to "Great".' },
    { id: 'slider', relation: 'Use for a wide numeric range.' },
  ],
  changelog: [{ version: '1.2.0', date: '2026-10-15', changes: ['New component.'] }],
});
