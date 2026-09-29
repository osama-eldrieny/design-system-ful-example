# Using with AI

AI coding assistants build better UI with this system when they can look things up and check their work. Everything below is generated from the same metadata and tokens as these docs, so it's never out of date.

## Set up in five minutes

**1. Give the assistant the rules.** Copy `AGENTS.md` from the design-system repository into your project root (Claude Code, Codex, Cursor and Copilot read it). It says: use `@ds/react` components, only documented props, tokens instead of raw values, accessible names, and validate before finishing.

**2. Connect the MCP server.** It runs locally over stdio, with no network access, and answers from the files bundled in the package.

```bash
# Claude Code
claude mcp add ds -- npx ds-mcp
```

```json
// Cursor: .cursor/mcp.json · VS Code: .vscode/mcp.json ("servers" instead of "mcpServers")
{ "mcpServers": { "ds": { "command": "npx", "args": ["ds-mcp"] } } }
```

**3. Add the lint rules** so mistakes fail in the editor and in CI, whoever wrote the code:

```js
// eslint.config.js

export default [
  { files: ['src/**/*.{ts,tsx}'], ...ds.configs.recommended },
];
```

**4. Optional: install the skill.** Copy `skills/ds-builder/` into your agent's skills folder (for Claude Code, `.claude/skills/`). It adds step-by-step procedures for building a screen, adding a variant or component, and auditing a screen.

## MCP tools

| Tool | Returns |
|---|---|
| `list_components` | Every component with its purpose, category and status |
| `get_component` | One component's contract: props and allowed values, options with meaning, states, accessibility, do/don't, examples |
| `get_component_examples` | Runnable JSX examples |
| `get_foundations` | Always-on rules, color roles, spacing, radius, type and motion scales, theme axes |
| `get_tokens` | Tokens matching a filter, with description and value in every theme |
| `search_docs` | Matches in the guides and component docs |
| `validate_code` | Problems in a JSX/TSX snippet: raw HTML controls, undocumented props, missing accessible names, raw colors and sizes |
| `get_changes` | Changelog entries since a version |

## Validate anything

```bash
npx ds-validate src/            # readable report
npx ds-validate src/ --json     # for agents and CI
```

| Rule | Catches |
|---|---|
| `ds/no-raw-element` | `<button>`, `<input>`, `<select>`, `<table>`… where a component exists |
| `ds/valid-props` | Prop values that aren't documented, e.g. `variant="destructive"` |
| `ds/require-accessible-name` | Checkbox, Switch, IconButton or Popover without a name |
| `ds/no-deprecated` | Imports of deprecated components |
| `ds/no-raw-style-values` | Hex colors and px sizes in inline styles |
| CSS | Raw colors and lengths instead of tokens |

## Files for the web and other tools

| File | What it's for |
|---|---|
| `/llms.txt` | Index in the [llms.txt](https://llmstxt.org) format |
| `/llms-full.txt` | Every guide and component page in one file |
| `/ai/components/{id}.json` · `.md` | One component's contract, and the same guidance as prose |
| `/ai/components.json` | The component index |
| `/ai/foundations.json` | The always-on rules and scales (small enough to load every time) |
| `/ai/tokens.json` | Every token in every theme, with its purpose |
| `DESIGN.md` | A portable summary of the default theme for design and prototyping tools |

While Storybook runs locally, its own MCP server at `http://localhost:6006/mcp` also lists stories and can run their tests.

## Prompts that work well

- "Build a settings page with a profile form and notification switches using @ds/react. Check each component with get_component and run validate_code before you finish."
- "Add a `danger` variant to Tag following the token grammar; update the metadata and stories."
- "Audit src/pages/Checkout.tsx with ds-validate and fix what it finds."
