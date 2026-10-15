# Carousel

> A set of slides shown one at a time, with previous and next arrows, dots and the arrow keys. Use it for a short set of highlights or featured content.

Status: stable · Category: Data display · Since 1.3.0

```tsx
import { Carousel } from '@ds/react';
import { CarouselControls } from '@ds/react';
```

## When to use
- For two to five highlights or featured items on a page.
- When each slide is a self-contained message or picture.

## When not to use
- For a long list of items to browse. Use Card grid.
- For slides that must play without interaction. Use VideoPlayer.
- For switching between views of the same content. Use Tabs.

## Controls (`controls`)
- `both`: Default. Arrows and dots.
- `arrows`: Arrows only, for many slides.
- `dots`: Dots only, for a compact row.

## States
- **Current**: The slide on show; its dot is filled. (index.)
- **Focus**: A focus ring on the carousel or a control. (:focus-visible.)

## Props
### Carousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the carousel, e.g. "Highlights". |
| `slides` | `ReactNode[]` |  | One item per slide. |
| `index` | `number` |  | Slide shown (controlled), 0-based. |
| `defaultIndex` | `number` | 0 |  |
| `onIndexChange` | `((index: number) => void)` |  |  |
| `controls` | `CarouselControls` | both | Which controls show: arrows and dots (default), arrows only, or dots only. |
| `slideLabel` | `((index: number, total: number) => string)` | (i, total) => `${i + 1} of ${total}` | Words for a slide’s name. Default "{n} of {total}". |

### CarouselControls

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Keep to a few slides, two to five. Don’t: Put twenty slides in one carousel. Why: People rarely go past the first few slides.
- Do: Give every slide a visible control or a way to reach it. Don’t: Hide the controls and rely on swiping. Why: Not every device swipes, and keyboard users need the arrows.
- Do: Put the most important message on the first slide. Don’t: Hide the key message on the fourth slide. Why: Most people only see the first slide.

## Content
- Keep each slide’s message to one idea.
- Name the carousel by what it shows, e.g. "Highlights".

## Accessibility
- Role: region with roledescription "carousel"; each slide is a group with roledescription "slide".
- Tab: Moves to the previous arrow, the dots, then the next arrow.
- Enter / Space: Activates an arrow or dot to show that slide.
- `aria-roledescription`: Carousel and slide.
- `aria-live`: Polite, on the slide, so the new slide is announced.
- `aria-current`: On the dot for the current slide.
- Focus: The carousel and each control show a focus ring.
- WCAG 2.1.1 Keyboard: Slides move with the arrow keys and every control is reachable by Tab.
- WCAG 4.1.3 Status Messages: Slide changes are announced politely without moving focus.
- Only the current slide is shown, so non-current slides are not read out.

## Examples
### Highlights
Three highlights with arrows and dots.

```tsx
import { Carousel } from '@ds/react';

<Carousel label="Highlights" slides={[<Highlight key="a" />, <Highlight key="b" />, <Highlight key="c" />]} />
```

### Controlled
The current slide lives in your state.

```tsx
import { Carousel } from '@ds/react';

<Carousel label="Offers" slides={offers} index={index} onIndexChange={setIndex} />
```

### Arrows only
For a large set of slides.

```tsx
import { Carousel } from '@ds/react';

<Carousel label="Gallery" slides={images} controls="arrows" />
```

Tokens: `--carousel-*` (values per theme in ai/components/carousel.json).
