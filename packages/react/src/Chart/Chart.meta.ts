import { defineMeta } from '../meta';

export default defineMeta({
  id: 'charts',
  name: 'Charts',
  category: 'Data display',
  status: 'beta',
  since: '1.1.0',
  description:
    'Dependency-free SVG charts styled by tokens: LineChart and AreaChart for trends, BarChart for comparing categories (grouped, stacked or horizontal), DonutChart for parts of a whole, RadarChart for several dimensions and Sparkline for a tiny trend next to a figure. Every chart is a named figure with a hidden data table, reads values with the keyboard and mirrors in right-to-left languages.',
  imports: [
    { name: 'LineChart', from: '@ds/react' },
    { name: 'AreaChart', from: '@ds/react' },
    { name: 'BarChart', from: '@ds/react' },
    { name: 'DonutChart', from: '@ds/react' },
    { name: 'RadarChart', from: '@ds/react' },
    { name: 'Sparkline', from: '@ds/react' },
  ],
  whenToUse: [
    'LineChart / AreaChart: a value over time, e.g. monthly revenue; up to about four series.',
    'BarChart: comparing categories, e.g. orders per region; stacked for totals made of parts.',
    'DonutChart: parts of a whole with up to about six slices.',
    'Sparkline: a trend next to a number, e.g. in a MetricCard or table row.',
  ],
  whenNotToUse: [
    { text: 'For exact values people need to look up or copy.', alternative: 'Table' },
    { text: 'For one key number.', alternative: 'MetricCard' },
    { text: 'For more than six parts of a whole.', alternative: 'BarChart (horizontal)' },
  ],
  anatomy: [
    { name: 'Title and description', description: 'Name the chart and say what it shows.' },
    { name: 'Plot', description: 'Gridlines, axes and marks (lines, areas, bars, slices).' },
    {
      name: 'Tooltip',
      description: 'Values at the hovered or keyboard-selected point.',
      optional: true,
    },
    { name: 'Legend', description: 'Series colors and names.', optional: true },
    { name: 'Data table', description: 'Hidden table with every value, for screen readers.' },
  ],
  options: [
    {
      prop: 'chart',
      title: 'Chart type',
      values: [
        {
          value: 'LineChart',
          meaning: 'Trends over an ordered axis. curved, showDots, area, stacked.',
        },
        { value: 'AreaChart', meaning: 'LineChart with filled areas.' },
        { value: 'BarChart', meaning: 'Categories. stacked; orientation vertical or horizontal.' },
        {
          value: 'DonutChart',
          meaning: 'Shares. thickness 1 draws a pie; centerValue and centerLabel.',
        },
        { value: 'RadarChart', meaning: 'Several series across several dimensions.' },
        { value: 'Sparkline', meaning: 'A tiny trend; tone auto (green rising, red falling).' },
      ],
    },
    {
      prop: 'series.color',
      title: 'Series color',
      values: [
        { value: '1', meaning: 'The brand color; the first series by default.' },
        {
          value: '2–8',
          meaning: 'Category hues, assigned in order; set one to keep a series’ color fixed.',
        },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'At rest.', trigger: '—' },
    {
      name: 'Active point',
      meaning: 'Tooltip and crosshair at one point.',
      trigger: 'Hover, or arrow keys while focused.',
    },
    { name: 'Focus', meaning: 'The plot shows the focus ring.', trigger: 'Tab (:focus-visible).' },
  ],
  behavior: [
    {
      topic: 'Size',
      text: 'Charts fill their container’s width and redraw as it resizes; height is a prop.',
    },
    {
      topic: 'Keyboard',
      text: 'Each plot is one tab stop. Arrow keys, Home and End move between points; Escape clears.',
    },
    {
      topic: 'Right-to-left',
      text: 'In Arabic the x axis runs right to left and the value axis moves to the right.',
    },
    {
      topic: 'Colors',
      text: 'Series colors pass 3:1 against the surface in every brand and mode.',
    },
  ],
  content: [
    'Title: what is measured and over what, e.g. "Revenue, last 12 months".',
    'Description: the takeaway, e.g. "Revenue grew 38% over the year".',
    'Format values for reading with formatValue, e.g. currency and compact notation.',
  ],
  guidelines: [
    {
      do: 'Start bar charts at zero (they always do).',
      dont: 'Compare bar lengths on a cut axis.',
      why: 'Bar length must be proportional to the value.',
    },
    {
      do: 'Keep to four series on a line chart and six slices on a donut.',
      dont: 'Plot a dozen series in one chart.',
      why: 'Colors become hard to tell apart and the legend hard to match.',
    },
    {
      do: 'Say the takeaway in the description.',
      dont: 'Leave people to work out what matters.',
      why: 'The description helps everyone, and is the summary for screen readers.',
    },
  ],
  accessibility: {
    role: 'figure named by its title, containing a slider over the data points and a hidden table.',
    keyboard: [
      { keys: 'Tab', action: 'Focuses the plot.' },
      {
        keys: 'Arrow keys',
        action: 'Move to the previous or next point; its values are announced.',
      },
      { keys: 'Home / End', action: 'First or last point.' },
      { keys: 'Escape', action: 'Clears the selection.' },
    ],
    aria: [
      {
        attribute: 'role="slider" + aria-valuetext',
        when: 'The plot; announces the active point.',
      },
      { attribute: 'aria-hidden on the SVG', when: 'Always; the table and slider carry the data.' },
      { attribute: 'Hidden <table>', when: 'Every chart, with every value.' },
    ],
    focus: 'The plot shows the focus ring; the tooltip follows the active point.',
    wcag: [
      {
        criterion: '1.1.1 Non-text Content',
        how: 'Each chart has a name, a description and a data table.',
      },
      {
        criterion: '1.4.1 Use of Color',
        how: 'Series are also named in the legend, tooltip and table.',
      },
      {
        criterion: '1.4.11 Non-text Contrast',
        how: 'Series colors meet 3:1 on the surface (checked in CI).',
      },
      { criterion: '2.1.1 Keyboard', how: 'Every value is reachable with the arrow keys.' },
    ],
    notes: ['Sparklines are decorative unless you give them a label.'],
  },
  examples: [
    {
      id: 'line',
      title: 'Revenue over a year',
      description: 'Two series with currency values.',
      code: `import { LineChart } from '@ds/react';\n\n<LineChart\n  title="Revenue"\n  data={months}\n  xKey="month"\n  series={[{ key: 'revenue', label: 'Revenue' }, { key: 'expenses', label: 'Expenses' }]}\n/>`,
    },
    {
      id: 'bar',
      title: 'Stacked bars',
      description: 'Totals made of parts.',
      code: `import { BarChart } from '@ds/react';\n\n<BarChart title="Costs" stacked data={rows} xKey="month" series={[{ key: 'ads', label: 'Ads' }, { key: 'staff', label: 'Staff' }]} />`,
    },
    {
      id: 'donut',
      title: 'Donut with a total',
      description: 'Traffic sources.',
      code: `import { DonutChart } from '@ds/react';\n\n<DonutChart title="Traffic" data={[{ label: 'Direct', value: 42 }, { label: 'Search', value: 31 }]} centerValue="73" centerLabel="Visits" />`,
    },
  ],
  tokenPrefixes: ['--chart-'],
  related: [
    { id: 'metric-card', relation: 'Shows a Sparkline beside its value.' },
    { id: 'table', relation: 'For exact values.' },
  ],
  changelog: [{ version: '1.1.0', date: '2026-10-15', changes: ['New components.'] }],
});
