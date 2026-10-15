# SettingsList

> A list of settings, each a title and optional description with a control at the end: a switch, a button or a select. Use it for account and security settings.

Status: stable · Category: Data display · Since 1.3.0

```tsx
import { SettingsList } from '@ds/react';
```

## When to use
- For account, security and preference pages with several settings.
- When each setting has one control: on/off, or one action such as "Change".

## When not to use
- For key–value details that are not editable. Use DescriptionList.
- For a single on/off setting on its own. Use Switch.
- For connecting apps. Use IntegrationCard.

## Frame (`framed`)
- `false`: Default. Rows on the page, divided by lines.
- `true`: Rows in a bordered card.

## States
- **Static**: Rows with their controls; each control has its own states. (—)

## Props
### SettingsList

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `SettingsListItem[]` |  |  |
| `framed` | `boolean` | false | Draws a border around the list, for a settings card. |

## Guidelines
- Do: Give every row one control. Don’t: Put several controls in one row. Why: One control per row keeps the outcome of each setting clear.
- Do: Use a switch for settings that apply at once. Don’t: Use a switch for settings that need a Save button. Why: A switch implies the change is already saved.
- Do: Describe the current state under the title. Don’t: Hide the state until the control is opened. Why: People should see what is set before they change it.

## Content
- Title each setting with the thing it controls, e.g. "Two-factor authentication".
- Show the current state in the description, e.g. "Last changed 3 months ago".

## Accessibility
- Role: list of rows; each control keeps its own role and name.
- Tab: Moves through the controls in order.
- `aria-label`: On switches without a visible name in the row.
- Focus: Each control shows its own focus ring.
- WCAG 1.3.1 Info and Relationships: Rows are list items; the title is read before its control.
- WCAG 2.4.6 Headings and Labels: Titles name each setting clearly.
- Give each switch a name that matches its row title.

## Examples
### Security settings
A switch, a button and a description.

```tsx
import { Button, SettingsList, Switch } from '@ds/react';

<SettingsList
  items={[
    { id: 'password', title: 'Password', description: 'Last changed 3 months ago.', control: <Button size="small" variant="secondary" appearance="outline">Change</Button> },
    { id: '2fa', title: 'Two-factor authentication', control: <Switch aria-label="Two-factor authentication" defaultChecked /> },
  ]}
/>
```

### In a card
Framed as a settings card.

```tsx
import { SettingsList } from '@ds/react';

<SettingsList framed items={preferences} />
```

### Notification preferences
A list of switches.

```tsx
import { SettingsList, Switch } from '@ds/react';

<SettingsList items={channels.map((c) => ({ id: c.id, title: c.title, control: <Switch aria-label={c.title} checked={c.on} onCheckedChange={(v) => set(c.id, v)} /> }))} />
```

Tokens: `--settings-list-*` (values per theme in ai/components/settings-list.json).
