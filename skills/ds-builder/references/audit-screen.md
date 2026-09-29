# Audit a screen

1. `npx ds-validate <path> --json` — raw HTML controls, undocumented props, missing names, raw
   colors/lengths in CSS and inline styles.
2. For each finding, look up the right component or token (`get_component`, `get_tokens`) and fix.
3. Check what linting can't: one `h1` and ordered headings; visible focus; labels match what
   people see; color isn't the only signal; nothing breaks at 320 px wide or in RTL.
4. Run axe (Storybook a11y panel or `npm test` for stories) in light and dark.
5. Report what you changed and anything left for a human decision (copy, brand colors, new APIs).
