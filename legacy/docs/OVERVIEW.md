# Design System Documentation — Overview

A Storybook-like static documentation site for our Figma design token system. Shows all component variants, allows interactive testing of component properties, displays design tokens with visual previews, and is easily extensible.

## Project Structure

```
~/Desktop/design-system/
├── index.html                  ← App shell (sidebar + canvas + controls)
├── home.html                   ← Example homepage with Card component
├── assets/tokens.css           ← All design tokens as CSS variables
├── components/
│   ├── button.html             ← Button component documentation
│   ├── card.html               ← Card component documentation
│   ├── alert.html              ← Alert component documentation
│   └── avatar.html             ← Avatar component documentation
├── pages/
│   ├── tokens-colors.html      ← Color token docs
│   ├── tokens-typography.html  ← Typography token docs
│   ├── tokens-spacing.html     ← Spacing/sizing/effects token docs
│   └── tokens-borders.html     ← Border token docs
└── docs/                       ← This documentation
    ├── OVERVIEW.md             ← You are here
    ├── COMPONENT_WORKFLOW.md   ← Figma to HTML process
    ├── LAYOUT_SPECS.md         ← Page layout specifications
    ├── TOKEN_GUIDE.md          ← Token structure
    └── component-template.html ← Template for new components
```

## Quick Links

- **[COMPONENT_WORKFLOW.md](COMPONENT_WORKFLOW.md)** — How to push Figma changes to component documentation
- **[LAYOUT_SPECS.md](LAYOUT_SPECS.md)** — Page layout guidelines and visual specifications
- **[TOKEN_GUIDE.md](TOKEN_GUIDE.md)** — Design token structure and organization
- **[component-template.html](component-template.html)** — Template for creating new component pages

## Critical Rule: Figma is the Single Source of Truth

**ALL component styles MUST be 100% driven by Figma variables. NO exceptions.**

✅ **DO:**
- Use ONLY variables defined in Figma
- All components match Figma exactly (colors, spacing, typography, effects)
- Nested components inherit from their parent's Figma definition
- Controls section includes ALL Figma component properties
- Use `var(--token-name)` for all property values

❌ **DON'T:**
- Create custom CSS variables
- Use hardcoded hex colors, px values, shadows, or any design-related values
- Override component styles from Figma
- Mix variables from different variant combinations

## Pre-Delivery Checklist

- [ ] **All styles use component-specific tokens from tokens.css** — No hardcoded values anywhere
- [ ] Variable names match exactly what's bound in Figma (e.g., `--avatar-small-border-radius` not `--border-radius-8`)
- [ ] All CSS variables used are defined in `tokens.css` under the component's own section
- [ ] No hardcoded colors, sizes, paddings, borders, shadows, or design values
- [ ] All Figma variants are represented in galleries
- [ ] Code examples are copy-paste ready
- [ ] Sidebar navigation updated with new component link (both `includes/sidebar.html` and `assets/sidebar-loader.js`)
- [ ] Component tested in light/dark/grey backgrounds
- [ ] Component responds to hover, focus, active states
- [ ] All component images exported from Figma and saved to `assets/` folder
