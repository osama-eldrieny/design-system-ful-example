import { defineMeta } from '../meta';

export default defineMeta({
  id: 'stat',
  name: 'Stat',
  category: 'Data display',
  status: 'stable',
  since: '0.4.0',
  description:
    'A stat shows one key figure with its label and change, such as revenue up 12.5% vs last month. Trends are shown with an arrow, a color and words for screen readers.',
  imports: [{ name: 'Stat', from: '@ds/react' }],
  whenToUse: ['For KPI tiles and dashboard summaries.'],
  whenNotToUse: [
    { text: 'For tables of figures.', alternative: 'Table' },
    { text: 'For progress toward a goal.', alternative: 'Progress' },
  ],
  anatomy: [
    { name: 'Label', description: 'What is measured.' },
    { name: 'Value', description: 'The figure.' },
    { name: 'Change', description: 'Arrow, change and context.', optional: true },
  ],
  options: [
    {
      prop: 'trend',
      title: 'Trend',
      values: [
        { value: 'up', meaning: 'Arrow up; good by default.' },
        { value: 'down', meaning: 'Arrow down; bad by default.' },
        { value: 'neutral', meaning: 'No arrow.' },
      ],
    },
    {
      prop: 'positive',
      title: 'Meaning',
      values: [
        { value: 'true', meaning: 'The change is good news (green).' },
        { value: 'false', meaning: 'The change is bad news (red).' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Not interactive.', trigger: '—' }],
  behavior: [
    { topic: 'Semantics', text: 'A description list: label (dt), value and change (dd).' },
    { topic: 'Trend words', text: '“increased” or “decreased” is read before the change.' },
  ],
  content: ['Format values for the reader: currency, thousands separators, units.'],
  guidelines: [
    {
      do: 'Set positive for metrics where down is good.',
      dont: 'Show falling costs in red.',
      why: 'Color should match whether the change is good.',
    },
    {
      do: 'Give context (“vs last month”).',
      dont: 'Show “+12%” with no period.',
      why: 'A change means nothing without a baseline.',
    },
    {
      do: 'Round figures sensibly.',
      dont: 'Show $124,567.2381.',
      why: 'Precision beyond need slows reading.',
    },
  ],
  accessibility: {
    role: 'description list.',
    keyboard: [{ keys: '—', action: 'Not focusable.' }],
    aria: [{ attribute: 'visually hidden trend word', when: 'Up and down changes.' }],
    focus: 'None.',
    wcag: [
      { criterion: '1.4.1 Use of Color', how: 'Arrow and words, not just color.' },
      { criterion: '1.3.1 Info and Relationships', how: 'Label and value are paired in a dl.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'KPI',
      description: 'Revenue up.',
      code: 'import { Stat } from \'@ds/react\';\n\n<Stat label="Total revenue" value="$124,567" change="+12.5%" trend="up" help="vs last month" />',
    },
    {
      id: 'down-good',
      title: 'Down is good',
      description: 'Costs falling.',
      code: 'import { Stat } from \'@ds/react\';\n\n<Stat label="Costs" value="$8,210" change="-4%" trend="down" positive />',
    },
    {
      id: 'plain',
      title: 'Value only',
      description: 'No change.',
      code: 'import { Stat } from \'@ds/react\';\n\n<Stat label="Active users" value="8,432" />',
    },
  ],
  tokenPrefixes: ['--stat-'],
  related: [{ id: 'card', relation: 'Put stats in cards for dashboards.' }],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
