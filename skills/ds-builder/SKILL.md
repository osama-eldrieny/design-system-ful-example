---
name: ds-builder
description: Build, extend and audit UI with the @ds/react design system. Use when creating screens or components with @ds/react, adding a variant or component to the design system, or checking UI code for design-system and accessibility problems.
---

# Design-system builder

Always-on rules are in `AGENTS.md`. This skill adds step-by-step procedures. Load only the one
you need:

| Task | Procedure |
|---|---|
| Build a screen or feature from existing components | [references/build-screen.md](references/build-screen.md) |
| Add a variant, size or state to an existing component | [references/add-variant.md](references/add-variant.md) |
| Add a new component to the library | [references/add-component.md](references/add-component.md) |
| Audit UI code for design-system and accessibility problems | [references/audit-screen.md](references/audit-screen.md) |

Tools: the `design-system` MCP server (`list_components`, `get_component`, `get_tokens`,
`validate_code`, …) or the same data in `ai/`. Validate with `npx ds-validate <path>`.
