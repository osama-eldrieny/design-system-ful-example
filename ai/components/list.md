# List

> A list shows related items one per row, with an optional icon or avatar, a second line and trailing meta such as a date. Rows can be links or buttons.

Status: stable · Category: Data display · Since 0.4.0

```tsx
import { List } from '@ds/react';
import { ListItem } from '@ds/react';
```

## When to use
- For files, people, notifications or settings.
- For navigation-like lists of records.

## When not to use
- For data people compare across columns. Use Table.
- For site navigation. Use SideNav.

## Dividers (`divided`)
- `false`: Spaced items. Default.
- `true`: Lines between items.

## Order (`ordered`)
- `false`: Bulleted meaning (ul). Default.
- `true`: Numbered meaning (ol).

## States
- **Hover**: Interactive rows are tinted. (:hover)
- **Focus**: Focus ring on the row. (:focus-visible)

## Props
### List

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `divided` | `boolean` | false | Lines between items. |
| `ordered` | `boolean` | false | Numbered list (ol) when order matters. |

### ListItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | Main text. |
| `description` | `ReactNode` |  | Second line. |
| `icon` | `ReactNode` |  | Leading icon or Avatar. Icons are decorative. |
| `meta` | `ReactNode` |  | Trailing content, e.g. a date, Badge or Switch. |
| `href` | `string` |  | Makes the item a link. |
| `onClick` | `((event: MouseEvent<HTMLElement, MouseEvent>) => void)` |  | Makes the item a button (when there is no href). |

## Guidelines
- Do: Make the whole row the target. Don’t: Add a separate “Open” link per row. Why: One target per row is simpler to use.
- Do: Use Table for multiple attributes. Don’t: Squeeze five columns into a list. Why: Tables align values for comparison.
- Do: Keep meta short. Don’t: Put paragraphs in meta. Why: It’s for dates, counts and badges.

## Content
- Titles: short and scannable; put details in the description.

## Accessibility
- Role: list of list items; interactive rows are links or buttons.
- Tab: Moves between interactive rows and meta controls.
- Enter: Opens the row.
- `none`: Native list semantics.
- Focus: Focus ring on rows.
- WCAG 1.3.1 Info and Relationships: Real list markup.
- WCAG 2.4.4 Link Purpose: Row links are named by their text.

## Examples
### Files
With icons and dates.

```tsx
import { List, ListItem } from '@ds/react';
import { FileText } from 'lucide-react';

<List divided>
  <ListItem icon={<FileText />} title="Report.pdf" description="2.4 MB" meta="Today" href="/files/1" />
</List>
```

### People
With avatars.

```tsx
import { List, ListItem, Avatar } from '@ds/react';

<List>
  <ListItem icon={<Avatar name="Sarah Chen" decorative />} title="Sarah Chen" description="Head of Products" />
</List>
```

### Settings
With switches in meta.

```tsx
import { List, ListItem, Switch } from '@ds/react';

<ListItem title="Email updates" meta={<Switch aria-label="Email updates" />} />
```

Tokens: `--list-*` (values per theme in ai/components/list.json).
