import { defineMeta } from '../meta';

export default defineMeta({
  id: 'slider',
  name: 'Slider',
  category: 'Forms',
  status: 'stable',
  since: '0.3.0',
  description:
    'A slider sets a number, or a range with two thumbs, by dragging along a track or with the arrow keys. It can show its value and labelled marks, and is labelled like every other field.',
  imports: [{ name: 'Slider', from: '@ds/react' }],
  whenToUse: [
    'When the exact number matters less than the position, e.g. volume, brightness, zoom.',
    'For a price or date range filter (two thumbs).',
  ],
  whenNotToUse: [
    { text: 'When people need an exact number.', alternative: 'InputField with type="number"' },
    { text: 'For a few named choices.', alternative: 'RadioGroup or ButtonGroup' },
  ],
  anatomy: [
    { name: 'Label and value', description: 'From FormField; the value shows with showValue.' },
    { name: 'Track', description: 'The full range.' },
    { name: 'Range', description: 'The filled part up to (or between) the thumbs.' },
    { name: 'Thumb', description: 'Drag or focus and use arrow keys; two for a range.' },
    { name: 'Marks', description: 'Labelled positions under the track.', optional: true },
  ],
  options: [
    {
      prop: 'value',
      title: 'Values',
      values: [
        { value: '[n]', meaning: 'One thumb: a single value. Default.' },
        { value: '[from, to]', meaning: 'Two thumbs: a range.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'At rest.', trigger: '—' },
    { name: 'Hover', meaning: 'Thumb border darkens.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Focus ring on the thumb.', trigger: ':focus-visible' },
    { name: 'Disabled', meaning: 'Dimmed; can’t move.', trigger: 'disabled' },
  ],
  behavior: [
    {
      topic: 'Keyboard',
      text: 'Arrows move one step, Page Up/Down ten steps, Home/End to min/max.',
    },
    {
      topic: 'Announcements',
      text: 'Thumbs announce formatValue(value), e.g. “$40”; range thumbs are named “Price Minimum” / “Price Maximum”.',
    },
    {
      topic: 'Events',
      text: 'onValueChange fires while dragging; onValueCommit once at the end. Filter with onValueCommit.',
    },
    { topic: 'Right-to-left', text: 'The track fills from the right.' },
  ],
  content: [
    'Show the value (showValue) unless the effect itself shows it.',
    'Format values in their unit: “$40”, “75%”.',
    'Mark the ends or meaningful stops, not every step.',
  ],
  guidelines: [
    {
      do: 'Pair with a number field when exact values matter.',
      dont: 'Make people drag to hit exactly 37.',
      why: 'Sliders are imprecise, especially on touch screens.',
    },
    {
      do: 'Use formatValue so screen readers hear units.',
      dont: 'Leave values as bare numbers for prices.',
      why: '“40 dollars” is clearer than “40”.',
    },
    {
      do: 'Filter with onValueCommit.',
      dont: 'Re-run a slow search on every drag frame.',
      why: 'It keeps the page responsive.',
    },
  ],
  accessibility: {
    role: 'slider (each thumb), labelled by the field label.',
    keyboard: [
      { keys: '← → ↑ ↓', action: 'One step.' },
      { keys: 'Page Up / Page Down', action: 'Ten steps.' },
      { keys: 'Home / End', action: 'Minimum / maximum.' },
    ],
    aria: [
      {
        attribute: 'aria-labelledby',
        when: 'The field label (plus “Minimum”/“Maximum” for ranges).',
      },
      { attribute: 'aria-valuetext', when: 'The formatted value.' },
      { attribute: 'aria-describedby', when: 'Help text and error.' },
    ],
    focus: 'Focus ring on the thumb.',
    wcag: [
      { criterion: '2.1.1 Keyboard', how: 'Fully operable by keyboard.' },
      {
        criterion: '2.5.7 Dragging Movements',
        how: 'Clicking the track and the keyboard work without dragging.',
      },
      { criterion: '1.4.11 Non-text Contrast', how: 'Track, range and thumb border meet 3:1.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'single',
      title: 'Single value',
      description: 'Volume with its value shown.',
      code: `import { Slider } from '@ds/react';

<Slider label="Volume" defaultValue={[60]} showValue formatValue={(v) => \`\${v}%\`} />`,
    },
    {
      id: 'range',
      title: 'Range',
      description: 'A price filter with marks.',
      code: `import { Slider } from '@ds/react';

<Slider
  label="Price"
  min={0}
  max={500}
  step={10}
  defaultValue={[100, 300]}
  showValue
  formatValue={(v) => \`$\${v}\`}
  marks={[{ value: 0 }, { value: 250 }, { value: 500 }]}
  onValueCommit={([from, to]) => filter(from, to)}
/>`,
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'Keep the value in state.',
      code: `import { Slider } from '@ds/react';

<Slider label="Zoom" min={50} max={200} step={10} value={[zoom]} onValueChange={([z]) => setZoom(z)} />`,
    },
  ],
  tokenPrefixes: ['--slider-'],
  related: [
    { id: 'input-field', relation: 'For exact numbers.' },
    { id: 'form-field', relation: 'Provides the label and messages.' },
  ],
  changelog: [{ version: '0.3.0', date: '2026-09-29', changes: ['New component.'] }],
});
