# Evals

Measures how well an AI model builds UI with the design system, so changes to docs, metadata,
the MCP server or the skill can be compared.

- `prompts.json`: 30 realistic requests across forms, dashboards, feedback, overlays,
  navigation, RTL and dark theme.
- `run.mjs`: asks a model for each prompt (conditions `docs` and `tools`), saves one `.tsx` each.
  Needs `ANTHROPIC_API_KEY` and costs API credits.
- `score.mjs`: scores a folder of `.tsx` files; `fixtures/` checks the scorer itself.

Targets (roadmap Phase 6): ≥ 90% design-system usage, 0 hallucinated props, 0 undocumented
values, 0 raw style values, 0 accessibility errors.

```bash
node evals/score.mjs evals/fixtures                               # scorer self-check
ANTHROPIC_API_KEY=… node evals/run.mjs --condition docs --only signup-form
ANTHROPIC_API_KEY=… node evals/run.mjs --condition tools
```
