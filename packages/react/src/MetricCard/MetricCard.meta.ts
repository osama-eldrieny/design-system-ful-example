import { defineMeta } from '../meta';

export default defineMeta({
  id: 'metric-card',
  name: 'MetricCard',
  category: 'Data display',
  status: 'stable',
  since: '1.1.0',
  description:
    'A key figure in a card for dashboards: what is measured, the value, how it changed and against what, with an optional featured icon, a small chart, an actions menu and a footer link.',
  imports: [{ name: 'MetricCard', from: '@ds/react' }],
  whenToUse: [
    'At the top of a dashboard, for the three to five numbers that matter most.',
    'To show a value with its trend and comparison period.',
  ],
  whenNotToUse: [
    { text: 'For a figure inside text or a list without a card.', alternative: 'Stat' },
    { text: 'For many values to compare.', alternative: 'Table or a chart' },
  ],
  anatomy: [
    { name: 'Featured icon', description: 'What the metric is about.', optional: true },
    { name: 'Actions', description: 'A menu, e.g. export or hide.', optional: true },
    { name: 'Label', description: 'What is measured.' },
    { name: 'Value', description: 'The figure, formatted.' },
    { name: 'Trend', description: 'Change, colored by whether it is good news.', optional: true },
    { name: 'Comparison', description: 'The period compared against.', optional: true },
    { name: 'Chart', description: 'A small decorative chart, e.g. a Sparkline.', optional: true },
    { name: 'Footer', description: 'A link to more detail.', optional: true },
  ],
  options: [
    {
      prop: 'trendStyle',
      title: 'Trend style',
      values: [
        { value: 'simple', meaning: 'Colored arrow and text; the quietest.' },
        { value: 'badge', meaning: 'A tinted pill. Default.' },
        { value: 'modern', meaning: 'A neutral pill with a colored trend line icon.' },
      ],
    },
    {
      prop: 'layout',
      title: 'Layout',
      values: [
        { value: 'vertical', meaning: 'Icon and actions above the figures. Default.' },
        { value: 'horizontal', meaning: 'Icon beside the figures; shorter cards.' },
      ],
    },
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Smaller value, for dense dashboards.' },
        { value: 'medium', meaning: 'Default.' },
      ],
    },
  ],
  states: [
    {
      name: 'Static',
      meaning: 'The card itself is not interactive; its actions are.',
      trigger: '—',
    },
  ],
  behavior: [
    {
      topic: 'Good or bad news',
      text: 'Up is green by default. For metrics where rising is bad (costs, churn), set positive={false}.',
    },
    {
      topic: 'Chart',
      text: 'The chart is hidden from screen readers; the value and trend carry the meaning.',
    },
    { topic: 'Themes', text: 'Follows brand, mode, density, radius; RTL mirrors the layout.' },
  ],
  content: [
    'Label: a short noun phrase, e.g. "Total revenue", not "Revenue total for the month".',
    'Format values for reading: "$124.5k" or "$124,567", with the unit.',
    'Comparison: name the period, e.g. "vs last month".',
  ],
  guidelines: [
    {
      do: 'Show three to five metrics in a row.',
      dont: 'Fill a page with a dozen metric cards.',
      why: 'Fewer figures are easier to compare at a glance.',
    },
    {
      do: 'Set positive={false} for metrics where up is bad.',
      dont: 'Show rising costs in green.',
      why: 'Color should match whether the change is good news.',
    },
    {
      do: 'Pair a trend with its comparison period.',
      dont: 'Show "12%" with no context.',
      why: 'A change means little without what it is compared to.',
    },
  ],
  accessibility: {
    role: 'article containing a description list (dt label, dd value).',
    keyboard: [{ keys: 'Tab', action: 'Moves to actions and footer links, if any.' }],
    aria: [
      {
        attribute: 'Visually hidden "increased" / "decreased"',
        when: 'With a trend; translate with trendLabels.',
      },
      { attribute: 'aria-hidden on the chart', when: 'Always; it is decorative.' },
    ],
    focus: 'The card is not focusable; its actions and links are.',
    wcag: [
      {
        criterion: '1.4.1 Use of Color',
        how: 'The trend is also an arrow and announced in words.',
      },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Text meets 4.5:1 in every theme (checked in CI).',
      },
    ],
    notes: ['Give IconButton actions a label, e.g. "More options for Total revenue".'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Revenue',
      description: 'Value, trend and comparison.',
      code: `import { MetricCard } from '@ds/react';\n\n<MetricCard label="Total revenue" value="$124,567" change="12%" trend="up" comparison="vs last month" />`,
    },
    {
      id: 'icon',
      title: 'With an icon and actions',
      description: 'A featured icon and a menu.',
      code: `import { IconButton, MetricCard } from '@ds/react';\nimport { MoreVertical, Users } from 'lucide-react';\n\n<MetricCard\n  label="Active users"\n  value="2,420"\n  change="40%"\n  trend="up"\n  icon={<Users />}\n  actions={<IconButton icon={<MoreVertical />} label="More options" appearance="ghost" />}\n/>`,
    },
    {
      id: 'chart',
      title: 'With a sparkline',
      description: 'A small chart beside the value.',
      code: `import { MetricCard, Sparkline } from '@ds/react';\n\n<MetricCard label="Orders" value="1,210" change="4%" trend="down" chart={<Sparkline data={[4, 6, 5, 8, 7, 9]} />} />`,
    },
  ],
  tokenPrefixes: ['--metric-card-'],
  related: [
    { id: 'stat', relation: 'The bare figure without a card.' },
    { id: 'featured-icon', relation: 'The icon at the top.' },
    { id: 'badge', relation: 'The trend pill.' },
  ],
  changelog: [{ version: '1.1.0', date: '2026-10-15', changes: ['New component.'] }],
});
