# AppsNotifications

> A settings panel with one switch per app, to turn each app’s notifications on or off. Changes apply immediately. It is built from Card and Switch.

Status: stable · Category: Patterns · Since 0.2.0

```tsx
import { AppsNotifications } from '@ds/react';
```

## When to use
- In settings and sidebars, to turn notifications (or any per-app feature) on and off.
- When each change should apply right away, without a Save button.

## When not to use
- When changes are applied with a Save button. Use Checkbox in a form.
- For a list of the notifications themselves. Use A list of Alerts or a notification feed.

## Appearance (from Card) (`appearance`)
- `elevated`: Default; a standalone panel.
- `outlined`: Inside sidebars or other panels.
- `filled`: Grouped inside a surface.

## States
- **On / off**: Each app’s switch. (enabled or defaultEnabled)
- **Disabled**: An app’s setting can’t be changed. (disabled on the item)

## Props
### AppsNotifications

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | Notifications | Heading of the panel. Default "Notifications". |
| `titleAs` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` |  | Heading level that fits the page outline. Default h3. |
| `items` | `AppNotificationSetting[]` |  | One row per app. |
| `onEnabledChange` | `((id: string, enabled: boolean) => void)` |  | Called when a switch changes, with the app's id and its new state. |
| `appearance` | `CardAppearance` |  | `elevated` (default) lifts the card with the shadow theme, `outlined` draws a border for dense layouts, `filled` tints it for grouping inside a surface. |
| `orientation` | `CardOrientation` |  | `vertical` stacks media above the body; `horizontal` puts media beside it. |
| `href` | `string` |  | Makes the whole card a link to this URL. The CardTitle becomes the link, and its hit area covers the card, so there's one clear, accessible target. |

## Guidelines
- Do: Apply each change immediately. Don’t: Add a Save button under the switches. Why: Switches promise an instant effect; use checkboxes when changes are saved later.
- Do: Write a heading that says what is being switched. Don’t: Use a vague heading like “Apps”. Why: The heading names the panel for screen readers and says what “on” means.
- Do: Handle failures by switching back and explaining. Don’t: Leave a switch on when the change didn’t save. Why: The switch must reflect the real setting.

## Content
- Heading: what the switches control, e.g. “Email notifications”.
- Use the app’s own name and spelling.

## Accessibility
- Role: region (section named by its heading) containing a list of switches.
- Tab: Moves between switches.
- Space: Toggles the focused switch.
- `aria-labelledby on the panel`: Set automatically to the heading.
- `role="switch" + aria-checked`: From Switch; named by the app name.
- Focus: Each switch shows its focus ring.
- WCAG 4.1.2 Name, Role, Value: Real switches with the app name as label.
- WCAG 2.1.1 Keyboard: Tab and Space operate every switch.
- WCAG 1.1.1 Non-text Content: App icons are decorative (alt="") because the name is next to them.

## Examples
### Notification settings
Uncontrolled: all apps start on.

```tsx
import { AppsNotifications } from '@ds/react';

<AppsNotifications
  title="Notifications"
  items={[
    { id: 'google', name: 'Google', icon: '/icons/google.png' },
    { id: 'linkedin', name: 'LinkedIn', icon: '/icons/linkedin.png' },
    { id: 'behance', name: 'Behance', icon: '/icons/behance.png', defaultEnabled: false },
  ]}
  onEnabledChange={(id, enabled) => saveSetting(id, enabled)}
/>
```

### Controlled
Keep the settings in state.

```tsx
import { useState } from 'react';
import { AppsNotifications } from '@ds/react';

const [on, setOn] = useState({ slack: true, github: false });

<AppsNotifications
  title="Email notifications"
  items={[
    { id: 'slack', name: 'Slack', enabled: on.slack },
    { id: 'github', name: 'GitHub', enabled: on.github },
  ]}
  onEnabledChange={(id, enabled) => setOn((s) => ({ ...s, [id]: enabled }))}
/>
```

### In a sidebar
Outlined, with a heading level that fits the page.

```tsx
import { AppsNotifications } from '@ds/react';

<AppsNotifications appearance="outlined" title="Connected apps" titleAs="h2" items={apps} />
```

Tokens: `--app-notifications-*` (values per theme in ai/components/apps-notifications.json).
