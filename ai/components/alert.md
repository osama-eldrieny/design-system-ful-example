# Alert

> An alert shows a message about the page or the result of an action: information, success, a warning or an error. It stays in place until the situation changes or people dismiss it.

Status: stable · Category: Feedback · Since 0.2.0

```tsx
import { Alert } from '@ds/react';
```

## When to use
- To explain the state of a page or section, e.g. "Your trial ends in 3 days".
- To report the result of an action that people need to notice, e.g. a failed payment.
- To show a form-level error summary above the fields.

## When not to use
- For brief confirmations that don’t need to stay on screen. Use Toast.
- For an error on a single field. Use The field’s error message.
- For decisions people must make before continuing. Use Dialog.

## Variant (`variant`)
- `primary`: Neutral information, e.g. a feature announcement or status.
- `success`: An action completed, e.g. "Payment received".
- `warning`: Something needs attention soon but nothing failed yet.
- `danger`: Something failed or is blocked and needs action.

## Appearance (`appearance`)
- `subtle`: Tinted background. Default for most messages.
- `solid`: Filled with the variant color. For the one message that must not be missed.
- `outline`: Surface background with a colored border, for busy or tinted areas.

## States
- **Shown**: The message applies. (Rendered.)
- **Dismiss hover/focus**: The dismiss button responds to the pointer and keyboard. (:hover / :focus-visible on the button.)

## Props
### Alert

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `AlertVariant` | primary | What kind of message it is. `primary` for information, `success` for a completed action, `warning` for something that needs attention, `danger` for errors and failures. |
| `appearance` | `AlertAppearance` | subtle | Visual weight. `subtle` (default) for most messages, `solid` for the most important one on the page, `outline` on busy or tinted backgrounds. |
| `title` | `ReactNode` |  | Short summary of the message. |
| `children` | `ReactNode` |  | Longer explanation under the title. |
| `icon` | `ReactNode` |  | Replaces the variant's default icon. Pass `null` for no icon. |
| `actions` | `ReactNode` |  | Buttons or links related to the message, e.g. "Retry". |
| `onDismiss` | `(() => void)` |  | Shows a dismiss button that calls this. |
| `dismissLabel` | `string` | Dismiss | Accessible name of the dismiss button. Default "Dismiss". |

## Guidelines
- Do: Match the variant to what happened. Don’t: Use danger for a neutral announcement to get attention. Why: Colors carry meaning; misusing them trains people to ignore real problems.
- Do: Say how to fix the problem. Don’t: Only state that something went wrong. Why: A message without a next step leaves people stuck.
- Do: Show one alert per situation, near what it’s about. Don’t: Stack several alerts at the top of the page. Why: Many alerts compete for attention and get skipped.

## Content
- Lead with what happened, then what to do: "Payment failed. Update your card to keep your plan."
- Keep titles to one sentence; put detail in the description.
- Avoid blame and jargon; don’t show raw error codes as the main message.

## Accessibility
- Role: alert (danger, warning) or status (primary, success).
- Tab: Reaches actions and the dismiss button in order.
- `role="alert"`: Danger and warning: announced immediately.
- `role="status"`: Primary and success: announced politely.
- `aria-label on dismiss`: From dismissLabel (default "Dismiss").
- `aria-hidden on the icon`: The icon is decorative; the text carries the meaning.
- Focus: The dismiss button and any actions show the focus ring; the alert itself isn’t focusable.
- WCAG 1.4.1 Use of Color: Every variant has its own icon; warning also has a dashed border.
- WCAG 1.4.3 Contrast (Minimum): Title and description pass 4.5:1 in every appearance and theme.
- WCAG 4.1.3 Status Messages: Alerts are announced without moving focus.
- Only render alerts that change dynamically with role="alert"; a page full of alerts on load is noisy for screen readers.

## Examples
### Information
A subtle primary alert with a description.

```tsx
import { Alert } from '@ds/react';

<Alert title="Real-time data enabled.">Updates every 30 seconds.</Alert>
```

### Error with an action
Say what failed and offer the fix.

```tsx
import { Alert, Button } from '@ds/react';

<Alert
  variant="danger"
  title="Payment failed."
  actions={<Button size="small" variant="danger">Update card</Button>}
>
  Your card was declined. Update it to keep your plan.
</Alert>
```

### Dismissible
Remove the alert when people dismiss it.

```tsx
import { Alert } from '@ds/react';

{visible && (
  <Alert variant="success" title="Profile updated." onDismiss={() => setVisible(false)} />
)}
```

Tokens: `--alerts-*` (values per theme in ai/components/alert.json).
