# Popover

> A popover shows interactive content anchored to a button, such as a small form, filters or details. It doesn’t block the page: clicking outside or Escape closes it and focus returns to the trigger.

Status: stable · Category: Overlays · Since 0.4.0

```tsx
import { Popover } from '@ds/react';
import { PopoverTrigger } from '@ds/react';
import { PopoverContent } from '@ds/react';
import { PopoverClose } from '@ds/react';
```

## When to use
- For small, related content or controls next to what opened them: a quick filter, a color picker, details.

## When not to use
- For a list of actions. Use DropdownMenu.
- For a short hint. Use Tooltip.
- For tasks that need full attention. Use Modal.

## Side (`side`)
- `bottom`: Default.
- `top`: Above.
- `right / left`: Beside; flips when there isn’t room.

## States
- **Open**: Shown; focus moves inside. (trigger click)
- **Closed**: Focus returns to the trigger. (—)

## Props
### Popover

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### PopoverTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

### PopoverContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | Heading; names the popover. Without it, pass aria-label. |
| `showClose` | `boolean` | true | Shows a close button. Default true. Escape and clicking outside also close it. |
| `closeLabel` | `string` | Close | Accessible name of the close button. Default "Close". |
| `asChild` | `boolean` |  |  |

### PopoverClose

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

## Guidelines
- Do: Open popovers from a button. Don’t: Open them on hover. Why: Hover isn’t available to keyboard and touch users; use HoverCard only for previews.
- Do: Keep content small. Don’t: Put a long form in a popover. Why: Long popovers get cut off and are hard to navigate.
- Do: Use DropdownMenu for action lists. Don’t: Build a menu out of buttons in a popover. Why: Menus have their own keyboard pattern and semantics.

## Content
- Keep it short; if it needs scrolling, use a Drawer or Modal.

## Accessibility
- Role: dialog (non-modal), controlled by the trigger button.
- Enter / Space: Opens from the trigger.
- Escape: Closes and returns focus.
- `aria-expanded / aria-controls`: On the trigger (Radix).
- `aria-label on the close button`: closeLabel.
- Focus: Moves in on open, back to the trigger on close.
- WCAG 2.1.1 Keyboard: Opens, closes and works by keyboard.
- WCAG 1.4.13 Content on Hover or Focus: Dismissible with Escape; stays open until dismissed.
- WCAG 4.1.2 Name, Role, Value: Expanded state on the trigger.

## Examples
### Details
A titled popover.

```tsx
import { Popover, PopoverTrigger, PopoverContent, Button } from '@ds/react';

<Popover>
  <PopoverTrigger asChild><Button appearance="outline">Shipping</Button></PopoverTrigger>
  <PopoverContent title="Shipping">Free delivery on orders over $50.</PopoverContent>
</Popover>
```

### Quick filter
Controls inside.

```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverClose, Slider, Button } from '@ds/react';

<Popover>
  <PopoverTrigger asChild><Button appearance="outline">Price</Button></PopoverTrigger>
  <PopoverContent title="Price">
    <Slider label="Price" hideLabel defaultValue={[0, 300]} max={500} />
    <PopoverClose asChild><Button size="small">Apply</Button></PopoverClose>
  </PopoverContent>
</Popover>
```

### Placement
On the right.

```tsx
import { Popover, PopoverTrigger, PopoverContent, Button } from '@ds/react';

<Popover>
  <PopoverTrigger asChild><Button>Info</Button></PopoverTrigger>
  <PopoverContent side="right" showClose={false} aria-label="More information">More information.</PopoverContent>
</Popover>
```

Tokens: `--popover-*` (values per theme in ai/components/popover.json).
