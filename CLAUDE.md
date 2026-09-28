# Design System

A themeable, accessible, AI-ready design system: tokens → React library → Storybook docs → demo and prototypes, all from one repo.

The overhaul is in progress. **[docs/ROADMAP.md](docs/ROADMAP.md)** is the approved plan: phases, architecture, and the per-component definition of done. Read it before starting work.

## The one critical rule

**Code is the single source of truth** (since 2026-09-29; before that it was Figma).

- Tokens live in the repo and are the origin of every value. CSS/SCSS for developers and the Figma variables import are generated from them.
- Every component and variant is styled only through its **own component tokens**. Never hardcode colors, sizes, spacing, radii or shadows.

## Structure

```
packages/react/     component library (@ds/react): components/, styles/, icons/
apps/prototypes/    Vite app: #/landing and #/dashboard prototypes, importing @ds/react
legacy/             the previous static HTML docs + demo, served unchanged until the Storybook launch
scripts/            build helpers (assemble-site.mjs builds site/)
docs/ROADMAP.md     the plan
```

`packages/tokens`, `apps/docs` (Storybook), `packages/mcp`, `packages/lint`, `ai/`, `skills/` and `evals/` are added in later phases. See the roadmap.

## Commands

```bash
npm install          # once
npm run dev          # prototypes dev server with hot reload
npm run typecheck    # tsc -b
npm run lint         # ESLint (+ jsx-a11y) and Stylelint
npm test             # Vitest + Testing Library
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
- **Lint baseline:** `eslint-suppressions.json` records known a11y errors in Toggle, Dropdown, Navbar and AppsNotifications. Don't add to it. Remove entries as components are fixed (`npx eslint . --prune-suppressions`).
- **Themes:** Diamond / Amber / Opal × Light / Dark, English / Arabic × Serif / Sans-serif, Comfortable / Compact density, Square / Round / Pills radius, Flat / Subtle / Default / Raised shadow. The current full set lives in `legacy/demo/css/` until Phase 1 moves it into the token source.
- **Deploying:** pushing to GitHub publishes the live site. Only push with the owner's OK.

## UI UX Pro Max

Per the global CLAUDE.md, use the UI UX Pro Max skill for the **docs site chrome** (layout, navigation, docs typography). It must **not** restyle the design system's own components, which follow their tokens only.
