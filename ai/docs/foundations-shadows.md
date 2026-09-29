# Shadows & elevation

Shadows show which surfaces sit above others. The **shadow** theme axis sets how pronounced they are: **flat** (default, no shadows), **subtle**, **default** or **raised**. Shadow color comes from `--color-shadow-surface`, so it follows brand and mode.

## Shadow scale

Offsets and blur for low, medium and high elevation.

## What changes with the shadow theme

## Elevation levels

| Level   | Use for                             | Layer                        |
| ------- | ----------------------------------- | ---------------------------- |
| Resting | Cards and sections on the page      | `--z-base`                   |
| Raised  | Dropdowns, popovers, sticky headers | `--z-dropdown`, `--z-sticky` |
| Overlay | Modals, drawers                     | `--z-overlay`, `--z-modal`   |
| Top     | Toasts and tooltips                 | `--z-toast`, `--z-tooltip`   |

With the flat theme, borders and background contrast (`--color-bg-surface` on `--color-bg-default`) carry the separation instead of shadows.
