# Code

> Code shows code inline in text or as a block with a language label and a copy button. Blocks scroll horizontally and can be scrolled from the keyboard.

Status: stable · Category: Data display · Since 0.4.0

```tsx
import { Code } from '@ds/react';
```

## When to use
- For code, commands, file names and values in text.
- For copyable snippets in docs.

## When not to use
- For keyboard keys. Use Kbd.
- For editable code. Use A code editor.

## Display (`block`)
- `false`: Inline in text. Default.
- `true`: A block with copy.

## States
- **Copied**: The copy icon becomes a tick and “Copied” is announced. (copy)

## Props
### Code

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string` |  | The code as text. |
| `block` | `boolean` | false | Multi-line code in its own block, with a copy button. Default inline. |
| `language` | `string` |  | Language, shown above a block and set as data-language, e.g. "tsx". |
| `copyable` | `boolean` | true | Shows the copy button on a block. Default true. |
| `copyLabel` | `string` | Copy code | Accessible name of the copy button. Default "Copy code". |
| `copiedLabel` | `string` | Copied | Announced after copying. Default "Copied". |

## Guidelines
- Do: Use blocks for multi-line code. Don’t: Put long code inline. Why: Inline code wraps awkwardly.
- Do: Name the language. Don’t: Leave readers guessing. Why: The label helps people and tools.
- Do: Keep lines readable. Don’t: Minify code in docs. Why: People need to read and adapt it.

## Content
- Show real, runnable code.

## Accessibility
- Role: code; blocks are a named, focusable group.
- Tab: Reaches the copy button and the scroll area.
- Arrow keys: Scroll a focused block.
- `role="group" + aria-label`: The block’s focusable scroll area.
- `role="status"`: Announces “Copied”.
- Focus: Focus ring on the copy button and scroll area.
- WCAG 2.1.1 Keyboard: Blocks scroll from the keyboard.
- WCAG 4.1.3 Status Messages: Copy result is announced.
- WCAG 1.4.10 Reflow: Wide code scrolls in its own area.

## Examples
### Inline
In text.

```tsx
import { Code } from '@ds/react';

Run <Code>npm install</Code> first.
```

### Block
With copy.

```tsx
import { Code } from '@ds/react';

<Code block language="bash">{'npm install @ds/react'}</Code>
```

### Without copy
Read-only output.

```tsx
import { Code } from '@ds/react';

<Code block copyable={false}>{output}</Code>
```

Tokens: `--code-*` (values per theme in ai/components/code.json).
