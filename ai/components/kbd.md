# Kbd

> Kbd shows a keyboard key or a shortcut, such as Ctrl + K, in text, menus and tooltips.

Status: stable · Category: Data display · Since 0.4.0

```tsx
import { Kbd } from '@ds/react';
```

## When to use
- To show keyboard shortcuts in docs, menus and tooltips.

## When not to use
- For code. Use Code.
- For buttons people click. Use Button.

## Keys (`keys`)
- `children`: One key.
- `keys`: A combination, e.g. ['Ctrl', 'K'].

## States
- **Static**: Not interactive. (—)

## Props
### Kbd

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `keys` | `string[]` |  | Keys of a combination, e.g. ['Ctrl', 'K'], shown joined by “+”. |
| `children` | `ReactNode` |  | A single key when not using keys. |

## Guidelines
- Do: Show platform keys (⌘ on Mac, Ctrl elsewhere). Don’t: Show ⌘ to Windows users. Why: Wrong keys confuse people.
- Do: Use Kbd for keys only. Don’t: Use Kbd for code. Why: Code has its own component.
- Do: Keep shortcuts short. Don’t: Show four-key chords as the main way to do something. Why: Long shortcuts are hard to press and remember.

## Content
- Use the key’s name as printed: Ctrl, Shift, Enter, ⌘ on Mac.

## Accessibility
- Role: text (kbd elements).
- —: Not focusable.
- `none`: Keys are read as text.
- Focus: None.
- WCAG 1.3.1 Info and Relationships: Uses the kbd element.
- WCAG 1.4.3 Contrast (Minimum): Key text passes 4.5:1.

## Examples
### One key
Escape.

```tsx
import { Kbd } from '@ds/react';

Press <Kbd>Esc</Kbd> to close.
```

### Combination
Command K.

```tsx
import { Kbd } from '@ds/react';

<Kbd keys={['Ctrl', 'K']} />
```

### In a menu
As a shortcut hint.

```tsx
import { DropdownMenuItem, Kbd } from '@ds/react';

<DropdownMenuItem shortcut={<Kbd keys={['Ctrl', 'C']} />}>Copy</DropdownMenuItem>
```

Tokens: `--kbd-*` (values per theme in ai/components/kbd.json).
