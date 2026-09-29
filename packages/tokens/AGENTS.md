# AGENTS.md — @ds/tokens

See the root [AGENTS.md](../../AGENTS.md) first.

- Plain CSS, edited by hand. Tiers: `primitives.css` → `themes/*.css` (semantic, per theme via
  `data-*` attributes) → `components/*.css` (component tokens as `var()` references).
- Describe new tokens in the file header (“Token reference” legend or “Grammar” line).
- Per-mode component values (radius, shadow, density) go in `themes/radius.css`,
  `themes/shadow.css`, `themes/density.css`, mirroring an existing component when possible.
- After changes: `npm test` (every theme combination resolves) and `npm run tokens:contrast`
  (0 failures). Changing brand colors needs the owner's approval.
