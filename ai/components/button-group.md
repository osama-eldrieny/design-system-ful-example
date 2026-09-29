# ButtonGroup

> A button group shows related buttons together, spaced or attached into one control. With a value it becomes a segmented control where exactly one button is pressed, such as a list/grid view switcher.

Status: stable · Category: Actions · Since 0.3.0

```tsx
import { ButtonGroup } from '@ds/react';
```

## When to use
- For two to five related actions, e.g. Previous / Next or Bold / Italic / Underline.
- For switching between a few views or modes of the same content (segmented).

## When not to use
- To switch between panels of content. Use Tabs.
- To pick a value for a form. Use RadioGroup.
- For many actions. Use DropdownMenu.

## Layout (`attached`)
- `false`: Spaced buttons. Default.
- `true`: Joined into one control; inner corners squared.

## Orientation (`orientation`)
- `horizontal`: In a row. Default.
- `vertical`: Stacked, full width.

## States
- **Pressed**: Segmented: the selected button is filled and aria-pressed. (value)
- **Button states**: Hover, focus and disabled come from Button. (—)

## Props
### ButtonGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` |  | Names the group for screen readers, e.g. "Text alignment". |
| `attached` | `boolean` | false | Joins the buttons into one control instead of spacing them. |
| `orientation` | `"horizontal" \| "vertical"` | horizontal | `horizontal` (default) or `vertical`. |
| `value` | `string` |  | Segmented selection: the Button whose `value` matches is pressed (filled); the others are outlined. Controlled; use with onValueChange. |
| `defaultValue` | `string` |  | Initially pressed value for segmented selection, uncontrolled. |
| `onValueChange` | `((value: string) => void)` |  | Called with the value of the pressed Button. Turns on segmented selection. |
| `children` | `ReactNode` |  | Button elements. |

## Guidelines
- Do: Group only closely related actions. Don’t: Put Save and Delete in one attached group. Why: Attached buttons read as one control; a destructive action needs space.
- Do: Name the group with aria-label. Don’t: Leave a group of icon buttons unnamed. Why: The name tells screen reader users what the buttons control.
- Do: Use Tabs to switch content panels. Don’t: Use a segmented group to replace tabs. Why: Tabs have panel semantics and arrow-key navigation.

## Content
- Use short, parallel labels, or icons with aria-labels (IconButton).

## Accessibility
- Role: group of buttons; segmented buttons are toggle buttons (aria-pressed).
- Tab: Moves between buttons.
- Enter / Space: Activates or presses a button.
- `role="group" + aria-label`: Always.
- `aria-pressed`: Segmented mode.
- Focus: Each button shows its focus ring.
- WCAG 1.3.1 Info and Relationships: A named group.
- WCAG 1.4.1 Use of Color: Pressed is filled vs outlined, not a color change alone.
- WCAG 4.1.2 Name, Role, Value: aria-pressed exposes the selection.

## Examples
### Spaced
Related actions.

```tsx
import { ButtonGroup, Button } from '@ds/react';

<ButtonGroup aria-label="Pages">
  <Button appearance="outline" variant="secondary">Previous</Button>
  <Button appearance="outline" variant="secondary">Next</Button>
</ButtonGroup>
```

### Attached
Joined into one control.

```tsx
import { ButtonGroup, Button } from '@ds/react';

<ButtonGroup aria-label="Zoom" attached>
  <Button appearance="outline">−</Button>
  <Button appearance="outline">100%</Button>
  <Button appearance="outline">+</Button>
</ButtonGroup>
```

### Segmented
One pressed button switches the view.

```tsx
import { ButtonGroup, Button } from '@ds/react';

<ButtonGroup aria-label="View" attached value={view} onValueChange={setView}>
  <Button value="list">List</Button>
  <Button value="grid">Grid</Button>
</ButtonGroup>
```

Tokens: `--button-group-*` (values per theme in ai/components/button-group.json).
