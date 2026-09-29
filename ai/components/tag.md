# Tag

> A tag labels an item with a keyword or category. Tags can be removable (e.g. applied filters) or selectable toggle chips (e.g. quick filters).

Status: stable · Category: Feedback · Since 0.4.0

```tsx
import { Tag } from '@ds/react';
```

## When to use
- To show keywords or categories on an item.
- To show applied filters people can remove.
- For quick filter chips people toggle on and off.

## When not to use
- For a status or count. Use Badge.
- To pick values inside a form field. Use Combobox with multiple.

## Tone (`tone`)
- `secondary`: Neutral. Default.
- `primary`: Brand emphasis.
- `success`: Positive category.
- `warning`: Caution category.
- `danger`: Negative category.

## Appearance (`appearance`)
- `subtle`: Tinted. Default.
- `solid`: Filled.

## States
- **Pressed**: Selectable tag turned on: solid with a border. (selected)
- **Focus**: Focus ring on the toggle or remove button. (:focus-visible)
- **Disabled**: Dimmed; buttons inactive. (disabled)

## Props
### Tag

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string` |  | Text of the tag; also names its remove button. |
| `tone` | `TagTone` | secondary | Color meaning. Default secondary (neutral). |
| `appearance` | `"solid" \| "subtle"` | subtle | `subtle` (default) or `solid`. |
| `icon` | `ReactNode` |  | Decorative icon before the text. |
| `onRemove` | `(() => void)` |  | Shows a remove button that calls this. |
| `removeLabel` | `string` |  | Accessible name of the remove button, for translation. Default "Remove {text}". |
| `selected` | `boolean` |  | Makes the tag a toggle button, e.g. a filter chip. Pressed tags are solid with a border. Use with onSelectedChange. |
| `onSelectedChange` | `((selected: boolean) => void)` |  | Called with the new pressed state of a selectable tag. |
| `disabled` | `boolean` |  |  |

## Guidelines
- Do: Name remove buttons with the tag (default). Don’t: Give every remove button the same name “Remove”. Why: Screen reader users need to know which tag they’re removing.
- Do: Show pressed state with the solid style (default). Don’t: Show selection by color alone. Why: The border and fill change are visible without color perception.
- Do: Use Badge for statuses. Don’t: Use removable tags for a status. Why: Statuses aren’t something people remove.

## Content
- One to three words.
- Use the same case and wording across a set.

## Accessibility
- Role: text; with actions, contains buttons (toggle: aria-pressed).
- Tab: Reaches the toggle and remove buttons.
- Enter / Space: Toggles or removes.
- `aria-pressed`: Selectable tags.
- `aria-label`: Remove button: “Remove {text}”.
- Focus: Focus ring on each button.
- WCAG 1.4.3 Contrast (Minimum): Text passes on every tone in every theme.
- WCAG 4.1.2 Name, Role, Value: Named buttons with pressed state.
- WCAG 1.4.1 Use of Color: Pressed adds a border and fill.

## Examples
### Keywords
Static tags.

```tsx
import { Tag } from '@ds/react';

<Tag>Design</Tag>
<Tag tone="primary">React</Tag>
```

### Applied filters
Removable.

```tsx
import { Tag } from '@ds/react';

{filters.map((f) => (
  <Tag key={f} onRemove={() => removeFilter(f)}>{f}</Tag>
))}
```

### Filter chips
Toggle on and off.

```tsx
import { Tag } from '@ds/react';

<Tag selected={onSale} onSelectedChange={setOnSale}>On sale</Tag>
```

Tokens: `--tag-*` (values per theme in ai/components/tag.json).
