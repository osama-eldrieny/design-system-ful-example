# Container

> Container centers page content with a maximum width and page gutters that follow density, with smaller gutters on phones.

Status: stable · Category: Layout · Since 0.4.0

```tsx
import { Container } from '@ds/react';
```

## When to use
- To wrap page content so lines don’t get too long on wide screens.

## When not to use
- For spacing between items. Use Stack or Inline.
- For boxed content. Use Card.

## Size (`size`)
- `small`: Reading width.
- `medium`: Forms and articles.
- `large`: Apps. Default.
- `full`: No maximum.

## States
- **Static**: Layout only; not interactive. (—)

## Props
### Container

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"small" \| "medium" \| "large" \| "full"` | large | Maximum width: small for reading, medium for forms and articles, large (default) for apps. |
| `as` | `ElementType` | div |  |

## Guidelines
- Do: Use gap steps from the scale. Don’t: Add margins to children. Why: Gap keeps spacing consistent and density-aware.
- Do: Use `as` for meaning (ul, section). Don’t: Use a div where a list is meant. Why: Semantics help assistive tech.
- Do: Use small for long text. Don’t: Let paragraphs run the full screen width. Why: Long lines are hard to read.

## Content
- Use layout components instead of margins on children.

## Accessibility
- Role: none (a div by default); use `as` for meaningful elements like ul or section.
- —: Not focusable.
- `none`: Layout only.
- Focus: None.
- WCAG 1.4.8 Visual Presentation: Small width keeps lines readable.
- WCAG 1.4.10 Reflow: Full width on small screens with gutters.

## Examples
### Page
Wrap a page.

```tsx
import { Container } from '@ds/react';

<Container as="main">…</Container>
```

### Article
Reading width.

```tsx
import { Container } from '@ds/react';

<Container size="small" as="article">…</Container>
```

### Full width
Dashboards.

```tsx
import { Container } from '@ds/react';

<Container size="full">…</Container>
```

Tokens: `--container-*` (values per theme in ai/components/container.json).
