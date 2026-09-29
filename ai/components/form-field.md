# FormField

> FormField puts a label, help text and an error or success message around a form control and wires them together, so screen readers announce the label, hint and error with the control. Library fields like Textarea use it internally; use it directly to build fields from other controls.

Status: stable · Category: Forms · Since 0.3.0

```tsx
import { FormField } from '@ds/react';
import { useFormField } from '@ds/react';
```

## When to use
- To label a control that has no label of its own, e.g. a third-party date picker.
- To group related controls (switches, checkboxes) under one question with group.

## When not to use
- Around InputField, Textarea or RadioGroup: they already include it. Use The field’s own label, description and error props.
- For a heading over a whole form section. Use A heading element.

## Structure (`group`)
- `false`: One control: a label linked to it by id. Default.
- `true`: Several controls answering one question: a fieldset and legend.

## States
- **Default**: Label and optional help text. (—)
- **Error**: Red message; control marked aria-invalid. (error)
- **Success**: Green confirmation message. (success)
- **Disabled**: Control (or the whole group) disabled. (disabled)

## Props
### FormField

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### useFormField

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Give every control a visible label. Don’t: Use placeholder text as the label. Why: Placeholders disappear while typing and often fail contrast.
- Do: Use group for a set of checkboxes or switches. Don’t: Put a plain label above a group of controls. Why: A legend names the group for screen readers; a label can point at one control only.
- Do: Write errors that say how to fix the problem. Don’t: Write “Invalid input”. Why: People need to know what to change.

## Content
- Label: a short noun phrase (“Email address”), not an instruction.
- Description: what or how to enter, e.g. “We’ll only use this for receipts”.
- Error: say what went wrong and how to fix it: “Enter a date in the future”.

## Accessibility
- Role: label + control, or fieldset (group) + legend.
- —: From the control. Clicking the label focuses the control.
- `aria-describedby`: Points at the description and message.
- `aria-invalid`: Set on the control when there is an error.
- `aria-hidden on the asterisk`: The control’s required attribute already says it.
- Focus: From the control.
- WCAG 1.3.1 Info and Relationships: Label, legend and descriptions are programmatically linked.
- WCAG 3.3.1 Error Identification: Errors are text, linked to the control and marked aria-invalid.
- WCAG 3.3.2 Labels or Instructions: Every control gets a label; help text is announced.
- Explain the asterisk once per form, e.g. “Fields marked * are required”.

## Examples
### Label any control
The child gets id and the ARIA wiring.

```tsx
import { FormField } from '@ds/react';

<FormField label="Start date" description="The first day of your trip." required>
  <DatePicker />
</FormField>
```

### Group of switches
A fieldset with a legend.

```tsx
import { FormField, Switch } from '@ds/react';

<FormField group label="Email me about">
  <Switch label="Comments" defaultChecked />
  <Switch label="New followers" />
</FormField>
```

### Render function
Put the props where a third-party control needs them.

```tsx
import { FormField } from '@ds/react';

<FormField label="Country" error={errors.country}>
  {(control) => <CountrySelect inputProps={control} />}
</FormField>
```

Tokens: `--form-field-*` (values per theme in ai/components/form-field.json).
