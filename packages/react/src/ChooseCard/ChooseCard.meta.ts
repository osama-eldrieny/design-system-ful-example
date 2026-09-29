import { defineMeta } from '../meta';

export default defineMeta({
  id: 'choose-card',
  name: 'ChooseCard',
  category: 'Patterns',
  status: 'stable',
  since: '0.2.0',
  description:
    'Choose cards are large radio buttons: each option is a card with a name, a description and an optional price, and people pick exactly one. Use them when options need explaining, such as plans.',
  imports: [
    { name: 'ChooseCardGroup', from: '@ds/react' },
    { name: 'ChooseCard', from: '@ds/react' },
  ],
  whenToUse: [
    'To pick one of two to four options that each need a sentence of explanation, e.g. a plan or a delivery speed.',
    'When the choice is important enough to deserve visual weight.',
  ],
  whenNotToUse: [
    { text: 'For short options that need no explanation.', alternative: 'RadioGroup' },
    { text: 'For more than about five options.', alternative: 'RadioGroup or Select' },
    { text: 'When several options can be chosen.', alternative: 'Checkbox' },
    { text: 'To navigate to another page.', alternative: 'Card with href' },
  ],
  anatomy: [
    {
      name: 'Card',
      description: 'The whole card is the radio button; its border shows the state.',
    },
    { name: 'Indicator', description: 'Radio circle, filled when selected.' },
    { name: 'Title', description: 'Option name; names the radio.' },
    { name: 'Description', description: 'What the option includes.', optional: true },
    { name: 'Price', description: 'Price or other key figure, at the end.', optional: true },
  ],
  options: [
    {
      prop: 'orientation',
      title: 'Orientation (on ChooseCardGroup)',
      values: [
        { value: 'vertical', meaning: 'Cards stacked. Default; best in narrow spaces.' },
        {
          value: 'horizontal',
          meaning: 'Cards in a row that wraps when narrow; for side-by-side comparison.',
        },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Not selected.', trigger: '—' },
    { name: 'Hover', meaning: 'Border takes the brand color.', trigger: ':hover' },
    {
      name: 'Selected',
      meaning: 'Thicker brand border and a filled indicator.',
      trigger: 'data-state="checked"',
    },
    { name: 'Focus', meaning: 'Focus ring around the card.', trigger: ':focus-visible' },
    { name: 'Disabled', meaning: 'Dimmed; can’t be chosen.', trigger: 'disabled' },
  ],
  behavior: [
    {
      topic: 'Keyboard',
      text: 'The group is one Tab stop. Arrow keys move to and select the next or previous card.',
    },
    {
      topic: 'Initial selection',
      text: 'Nothing is selected until the person chooses, unless you set value or defaultValue. Preselect only a safe, sensible default.',
    },
    {
      topic: 'Layout',
      text: 'Horizontal groups wrap onto more rows when there isn’t room; the selected border grows inward so nothing shifts.',
    },
    { topic: 'Right-to-left', text: 'The indicator moves to the right and the price to the left.' },
  ],
  content: [
    'Title: the option’s name in one or two words.',
    'Description: one line on what the option gives, focused on the difference from the others.',
    'Price: include the period, e.g. “$29 / month”.',
  ],
  guidelines: [
    {
      do: 'Name the group with a visible heading via aria-labelledby.',
      dont: 'Leave the group unnamed.',
      why: 'Screen reader users hear the group name before the options.',
    },
    {
      do: 'Keep descriptions parallel and about the same length.',
      dont: 'Write a paragraph on one card and a word on the next.',
      why: 'Parallel content makes options easy to compare.',
    },
    {
      do: 'Use two to four cards.',
      dont: 'List ten choose cards.',
      why: 'Large cards for many options push the rest of the page away; use a RadioGroup.',
    },
  ],
  accessibility: {
    role: 'radiogroup containing radio buttons (each card).',
    keyboard: [
      { keys: 'Tab', action: 'Moves into the group, to the selected card (or the first).' },
      { keys: 'Arrow keys', action: 'Move to and select the next or previous card.' },
      { keys: 'Space', action: 'Selects the focused card.' },
    ],
    aria: [
      {
        attribute: 'aria-labelledby on ChooseCardGroup',
        when: 'Always: point it at the visible heading (or use aria-label).',
      },
      {
        attribute: 'aria-labelledby / aria-describedby on each card',
        when: 'Set automatically: the title names it; description and price describe it.',
      },
    ],
    focus: 'A focus ring surrounds the focused card.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Radio group semantics expose the single-choice relationship.',
      },
      {
        criterion: '1.4.1 Use of Color',
        how: 'Selection shows as a filled indicator and a thicker border, not only color.',
      },
      { criterion: '2.1.1 Keyboard', how: 'Tab and arrow keys operate the group.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'plans',
      title: 'Plan picker',
      description: 'Three plans side by side, labelled by a heading.',
      code: `import { ChooseCardGroup, ChooseCard } from '@ds/react';

<h2 id="plan">Choose your plan</h2>
<ChooseCardGroup aria-labelledby="plan" orientation="horizontal" defaultValue="pro">
  <ChooseCard value="basic" title="Basic" description="For individuals" price="Free" />
  <ChooseCard value="pro" title="Pro" description="For professionals" price="$29 / month" />
  <ChooseCard value="team" title="Team" description="For large teams" price="Custom" />
</ChooseCardGroup>`,
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'Keep the selection in state.',
      code: `import { useState } from 'react';
import { ChooseCardGroup, ChooseCard } from '@ds/react';

const [speed, setSpeed] = useState('standard');

<ChooseCardGroup aria-label="Delivery speed" value={speed} onValueChange={setSpeed}>
  <ChooseCard value="standard" title="Standard" description="3–5 working days" price="Free" />
  <ChooseCard value="express" title="Express" description="Next working day" price="$9" />
</ChooseCardGroup>`,
    },
    {
      id: 'disabled',
      title: 'Unavailable option',
      description: 'Disable an option and say why.',
      code: `import { ChooseCardGroup, ChooseCard } from '@ds/react';

<ChooseCardGroup aria-label="Data refresh">
  <ChooseCard value="daily" title="Daily" description="Once a day" />
  <ChooseCard value="realtime" title="Real-time" description="Available on Pro" disabled />
</ChooseCardGroup>`,
    },
  ],
  tokenPrefixes: ['--choose-card-'],
  related: [
    { id: 'radio-group', relation: 'For short options without descriptions.' },
    { id: 'card', relation: 'For cards that link somewhere instead of selecting.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Rebuilt as ChooseCardGroup + ChooseCard on a real radio group: one Tab stop, arrow keys, named options.',
        'isSelected/onChange replaced by value/onValueChange on the group.',
        'New tokens for hover, selected, indicator, focus and per-mode corners.',
      ],
    },
    {
      version: '1.1.0',
      date: '2026-09-29',
      changes: [
        'Softer borders: a 1 px field-gray border, 2 px accent when selected.',
        'Horizontal groups share the row equally and wrap text; a card moves to a new row only below its minimum width.',
      ],
    },
  ],
});
