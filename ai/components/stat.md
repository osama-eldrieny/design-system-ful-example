# Stat

> A stat shows one key figure with its label and change, such as revenue up 12.5% vs last month. Trends are shown with an arrow, a color and words for screen readers.

Status: stable · Category: Data display · Since 0.4.0

```tsx
import { Stat } from '@ds/react';
```

## When to use
- For KPI tiles and dashboard summaries.

## When not to use
- For tables of figures. Use Table.
- For progress toward a goal. Use Progress.

## Trend (`trend`)
- `up`: Arrow up; good by default.
- `down`: Arrow down; bad by default.
- `neutral`: No arrow.

## Meaning (`positive`)
- `true`: The change is good news (green).
- `false`: The change is bad news (red).

## States
- **Static**: Not interactive. (—)

## Props
### Stat

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | What is measured, e.g. "Total revenue". |
| `value` | `ReactNode` |  | The figure, formatted, e.g. "$124,567". |
| `change` | `ReactNode` |  | Change since the previous period, e.g. "+12.5%". |
| `trend` | `"up" \| "down" \| "neutral"` | neutral | Direction of the change: `up` or `down` (colored and announced), `neutral`. Whether up is good depends on the metric: set `positive` accordingly. |
| `positive` | `boolean` |  | Whether the trend is good news. Default: up is good. Use false for e.g. costs rising. |
| `help` | `ReactNode` |  | Context for the change, e.g. "vs last month". |
| `trendLabels` | `{ up?: string; down?: string; } \| undefined` |  | Words announced for the trend, for translation. |

## Guidelines
- Do: Set positive for metrics where down is good. Don’t: Show falling costs in red. Why: Color should match whether the change is good.
- Do: Give context (“vs last month”). Don’t: Show “+12%” with no period. Why: A change means nothing without a baseline.
- Do: Round figures sensibly. Don’t: Show $124,567.2381. Why: Precision beyond need slows reading.

## Content
- Format values for the reader: currency, thousands separators, units.

## Accessibility
- Role: description list.
- —: Not focusable.
- `visually hidden trend word`: Up and down changes.
- Focus: None.
- WCAG 1.4.1 Use of Color: Arrow and words, not just color.
- WCAG 1.3.1 Info and Relationships: Label and value are paired in a dl.

## Examples
### KPI
Revenue up.

```tsx
import { Stat } from '@ds/react';

<Stat label="Total revenue" value="$124,567" change="+12.5%" trend="up" help="vs last month" />
```

### Down is good
Costs falling.

```tsx
import { Stat } from '@ds/react';

<Stat label="Costs" value="$8,210" change="-4%" trend="down" positive />
```

### Value only
No change.

```tsx
import { Stat } from '@ds/react';

<Stat label="Active users" value="8,432" />
```

Tokens: `--stat-*` (values per theme in ai/components/stat.json).
