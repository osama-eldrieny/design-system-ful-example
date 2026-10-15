# MetricCard

> A key figure in a card for dashboards: what is measured, the value, how it changed and against what, with an optional featured icon, a small chart, an actions menu and a footer link.

Status: stable · Category: Data display · Since 1.1.0

```tsx
import { MetricCard } from '@ds/react';
```

## When to use
- At the top of a dashboard, for the three to five numbers that matter most.
- To show a value with its trend and comparison period.

## When not to use
- For a figure inside text or a list without a card. Use Stat.
- For many values to compare. Use Table or a chart.

## Trend style (`trendStyle`)
- `simple`: Colored arrow and text; the quietest.
- `badge`: A tinted pill. Default.
- `modern`: A neutral pill with a colored trend line icon.

## Layout (`layout`)
- `vertical`: Icon and actions above the figures. Default.
- `horizontal`: Icon beside the figures; shorter cards.

## Size (`size`)
- `small`: Smaller value, for dense dashboards.
- `medium`: Default.

## Trend (`trend`)
- `up`: Rising; green unless positive is false (e.g. costs).
- `down`: Falling; red unless positive is true (e.g. churn).
- `neutral`: No direction. Default.

## Icon style (`iconAppearance`)
- `modern`: Neutral tile with a border. Default.
- `light`: Tinted background.
- `solid`: Filled, for the strongest emphasis.
- `outline`: Concentric rings.

## Icon color (`iconTone`)
- `primary`: Brand. Default.
- `secondary | success | warning | danger`: A meaning.
- `gray | blue | sky | indigo | purple | pink | orange | teal`: One hue per metric.

## States
- **Static**: The card itself is not interactive; its actions are. (—)

## Props
### MetricCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | What is measured, e.g. "Total revenue". |
| `value` | `ReactNode` |  | The figure, formatted, e.g. "$124,567". |
| `change` | `ReactNode` |  | Change since the previous period, e.g. "12%". |
| `trend` | `"up" \| "down" \| "neutral"` | neutral | Direction of the change. Default neutral. |
| `positive` | `boolean` |  | Whether the change is good news. Default: up is good. Use false for e.g. costs rising. |
| `trendStyle` | `MetricTrendStyle` | badge | `simple` arrow and text, `badge` (default) a tinted pill, `modern` a neutral pill. |
| `comparison` | `ReactNode` |  | Context for the change, e.g. "vs last month". |
| `icon` | `ReactNode` |  | An icon shown in a featured icon at the top (or start, when horizontal). |
| `iconTone` | `BadgeColor` | primary | Color of the featured icon. Default primary. |
| `iconAppearance` | `FeaturedIconAppearance` | modern | Look of the featured icon. Default modern. |
| `chart` | `ReactNode` |  | A small chart beside the value, e.g. a Sparkline. Decorative: the value carries the meaning. |
| `actions` | `ReactNode` |  | Actions at the top end, e.g. a DropdownMenu with an IconButton trigger. |
| `footer` | `ReactNode` |  | Under a divider, e.g. a "View report" link. |
| `layout` | `"vertical" \| "horizontal"` | vertical | `vertical` (default) icon above, `horizontal` icon beside the figures. |
| `size` | `"small" \| "medium"` | medium | `small` for dense dashboards, `medium` (default). |
| `trendLabels` | `{ up?: string; down?: string; } \| undefined` |  | Words announced for the trend, for translation. |

## Guidelines
- Do: Show three to five metrics in a row. Don’t: Fill a page with a dozen metric cards. Why: Fewer figures are easier to compare at a glance.
- Do: Set positive={false} for metrics where up is bad. Don’t: Show rising costs in green. Why: Color should match whether the change is good news.
- Do: Pair a trend with its comparison period. Don’t: Show "12%" with no context. Why: A change means little without what it is compared to.

## Content
- Label: a short noun phrase, e.g. "Total revenue", not "Revenue total for the month".
- Format values for reading: "$124.5k" or "$124,567", with the unit.
- Comparison: name the period, e.g. "vs last month".

## Accessibility
- Role: article containing a description list (dt label, dd value).
- Tab: Moves to actions and footer links, if any.
- `Visually hidden "increased" / "decreased"`: With a trend; translate with trendLabels.
- `aria-hidden on the chart`: Always; it is decorative.
- Focus: The card is not focusable; its actions and links are.
- WCAG 1.4.1 Use of Color: The trend is also an arrow and announced in words.
- WCAG 1.4.3 Contrast (Minimum): Text meets 4.5:1 in every theme (checked in CI).
- Give IconButton actions a label, e.g. "More options for Total revenue".

## Examples
### Revenue
Value, trend and comparison.

```tsx
import { MetricCard } from '@ds/react';

<MetricCard label="Total revenue" value="$124,567" change="12%" trend="up" comparison="vs last month" />
```

### With an icon and actions
A featured icon and a menu.

```tsx
import { IconButton, MetricCard } from '@ds/react';
import { MoreVertical, Users } from 'lucide-react';

<MetricCard
  label="Active users"
  value="2,420"
  change="40%"
  trend="up"
  icon={<Users />}
  actions={<IconButton icon={<MoreVertical />} label="More options" appearance="ghost" />}
/>
```

### With a sparkline
A small chart beside the value.

```tsx
import { MetricCard, Sparkline } from '@ds/react';

<MetricCard label="Orders" value="1,210" change="4%" trend="down" chart={<Sparkline data={[4, 6, 5, 8, 7, 9]} />} />
```

Tokens: `--metric-card-*` (values per theme in ai/components/metric-card.json).
