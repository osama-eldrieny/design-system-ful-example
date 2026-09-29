# Toast

> A toast is a brief message about something that just happened, such as “Changes saved”, shown in a corner and dismissed automatically. It can offer one action, like Undo.

Status: stable · Category: Feedback · Since 0.4.0

```tsx
import { ToastProvider } from '@ds/react';
import { useToast } from '@ds/react';
```

## When to use
- To confirm an action finished (“Message sent”).
- To offer a quick undo after a reversible action.

## When not to use
- For errors people must fix. Use Alert next to the problem, or FormField errors.
- For a decision. Use Modal.
- For persistent status. Use Alert or Badge.

## Tone (`tone`)
- `primary`: Information. Default.
- `success`: Something succeeded.
- `warning`: Something needs attention.
- `danger`: Something failed; announced assertively.

## States
- **Shown**: Slides in; pauses on hover or focus. (toast(…))
- **Dismissed**: After duration, swipe, close or Escape. (—)

## Props
### ToastProvider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | Notifications | Name of the notifications region, announced with its shortcut. Default "Notifications". |
| `closeLabel` | `string` | Dismiss | Accessible name of each close button. Default "Dismiss". |

### useToast

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Keep it short and about what just happened. Don’t: Put instructions in a toast. Why: Toasts disappear before long text can be read.
- Do: Show errors next to their cause. Don’t: Report a form error only in a toast. Why: People need the error where they fix it.
- Do: Give actions an alternative (altText). Don’t: Make Undo available only in the toast. Why: Keyboard and screen reader users may miss the toast.

## Content
- Title: past tense, a few words (“Project deleted”).
- Action: one verb (“Undo”).

## Accessibility
- Role: status (or alert for danger) inside a labelled notifications region.
- F8: Moves focus to the notifications region.
- Escape: Dismisses the focused toast.
- Tab: Reaches the action and close buttons.
- `aria-live`: Polite; assertive for danger.
- `aria-label on close`: closeLabel (“Dismiss”).
- Focus: Not moved by showing a toast.
- WCAG 4.1.3 Status Messages: Announced without moving focus.
- WCAG 2.2.1 Timing Adjustable: Pauses on hover and focus; duration is configurable.
- WCAG 1.4.1 Use of Color: Tone also shown by an icon.

## Examples
### Set up
Once, near the root.

```tsx
import { ToastProvider } from '@ds/react';

<ToastProvider>
  <App />
</ToastProvider>
```

### Success
After saving.

```tsx
import { useToast } from '@ds/react';

const toast = useToast();
toast({ title: 'Changes saved', tone: 'success' });
```

### With Undo
A reversible action.

```tsx
import { useToast } from '@ds/react';

toast({
  title: 'Project deleted',
  action: { label: 'Undo', onClick: restore, altText: 'Restore it from Trash' },
});
```

Tokens: `--toast-*` (values per theme in ai/components/toast.json).
