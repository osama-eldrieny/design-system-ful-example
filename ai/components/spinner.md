# Spinner

> A spinner shows that something is loading when the time it takes is unknown. It announces its label once, politely, to screen readers.

Status: stable · Category: Feedback · Since 0.4.0

```tsx
import { Spinner } from '@ds/react';
```

## When to use
- For short waits of unknown length: loading a panel, saving, fetching results.

## When not to use
- When progress is known, e.g. uploads. Use Progress.
- When the page layout is known. Use Skeleton.

## Size (`size`)
- `small`: Inside buttons and fields.
- `medium`: Default.
- `large`: Page areas.

## States
- **Spinning**: While shown. (—)

## Props
### Spinner

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"small" \| "medium" \| "large"` | medium | `small` inside buttons and fields, `medium` (default), `large` for page areas. |
| `label` | `string` | Loading | What is loading, announced politely, e.g. "Loading orders". Default "Loading". |

## Guidelines
- Do: Say what’s loading in the label. Don’t: Leave the default label for every spinner. Why: Specific labels tell screen reader users what they’re waiting for.
- Do: Use one spinner per loading area. Don’t: Show a spinner in every card at once. Why: Many spinners are noisy visually and for screen readers.
- Do: Show a Skeleton when the layout is known. Don’t: Replace a whole page with a spinner. Why: Skeletons reduce layout jumps and feel faster.

## Content
- Say what is loading: “Loading orders”, not just “Loading”.

## Accessibility
- Role: status.
- —: Not focusable.
- `role="status"`: Always; the label is its text.
- Focus: None.
- WCAG 4.1.3 Status Messages: Loading is announced without moving focus.
- WCAG 2.3.3 Animation from Interactions: Slows for reduced motion.
- WCAG 1.4.11 Non-text Contrast: Arc color meets 3:1.
- Mark the loading region aria-busy="true" until it’s ready.

## Examples
### Loading a panel
With a specific label.

```tsx
import { Spinner } from '@ds/react';

<Spinner label="Loading orders" />
```

### In a button
Small size.

```tsx
import { Button, Spinner } from '@ds/react';

<Button disabled><Spinner size="small" label="Saving" /> Saving…</Button>
```

### Busy region
Mark the area busy.

```tsx
import { Spinner } from '@ds/react';

<section aria-busy={loading}>
  {loading ? <Spinner size="large" label="Loading report" /> : <Report />}
</section>
```

Tokens: `--spinner-*` (values per theme in ai/components/spinner.json).
