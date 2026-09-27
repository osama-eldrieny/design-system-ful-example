# Component Workflow — Figma to HTML

## Critical Rules

**MANDATORY: Variable Extraction & Grouping by Variant**

When extracting variables from Figma component variants, follow this process to avoid assigning variables to wrong variants:

1. **Identify all variant axes** — Document the component's variant structure
   - Example for Button: Axes = [Variant (Primary/Secondary), Style (Filled/Text), State (Default/Hover/Focus/Disabled), Size (Small/Medium/Icon)]
   
2. **Extract variables for EACH variant combination** — Use Figma Console MCP figma_execute to:
   - Get the component set's all children (variants)
   - For EACH variant, inspect its boundVariables property
   - Document which variables are bound to which variant combination
   - Group variables by their axis (e.g., all Color variables together, all Padding variables together)

---

## Quick Prompt Template

**Use this simple prompt to create component documentation:**

```
Create documentation for [ComponentName] component
```

**Examples:**
- `Create documentation for Button component`
- `Create documentation for Card component`
- `Create documentation for Input Field component`

The workflow will automatically:
- Extract all variables and nested components from Figma
- Create the HTML documentation page with Controls, Specifications, and Code sections
- Use only CSS variables from tokens.css (zero hardcoded values)
- Update sidebar navigation in both required files

---

## Process: Push Figma Changes to Component Documentation

**WHEN:** You ask me to update design system documentation based on Figma changes

**CRITICAL:** 
- **Component itself** → Must be 100% identical to Figma (no deviations, no custom styling)
- **ALL component values MUST be CSS variables** — Zero hardcoded values
- **HTML MUST be 100% controlled by variables** — No inline styles with values, only var() references

---

## Step-by-Step Implementation

### 1. Create or Update Component Page

**Path:** `components/component-name.html`

Extract ALL component data from Figma using Figma Console MCP:
- ✅ All variants (every axis combination)
- ✅ All properties (every control option)
- ✅ All design tokens used (colors, spacing, typography, borders, shadows)
- ✅ **All variables bound to EACH variant** — Document which variables apply to which variant combinations
- ✅ All nested components and their properties
- ✅ All states (hover, active, disabled, error, etc.)
- ✅ **Extract component images from Figma** — If the component uses images (avatars, product photos, thumbnails, etc.), export them from Figma using `figma_execute` with `exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 4 } })`, save to `assets/` folder with descriptive names (e.g., `avatar-1.png`, `product-image.png`), and reference them in the component HTML page. Never use placeholder text or images from other components.

### 2. CSS Variables from tokens.css (MANDATORY)

**Source of Truth:** All component styles MUST come ONLY from the component-specific section in `assets/tokens.css`

**Rules:**
1. **No Hardcoded Values** — ZERO hardcoded colors, sizes, paddings, borders, shadows, or any design values
2. **Component-Specific Tokens Only** — Use variables from the component's own section in tokens.css
   - Example: For Button component, use variables from the `/* Button */` section in tokens.css
   - Example: For Avatar component, use variables from the `/* Avatar */` section in tokens.css
3. **Variable Names Must Match Figma** — Variable names MUST exactly match what's bound to the component in Figma
   - If Figma binds `--button-primary-default-bgcolor`, use exactly that in HTML
   - Never create custom variable names or rename Figma variables
4. **Every Style Value Uses var()** — All inline styles and CSS classes must use only `var(--token-name)`
   - `style="background: var(--button-primary-default-bgcolor);"` ✅
   - `style="background: #FF0000;"` ❌
   - `style="padding: 12px;"` ❌

**Example:**
```html
<!-- Button component using its own tokens -->
<button style="
  background: var(--button-primary-filled-default-bgcolor);
  color: var(--button-primary-filled-default-textcolor);
  padding: var(--button-padding-x) var(--button-padding-y);
  border-radius: var(--button-medium-border-radius);
  border: none;
">
  Click me
</button>
```

### 2b. HTML Must Be 100% Variable-Driven & Variant-Aware

- Use inline style with ONLY var() references
- NO hardcoded values in style attributes
- NO inline color hex codes, NO direct px values, NO direct color names
- All styling must reference CSS variables defined in tokens.css
- This ensures 100% sync with Figma at all times

**Apply variables that match the variant context:**
- For Primary Filled buttons: Use `--button-primary-default-*`, `--button-primary-hover-*`, etc.
- For Secondary Text buttons: Use `--button-secondary-text-default-*`, `--button-secondary-text-hover-*`, etc.
- Never mix variables from different variant combinations (e.g., don't use Primary colors for Secondary buttons)
- Use CSS class naming to make variant binding explicit: `.btn--primary-filled` uses primary+filled variables
- Your source of truth is Figma

### 3. Update Controls Section

Include EVERY property from Figma:
- One control for each variant axis, property, and state option
- Allow real-time preview updates via JavaScript/postMessage

### 4. Update Code Section

React/TypeScript implementation:
- Reflect all current variants and properties
- Update dynamically based on control changes

### 5. Add Professional Documentation Sections (Storybook-style)

**Design Specifications table:**
- Size, padding, font size, line height, border radius, etc.

**Component Properties/Props table:**
- All component properties with types and defaults

**VARIANT SECTIONS** — Mirror the Controls Structure (CRITICAL)
- Create a dedicated section for EACH control dimension in the Controls panel
- Each section MUST:
  - Have a section title matching the control name (e.g., "Variant", "Style", "Size", "State")
  - Have a background color/styling to visually distinguish it from other sections
  - Contain ONLY the variants for that specific control dimension
  - Display each variant visually in a gallery/grid format
  - Show the actual component rendering for each option
- Example for Button with controls [Variant, Style, Size, State]:
  - Section 1: "Variant" — Shows Primary, Secondary variants only
  - Section 2: "Style" — Shows Filled, Text styles only
  - Section 3: "Size" — Shows Small, Medium, Icon Only sizes only
  - Section 4: "State" — Shows Default, Hover, Focus, Disabled states only

**Nested Components documentation:**
- If component contains other components

**React/Code Implementation:**
- TypeScript interface, usage examples, all props

**Design Guidelines:**
- When/where to use this component, best practices

### 6. Update Sidebar Navigation (REQUIRED)

**MANDATORY: Update BOTH sidebar files for NEW components:**
When creating a new component documentation page, ALWAYS add an entry to:
1. `includes/sidebar.html` — The source of truth file
2. `assets/sidebar-loader.js` — The hardcoded sidebar HTML in the `loadSidebarDirect()` function (lines 9-21)

Insert alphabetically in the "Components" group. 

**Format for sidebar.html:** `<a class="sidebar-link" href="components/component-name.html">Component Name</a>`

**Format for sidebar-loader.js (NO `../` prefix):** `<a class="sidebar-link" href="components/component-name.html">Component Name</a>` (the loader adds the path dynamically)

This ensures the new page is discoverable from every other page in the documentation site.

---

## Component Properties & Variables

### Text Content Variables
When component has text or label that changes:
- Use `data-*` attributes or input controls
- Update via JavaScript: `element.textContent = value`
- Never hardcode text in HTML

### State Properties
When component has multiple states (default, hover, focus, disabled):
- Define CSS variables for each state: `--component-state-property`
- Use CSS classes to apply state styles: `.component--hover`, `.component--focus`
- JavaScript toggles classes based on user interaction or control selection

### Variant Mixing Rule
**CRITICAL:** Never apply variables from different variant families to the same component instance.

❌ WRONG: Button using Primary colors + Secondary padding
✅ RIGHT: Button using ALL Primary-filled-medium variables OR ALL Secondary-text-small variables
