# Build a screen

1. **Plan with the catalog.** `list_components` (or `ai/components.json`). Map each part of the
   screen to a component; prefer patterns (e.g. `ProductCard`, `Navbar`) when they fit.
2. **Read each contract before using it.** `get_component {name}`: use only listed props and
   values; read `whenNotToUse` and `guidelines` to confirm the choice.
3. **Lay out with Stack / Inline / Grid / Container** and their `gap` steps. No margins or px.
4. **Wire accessibility:** labels on every field (FormField-based components take `label`),
   `aria-label` on icon-only controls, one `h1`, headings in order, `caption` on tables.
5. **Theme:** wrap the app in `ThemeProvider` (or call `applyTheme`) once; never hard-code colors.
6. **Validate:** `validate_code` / `npx ds-validate <files>`; fix every error. Check both light
   and dark and Arabic (RTL) if the product supports them.
