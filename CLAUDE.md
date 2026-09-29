# Design System

A themeable, accessible, AI-ready design system: tokens → React library → Storybook docs → demo and prototypes, all from one repo.

**AI agents: read [AGENTS.md](AGENTS.md)** — golden rules, where to find component contracts, commands and trust levels.

Version 1.0.0: the overhaul in **[docs/ROADMAP.md](docs/ROADMAP.md)** is complete except the final push and the AI eval run: phases, architecture, and the per-component definition of done. Read it before starting work.

## The one critical rule

**Code is the single source of truth** (since 2026-09-29; before that it was Figma).

- Tokens are **plain CSS custom properties** in `packages/tokens/src`, edited by hand. It's the same CSS handed off to developers. There is no JSON source and no token build step; any JSON (e.g. for AI) is derived from the CSS.
- Tiers: primitives → semantic tokens per theme (`themes/*.css`, scoped by `data-*` attributes) → component tokens (`components/*.css`, as `var()` references). Describe new tokens in the file header's "Token reference" legend.
- Every component and variant is styled only through its **own component tokens**. Never hardcode colors, sizes, spacing, radii or shadows.

## Structure

```
packages/tokens/    token CSS (the source of truth): primitives, foundations, themes/, components/; tools/ resolver + contrast report
packages/react/     component library (@ds/react): components/, styles/, icons/, ThemeProvider
packages/lint/      Stylelint rule ds/component-tokens-only
apps/docs/          Storybook docs (served at the site root)
apps/prototypes/    Vite app: #/landing, #/dashboard and #/demo (theme playground), importing @ds/react
packages/mcp/       local MCP server for AI agents (ds-mcp)
scripts/            build helpers (assemble-site.mjs builds site/)
docs/ROADMAP.md     the plan
```


## Commands

```bash
npm install          # once
npm run dev          # prototypes dev server with hot reload
npm run typecheck    # tsc -b
npm run lint         # ESLint (+ jsx-a11y), Stylelint (+ ds/component-tokens-only), contrast check
npm test             # Vitest: components, token resolution in all 576 theme combinations, lint rules
npm run build        # builds every workspace and assembles site/
npm run serve        # serves site/ locally
```

CI (`.github/workflows/ci.yml`) runs typecheck, lint, test and build on every push, and deploys `site/` to GitHub Pages from `main`.

## Rules

- **Component token grammar:** `--{component}-{variant}-{style?}-{state}-{property}`, e.g. `--button-primary-default-bg-color`, `--button-danger-outline-hover-border-color`.
  - Omit `style` for the default style.
  - `state` is one of `default|hover|focus|active|disabled|selected|error`.
  - Property names: `bg-color, text-color, border-color, icon-color, border-width, border-radius, padding-x, padding-y, gap, font-family, font-size, font-weight, font-line-height, shadow-x/y/blur/color, size, opacity`.
- **Accessibility is required:**
  - semantic HTML first
  - full keyboard support and visible focus
  - WCAG AA contrast in every theme
- **Real interaction states:** use `:hover` / `:focus-visible` / `:active` / `[disabled]`, not a `state` prop (existing components get migrated in Phase 3).
- **CSS class names are BEM** (`block__element--modifier`), and Stylelint enforces it. Use logical properties (`padding-inline`, `margin-inline-start`) so Arabic RTL works.
- **Lint baseline:** `eslint-suppressions.json` is empty: every component passes jsx-a11y. Don't add to it.
- **Themes:** Diamond / Amber / Opal × Light / Dark, English / Arabic × Serif / Sans-serif, Comfortable / Compact density, Square / Round / Pills radius, Flat / Subtle / Default / Raised shadow. Apply with `applyTheme()` (`@ds/tokens`) or `<ThemeProvider>` (`@ds/react`).
  - **Default theme:** Diamond, light, English, sans, round, comfortable, flat.
- **Component token rule:** `ds/component-tokens-only` (Stylelint) allows a component's CSS only its own tokens: no semantic tokens, no other components' tokens, no raw colors or lengths. Every component stylesheet follows it; there are no exceptions.
- **Contrast:** `npm run tokens:contrast` fails on any WCAG AA failure. All 768 text/background pairs pass in every brand × mode; keep it that way (the baseline is empty).
- **Docs site:** its interface stays neutral (not themed by the design system's themes). Component examples render with the default theme; the docs include a Theming guide for projects.
- **Deploying:** pushing to GitHub publishes the live site. The owner wants a single push at the end of the overhaul; work stays on the local `overhaul` branch until then.

## UI UX Pro Max

Per the global CLAUDE.md, use the UI UX Pro Max skill for the **docs site chrome** (layout, navigation, docs typography). It must **not** restyle the design system's own components, which follow their tokens only.
