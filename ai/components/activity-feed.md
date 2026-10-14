# ActivityFeed

> A list of recent events, newest first: who did what and when, with an avatar or icon, optional content such as a comment or file, and an unread dot. As a timeline, a divided list or plain.

Status: stable · Category: Data display · Since 1.1.0

```tsx
import { ActivityFeed } from '@ds/react';
```

## When to use
- Recent activity on a dashboard or a record’s detail page.
- Notification lists and audit trails.

## When not to use
- For steps of a process. Use Stepper.
- For data people sort and filter. Use Table.

## Appearance (`appearance`)
- `connected`: A timeline line between markers. Default.
- `divided`: A line between items, for notification lists.
- `plain`: Neither, for compact cards.

## States
- **Read**: Seen. (Default.)
- **Unread**: New since the last visit. (item.unread)

## Props
### ActivityFeed

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `ActivityFeedItem[]` |  |  |
| `appearance` | `"connected" \| "divided" \| "plain"` | connected | `connected` (default) a line joins the markers like a timeline, `divided` lines between items, `plain` neither. |
| `unreadLabel` | `string` | Unread | Word announced for unread items. Default "Unread". |

## Guidelines
- Do: Bold names and objects with <strong>. Don’t: Bold the whole sentence. Why: People scan for who and what.
- Do: Show the most recent 5–10 events with a link to the rest. Don’t: Render hundreds of events on a dashboard. Why: Feeds are for recent context, not history.
- Do: Use an icon for system events. Don’t: Invent avatars for automated actions. Why: An avatar implies a person did it.

## Content
- Lead with the actor in bold, then the action: "Olivia Rhye uploaded 2 files".
- Use relative times for recent events ("2 hours ago") and dates for older ones.

## Accessibility
- Role: Ordered list (ol) of list items.
- Tab: Moves to links and buttons inside items.
- `Hidden "Unread:" prefix`: On unread items; translate with unreadLabel.
- `aria-hidden on avatars and icons`: The title names the actor.
- Focus: Only interactive content inside items is focusable.
- WCAG 1.3.1 Info and Relationships: A real ordered list.
- WCAG 1.4.1 Use of Color: Unread is also announced in words.
- Give the list an aria-label when there are several feeds on a page.

## Examples
### Recent activity
Avatars, times and a comment.

```tsx
import { ActivityFeed } from '@ds/react';

<ActivityFeed
  aria-label="Recent activity"
  items={[{ id: 1, avatar: { name: 'Olivia Rhye' }, title: <><strong>Olivia Rhye</strong> commented</>, time: '2 min ago', content: 'Looks great!' }]}
/>
```

### System event
An icon instead of an avatar.

```tsx
import { ActivityFeed } from '@ds/react';
import { Upload } from 'lucide-react';

<ActivityFeed items={[{ id: 1, icon: <Upload />, title: 'Export finished', time: 'Mon' }]} />
```

### Notifications
Divided, with unread items.

```tsx
import { ActivityFeed } from '@ds/react';

<ActivityFeed appearance="divided" items={notifications} />
```

Tokens: `--activity-feed-*` (values per theme in ai/components/activity-feed.json).
