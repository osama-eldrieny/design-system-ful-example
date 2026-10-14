# VerificationCodeInput

> One box per character of a one-time code sent by email or SMS. Typing moves to the next box, Backspace goes back, pasting fills every box, and the browser can autofill codes from SMS.

Status: stable · Category: Forms · Since 1.1.0

```tsx
import { VerificationCodeInput } from '@ds/react';
```

## When to use
- Two-factor sign-in and email or phone verification.
- Short fixed-length codes: 4 to 8 characters.

## When not to use
- For passwords or long codes. Use InputField.
- For codes whose length varies. Use InputField.

## Size (`size`)
- `small`: 64px boxes, for dialogs and narrow screens.
- `medium`: 80px boxes. Default.
- `large`: 96px boxes, for a full-page verification step.

## Length (`length`)
- `4`: Short PINs.
- `6`: Default; most one-time codes.

## Mode (`mode`)
- `numeric`: Digits only; opens the number keypad. Default.
- `text`: Letters and digits.

## States
- **Default**: Empty, ready. (At rest.)
- **Hover**: Pointer over a box. (:hover)
- **Focus**: The box being typed in. (:focus-visible)
- **Filled**: Characters entered. (value)
- **Error**: The code was wrong. (error prop.)
- **Disabled**: Not editable. (disabled prop.)

## Props
### VerificationCodeInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | What to enter, e.g. "Verification code". Names the group. |
| `length` | `number` | 6 | Number of characters. Default 6. |
| `value` | `string` |  | The code (controlled). |
| `defaultValue` | `string` |  | Starting code (uncontrolled). |
| `onValueChange` | `((value: string) => void)` |  | Called with the whole code on every change. |
| `onComplete` | `((value: string) => void)` |  | Called once every box is filled, e.g. to submit. |
| `size` | `"small" \| "medium" \| "large"` | medium | `small` 64px, `medium` 80px (default), `large` 96px boxes. |
| `separatorAfter` | `number` |  | Shows a dash after this many boxes, e.g. 3 for "123-456". |
| `mode` | `"numeric" \| "text"` | numeric | `numeric` (default) accepts digits and opens the number keypad; `text` accepts letters too. |
| `placeholder` | `string` | 0 | Placeholder in each empty box. Default "0". |
| `description` | `ReactNode` |  | Help text under the boxes. |
| `error` | `ReactNode` |  | Error message; marks every box invalid. |
| `disabled` | `boolean` |  |  |
| `digitLabel` | `((index: number, length: number) => string)` | (i, n) => `Character ${i + 1} of ${n}` | Names each box for screen readers. Default "Character {n} of {length}". |
| `name` | `string` |  | Form field name; the whole code is submitted in a hidden input. |

## Guidelines
- Do: Submit automatically with onComplete when the flow allows. Don’t: Make people press Verify after the last digit when nothing else is needed. Why: Fewer steps for a routine task.
- Do: Offer a way to resend the code. Don’t: Leave people stuck when the code expired. Why: Codes get lost or expire.
- Do: Use separatorAfter={3} for six-digit codes. Don’t: Split codes in groups the sender didn’t use. Why: Matching the message makes copying easier.

## Content
- Say where the code was sent: "Enter the code we sent to olivia@example.com".
- On error, say what to do next: "That code is wrong. Try again or resend it."

## Accessibility
- Role: group (fieldset with legend); each box is a textbox.
- Characters: Fill the box and move to the next.
- Backspace: Clear the box, or the previous one when empty.
- Arrow Left / Right: Move between boxes.
- Home / End: First or last box.
- `aria-label on each box`: "Character n of N"; override with digitLabel.
- `aria-invalid`: On every box when error is set.
- `aria-describedby`: Group points at the description and error.
- Focus: Each box shows the focus ring; focus moves automatically as you type.
- WCAG 1.3.1 Info and Relationships: fieldset and legend group the boxes.
- WCAG 1.4.3 Contrast (Minimum): Text meets 4.5:1 in every theme (checked in CI).
- WCAG 3.3.1 Error Identification: The error is text, linked to the group.
- Don’t time out silently; tell people when a code expired.

## Examples
### Six-digit code
Submits when complete.

```tsx
import { VerificationCodeInput } from '@ds/react';

<VerificationCodeInput label="Verification code" onComplete={verify} />
```

### With a separator
Two groups of three.

```tsx
import { VerificationCodeInput } from '@ds/react';

<VerificationCodeInput label="Code" separatorAfter={3} size="small" />
```

### Error
A wrong code.

```tsx
import { VerificationCodeInput } from '@ds/react';

<VerificationCodeInput label="Code" length={4} error="That code is wrong." />
```

Tokens: `--verification-code-input-*` (values per theme in ai/components/verification-code-input.json).
