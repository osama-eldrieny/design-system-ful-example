# EmptyState

> An empty state fills a space that has nothing to show yet, like an empty list or no search results, and explains why and what to do next.

Status: stable · Category: Feedback · Since 0.4.0

```tsx
import { EmptyState } from '@ds/react';
```

## When to use
- For empty lists, tables and dashboards.
- For searches or filters with no results.

## When not to use
- For errors. Use Alert.
- While loading. Use Skeleton or Spinner.

## Heading level (`titleAs`)
- `h2`: Default.
- `h3 / h4`: Inside sections.

## States
- **Static**: Shown when there’s no content. (—)

## Props
### EmptyState

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | <Inbox /> | Decorative icon. Default an inbox. |
| `title` | `ReactNode` |  | What’s empty, e.g. "No orders yet". |
| `description` | `ReactNode` |  | Why it’s empty and what to do next. |
| `actions` | `ReactNode` |  | Actions, e.g. a Button to create the first item. |
| `titleAs` | `"h2" \| "h3" \| "h4"` | h2 | Heading level that fits the page. Default h2. |

## Guidelines
- Do: Offer the next step. Don’t: Leave people at a dead end. Why: An action gets people going.
- Do: Match the situation (first use vs. no results). Don’t: Use the same message everywhere. Why: The fix differs: create vs. change filters.
- Do: Keep it short. Don’t: Write a paragraph. Why: People scan empty states.

## Content
- Title: what’s empty (“No orders yet”).
- Description: how to fill it.
- Action: a verb (“Create order”).

## Accessibility
- Role: text with a heading.
- Tab: Reaches the actions.
- `aria-hidden on the icon`: Always.
- Focus: None.
- WCAG 1.3.1 Info and Relationships: A real heading.
- WCAG 2.4.6 Headings and Labels: The title describes the empty area.

## Examples
### First use
Nothing created yet.

```tsx
import { EmptyState, Button } from '@ds/react';

<EmptyState title="No orders yet" description="Orders appear here once customers buy." actions={<Button>Create order</Button>} />
```

### No results
Filters too narrow.

```tsx
import { EmptyState, Button } from '@ds/react';
import { SearchX } from 'lucide-react';

<EmptyState icon={<SearchX />} title="No results" description="Try other words or clear filters." actions={<Button appearance="outline">Clear filters</Button>} />
```

### Heading level
Inside a section.

```tsx
import { EmptyState } from '@ds/react';

<EmptyState titleAs="h3" title="No comments" />
```

Tokens: `--empty-state-*` (values per theme in ai/components/empty-state.json).
