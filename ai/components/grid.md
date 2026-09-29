# Grid

> Grid lays children out in equal columns: a fixed number, or as many as fit (auto), so it reflows on small screens.

Status: stable · Category: Layout · Since 0.4.0

```tsx
import { Grid } from '@ds/react';
```

## When to use
- For card grids, galleries and dashboards.

## When not to use
- For tabular data. Use Table.
- For a single row. Use Inline.

## Stretch (`stretch`)
- `false`: Steady column width, room for more items. Default; card grids.
- `true`: Items share leftover space; form fields and stat rows.

## Gap (`gap`)
- `none … 3xl`: Steps of the spacing scale; they shrink in compact density.

## Columns (`columns`)
- `auto`: As many as fit at minItemWidth. Default; responsive.
- `n`: Exactly n columns.

## States
- **Static**: Layout only; not interactive. (—)

## Props
### Grid

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `number \| "auto"` | auto | A number of equal columns, or `auto` (default) to fit as many columns of at least minItemWidth as there is room for, so it reflows on small screens. |
| `minItemWidth` | `string` |  | Smallest column width for columns="auto", e.g. "16rem". Default the grid token. |
| `stretch` | `boolean` | false | With columns="auto": `false` (default) keeps every column at a steady width, leaving room for more (good for card grids); `true` stretches items to use the leftover space (good for form fields and stat rows). |
| `gap` | `SpaceStep` | md | Space between cells (follows density). Default md. |
| `as` | `ElementType` | div |  |

## Guidelines
- Do: Use gap steps from the scale. Don’t: Add margins to children. Why: Gap keeps spacing consistent and density-aware.
- Do: Use `as` for meaning (ul, section). Don’t: Use a div where a list is meant. Why: Semantics help assistive tech.
- Do: Prefer auto columns. Don’t: Fix 4 columns on every screen. Why: Fixed columns get too narrow on phones.

## Content
- Use layout components instead of margins on children.

## Accessibility
- Role: none (a div by default); use `as` for meaningful elements like ul or section.
- —: Not focusable.
- `none`: Layout only.
- Focus: None.
- WCAG 1.4.10 Reflow: Auto columns reflow to one column.
- WCAG 1.3.2 Meaningful Sequence: Reading order follows the DOM.

## Examples
### Card grid
Auto columns.

```tsx
import { Grid, ProductCard } from '@ds/react';

<Grid minItemWidth="16rem">{products.map((p) => <ProductCard key={p.id} {...p} />)}</Grid>
```

### Fixed columns
Dashboard.

```tsx
import { Grid, Stat } from '@ds/react';

<Grid columns={4} gap="lg">{stats}</Grid>
```

### As a list
Semantics.

```tsx
import { Grid } from '@ds/react';

<Grid as="ul">{items}</Grid>
```

Tokens: `--grid-*` (values per theme in ai/components/grid.json).
