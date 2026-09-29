# HoverCard

> A hover card previews what a link points to, such as a person’s profile, when a mouse user points at it or a keyboard user focuses it. The link itself must lead to the same information.

Status: stable · Category: Overlays · Since 0.4.0

```tsx
import { HoverCard } from '@ds/react';
import { HoverCardTrigger } from '@ds/react';
import { HoverCardContent } from '@ds/react';
```

## When to use
- To preview a linked person, product or page without leaving the current one.

## When not to use
- For essential information or actions. Use Popover or the page itself.
- For a short hint. Use Tooltip.

## Side (`side`)
- `bottom`: Default.
- `top / left / right`: Other placements.

## States
- **Shown**: After a delay on hover or focus. (hover or focus)

## Props
### HoverCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### HoverCardTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

### HoverCardContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

## Guidelines
- Do: Preview what the link already leads to. Don’t: Put unique actions in the card. Why: Keyboard, touch and screen reader users may never see the card.
- Do: Use links as triggers. Don’t: Use plain text as a trigger. Why: Plain text can’t receive keyboard focus.
- Do: Keep it small. Don’t: Show a full page in a hover card. Why: Large cards cover the content people were reading.

## Content
- Show a small summary: name, role, one line, maybe an avatar.

## Accessibility
- Role: supplementary content; not announced by screen readers.
- Tab: Focusing the link opens the card.
- `none`: The link carries the meaning.
- Focus: Stays on the link.
- WCAG 1.4.13 Content on Hover or Focus: Hoverable, dismissible, persistent.
- WCAG 2.1.1 Keyboard: Opens on focus too; the link works on its own.
- WCAG 1.3.1 Info and Relationships: Nothing essential lives only in the card.

## Examples
### Profile preview
A user link.

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent, Link, Avatar } from '@ds/react';

<HoverCard>
  <HoverCardTrigger asChild><Link href="/u/sarah">@sarah</Link></HoverCardTrigger>
  <HoverCardContent><Avatar name="Sarah Chen" /> Sarah Chen · Head of Products</HoverCardContent>
</HoverCard>
```

### Delays
Open faster, close slower.

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent, Link } from '@ds/react';

<HoverCard openDelay={300} closeDelay={200}>
  <HoverCardTrigger asChild><Link href="/p/1">Wireless headphones</Link></HoverCardTrigger>
  <HoverCardContent>$299 · In stock</HoverCardContent>
</HoverCard>
```

### Placement
On the right.

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent, Link } from '@ds/react';

<HoverCard>
  <HoverCardTrigger asChild><Link href="/docs">Docs</Link></HoverCardTrigger>
  <HoverCardContent side="right">Guides and API reference.</HoverCardContent>
</HoverCard>
```

Tokens: `--hover-card-*` (values per theme in ai/components/hover-card.json).
