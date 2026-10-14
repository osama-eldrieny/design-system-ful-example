import { defineMeta } from '../meta';

export default defineMeta({
  id: 'date-picker',
  name: 'DatePicker',
  category: 'Forms',
  status: 'stable',
  since: '1.1.0',
  description:
    'Pick a date or a date range from a month grid. DatePicker opens a Calendar from a button; DateRangePicker shows two months and presets such as "Last 30 days" and applies with Apply; Calendar is the grid on its own. Month and weekday names, and the first day of the week, follow the locale.',
  imports: [
    { name: 'DatePicker', from: '@ds/react' },
    { name: 'DateRangePicker', from: '@ds/react' },
    { name: 'Calendar', from: '@ds/react' },
    { name: 'datePresets', from: '@ds/react' },
  ],
  whenToUse: [
    'Choosing a due date, a delivery date or a booking.',
    'Choosing a report period on a dashboard (DateRangePicker with presets).',
  ],
  whenNotToUse: [
    {
      text: 'For a birth date or a date far in the past.',
      alternative: 'InputField with type="date"',
    },
    { text: 'For a time of day.', alternative: 'InputField with type="time"' },
  ],
  anatomy: [
    { name: 'Trigger', description: 'Button showing the date or range.' },
    { name: 'Month header', description: 'Month name and previous/next buttons.' },
    { name: 'Day grid', description: 'Weekday headings and days.' },
    { name: 'Presets', description: 'Quick ranges (range picker).', optional: true },
    {
      name: 'Footer',
      description: 'Selected range, Cancel and Apply (range picker).',
      optional: true,
    },
  ],
  options: [
    {
      prop: 'mode',
      title: 'Calendar mode',
      values: [
        { value: 'single', meaning: 'One date. Default.' },
        { value: 'range', meaning: 'A start and an end date.' },
      ],
    },
    {
      prop: 'months',
      title: 'Months shown',
      values: [
        { value: '1', meaning: 'Default for single dates.' },
        { value: '2', meaning: 'Default for ranges.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'A day that can be picked.', trigger: '—' },
    { name: 'Hover', meaning: 'Pointer over a day.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Keyboard focus on a day.', trigger: ':focus-visible' },
    { name: 'Selected', meaning: 'The picked date or range ends.', trigger: 'value / range' },
    { name: 'In range', meaning: 'Between range start and end.', trigger: 'range' },
    { name: 'Today', meaning: 'Dot under the date.', trigger: 'today' },
    {
      name: 'Disabled',
      meaning: 'Out of bounds or excluded.',
      trigger: 'min, max, isDateDisabled',
    },
  ],
  behavior: [
    {
      topic: 'Range picking',
      text: 'First click sets the start, second the end; a click before the start starts again.',
    },
    {
      topic: 'Locale',
      text: 'Pass locale (e.g. "ar") for names and the first weekday; RTL mirrors arrows.',
    },
    { topic: 'Apply', text: 'DateRangePicker only changes the value when Apply is pressed.' },
  ],
  content: [
    'Label the trigger with what the date is for, e.g. "Due date".',
    'Use presets people actually need, e.g. "Last 30 days" for reports.',
  ],
  guidelines: [
    {
      do: 'Limit dates with min, max and isDateDisabled.',
      dont: 'Let people pick dates you will reject.',
      why: 'Prevent errors instead of reporting them.',
    },
    {
      do: 'Offer presets for reporting periods.',
      dont: 'Make people click two dates for "last 7 days".',
      why: 'Presets cover the common cases in one click.',
    },
    {
      do: 'Use InputField type="date" for dates far away, e.g. birthdays.',
      dont: 'Make people page back decades.',
      why: 'Typing is faster for distant dates.',
    },
  ],
  accessibility: {
    role: 'grid per month (table) of day buttons; the picker is a popover from a button.',
    keyboard: [
      { keys: 'Arrow keys', action: 'Previous/next day and week.' },
      { keys: 'Page Up / Page Down', action: 'Previous/next month; with Shift, year.' },
      { keys: 'Home / End', action: 'Start or end of the week.' },
      { keys: 'Enter / Space', action: 'Pick the focused day.' },
      { keys: 'Escape', action: 'Close the picker.' },
    ],
    aria: [
      { attribute: 'aria-label on days', when: 'The full date, e.g. "Friday, May 15, 2026".' },
      { attribute: 'aria-pressed', when: 'Selected days.' },
      { attribute: 'aria-current="date"', when: 'Today.' },
    ],
    focus: 'One day is in the tab order; arrow keys move focus within the grid.',
    wcag: [
      {
        criterion: '2.1.1 Keyboard',
        how: 'Every day can be reached and picked with the keyboard.',
      },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Days and selection meet 4.5:1 in every theme.',
      },
    ],
    notes: ['The trigger’s name includes the current value, e.g. "Due date: May 20, 2026".'],
  },
  examples: [
    {
      id: 'single',
      title: 'Due date',
      description: 'One date.',
      code: `import { DatePicker } from '@ds/react';\n\n<DatePicker label="Due date" value={due} onValueChange={setDue} />`,
    },
    {
      id: 'range',
      title: 'Report period',
      description: 'Two months and presets.',
      code: `import { DateRangePicker, datePresets } from '@ds/react';\n\n<DateRangePicker label="Report period" presets={datePresets()} value={range} onValueChange={setRange} />`,
    },
    {
      id: 'calendar',
      title: 'Inline calendar',
      description: 'The grid on its own.',
      code: `import { Calendar } from '@ds/react';\n\n<Calendar value={date} onValueChange={setDate} />`,
    },
  ],
  tokenPrefixes: ['--date-picker-'],
  related: [
    { id: 'popover', relation: 'Holds the calendar.' },
    { id: 'input-field', relation: 'For typed dates.' },
  ],
  changelog: [{ version: '1.1.0', date: '2026-10-15', changes: ['New components.'] }],
});
