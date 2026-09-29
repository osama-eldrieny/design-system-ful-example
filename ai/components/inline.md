# Inline

> Inline lays its children out in a row that wraps onto more lines, e.g. buttons, tags or form actions.

Status: stable · Category: Layout · Since 0.4.0

```tsx
import { Inline } from '@ds/react';
```

## When to use
- For rows of buttons, tags, badges or metadata.

## When not to use
- For vertical layouts. Use Stack.
- For equal-width cards. Use Grid.

## Gap (`gap`)
- `none … 3xl`: Steps of the spacing scale; they shrink in compact density.

## Distribution (`justify`)
- `start`: Default.
- `center / end`: Aligned.
- `between`: Spread to both ends.

## States
- **Static**: Layout only; not interactive. (—)

## Props
### Inline

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gap` | `SpaceStep` | sm | Space between children (follows density). Default sm. |
| `align` | `"start" \| "center" \| "end" \| "baseline" \| "stretch"` | center | Vertical alignment. Default center. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | start | Horizontal distribution. Default start. |
| `wrap` | `boolean` | true | Wrap onto more lines when there isn’t room. Default true. |
| `as` | `ElementType` | div |  |

## Guidelines
- Do: Use gap steps from the scale. Don’t: Add margins to children. Why: Gap keeps spacing consistent and density-aware.
- Do: Use `as` for meaning (ul, section). Don’t: Use a div where a list is meant. Why: Semantics help assistive tech.
- Do: Keep wrapping on. Don’t: Force long rows with wrap={false}. Why: Rows that can’t wrap overflow on phones.

## Content
- Use layout components instead of margins on children.

## Accessibility
- Role: none (a div by default); use `as` for meaningful elements like ul or section.
- —: Not focusable.
- `none`: Layout only.
- Focus: None.
- WCAG 1.4.10 Reflow: Wraps instead of scrolling.
- WCAG 1.3.2 Meaningful Sequence: Order follows the DOM.

## Examples
### Form actions
At the end.

```tsx
import { Inline, Button } from '@ds/react';

<Inline justify="end">
  <Button appearance="outline">Cancel</Button>
  <Button>Save</Button>
</Inline>
```

### Tags
Wrapping.

```tsx
import { Inline, Tag } from '@ds/react';

<Inline gap="xs">{tags.map((t) => <Tag key={t}>{t}</Tag>)}</Inline>
```

### Spread
Title and action.

```tsx
import { Inline, Button } from '@ds/react';

<Inline justify="between"><h2>Orders</h2><Button>New</Button></Inline>
```

Tokens: `--inline-*` (values per theme in ai/components/inline.json).
