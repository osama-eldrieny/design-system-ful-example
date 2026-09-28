# Token Structure & Reference

## Overview

All design tokens are defined as CSS variables in `assets/tokens.css`. These variables are the direct reflection of Figma variables and must never be hardcoded in component styles.

## Token Organization

Tokens are grouped by category and purpose:

### Color Tokens
- Component-specific colors (button, card, alert, etc.)
- Organized by component, variant, state, and property
- Example: `--button-primary-default-bgcolor`, `--button-primary-hover-textcolor`
- Reference Figma component structure exactly

### Typography Tokens
- Font families
- Font sizes
- Font weights
- Line heights
- Letter spacing
- Text transforms

### Spacing Tokens
- Padding values
- Margin values
- Gap values
- Sizing values
- Organized by component and context

### Border Tokens
- Border radius values
- Border width values
- Border styles
- Border colors

### Effect Tokens
- Shadow values
- Opacity values
- Blur values
- Transform values

## Naming Convention

All token names follow this pattern:
```
--[component]-[variant]-[state]-[property]
```

**Examples:**
- `--button-primary-default-bgcolor` (button component, primary variant, default state, background color)
- `--card-padding-y` (card component, vertical padding)
- `--alert-error-border-radius` (alert component, error state, border radius)
- `--typography-body-font-size` (typography, body context, font size)

## Using Tokens in HTML

**ALL component styling must use CSS variables. Never hardcode values.**

```html
<!-- ✅ CORRECT -->
<button style="background: var(--button-primary-default-bgcolor); color: var(--button-primary-default-textcolor);">
  Click Me
</button>

<!-- ❌ WRONG -->
<button style="background: #916DFF; color: #FFFFFF;">
  Click Me
</button>

<!-- ❌ WRONG -->
<button class="btn" style="background-color: purple;">
  Click Me
</button>
```

## Token Values

All token values are defined in `assets/tokens.css` and mapped directly to Figma variables.

## Updating Tokens

When Figma variables change:

1. **Update `assets/tokens.css`** — Modify the CSS variable value
2. **Update component pages** — No changes needed if you're already using `var()` references
3. **Verify in browser** — Changes apply automatically

**Never:**
- Create new tokens without Figma approval
- Change token names without updating all references
- Use hardcoded values alongside token definitions
- Shadow tokens with locally-scoped CSS variables

## Token Coverage Checklist

When adding a new component:

- ✅ All colors from Figma component have CSS variables defined
- ✅ All spacing (padding, margin, gap) has CSS variables
- ✅ All typography values (size, weight, line-height) have CSS variables
- ✅ All effects (shadows, opacity) have CSS variables
- ✅ All sizes (width, height) have CSS variables
- ✅ No hardcoded values in HTML or CSS
- ✅ Token names match Figma variable structure
- ✅ Each variant combination has its own tokens
