# FeaturedIcon

> An icon in a colored circle or tile that draws the eye and sets the tone of a block: the top of a modal, an empty state, an alert, a metric card or a feature list. Four appearances, thirteen colors and four sizes.

Status: stable · Category: Data display · Since 1.1.0

```tsx
import { FeaturedIcon } from '@ds/react';
```

## When to use
- At the top of a modal or empty state, to signal its kind (success, warning, delete).
- In metric cards and feature lists, to make each item recognizable at a glance.
- Next to a notification or activity item, when there is no avatar.

## When not to use
- For a clickable icon. Use IconButton.
- For a person or team. Use Avatar.
- For a small inline status. Use Badge with withDot.

## Appearance (`appearance`)
- `light`: Tinted background, colored icon. Default.
- `solid`: Filled, for the strongest emphasis.
- `outline`: Concentric rings, e.g. in a toast or alert.
- `modern`: Neutral tile with a border; works on any surface.

## Color (`tone`)
- `primary`: Brand. Default.
- `success | warning | danger`: Outcome of an action.
- `secondary`: Neutral.
- `gray | blue | sky | indigo | purple | pink | orange | teal`: Categories, e.g. one hue per metric.

## Size (`size`)
- `small`: 32px, in lists and notifications.
- `medium`: 40px. Default, in cards.
- `large`: 48px, at the top of modals.
- `xlarge`: 56px, in empty states.

## Shape (`shape`)
- `circle`: Default.
- `square`: Rounded square, follows the radius theme.

## States
- **Static**: Not interactive. (—)

## Props
### FeaturedIcon

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` |  | The icon, e.g. a lucide-react icon. |
| `tone` | `BadgeColor` | primary | Color: a meaning (primary default, success, warning, danger, secondary) or a category hue. |
| `appearance` | `FeaturedIconAppearance` | light | `light` (default) tinted background, `solid` filled, `outline` concentric rings, `modern` a neutral tile with a border. |
| `size` | `FeaturedIconSize` | medium | `small` 32px, `medium` 40px (default), `large` 48px, `xlarge` 56px. |
| `shape` | `"circle" \| "square"` | circle | `circle` (default) or `square` with rounded corners. |
| `label` | `string` |  | What the icon means, when it isn't said in nearby text. Without it the icon is decorative and hidden from screen readers. |

## Guidelines
- Do: Use one featured icon per block. Don’t: Put featured icons on every list item in a dense table. Why: They draw attention; too many and nothing stands out.
- Do: Match the tone to the meaning (danger for delete). Don’t: Use danger red as decoration. Why: Color carries meaning across the system.
- Do: Give it a label when nothing nearby says what it means. Don’t: Label it when a heading next to it already says the same. Why: Screen readers would read the same thing twice.

## Content
- Pick an icon that matches the heading next to it, e.g. a trash can for "Delete project?".
- Use the same tone as the action: danger for destructive dialogs, success for completion.

## Accessibility
- Role: None (hidden) by default; img with label.
- —: Not focusable.
- `aria-hidden="true"`: Default: decorative.
- `role="img" + aria-label`: When label is set.
- Focus: Not focusable.
- WCAG 1.4.11 Non-text Contrast: Icon colors meet 3:1 on their background in every brand and mode (checked in CI).
- Don’t rely on the color alone: the icon shape and nearby text carry the meaning.

## Examples
### Basic
A tinted icon in a card.

```tsx
import { FeaturedIcon } from '@ds/react';
import { Zap } from 'lucide-react';

<FeaturedIcon icon={<Zap />} />
```

### Delete dialog
Danger, large, at the top of a confirm dialog.

```tsx
import { FeaturedIcon } from '@ds/react';
import { Trash2 } from 'lucide-react';

<FeaturedIcon icon={<Trash2 />} tone="danger" size="large" />
```

### Modern tile
Neutral, for metric cards.

```tsx
import { FeaturedIcon } from '@ds/react';
import { Users } from 'lucide-react';

<FeaturedIcon icon={<Users />} appearance="modern" shape="square" />
```

Tokens: `--featured-icon-*` (values per theme in ai/components/featured-icon.json).
