# Switch

> A switch turns a single setting on or off and applies the change immediately, like a light switch. It replaces the earlier Toggle with a real, labelled switch control.

Status: stable · Category: Forms · Since 0.2.0

```tsx
import { Switch } from '@ds/react';
```

## When to use
- To turn a setting on or off that takes effect right away, e.g. "Email notifications".
- In settings lists where each row controls one independent option.

## When not to use
- When the change only applies after pressing Save or Submit. Use Checkbox.
- To choose one option from several. Use RadioGroup.
- To trigger an action such as "Refresh". Use Button.

## Label position (`labelPosition`)
- `end`: Label after the switch. Default for standalone switches.
- `start`: Label before the switch, aligned edge to edge in settings lists.

## States
- **Off**: The setting is off. (checked is false.)
- **On**: The setting is on. (checked is true.)
- **Hover**: Shows the switch responds to the pointer. (:hover.)
- **Focus**: Shows keyboard focus. (:focus-visible; adds the focus ring.)
- **Disabled**: The setting cannot be changed right now. (disabled prop.)

## Props
### Switch

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` |  | Whether the switch is on (controlled). Use with onCheckedChange. |
| `defaultChecked` | `boolean` |  | Initial state when uncontrolled. |
| `onCheckedChange` | `((checked: boolean) => void)` |  | Called with the new state when the switch is toggled. |
| `label` | `ReactNode` |  | Visible label saying what the switch controls, e.g. "Email notifications". Clicking it toggles the switch. Without a label, pass aria-label. |
| `description` | `ReactNode` |  | Extra detail under the label; announced as the switch's description. |
| `labelPosition` | `"start" \| "end"` | end | Side of the switch the label sits on. `end` (default) or `start` for settings lists. |

## Guidelines
- Do: Use a switch for settings that apply immediately. Don’t: Use a switch inside a form that is applied with a Save button. Why: People expect a switch to take effect at once; a delayed change is surprising.
- Do: Give every switch a visible label. Don’t: Rely on surrounding text without connecting it to the switch. Why: The label is the accessible name, and clicking it should toggle the switch.
- Do: Label the setting positively, e.g. "Show preview". Don’t: Use negative labels such as "Hide preview". Why: On should mean the thing is on; double negatives are hard to read.

## Content
- Label the setting, not the action: "Email notifications", not "Turn on email notifications".
- Keep labels short and in sentence case.
- Don’t put on/off state words in the label; the switch shows the state.

## Accessibility
- Role: switch (a <button role="switch"> with aria-checked).
- Tab / Shift+Tab: Moves focus to and from the switch.
- Space: Toggles the switch.
- Enter: Toggles the switch.
- `aria-checked`: Set automatically from the on/off state.
- `aria-describedby`: Points at the description when there is one.
- `aria-label`: Required when there is no visible label.
- Focus: A focus ring appears on the track when reached with the keyboard.
- WCAG 1.3.1 Info and Relationships: The label is a real <label> tied to the switch; the description is linked with aria-describedby.
- WCAG 1.4.11 Non-text Contrast: Track and thumb colors keep 3:1 against their surroundings.
- WCAG 2.1.1 Keyboard: Focusable and toggled with Space or Enter.
- WCAG 4.1.2 Name, Role, Value: Exposed as a switch with its label as the name and on/off as its value.
- State is shown by position and color, never by color alone.

## Examples
### Setting switch
A controlled switch with a label.

```tsx
import { Switch } from '@ds/react';

<Switch label="Email notifications" checked={enabled} onCheckedChange={setEnabled} />
```

### With a description
Extra detail is announced as the switch’s description.

```tsx
import { Switch } from '@ds/react';

<Switch
  label="Real-time updates"
  description="Refreshes the dashboard every 30 seconds."
  defaultChecked
/>
```

### Settings list
Labels at the start, switches aligned at the end.

```tsx
import { Switch } from '@ds/react';

<div style={{ display: 'grid', gap: 12 }}>
  <Switch label="KPI cards" labelPosition="start" defaultChecked />
  <Switch label="Data charts" labelPosition="start" defaultChecked />
</div>
```

Tokens: `--switch-*` (values per theme in ai/components/switch.json).
