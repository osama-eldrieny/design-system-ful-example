# InputField

> An input field lets people enter a single line of text: a name, an email address, a search term. It always has a label, and can show help text, an error or a success message, icons and a clear button.

Status: stable · Category: Forms · Since 0.2.0

```tsx
import { InputField } from '@ds/react';
```

## When to use
- To enter short free-form text: names, emails, numbers, search terms.
- When the answer isn’t one of a known, short list of options.

## When not to use
- For long or multi-line text. Use Textarea.
- To choose from known options. Use Select or RadioGroup.
- For dates. Use DatePicker.

## Size (`size`)
- `small`: Dense UI: filters, tables, toolbars.
- `medium`: Default for forms.
- `large`: Prominent single-field forms, e.g. a hero search.

## States
- **Default**: Ready for input. (At rest.)
- **Hover**: Shows the field responds to the pointer. (:hover on the field.)
- **Focus**: The field is receiving input. (:focus-within; brand border and focus ring.)
- **Error**: The value is missing or invalid. (error prop.)
- **Success**: The value was checked and is valid. (success prop.)
- **Read-only**: The value can be read and copied but not changed. (readOnly prop.)
- **Disabled**: The field isn’t available right now. (disabled prop.)

## Props
### InputField

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | What to enter, e.g. "Email address". Always required: it is the field's accessible name. |
| `hideLabel` | `boolean` | false | Hides the label visually but keeps it for screen readers. Only for fields whose purpose is obvious from context, such as a search box with a search icon. |
| `optional` | `boolean` | false | Marks the field optional with text after the label. Use when most fields are required. |
| `optionalLabel` | `string` | (optional) | Text shown for optional fields. Default "(optional)". |
| `description` | `ReactNode` |  | Help text under the field, e.g. format hints. |
| `error` | `ReactNode` |  | Error message. Marks the field invalid and replaces the success message. |
| `success` | `ReactNode` |  | Confirmation message, e.g. "Username is available". |
| `size` | `InputFieldSize` | medium | `small` for dense UI, `medium` by default, `large` for prominent forms. |
| `iconStart` | `ReactNode` |  | Icon before the text, e.g. a search or mail icon. Hidden from screen readers. |
| `iconEnd` | `ReactNode` |  | Icon after the text. Hidden from screen readers. |
| `clearable` | `boolean` | false | Shows a clear button while the (controlled) value isn't empty. Use with onClear. |
| `onClear` | `(() => void)` |  | Called when the clear button is pressed; set the value to '' here. |
| `clearLabel` | `string` | Clear | Accessible name of the clear button. Default "Clear". |

## Guidelines
- Do: Always give the field a label. Don’t: Use the placeholder as the only label. Why: Placeholders vanish while typing and are not reliably announced.
- Do: Explain how to fix an error in words. Don’t: Show only a red border. Why: Color alone is missed by people with color blindness and by screen readers.
- Do: Match the field width to the expected answer, e.g. short for a postal code. Don’t: Stretch every field to the full width regardless of content. Why: Width hints at the expected length and makes forms easier to scan.

## Content
- Labels are short nouns in sentence case: "Email address", not "Enter your email address:".
- Use placeholders for examples of the format ("name@company.com"), never for instructions people need later.
- Write errors that say how to fix the problem: "Enter an email address like name@company.com".
- Mark optional fields "(optional)" when most fields are required, or required fields with * when most are optional.

## Accessibility
- Role: textbox (native <input>) with a <label>.
- Tab / Shift+Tab: Moves focus to and from the field (and to the clear button).
- Enter: Submits the surrounding form.
- `aria-invalid`: Set automatically when there is an error.
- `aria-describedby`: Links the help text and the error or success message.
- `aria-required`: From the native required attribute.
- `aria-label on the clear button`: From clearLabel (default "Clear").
- Focus: The whole field shows the brand border and a focus ring while typing.
- WCAG 1.3.1 Info and Relationships: Label, help text and messages are programmatically tied to the input.
- WCAG 1.4.3 Contrast (Minimum): Text, placeholder and messages pass 4.5:1 in every theme.
- WCAG 1.4.11 Non-text Contrast: The field border keeps 3:1 against the background.
- WCAG 3.3.1 Error Identification: Errors are described in text and announced.
- WCAG 3.3.2 Labels or Instructions: Every field has a label; the API requires it.
- A visually hidden label is still announced; use hideLabel only when the purpose is obvious, e.g. search with a search icon.

## Examples
### Labelled field
A controlled field with help text.

```tsx
import { InputField } from '@ds/react';

<InputField
  label="Email address"
  type="email"
  description="We’ll send the receipt here."
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Validation error
Say how to fix the problem.

```tsx
import { InputField } from '@ds/react';

<InputField
  label="Email address"
  type="email"
  required
  value={email}
  error={invalid ? 'Enter an email address like name@company.com.' : undefined}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Search with clear button
A search box with a hidden label, icon and clear button.

```tsx
import { InputField } from '@ds/react';
import { Search } from 'lucide-react';

<InputField
  label="Search products"
  hideLabel
  type="search"
  placeholder="Search products…"
  iconStart={<Search />}
  clearable
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
/>
```

Tokens: `--input-field-*` (values per theme in ai/components/input-field.json).
