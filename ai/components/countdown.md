# Countdown

> A live countdown to a moment, shown as days, hours, minutes and seconds. It ticks every second and shows a finished message when the time has passed.

Status: stable · Category: Data display · Since 1.3.0

```tsx
import { Countdown } from '@ds/react';
import { CountdownSize } from '@ds/react';
```

## When to use
- To count down to a launch, a deadline or the end of a sale.
- On a page where the date is the main message.

## When not to use
- To show how long something took. Use Stat.
- For a short timeout in a form. Use Spinner.

## Size (`size`)
- `small`: Inside a card or a banner.
- `medium`: Default.
- `large`: The main message of a launch page.

## States
- **Counting**: Time remains; the units tick. (to is in the future.)
- **Ended**: The time has passed; the ended message shows. (to is in the past.)

## Props
### Countdown

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names what is counted down to, e.g. "Launch in". Read before the time. |
| `to` | `Date` |  | The moment to count down to. |
| `now` | `Date` |  | The current time, for tests and static previews. Default: the live clock. |
| `units` | `{ days: string; hours: string; minutes: string; seconds: string; }` | { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds' } | Words for the units. Default English. |
| `endedLabel` | `string` | Done | Words shown when the time has passed. Default "Done". |
| `size` | `CountdownSize` | medium | `small` in cards, `medium` (default), `large` for a launch page. |

### CountdownSize

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Show the date as well as the countdown. Don’t: Show only a countdown with no date. Why: The date lets people plan and confirms what the countdown means.
- Do: Replace the countdown with a clear message when it ends. Don’t: Leave a counter stuck at zero. Why: A finished message tells people the moment has passed.
- Do: Use one countdown per page. Don’t: Stack several countdowns to different dates. Why: Several moving numbers compete for attention.

## Content
- Name what is counted, e.g. "Launch in".
- Give the units in the language of the page through the units prop.

## Accessibility
- Role: section named with the full sentence, e.g. "Launch in 12 days, 8 hours, 45 minutes, 20 seconds".
- —: No keyboard interaction; use the controls inside, if any.
- `aria-label`: On the section: the whole countdown as one sentence.
- Focus: Not focusable; static display.
- WCAG 1.3.1 Info and Relationships: Units are a list with their names beside the numbers.
- WCAG 2.2.1 Timing Adjustable: The countdown is informational and does not end content or require a response.
- The visible units are hidden from assistive technology; the section label reads them once.

## Examples
### Launch
A large countdown on a launch page.

```tsx
import { Countdown } from '@ds/react';

<Countdown label="Launch in" to={new Date('2026-11-01T09:00:00Z')} size="large" />
```

### In a card
A small countdown inside a promotion card.

```tsx
import { Countdown } from '@ds/react';

<Countdown label="Sale ends in" to={saleEnds} size="small" endedLabel="Sale over" />
```

### Translated
Units in another language.

```tsx
import { Countdown } from '@ds/react';

<Countdown label="يبدأ خلال" to={launch} units={{ days: 'يوم', hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية' }} />
```

Tokens: `--countdown-*` (values per theme in ai/components/countdown.json).
