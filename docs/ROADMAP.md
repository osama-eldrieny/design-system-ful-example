# Design System Overhaul — Phased Plan

## Context

The current docs site (`/Users/oo/Sandbox/Full design System Documentation`) is hand-written static HTML: 19 component pages, 6 token pages, one flat `assets/tokens.css`. Problems found during exploration:

- **Docs drift from code.** `components/button.html` documents `style="filled"`, but the React prop is `buttonStyle` (`react-app/src/components/Button.tsx`). Every page hand-copies code, so this will keep happening.
- **Themes exist but the docs don't use them.** `demo/css/` holds a complete multi-theme export from Figma variables: Brand×Mode (Diamond/Amber/Opal × Light/Dark), Language×Typeface (EN/AR × Serif/Sans), Density (2), Radius (3), Shadow (4). The docs' `assets/tokens.css` is just one combination of these, flattened (377 of its 479 tokens exist in the demo files) plus a few hand-added ones (palettes, alert border style).
- **Three copies of the same tokens:** `assets/tokens.css` (kebab-case), `react-app/src/styles/tokens.css` (kebab-case, 4 names differ), `demo/css/*.css` (camelCase). No shared source.
- **No accessibility.** React components have zero ARIA attributes; `state="hover|focus"` is a prop instead of real interaction; `Toggle` is a `<div>`; icon button renders a literal `+`.
- **Contrast failures:** primary button text on its background is 3.14:1, secondary is 2.95:1, primary text-style button on white is 3.60:1. All three are below WCAG AA's 4.5:1.
- **Thin component coverage and variants.** It's missing the common library components (Checkbox, Select, Modal, Tooltip, Badge, Table…). Button has only primary/secondary × filled/text × small/medium/icon.

**Decisions made with the user:**
- **Code is the source of truth from now on.** Tokens are authored as **plain CSS custom properties** (the same kind of CSS handed off to developers). There is no JSON source, resolver or token build tool (decided 2026-09-29). JSON for AI is *derived* from the CSS.
- **Docs interface is neutral**, never themed by the design system's themes. Components inside the docs render with the **default theme: Diamond, light, English, sans, round, comfortable, flat**. The theme toolbar previews others, and a **Theming** guide page explains how projects implement themes.
- **Storybook** is the docs platform. It renders the real React components (no drift), and gives controls, auto props tables, a11y checks, and an official MCP server for AI agents.
- **Component-specific tokens are mandatory.** Every existing, new, or extended component/variant is styled only through its own tokens (`--button-danger-default-bg-color`), which alias semantic tokens so all themes flow through automatically.
- **All themes are implemented** everywhere: docs, demo, prototypes.

**Outcome:** one repo where tokens → React library → Storybook docs → demo + prototypes all come from a single source. It will have a professional, themeable, accessible docs site with Storybook-class sections, ~40 components, and machine-readable outputs for AI.

---

## Target architecture

```
design-system/                      (npm workspaces monorepo, this repo)
│   ├── primitives/                 color scales per brand, sizing, radius, shadow, font families
│   ├── semantic/                   bg / text / border / accent (+ success/danger/warning/info)
│   ├── component/                  --button-*, --alert-*, … (alias semantic tokens)
│   └── modes/                      brand×mode, language×typeface, density, radius, shadow
├── packages/
│   ├── tokens/                     SOURCE OF TRUTH: hand-edited CSS (primitives, themes/, components/) + applyTheme()
│   ├── react/                      the component library (TS, CSS per component, Radix primitives, *.meta.ts)
│   ├── mcp/                        @ds/mcp local MCP server (reads generated ai/ files)
│   └── lint/                       eslint-plugin-ds + stylelint token rule + `ds validate` CLI
├── apps/
│   ├── docs/                       Storybook 10 (react-vite): MDX pages, stories, custom doc blocks
│   └── prototypes/                 Vite app: Landing, Dashboard, Demo (theme playground)
├── ai/                             GENERATED: foundations.json, components/*.json|md, tokens.json, changes.json
├── skills/ds-builder/              Agent Skill (SKILL.md + references + scripts)
├── evals/                          AI quality benchmark prompts + scorer
├── scripts/                        token seeding, AI outputs, llms.txt, contrast audit
├── AGENTS.md  DESIGN.md            always-on agent rules; portable design summary (generated)
└── .github/workflows/deploy.yml    build everything → GitHub Pages
```

**Theme mechanism:** attributes on `<html>`: `data-brand`, `data-mode`, `lang`+`dir`, `data-typeface`, `data-density`, `data-radius`, `data-shadow`. Each theme file scopes its tokens to a selector, e.g. `[data-brand="amber"][data-mode="dark"] { … }`. This replaces the demo's current `<link>`-swapping (`demo/index.html:585-700`).

**Final public URLs (GitHub Pages):**
- `/` → Storybook docs
- `/demo/` → theme playground
- `/prototypes/#/landing` and `/prototypes/#/dashboard` → prototypes
- `/llms.txt` and `/ai/…` → AI files
- Old URLs (`/components/*.html`, `/pages/*.html`, `/react-app-live/`) → small redirect stubs, so shared links still work.

---

## AI-ready architecture (research-based)

### What the research shows
- **Two kinds of context.** Agents need a small set of always-on rules (spacing, color roles, typography, naming) plus on-demand, per-component detail fetched only when needed.
  - When Atlassian tested this, an MCP server plus skills reached ~80% design-system coverage using about half the tokens of one big always-loaded DESIGN.md (~30% coverage).
  - The big file also made agents *re-create* components instead of importing them, because it lacked code guidance.
- **"JSON for MCP, Markdown for LLM"** (Indeed, 77 components, 1,056 test prompts).
  - Structured contracts (props, variants, sizes, states, tokens) belong in JSON. The Markdown version cost ~30k tokens per query with hallucinations; JSON used 80% fewer tokens.
  - Rules and guidance prose belong in Markdown.
- **Metadata over prose.** Every component needs identity, intent (when to use / not use), props, variants, sizes, states, a11y constraints, examples, and anti-patterns, written explicitly. Agents can't infer what designers leave unsaid.
- **Semantic token names with descriptions.** A token like `danger.background` gives the model an anchor; a raw hex doesn't. The W3C token format (DTCG 2025.10, now stable) supports `$description`, `$deprecated` and `$extensions` on every token. Themes are handled by its separate Resolver module.
- **Enforcement beats instruction.** Lint and validation rules catch mistakes at zero token cost, and drift between docs, code and tokens is the #1 reason agents go wrong.
- **Leading systems ship all of these together.**
  - IBM Carbon: hosted MCP, a `carbon-builder` Agent Skill, llms.txt, prompt guidance.
  - Atlassian: MCP, skills, DESIGN.md.
  - Chakra and shadcn: MCP servers.
  - Storybook: its own MCP with `docs-list`, `docs-show`, `test-run`.

### The files we will ship (all generated from one source; nothing hand-maintained twice)

| Layer | File(s) | Format | Content |
|---|---|---|---|
| **Source: tokens** | `packages/tokens/src/**/*.css` | CSS custom properties | Primitives → semantic (per theme, via data-attribute selectors) → component tokens. Each file's header has a **token reference** legend (`--token: what it's for`) that is parsed into the AI files |
| **Source: components** | `packages/react/src/{C}/{C}.meta.ts` | typed TS object (schema-validated) | Identity (id, name, category, status, since, version), description, whenToUse / whenNotToUse (+ alternative component), anatomy parts, variants/sizes/states **each with meaning**, composition (allowed children/parents, related), a11y (role, keyboard map, ARIA, focus behavior, WCAG criteria), content guidelines, do/don't (**+ why + instead**), examples (id, title, code), component token list |
| **Source: props** | `{C}.tsx` JSDoc | TS types + JSDoc | Per-prop description, default, allowed values, `@deprecated`. Feeds the props table + manifest |
| **Always-on rules** | `AGENTS.md` (root + nested per package) | Markdown | Build/test commands, the golden rules (import library components, never recreate; tokens only; follow token grammar; a11y required), trust levels for agent actions, where to fetch details (MCP / llms.txt) |
| | `ai/foundations.json` | JSON (small, <5k tokens) | Spacing scale, color roles, typography roles, radius, elevation, motion, breakpoints, naming grammar, theme axes. Loaded with every task |
| | thin tool pointers | `CLAUDE.md`, `.cursor/rules/design-system.mdc`, `.github/copilot-instructions.md` | Each just says "follow AGENTS.md"; generated so they never diverge |
| **On-demand detail** | `ai/components/{name}.json` | JSON | The meta + props + resolved tokens per theme, i.e. the machine contract |
| | `ai/components/{name}.md` | Markdown | Guidance prose (usage, do/don't, a11y) for LLM reading |
| | `ai/components.json` | JSON index | All components: id, one-line purpose, category, status, import path |
| | `ai/tokens.json` | JSON (derived from CSS) | Every token × every theme, resolved values + descriptions |
| | `ai/changes.json` | JSON | Machine-readable changelog: additions, deprecations (+ migration), breaking changes |
| **Web discoverability** | `/llms.txt` | llms.txt spec | H1 name, summary blockquote, sections Foundations / Components / Patterns / Guides, `Optional` section |
| | `/llms-full.txt` | Markdown | Everything concatenated for one-shot loading |
| | `/{page}.md` for every docs page | Markdown | Clean Markdown copy, advertised with `<link rel="alternate" type="text/markdown">` |
| **Agent tools** | `packages/mcp` (`@ds/mcp`, local stdio MCP server) | MCP | Tools: `list_components`, `get_component(name)`, `get_component_examples`, `search_docs(query)`, `get_tokens(filter, theme)`, `get_foundations`, `validate_code(snippet)` (runs the token/a11y/usage lint), `get_changes(since)` |
| | Storybook MCP (`@storybook/addon-mcp`, `componentsManifest: true`) | MCP | `docs-list`, `docs-show`, story-writing instructions, `test-run` (interaction + a11y), for agents working *inside* this repo |
| | `skills/ds-builder/SKILL.md` (+ `references/`, `scripts/`) | Agent Skills open standard | Procedures: "build a screen with the DS", "add a variant (token grammar + DoD)", "add a new component", "audit a screen". Loaded only when relevant (progressive disclosure) |
| **Portable** | `DESIGN.md` | Google DESIGN.md (alpha) | YAML tokens + brand/style prose, for tools like Stitch and quick prototyping outside the repo. Secondary, because Atlassian's tests show MCP/skills win for production code |
| **Enforcement** | `eslint-plugin-ds` + Stylelint token rule + `ds validate` CLI | code | No raw values; no native element when a DS component exists (e.g. `<button>` → `<Button>`); only valid prop values; a11y rules. Used by humans, CI, and the MCP `validate_code` tool |
| **Measurement** | `evals/` | prompts + checker | ~30 realistic prompts ("settings page with form + toast"). An agent builds each; automated scoring covers DS-component usage, token-only styling, axe violations, and hallucinated props. Run before/after changes to prove AI quality |

Distribution: the `ai/` folder, `AGENTS.md` snippet, and MCP server ship **inside the npm packages**, so agents in *consuming* apps find them in `node_modules`, not just on the website.

**Component token grammar** (keeps every existing name valid):
`--{component}-{variant}-{style?}-{state}-{property}`
- `style` is omitted for the default style; `state` is one of `default|hover|focus|active|disabled|selected|error`.
- Property vocabulary: `bg-color, text-color, border-color, icon-color, border-width, border-radius, padding-x, padding-y, gap, font-family, font-size, font-weight, font-line-height, shadow-x/y/blur/color, size, opacity`.
- Examples: `--button-primary-default-bg-color` (existing), `--button-danger-outline-hover-border-color`, `--checkbox-checked-bg-color`, `--modal-padding`.

---

## Phase 0 — Repo restructure & tooling

**Goal:** a monorepo that builds, lints, tests and deploys, before any feature work.

1. Convert the repo to npm workspaces. Move today's files into the new layout: `react-app/` becomes the seed of `packages/react` + `apps/prototypes`; the current static HTML moves to `legacy/` until Phase 8 retires it.
2. Toolchain: TypeScript (strict), Vite, ESLint (+ `jsx-a11y`), Prettier, Stylelint, Vitest + Testing Library.
3. Migrate prototypes off Create React App (deprecated) to Vite. Keep hash routes `#/landing` and `#/dashboard`.
4. GitHub Actions workflow: install → build tokens → build library → build Storybook → build prototypes → assemble one `site/` folder → deploy to Pages.
   - This needs Pages' source switched from "main branch /" to "GitHub Actions". I'll ask before changing that setting.
5. Update `CLAUDE.md` and `docs/` to the new rules (code is the source of truth, token grammar, per-component definition of done).

**Done when:** `npm run build` produces the full site locally, and CI deploys it (the old site is still reachable during transition).

---

## Phase 1 — Token system & themes (code source of truth)

**Goal:** one CSS token source → every theme, every consumer.

1. ✅ **Migrate** the 21 Figma exports (`legacy/demo/css/variables-*.css`) into `packages/tokens/src` with a one-time script (`scripts/migrate-legacy-tokens.mjs`, kept for provenance).
   - Re-links each component value to the semantic/primitive token with the same value in every theme, and verifies all 380 component tokens resolve to their original values in every theme.
   - Fixes export slips: duplicated `--space4` (now `--space-4` and `--space-negative-4`), unquoted font names and text, the `widrh` typo, two undefined tokens.
2. ✅ **Structure** (plain CSS, edited by hand from now on):
   - `primitives.css`: palettes and scales
   - `foundations.css`: motion, z-index, focus ring, reduced-motion
   - `themes/{color,typography,density,radius,shadow}.css`: semantic tokens per theme, scoped by `data-*` attributes; default theme on `:root`
   - `components/*.css`: component tokens as `var()` references
   - `tokens.css`: the one file projects import
3. ✅ **Status accents:** success/danger/warning fills and text for every brand × mode, with steps chosen to pass WCAG AA.
4. ✅ **Theme runtime:** `applyTheme()` / `themeAttributes()` in `@ds/tokens`, and a `ThemeProvider` in `@ds/react`. Default theme: Diamond, light, en, sans, comfortable, round, flat. Arabic sets `dir="rtl"`; component CSS moves to logical properties in Phase 3.
5. ✅ **Descriptions:** a token-reference legend in every file header (`--token: what it's for`), parsed later into `ai/tokens.json` + `ai/foundations.json`.
6. ✅ **Token tooling** (`packages/tokens/tools`): a small resolver that reads the CSS and resolves any token in any theme. It's shared by:
   - a test that every `var()` resolves in every theme combination (no missing tokens, no cycles)
   - the contrast report
   - the AI export
7. ✅ **Token lint** (Stylelint rule `ds/component-tokens-only` in `packages/lint`, enforced for every new component; the 17 existing stylesheets are listed in `stylelint.config.js` until Phase 3 migrates them): a component's CSS may use only `var(--{its-component}-*)` tokens. No raw hex/px/rgba.
8. ✅ **Contrast report** (`npm run tokens:contrast`, report in `packages/tokens/reports/contrast.md`; 251 of 768 pairs fail today and are baselined, so only new failures break the build): every text/background token pair in all 6 brand × mode combinations against WCAG AA.
   - ✅ Fixed (approved 2026-09-29): semantic tokens re-pointed to other steps of the same palettes; no palette color or token name changed. All 768 pairs pass AA in every brand × mode; the baseline is empty.

**Done when:** tokens resolve in every theme (test), the token lint and contrast report run in CI, and the prototypes render in every theme.

---

## Phase 2 — Docs platform (Storybook shell, branding, templates) ✅

**Status (2026-09-29):** done. Storybook 10.6 in `apps/docs` (neutral docs UI; theme toolbar + Preview theme bar; default theme preselected), docs blocks driven by `*.meta.ts` and the token CSS, Button as the reference page (18 sections, stories run as browser tests with axe in all 6 brand × mode themes), Foundations and Get started pages including the Theming guide, AI pipeline (`npm run ai` → `ai/`, `/llms.txt`). Served at `/storybook/` until launch. Deviations: Terrazzo/Style Dictionary dropped (tokens are CSS); a Markdown copy of each guide page lives under `ai/docs/` instead of next to each Storybook URL.


**Goal:** a professional docs experience before content scales. Docs-chrome styling follows the UI UX Pro Max recommendation (minimal Swiss style, indigo accent close to today's #312E81/#6366F1, Inter for UI, JetBrains Mono for code). Components themselves use only design-system tokens.

1. **Storybook 10 (react-vite)** with addons:
   - docs
   - a11y (axe)
   - vitest (interaction + a11y tests)
   - pseudo-states (shows hover/focus/active without fake props)
   - `@storybook/addon-mcp`
2. **Neutral docs interface** for the Storybook UI: logo, colors, fonts, light/dark docs chrome, independent of the design system's themes. Component examples render with the default theme. The sidebar is organized as:
   - **Get started:** Introduction, Installation, Theming, AI usage
   - **Foundations**
   - **Components:** Actions, Forms, Feedback, Overlays, Navigation, Data display, Layout
   - **Patterns:** the domain components
   - **Resources:** Changelog, Contributing
3. **Theme toolbar** (Storybook globals + decorator) with 7 switches: Brand, Mode, Language (sets RTL), Typeface, Density, Radius, Shadow. It applies to every story and docs page. The selection is kept in the URL, so themed links can be shared.
4. **Custom doc blocks** (`apps/docs/.storybook/blocks/`), reused on every page:
   - `ComponentHeader`: name, description, status badge, version, import line, links to source and Figma
   - `WhenToUse`
   - `Anatomy`: numbered diagram + parts table
   - `DoDont`: visual pairs
   - `TokenTable`: live resolved values for the current theme, plus the alias chain
   - `KeyboardTable`, `A11yNotes`
   - `ThemeMatrix`: the component rendered in all 6 brand×mode combinations
   - `RelatedComponents`, `Changelog`
5. **Component metadata file** per component (`Button.meta.ts`), following the schema in *AI-ready architecture*. A Zod schema validates it in CI. The MDX sections, the props table, `ai/components/*.json|md`, `llms.txt` and the MCP responses are **all generated from it + the TS types**, so docs, AI outputs and code can't disagree.
   - Set up the AI pipeline skeleton here, so every component built in later phases produces its AI files automatically: `scripts/build-ai.ts`, `llms.txt`, per-page `.md` copies, `componentsManifest: true`, `@storybook/addon-mcp`.
6. **Standard component page template** (MDX), in this order:
   1. Header (ComponentHeader)
   2. Playground (primary story + controls)
   3. Overview, When to use / When not to use (with alternatives)
   4. Anatomy
   5. Variants
   6. Styles
   7. Sizes
   8. States
   9. Behavior (interaction, overflow/truncation, responsive, RTL)
   10. Content guidelines
   11. Do / Don't
   12. Accessibility (role, ARIA, keyboard table, focus management, contrast per theme, WCAG criteria)
   13. Design tokens
   14. API reference (auto props table)
   15. Code examples (React + HTML/CSS, copy button)
   16. Theme matrix
   17. Related components
   18. Changelog
7. **Foundations pages**, rebuilt from `pages/tokens-*.html` and extended:
   - Colors (primitives + semantic per brand, contrast badges)
   - Typography (EN/AR, serif/sans scales)
   - Spacing & Density
   - Radius
   - Shadows & Elevation
   - Motion (new)
   - Iconography: standardize on **Lucide** and replace Font Awesome and the `+` glyph
   - Accessibility principles
   - **Theming guide** (for projects using the system): include `tokens.css`, set attributes or call `applyTheme()`, `ThemeProvider` for React, theming part of a page, RTL for Arabic, adding a new brand or mode
8. **Introduction page:** what the system is, quick start, theme toolbar explainer, component catalog grid with status.

**Done when:** Button alone is fully documented with the template and works in every theme combination. That page is the reference every other component copies.

---

## Phase 3 — Upgrade the 19 existing components ✅

**Goal:** bring what exists to the new standard before adding more.

For each component, move it from `react-app/src/components/*.tsx` + `styles/*.css` into `packages/react/src/{Component}/`, and carry over descriptions/spec tables from `components/*.html`. Then apply the **per-component definition of done**:

- [ ] Styled only by its own component tokens (token lint passes); logical properties (RTL-safe)
- [ ] Real states via `:hover`, `:focus-visible`, `:active`, `[disabled]`, `[aria-*]`; the `state` prop is removed (pseudo-states addon handles docs display)
- [ ] Semantic HTML + ARIA; full keyboard support; visible focus ring (focus-ring tokens); `prefers-reduced-motion` respected
- [ ] `forwardRef`, `className` passthrough, typed props with JSDoc (feeds the props table + AI manifest)
- [ ] Stories: default, every variant/style/size/state, RTL, theme matrix; interaction test (`play`) + axe check pass in all 6 brand×mode combinations
- [ ] `*.meta.ts` + MDX page with every template section filled in
- [ ] AI-ready:
  - [ ] meta passes schema; every prop has JSDoc
  - [ ] every variant/size/state has a stated *meaning*
  - [ ] ≥3 do/don't entries, each with *why* + *instead*
  - [ ] ≥3 runnable examples
  - [ ] generated `ai/components/{name}.json|md` reviewed
  - [ ] `eslint-plugin-ds` knows the component (e.g. flags raw `<button>` in favor of `<Button>`)
- [ ] Unit tests (Vitest + RTL)

**Variant expansion** for the core components:

| Component | Adds |
|---|---|
| Button | variants primary/secondary/**success/danger/warning**; styles filled/**outline/ghost**/text; sizes **xs**/sm/md/**lg**; **leading/trailing icon, icon-only (`IconButton`), loading, full-width** |
| Input Field | sizes sm/md/lg; prefix/suffix icon; helper/error/success text; readOnly; clearable; required indicator |
| Alert | info/success/warning/danger × **subtle/solid/outline**; title+description; icon; dismissible; action slot |
| Avatar | xs–xl; image/initials/icon fallback; status dot; `AvatarGroup` with overflow count |
| Tabs | **line/pill/enclosed**; sizes; icons; keyboard arrow navigation (Radix Tabs) |
| Toggle → **Switch** | real `role="switch"`; sizes; label position; disabled |
| Radio Button → **Radio + RadioGroup** | sizes; description text; error state; horizontal/vertical |
| Dropdown → **DropdownMenu** | Radix menu: items, groups, separators, checkbox/radio items, submenus, shortcuts |
| Pagination | sizes; compact/simple/full; page-size select; ellipsis logic |
| Card | elevated/outlined/filled; media top/side; header/footer slots; clickable card (a11y-correct) |

Recategorize to **Patterns**: MeetingCard, AppsNotifications, NotificationListItem, Header, Footer, ChooseCard, Logo, Navbar, Palettes. Where possible, rebuild them from core components (e.g. AppsNotifications = List + Switch + Avatar).

**Done when:** all 19 meet the definition of done, and the old HTML pages have MDX equivalents.

---

## Phase 4 — New components, wave A (forms & actions) ✅

Each new component: design its component tokens first (aliasing semantic tokens, all modes), then build, story, document, and test using the same definition of done. For complex widgets, use **Radix UI primitives**, styled 100% by our tokens, so keyboard/ARIA behavior is correct and battle-tested.

| Component | Key variants / features |
|---|---|
| Link | inline/standalone; sizes; external icon; visited |
| ButtonGroup | attached/spaced; segmented selection |
| Checkbox (+ CheckboxGroup) | checked/unchecked/**indeterminate**; sizes; description; error |
| Textarea | sizes; auto-resize; character counter; error |
| Select | single; sizes; groups; disabled options; error (Radix Select) |
| Combobox / Autocomplete | filtering; async; multi-select chips |
| Slider | single/range; steps; marks |
| FormField | label + control + helper/error wiring (`aria-describedby`); required/optional |
| SearchField | clear button; shortcut hint |
| DatePicker | *deferred (2026-09-29): add later if the prototypes need one* |

---

## Phase 5 — New components, wave B (feedback, overlays, navigation, data) ✅

| Group | Components |
|---|---|
| Feedback | Badge (dot/count, 5 tones × solid/subtle), Tag/Chip (removable, selectable), Toast (5 tones, action, auto-dismiss, stacking), Progress (linear/circular, indeterminate), Spinner, Skeleton |
| Overlays | Modal/Dialog (sizes, alert-dialog variant, focus trap), Drawer (4 sides), Popover, Tooltip (placement, delay), HoverCard |
| Navigation | Breadcrumb (collapse), Stepper (horizontal/vertical, states), SideNav (nested, collapsible), Menubar *(optional)* |
| Data display | Table (sortable, selectable rows, sticky header, density-aware, empty/loading), List, Accordion (single/multi), Divider, EmptyState, Stat/KPI, Kbd, Code |
| Layout | Stack, Inline, Grid, Container (spacing driven by density tokens) |

**Done when:** each component meets the definition of done. The catalog totals ~40 core components + 9 patterns.

---

## Phase 6 — AI tooling, enforcement & measurement

**Goal:** agents inside this repo *and* in apps that consume the library build correct UI with the system. Metadata already exists from Phases 1–5; this phase adds the tools on top, following the file table in *AI-ready architecture*.

1. **Baseline eval first** (`evals/`). Write ~30 realistic prompts across forms, dashboards, feedback, overlays, RTL and dark theme.
   - Scorer (automated): % of UI built from DS components, raw-value violations, hallucinated props/variants (checked against `components.json`), axe violations, token-grammar violations for new variants.
   - Run once with docs only, to get a number we then improve against.
2. **Enforcement package** (`packages/lint`):
   - `eslint-plugin-ds` rules:
     - `no-raw-element` (use `<Button>`, not `<button>`)
     - `valid-props` (only documented values)
     - `no-deprecated` (with autofix from `changes.json`)
     - `require-accessible-name` (e.g. IconButton needs `aria-label`)
   - Stylelint token rule; `ds validate <files>` CLI; JSON output for agents.
3. **`@ds/mcp` server** (`packages/mcp`, local stdio, zero network).
   - Tools: `list_components`, `get_component`, `get_component_examples`, `search_docs`, `get_tokens(filter, theme)`, `get_foundations`, `validate_code`, `get_changes(since)`.
   - Responses are the generated JSON (compact), with Markdown only for guidance fields.
   - Install snippets for Claude Code, Cursor and VS Code.
4. **Storybook MCP** for contributors: `@storybook/addon-mcp` + `componentsManifest: true`. It's in preview on Storybook 10.6, React supported, and runs locally at `http://localhost:6006/mcp`.
5. **Agent Skill** `skills/ds-builder/` (Agent Skills open standard), with procedures:
   - `build-screen`
   - `add-variant` (token grammar + definition of done)
   - `add-component` (scaffold via script)
   - `audit-screen` (runs `ds validate` + axe)

   References link to the `ai/` files, keeping the skill lean.
6. **Always-on layer:**
   - root `AGENTS.md`: golden rules, commands, trust levels (auto-fix: lint/a11y labels; draft PR: tokens/docs; suggest-only: new APIs, breaking changes)
   - nested `AGENTS.md` in `packages/react`, `packages/tokens`, `apps/docs`
   - generated pointers: `CLAUDE.md`, `.cursor/rules/design-system.mdc`, `.github/copilot-instructions.md`
   - `ai/foundations.json` kept under ~5k tokens
7. **Web layer:** `/llms.txt` (spec-compliant), `/llms-full.txt`, a `.md` twin of every docs page with `rel="alternate"`, and a generated `DESIGN.md` for portable/prototyping use.
8. **Consumer distribution:** ship `ai/`, the MCP server and an `AGENTS.md` snippet inside the npm packages. Add a docs page, **"Using the design system with AI"**, covering setup per tool, example prompts, and what each file is for.
9. **Drift guard in CI** (fails the build):
   - every exported component has meta + stories + docs
   - every meta example compiles
   - every token referenced in CSS exists and has a description
   - `ai/` is regenerated and committed (no stale files)
10. **Re-run the eval.** Target: ≥90% DS-component usage, 0 hallucinated props, 0 raw values, 0 axe violations. Keep the eval in CI as a nightly/manual job to catch regressions.

**Done when:** the eval targets are met with the MCP server + skill, and a clean consumer app, set up by following only the "Using with AI" page, gets the same results.

---

## Phase 7 — Quality hardening ✅

> Done 2026-09-29. Automated: axe on every story (all themes), contrast 0 failures, 106 visual
> baselines (`npm run test:visual`), responsive check in CI, keyboard tests for every overlay and
> form control plus a tab walk of both prototypes, bundle-size report. **Still manual:** a
> VoiceOver/NVDA pass on overlays and forms (needs a person).

1. Accessibility audit: axe on every story × 6 brand/mode combinations in CI; manual keyboard + VoiceOver pass on overlays and forms.
2. Apply the approved contrast fixes from Phase 1 and re-run the report (target: 0 AA failures).
3. Visual regression: Playwright screenshots of stories in key theme combinations, committed as baselines.
4. Responsive check of docs and prototypes at 375 / 768 / 1024 / 1440; RTL check for every component.
5. Performance: tree-shakable library build, CSS per component, bundle-size report.

---

## Phase 8 — Demo & prototypes on the library, launch ✅ (push pending)

1. **Prototypes** (`apps/prototypes`): rebuild Landing and Dashboard with `packages/react` components + `ThemeProvider`, and fix the unused imports noted in the build warnings. Keep hash routes. Images come from the app's own assets (the relative-path fix from earlier stays).
2. **Demo** becomes the "Theme playground" page inside the prototypes app at `/demo/`: the same 7-switch panel, built from library components and generated tokens. This replaces the Bootstrap + `demo/css` copy, so it can never drift again.
3. Docs sidebar "Examples" links point to `/demo/` and `/prototypes/#/…`. Retire `legacy/` and leave the redirect stubs.
4. Final deploy; changelog v1.0.0.

---

## Reused from the current project

| What | Where it goes |
|---|---|
| `demo/css/variables-*.css` | token seed (all modes) |
| `assets/tokens.css` | docs-only tokens to merge |
| `react-app/src/components/*.tsx`, `react-app/src/styles/*.css` | starting implementations |
| `react-app/src/ProductLandingPage.tsx`, `DashboardPage.tsx` | prototypes to rebuild |
| `components/*.html` | descriptions and spec tables to migrate |
| `pages/tokens-*.html` | foundations content |
| `assets/*.png`, `assets/team-avatars/` | images |
| `demo/index.html` theme-switch logic | reference for the toolbar and playground behavior |

## Open decisions (raised when their phase starts)

- **Contrast fixes** change brand colors; you approve the proposed values (Phase 1).
- **Name:** decided on 2026-09-29: the system is called **Panda** (display name "Panda Design System"). npm packages keep the neutral `@ds/*` scope until a publishing decision is made.
- **npm publishing** of `packages/react` / `packages/tokens`: public, private (GitHub Packages), or repo-only.
- **Optional components:** DatePicker, Menubar.
- **Hosted MCP:** GitHub Pages can't host an MCP server, so the plan ships a local one. A hosted remote MCP (like Carbon's) would need a small server (e.g. Cloudflare Workers); decide in Phase 6 if wanted.

## Research sources (AI readiness)

- Atlassian: DESIGN.md vs MCP/skills test results: https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice
- Indeed JSON-vs-Markdown benchmark / agentic design systems guide: https://www.intodesignsystems.com/agentic-design-systems · https://www.intodesignsystems.com/blog/design-system-not-ready-for-ai-agents
- Figma, LLM context design: https://www.figma.com/resource-library/llm-context-design/
- Supernova, AI-ready design systems: https://www.supernova.io/blog/ai-ready-design-systems-preparing-your-design-system-for-machine-powered-product-development
- Storybook AI + MCP: https://storybook.js.org/docs/ai · https://storybook.js.org/docs/ai/mcp/overview
- llms.txt spec: https://llmstxt.org/
- AGENTS.md: https://agents.md/
- Agent Skills: https://agentskills.io/home
- DTCG 2025.10: https://www.designtokens.org/tr/drafts/format/
- DESIGN.md: https://github.com/google-labs-code/design.md
- Carbon MCP: https://carbondesignsystem.com/developing/carbon-mcp/onboarding-and-setup/
- shadcn MCP: https://ui.shadcn.com/docs/mcp
- Chakra MCP: https://chakra-ui.com/docs/get-started/ai/mcp-server

## Verification (every phase)

- `npm run build` for the full site, then serve `site/` locally and click through docs, demo and prototypes.
- `npm run lint` (ESLint + Stylelint token rule), `npm test` (Vitest), and Storybook tests (interaction + axe across themes).
- Contrast report: no new failures.
- Visual spot-check in Chrome of changed pages in at least Diamond-Light, Opal-Dark, and Arabic RTL.
- After deploy: the live URLs return 200, and there are no broken images/assets (the same checks run earlier this session).
- Push to GitHub only with your OK per phase.
