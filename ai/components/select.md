# Select

> A select lets people pick one option from a list that opens below the field. It has a label, help text, error and success messages, option groups and disabled options, and matches InputField.

Status: stable · Category: Forms · Since 0.3.0

```tsx
import { Select } from '@ds/react';
import { SelectItem } from '@ds/react';
import { SelectGroup } from '@ds/react';
import { SelectSeparator } from '@ds/react';
```

## When to use
- To pick one option from about 5–15 known options, e.g. a country region or a sort order.
- When space is tight and the options don’t need to be visible all the time.

## When not to use
- For two to four options. Use RadioGroup (all options visible).
- For long lists people will search. Use Combobox.
- To pick several options. Use CheckboxGroup.
- For actions such as Edit or Delete. Use DropdownMenu.

## Size (`size`)
- `small`: Dense UI, filters and tables.
- `medium`: Default; matches InputField.
- `large`: Prominent forms.

## States
- **Placeholder**: Nothing chosen yet; secondary text color. (no value)
- **Hover**: Darker border. (:hover)
- **Focus**: Focus ring. (:focus-visible)
- **Open**: List shown; chevron flips. (data-state="open")
- **Error**: Red border and message; aria-invalid. (error)
- **Success**: Green border and message. (success)
- **Disabled**: Dimmed; can’t open. Options can be disabled on their own. (disabled)

## Props
### Select

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | What to choose, e.g. "Country". Always required: it names the field. |
| `hideLabel` | `boolean` |  | Hides the label visually but keeps it for screen readers. |
| `description` | `ReactNode` |  | Help text under the field. |
| `error` | `ReactNode` |  | Error message. Marks the field invalid. |
| `success` | `ReactNode` |  | Confirmation message. |
| `required` | `boolean` |  | Marks the field required. |
| `optional` | `boolean` |  | Marks the field optional with text after the label. |
| `placeholder` | `string` |  | Text shown until something is chosen, e.g. "Choose a country". |
| `value` | `string` |  | Selected value (controlled). Use with onValueChange. |
| `defaultValue` | `string` |  | Initially selected value when uncontrolled. |
| `onValueChange` | `((value: string) => void)` |  | Called with the new value. |
| `size` | `SelectSize` | medium | `small` for dense UI, `medium` by default, `large` for prominent forms. |
| `disabled` | `boolean` |  | Disables the field. |
| `name` | `string` |  | Form field name; the value is submitted with the form. |
| `id` | `string` |  | Id of the trigger. |
| `className` | `string` |  |  |
| `children` | `ReactNode` |  | SelectItem, SelectGroup and SelectSeparator elements. |

### SelectItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` |  | The value this option selects. |
| `children` | `ReactNode` |  | Option text; also used for typeahead. |

### SelectGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | Heading shown above the group's options. |

### SelectSeparator

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

## Guidelines
- Do: Use RadioGroup for two to four options. Don’t: Hide two options inside a Select. Why: Visible options are faster to compare and choose.
- Do: Group long lists with SelectGroup. Don’t: Show 40 ungrouped options. Why: Groups make long lists scannable; for very long lists use Combobox.
- Do: Keep the label visible. Don’t: Use the placeholder as the only label. Why: The placeholder disappears once something is chosen.

## Content
- Label: what’s being chosen (“Country”).
- Placeholder: “Choose a …”, or preselect a sensible default instead.
- Options: short, parallel, and in a logical order (alphabetical, by size, by frequency).

## Accessibility
- Role: combobox trigger with a listbox of options.
- Space / Enter / ↓: Opens the list.
- ↑ / ↓: Moves between options.
- Enter: Selects the highlighted option.
- Escape: Closes without changing.
- Type characters: Jumps to the matching option.
- `aria-expanded / aria-controls`: From Radix on the trigger.
- `aria-describedby`: Help text and message.
- `aria-invalid`: With an error.
- `aria-selected`: On the chosen option.
- Focus: Focus ring on the trigger; focus returns to it when the list closes.
- WCAG 2.1.1 Keyboard: Opens, navigates and selects from the keyboard.
- WCAG 4.1.2 Name, Role, Value: Labelled combobox exposing its value.
- WCAG 1.4.11 Non-text Contrast: Trigger border meets 3:1 in every theme.

## Examples
### Select
Label, placeholder and options.

```tsx
import { Select, SelectItem } from '@ds/react';

<Select label="Sort by" placeholder="Choose an order" name="sort">
  <SelectItem value="newest">Newest first</SelectItem>
  <SelectItem value="price-asc">Price: low to high</SelectItem>
  <SelectItem value="price-desc">Price: high to low</SelectItem>
</Select>
```

### Groups
Labelled groups and a separator.

```tsx
import { Select, SelectGroup, SelectItem, SelectSeparator } from '@ds/react';

<Select label="Time zone" defaultValue="cet">
  <SelectGroup label="Europe">
    <SelectItem value="gmt">London (GMT)</SelectItem>
    <SelectItem value="cet">Berlin (CET)</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup label="Middle East">
    <SelectItem value="gst">Dubai (GST)</SelectItem>
  </SelectGroup>
</Select>
```

### Controlled with an error
Keep the value in state and validate it.

```tsx
import { useState } from 'react';
import { Select, SelectItem } from '@ds/react';

const [plan, setPlan] = useState<string>();

<Select
  label="Plan"
  value={plan}
  onValueChange={setPlan}
  required
  error={submitted && !plan ? 'Choose a plan.' : undefined}
>
  <SelectItem value="free">Free</SelectItem>
  <SelectItem value="pro">Pro</SelectItem>
  <SelectItem value="team" disabled>Team (contact sales)</SelectItem>
</Select>
```

Tokens: `--select-*` (values per theme in ai/components/select.json).
