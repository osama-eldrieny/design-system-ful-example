# Logo

> The logo shows the product’s mark and name, usually at the start of the navigation bar, linking to the home page. Its colors, corners and spacing follow the theme.

Status: stable · Category: Patterns · Since 0.2.0

```tsx
import { Logo } from '@ds/react';
```

## When to use
- At the start of the Navbar, linking home.
- In sign-in screens, footers and empty states that name the product.

## When not to use
- For a person or team. Use Avatar.
- For decorative icons in content. Use An icon from lucide-react.

## Name (`hideName`)
- `false`: Mark and name. Default.
- `true`: Mark only, for tight spaces; the name is still announced.

## States
- **Default**: At rest. (—)
- **Focus**: A linked logo shows the focus ring. (:focus-visible with href)

## Props
### Logo

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` |  | Product or company name. Shown as the wordmark and used as the accessible name. |
| `icon` | `ReactNode` | <Hexagon /> | The mark, usually an icon. Decorative: the name already says what it is. |
| `href` | `string` |  | Makes the logo a link, usually to the home page. |
| `hideName` | `boolean` | false | Shows only the mark, e.g. in tight spaces. The name is still announced. |

## Guidelines
- Do: Link the logo to the home page. Don’t: Add a separate “Home” link next to it that does the same. Why: People expect the logo to go home; a duplicate link adds noise.
- Do: Keep the name visible where there’s room. Don’t: Hide the name everywhere to look minimal. Why: The name tells new visitors where they are.
- Do: Let the theme color the logo. Don’t: Override its colors per brand in page CSS. Why: Theme tokens keep contrast right in every brand and mode.

## Content
- Use the product name exactly as it is written in the brand.

## Accessibility
- Role: link (with href), img (name hidden) or plain text.
- Tab / Enter: Reach and follow a linked logo.
- `aria-hidden on the mark`: Always: the mark is decorative.
- `aria-label`: Set to the name when hideName is on.
- Focus: A linked logo shows the focus ring.
- WCAG 1.1.1 Non-text Content: The name is always the text alternative.
- WCAG 2.4.4 Link Purpose: The link is named by the product name.

## Examples
### Home link
The usual case, at the start of the Navbar.

```tsx
import { Logo } from '@ds/react';
import { Flame } from 'lucide-react';

<Logo name="TechHub" icon={<Flame />} href="/" />
```

### Mark only
For narrow layouts; still named for screen readers.

```tsx
import { Logo } from '@ds/react';

<Logo name="TechHub" hideName href="/" />
```

### In another brand
The theme sets the colors.

```tsx
import { Logo, ThemeProvider } from '@ds/react';

<ThemeProvider theme={{ brand: 'amber' }}>
  <Logo name="TechHub" />
</ThemeProvider>
```

Tokens: `--logo-*` (values per theme in ai/components/logo.json).
