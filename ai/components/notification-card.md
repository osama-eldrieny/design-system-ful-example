# NotificationCard

> A single notice about something that happened, such as a reply or a system alert: who it is from or an icon, what it says, when, and the actions to take. Unread notices are tinted and marked with a dot.

Status: stable · Category: Feedback · Since 1.3.0

```tsx
import { NotificationCard } from '@ds/react';
```

## When to use
- In a notification list or feed, one card per event.
- For a notice with a clear next step, e.g. "Reply" or "View".

## When not to use
- For a short confirmation after an action. Use Toast.
- For a message in an ongoing conversation. Use MessageThread.
- For a warning that stays on the page. Use Alert.

## Read state (`unread`)
- `false`: Default. Already seen.
- `true`: New: tinted, with a dot at the start.

## States
- **Read**: Seen; plain background. (unread is false.)
- **Unread**: New; tinted with a dot. (unread is true.)
- **Focus**: Focus rings on its actions. (:focus-visible on a control.)

## Props
### NotificationCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | The notice in a few words, e.g. "Lana replied to your comment". |
| `description` | `ReactNode` |  | Optional second line with the detail. |
| `time` | `ReactNode` |  | When it happened, e.g. "2 mins ago". |
| `avatar` | `{ name: string; src?: string; status?: "online" \| "offline"; } \| undefined` |  | Who it is from; shows their avatar. |
| `icon` | `ReactNode` |  | An icon instead of an avatar, e.g. for system notices. |
| `iconTone` | `BadgeColor` | primary | Colour of the icon tile. Default primary. |
| `actions` | `ReactNode` |  | Buttons such as Reply and Dismiss, shown under the text. |
| `onDismiss` | `(() => void)` |  | Shows a close button; called when it is pressed. |
| `dismissLabel` | `string` | Dismiss notification | Words for the close button. Default "Dismiss notification". |
| `unread` | `boolean` | false | Marks the notice as new: tinted and with a dot. |

## Guidelines
- Do: Put the most important action first, as the primary button. Don’t: Offer more than two actions. Why: One clear next step is easier to act on than a row of choices.
- Do: Mark notices as unread until they are seen. Don’t: Tint every notice the same. Why: The mark tells people what is new since their last visit.
- Do: Use the avatar when a person is involved. Don’t: Use the same generic icon for every notice. Why: A face makes a notice from a person easy to recognise.

## Content
- Write the title as what happened: "Lana replied to your comment".
- Show the time in a short form, e.g. "2 min ago".

## Accessibility
- Role: article, named by its title.
- Tab: Moves through the actions and the close button.
- `aria-labelledby`: Names the card by its title.
- `aria-label`: On the close button, from dismissLabel.
- Focus: Actions and the close button show their own focus rings.
- WCAG 1.1.1 Non-text Content: Avatars are decorative beside a named title; icons are decorative.
- WCAG 1.4.3 Contrast: Text passes AA on both the read and unread backgrounds.
- WCAG 1.4.1 Use of Color: Unread state is also shown by the dot, not only by tint.
- The unread dot is decorative; screen readers hear the title and time.

## Examples
### Reply
A person’s reply with two actions.

```tsx
import { Button, NotificationCard } from '@ds/react';

<NotificationCard
  unread
  avatar={{ name: 'Lana Steiner', status: 'online' }}
  title="Lana replied to your comment"
  description="I’ve finished adding my notes!"
  time="2 mins ago"
  actions={<><Button size="small" variant="secondary" appearance="outline">Dismiss</Button><Button size="small">Reply</Button></>}
/>
```

### System notice
An icon instead of an avatar, with a dismiss button.

```tsx
import { NotificationCard } from '@ds/react';
import { ShieldCheck } from 'lucide-react';

<NotificationCard icon={<ShieldCheck />} iconTone="success" title="Two-factor enabled" onDismiss={dismiss} />
```

### In a list
Cards stacked in a feed; the list is a plain list of articles.

```tsx
import { NotificationCard } from '@ds/react';

<div role="feed" aria-label="Notifications">
  {items.map((n) => <NotificationCard key={n.id} {...n} />)}
</div>
```

Tokens: `--notification-card-*` (values per theme in ai/components/notification-card.json).
