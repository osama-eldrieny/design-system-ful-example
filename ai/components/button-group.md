# ButtonGroup

> A button group shows related action buttons together, spaced or attached into one control. It holds actions only; to pick one of a few options or views, use Tabs with the segmented appearance.

Status: stable · Category: Actions · Since 0.3.0

```tsx
import { ButtonGroup } from '@ds/react';
```

## When to use
- For two to five related actions, e.g. Previous / Next or Bold / Italic / Underline.

## When not to use
- To switch between panels of content. Use Tabs.
- To pick one of a few options or views, e.g. Day / Week / Month. Use Tabs (appearance="segmented").
- To pick a value for a form. Use RadioGroup.
- For many actions. Use DropdownMenu.

## Layout (`attached`)
- `false`: Spaced buttons. Default.
- `true`: Joined into one control; inner corners squared.

## Orientation (`orientation`)
- `horizontal`: In a row. Default.
- `vertical`: Stacked, full width.

## States
- **Button states**: Hover, focus and disabled come from Button. (—)

## Props
### ButtonGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` |  | Names the group for screen readers, e.g. "Text alignment". |
| `attached` | `boolean` | false | Joins the buttons into one control instead of spacing them. |
| `orientation` | `"horizontal" \| "vertical"` | horizontal | `horizontal` (default) or `vertical`. |
| `children` | `ReactNode` |  | Button elements. |

## Guidelines
- Do: Group only closely related actions. Don’t: Put Save and Delete in one attached group. Why: Attached buttons read as one control; a destructive action needs space.
- Do: Name the group with aria-label. Don’t: Leave a group of icon buttons unnamed. Why: The name tells screen reader users what the buttons control.
- Do: Use segmented Tabs to pick one of a few options. Don’t: Use a button group as a selector. Why: Tabs expose the selection and support arrow-key navigation.

## Content
- Use short, parallel labels, or icons with aria-labels (IconButton).

## Accessibility
- Role: group of buttons.
- Tab: Moves between buttons.
- Enter / Space: Activates a button.
- `role="group" + aria-label`: Always.
- Focus: Each button shows its focus ring.
- WCAG 1.3.1 Info and Relationships: A named group.

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

### Icon buttons
A toolbar of related icon actions, each named with a label.

```tsx
import { ButtonGroup, IconButton } from '@ds/react';
import { Bold, Italic, Underline } from 'lucide-react';

<ButtonGroup aria-label="Text style" attached>
  <IconButton icon={<Bold />} label="Bold" variant="secondary" appearance="outline" />
  <IconButton icon={<Italic />} label="Italic" variant="secondary" appearance="outline" />
  <IconButton icon={<Underline />} label="Underline" variant="secondary" appearance="outline" />
</ButtonGroup>
```

Tokens: `--button-group-*` (values per theme in ai/components/button-group.json).
