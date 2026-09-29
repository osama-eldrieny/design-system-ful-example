# Progress

> A progress bar shows how far a task has got, such as an upload or setup steps. Without a value it becomes an indeterminate, animated bar.

Status: stable · Category: Feedback · Since 0.4.0

```tsx
import { Progress } from '@ds/react';
```

## When to use
- For tasks with measurable progress: uploads, downloads, processing.
- For completion, e.g. a profile 60% complete or storage used.

## When not to use
- For unknown, short waits in a small area. Use Spinner.
- For steps people move through. Use Stepper.

## Tone (`tone`)
- `primary`: Default.
- `success`: Complete or healthy.
- `warning`: Near a limit, e.g. storage 90%.
- `danger`: Over a limit or failed.

## Size (`size`)
- `medium`: Default.
- `small`: Thin; cards and tables.

## States
- **Determinate**: Bar length shows value/max. (value)
- **Indeterminate**: Animated bar; unknown progress. (no value)

## Props
### Progress

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | What is progressing, e.g. "Uploading report.pdf". Names the bar. |
| `hideLabel` | `boolean` | false | Hides the label visually but keeps it for screen readers. |
| `value` | `number` |  | Current value. Leave out for unknown progress (an animated, indeterminate bar). |
| `max` | `number` | 100 | Value when complete. Default 100. |
| `showValue` | `boolean` | false | Shows the value, e.g. "45%", next to the label. |
| `formatValue` | `((value: number, max: number) => string)` | (value: number, max: number) => `${Math.round((value / max) * 100)}%` | Formats the shown and announced value. Default a percentage. |
| `tone` | `"primary" \| "success" \| "warning" \| "danger"` | primary | Color meaning: primary (default), success, warning, danger. |
| `size` | `"small" \| "medium"` | medium | `small` for a thin bar in cards and tables, `medium` by default. |

## Guidelines
- Do: Always give a label. Don’t: Show an unlabelled bar. Why: The label says what is progressing.
- Do: Announce completion with an Alert or toast. Don’t: Rely on the bar reaching 100%. Why: Screen reader users don’t hear the bar change.
- Do: Use a tone with a word for limits (“90% used”). Don’t: Show danger color without saying why. Why: Color alone isn’t enough.

## Content
- Label: what is happening, e.g. “Uploading report.pdf”.

## Accessibility
- Role: progressbar.
- —: Not focusable.
- `aria-labelledby`: The label.
- `aria-valuenow / min / max / valuetext`: Determinate; left out when indeterminate.
- Focus: None.
- WCAG 1.3.1 Info and Relationships: Labelled progressbar.
- WCAG 1.4.11 Non-text Contrast: Bar meets 3:1 against the track.
- WCAG 2.3.3 Animation from Interactions: Slows for reduced motion.

## Examples
### Upload
With the value shown.

```tsx
import { Progress } from '@ds/react';

<Progress label="Uploading report.pdf" value={45} showValue />
```

### Storage
Custom format and tone.

```tsx
import { Progress } from '@ds/react';

<Progress label="Storage" value={9.1} max={10} tone="warning" showValue formatValue={(v, m) => `${v} of ${m} GB`} />
```

### Indeterminate
Unknown progress.

```tsx
import { Progress } from '@ds/react';

<Progress label="Preparing export" />
```

Tokens: `--progress-*` (values per theme in ai/components/progress.json).
