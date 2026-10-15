# MessageThread

> A conversation shown as chat bubbles: other people’s messages at the start with their avatar and name, yours at the end in the accent color, with an optional typing indicator.

Status: stable · Category: Data display · Since 1.2.0

```tsx
import { MessageThread } from '@ds/react';
import { ThreadMessage } from '@ds/react';
```

## When to use
- For direct messages, support chats and comment conversations.
- To show an AI assistant conversation.

## When not to use
- For a timeline of events, not messages. Use ActivityFeed.
- For a one-off notice. Use Toast.

## Density (`density`)
- `comfortable`: Default. Avatars beside other people’s messages.
- `compact`: No avatars, wider bubbles, for narrow side panels.

## States
- **Incoming**: Someone else’s message. (own is false.)
- **Outgoing**: Your message. (own is true.)
- **Typing**: Someone is writing a reply. (typing prop.)

## Props
### MessageThread

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the conversation, e.g. "Conversation with Lana". |
| `messages` | `ThreadMessage[]` |  |  |
| `typing` | `ThreadAuthor` |  | Shows a "… is typing" bubble for this person. |
| `typingLabel` | `((name: string) => string)` | (name) => `${name} is typing` | Words for the typing bubble. Default "{name} is typing". |
| `density` | `MessageThreadDensity` | comfortable | `comfortable` (default) shows avatars and names; `compact` hides avatars for narrow panels. |

### ThreadMessage

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Put the reply box directly under the thread. Don’t: Separate the composer from the conversation. Why: People read the last message and answer right below it.
- Do: Give status only to the latest own message. Don’t: Show "Read" under every message. Why: Repeating it adds noise without new information.
- Do: Use compact density in narrow panels. Don’t: Squeeze avatars into a 280px drawer. Why: Bubbles need the width more than the avatars.

## Content
- Show times in the reader’s own format, e.g. "9:41" or "Yesterday".
- Show delivery status only under your last message.
- Name the thread after the other people, e.g. "Conversation with Lana".

## Accessibility
- Role: log, named by label; the typing indicator is a status.
- Tab: Moves through links and buttons inside messages.
- `role="log"`: Always; new messages are announced politely.
- `aria-label`: From label, e.g. "Conversation with Lana".
- Focus: The thread itself takes no focus; interactive content inside messages does.
- WCAG 1.3.1 Info and Relationships: Authors are named in text, not shown only by side or color.
- WCAG 1.4.3 Contrast: Bubble text meets AA on both bubble colors in every theme.
- WCAG 4.1.3 Status Messages: New messages and typing are announced without moving focus.
- Avatars are decorative because the author name is in the text.

## Examples
### Direct message
Two people with times and a read status.

```tsx
import { MessageThread } from '@ds/react';

<MessageThread
  label="Conversation with Lana"
  messages={[
    { id: '1', author: { name: 'Lana Steiner' }, content: 'Is the report ready?', time: '9:40' },
    { id: '2', author: { name: 'You' }, own: true, content: 'Sending it now.', time: '9:41', status: 'Read' },
  ]}
/>
```

### Typing
Shows that the other person is writing.

```tsx
import { MessageThread } from '@ds/react';

<MessageThread label="Support chat" messages={messages} typing={{ name: 'Support' }} />
```

### In a side panel
Compact density without avatars.

```tsx
import { MessageThread } from '@ds/react';

<MessageThread label="Comments" messages={messages} density="compact" />
```

Tokens: `--message-thread-*` (values per theme in ai/components/message-thread.json).
