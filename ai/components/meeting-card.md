# MeetingCard

> A meeting card shows one event in an agenda or schedule: its name, time and attendees, with a color edge for its status. It is built from Avatar and AvatarGroup.

Status: stable · Category: Patterns · Since 0.2.0

```tsx
import { MeetingCard } from '@ds/react';
```

## When to use
- In agendas, schedules and sidebars listing upcoming meetings or events.
- For short status items with people attached, e.g. who is on call for a service.

## When not to use
- For a full calendar view. Use A calendar layout.
- For a message that needs action. Use Alert.
- For general content. Use Card.

## Variant (`variant`)
- `primary`: A regular meeting. Default.
- `success`: Confirmed, done or healthy.
- `warning`: Needs attention, e.g. starts soon or has a conflict risk.
- `danger`: Cancelled, clashing or failing.

## States
- **Default**: Meeting cards are static; put links or buttons inside for actions. (—)

## Props
### MeetingCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | Meeting name. |
| `time` | `ReactNode` |  | When it happens, formatted for display, e.g. "10:00 – 11:00". |
| `dateTime` | `string` |  | Machine-readable time for `<time dateTime>`, e.g. "2026-09-29T10:00". |
| `variant` | `MeetingCardVariant` | primary | Color of the card. Pick by meaning and say it in the title or time as well: `primary` (default) a regular meeting, `success` confirmed or done, `warning` needs attention, e.g. it's about to start, `danger` cancelled or clashing. |
| `attendees` | `MeetingAttendee[]` | [] | People attending, shown as overlapping avatars. |
| `maxAttendees` | `number` | 4 | Show at most this many avatars, then a "+N" count. Default 4. |
| `attendeesLabel` | `string` | Attendees | Name of the avatar group for screen readers. Default "Attendees". |
| `titleAs` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | h3 | Heading level that fits the page outline. Default h3. |

## Guidelines
- Do: Say the status in the title or time, e.g. “Cancelled: Budget review”. Don’t: Rely on the red edge alone to mean cancelled. Why: Color alone isn’t seen by everyone (WCAG 1.4.1).
- Do: Give every attendee a real name. Don’t: Pass only photo URLs. Why: Names become initials when photos fail and are what screen readers announce.
- Do: Pick the heading level that fits the page (titleAs). Don’t: Leave h3 under an h1 with no h2. Why: A logical outline helps people navigate by headings.

## Content
- Title: the meeting’s name, not its type (“Q3 planning”, not “Meeting”).
- Time: the range in the reader’s time format; add the day if it isn’t today.
- If the variant matters, say it in words too, e.g. “Cancelled”.

## Accessibility
- Role: article with a heading.
- —: Not focusable itself; any links or buttons inside are.
- `role="group" + aria-label on attendees`: Set by AvatarGroup from attendeesLabel.
- Focus: None.
- WCAG 1.3.1 Info and Relationships: Heading, <time> and a labelled attendee group.
- WCAG 1.4.1 Use of Color: Status must also be written; the guidelines require it.
- WCAG 1.4.3 Contrast (Minimum): Title and time pass 4.5:1 on every variant background in every theme.

## Examples
### Meeting
A meeting with attendees.

```tsx
import { MeetingCard } from '@ds/react';

<MeetingCard
  title="Q3 planning"
  time="10:00 – 11:00"
  dateTime="2026-09-29T10:00"
  attendees={[
    { name: 'Sarah Chen', src: '/avatars/sarah.png' },
    { name: 'James Wilson' },
  ]}
/>
```

### Cancelled
The danger variant, with the status in words.

```tsx
import { MeetingCard } from '@ds/react';

<MeetingCard variant="danger" title="Cancelled: Budget review" time="16:00 – 17:30" />
```

### Agenda list
A list of meetings under a heading.

```tsx
import { MeetingCard } from '@ds/react';

<h2>Today</h2>
<ul role="list" style={{ display: 'grid', gap: 12, padding: 0, listStyle: 'none' }}>
  {meetings.map((m) => (
    <li key={m.id}>
      <MeetingCard title={m.title} time={m.time} variant={m.variant} attendees={m.people} />
    </li>
  ))}
</ul>
```

Tokens: `--meeting-card-*` (values per theme in ai/components/meeting-card.json).
