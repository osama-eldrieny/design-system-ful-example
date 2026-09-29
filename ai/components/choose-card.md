# ChooseCard

> Choose cards are large radio buttons: each option is a card with a name, a description and an optional price, and people pick exactly one. Use them when options need explaining, such as plans.

Status: stable · Category: Patterns · Since 0.2.0

```tsx
import { ChooseCardGroup } from '@ds/react';
import { ChooseCard } from '@ds/react';
```

## When to use
- To pick one of two to four options that each need a sentence of explanation, e.g. a plan or a delivery speed.
- When the choice is important enough to deserve visual weight.

## When not to use
- For short options that need no explanation. Use RadioGroup.
- For more than about five options. Use RadioGroup or Select.
- When several options can be chosen. Use Checkbox.
- To navigate to another page. Use Card with href.

## Orientation (on ChooseCardGroup) (`orientation`)
- `vertical`: Cards stacked. Default; best in narrow spaces.
- `horizontal`: Cards in a row that wraps when narrow; for side-by-side comparison.

## States
- **Default**: Not selected. (—)
- **Hover**: Border takes the brand color. (:hover)
- **Selected**: Thicker brand border and a filled indicator. (data-state="checked")
- **Focus**: Focus ring around the card. (:focus-visible)
- **Disabled**: Dimmed; can’t be chosen. (disabled)

## Props
### ChooseCardGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` |  | Selected value (controlled). Use with onValueChange. |
| `defaultValue` | `string` |  | Initially selected value when uncontrolled. |
| `onValueChange` | `((value: string) => void)` |  | Called with the new value when the selection changes. |
| `orientation` | `"vertical" \| "horizontal"` | vertical | `vertical` (default) stacks cards; `horizontal` puts them in a row that wraps when narrow. |
| `aria-labelledby` | `string` |  | Name the group with aria-labelledby (pointing at a visible heading) or aria-label, e.g. "Plan". |
| `aria-label` | `string` |  | Defines a string value that labels the current element. |
| `children` | `ReactNode` |  | The ChooseCard options. |

### ChooseCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` |  | The value this card selects. |
| `title` | `ReactNode` |  | Option name, e.g. "Pro plan". Names the radio. |
| `description` | `ReactNode` |  | What the option includes. Read after the name. |
| `price` | `ReactNode` |  | Price or other key figure, shown at the end, e.g. "$12 / month". |

## Guidelines
- Do: Name the group with a visible heading via aria-labelledby. Don’t: Leave the group unnamed. Why: Screen reader users hear the group name before the options.
- Do: Keep descriptions parallel and about the same length. Don’t: Write a paragraph on one card and a word on the next. Why: Parallel content makes options easy to compare.
- Do: Use two to four cards. Don’t: List ten choose cards. Why: Large cards for many options push the rest of the page away; use a RadioGroup.

## Content
- Title: the option’s name in one or two words.
- Description: one line on what the option gives, focused on the difference from the others.
- Price: include the period, e.g. “$29 / month”.

## Accessibility
- Role: radiogroup containing radio buttons (each card).
- Tab: Moves into the group, to the selected card (or the first).
- Arrow keys: Move to and select the next or previous card.
- Space: Selects the focused card.
- `aria-labelledby on ChooseCardGroup`: Always: point it at the visible heading (or use aria-label).
- `aria-labelledby / aria-describedby on each card`: Set automatically: the title names it; description and price describe it.
- Focus: A focus ring surrounds the focused card.
- WCAG 1.3.1 Info and Relationships: Radio group semantics expose the single-choice relationship.
- WCAG 1.4.1 Use of Color: Selection shows as a filled indicator and a thicker border, not only color.
- WCAG 2.1.1 Keyboard: Tab and arrow keys operate the group.

## Examples
### Plan picker
Three plans side by side, labelled by a heading.

```tsx
import { ChooseCardGroup, ChooseCard } from '@ds/react';

<h2 id="plan">Choose your plan</h2>
<ChooseCardGroup aria-labelledby="plan" orientation="horizontal" defaultValue="pro">
  <ChooseCard value="basic" title="Basic" description="For individuals" price="Free" />
  <ChooseCard value="pro" title="Pro" description="For professionals" price="$29 / month" />
  <ChooseCard value="team" title="Team" description="For large teams" price="Custom" />
</ChooseCardGroup>
```

### Controlled
Keep the selection in state.

```tsx
import { useState } from 'react';
import { ChooseCardGroup, ChooseCard } from '@ds/react';

const [speed, setSpeed] = useState('standard');

<ChooseCardGroup aria-label="Delivery speed" value={speed} onValueChange={setSpeed}>
  <ChooseCard value="standard" title="Standard" description="3–5 working days" price="Free" />
  <ChooseCard value="express" title="Express" description="Next working day" price="$9" />
</ChooseCardGroup>
```

### Unavailable option
Disable an option and say why.

```tsx
import { ChooseCardGroup, ChooseCard } from '@ds/react';

<ChooseCardGroup aria-label="Data refresh">
  <ChooseCard value="daily" title="Daily" description="Once a day" />
  <ChooseCard value="realtime" title="Real-time" description="Available on Pro" disabled />
</ChooseCardGroup>
```

Tokens: `--choose-card-*` (values per theme in ai/components/choose-card.json).
