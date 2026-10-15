import { defineMeta } from '../meta';

export default defineMeta({
  id: 'event-calendar',
  name: 'EventCalendar',
  category: 'Data display',
  status: 'stable',
  since: '1.3.0',
  description:
    'A month of days with the events on each day. Choose a day to select it; move between months with the arrows. Days are buttons, so the calendar works with the keyboard.',
  imports: [
    { name: 'EventCalendar', from: '@ds/react' },
    { name: 'EventCalendarEvent', from: '@ds/react' },
  ],
  whenToUse: [
    'To show meetings, deadlines or launches across a month.',
    'To let people pick a date and see what is on it.',
  ],
  whenNotToUse: [
    { text: 'To pick a date for a form field.', alternative: 'DatePicker' },
    { text: 'For a range of dates in a form.', alternative: 'DateRangePicker' },
    { text: 'For tasks grouped by stage.', alternative: 'KanbanBoard' },
  ],
  anatomy: [
    { name: 'Header', description: 'The month name and previous / next buttons.' },
    { name: 'Weekdays', description: 'Short day names across the top.' },
    { name: 'Day', description: 'A button with the date; shows today and the selected day.' },
    { name: 'Event chip', description: 'An event on its day, coloured by tone.', optional: true },
    { name: 'Agenda', description: 'The day view: the events of one day, with times.', optional: true },
  ],
  options: [
    {
      prop: 'view',
      title: 'View',
      values: [
        { value: 'month', meaning: 'Default. The whole month, with up to two events per day.' },
        { value: 'week', meaning: 'The seven days of the week that holds the selected day, with every event and its time.' },
        { value: 'day', meaning: 'An agenda of the selected day.' },
      ],
    },
    {
      prop: 'header',
      title: 'Header',
      values: [
        { value: 'true', meaning: 'Default. Shows the month name and previous / next buttons.' },
        { value: 'false', meaning: 'Hidden, when the page has its own toolbar.' },
      ],
    },
    {
      prop: 'weekStartsOn',
      title: 'Week starts on',
      values: [
        { value: '1', meaning: 'Monday. Default.' },
        { value: '0', meaning: 'Sunday.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'A day with no selection.', trigger: '—' },
    { name: 'Today', meaning: 'Today’s date in bold.', trigger: 'The current date.' },
    { name: 'Selected', meaning: 'The chosen day, filled.', trigger: 'Pressing a day.' },
    { name: 'Outside', meaning: 'Days from the previous or next month.', trigger: 'Days outside the shown month.' },
    { name: 'Focus', meaning: 'A ring on the focused day.', trigger: ':focus-visible.' },
  ],
  behavior: [
    { topic: 'Selecting', text: 'Pressing a day calls onSelectDate; the day is announced with its events.' },
    { topic: 'Months', text: 'The arrows call onMonthChange with the first day of the new month.' },
    { topic: 'Events', text: 'Up to two events show on a day; the rest show as a count.' },
    { topic: 'Multi-day events', text: 'An event with an end date shows on every day it covers.' },
    { topic: 'Opening events', text: 'With onSelectEvent, each event is a button; pressing it calls the handler with the event.' },
    { topic: 'Week start', text: 'Choose the first day of the week with weekStartsOn (Monday by default).' },
  ],
  content: [
    'Name each event in a few words, e.g. "Design review".',
    'Use the locale prop for month and weekday names in other languages.',
  ],
  guidelines: [
    {
      do: 'Show the event title on the day.',
      dont: 'Show only colour dots.',
      why: 'Titles say what is happening; dots need a legend.',
    },
    {
      do: 'Keep event colours to a few tones with clear meanings.',
      dont: 'Give every event its own colour.',
      why: 'Too many colours make the calendar hard to read.',
    },
    {
      do: 'Choose the week start your audience expects.',
      dont: 'Start every week on Sunday everywhere.',
      why: 'Calendars should match how people count weeks.',
    },
  ],
  accessibility: {
    role: 'group named by label, containing a grid of weekday headers and day cells.',
    keyboard: [
      { keys: 'Tab', action: 'Moves between the month buttons and the days.' },
      { keys: 'Enter / Space', action: 'Selects the focused day.' },
    ],
    aria: [
      { attribute: 'aria-pressed', when: 'On each day, true for the selected day.' },
      { attribute: 'aria-label', when: 'On each day: its full date and how many events it has.' },
    ],
    focus: 'The focused day shows a focus ring.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Weekdays are column headers; days are grid cells.' },
      { criterion: '2.4.7 Focus Visible', how: 'Focus is shown on every day and button.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'Each day is named by its date and event count.' },
    ],
    notes: ['Event chips are hidden from assistive technology; the day’s label gives their count.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Team calendar',
      description: 'A month with a few events.',
      code: `import { EventCalendar } from '@ds/react';

<EventCalendar
  label="Team calendar"
  month={new Date(2026, 9, 1)}
  events={[{ id: '1', title: 'Design review', date: new Date(2026, 9, 14), tone: 'primary' }]}
/>`,
    },
    {
      id: 'controlled',
      title: 'Controlled month',
      description: 'The month and selection live in your state.',
      code: `import { EventCalendar } from '@ds/react';

<EventCalendar label="Launches" month={month} onMonthChange={setMonth} selectedDate={day} onSelectDate={setDay} events={events} />`,
    },
    {
      id: 'sunday',
      title: 'Week starts on Sunday',
      description: 'For audiences that count weeks from Sunday.',
      code: `import { EventCalendar } from '@ds/react';

<EventCalendar label="Schedule" month={new Date()} weekStartsOn={0} />`,
    },
  ],
  tokenPrefixes: ['--event-calendar-'],
  related: [
    { id: 'date-picker', relation: 'For picking a single date in a form.' },
    { id: 'activity-feed', relation: 'For a timeline of events.' },
  ],
  changelog: [
    {
      version: '1.3.0',
      date: '2026-10-15',
      changes: ['New component: month view; week and day views; multi-day events; onSelectEvent; header.'],
    },
  ],
});
