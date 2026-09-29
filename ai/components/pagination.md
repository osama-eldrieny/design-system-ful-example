# Pagination

> Pagination moves between pages of a long list or table. It shows where people are, lets them step forward and back, and jumps to a page, shortening long ranges with an ellipsis.

Status: stable · Category: Navigation · Since 0.2.0

```tsx
import { Pagination } from '@ds/react';
```

## When to use
- For long lists, search results or tables split into pages.
- When people need to know how much content there is and return to a specific page.

## When not to use
- For feeds people browse casually. Use Infinite scroll or a “Load more” button.
- For steps in a process. Use Stepper.

## Appearance (`appearance`)
- `full`: Page numbers with ellipses. Default.
- `simple`: “Page 2 of 10” between the arrows, for narrow spaces.

## States
- **Default**: A page people can go to. (At rest.)
- **Hover**: Shows the page responds to the pointer. (:hover.)
- **Current**: The page being shown. (currentPage.)
- **Focus**: Shows keyboard focus. (:focus-visible.)
- **Disabled**: No previous/next page. (On the first or last page.)

## Props
### Pagination

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `currentPage` | `number` |  | The page being shown, starting at 1. |
| `totalPages` | `number` |  | Number of pages. |
| `onPageChange` | `((page: number) => void)` |  | Called with the page to show. |
| `appearance` | `PaginationAppearance` | full | `full` (default) lists page numbers, shortening long ranges with “…”. `simple` shows “Page 2 of 10” between the arrows, for narrow spaces. |
| `siblingCount` | `number` | 1 | How many pages to show on each side of the current page before “…”. |
| `label` | `string` | Pagination | Accessible name of the navigation landmark. Default "Pagination". |
| `labels` | `{ previous?: string; next?: string; page?: ((page: number) => string) \| undefined; summary?: ((page: number, total: number) => string) \| undefined; } \| undefined` | {} | Accessible names and summary wording, for translation. |

## Guidelines
- Do: Show the total number of pages. Don’t: Hide how much content there is. Why: People decide whether to keep going based on how much is left.
- Do: Keep pagination in the same place on every page. Don’t: Move it around as the list length changes. Why: A stable position lets people step through pages without hunting.
- Do: Use the simple appearance where space is tight. Don’t: Let page numbers wrap onto several lines. Why: Wrapped numbers are hard to scan and tap.

## Content
- Keep the default labels (“Previous page”, “Next page”, “Page 3”) unless translating.
- In simple mode, the summary reads “Page 2 of 10”.

## Accessibility
- Role: navigation landmark containing a list of buttons.
- Tab / Shift+Tab: Moves between the arrows and page buttons.
- Enter / Space: Goes to that page.
- `aria-label on nav`: From label (default “Pagination”); use distinct labels if a page has two.
- `aria-current="page"`: Set on the current page.
- `aria-label on buttons`: “Previous page”, “Next page”, “Page 3”.
- `aria-live="polite"`: On the simple summary, so changes are announced.
- Focus: Every button shows the focus ring when reached with the keyboard.
- WCAG 1.3.1 Info and Relationships: A labelled navigation landmark with a list.
- WCAG 2.4.4 Link Purpose: Every control has a descriptive name.
- WCAG 1.4.3 Contrast (Minimum): Numbers pass 4.5:1 at rest, hovered and current.
- WCAG 4.1.2 Name, Role, Value: The current page is exposed with aria-current.
- The ellipsis is hidden from screen readers; the page numbers around it are enough.

## Examples
### Paging through results
Controlled by the current page.

```tsx
import { Pagination } from '@ds/react';

<Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
```

### Compact
For narrow layouts.

```tsx
import { Pagination } from '@ds/react';

<Pagination appearance="simple" currentPage={page} totalPages={12} onPageChange={setPage} />
```

### Translated labels
Pass the wording for another language.

```tsx
import { Pagination } from '@ds/react';

<Pagination
  currentPage={page}
  totalPages={12}
  onPageChange={setPage}
  label="التنقل بين الصفحات"
  labels={{ previous: 'الصفحة السابقة', next: 'الصفحة التالية', page: (p) => `الصفحة ${p}` }}
/>
```

Tokens: `--pagination-*` (values per theme in ai/components/pagination.json).
