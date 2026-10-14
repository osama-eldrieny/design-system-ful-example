# PageHeader

> The top of a page or section: breadcrumbs, a title with supporting text, actions, and a row for tabs, search or filters. Small size works as a section or card header.

Status: stable · Category: Layout · Since 1.1.0

```tsx
import { PageHeader } from '@ds/react';
```

## When to use
- At the top of every app page, with the page title as h1.
- Above a section or card, with size="small" and titleAs="h2".

## When not to use
- For a person’s profile card. Use Header.
- For the site’s top navigation. Use Navbar.

## Size (`size`)
- `medium`: Page header. Default.
- `small`: Section or card header.

## Divider (`divider`)
- `false`: No line. Default.
- `true`: A line under the header.

## States
- **Static**: The header itself is not interactive. (—)

## Props
### PageHeader

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | The page or section title. |
| `titleAs` | `"h1" \| "h2" \| "h3"` | h1 | Heading level: h1 for a page (default), h2 or h3 for a section. |
| `description` | `ReactNode` |  | Supporting text under the title. |
| `breadcrumbs` | `ReactNode` |  | Above the title, e.g. a Breadcrumb. |
| `leading` | `ReactNode` |  | Before the title, e.g. an Avatar or FeaturedIcon. |
| `actions` | `ReactNode` |  | Buttons at the end, e.g. "Export" and "Add". |
| `children` | `ReactNode` |  | Under the title row, e.g. Tabs, a search field or filters. |
| `size` | `"medium" \| "small"` | medium | `medium` (default) for pages, `small` for sections and cards. |
| `divider` | `boolean` | false | A line under the header. |

## Guidelines
- Do: Use one h1 per page: the PageHeader title. Don’t: Use several page headers with h1 on one page. Why: Headings form the page outline for screen readers.
- Do: Put the main action at the end of the title row. Don’t: Scatter page-level actions through the content. Why: People look for page actions in the header.
- Do: Use children for tabs and filters that change the page’s content. Don’t: Put unrelated controls in the header. Why: The header should frame what follows.

## Content
- Title: the page’s name, matching the navigation item.
- Description: one sentence on what people do here.
- Keep to one primary action; put others in outline buttons or a menu.

## Accessibility
- Role: A div with a heading; it adds no landmark, so several can share a page.
- Tab: Moves through breadcrumbs, actions and children.
- `Heading level`: titleAs sets h1, h2 or h3.
- Focus: Only its interactive children are focusable.
- WCAG 1.3.1 Info and Relationships: The title is a real heading.
- WCAG 2.4.6 Headings and Labels: The title names the page.
- Match the browser tab title to the page title.

## Examples
### Page header
Title, description and actions.

```tsx
import { Button, PageHeader } from '@ds/react';

<PageHeader title="Products" description="Manage your catalog." actions={<Button>Add product</Button>} />
```

### With breadcrumbs and tabs
Children render under the title row.

```tsx
import { Breadcrumb, PageHeader, Tab, TabList, Tabs } from '@ds/react';

<PageHeader title="Products" breadcrumbs={<Breadcrumb items={trail} />}>
  <Tabs appearance="line" defaultValue="all">…</Tabs>
</PageHeader>
```

### Section header
Small, with an h2.

```tsx
import { PageHeader } from '@ds/react';

<PageHeader size="small" titleAs="h2" title="Recent orders" divider />
```

Tokens: `--page-header-*` (values per theme in ai/components/page-header.json).
