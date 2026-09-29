# Stack

> Stack lays its children out vertically with even spacing from the density-aware spacing scale.

Status: stable · Category: Layout · Since 0.4.0

```tsx
import { Stack } from '@ds/react';
```

## When to use
- For vertical rhythm: form fields, card content, page sections.

## When not to use
- For rows. Use Inline.
- For columns of cards. Use Grid.

## Gap (`gap`)
- `none … 3xl`: Steps of the spacing scale; they shrink in compact density.

## Alignment (`align`)
- `stretch`: Full width. Default.
- `start / center / end`: Shrink to content.

## States
- **Static**: Layout only; not interactive. (—)

## Props
### Stack

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gap` | `SpaceStep` | md | Space between children, from the spacing scale (follows density). Default md. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | stretch | Cross-axis alignment. Default stretch. |
| `as` | `ElementType` | div | Element to render, e.g. section or ul. Default div. |

## Guidelines
- Do: Use gap steps from the scale. Don’t: Add margins to children. Why: Gap keeps spacing consistent and density-aware.
- Do: Use `as` for meaning (ul, section). Don’t: Use a div where a list is meant. Why: Semantics help assistive tech.
- Do: Nest stacks for hierarchy (larger gaps outside). Don’t: Use one gap everywhere. Why: Spacing expresses grouping.

## Content
- Use layout components instead of margins on children.

## Accessibility
- Role: none (a div by default); use `as` for meaningful elements like ul or section.
- —: Not focusable.
- `none`: Layout only.
- Focus: None.
- WCAG 1.3.2 Meaningful Sequence: Visual order matches the DOM.
- WCAG 1.4.10 Reflow: Content stacks naturally at any width.

## Examples
### Form fields
Even spacing.

```tsx
import { Stack, InputField, Button } from '@ds/react';

<Stack gap="md">
  <InputField label="Name" />
  <InputField label="Email" />
  <Button>Save</Button>
</Stack>
```

### As a list
Semantics.

```tsx
import { Stack } from '@ds/react';

<Stack as="ul" gap="xs">{items}</Stack>
```

### Centered
Narrow items.

```tsx
import { Stack } from '@ds/react';

<Stack align="center">…</Stack>
```

Tokens: `--stack-*` (values per theme in ai/components/stack.json).
