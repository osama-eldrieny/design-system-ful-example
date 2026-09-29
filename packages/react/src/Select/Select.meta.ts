import { defineMeta } from '../meta';

export default defineMeta({
  id: 'select',
  name: 'Select',
  category: 'Forms',
  status: 'stable',
  since: '0.3.0',
  description:
    'A select lets people pick one option from a list that opens below the field. It has a label, help text, error and success messages, option groups and disabled options, and matches InputField.',
  imports: [
    { name: 'Select', from: '@ds/react' },
    { name: 'SelectItem', from: '@ds/react' },
    { name: 'SelectGroup', from: '@ds/react' },
    { name: 'SelectSeparator', from: '@ds/react' },
  ],
  whenToUse: [
    'To pick one option from about 5–15 known options, e.g. a country region or a sort order.',
    'When space is tight and the options don’t need to be visible all the time.',
  ],
  whenNotToUse: [
    { text: 'For two to four options.', alternative: 'RadioGroup (all options visible)' },
    { text: 'For long lists people will search.', alternative: 'Combobox' },
    { text: 'To pick several options.', alternative: 'CheckboxGroup' },
    { text: 'For actions such as Edit or Delete.', alternative: 'DropdownMenu' },
  ],
  anatomy: [
    { name: 'Label', description: 'From FormField; names the field.' },
    { name: 'Trigger', description: 'Shows the chosen option or the placeholder, and a chevron.' },
    { name: 'List', description: 'Opens below (or above if there’s no room); scrolls when long.' },
    { name: 'Option', description: 'The chosen option shows a tick.' },
    { name: 'Group label', description: 'Heads a set of options.', optional: true },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Dense UI, filters and tables.' },
        { value: 'medium', meaning: 'Default; matches InputField.' },
        { value: 'large', meaning: 'Prominent forms.' },
      ],
    },
  ],
  states: [
    {
      name: 'Placeholder',
      meaning: 'Nothing chosen yet; secondary text color.',
      trigger: 'no value',
    },
    { name: 'Hover', meaning: 'Darker border.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Focus ring.', trigger: ':focus-visible' },
    { name: 'Open', meaning: 'List shown; chevron flips.', trigger: 'data-state="open"' },
    { name: 'Error', meaning: 'Red border and message; aria-invalid.', trigger: 'error' },
    { name: 'Success', meaning: 'Green border and message.', trigger: 'success' },
    {
      name: 'Disabled',
      meaning: 'Dimmed; can’t open. Options can be disabled on their own.',
      trigger: 'disabled',
    },
  ],
  behavior: [
    {
      topic: 'Keyboard',
      text: 'Space, Enter or arrows open the list; arrows move, Enter selects, Escape closes, typing jumps to matching options.',
    },
    {
      topic: 'Forms',
      text: 'With name, a hidden native select submits the value with the form; required is enforced.',
    },
    {
      topic: 'Themes',
      text: 'The list opens in a portal but keeps the theme of the field it opened from.',
    },
    { topic: 'Long lists', text: 'The list scrolls within the space available on screen.' },
  ],
  content: [
    'Label: what’s being chosen (“Country”).',
    'Placeholder: “Choose a …”, or preselect a sensible default instead.',
    'Options: short, parallel, and in a logical order (alphabetical, by size, by frequency).',
  ],
  guidelines: [
    {
      do: 'Use RadioGroup for two to four options.',
      dont: 'Hide two options inside a Select.',
      why: 'Visible options are faster to compare and choose.',
    },
    {
      do: 'Group long lists with SelectGroup.',
      dont: 'Show 40 ungrouped options.',
      why: 'Groups make long lists scannable; for very long lists use Combobox.',
    },
    {
      do: 'Keep the label visible.',
      dont: 'Use the placeholder as the only label.',
      why: 'The placeholder disappears once something is chosen.',
    },
  ],
  accessibility: {
    role: 'combobox trigger with a listbox of options.',
    keyboard: [
      { keys: 'Space / Enter / ↓', action: 'Opens the list.' },
      { keys: '↑ / ↓', action: 'Moves between options.' },
      { keys: 'Enter', action: 'Selects the highlighted option.' },
      { keys: 'Escape', action: 'Closes without changing.' },
      { keys: 'Type characters', action: 'Jumps to the matching option.' },
    ],
    aria: [
      { attribute: 'aria-expanded / aria-controls', when: 'From Radix on the trigger.' },
      { attribute: 'aria-describedby', when: 'Help text and message.' },
      { attribute: 'aria-invalid', when: 'With an error.' },
      { attribute: 'aria-selected', when: 'On the chosen option.' },
    ],
    focus: 'Focus ring on the trigger; focus returns to it when the list closes.',
    wcag: [
      { criterion: '2.1.1 Keyboard', how: 'Opens, navigates and selects from the keyboard.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Labelled combobox exposing its value.' },
      { criterion: '1.4.11 Non-text Contrast', how: 'Trigger border meets 3:1 in every theme.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Select',
      description: 'Label, placeholder and options.',
      code: `import { Select, SelectItem } from '@ds/react';

<Select label="Sort by" placeholder="Choose an order" name="sort">
  <SelectItem value="newest">Newest first</SelectItem>
  <SelectItem value="price-asc">Price: low to high</SelectItem>
  <SelectItem value="price-desc">Price: high to low</SelectItem>
</Select>`,
    },
    {
      id: 'groups',
      title: 'Groups',
      description: 'Labelled groups and a separator.',
      code: `import { Select, SelectGroup, SelectItem, SelectSeparator } from '@ds/react';

<Select label="Time zone" defaultValue="cet">
  <SelectGroup label="Europe">
    <SelectItem value="gmt">London (GMT)</SelectItem>
    <SelectItem value="cet">Berlin (CET)</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup label="Middle East">
    <SelectItem value="gst">Dubai (GST)</SelectItem>
  </SelectGroup>
</Select>`,
    },
    {
      id: 'controlled',
      title: 'Controlled with an error',
      description: 'Keep the value in state and validate it.',
      code: `import { useState } from 'react';
import { Select, SelectItem } from '@ds/react';

const [plan, setPlan] = useState<string>();

<Select
  label="Plan"
  value={plan}
  onValueChange={setPlan}
  required
  error={submitted && !plan ? 'Choose a plan.' : undefined}
>
  <SelectItem value="free">Free</SelectItem>
  <SelectItem value="pro">Pro</SelectItem>
  <SelectItem value="team" disabled>Team (contact sales)</SelectItem>
</Select>`,
    },
  ],
  tokenPrefixes: ['--select-'],
  related: [
    { id: 'radio-group', relation: 'For two to four visible options.' },
    { id: 'dropdown-menu', relation: 'For actions, not values.' },
    { id: 'form-field', relation: 'Provides the label and messages.' },
  ],
  changelog: [{ version: '0.3.0', date: '2026-09-29', changes: ['New component.'] }],
});
