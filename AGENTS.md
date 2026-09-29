# AGENTS.md — design system

Instructions for AI coding agents working in this repository or building UI with `@ds/react`.
Details live in the generated `ai/` files and the MCP server; this file is the always-on part.

## Golden rules

1. **Use the library, never recreate it.** Import components from `@ds/react`. Don't write a
   raw `<button>`, `<input>`, `<select>`, `<table>` or `<dialog>` when a component exists.
2. **Only documented props and values.** Check a component's contract before using it:
   `ai/components/{id}.json` or the MCP tool `get_component`. Don't guess prop names.
3. **Tokens, not raw values.** Colors, spacing, radii, shadows, fonts and motion come from CSS
   custom properties (`var(--spacing-md)`, `var(--color-fg-on-surface-primary)`). No hex, rgb or px.
   Lay things out with `Stack`, `Inline`, `Grid` and `Container`.
4. **Accessible by default.** Every control has a visible label or an accessible name; don't
   remove focus rings; keep headings in order; WCAG 2.2 AA contrast in every theme.
5. **Theme with attributes, never hard-code a brand or mode.** Use `<ThemeProvider>` or
   `applyTheme()`; components follow `data-brand`, `data-mode`, `data-density`, etc.
6. **Check your work.** Run `npx ds-validate <files>` (or the MCP tool `validate_code`) and fix
   every error before you finish.

## Where to look

| Need | Source |
|---|---|
| Component list | `ai/components.json` · MCP `list_components` |
| One component (props, values, a11y, do/don’t, examples) | `ai/components/{id}.json` + `.md` · MCP `get_component` |
| Rules, scales, theme axes | `ai/foundations.json` · MCP `get_foundations` |
| Token values per theme | `ai/tokens.json` · MCP `get_tokens` |
| Guides (theming, installation, accessibility) | `ai/docs/*.md` · MCP `search_docs` |
| Live docs and stories | Storybook (`npm run storybook`), Storybook MCP at `http://localhost:6006/mcp` |

The MCP servers are registered for this repo in `.mcp.json`. In another project:
`claude mcp add ds -- npx ds-mcp`.

## Commands

```bash
npm run typecheck     # tsc -b
npm run lint          # ESLint (+ jsx-a11y, eslint-plugin-ds), Stylelint tokens-only, contrast
npm test              # unit tests + every story in Chromium with axe
npm run ai            # regenerate ai/ from component metadata and tokens (commit the result)
npm run build         # everything, assembled into site/
npx ds-validate <path> [--json]
npm run test:visual  # screenshot tests (macOS baselines); --update after intended changes
npm run size         # build the publishable packages and write docs/bundle-size.md
npm run check:responsive  # after npm run build: no horizontal scroll at 375–1440 px
```

## Changing the system (this repo)

- **Component tokens:** `--{component}-{variant}-{style?}-{state}-{property}`. A component's CSS
  uses only its own tokens (Stylelint `ds/component-tokens-only`); tokens point at semantic tokens.
- **Definition of done for a component:** folder `packages/react/src/{Name}/` with the component,
  CSS, `{Name}.meta.ts`, stories (Playground, options, States, RightToLeft, AllThemes, an
  interaction test), unit tests, and `apps/docs/src/components/{Name}.mdx`. Then `npm run ai`.
- **Contrast:** `npm run tokens:contrast` must stay at 0 failures.

## Trust levels

| Change | What an agent may do |
|---|---|
| Lint fixes, missing labels/aria, docs typos, regenerating `ai/` | Fix directly |
| New tokens, token values, docs content, new stories | Make the change; call it out for review |
| New components or props, renames, removals, breaking changes, brand colors | Propose only; ask first |
| Pushing, publishing, deploying | Never without explicit permission |
