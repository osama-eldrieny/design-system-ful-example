# Checkbox

> A checkbox turns one option on or off, or lets people pick any number of options from a list. The choice applies when the form is submitted. CheckboxGroup puts several under one question with a single legend and error.

Status: stable · Category: Forms · Since 0.3.0

```tsx
import { Checkbox } from '@ds/react';
import { CheckboxGroup } from '@ds/react';
```

## When to use
- To pick any number of options, including none, from a short list.
- For a single yes/no in a form, e.g. “I accept the terms”.
- For a select-all box over a list (indeterminate when some are selected).

## When not to use
- When exactly one option must be chosen. Use RadioGroup.
- For a setting that applies immediately. Use Switch.
- For a long list of options. Use Select or Combobox with multiple selection.

## Size (`size`)
- `small`: 14px box, small label; dense lists and tables.
- `medium`: 16px box. Default.
- `large`: 22px box; touch-first forms.

## Orientation (on CheckboxGroup) (`orientation`)
- `vertical`: Options stacked. Default; easiest to scan.
- `horizontal`: Two or three short options in a row; wraps when narrow.

## States
- **Unchecked**: Off. (—)
- **Checked**: On: filled box with a tick. (:checked)
- **Indeterminate**: Some, not all: a dash; announced as “mixed”. (indeterminate)
- **Hover**: Brand-colored border. (:hover)
- **Focus**: Focus ring around the box. (:focus-visible)
- **Error**: Red border and message. (error)
- **Disabled**: Dimmed; can’t be changed. (disabled)

## Props
### Checkbox

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | Visible label; clicking it toggles the box. Without it, pass aria-label. |
| `description` | `ReactNode` |  | Extra detail under the label. |
| `error` | `ReactNode` |  | Error for a single checkbox, e.g. “Accept the terms to continue”. Marks it invalid. |
| `checked` | `boolean` |  | Checked (controlled). Use with onCheckedChange. |
| `defaultChecked` | `boolean` |  | Initially checked when uncontrolled. |
| `onCheckedChange` | `((checked: boolean) => void)` |  | Called with the new checked state. |
| `indeterminate` | `boolean` | false | Shows a dash for “some but not all”, e.g. a select-all box. Announced as “mixed”. |
| `size` | `CheckboxSize` | medium | `small` for dense lists, `medium` by default, `large` for touch-first forms. |
| `value` | `string` |  | Value submitted with the form, and the id of this option inside a CheckboxGroup. |

### CheckboxGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string[]` |  | Checked values (controlled). Use with onValueChange. |
| `defaultValue` | `string[]` | [] | Initially checked values when uncontrolled. |
| `onValueChange` | `((value: string[]) => void)` |  | Called with the new list of checked values. |
| `orientation` | `"vertical" \| "horizontal"` | vertical | `vertical` (default) stacks options; `horizontal` puts short options in a row. |
| `size` | `CheckboxSize` | medium | Size of every checkbox in the group. |
| `name` | `string` |  | Form field name shared by the checkboxes. |
| `children` | `ReactNode` |  | The Checkbox options, each with a value. |
| `disabled` | `boolean` |  | Disables the control (and every control in a group). |
| `required` | `boolean` |  | Marks the field required: an asterisk after the label and `required` on the control. |
| `id` | `string` |  | Id of the control. Generated when not given. |
| `label` | `ReactNode` |  | What the control is for, e.g. "Message". Always required: it names the control. |
| `description` | `ReactNode` |  | Help text, e.g. a format hint. Announced with the control. |
| `error` | `ReactNode` |  | Error message. Marks the control invalid and replaces the success message. |
| `hideLabel` | `boolean` |  | Hides the label visually but keeps it for screen readers. Only when context makes it obvious. |
| `success` | `ReactNode` |  | Confirmation message, e.g. "Username is available". |
| `optional` | `boolean` |  | Marks the field optional with text after the label. Use when most fields are required. |
| `optionalLabel` | `string` |  | Text shown for optional fields. Default "(optional)". |

## Guidelines
- Do: Use a CheckboxGroup with a legend for related options. Don’t: Stack loose checkboxes under a paragraph. Why: The legend is announced with each option, so people know what they’re choosing.
- Do: Use a Switch for settings that apply at once. Don’t: Save a checkbox immediately when it’s clicked. Why: People expect checkboxes to wait for Submit.
- Do: Make the label clickable (it is by default). Don’t: Put the label in a separate element that doesn’t toggle. Why: The label is a much larger, easier target than the box.

## Content
- Labels: positive statements (“Email me updates”), not negatives (“Don’t email me”).
- Group legend: the question (“Which topics interest you?”).
- Order options logically: by frequency, alphabetically, or in a natural sequence.

## Accessibility
- Role: checkbox (native input); group is a fieldset with a legend.
- Tab: Moves to the next checkbox.
- Space: Toggles the focused checkbox.
- `aria-checked="mixed"`: Implied by the native indeterminate property.
- `aria-describedby`: Description and error of a single checkbox.
- `aria-invalid`: A single checkbox with an error.
- Focus: Focus ring around the box.
- WCAG 1.3.1 Info and Relationships: Native checkbox, label and fieldset/legend.
- WCAG 1.4.11 Non-text Contrast: Box borders meet 3:1 in every theme.
- WCAG 2.5.8 Target Size: The label extends the click target.
- WCAG 4.1.2 Name, Role, Value: Checked and mixed states come from the native input.

## Examples
### Single checkbox
A yes/no in a form, with an error.

```tsx
import { Checkbox } from '@ds/react';

<Checkbox
  name="terms"
  label="I accept the terms and conditions"
  error={errors.terms && 'Accept the terms to continue.'}
  required
/>
```

### Group
Several choices under one legend.

```tsx
import { CheckboxGroup, Checkbox } from '@ds/react';

<CheckboxGroup label="Topics" name="topics" defaultValue={['design']}>
  <Checkbox value="design" label="Design" />
  <Checkbox value="engineering" label="Engineering" />
  <Checkbox value="research" label="Research" description="Studies and interviews" />
</CheckboxGroup>
```

### Select all
Indeterminate while some rows are selected.

```tsx
import { Checkbox } from '@ds/react';

const all = selected.length === rows.length;
<Checkbox
  label="Select all"
  checked={all}
  indeterminate={selected.length > 0 && !all}
  onCheckedChange={(on) => setSelected(on ? rows.map((r) => r.id) : [])}
/>
```

Tokens: `--checkbox-*` (values per theme in ai/components/checkbox.json).
