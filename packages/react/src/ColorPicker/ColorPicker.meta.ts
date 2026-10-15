import { defineMeta } from '../meta';

export default defineMeta({
  id: 'color-picker',
  name: 'ColorPicker',
  category: 'Forms',
  status: 'stable',
  since: '1.2.0',
  description:
    'A row of color swatches to choose one from, such as a label or calendar color, with an optional custom color from the system picker.',
  imports: [{ name: 'ColorPicker', from: '@ds/react' }, { name: 'ColorSwatch', from: '@ds/react' }],
  whenToUse: [
    'To pick a color for something people own, e.g. a tag, project or calendar.',
    'When a short, curated set of colors covers most needs.',
  ],
  whenNotToUse: [
    { text: 'To choose between options that only happen to have colors.', alternative: 'RadioGroup' },
    { text: 'To change the product’s theme.', alternative: 'ThemeProvider' },
  ],
  anatomy: [
    { name: 'Legend', description: 'Names what the color is for.' },
    { name: 'Swatch', description: 'One color; the chosen one gets a ring and a check mark.' },
    { name: 'Custom swatch', description: 'Opens the system color picker.', optional: true },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'In menus, popovers and toolbars.' },
        { value: 'medium', meaning: 'Default.' },
      ],
    },
    {
      prop: 'allowCustom',
      title: 'Custom color',
      values: [
        { value: 'false', meaning: 'Default. Only the given swatches.' },
        { value: 'true', meaning: 'Adds a swatch that opens the system color picker.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'A color that can be chosen.', trigger: '—' },
    { name: 'Hover', meaning: 'The swatch grows slightly.', trigger: ':hover.' },
    { name: 'Focus', meaning: 'Shows which swatch the keyboard is on.', trigger: ':focus-visible.' },
    { name: 'Selected', meaning: 'The chosen color, with a ring and check.', trigger: 'value matches.' },
    { name: 'Disabled', meaning: 'The color cannot be changed.', trigger: 'disabled prop.' },
  ],
  behavior: [
    { topic: 'Choosing', text: 'Clicking a swatch chooses it; arrow keys move between swatches.' },
    {
      topic: 'Custom colors',
      text: 'With allowCustom, the last swatch opens the system picker; a custom color shows in it once chosen.',
    },
    { topic: 'Forms', text: 'Swatches are native radio inputs inside a fieldset, so disabled works like any field.' },
  ],
  content: [
    'Name every swatch in plain words: "Blue", not "#2563eb".',
    'Keep the set short, eight to twelve colors.',
    'Use a legend that says what the color is for.',
  ],
  guidelines: [
    {
      do: 'Give each swatch a name.',
      dont: 'Leave screen-reader users with hex codes or nothing.',
      why: 'The name is what people hear and see in the tooltip.',
    },
    {
      do: 'Offer a curated set that works in light and dark themes.',
      dont: 'Offer any color by default.',
      why: 'Curated colors keep text on them readable.',
    },
    {
      do: 'Show the chosen color wherever it is used right away.',
      dont: 'Hide the result until a Save button is pressed.',
      why: 'Seeing the color in place helps people decide.',
    },
  ],
  accessibility: {
    role: 'group (a fieldset with a legend) of native radio inputs.',
    keyboard: [
      { keys: 'Tab', action: 'Moves to the chosen swatch, then to the custom swatch.' },
      { keys: 'Arrow keys', action: 'Choose the previous or next swatch.' },
      { keys: 'Enter / Space', action: 'On the custom swatch, opens the system picker.' },
    ],
    aria: [{ attribute: 'aria-label', when: 'On each swatch, from its name.' }],
    focus: 'A focus ring appears outside the selection ring.',
    wcag: [
      { criterion: '1.4.1 Use of Color', how: 'Every swatch has a name; the chosen one has a ring and check, not just color.' },
      { criterion: '2.1.1 Keyboard', how: 'Native radio keyboard behavior.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Radios named by color, grouped by the legend.' },
    ],
    notes: ['The check has an outline so it reads on light and dark swatches.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Label color',
      description: 'A controlled picker.',
      code: `import { ColorPicker } from '@ds/react';

<ColorPicker
  label="Label color"
  swatches={[{ value: '#2563eb', name: 'Blue' }, { value: '#16a34a', name: 'Green' }]}
  value={color}
  onValueChange={setColor}
/>`,
    },
    {
      id: 'custom',
      title: 'With a custom color',
      description: 'Adds the system color picker.',
      code: `import { ColorPicker } from '@ds/react';

<ColorPicker label="Project color" swatches={swatches} allowCustom />`,
    },
    {
      id: 'menu',
      title: 'In a menu',
      description: 'Small, with the legend hidden because the menu already says it.',
      code: `import { ColorPicker } from '@ds/react';

<ColorPicker label="Highlight" swatches={swatches} size="small" hideLabel />`,
    },
  ],
  tokenPrefixes: ['--color-picker-'],
  related: [{ id: 'radio-group', relation: 'Use for options described in words.' }],
  changelog: [{ version: '1.2.0', date: '2026-10-15', changes: ['New component.'] }],
});
