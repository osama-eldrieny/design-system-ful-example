# Accessibility

Every component targets **WCAG 2.2 AA**. Much of it is built in and checked automatically; the rest depends on how components are used.

## Built in

| Area          | What the system does                                                                                | How it's checked                  |
| ------------- | --------------------------------------------------------------------------------------------------- | --------------------------------- |
| Contrast      | Every text/background pair passes 4.5:1, icons and focus rings 3:1, in all six brand × mode themes. | Contrast check on every build     |
| Keyboard      | Every interactive component works with Tab, Enter, Space and arrow keys as the pattern expects.     | Interaction tests in the browser  |
| Focus         | A visible focus ring on `:focus-visible`, in the brand accent.                                      | Axe + interaction tests           |
| Semantics     | Native elements first (`<button>`, `<input>`), ARIA only where HTML has no equivalent.              | Axe on every story, jsx-a11y lint |
| Motion        | Durations drop to 0 when people ask for reduced motion.                                             | Foundations tokens                |
| Right-to-left | Logical properties, so layouts mirror in Arabic.                                                    | RTL stories                       |
| Target size   | Controls are at least 24 × 24 px (WCAG 2.5.8).                                                      | Component specs                   |

## Your part

- Give every control a visible label or, for icon-only controls, an accessible name.
- Write clear, specific labels and error messages.
- Keep a logical heading order and reading order.
- Don't rely on color alone: pair it with text or an icon.
- Test flows with the keyboard only, and with a screen reader (VoiceOver, NVDA).

## Contrast status
