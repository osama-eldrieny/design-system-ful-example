# Skeleton

> A skeleton is a grey placeholder in the shape of content that is loading: lines of text, image blocks and avatar circles. It keeps the layout steady while data arrives.

Status: stable · Category: Feedback · Since 0.4.0

```tsx
import { Skeleton } from '@ds/react';
```

## When to use
- When loading content whose layout is known: lists, cards, profiles.

## When not to use
- For a short action like saving. Use Spinner.
- For measurable tasks. Use Progress.

## Variant (`variant`)
- `text`: Lines of text. Default.
- `rect`: A block; set width and height.
- `circle`: A circle; set width.

## States
- **Shimmering**: A light sweep; static for reduced motion. (—)

## Props
### Skeleton

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"text" \| "rect" \| "circle"` | text | `text` lines (default), a `rect` block such as an image, or a `circle` such as an avatar. |
| `lines` | `number` | 1 | Number of text lines; the last is shorter. |
| `width` | `InlineSize<string \| number>` |  | Width, e.g. "60%" or 120 (px). Text defaults to full width. |
| `height` | `BlockSize<string \| number>` |  | Height of a rect or circle, e.g. 160 (px). |

## Guidelines
- Do: Match the size of the real content. Don’t: Use one generic block for every layout. Why: Matching shapes prevent layout shift when content loads.
- Do: Mark the region aria-busy. Don’t: Leave screen reader users with an empty region. Why: Skeletons are silent by design.
- Do: Show skeletons only briefly. Don’t: Leave skeletons up after an error. Why: Replace them with the content or an error message.

## Content
- Mirror the real layout; don’t add placeholder text.

## Accessibility
- Role: none (aria-hidden).
- —: Not focusable.
- `aria-hidden`: Always; announce loading elsewhere.
- Focus: None.
- WCAG 2.3.3 Animation from Interactions: No shimmer for reduced motion.
- WCAG 1.3.2 Meaningful Sequence: Hidden placeholders don’t interrupt reading.
- WCAG 4.1.3 Status Messages: Guidelines require announcing loading separately.

## Examples
### Text
Three lines.

```tsx
import { Skeleton } from '@ds/react';

<Skeleton lines={3} />
```

### Card
Image, title and text.

```tsx
import { Skeleton } from '@ds/react';

<div aria-busy="true">
  <Skeleton variant="rect" height={160} />
  <Skeleton lines={2} />
</div>
```

### Person
Avatar and name.

```tsx
import { Skeleton } from '@ds/react';

<Skeleton variant="circle" width={40} />
<Skeleton width="40%" />
```

Tokens: `--skeleton-*` (values per theme in ai/components/skeleton.json).
