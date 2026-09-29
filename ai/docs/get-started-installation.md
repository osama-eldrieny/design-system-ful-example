# Installation

## React projects

The library has two packages: `@ds/tokens` (the CSS tokens, fonts and theme helpers) and `@ds/react` (the components).

```bash
npm install @ds/react @ds/tokens
```

Import the tokens and fonts once, at the root of your app:

```tsx
// main.tsx

applyTheme(); // the default theme; see Theming for the options
```

Then use components:

```tsx

export function SaveBar() {
  return <Button onClick={save}>Save changes</Button>;
}
```

Each component imports its own stylesheet, so you only ship the CSS of the components you use. Requirements: React 18 or 19 and a bundler that handles CSS imports (Vite, webpack, Next.js).

## Without React

The tokens are plain CSS custom properties, so any stack can use them:

```html
<link rel="stylesheet" href="node_modules/@ds/tokens/src/tokens.css" />
<html data-theme data-brand="diamond" data-mode="light" lang="en" dir="ltr">
  …
</html>
```

```css
.card {
  background: var(--color-bg-surface);
  color: var(--color-fg-on-surface-primary);
  padding: var(--spacing-xl);
}
```

Load the fonts from `fonts.css` (with a bundler) or from Google Fonts: Inter, Domine, Cairo and IBM Plex Sans Arabic.

## Icons

Components take icons as React elements. The system uses [Lucide](https://lucide.dev):

```bash
npm install lucide-react
```

## Status

The packages are developed in this repository and not published to npm yet; until they are, use them through the monorepo workspaces.
