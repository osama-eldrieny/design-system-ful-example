# EventCalendar

> A month of days with the events on each day. Choose a day to select it; move between months with the arrows. Days are buttons, so the calendar works with the keyboard.

Status: stable · Category: Data display · Since 1.3.0

```tsx
import { EventCalendar } from '@ds/react';
import { EventCalendarEvent } from '@ds/react';
```

## When to use
- To show meetings, deadlines or launches across a month.
- To let people pick a date and see what is on it.

## When not to use
- To pick a date for a form field. Use DatePicker.
- For a range of dates in a form. Use DateRangePicker.
- For tasks grouped by stage. Use KanbanBoard.

## View (`view`)
- `month`: Default. The whole month, with up to two events per day.
- `week`: The seven days of the week that holds the selected day, with every event and its time.
- `day`: An agenda of the selected day.

## Header (`header`)
- `true`: Default. Shows the month name and previous / next buttons.
- `false`: Hidden, when the page has its own toolbar.

## Week starts on (`weekStartsOn`)
- `1`: Monday. Default.
- `0`: Sunday.

## States
- **Default**: A day with no selection. (—)
- **Today**: Today’s date in bold. (The current date.)
- **Selected**: The chosen day, filled. (Pressing a day.)
- **Outside**: Days from the previous or next month. (Days outside the shown month.)
- **Focus**: A ring on the focused day. (:focus-visible.)

## Props
### EventCalendar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the calendar, e.g. "Team calendar". |
| `month` | `Date` |  | Any date in the month to show. |
| `events` | `EventCalendarEvent[]` | [] |  |
| `view` | `EventCalendarView` | month | `month` (default) shows the whole month; `week` the week of the selected day; `day` its agenda. |
| `header` | `boolean` | true | Shows the month name and previous / next buttons. Turn off when the page has its own. |
| `selectedDate` | `Date` |  | The selected day (controlled). |
| `defaultSelectedDate` | `Date` |  |  |
| `onSelectDate` | `((date: Date) => void)` |  |  |
| `onSelectEvent` | `((event: EventCalendarEvent) => void)` |  | Called with an event when its chip is pressed. Makes the chips buttons. |
| `onMonthChange` | `((month: Date) => void)` |  | Called with the first day of the month when the arrows are pressed. |
| `weekStartsOn` | `0 \| 1` | 1 | Day the week starts on: 0 = Sunday, 1 = Monday (default). |
| `locale` | `string` | en-US | Locale for month and weekday names. Default "en-US". |

### EventCalendarEvent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Show the event title on the day. Don’t: Show only colour dots. Why: Titles say what is happening; dots need a legend.
- Do: Keep event colours to a few tones with clear meanings. Don’t: Give every event its own colour. Why: Too many colours make the calendar hard to read.
- Do: Choose the week start your audience expects. Don’t: Start every week on Sunday everywhere. Why: Calendars should match how people count weeks.

## Content
- Name each event in a few words, e.g. "Design review".
- Use the locale prop for month and weekday names in other languages.

## Accessibility
- Role: group named by label, containing a grid of weekday headers and day cells.
- Tab: Moves between the month buttons and the days.
- Enter / Space: Selects the focused day.
- `aria-pressed`: On each day, true for the selected day.
- `aria-label`: On each day: its full date and how many events it has.
- Focus: The focused day shows a focus ring.
- WCAG 1.3.1 Info and Relationships: Weekdays are column headers; days are grid cells.
- WCAG 2.4.7 Focus Visible: Focus is shown on every day and button.
- WCAG 4.1.2 Name, Role, Value: Each day is named by its date and event count.
- Event chips are hidden from assistive technology; the day’s label gives their count.

## Examples
### Team calendar
A month with a few events.

```tsx
import { EventCalendar } from '@ds/react';

<EventCalendar
  label="Team calendar"
  month={new Date(2026, 9, 1)}
  events={[{ id: '1', title: 'Design review', date: new Date(2026, 9, 14), tone: 'primary' }]}
/>
```

### Controlled month
The month and selection live in your state.

```tsx
import { EventCalendar } from '@ds/react';

<EventCalendar label="Launches" month={month} onMonthChange={setMonth} selectedDate={day} onSelectDate={setDay} events={events} />
```

### Week starts on Sunday
For audiences that count weeks from Sunday.

```tsx
import { EventCalendar } from '@ds/react';

<EventCalendar label="Schedule" month={new Date()} weekStartsOn={0} />
```

Tokens: `--event-calendar-*` (values per theme in ai/components/event-calendar.json).
