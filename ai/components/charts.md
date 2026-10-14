# Charts

> Dependency-free SVG charts styled by tokens: LineChart and AreaChart for trends, BarChart for comparing categories (grouped, stacked or horizontal), DonutChart for parts of a whole, RadarChart for several dimensions and Sparkline for a tiny trend next to a figure. Every chart is a named figure with a hidden data table, reads values with the keyboard and mirrors in right-to-left languages.

Status: beta · Category: Data display · Since 1.1.0

```tsx
import { LineChart } from '@ds/react';
import { AreaChart } from '@ds/react';
import { BarChart } from '@ds/react';
import { DonutChart } from '@ds/react';
import { RadarChart } from '@ds/react';
import { Sparkline } from '@ds/react';
```

## When to use
- LineChart / AreaChart: a value over time, e.g. monthly revenue; up to about four series.
- BarChart: comparing categories, e.g. orders per region; stacked for totals made of parts.
- DonutChart: parts of a whole with up to about six slices.
- Sparkline: a trend next to a number, e.g. in a MetricCard or table row.

## When not to use
- For exact values people need to look up or copy. Use Table.
- For one key number. Use MetricCard.
- For more than six parts of a whole. Use BarChart (horizontal).

## Chart type (`chart`)
- `LineChart`: Trends over an ordered axis. curved, showDots, area, stacked.
- `AreaChart`: LineChart with filled areas.
- `BarChart`: Categories. stacked; orientation vertical or horizontal.
- `DonutChart`: Shares. thickness 1 draws a pie; centerValue and centerLabel.
- `RadarChart`: Several series across several dimensions.
- `Sparkline`: A tiny trend; tone auto (green rising, red falling).

## Series color (`series.color`)
- `1`: The brand color; the first series by default.
- `2–8`: Category hues, assigned in order; set one to keep a series’ color fixed.

## States
- **Default**: At rest. (—)
- **Active point**: Tooltip and crosshair at one point. (Hover, or arrow keys while focused.)
- **Focus**: The plot shows the focus ring. (Tab (:focus-visible).)

## Props
### LineChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `area` | `boolean` | true | Fills the area under each line. |
| `stacked` | `boolean` | false | Stacks the areas on top of each other (with area). |
| `curved` | `boolean` | true | Smooth curves instead of straight segments. Default true. |
| `showDots` | `boolean` | false | Dots on every point. Default: only the active one. |
| `title` | `string` |  | Names the chart; shown above it unless hideTitle. Also names its data table. |
| `hideTitle` | `boolean` |  | Hides the title visually; it still names the chart for screen readers. |
| `description` | `ReactNode` |  | One sentence on what the chart shows. |
| `data` | `ChartRow[]` |  | One object per point on the x axis, e.g. `{ month: 'Jan', revenue: 12000 }`. |
| `xKey` | `string` |  | Field holding the x axis label, e.g. "month". |
| `series` | `ChartSeries[]` |  | The series to draw. |
| `height` | `number` | 48 | Plot height in px. Default 240. |
| `formatValue` | `((value: number) => string)` | (value: number) =>
  new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value) | Formats values on the axis and in the tooltip. Default compact numbers (12K). |
| `showLegend` | `boolean` | true | Shows the legend under the chart. Default: when there are several series. |
| `showGrid` | `boolean` | true | Shows horizontal gridlines. Default true. |
| `hideYAxis` | `boolean` | false | Hides the value axis labels, e.g. in small cards. |
| `className` | `string` |  |  |

### AreaChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` |  | Names the chart; shown above it unless hideTitle. Also names its data table. |
| `hideTitle` | `boolean` |  | Hides the title visually; it still names the chart for screen readers. |
| `description` | `ReactNode` |  | One sentence on what the chart shows. |
| `data` | `ChartRow[]` |  | One object per point on the x axis, e.g. `{ month: 'Jan', revenue: 12000 }`. |
| `xKey` | `string` |  | Field holding the x axis label, e.g. "month". |
| `series` | `ChartSeries[]` |  | The series to draw. |
| `height` | `number` | 48 | Plot height in px. Default 240. |
| `formatValue` | `((value: number) => string)` | (value: number) =>
  new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value) | Formats values on the axis and in the tooltip. Default compact numbers (12K). |
| `showLegend` | `boolean` | true | Shows the legend under the chart. Default: when there are several series. |
| `showGrid` | `boolean` | true | Shows horizontal gridlines. Default true. |
| `hideYAxis` | `boolean` | false | Hides the value axis labels, e.g. in small cards. |
| `stacked` | `boolean` | false | Stacks the areas on top of each other (with area). |
| `curved` | `boolean` | true | Smooth curves instead of straight segments. Default true. |
| `showDots` | `boolean` | false | Dots on every point. Default: only the active one. |
| `className` | `string` |  |  |

### BarChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `stacked` | `boolean` | false | Stacks series in one bar instead of side by side. |
| `orientation` | `"vertical" \| "horizontal"` | vertical | `vertical` (default) columns, `horizontal` bars, e.g. for long category names. |
| `title` | `string` |  | Names the chart; shown above it unless hideTitle. Also names its data table. |
| `hideTitle` | `boolean` |  | Hides the title visually; it still names the chart for screen readers. |
| `description` | `ReactNode` |  | One sentence on what the chart shows. |
| `data` | `ChartRow[]` |  | One object per point on the x axis, e.g. `{ month: 'Jan', revenue: 12000 }`. |
| `xKey` | `string` |  | Field holding the x axis label, e.g. "month". |
| `series` | `ChartSeries[]` |  | The series to draw. |
| `height` | `number` | 48 | Plot height in px. Default 240. |
| `formatValue` | `((value: number) => string)` | (value: number) =>
  new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value) | Formats values on the axis and in the tooltip. Default compact numbers (12K). |
| `showLegend` | `boolean` | true | Shows the legend under the chart. Default: when there are several series. |
| `showGrid` | `boolean` | true | Shows horizontal gridlines. Default true. |
| `hideYAxis` | `boolean` | false | Hides the value axis labels, e.g. in small cards. |
| `className` | `string` |  |  |

### DonutChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` |  |  |
| `hideTitle` | `boolean` |  |  |
| `description` | `ReactNode` |  |  |
| `data` | `{ label: string; value: number; color?: 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| undefined; }[]` |  | One slice per item. |
| `size` | `number` | 280 | Diameter in px. Default 200. |
| `thickness` | `number` | 0.28 | Ring thickness as a share of the radius, 0–1. 1 draws a pie. Default 0.28. |
| `centerValue` | `ReactNode` |  | Big figure in the middle, e.g. the total. |
| `centerLabel` | `ReactNode` |  | Caption under the center figure, e.g. "Total visits". |
| `formatValue` | `((value: number) => string)` | (value: number) =>
  new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value) |  |
| `showLegend` | `boolean` | true | Default true. |
| `className` | `string` |  |  |

### RadarChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` |  |  |
| `hideTitle` | `boolean` |  |  |
| `description` | `ReactNode` |  |  |
| `data` | `ChartRow[]` |  | One object per axis, e.g. `{ skill: 'Design', alice: 8, bob: 5 }`. |
| `axisKey` | `string` |  | Field holding each axis name. |
| `series` | `ChartSeries[]` |  |  |
| `max` | `number` |  | Largest value on every axis. Default: the largest value in the data. |
| `size` | `number` | 280 | Diameter in px. Default 280. |
| `showLegend` | `boolean` | true |  |
| `formatValue` | `((value: number) => string)` | (value: number) =>
  new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value) |  |
| `className` | `string` |  |  |

### Sparkline

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `number[]` |  | The values, oldest first. |
| `tone` | `1 \| "auto" \| "primary" \| "positive" \| "negative" \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | auto | Line color: `auto` (default) green when the last value is higher than the first and red when lower, or a fixed `primary`, `positive`, `negative` or series 1–8. |
| `area` | `boolean` | true | Fills the area under the line. Default true. |
| `height` | `number` | 48 | Height in px. Default 48. Width fills the container. |
| `label` | `string` |  | What the sparkline shows, e.g. "Revenue, last 12 months: rising". Without it, decorative. |
| `className` | `string` |  |  |

## Guidelines
- Do: Start bar charts at zero (they always do). Don’t: Compare bar lengths on a cut axis. Why: Bar length must be proportional to the value.
- Do: Keep to four series on a line chart and six slices on a donut. Don’t: Plot a dozen series in one chart. Why: Colors become hard to tell apart and the legend hard to match.
- Do: Say the takeaway in the description. Don’t: Leave people to work out what matters. Why: The description helps everyone, and is the summary for screen readers.

## Content
- Title: what is measured and over what, e.g. "Revenue, last 12 months".
- Description: the takeaway, e.g. "Revenue grew 38% over the year".
- Format values for reading with formatValue, e.g. currency and compact notation.

## Accessibility
- Role: figure named by its title, containing a slider over the data points and a hidden table.
- Tab: Focuses the plot.
- Arrow keys: Move to the previous or next point; its values are announced.
- Home / End: First or last point.
- Escape: Clears the selection.
- `role="slider" + aria-valuetext`: The plot; announces the active point.
- `aria-hidden on the SVG`: Always; the table and slider carry the data.
- `Hidden <table>`: Every chart, with every value.
- Focus: The plot shows the focus ring; the tooltip follows the active point.
- WCAG 1.1.1 Non-text Content: Each chart has a name, a description and a data table.
- WCAG 1.4.1 Use of Color: Series are also named in the legend, tooltip and table.
- WCAG 1.4.11 Non-text Contrast: Series colors meet 3:1 on the surface (checked in CI).
- WCAG 2.1.1 Keyboard: Every value is reachable with the arrow keys.
- Sparklines are decorative unless you give them a label.

## Examples
### Revenue over a year
Two series with currency values.

```tsx
import { LineChart } from '@ds/react';

<LineChart
  title="Revenue"
  data={months}
  xKey="month"
  series={[{ key: 'revenue', label: 'Revenue' }, { key: 'expenses', label: 'Expenses' }]}
/>
```

### Stacked bars
Totals made of parts.

```tsx
import { BarChart } from '@ds/react';

<BarChart title="Costs" stacked data={rows} xKey="month" series={[{ key: 'ads', label: 'Ads' }, { key: 'staff', label: 'Staff' }]} />
```

### Donut with a total
Traffic sources.

```tsx
import { DonutChart } from '@ds/react';

<DonutChart title="Traffic" data={[{ label: 'Direct', value: 42 }, { label: 'Search', value: 31 }]} centerValue="73" centerLabel="Visits" />
```

Tokens: `--chart-*` (values per theme in ai/components/charts.json).
