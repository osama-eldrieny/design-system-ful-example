# Link

> A link takes people to another page or place. Inline links sit in running text and are always underlined; standalone links stand on their own, like “View all orders”. External links open in a new tab and say so.

Status: stable · Category: Actions · Since 0.3.0

```tsx
import { Link } from '@ds/react';
```

## When to use
- To go to another page, section or site.
- For a secondary, low-emphasis navigation like “View all”.

## When not to use
- To do something (save, delete, open a dialog). Use Button.
- For a prominent call to action that navigates. Use Button rendered as a link.
- For the site’s main navigation. Use Navbar.

## Appearance (`appearance`)
- `inline`: Inside a sentence; takes the surrounding text size. Default.
- `standalone`: On its own line or next to content; has sizes and an icon.

## Variant (`variant`)
- `primary`: Brand color. Default.
- `secondary`: Neutral color for footers, metadata and dense UI.

## Size (standalone) (`size`)
- `small`: Small text.
- `medium`: Default.
- `large`: Larger line height and icon.

## States
- **Default**: Unvisited. (—)
- **Hover**: Darker, thicker underline. (:hover)
- **Visited**: Darker brand color (primary only). (:visited)
- **Focus**: Focus ring. (:focus-visible)

## Props
### Link

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `string` |  | Destination. |
| `appearance` | `"inline" \| "standalone"` | inline | `inline` (default) sits in running text, underlined and in the text's size; `standalone` stands on its own, e.g. “View all orders”, and can have an icon and a size. |
| `variant` | `"primary" \| "secondary"` | primary | `primary` (default) in the brand color; `secondary` neutral, for footers and dense UI. |
| `size` | `LinkSize` | medium | Size of a standalone link. |
| `icon` | `ReactNode` |  | Icon after the text of a standalone link, e.g. an arrow. Hidden from screen readers. |
| `external` | `boolean` | false | Opens in a new tab with an external-link icon and “(opens in a new tab)” for screen readers. Use for other sites only. |
| `externalLabel` | `string` | (opens in a new tab) | Text announced for external links, for translation. |
| `as` | `ElementType` | a | Render another element, e.g. your router's Link. It receives href and className. |

## Guidelines
- Do: Use Link to go somewhere and Button to do something. Don’t: Use a link with onClick to submit or delete. Why: Screen readers announce links and buttons differently; people expect them to behave differently.
- Do: Write descriptive link text. Don’t: Write “Click here” or “More”. Why: Screen reader users often browse a list of links out of context.
- Do: Keep inline links underlined. Don’t: Remove the underline from links in text. Why: Color alone doesn’t identify a link for everyone (WCAG 1.4.1).

## Content
- Say where the link goes: “Read the return policy”, not “Click here”.
- Keep link text unique on a page when the destinations differ.
- Open new tabs only for other sites, and say so (external does).

## Accessibility
- Role: link (native anchor).
- Tab: Moves to the link.
- Enter: Follows it.
- `aria-hidden on icons`: Always.
- `visually hidden text`: “(opens in a new tab)” on external links.
- Focus: Focus ring around the link.
- WCAG 1.4.1 Use of Color: Inline links are underlined.
- WCAG 2.4.4 Link Purpose: Guidelines require descriptive text.
- WCAG 3.2.5 Change on Request: New tabs are announced.

## Examples
### Inline
In a sentence.

```tsx
import { Link } from '@ds/react';

<p>
  Read our <Link href="/returns">return policy</Link> before you send an item back.
</p>
```

### Standalone with an icon
A “view all” link.

```tsx
import { Link } from '@ds/react';
import { ArrowRight } from 'lucide-react';

<Link href="/orders" appearance="standalone" icon={<ArrowRight />}>
  View all orders
</Link>
```

### Router and external
Use your router’s link, or open another site in a new tab.

```tsx
import { Link } from '@ds/react';
import { Link as RouterLink } from 'react-router-dom';

<Link as={RouterLink} to="/settings">Settings</Link>
<Link href="https://www.w3.org/WAI/" external>WCAG guidelines</Link>
```

Tokens: `--link-*` (values per theme in ai/components/link.json).
