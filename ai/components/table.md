# Table

> A table shows rows and columns of data people compare: sortable columns, selectable rows with select-all, a sticky header, striped or compact rows, and loading and empty states. It is a real HTML table with a caption.

Status: stable · Category: Data display · Since 0.4.0

```tsx
import { Table } from '@ds/react';
```

## When to use
- For records people scan, compare and act on: orders, users, invoices.

## When not to use
- For page layout. Use Grid or Stack.
- For a simple list with one or two attributes. Use List.

## Selection (`selectable`)
- `false`: No checkboxes. Default.
- `true`: Row checkboxes plus select-all (mixed when some are selected).

## Density (`compact`)
- `false`: Follows the density theme. Default.
- `true`: Tighter rows for data-heavy screens.

## States
- **Sorted**: Arrow shows direction; aria-sort on the header. (sort)
- **Selected**: Row tinted; aria-selected. (selected)
- **Loading**: Skeleton rows; aria-busy. (loading)
- **Empty**: Message across the table. (no rows)

## Props
### Table

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `caption` | `ReactNode` |  | Names the table. Shown above it unless hideCaption. |
| `hideCaption` | `boolean` |  |  |
| `columns` | `TableColumn<Row>[]` |  |  |
| `rows` | `Row[]` |  |  |
| `getRowId` | `((row: Row) => Key)` |  | Stable id per row. Default: row.id. |
| `sort` | `TableSort \| null` |  | Sort (controlled). Rows are sorted here unless manualSort. |
| `defaultSort` | `TableSort \| null` |  |  |
| `onSortChange` | `((sort: TableSort \| null) => void)` |  |  |
| `manualSort` | `boolean` |  | Leave sorting to you (e.g. on the server); the table only shows the state. |
| `selectable` | `boolean` |  | Adds a checkbox per row and a select-all checkbox. |
| `selected` | `Key[]` |  | Selected row ids (controlled). |
| `defaultSelected` | `Key[]` |  |  |
| `onSelectionChange` | `((selected: Key[]) => void)` |  |  |
| `rowLabel` | `((row: Row, index: number) => string)` |  | Accessible name of a row checkbox. Default "Select row {n}". |
| `stickyHeader` | `boolean` |  | Keeps the header in view while scrolling within a height-limited wrapper. |
| `striped` | `boolean` |  | Alternating row backgrounds. |
| `compact` | `boolean` |  | Tighter rows. |
| `loading` | `boolean` |  | Shows placeholder rows. |
| `empty` | `ReactNode` |  | Shown in a full-width cell when there are no rows. |
| `ref` | `Ref<HTMLTableElement>` |  |  |

## Guidelines
- Do: Give every table a caption (hide it if the page heading already says it). Don’t: Leave tables unnamed. Why: The caption names the table for screen readers.
- Do: Align numbers to the end. Don’t: Center or left-align money. Why: Aligned digits are easy to compare.
- Do: Paginate or virtualize long data. Don’t: Render thousands of rows at once. Why: Huge tables are slow and hard to navigate.

## Content
- Column headers: short nouns.
- Right-align numbers and money; keep units in the header.

## Accessibility
- Role: table with caption, column headers (scope="col") and sort state.
- Tab: Reaches sort buttons and checkboxes.
- Enter / Space: Sorts or toggles selection.
- `aria-sort`: On sortable headers.
- `aria-selected`: On rows of a selectable table.
- `aria-busy`: While loading.
- Focus: Focus rings on sort buttons and checkboxes.
- WCAG 1.3.1 Info and Relationships: Native table semantics with headers and caption.
- WCAG 1.4.10 Reflow: Scrolls in its own frame instead of the page.
- WCAG 4.1.2 Name, Role, Value: Named checkboxes and sort state.

## Examples
### Orders
Sortable, with money aligned.

```tsx
import { Table } from '@ds/react';

<Table
  caption="Recent orders"
  columns={[
    { key: 'id', header: 'Order', sortable: true },
    { key: 'customer', header: 'Customer', sortable: true },
    { key: 'total', header: 'Total', align: 'end', sortable: true, render: (r) => `$${r.total}` },
  ]}
  rows={orders}
/>
```

### Selectable
Bulk actions.

```tsx
import { Table } from '@ds/react';

<Table caption="Invoices" selectable selected={selected} onSelectionChange={setSelected}
  rowLabel={(r) => `Select invoice ${r.id}`} columns={columns} rows={invoices} />
```

### Server sorting
Loading while fetching.

```tsx
import { Table } from '@ds/react';

<Table caption="Users" hideCaption columns={columns} rows={data} loading={isLoading}
  manualSort sort={sort} onSortChange={setSort} stickyHeader />
```

Tokens: `--table-*` (values per theme in ai/components/table.json).
