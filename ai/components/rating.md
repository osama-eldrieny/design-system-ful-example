# Rating

> Stars for giving a score, such as rating a template, or for showing one, such as an average of 4.5 out of 5. Interactive ratings are a radio group; read-only ratings can show halves.

Status: stable · Category: Forms · Since 1.2.0

```tsx
import { Rating } from '@ds/react';
```

## When to use
- To let people score something on a short scale, e.g. "Rate this template".
- To show an average score next to products, reviews or templates.

## When not to use
- To pick a number from a wide range. Use Slider.
- For a yes / no reaction. Use Button.
- To show progress toward a goal. Use ProgressBar.

## Size (`size`)
- `small`: In lists, cards and table rows.
- `medium`: Default.
- `large`: For a dedicated rating form or review dialog.

## Read only (`readOnly`)
- `false`: Default. People choose a score.
- `true`: Shows a score, including halves, without letting people change it.

## Show value (`showValue`)
- `false`: Default. Stars only.
- `true`: Adds the number after the stars.

## States
- **Not rated**: No score chosen yet; all stars are empty. (value is 0.)
- **Rated**: Stars up to the score are filled. (value is 1 to max.)
- **Hover**: Previews the score up to the star under the pointer. (:hover.)
- **Focus**: Shows keyboard focus on the current star. (:focus-visible.)
- **Read only**: Shows a score that cannot be changed. (readOnly prop.)

## Props
### Rating

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | What is rated, e.g. "Rate this template". Names the group. |
| `value` | `number` |  | Rating shown (controlled). 0 means not rated. Halves show in read-only mode. |
| `defaultValue` | `number` | 0 | Initial rating when uncontrolled. Default 0. |
| `onValueChange` | `((value: number) => void)` |  | Called with the chosen rating. |
| `max` | `number` | 5 | Number of stars. Default 5. |
| `readOnly` | `boolean` | false | Shows a rating without letting people change it, e.g. an average of 4.5. |
| `size` | `RatingSize` | medium | `small` in lists and cards, `medium` (default), `large` for a rating form. |
| `showValue` | `boolean` | false | Shows the number after the stars, e.g. "4.5". |
| `starLabel` | `((n: number, max: number) => string)` | (n) => `${n} star${n === 1 ? '' : 's'}` | Words for each star, for translation. Default "1 star", "2 stars"… |
| `summaryLabel` | `((value: number, max: number) => string)` | (v, m) => `Rated ${v} out of ${m}` | Words for the read-only summary. Default "Rated 4.5 out of 5". |

## Guidelines
- Do: Give the rating a label that says what is rated. Don’t: Leave stars without a name. Why: Screen readers announce the label as the group name.
- Do: Use read-only stars with the value for averages. Don’t: Use interactive stars to show someone else’s score. Why: Interactive stars invite a click that would change the score.
- Do: Keep the scale at five stars. Don’t: Use ten or more stars. Why: Long scales are slow to scan and hard to hit on touch screens.

## Content
- Name what is rated in the label: "Rate this template", not "Rating".
- Show the number next to read-only stars when exact values matter.
- Translate starLabel and summaryLabel in other languages.

## Accessibility
- Role: radiogroup of native radio inputs; read-only ratings are role="img" with a summary.
- Tab: Moves focus to the chosen star (or the first one).
- Arrow keys: Change the score.
- `aria-label`: From label on the group; each star is named "N stars".
- `role="img"`: Read-only ratings, named "Label: Rated 4.5 out of 5".
- Focus: A focus ring appears around the focused star.
- WCAG 1.1.1 Non-text Content: Read-only stars have a text summary of the score.
- WCAG 2.1.1 Keyboard: Native radio inputs: Tab to the group, arrows to change.
- WCAG 4.1.2 Name, Role, Value: A named radio group whose checked star is the value.
- Filled and empty stars differ in shape fill as well as color.

## Examples
### Rate something
A controlled rating.

```tsx
import { Rating } from '@ds/react';

<Rating label="Rate this template" value={score} onValueChange={setScore} />
```

### Average score
Read-only, with a half star and the number.

```tsx
import { Rating } from '@ds/react';

<Rating label="Customer rating" value={4.5} readOnly showValue size="small" />
```

### Translated
Custom words for each star.

```tsx
import { Rating } from '@ds/react';

<Rating label="قيّم القالب" starLabel={(n) => `${n} من 5`} />
```

Tokens: `--rating-*` (values per theme in ai/components/rating.json).
