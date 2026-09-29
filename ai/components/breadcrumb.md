# Breadcrumb

> A breadcrumb shows where the current page sits in the site’s hierarchy, with links back up each level. Long trails collapse into an expandable “…”.

Status: stable · Category: Navigation · Since 0.4.0

```tsx
import { Breadcrumb } from '@ds/react';
```

## When to use
- On pages two or more levels deep in a hierarchy: product categories, docs, settings.

## When not to use
- On the home page or top-level pages. Use Nothing.
- For steps of a task. Use Stepper.
- For browsing history. Use A back link.

## Collapsing (`maxItems`)
- `undefined`: Shows every level. Default.
- `n (≥ 3)`: Shows the first, “…”, and the last n − 2.

## States
- **Hover**: Link color changes. (:hover)
- **Focus**: Focus ring. (:focus-visible)
- **Expanded**: All levels shown after pressing “…”. (“…” click)

## Props
### Breadcrumb

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `BreadcrumbItem[]` |  | From the top level down to the current page (last). |
| `maxItems` | `number` |  | Shows at most this many items; the middle collapses into a “…” button that expands them. At least 3. |
| `expandLabel` | `string` | Show all pages | Accessible name of the “…” button. Default "Show all pages". |
| `aria-label` | `string` | Breadcrumb | Names the navigation landmark. Default "Breadcrumb". |

## Guidelines
- Do: Mirror the site hierarchy. Don’t: Show the path people happened to click through. Why: Breadcrumbs show location, not history.
- Do: Collapse long trails with maxItems. Don’t: Let a trail wrap onto three lines. Why: Long trails push the page content down.
- Do: Keep the current page as plain text. Don’t: Link the current page to itself. Why: A link to the same page is confusing.

## Content
- Use each page’s real title, shortened if long.
- Don’t include the site name unless it’s a level.

## Accessibility
- Role: navigation landmark with an ordered list.
- Tab / Enter: Reach and follow each link or the “…” button.
- `aria-label="Breadcrumb"`: Names the landmark.
- `aria-current="page"`: On the last item.
- `aria-hidden on separators`: Always.
- Focus: Pressing “…” keeps focus in the trail.
- WCAG 2.4.8 Location: Shows the page’s place in the site.
- WCAG 1.3.1 Info and Relationships: Ordered list inside a named nav.
- WCAG 1.4.10 Reflow: Wraps at narrow widths.

## Examples
### Breadcrumb
Three levels.

```tsx
import { Breadcrumb } from '@ds/react';

<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Audio', href: '/audio' },
  { label: 'Wireless headphones' },
]} />
```

### Collapsed
A long trail.

```tsx
import { Breadcrumb } from '@ds/react';

<Breadcrumb maxItems={4} items={trail} />
```

### With a router
Handle clicks yourself.

```tsx
import { Breadcrumb } from '@ds/react';

<Breadcrumb items={trail.map((t) => ({ ...t, onClick: (e) => { e.preventDefault(); navigate(t.href); } }))} />
```

Tokens: `--breadcrumb-*` (values per theme in ai/components/breadcrumb.json).
