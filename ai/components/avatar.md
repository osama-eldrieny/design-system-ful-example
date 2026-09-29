# Avatar

> An avatar represents a person or team with their photo, or their initials when there’s no photo. It can show presence, and AvatarGroup stacks several with a count of the rest.

Status: stable · Category: Data display · Since 0.2.0

```tsx
import { Avatar } from '@ds/react';
import { AvatarGroup } from '@ds/react';
```

## When to use
- Next to a person’s name in lists, comments, cards and headers.
- To show who is involved in something, e.g. meeting attendees (AvatarGroup).
- To show someone’s presence (online, away, busy) at a glance.

## When not to use
- For product or brand images. Use An image or Logo.
- As the only way to identify a person where names matter. Use Avatar with the name as text.

## Size (`size`)
- `small`: 24px. Dense lists, table rows, stacked groups.
- `medium`: 38px. Default for lists and cards.
- `large`: 56px. Comments, contact cards.
- `xlarge`: 80px. Profile headers.

## Status (`status`)
- `online`: Available now.
- `away`: Idle or temporarily away.
- `busy`: Do not disturb.
- `offline`: Not available.

## States
- **Image**: The photo is shown. (src loads.)
- **Initials**: No photo available. (No src, or the image fails to load.)
- **Icon**: No photo and no initials. (The name has no letters.)

## Props
### Avatar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` |  | The person's (or team's) name. Used as the accessible name and for the initials fallback. |
| `src` | `string` |  | Photo URL. If it's missing or fails to load, initials are shown instead. |
| `size` | `AvatarSize` | small | `small` 24px for dense lists, `medium` 38px, `large` 56px, `xlarge` 80px for profiles. |
| `status` | `AvatarStatus` |  | Presence dot. Announced after the name, e.g. "Sarah Chen, Online". |
| `statusLabel` | `string` |  | Replaces the default status wording, e.g. for translation. |
| `decorative` | `boolean` | false | Hides the avatar from screen readers. Use when the name is already shown as text right next to it, so it isn't read twice. |

### AvatarGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | What the group represents, e.g. "Meeting attendees". Announced before the avatars. |
| `max` | `number` |  | Show at most this many avatars, then a "+N" count. |
| `size` | `AvatarSize` | small | Size for every avatar in the group. |
| `children` | `ReactNode` |  | Avatar elements. |

## Guidelines
- Do: Show the person’s name next to the avatar where it matters. Don’t: Rely on the photo alone to identify someone. Why: Faces are hard to tell apart at small sizes, and missing photos fall back to initials.
- Do: Mark the avatar decorative when the name is right next to it. Don’t: Let screen readers read the same name twice. Why: Repetition makes lists slow to navigate.
- Do: Limit groups with max and show the count. Don’t: Stack a dozen tiny avatars. Why: A few faces plus “+8” is easier to read than a crowded row.

## Content
- Pass the full name; initials are derived from the first two words.
- Label groups with what they represent: “Meeting attendees”, “Project members”.

## Accessibility
- Role: img with an aria-label (the name and status), or hidden when decorative.
- —: Not interactive. Wrap it in a link or button if it should do something.
- `role="img" + aria-label`: Default: “Sarah Chen, Online”.
- `aria-hidden`: decorative prop, when the name is shown as text.
- `role="group" + aria-label`: AvatarGroup, from its label.
- Focus: Avatars aren’t focusable on their own.
- WCAG 1.1.1 Non-text Content: Every avatar has a text alternative (the name) or is marked decorative.
- WCAG 1.4.1 Use of Color: Status is also announced in words, not only shown by dot color.
- WCAG 1.4.3 Contrast (Minimum): Initials pass 4.5:1 on the fallback background.
- Status colors are not the only cue: show the status in words where it matters.

## Examples
### Avatar with a photo
Falls back to initials if the photo is missing.

```tsx
import { Avatar } from '@ds/react';

<Avatar name="Sarah Chen" src="/avatars/sarah.png" status="online" />
```

### Next to a name
Hide it from screen readers when the name is shown as text.

```tsx
import { Avatar } from '@ds/react';

<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Avatar name="Sarah Chen" src="/avatars/sarah.png" size="small" decorative />
  <span>Sarah Chen</span>
</div>
```

### Group with a count
Show three, then +N.

```tsx
import { Avatar, AvatarGroup } from '@ds/react';

<AvatarGroup label="Meeting attendees" max={3}>
  {people.map((p) => <Avatar key={p.id} name={p.name} src={p.photo} />)}
</AvatarGroup>
```

Tokens: `--avatar-*` (values per theme in ai/components/avatar.json).
