import { defineMeta } from '../meta';

export default defineMeta({
  id: 'description-list',
  name: 'DescriptionList',
  category: 'Data display',
  status: 'stable',
  since: '1.3.0',
  description:
    'Pairs of labels and values, such as an invoice summary, order totals or account details. An emphasised row sets a total apart.',
  imports: [{ name: 'DescriptionList', from: '@ds/react' }],
  whenToUse: [
    'For key–value details: an invoice, an order summary, a profile.',
    'For totals, with the final row emphasised.',
  ],
  whenNotToUse: [
    { text: 'For many records with the same columns.', alternative: 'Table' },
    { text: 'For a single key figure with a trend.', alternative: 'Stat' },
    { text: 'For editable settings.', alternative: 'SettingsList' },
  ],
  anatomy: [
    { name: 'Term', description: 'The label, e.g. "Subtotal".' },
    { name: 'Description', description: 'The value, e.g. "$120.00".' },
    { name: 'Divider', description: 'A line between rows, when divided.', optional: true },
  ],
  options: [
    {
      prop: 'layout',
      title: 'Layout',
      values: [
        { value: 'horizontal', meaning: 'Default. Terms on the start, values on the end.' },
        { value: 'stacked', meaning: 'Values under their terms, for narrow columns.' },
      ],
    },
    {
      prop: 'divided',
      title: 'Dividers',
      values: [
        { value: 'false', meaning: 'Default. Spaced rows.' },
        { value: 'true', meaning: 'A line between rows.' },
      ],
    },
    {
      prop: 'emphasis',
      title: 'Emphasis',
      values: [
        { value: 'false', meaning: 'Default. A regular row.' },
        { value: 'true', meaning: 'A total: bold, with a line above it.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Read-only details.', trigger: '—' }],
  behavior: [
    { topic: 'Semantics', text: 'A description list: each term is paired with its value.' },
    { topic: 'Numbers', text: 'Values use tabular figures so amounts line up.' },
    { topic: 'Right-to-left', text: 'Terms sit on the right and values on the left in Arabic.' },
  ],
  content: [
    'Name terms as the reader would: "Subtotal", "VAT (10%)".',
    'Format amounts with the currency and the same number of decimals.',
  ],
  guidelines: [
    {
      do: 'Emphasise only the total.',
      dont: 'Bold several rows.',
      why: 'One emphasised row tells the reader where the answer is.',
    },
    {
      do: 'Keep terms short and in the same order as the calculation.',
      dont: 'Mix totals and line items without a divider.',
      why: 'The order shows how the total was reached.',
    },
    {
      do: 'Use stacked layout in narrow columns.',
      dont: 'Squeeze terms and values side by side in a 240px panel.',
      why: 'Stacked layout keeps long values readable.',
    },
  ],
  accessibility: {
    role: 'definition list (dl) with term and description pairs.',
    keyboard: [{ keys: '—', action: 'No keyboard interaction; use the controls inside, if any.' }],
    aria: [],
    focus: 'Static content; no focus stops.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Terms and descriptions are real dt and dd elements.' },
      { criterion: '1.4.3 Contrast', how: 'Secondary terms pass AA on every surface in every theme.' },
    ],
    notes: ['Emphasis is shown by weight and a line, not color alone.'],
  },
  examples: [
    {
      id: 'totals',
      title: 'Order totals',
      description: 'Line items with an emphasised total.',
      code: `import { DescriptionList } from '@ds/react';

<DescriptionList
  divided
  items={[
    { term: 'Subtotal', description: '$1,100.00' },
    { term: 'VAT (10%)', description: '$110.00' },
    { term: 'Total', description: '$1,210.00', emphasis: true },
  ]}
/>`,
    },
    {
      id: 'stacked',
      title: 'Account details',
      description: 'Stacked for a narrow panel.',
      code: `import { DescriptionList } from '@ds/react';

<DescriptionList layout="stacked" items={[{ term: 'Email', description: 'maya@orbit.app' }]} />`,
    },
    {
      id: 'profile',
      title: 'Profile',
      description: 'Plain key–value pairs.',
      code: `import { DescriptionList } from '@ds/react';

<DescriptionList items={[{ term: 'Role', description: 'Designer' }, { term: 'Team', description: 'Design systems' }]} />`,
    },
  ],
  tokenPrefixes: ['--description-list-'],
  related: [
    { id: 'stat', relation: 'For a single key figure.' },
    { id: 'table', relation: 'For many records.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
