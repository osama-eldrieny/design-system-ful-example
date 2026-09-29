# RadioGroup

> A radio group lets people pick exactly one option from a short list, with every option visible at once. RadioGroup holds the label and state; each Radio is one option.

Status: stable · Category: Forms · Since 0.2.0

```tsx
import { RadioGroup } from '@ds/react';
import { Radio } from '@ds/react';
```

## When to use
- To choose one option from two to six that people should compare side by side.
- When the options need a short description each.

## When not to use
- For more than about six options. Use Select.
- To turn one setting on or off. Use Switch.
- When several options can be chosen. Use Checkbox group.
- To switch between views of content. Use Tabs.

## Orientation (`orientation`)
- `vertical`: Options stacked. Default; easiest to scan.
- `horizontal`: Two or three short options in a row, e.g. Yes / No.

## States
- **Unselected**: Option not chosen. (Default.)
- **Selected**: The chosen option. (value matches the option.)
- **Hover**: Shows the option responds to the pointer. (:hover.)
- **Focus**: Shows keyboard focus. (:focus-visible; adds the focus ring.)
- **Disabled**: The option or group cannot be changed. (disabled on a Radio or the group.)
- **Error**: The choice is missing or invalid. (error prop on the group.)

## Props
### RadioGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | Visible group label, e.g. "Time period". Without it, pass aria-label. |
| `description` | `ReactNode` |  | Extra detail under the group label. |
| `error` | `ReactNode` |  | Error message. Marks the group invalid and is announced with it. |
| `value` | `string` |  | Selected value (controlled). Use with onValueChange. |
| `defaultValue` | `string` |  | Initially selected value when uncontrolled. |
| `onValueChange` | `((value: string) => void)` |  | Called with the new value when the selection changes. |
| `orientation` | `"vertical" \| "horizontal"` | vertical | `vertical` (default) stacks options; `horizontal` puts two or three short options in a row. |
| `children` | `ReactNode` |  | The Radio options. |

### Radio

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` |  | The value this option selects. |
| `label` | `ReactNode` |  | Visible option label; clicking it selects the option. |
| `description` | `ReactNode` |  | Extra detail under the label. |

## Guidelines
- Do: Use a radio group when people must choose exactly one option. Don’t: Use radios for independent on/off settings. Why: Radios are exclusive; independent settings belong in switches or checkboxes.
- Do: Give the group a label. Don’t: Rely on a nearby heading that isn’t connected to the group. Why: Screen readers announce the group label before the options, giving them context.
- Do: Keep to six options or fewer. Don’t: List a long set of options as radios. Why: Long lists are hard to scan; a Select saves space and keeps the choice clear.

## Content
- Label the group with a noun or question: "Time period", "How should we contact you?".
- Keep option labels short, parallel and mutually exclusive.
- Order options logically: by size, time or likelihood, not alphabetically by default.

## Accessibility
- Role: radiogroup containing radio items (Radix RadioGroup).
- Tab / Shift+Tab: Moves focus into the group (to the selected option) and out.
- Arrow keys: Move to the next or previous option and select it.
- Space: Selects the focused option.
- `aria-labelledby`: Links the group to its visible label.
- `aria-describedby`: Links the group description and error message.
- `aria-invalid`: Set when the group has an error.
- `aria-checked`: Set on each radio from the selection.
- Focus: Focus lands on the selected option (or the first) and shows the focus ring.
- WCAG 1.3.1 Info and Relationships: Group, option labels and descriptions are programmatically linked.
- WCAG 1.4.11 Non-text Contrast: Unselected controls have a 3:1 boundary; the selected fill and dot keep 3:1.
- WCAG 2.1.1 Keyboard: Arrow keys and Space, one Tab stop per group.
- WCAG 3.3.1 Error Identification: The error text is shown and announced with the group.
- WCAG 4.1.2 Name, Role, Value: Exposed as a radio group with named radios and their checked state.
- The error is shown as text, not only as a red border.

## Examples
### Choose one
A controlled radio group with a label.

```tsx
import { RadioGroup, Radio } from '@ds/react';

<RadioGroup label="Time period" value={period} onValueChange={setPeriod}>
  <Radio value="today" label="Today" />
  <Radio value="week" label="This week" />
  <Radio value="month" label="This month" />
</RadioGroup>
```

### Options with descriptions
Each option can explain itself.

```tsx
import { RadioGroup, Radio } from '@ds/react';

<RadioGroup label="Plan" defaultValue="pro">
  <Radio value="free" label="Free" description="1 project, community support" />
  <Radio value="pro" label="Pro" description="Unlimited projects, email support" />
</RadioGroup>
```

### Required with an error
Show what’s wrong when the choice is missing.

```tsx
import { RadioGroup, Radio } from '@ds/react';

<RadioGroup label="Delivery" required error="Choose a delivery option.">
  <Radio value="standard" label="Standard" />
  <Radio value="express" label="Express" />
</RadioGroup>
```

Tokens: `--radio-*` (values per theme in ai/components/radio-group.json).
