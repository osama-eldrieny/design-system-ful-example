# Design System Documentation

A Storybook-like static documentation site for our Figma design token system.

## Quick Links

- **[Overview](docs/OVERVIEW.md)** — Project structure and critical rules
- **[Component Workflow](docs/COMPONENT_WORKFLOW.md)** — How to push Figma changes to documentation
- **[Layout Specifications](docs/LAYOUT_SPECS.md)** — Page layout and visual guidelines
- **[Token Guide](docs/TOKEN_GUIDE.md)** — Token structure and usage
- **[Component Template](docs/component-template.html)** — Template for creating new component pages

## The One Critical Rule

**Figma is the single source of truth.**

All component styles MUST be 100% driven by Figma variables using CSS variables (`var(--token-name)`). Never hardcode values.

## Quick Start: Create Component Documentation

**Simple Prompt:**
```
Create documentation for [ComponentName] component
```

**Examples:**
- `Create documentation for Button component`
- `Create documentation for Card component`
- `Create documentation for Input Field component`

The workflow will automatically:
1. Extract all variables and nested components from Figma using Figma Console MCP
2. Create `components/component-name.html` with Controls, Specifications, and Code sections
3. Use only CSS variables from `tokens.css` (zero hardcoded values)
4. Update sidebar navigation in both `includes/sidebar.html` and `assets/sidebar-loader.js`
5. Test in light/dark/grey backgrounds and all states

See [Component Workflow](docs/COMPONENT_WORKFLOW.md) for detailed process.

## Pre-Delivery Checklist

- [ ] All Figma variants represented in galleries
- [ ] All CSS variables used (no hardcoded values)
- [ ] All component images exported from Figma
- [ ] Code examples are copy-paste ready
- [ ] Sidebar updated in both files
- [ ] Component tested in all backgrounds and states
