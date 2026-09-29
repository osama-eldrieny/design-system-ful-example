# Slider

> A slider sets a number, or a range with two thumbs, by dragging along a track or with the arrow keys. It can show its value and labelled marks, and is labelled like every other field.

Status: stable · Category: Forms · Since 0.3.0

```tsx
import { Slider } from '@ds/react';
```

## When to use
- When the exact number matters less than the position, e.g. volume, brightness, zoom.
- For a price or date range filter (two thumbs).

## When not to use
- When people need an exact number. Use InputField with type="number".
- For a few named choices. Use RadioGroup or ButtonGroup.

## Values (`value`)
- `[n]`: One thumb: a single value. Default.
- `[from, to]`: Two thumbs: a range.

## States
- **Default**: At rest. (—)
- **Hover**: Thumb border darkens. (:hover)
- **Focus**: Focus ring on the thumb. (:focus-visible)
- **Disabled**: Dimmed; can’t move. (disabled)

## Props
### Slider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | What is being set, e.g. "Volume". Always required: it names the slider. |
| `hideLabel` | `boolean` |  | Hides the label visually but keeps it for screen readers. |
| `description` | `ReactNode` |  | Help text under the slider. |
| `error` | `ReactNode` |  | Error message. |
| `value` | `number[]` |  | One number for a single value, two for a range, e.g. [20, 80]. Controlled. |
| `defaultValue` | `number[]` |  | Initial value(s) when uncontrolled. Default [min]. |
| `onValueChange` | `((value: number[]) => void)` |  | Called continuously while dragging. |
| `onValueCommit` | `((value: number[]) => void)` |  | Called once when the person lets go or finishes with the keyboard. |
| `min` | `number` | 0 |  |
| `max` | `number` | 100 |  |
| `step` | `number` | 1 |  |
| `marks` | `SliderMark[]` |  | Labelled positions under the track, e.g. the ends or common values. |
| `showValue` | `boolean` | false | Shows the current value(s) next to the label. |
| `formatValue` | `((value: number) => string)` |  | Formats values for display and screen readers, e.g. (v) => `$${v}`. |
| `thumbLabels` | `[string, string]` | ['Minimum', 'Maximum'] | Names of the two thumbs in a range, for screen readers. Default ["Minimum", "Maximum"]. |
| `disabled` | `boolean` |  |  |
| `name` | `string` |  | Form field name; each value is submitted. |
| `id` | `string` |  |  |
| `className` | `string` |  |  |

## Guidelines
- Do: Pair with a number field when exact values matter. Don’t: Make people drag to hit exactly 37. Why: Sliders are imprecise, especially on touch screens.
- Do: Use formatValue so screen readers hear units. Don’t: Leave values as bare numbers for prices. Why: “40 dollars” is clearer than “40”.
- Do: Filter with onValueCommit. Don’t: Re-run a slow search on every drag frame. Why: It keeps the page responsive.

## Content
- Show the value (showValue) unless the effect itself shows it.
- Format values in their unit: “$40”, “75%”.
- Mark the ends or meaningful stops, not every step.

## Accessibility
- Role: slider (each thumb), labelled by the field label.
- ← → ↑ ↓: One step.
- Page Up / Page Down: Ten steps.
- Home / End: Minimum / maximum.
- `aria-labelledby`: The field label (plus “Minimum”/“Maximum” for ranges).
- `aria-valuetext`: The formatted value.
- `aria-describedby`: Help text and error.
- Focus: Focus ring on the thumb.
- WCAG 2.1.1 Keyboard: Fully operable by keyboard.
- WCAG 2.5.7 Dragging Movements: Clicking the track and the keyboard work without dragging.
- WCAG 1.4.11 Non-text Contrast: Track, range and thumb border meet 3:1.

## Examples
### Single value
Volume with its value shown.

```tsx
import { Slider } from '@ds/react';

<Slider label="Volume" defaultValue={[60]} showValue formatValue={(v) => `${v}%`} />
```

### Range
A price filter with marks.

```tsx
import { Slider } from '@ds/react';

<Slider
  label="Price"
  min={0}
  max={500}
  step={10}
  defaultValue={[100, 300]}
  showValue
  formatValue={(v) => `$${v}`}
  marks={[{ value: 0 }, { value: 250 }, { value: 500 }]}
  onValueCommit={([from, to]) => filter(from, to)}
/>
```

### Controlled
Keep the value in state.

```tsx
import { Slider } from '@ds/react';

<Slider label="Zoom" min={50} max={200} step={10} value={[zoom]} onValueChange={([z]) => setZoom(z)} />
```

Tokens: `--slider-*` (values per theme in ai/components/slider.json).
