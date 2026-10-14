# DatePicker

> Pick a date or a date range from a month grid. DatePicker opens a Calendar from a button; DateRangePicker shows two months and presets such as "Last 30 days" and applies with Apply; Calendar is the grid on its own. Month and weekday names, and the first day of the week, follow the locale.

Status: stable · Category: Forms · Since 1.1.0

```tsx
import { DatePicker } from '@ds/react';
import { DateRangePicker } from '@ds/react';
import { Calendar } from '@ds/react';
import { datePresets } from '@ds/react';
```

## When to use
- Choosing a due date, a delivery date or a booking.
- Choosing a report period on a dashboard (DateRangePicker with presets).

## When not to use
- For a birth date or a date far in the past. Use InputField with type="date".
- For a time of day. Use InputField with type="time".

## Calendar mode (`mode`)
- `single`: One date. Default.
- `range`: A start and an end date.

## Months shown (`months`)
- `1`: Default for single dates.
- `2`: Default for ranges.

## States
- **Default**: A day that can be picked. (—)
- **Hover**: Pointer over a day. (:hover)
- **Focus**: Keyboard focus on a day. (:focus-visible)
- **Selected**: The picked date or range ends. (value / range)
- **In range**: Between range start and end. (range)
- **Today**: Dot under the date. (today)
- **Disabled**: Out of bounds or excluded. (min, max, isDateDisabled)

## Props
### DatePicker

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the trigger, e.g. "Due date". |
| `placeholder` | `string` | Select dates | Text on the trigger with no date. Default "Select date". |
| `formatDate` | `((date: Date) => string)` |  | Formats the date on the trigger. |
| `size` | `"small" \| "medium"` | medium | `small` or `medium` (default) trigger. |
| `disabled` | `boolean` |  |  |
| `value` | `Date \| null` |  | Selected date (single). |
| `onValueChange` | `((value: Date) => void)` |  |  |
| `defaultMonth` | `Date` |  | Month shown first. Default: the selection or today. |
| `months` | `1 \| 2` | 2 | How many months side by side. Default 1; 2 suits ranges on wide screens. |
| `min` | `Date` |  | Earliest and latest dates that can be picked. |
| `max` | `Date` |  |  |
| `isDateDisabled` | `((date: Date) => boolean)` |  | Return true for dates that can't be picked, e.g. weekends. |
| `locale` | `string` |  | BCP 47 locale for month and weekday names, e.g. "ar". Default: the browser’s. |
| `labels` | `{ previous?: string; next?: string; } \| undefined` | {} | Names for the month buttons, for translation. |
| `today` | `Date` | startOfDay(new Date()) | "Today" for the date that is today. |
| `className` | `string` |  |  |

### DateRangePicker

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  |  |
| `value` | `DateRange` |  | Applied range. |
| `onValueChange` | `((range: DateRange) => void)` |  | Called when people press Apply. |
| `presets` | `DatePreset[]` |  | Quick choices in a side list, e.g. "Last 7 days". |
| `placeholder` | `string` | Select dates |  |
| `formatDate` | `((date: Date) => string)` |  |  |
| `size` | `"small" \| "medium"` | medium |  |
| `disabled` | `boolean` |  |  |
| `actionLabels` | `{ apply?: string; cancel?: string; } \| undefined` | {} | Button texts, for translation. |
| `defaultMonth` | `Date` |  | Month shown first. Default: the selection or today. |
| `months` | `1 \| 2` | 2 | How many months side by side. Default 1; 2 suits ranges on wide screens. |
| `min` | `Date` |  | Earliest and latest dates that can be picked. |
| `max` | `Date` |  |  |
| `isDateDisabled` | `((date: Date) => boolean)` |  | Return true for dates that can't be picked, e.g. weekends. |
| `locale` | `string` |  | BCP 47 locale for month and weekday names, e.g. "ar". Default: the browser’s. |
| `labels` | `{ previous?: string; next?: string; } \| undefined` | {} | Names for the month buttons, for translation. |
| `today` | `Date` | startOfDay(new Date()) | "Today" for the date that is today. |
| `className` | `string` |  |  |

### Calendar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `"single" \| "range"` | single | `single` (default) picks one date, `range` a start and an end. |
| `value` | `Date \| null` |  | Selected date (single). |
| `onValueChange` | `((value: Date) => void)` |  |  |
| `range` | `DateRange` |  | Selected range (range). |
| `onRangeChange` | `((range: DateRange) => void)` |  |  |
| `defaultMonth` | `Date` |  | Month shown first. Default: the selection or today. |
| `months` | `1 \| 2` | 2 | How many months side by side. Default 1; 2 suits ranges on wide screens. |
| `min` | `Date` |  | Earliest and latest dates that can be picked. |
| `max` | `Date` |  |  |
| `isDateDisabled` | `((date: Date) => boolean)` |  | Return true for dates that can't be picked, e.g. weekends. |
| `locale` | `string` |  | BCP 47 locale for month and weekday names, e.g. "ar". Default: the browser’s. |
| `labels` | `{ previous?: string; next?: string; } \| undefined` | {} | Names for the month buttons, for translation. |
| `today` | `Date` | startOfDay(new Date()) | "Today" for the date that is today. |
| `className` | `string` |  |  |

### datePresets

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Limit dates with min, max and isDateDisabled. Don’t: Let people pick dates you will reject. Why: Prevent errors instead of reporting them.
- Do: Offer presets for reporting periods. Don’t: Make people click two dates for "last 7 days". Why: Presets cover the common cases in one click.
- Do: Use InputField type="date" for dates far away, e.g. birthdays. Don’t: Make people page back decades. Why: Typing is faster for distant dates.

## Content
- Label the trigger with what the date is for, e.g. "Due date".
- Use presets people actually need, e.g. "Last 30 days" for reports.

## Accessibility
- Role: grid per month (table) of day buttons; the picker is a popover from a button.
- Arrow keys: Previous/next day and week.
- Page Up / Page Down: Previous/next month; with Shift, year.
- Home / End: Start or end of the week.
- Enter / Space: Pick the focused day.
- Escape: Close the picker.
- `aria-label on days`: The full date, e.g. "Friday, May 15, 2026".
- `aria-pressed`: Selected days.
- `aria-current="date"`: Today.
- Focus: One day is in the tab order; arrow keys move focus within the grid.
- WCAG 2.1.1 Keyboard: Every day can be reached and picked with the keyboard.
- WCAG 1.4.3 Contrast (Minimum): Days and selection meet 4.5:1 in every theme.
- The trigger’s name includes the current value, e.g. "Due date: May 20, 2026".

## Examples
### Due date
One date.

```tsx
import { DatePicker } from '@ds/react';

<DatePicker label="Due date" value={due} onValueChange={setDue} />
```

### Report period
Two months and presets.

```tsx
import { DateRangePicker, datePresets } from '@ds/react';

<DateRangePicker label="Report period" presets={datePresets()} value={range} onValueChange={setRange} />
```

### Inline calendar
The grid on its own.

```tsx
import { Calendar } from '@ds/react';

<Calendar value={date} onValueChange={setDate} />
```

Tokens: `--date-picker-*` (values per theme in ai/components/date-picker.json).
