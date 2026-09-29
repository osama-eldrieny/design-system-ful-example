# Navbar

> The navigation bar at the top of a site or app: the logo, links to the main sections, and optional actions such as search. It marks the current page and wraps onto more rows on small screens.

Status: stable · Category: Patterns · Since 0.2.0

```tsx
import { Navbar } from '@ds/react';
```

## When to use
- Once per page, at the top, for the site’s or app’s main sections.
- With up to about five top-level destinations.

## When not to use
- To switch views within one page. Use Tabs.
- For many or nested destinations. Use A side navigation.
- For secondary links such as Privacy. Use Footer.

## Item type (`items[].href`)
- `href set`: A link to another page. Use for navigation.
- `no href`: A button that runs onClick, for app views without URLs.

## States
- **Default**: Another page. (—)
- **Hover**: Tinted background. (:hover)
- **Current**: Tinted, brand-colored and underlined; announced as “current page”. (aria-current="page")
- **Focus**: Focus ring. (:focus-visible)

## Props
### Navbar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `logo` | `ReactNode` |  | Usually a Logo linking home. |
| `items` | `NavbarItem[]` |  | The main destinations; keep to about five. |
| `currentItem` | `string` |  | Id of the current page's item (controlled). |
| `defaultCurrentItem` | `string` |  | Initially current item when uncontrolled; clicking an item makes it current. |
| `onCurrentItemChange` | `((id: string) => void)` |  | Called with the item id when an item is clicked. |
| `actions` | `ReactNode` |  | Content at the end of the bar, e.g. a Button or an Avatar. |
| `aria-label` | `string` | Main | Names the navigation landmark. Default "Main". |

## Guidelines
- Do: Mark the current page with currentItem. Don’t: Style the current item with a custom class. Why: aria-current tells screen reader users where they are; a class only changes the look.
- Do: Use real links (href) for pages. Don’t: Use onClick-only buttons for navigation between URLs. Why: Links can be opened in a new tab, bookmarked and shared.
- Do: Keep it to about five items. Don’t: Squeeze every page into the top bar. Why: Too many items wrap into a crowded bar and are hard to scan.

## Content
- Use short, familiar labels: one or two words (“Products”, “Pricing”).
- Order items by importance or by the user’s journey.

## Accessibility
- Role: navigation landmark (nav) with a list of links.
- Tab: Moves through the logo, items and actions in order.
- Enter: Follows a link or activates a button item.
- `aria-label`: Names the landmark; default “Main”.
- `aria-current="page"`: Set on the current item.
- `aria-hidden on item icons`: Always: the label names the item.
- Focus: Each item shows the focus ring.
- WCAG 1.3.1 Info and Relationships: A nav landmark containing a list.
- WCAG 1.4.1 Use of Color: The current item is also underlined (and underlined text in forced colors).
- WCAG 2.4.8 Location: aria-current announces the current page.
- WCAG 1.4.10 Reflow: Items wrap at narrow widths without horizontal scrolling.

## Examples
### Site navigation
Logo, links and the current page.

```tsx
import { Navbar, Logo } from '@ds/react';

<Navbar
  logo={<Logo name="TechHub" href="/" />}
  items={[
    { label: 'Products', href: '/products' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
  ]}
  currentItem="Products"
/>
```

### With actions
A sign-in button at the end.

```tsx
import { Navbar, Logo, Button } from '@ds/react';

<Navbar
  logo={<Logo name="TechHub" href="/" />}
  items={items}
  currentItem={pathname}
  actions={<Button size="small">Sign in</Button>}
/>
```

### With a router
Drive the current item from the URL.

```tsx
import { Navbar } from '@ds/react';

const items = [
  { id: '/', label: 'Home', href: '/' },
  { id: '/pricing', label: 'Pricing', href: '/pricing' },
];

<Navbar items={items} currentItem={location.pathname} />
```

Tokens: `--navbar-*` (values per theme in ai/components/navbar.json).
