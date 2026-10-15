# PromptInput

> A multi-line prompt box for chat and AI tools: text on top, tools such as Attach and voice on the left, a model picker and a send button on the right. Enter sends.

Status: stable · Category: Forms · Since 1.3.0

```tsx
import { PromptInput } from '@ds/react';
```

## When to use
- For an AI assistant or chat composer where people write a message or prompt.
- For any free-text input that is sent with a button, such as a comment box with attachments.

## When not to use
- For a single line, such as a search. Use SearchField.
- For a long document or form field with a label above. Use Textarea.

## Size (`size`)
- `medium`: Default. The main composer.
- `small`: Side panels and compact layouts.

## States
- **Empty**: No text; the send button is disabled. (Empty or only spaces.)
- **Ready**: Text present; the send button is enabled. (Text entered.)
- **Focus**: The border shows focus around the whole box. (:focus-within.)
- **Busy**: A reply is being produced; the send button shows a spinner and sending waits. (busy prop.)
- **Disabled**: Nothing can be typed or sent. (disabled prop.)

## Props
### PromptInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the prompt box for screen readers, e.g. "Message the assistant". |
| `placeholder` | `string` |  |  |
| `value` | `string` |  | The text (controlled). |
| `defaultValue` | `string` |  |  |
| `onValueChange` | `((value: string) => void)` |  |  |
| `onSubmit` | `((value: string) => void)` |  | Called with the text when the prompt is sent (Enter, or the send button). |
| `tools` | `ReactNode` |  | Controls at the start of the bottom row, e.g. Attach and voice input. |
| `actions` | `ReactNode` |  | Controls at the end, before the send button, e.g. a model picker. |
| `submitLabel` | `string` | Send | Words for the send button. Default "Send". |
| `busy` | `boolean` | false | Shows a busy state on the send button and stops sending, e.g. while a reply is generated. |
| `size` | `PromptInputSize` | medium | `small` for side panels, `medium` (default) for the main composer. |
| `rows` | `number` | 3 | Visible lines before the box scrolls. Default 3. |
| `disabled` | `boolean` | false |  |

## Guidelines
- Do: Keep tools and the send button on one bottom row. Don’t: Scatter controls around the text. Why: One row keeps the composer predictable, as people expect in chat tools.
- Do: Disable send while the field is empty. Don’t: Let people send empty messages and show an error. Why: Disabling prevents the mistake before it happens.
- Do: Let Enter send and Shift+Enter add a line. Don’t: Make Enter add a line and require a click to send. Why: Keyboard users expect Enter to send in chat composers.

## Content
- Use a placeholder that shows what to type, e.g. "Ask me anything…".
- Name the box with label so screen readers announce its purpose.

## Accessibility
- Role: form with a labelled multi-line text field.
- Enter: Sends the prompt when it has text.
- Shift+Enter: Starts a new line.
- Tab: Moves through the tools, actions and the send button.
- `label (for)`: The text field is named by label.
- `aria-label`: Set on the send button from submitLabel.
- Focus: The composer border shows focus; controls show their own focus rings.
- WCAG 1.3.1 Info and Relationships: The field is labelled by a real label element.
- WCAG 2.1.1 Keyboard: Sending works with Enter, and every control is reachable with Tab.
- WCAG 3.3.2 Labels or Instructions: The placeholder supplements the label; it does not replace it.
- Disabled sending is announced by the button’s disabled state.

## Examples
### Assistant prompt
The composer with Attach and a send button.

```tsx
import { PromptInput, Button } from '@ds/react';

<PromptInput
  label="Message the assistant"
  placeholder="Ask me anything…"
  tools={<Button size="small" variant="secondary" appearance="outline">Attach</Button>}
  onSubmit={(text) => send(text)}
/>
```

### With a model picker
A model picker in the actions row.

```tsx
import { PromptInput } from '@ds/react';

<PromptInput label="Message" actions={<ModelPicker value={model} onValueChange={setModel} />} />
```

### In a side panel
The small size for narrow panels.

```tsx
import { PromptInput } from '@ds/react';

<PromptInput label="Reply" size="small" rows={2} onSubmit={reply} />
```

Tokens: `--prompt-input-*` (values per theme in ai/components/prompt-input.json).
