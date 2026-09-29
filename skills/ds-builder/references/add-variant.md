# Add a variant, size or state

1. Read the component's contract (`get_component`) and its token file
   `packages/tokens/src/components/{component}.css`.
2. **Tokens first.** Name them with the grammar `--{component}-{variant}-{style?}-{state}-{property}`
   and point them at **semantic** tokens (e.g. `var(--color-bg-accent-danger-default)`), never at
   palette steps or raw values. Per-mode values (radius, shadow, density) go in `themes/*.css`.
3. **CSS:** add a modifier class `ds-{component}--{variant}` that sets the component's private
   helpers (`--_bg`, `--_text`, …). Use only the component's own tokens.
4. **Props:** extend the union type, document the new value in JSDoc, and add it to
   `{Name}.meta.ts` options with its *meaning*.
5. **Stories:** add it to the options story and `AllThemes`; keep the interaction test passing.
6. Run `npm run tokens:contrast` (0 failures), `npm run lint`, `npm test`, then `npm run ai`.
