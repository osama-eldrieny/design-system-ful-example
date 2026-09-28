# Layout Specifications & Visual Guidelines

## Page Layout Structure

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER (Title + Description)                                      │
└──────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┬──────────────┐
│ PREVIEW SECTION HEADING (Left)                     │ CONTROLS     │
│                                                    │ (Right)      │
│  PREVIEW AREA (75%)                                │ HEADING      │
│  (Center + BG Switcher above)                      │              │
│  • Background switcher buttons                     │  • Variant   │
│  • Large preview box (min 400px height)            │  • Style     │
│  • Same height as Controls panel                   │  • Size      │
│                                                    │  • State     │
│                                                    │  • Label     │
└────────────────────────────────────────────────────┴──────────────┘

SECTION TITLE (Outside Box)
┌──────────────────────────────────────────────────────────────────┐
│ Section Content (Box)                                             │
└──────────────────────────────────────────────────────────────────┘

SECTION TITLE (Outside Box)
┌──────────────────────────────────────────────────────────────────┐
│ Section Content (Box)                                             │
└──────────────────────────────────────────────────────────────────┘
```

## Layout Rules (REQUIRED for All Pages)

### 1. Header Section
- **Title:** 64px font size, 900 weight, #312E81, margin-bottom 24px
- **Description:** 18px font size, 500 weight, #6366F1, margin-bottom 60px
- Max-width 600px for description text
- Line-height 1.6

### 2. Preview + Controls Container
- **Layout:** 2-column grid (`grid-template-columns: 3fr 1fr`)
- **Preview area:** 75% width (LEFT side)
- **Controls panel:** 25% width (RIGHT side)
- **Gap between sections:** 32px
- **Same height:** Both sections must be equal height (`align-items: stretch`)
  - Preview section: `min-height: 400px`, `flex: 1`, `display: flex`, `flex-direction: column`
  - Controls section: `flex: 1`, `display: flex`, `flex-direction: column` (NEVER use `height: fit-content`)

### 3. Preview & Controls Headings
- **Position:** INSIDE the grid layout, ABOVE their respective boxes
- **Left heading:** "Preview" or "Component Preview" (above preview section)
- **Right heading:** "Controls" or "Configuration" (above controls section)
- **Styling:** 16px, 600 weight, #312E81, uppercase
- **Gap:** 12px below heading before the white box starts
- Use CSS grid to position headings above their sections

### 4. All Section Headings — Consistent Styling (CRITICAL)

**Apply to ALL headings on the page:** Header title, Preview/Controls headings, Section titles

- **Font family:** 'Inter', sans-serif
- **Font size:** 24px (section titles), 16px (preview/controls headings), 64px (main header)
- **Font weight:** 700 (section titles/preview/controls), 900 (main header)
- **Color:** #312E81 (dark indigo)
- **Letter spacing:** -0.05em (main header), normal (others)
- **Line height:** 1 (main header), auto (others)
- **Text transform:** uppercase (preview/controls headings)
- **Text case:** none

**Margin & Spacing Rules:**
- Main header title: margin-bottom 24px
- Main header description: margin-bottom 60px for whole header
- Preview/Controls headings: margin-bottom 12px before the white box
- Section titles (Variant, Style, Size, State, etc.): margin 60px 0 32px 0
- First section title: margin-top 0

**Visual Consistency Checklist:**
- ✅ All section titles use `.section-title` class (24px, #312E81, margin 60px 0 32px 0)
- ✅ Preview/Controls headings use `.section-heading` class (16px, uppercase, #312E81)
- ✅ No custom inline heading styles - always use CSS classes
- ✅ All titles follow indigo color palette (#312E81)
- ✅ Font weights: 900 (main header), 700 (sections), 600 (preview/controls)
- ✅ Spacing consistent: 60px between major sections, 12px for preview/controls

### 5. Section Headings
- **Position:** OUTSIDE the white box
- **Margin:** 60px 0 32px 0
- **Font:** 24px, 700 weight, #312E81

### 6. Section Content Boxes
- **Background:** white
- **Border:** 1px solid rgba(99, 102, 241, 0.15)
- **Border-radius:** 12px
- **Padding:** 32px
- **Box-shadow:** 0 8px 32px rgba(79, 70, 229, 0.05)
- **Margin-bottom:** 60px

### 7. Spacing System
- **Between major sections:** 60px
- **Between items within section:** 32px
- **Between controls:** 20px
- **Between headings and content:** 12px

### 8. Colors
- Use Indigo palette for documentation (#4F46E5, #6366F1, gradients)
- Never mix with component colors (which use Figma tokens)

### 9. Tables
- **Background:** white
- **Border:** 1px solid rgba(99, 102, 241, 0.15)
- **Border-radius:** 12px
- **Box-shadow:** 0 8px 32px rgba(79, 70, 229, 0.05)
- **Padding:** 16px per cell
- **Hover effect:** Background rgba(79, 70, 229, 0.03)
- **Margin-bottom:** 60px
- **Header background:** rgba(79, 70, 229, 0.05)
- **Header border-bottom:** 2px solid rgba(79, 70, 229, 0.15)

### 10. Code Blocks
- **Background:** #24202D
- **Color:** #E0DEE8
- **Padding:** 24px
- **Border-radius:** 8px
- **Font-family:** 'JetBrains Mono', monospace
- **Font-size:** 12px
- **Line-height:** 1.5
- **Box-shadow:** 0 8px 32px rgba(0, 0, 0, 0.1)
- **Margin-bottom:** 60px
- **Overflow:** auto

### 11. Responsive Design
- **Stacks vertically at 1024px and below** (100% width each)
- **Preview + Controls grid becomes single column**
- Adjust font sizes at 768px and below

---

## Background Switcher

**Location:** Above preview area

**Buttons:**
- Light (white background)
- Light Grey (#F3F4F6 background)
- Dark (#1F2937 background)

**Styling:**
- Padding: 8px 16px
- Border: 2px solid rgba(99, 102, 241, 0.2)
- Background: white (inactive), #4F46E5 (active)
- Border-radius: 6px
- Font-size: 12px
- Font-weight: 600
- Color: #312E81 (inactive), white (active)
- Transition: all 200ms ease

**Active state:**
- Background: #4F46E5
- Color: white
- Border-color: #4F46E5

---

## Interactive Component Behavior

### Hover State
- When user hovers over component, it automatically displays hover styling (color change, shadow, etc.)
- Use CSS `:hover` pseudo-class for natural browser behavior

### Focus State
- When user clicks on component or tabs to it with keyboard, it displays focus state with visible outline
- Use CSS `:focus-visible` for keyboard navigation
- Always include visible focus indicator (outline or ring)

### Active/Pressed State
- When user clicks and holds on component, it displays active/pressed visual feedback
- Use CSS `:active` pseudo-class

### Disabled State
- When state control is set to "disabled", component is non-interactive and visually dimmed
- Use HTML `disabled` attribute
- Apply visual styling to show disabled state

### State Control Synchronization
- State control dropdown allows manual selection of specific states for documentation
- When user selects "Hover" in controls, apply CSS class to force hover appearance
- When user selects "Focus" in controls, apply CSS class to force focus appearance
- When user selects "Default" in controls, remove forced state classes
- Allow real user interaction to override/supplement the State control

### CSS Classes for State Control
- `.btn--hover` forces hover state appearance via CSS `!important`
- `.btn--focus` forces focus state appearance via CSS `!important`
- `.btn--disabled` forces disabled state via CSS `!important`
- These classes override natural pseudo-classes when State control is actively set

---

## Interactive Controls (Right Panel — 25% Width)

**Place ALL controls in RIGHT panel:**
- Variant, Style, Size, State, Label, etc.

**Layout:**
- Compact layout with limited spacing
- Stack controls vertically with 20px gaps
- Use dropdown selects or text inputs (full width)
- Update preview LIVE as user changes controls

**Default Size Selection:**
- Size control MUST default to "Medium"
- Medium is the most representative size for component documentation
- Preview area shows "Medium" size component by default on page load
- Size dropdown in controls panel has "Medium" selected by default
- This ensures visitors immediately see the standard component variant

---

## Variant Sections & Galleries

### Section Naming
- Use property names DIRECTLY, not "Variants by X"
- ❌ DON'T: "Variants by Variant", "Variants by Style", "Variants by Size", "Variants by State"
- ✅ DO: "Variant", "Style", "Size", "State"
- Section title should be concise and match the control name exactly

### Variant Galleries
- Gallery grids are content INSIDE section boxes, not separate boxes
- Use `grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))`
- Each variant-item shows preview + label

### Variant Preview Items
- NO borders, NO background colors
- `.variant-preview` should be transparent/invisible containers
- Components render directly inside with NO visual box around them
- Only the component itself (button, card, etc.) is visible, not the container

---

## Section Boxes

- **Background:** white
- **Border:** 1px solid rgba(99, 102, 241, 0.15)
- **Border-radius:** 12px
- **Padding:** 32px
- **Box-shadow:** 0 8px 32px rgba(79, 70, 229, 0.05)
- Apply CSS class: `section-box` (identical styles to `preview-section`)

**For inner content:**
- If inner content needs visual separation, make boxes borderless and transparent (no border, no bg-color)
- Maintains visual consistency across all sections

**Tables inside sections:**
- Do NOT put tables inside section boxes
- Tables should be standalone with their own border/shadow styling
- Apply table class directly with margin-bottom: 60px

---

## React/Code Implementation

### Copy-Paste Ready
- Code must be immediately usable for developers
- Include all necessary imports
- Show complete working example
- Don't use pseudo-code or abbreviated syntax
- Include JSX return statement clearly

### Proper Nesting & Formatting (CRITICAL)
- **Use 2-space indentation** for all nested elements
- **Break lines at logical boundaries:**
  - Import statements: each on separate line or grouped logically
  - Function parameters: one per line if more than 2
  - JSX elements: each tag on own line with proper indentation
  - Object literals: one property per line
- **Use const/arrow functions consistently**
- **Include full type definitions (TypeScript/JSDoc)**
- **Show both simple (default) and advanced (all props) usage examples**
- **Every line must be readable** — no line should be >80 characters when possible

### Code Block Syntax Highlighting (NO external libraries)

**HTML Markup:**
- Use `<div class="code-block">` instead of `<pre><code>` tags
- Add line breaks manually with `<br>` tags
- Wrap code syntax with semantic `<span>` classes:
  - `<span class="code-keyword">` for keywords
  - `<span class="code-string">` for strings
  - `<span class="code-comment">` for comments
  - `<span class="code-function">` for function names
  - `<span class="code-type">` for TypeScript types

**CSS Styling:**
```css
.code-block {
  background: #24202D;
  color: #E0DEE8;
  padding: 24px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 60px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.code-keyword { color: #C99BFF; }
.code-string { color: #73D1A9; }
.code-comment { color: #7D8590; }
.code-function { color: #95C1FF; }
.code-type { color: #A8D8EA; }
```
