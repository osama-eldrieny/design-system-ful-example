# Add a component

1. Check it doesn't exist (`list_components`) and can't be composed from existing ones.
2. Scaffold: `node skills/ds-builder/scripts/scaffold-component.mjs {Name} {Category}` creates the
   folder, token file, meta, stories, tests and MDX page with TODOs.
3. **Tokens:** fill `packages/tokens/src/components/{name}.css` (semantic references only) and
   import it in `tokens.css` (alphabetical).
4. **Component:** semantic HTML first; Radix primitives for complex widgets; `forwardRef`,
   `className` passthrough, JSDoc on every prop; real states in CSS; logical properties.
5. **Metadata:** complete `{Name}.meta.ts` — at least 3 do/don’t guidelines with a reason, 3
   runnable examples, keyboard map, ARIA and WCAG notes.
6. **Stories:** Playground, one per option, States, RightToLeft, AllThemes, plus an interaction
   test (`tags: ['test']`). Export from `packages/react/src/components/index.ts`.
7. Run `npm run typecheck && npm run lint && npm test && npm run ai`.
