# Tooltip

> A tooltip shows a short text hint for a control when it’s hovered or focused, such as the name of an icon button. It is dismissible with Escape and never contains links or buttons.

Status: stable · Category: Overlays · Since 0.4.0

```tsx
import { Tooltip } from '@ds/react';
```

## When to use
- To show the name of an icon-only button.
- To add a short, non-essential hint to a control.

## When not to use
- For information people need to complete a task. Use Visible help text (FormField description).
- For interactive content. Use Popover.

## Side (`side`)
- `top`: Default.
- `bottom / left / right`: When top covers something important.

## States
- **Shown**: After the delay on hover, immediately on focus. (hover or focus)

## Props
### Tooltip

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `ReactNode` |  | Short hint shown on hover and keyboard focus. Plain text only, no links or buttons. |
| `children` | `ReactElement<unknown, string \| JSXElementConstructor<any>>` |  | The element it describes; must be focusable (e.g. an IconButton). |
| `delayDuration` | `number` | 400 | Delay before showing, in ms. Default 400. |
| `open` | `boolean` |  | Open state (controlled). |
| `defaultOpen` | `boolean` |  |  |
| `onOpenChange` | `((open: boolean) => void)` |  |  |

## Guidelines
- Do: Give icon buttons an aria-label and a tooltip with the same text. Don’t: Rely on the tooltip as the only name. Why: The tooltip describes; the aria-label names the button.
- Do: Keep tooltips to plain text. Don’t: Put links or buttons in a tooltip. Why: Tooltips disappear when focus moves, so their content can’t be reached.
- Do: Attach tooltips to focusable elements. Don’t: Put a tooltip on plain text or a disabled button. Why: Keyboard users can’t focus them, so they’d never see it.

## Content
- A few words; no full stop for labels. Don’t repeat the visible label.

## Accessibility
- Role: tooltip; describes its trigger.
- Tab: Focusing the trigger shows it.
- Escape: Hides it.
- `aria-describedby`: Set on the trigger while shown.
- Focus: Stays on the trigger.
- WCAG 1.4.13 Content on Hover or Focus: Dismissible (Escape), hoverable and persistent.
- WCAG 1.4.3 Contrast (Minimum): Inverted text passes 4.5:1 in every theme.
- WCAG 2.1.1 Keyboard: Shows on focus, not only hover.

## Examples
### Icon button
Names an icon.

```tsx
import { Tooltip, IconButton } from '@ds/react';
import { Trash2 } from 'lucide-react';

<Tooltip content="Delete">
  <IconButton icon={<Trash2 />} label="Delete" />
</Tooltip>
```

### Placement
Below the control.

```tsx
import { Tooltip, Button } from '@ds/react';

<Tooltip content="Last saved 2 minutes ago" side="bottom">
  <Button appearance="text">Saved</Button>
</Tooltip>
```

### Faster
Shorter delay in dense toolbars.

```tsx
import { Tooltip, IconButton } from '@ds/react';

<Tooltip content="Bold" delayDuration={150}><IconButton icon={<Bold />} label="Bold" /></Tooltip>
```

Tokens: `--tooltip-*` (values per theme in ai/components/tooltip.json).
