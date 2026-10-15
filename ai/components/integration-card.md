# IntegrationCard

> An app or service that can be connected to the product: its icon, what it does, whether it is connected, and a switch to connect or disconnect.

Status: stable · Category: Patterns · Since 1.3.0

```tsx
import { IntegrationCard } from '@ds/react';
```

## When to use
- On an integrations or apps page, one card per app.
- To let people connect a service such as a calendar or chat tool.

## When not to use
- For a single setting inside an account page. Use SettingsList.
- For a plan or price. Use PricingCard.

## Connection (`connected`)
- `false`: Default. Not connected; the switch is off.
- `true`: Connected; the card gets a success border.

## States
- **Not connected**: The app is not linked. (connected is false.)
- **Connected**: The app is linked and its status shows. (connected is true.)
- **Focus**: Focus ring on the switch. (:focus-visible on the switch.)

## Props
### IntegrationCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` |  | The app or service, e.g. "Slack". |
| `description` | `ReactNode` |  | What connecting it does, in a sentence. |
| `icon` | `ReactNode` |  | The app's logo or an icon. |
| `connected` | `boolean` |  | Whether it is connected (controlled). |
| `onConnectedChange` | `((connected: boolean) => void)` |  | Called when the switch is turned on or off. |
| `actions` | `ReactNode` |  | Further actions in the footer, e.g. "Configure". |

## Guidelines
- Do: Show the connection state in words and with the switch. Don’t: Show only the switch. Why: The state should not depend on reading the switch position alone.
- Do: Explain what connecting gives access to. Don’t: Connect without saying what data is shared. Why: People should know what they are allowing before they switch it on.
- Do: Put disconnect and configure options in the footer. Don’t: Hide the disconnect option behind a menu only. Why: Leaving an integration should be as easy as joining it.

## Content
- Name the app as it is known to people, e.g. "Slack".
- Describe what connecting does, e.g. "Post updates to a channel".

## Accessibility
- Role: article, named by the app name; the switch is named "Connect {name}".
- Tab: Moves to the switch and then the actions.
- Space: Turns the switch on or off.
- `aria-label`: On the switch: "Connect {name}".
- Focus: The switch and actions show their own focus rings.
- WCAG 1.4.1 Use of Color: Status is written out as text, not only shown by colour.
- WCAG 4.1.2 Name, Role, Value: The switch states its name and on/off value.
- The app icon is decorative; the name carries the meaning.

## Examples
### Connected app
A connected app with a configure action.

```tsx
import { Button, IntegrationCard } from '@ds/react';

<IntegrationCard
  name="Slack"
  description="Post updates to a channel."
  icon={<SlackLogo />}
  connected
  onConnectedChange={setConnected}
  actions={<Button size="small" variant="secondary" appearance="outline">Configure</Button>}
/>
```

### Available app
An app that is not connected yet.

```tsx
import { IntegrationCard } from '@ds/react';

<IntegrationCard name="Google Calendar" description="Show meetings on your planner." icon={<CalendarIcon />} connected={false} onConnectedChange={connect} />
```

### In a grid
Cards side by side, each with its own switch.

```tsx
import { IntegrationCard } from '@ds/react';

<div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}>
  {apps.map((app) => <IntegrationCard key={app.name} {...app} />)}
</div>
```

Tokens: `--integration-card-*` (values per theme in ai/components/integration-card.json).
