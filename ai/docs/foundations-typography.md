# Typography

Two theme axes set the type: **language** (English or Arabic) and **typeface** (sans-serif or serif). Each combination picks a font for headings, body text and actions. Arabic also switches the text direction to right-to-left.

| Language | Sans-serif | Serif                |
| -------- | ---------- | -------------------- |
| English  | Inter      | Domine               |
| Arabic   | Cairo      | IBM Plex Sans Arabic |

Load the fonts once with `import '@ds/tokens/fonts.css'` next to `tokens.css`.

## Families by theme

## Type scale

Sizes and line heights come in pairs: use `--font-line-height-md` with `--font-size-md`. Components reach them through their own tokens, e.g. `--button-medium-font-size`.

## Weights

`--font-weight-regular` (400) for body text and buttons, `--font-weight-medium` (500) for labels and emphasis, `--font-weight-semi-bold` (600) and `--font-weight-bold` (700) for headings. The full range from `thin` (100) to `black` (900) exists, but keep to these four.

## Guidelines

- Use sentence case for headings, labels and buttons.
- Keep body text between 45 and 75 characters per line.
- Don't use size alone to show hierarchy in Arabic; combine it with weight, since Arabic letterforms look larger at the same size.
