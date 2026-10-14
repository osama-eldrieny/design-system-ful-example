# Badge

> A badge is a small, non-interactive label for a status (“Paid”, “New”) or a count (3 unread). It comes in five tones, solid or subtle, and as a dot.

Status: stable · Category: Feedback · Since 0.4.0

```tsx
import { Badge } from '@ds/react';
import { BadgeGroup } from '@ds/react';
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
- `gray | blue | sky | indigo | purple | pink | orange | teal`: Category hues with no meaning of their own: departments, projects, file types. Same in every brand.

## Shape (`shape`)
- `pill`: Fully rounded. Default.
- `rounded`: Small corners; reads as a label in dense tables.
- `modern`: Neutral surface with a border; only the dot or icon takes the color.

## Size (`size`)
- `small`: 20px, for tables and dense lists.
- `medium`: 24px. Default.
- `large`: 28px, next to headings.

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
| `tone` | `BadgeColor` | primary | Color: a meaning (primary default, secondary, success, warning, danger) or a category hue (gray, blue, sky, indigo, purple, pink, orange, teal). |
| `appearance` | `"solid" \| "subtle"` | subtle | `solid` for strong emphasis (counts), `subtle` (default) for status labels. |
| `shape` | `BadgeShape` | pill | `pill` (default) fully rounded, `rounded` small corners, `modern` neutral with a border. |
| `size` | `BadgeSize` | medium | `small`, `medium` (default) or `large`. |
| `bordered` | `boolean` | false | Adds a thin border in the tone's color to subtle badges. |
| `count` | `number` |  | A number, e.g. unread messages. Shown as max+ above max. |
| `max` | `number` | 99 | Largest count shown before “99+”. Default 99. |
| `dot` | `boolean` | false | Shows only a small dot instead of text. Give it a label. |
| `withDot` | `boolean` | false | Adds a status dot before the text, e.g. ● Active. |
| `iconStart` | `ReactNode` |  | Decorative icon before the text. Alone (no text), the badge is icon-only: give it a label. |
| `iconEnd` | `ReactNode` |  | Decorative icon after the text. |
| `image` | `string` |  | Small round picture before the text, e.g. a person or a country flag. Decorative. |
| `onDismiss` | `(() => void)` |  | Shows a remove button that calls this, e.g. for a filter. |
| `dismissLabel` | `string` |  | Accessible name of the remove button. Default "Remove {text}". |
| `label` | `string` |  | Text for screen readers, e.g. "3 unread messages". Replaces what is shown; required for dots, icon-only badges and bare counts, whose meaning isn't in the text. |

### BadgeGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `badge` | `ReactNode` |  | The short badge text, e.g. "New". |
| `children` | `ReactNode` |  | The message next to the badge, e.g. "We've just released a new feature". |
| `tone` | `BadgeColor` | primary | Color of the whole group. Default primary. |
| `badgePosition` | `"leading" \| "trailing"` | leading | `leading` (default): badge first. `trailing`: message first, badge last. |
| `icon` | `ReactNode` |  | Icon after the message. Default an arrow when the group is a link; `null` hides it. |

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

### Category label
A modern badge with a colored dot, e.g. a team in a table.

```tsx
import { Badge } from '@ds/react';

<Badge tone="indigo" shape="modern" withDot>Design</Badge>
```

### Trend
A change with an arrow icon.

```tsx
import { Badge } from '@ds/react';
import { ArrowUp } from 'lucide-react';

<Badge tone="success" size="small" iconStart={<ArrowUp />}>12%</Badge>
```

### Announcement
BadgeGroup links to news.

```tsx
import { BadgeGroup } from '@ds/react';

<BadgeGroup badge="New" href="/changelog">Dashboards are here</BadgeGroup>
```

Tokens: `--badge-*` (values per theme in ai/components/badge.json).
