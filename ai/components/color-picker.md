# ColorPicker

> A row of color swatches to choose one from, such as a label or calendar color, with an optional custom color from the system picker.

Status: stable · Category: Forms · Since 1.2.0

```tsx
import { ColorPicker } from '@ds/react';
import { ColorSwatch } from '@ds/react';
```

## When to use
- To pick a color for something people own, e.g. a tag, project or calendar.
- When a short, curated set of colors covers most needs.

## When not to use
- To choose between options that only happen to have colors. Use RadioGroup.
- To change the product’s theme. Use ThemeProvider.

## Size (`size`)
- `small`: In menus, popovers and toolbars.
- `medium`: Default.

## Custom color (`allowCustom`)
- `false`: Default. Only the given swatches.
- `true`: Adds a swatch that opens the system color picker.

## States
- **Default**: A color that can be chosen. (—)
- **Hover**: The swatch grows slightly. (:hover.)
- **Focus**: Shows which swatch the keyboard is on. (:focus-visible.)
- **Selected**: The chosen color, with a ring and check. (value matches.)
- **Disabled**: The color cannot be changed. (disabled prop.)

## Props
### ColorPicker

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the choice, e.g. "Label color". Shown as the legend. |
| `swatches` | `ColorSwatch[]` |  | Colors to choose from. |
| `value` | `string` |  | The chosen color (controlled). |
| `defaultValue` | `string` |  |  |
| `onValueChange` | `((value: string) => void)` |  |  |
| `allowCustom` | `boolean` | false | Adds a "Custom" swatch that opens the system color picker. |
| `customLabel` | `string` | Custom color | Words for the custom swatch. Default "Custom color". |
| `hideLabel` | `boolean` | false | Hides the legend visually (it is still announced). |
| `size` | `ColorPickerSize` | medium | `small` in menus and toolbars, `medium` (default). |
| `disabled` | `boolean` |  |  |

### ColorSwatch

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Give each swatch a name. Don’t: Leave screen-reader users with hex codes or nothing. Why: The name is what people hear and see in the tooltip.
- Do: Offer a curated set that works in light and dark themes. Don’t: Offer any color by default. Why: Curated colors keep text on them readable.
- Do: Show the chosen color wherever it is used right away. Don’t: Hide the result until a Save button is pressed. Why: Seeing the color in place helps people decide.

## Content
- Name every swatch in plain words: "Blue", not "#2563eb".
- Keep the set short, eight to twelve colors.
- Use a legend that says what the color is for.

## Accessibility
- Role: group (a fieldset with a legend) of native radio inputs.
- Tab: Moves to the chosen swatch, then to the custom swatch.
- Arrow keys: Choose the previous or next swatch.
- Enter / Space: On the custom swatch, opens the system picker.
- `aria-label`: On each swatch, from its name.
- Focus: A focus ring appears outside the selection ring.
- WCAG 1.4.1 Use of Color: Every swatch has a name; the chosen one has a ring and check, not just color.
- WCAG 2.1.1 Keyboard: Native radio keyboard behavior.
- WCAG 4.1.2 Name, Role, Value: Radios named by color, grouped by the legend.
- The check has an outline so it reads on light and dark swatches.

## Examples
### Label color
A controlled picker.

```tsx
import { ColorPicker } from '@ds/react';

<ColorPicker
  label="Label color"
  swatches={[{ value: '#2563eb', name: 'Blue' }, { value: '#16a34a', name: 'Green' }]}
  value={color}
  onValueChange={setColor}
/>
```

### With a custom color
Adds the system color picker.

```tsx
import { ColorPicker } from '@ds/react';

<ColorPicker label="Project color" swatches={swatches} allowCustom />
```

### In a menu
Small, with the legend hidden because the menu already says it.

```tsx
import { ColorPicker } from '@ds/react';

<ColorPicker label="Highlight" swatches={swatches} size="small" hideLabel />
```

Tokens: `--color-picker-*` (values per theme in ai/components/color-picker.json).
