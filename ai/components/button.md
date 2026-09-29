# Button

> A button triggers an action in place: saving a form, opening a dialog, deleting an item. Variants signal what kind of action it is, appearances set how much attention it draws, and sizes fit it to the density of the surrounding UI. IconButton is the icon-only form for compact, well-known actions.

Status: stable · Category: Actions · Since 0.1.0

```tsx
import { Button } from '@ds/react';
import { IconButton } from '@ds/react';
```

## When to use
- To trigger an action on the current page: submit, save, confirm, open, delete.
- To let people commit to a decision in a dialog or form.
- IconButton: for compact, widely recognized actions (close, edit, more) in toolbars, cards and table rows.

## When not to use
- To navigate to another page or URL. Use Link.
- To switch a setting on or off. Use Switch.
- To pick one option from a small set of views. Use Tabs or ButtonGroup.
- For an icon whose meaning is not obvious without text. Use Button with iconStart and a label.

## Variant (`variant`)
- `primary`: The main action on a screen or in a dialog. Use one per view.
- `secondary`: Supporting actions next to a primary one, e.g. Cancel beside Save.
- `success`: Confirms a positive, completing action, e.g. Approve or Publish.
- `danger`: Destructive or irreversible actions, e.g. Delete account.
- `warning`: Actions that need caution but are not destructive, e.g. Override.

## Appearance (`appearance`)
- `filled`: Highest emphasis. Solid fill in the variant color.
- `outline`: Medium emphasis. Variant-colored outline and text, tinted on hover.
- `ghost`: Low emphasis for toolbars and dense UI. No outline until hovered.
- `text`: Lowest emphasis, link-like. Underlined text for inline actions.

## Size (`size`)
- `small`: Dense UI: tables, toolbars, cards.
- `medium`: Default for forms and dialogs.
- `large`: Prominent calls to action, e.g. on a landing page hero.

## States
- **Default**: Ready to use. (At rest.)
- **Hover**: Shows the button responds to the pointer. (Pointer over the button (:hover).)
- **Focus**: Shows where keyboard focus is. (Reached with Tab (:focus-visible); adds the focus ring.)
- **Pressed**: Confirms the press. (While pressed with pointer or keyboard (:active).)
- **Disabled**: The action is not available right now. (disabled prop.)
- **Loading**: The action is running; clicks are ignored until it finishes. (loading prop.)

## Props
### Button

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `ButtonVariant` | primary | What kind of action this is. `primary` for the main action on a screen, `secondary` for supporting actions, `success` to confirm a positive outcome, `danger` for destructive actions, `warning` for actions that need caution. |
| `appearance` | `ButtonAppearance` | filled | Visual weight. `filled` for the most important action, `outline` for secondary emphasis, `ghost` for low emphasis in toolbars and dense UI, `text` for inline, link-like actions. |
| `size` | `ButtonSize` | medium | `small` for dense UI, `medium` by default, `large` for prominent calls to action. |
| `iconStart` | `ReactNode` |  | Icon before the label (after it in right-to-left languages). Hidden from screen readers. |
| `iconEnd` | `ReactNode` |  | Icon after the label (before it in right-to-left languages). Hidden from screen readers. |
| `loading` | `boolean` | false | Shows a spinner and ignores clicks while an action runs. The button stays focusable and is announced as busy. |
| `fullWidth` | `boolean` | false | Stretches the button to the full width of its container. |
| `children` | `ReactNode` |  | Button label. |

### IconButton

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` |  | The icon to show. |
| `label` | `string` |  | What the button does, e.g. "Delete message". Required: it is the accessible name screen readers announce and the tooltip sighted users see, since there is no visible text. |
| `variant` | `ButtonVariant` |  | What kind of action this is. `primary` for the main action on a screen, `secondary` for supporting actions, `success` to confirm a positive outcome, `danger` for destructive actions, `warning` for actions that need caution. |
| `appearance` | `ButtonAppearance` |  | Visual weight. `filled` for the most important action, `outline` for secondary emphasis, `ghost` for low emphasis in toolbars and dense UI, `text` for inline, link-like actions. |
| `size` | `ButtonSize` |  | `small` for dense UI, `medium` by default, `large` for prominent calls to action. |
| `loading` | `boolean` |  | Shows a spinner and ignores clicks while an action runs. The button stays focusable and is announced as busy. |

## Guidelines
- Do: Use one filled primary button per view for the main action. Don’t: Place several filled primary buttons side by side. Why: Competing primary actions make it unclear what to do next.
- Do: Pair a primary action with secondary or outline buttons for alternatives. Don’t: Style Cancel as a filled primary button. Why: Visual weight should follow importance; the safe path should not look like the main action.
- Do: Use the danger variant for destructive actions and confirm them in a dialog. Don’t: Use danger just to make a button stand out. Why: Red signals risk; overusing it teaches people to ignore it.
- Do: Give every IconButton a label that says what it does. Don’t: Rely on an unfamiliar icon alone. Why: Screen readers announce the label, and sighted users see it as a tooltip.
- Do: Use a Link for navigation to another page. Don’t: Use a Button to change the URL. Why: Links and buttons behave differently for keyboard, screen readers and "open in new tab".

## Content
- Start with a verb that says what happens: "Save changes", "Delete file", "Send invite".
- Keep labels to one to three words; use sentence case.
- Be specific: "Publish post" beats "OK" or "Submit".
- Match the words people saw earlier in the flow, e.g. "Delete" in the button of a "Delete project?" dialog.

## Accessibility
- Role: button (native <button> element).
- Tab / Shift+Tab: Moves focus to and from the button.
- Enter: Activates the button.
- Space: Activates the button.
- `aria-busy="true"`: Set automatically while loading.
- `aria-disabled="true"`: Set automatically while loading, so the button stays focusable.
- `aria-label`: Set automatically on IconButton from its label prop.
- `aria-hidden on icons`: Icons are decorative; the label carries the meaning.
- Focus: A visible focus ring (brand accent, at least 3:1 against the background) appears when the button is reached with the keyboard. Disabled buttons are skipped by Tab; loading buttons keep focus.
- WCAG 1.4.3 Contrast (Minimum): Label text meets 4.5:1 in every variant, appearance, state, brand and mode (checked in CI).
- WCAG 1.4.11 Non-text Contrast: Focus ring and outline strokes meet 3:1.
- WCAG 2.1.1 Keyboard: Native button: reachable with Tab, activated with Enter and Space.
- WCAG 2.4.7 Focus Visible: Focus ring on :focus-visible.
- WCAG 2.5.8 Target Size (Minimum): Every size is at least 24×24 px.
- WCAG 4.1.2 Name, Role, Value: Label or aria-label names the button; busy and disabled states are exposed.
- Do not put interactive elements inside a button.
- If a button opens a menu or dialog, the menu/dialog component sets aria-haspopup and aria-expanded.

## Examples
### Primary action
The default button: filled, primary, medium.

```tsx
import { Button } from '@ds/react';

<Button onClick={save}>Save changes</Button>
```

### Dialog actions
A destructive primary action with a secondary way out.

```tsx
import { Button } from '@ds/react';

<div style={{ display: 'flex', gap: 8 }}>
  <Button variant="secondary" appearance="outline" onClick={close}>Cancel</Button>
  <Button variant="danger" onClick={remove}>Delete project</Button>
</div>
```

### With an icon
Icons support the label; they are hidden from screen readers.

```tsx
import { Button } from '@ds/react';
import { Download } from 'lucide-react';

<Button appearance="outline" iconStart={<Download />}>Download report</Button>
```

### Loading
While saving, the button shows a spinner and ignores clicks.

```tsx
import { Button } from '@ds/react';

<Button loading={isSaving} onClick={save}>Save changes</Button>
```

### Icon button
Icon-only; the label is its accessible name and tooltip.

```tsx
import { IconButton } from '@ds/react';
import { X } from 'lucide-react';

<IconButton icon={<X />} label="Close dialog" variant="secondary" appearance="ghost" />
```

Tokens: `--button-*` (values per theme in ai/components/button.json).
