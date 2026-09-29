# Badge

> A badge is a small, non-interactive label for a status (“Paid”, “New”) or a count (3 unread). It comes in five tones, solid or subtle, and as a dot.

Status: stable · Category: Feedback · Since 0.4.0

```tsx
import { Badge } from '@ds/react';
```

## When to use
- To show the status of an item in a list or table.
- To show a count on navigation or an icon, e.g. unread messages.

## When not to use
- For keywords people can remove or filter by. Use Tag.
- For a message that needs reading. Use Alert.
- For something clickable. Use Button or Link.

## Tone (`tone`)
- `primary`: Brand emphasis, e.g. “New”. Default.
- `secondary`: Neutral, e.g. “Draft”.
- `success`: Done or healthy, e.g. “Paid”.
- `warning`: Needs attention, e.g. “Due soon”.
- `danger`: Failed or overdue.

## Appearance (`appearance`)
- `subtle`: Tinted; for statuses in lists. Default.
- `solid`: Filled; for counts that must stand out.

## Dot (`dot`)
- `false`: Shows text or a count. Default.
- `true`: A small dot, e.g. “new activity”; needs label.

## States
- **Static**: Badges are not interactive. (—)

## Props
### Badge

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `BadgeTone` | primary | Meaning: primary (default), secondary (neutral), success, warning, danger. |
| `appearance` | `"solid" \| "subtle"` | subtle | `solid` for strong emphasis (counts), `subtle` (default) for status labels. |
| `count` | `number` |  | A number, e.g. unread messages. Shown as max+ above max. |
| `max` | `number` | 99 | Largest count shown before “99+”. Default 99. |
| `dot` | `boolean` | false | Shows a small dot instead of text. Give it a label. |
| `label` | `string` |  | Text for screen readers, e.g. "3 unread messages". Replaces what is shown; required for dots and bare counts, whose meaning isn't in the text. |

## Guidelines
- Do: Pair color with a word: “Overdue” in danger. Don’t: Use a red badge with no text to mean overdue. Why: Color alone isn’t seen by everyone (WCAG 1.4.1).
- Do: Give counts and dots a label. Don’t: Leave “3” to be announced on its own. Why: “3” means nothing out of context to a screen reader user.
- Do: Keep badges static. Don’t: Make a badge clickable. Why: Badges don’t look interactive; use a Tag, Button or Link.

## Content
- One or two words, in sentence case.
- Use the same words for the same status everywhere.

## Accessibility
- Role: text (not interactive).
- —: Not focusable.
- `visually hidden label`: label replaces the shown text for screen readers.
- Focus: None.
- WCAG 1.4.1 Use of Color: Status words, not color alone.
- WCAG 1.4.3 Contrast (Minimum): Text passes 4.5:1 on every tone in every theme.
- WCAG 1.1.1 Non-text Content: Dots and counts get a text label.

## Examples
### Status
In a table.

```tsx
import { Badge } from '@ds/react';

<Badge tone="success">Paid</Badge>
```

### Count
Unread messages.

```tsx
import { Badge } from '@ds/react';

<Badge appearance="solid" tone="danger" count={128} label="128 unread messages" />
```

### Dot
New activity.

```tsx
import { Badge } from '@ds/react';

<Badge dot tone="primary" label="New activity" />
```

Tokens: `--badge-*` (values per theme in ai/components/badge.json).
