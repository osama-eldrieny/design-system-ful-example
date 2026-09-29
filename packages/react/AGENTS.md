# AGENTS.md — @ds/react

See the root [AGENTS.md](../../AGENTS.md) first.

- One folder per component: `src/{Name}/{Name}.tsx`, `{Name}.css`, `{Name}.meta.ts`,
  `{Name}.stories.tsx`, `{Name}.test.tsx`, `index.ts`; export it from `src/components/index.ts`.
- CSS: BEM classes `ds-{block}__{element}--{modifier}`, logical properties, only the component's
  own `--{component}-*` tokens (private helpers `--_name` declared in the same file are fine).
- Props: JSDoc on every prop (it feeds the docs and `ai/`), `forwardRef`, `className` passthrough.
- States are real (`:hover`, `:focus-visible`, `[disabled]`, `[aria-*]`), not props.
- `{Name}.meta.ts` must pass `meta.test.ts` (schema, docs link). Stories need `AllThemes` and an
  interaction test tagged `test`; axe runs on every story.
