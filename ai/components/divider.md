# Divider

> A divider is a thin line that separates groups of content, horizontally or vertically, optionally with a short label such as “or”.

Status: stable · Category: Layout · Since 0.4.0

```tsx
import { Divider } from '@ds/react';
```

## When to use
- To separate groups in a list, menu or form.
- Between sign-in options, labelled “or”.

## When not to use
- To separate page sections. Use Spacing or headings.
- Between every list item. Use List divided.

## Orientation (`orientation`)
- `horizontal`: Between stacked content. Default.
- `vertical`: Between items in a row.

## States
- **Static**: Not interactive. (—)

## Props
### Divider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | horizontal | `horizontal` (default) between stacked content; `vertical` between items in a row. |
| `label` | `ReactNode` |  | Short text in the middle of a horizontal divider, e.g. “or”. |

## Guidelines
- Do: Prefer spacing and headings. Don’t: Put a divider between every block. Why: Too many lines add noise.
- Do: Keep labels to a word. Don’t: Write a sentence in a divider. Why: Long labels are hard to read between lines.
- Do: Use vertical dividers in toolbars. Don’t: Use a vertical divider as a page border. Why: It’s meant for small groups of items.

## Content
- Labels: one short word.

## Accessibility
- Role: separator (horizontal and vertical); none when labelled.
- —: Not focusable.
- `aria-orientation`: vertical dividers.
- Focus: None.
- WCAG 1.3.1 Info and Relationships: Separators are exposed as such.
- WCAG 1.4.11 Non-text Contrast: Dividers are decorative; groups are also separated by space.

## Examples
### Horizontal
Between groups.

```tsx
import { Divider } from '@ds/react';

<Divider />
```

### With a label
Between sign-in options.

```tsx
import { Divider } from '@ds/react';

<Divider label="or" />
```

### Vertical
In a toolbar.

```tsx
import { Divider } from '@ds/react';

<div style={{ display: 'flex' }}>…<Divider orientation="vertical" />…</div>
```

Tokens: `--divider-*` (values per theme in ai/components/divider.json).
