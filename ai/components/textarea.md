# Textarea

> A multi-line text field for longer answers such as messages, comments or descriptions. It has a label, help text, error and success messages, optional auto-resize and a character counter.

Status: stable · Category: Forms · Since 0.3.0

```tsx
import { Textarea } from '@ds/react';
```

## When to use
- For answers longer than one line: messages, feedback, descriptions, addresses.

## When not to use
- For short, single-line answers. Use InputField.
- For formatted text with bold, links or lists. Use A rich-text editor.

## Size (`size`)
- `small`: Dense forms and tables.
- `medium`: Default.
- `large`: Prominent, e.g. a feedback form.

## Height (`autoResize`)
- `false`: Fixed at rows lines; people can drag it taller. Default.
- `true`: Grows with the text up to maxRows, then scrolls.

## States
- **Default**: Empty or filled. (—)
- **Hover**: Darker border. (:hover)
- **Focus**: Focus ring. (:focus-visible)
- **Error**: Red border and message; aria-invalid. (error)
- **Success**: Green border and message. (success)
- **Read-only**: Tinted; can be selected, not edited. (readOnly)
- **Disabled**: Dimmed; not focusable. (disabled)

## Props
### Textarea

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | What to write, e.g. "Message". Always required: it names the field. |
| `hideLabel` | `boolean` |  | Hides the label visually but keeps it for screen readers. |
| `description` | `ReactNode` |  | Help text under the field, e.g. what to include. |
| `error` | `ReactNode` |  | Error message. Marks the field invalid. |
| `success` | `ReactNode` |  | Confirmation message. |
| `optional` | `boolean` |  | Marks the field optional with text after the label. |
| `size` | `TextareaSize` | medium | `small` for dense UI, `medium` by default, `large` for prominent forms. |
| `autoResize` | `boolean` | false | Grows with its content from `rows` lines up to `maxRows`, instead of scrolling. |
| `maxRows` | `number` |  | With autoResize, the most lines before it scrolls. |
| `showCount` | `boolean` | false | Shows a character counter. Needs maxLength. |
| `countLabel` | `((count: number, max: number) => string)` | (count: number, max: number) => `${count} / ${max}` | Counter text, for translation. Default "12 / 200". |
| `remainingLabel` | `((remaining: number) => string)` | (remaining: number) =>
  `${remaining} ${remaining === 1 ? 'character' : 'characters'} left` | What screen readers hear after typing pauses. Default "188 characters left". |

## Guidelines
- Do: Size the field for the expected answer with rows. Don’t: Use a two-line box for a long description. Why: The size of the field hints how much to write.
- Do: Show a counter when there is a limit. Don’t: Cut text silently at a hidden limit. Why: People need to know how much room is left.
- Do: Keep the label visible. Don’t: Rely on placeholder text to explain the field. Why: Placeholders disappear while typing and often fail contrast.

## Content
- Label: what to write (“Message”), not an instruction.
- Description: what to include or leave out, e.g. “Don’t include passwords”.
- Set maxLength only when there is a real limit, and say it in the description if it’s short.

## Accessibility
- Role: textbox (multi-line), labelled by FormField.
- Tab: Moves into and out of the field.
- Enter: Adds a new line (it doesn’t submit the form).
- `aria-describedby`: Help text, message and counter.
- `aria-invalid`: With an error.
- `role="status"`: Announces the characters left after typing pauses.
- Focus: Focus ring around the field.
- WCAG 3.3.2 Labels or Instructions: Always labelled; limits shown by the counter.
- WCAG 4.1.3 Status Messages: The remaining count is announced without moving focus.
- WCAG 1.4.10 Reflow: Full width of its container; no fixed width.

## Examples
### Message
Label and help text.

```tsx
import { Textarea } from '@ds/react';

<Textarea label="Message" description="Tell us how we can help." rows={4} />
```

### With a limit
Counter and maxLength.

```tsx
import { Textarea } from '@ds/react';

<Textarea label="Bio" maxLength={160} showCount />
```

### Auto-resize
Grows from 2 to 8 lines.

```tsx
import { Textarea } from '@ds/react';

<Textarea label="Comment" rows={2} autoResize maxRows={8} />
```

Tokens: `--textarea-*` (values per theme in ai/components/textarea.json).
