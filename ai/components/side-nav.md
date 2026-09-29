# SideNav

> A side navigation lists the pages of an app or docs site in sections, with icons and nested groups that expand and collapse. The current page is highlighted and announced.

Status: stable · Category: Navigation · Since 0.4.0

```tsx
import { SideNav } from '@ds/react';
```

## When to use
- For apps and docs with many pages or two levels of hierarchy.

## When not to use
- For five or fewer top-level pages. Use Navbar.
- For switching views inside a page. Use Tabs.

## Structure (`sections`)
- `flat`: Items only.
- `nested`: Items with items: collapsible groups, indented.

## States
- **Hover**: Tinted background. (:hover)
- **Current**: Tinted with a bar on the inline start; aria-current="page". (currentItem)
- **Expanded**: Group shows its items; chevron flips. (aria-expanded)
- **Focus**: Focus ring. (:focus-visible)

## Props
### SideNav

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sections` | `SideNavSection[]` |  | Sections of links. Nested items expand and collapse. |
| `currentItem` | `string` |  | Id of the current page’s item. Its parents start expanded. |
| `aria-label` | `string` | Side | Names the navigation landmark. Default "Side". |

## Guidelines
- Do: Keep nesting to two levels. Don’t: Nest groups three or four deep. Why: Deep trees are hard to scan and navigate by keyboard.
- Do: Set currentItem from the router. Don’t: Highlight items with custom classes. Why: aria-current tells screen reader users where they are.
- Do: Use icons consistently: all items or none in a section. Don’t: Mix items with and without icons. Why: Mixed icons break the alignment people scan along.

## Content
- Short, specific labels; group titles in sentence case.

## Accessibility
- Role: navigation landmark with lists; groups are disclosure buttons.
- Tab: Moves between items.
- Enter / Space: Follows a link or toggles a group.
- `aria-current="page"`: The current item.
- `aria-expanded / aria-controls`: Group buttons.
- `aria-labelledby`: Lists named by their section title.
- Focus: Focus ring on each item.
- WCAG 2.4.8 Location: Marks the current page.
- WCAG 4.1.2 Name, Role, Value: Disclosure buttons expose expanded state.
- WCAG 1.4.1 Use of Color: Current page has an edge bar, not just color.

## Examples
### App navigation
Icons and one section.

```tsx
import { SideNav } from '@ds/react';

<SideNav currentItem="orders" sections={[{ items: [
  { id: 'home', label: 'Home', href: '/', icon: <House /> },
  { id: 'orders', label: 'Orders', href: '/orders', icon: <Package /> },
] }]} />
```

### Docs with groups
Nested pages.

```tsx
import { SideNav } from '@ds/react';

<SideNav currentItem="colors" sections={[
  { title: 'Foundations', items: [{ label: 'Tokens', items: [{ id: 'colors', label: 'Colors', href: '/colors' }] }] },
]} />
```

### With a router
Current from the URL.

```tsx
import { SideNav } from '@ds/react';

<SideNav sections={sections} currentItem={location.pathname} />
```

Tokens: `--side-nav-*` (values per theme in ai/components/side-nav.json).
