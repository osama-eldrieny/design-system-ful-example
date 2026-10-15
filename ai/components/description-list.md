# DescriptionList

> Pairs of labels and values, such as an invoice summary, order totals or account details. An emphasised row sets a total apart.

Status: stable · Category: Data display · Since 1.3.0

```tsx
import { DescriptionList } from '@ds/react';
```

## When to use
- For key–value details: an invoice, an order summary, a profile.
- For totals, with the final row emphasised.

## When not to use
- For many records with the same columns. Use Table.
- For a single key figure with a trend. Use Stat.
- For editable settings. Use SettingsList.

## Layout (`layout`)
- `horizontal`: Default. Terms on the start, values on the end.
- `stacked`: Values under their terms, for narrow columns.

## Dividers (`divided`)
- `false`: Default. Spaced rows.
- `true`: A line between rows.

## Emphasis (`emphasis`)
- `false`: Default. A regular row.
- `true`: A total: bold, with a line above it.

## States
- **Static**: Read-only details. (—)

## Props
### DescriptionList

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `DescriptionListItem[]` |  |  |
| `layout` | `DescriptionListLayout` | horizontal | `horizontal` (default) puts terms and values side by side; `stacked` puts values under terms. |
| `divided` | `boolean` | false | Draws a line between rows. |

## Guidelines
- Do: Emphasise only the total. Don’t: Bold several rows. Why: One emphasised row tells the reader where the answer is.
- Do: Keep terms short and in the same order as the calculation. Don’t: Mix totals and line items without a divider. Why: The order shows how the total was reached.
- Do: Use stacked layout in narrow columns. Don’t: Squeeze terms and values side by side in a 240px panel. Why: Stacked layout keeps long values readable.

## Content
- Name terms as the reader would: "Subtotal", "VAT (10%)".
- Format amounts with the currency and the same number of decimals.

## Accessibility
- Role: definition list (dl) with term and description pairs.
- —: No keyboard interaction; use the controls inside, if any.
- Focus: Static content; no focus stops.
- WCAG 1.3.1 Info and Relationships: Terms and descriptions are real dt and dd elements.
- WCAG 1.4.3 Contrast: Secondary terms pass AA on every surface in every theme.
- Emphasis is shown by weight and a line, not color alone.

## Examples
### Order totals
Line items with an emphasised total.

```tsx
import { DescriptionList } from '@ds/react';

<DescriptionList
  divided
  items={[
    { term: 'Subtotal', description: '$1,100.00' },
    { term: 'VAT (10%)', description: '$110.00' },
    { term: 'Total', description: '$1,210.00', emphasis: true },
  ]}
/>
```

### Account details
Stacked for a narrow panel.

```tsx
import { DescriptionList } from '@ds/react';

<DescriptionList layout="stacked" items={[{ term: 'Email', description: 'maya@orbit.app' }]} />
```

### Profile
Plain key–value pairs.

```tsx
import { DescriptionList } from '@ds/react';

<DescriptionList items={[{ term: 'Role', description: 'Designer' }, { term: 'Team', description: 'Design systems' }]} />
```

Tokens: `--description-list-*` (values per theme in ai/components/description-list.json).
