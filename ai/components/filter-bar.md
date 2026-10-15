# FilterBar

> A toolbar for narrowing a list or table: an optional search, one menu per filter with checkable options, and the chosen values as removable chips with Clear all.

Status: stable · Category: Forms · Since 1.2.0

```tsx
import { FilterBar } from '@ds/react';
import { FilterDefinition } from '@ds/react';
import { FilterValue } from '@ds/react';
```

## When to use
- Above a table or list that people narrow by a few attributes, e.g. status and owner.
- When several values of the same filter can apply at once.

## When not to use
- To switch between a few fixed views. Use Tabs.
- For a single filter with two or three values. Use SegmentedControl.
- For search alone. Use SearchField.

## Chips (`showChips`)
- `true`: Default. Chosen values show as removable chips under the bar.
- `false`: Counts on the triggers only, for tight spaces.

## States
- **Default**: No values chosen for the filter. (—)
- **Hover**: The trigger responds to the pointer. (:hover.)
- **Focus**: Shows keyboard focus on a trigger. (:focus-visible.)
- **Open**: The filter’s menu is open; the chevron flips. (Click or Enter.)
- **Active**: The filter has chosen values; tinted with a count. (value has entries.)

## Props
### FilterBar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the toolbar, e.g. "Filter invoices". |
| `filters` | `FilterDefinition[]` |  |  |
| `value` | `FilterValue` |  | Chosen values (controlled). |
| `defaultValue` | `FilterValue` | {} |  |
| `onValueChange` | `((value: FilterValue) => void)` |  |  |
| `search` | `ReactNode` |  | Content at the start of the bar, usually a SearchField. |
| `end` | `ReactNode` |  | Content at the end, e.g. a result count or a sort menu. |
| `showChips` | `boolean` | true | Shows the chosen values as removable chips under the bar. Default true. |
| `clearLabel` | `string` | Clear all | Words for the clear button. Default "Clear all". |
| `selectedLabel` | `((filter: string, count: number) => string)` | (f, n) => `${f}, ${n} selected` | Spoken name of a trigger with chosen values. Default "{filter}, {count} selected". |
| `removeLabel` | `((filter: string, option: string) => string)` | (f, o) => `Remove ${f}: ${o}` | Words for a chip's remove button. Default "Remove {filter}: {option}". |

### FilterDefinition

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### FilterValue

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Show the result count next to the filters. Don’t: Leave people guessing whether a filter changed anything. Why: Immediate feedback confirms the filter applied.
- Do: Keep to three to five filters. Don’t: Put every column of the table in the bar. Why: Too many triggers wrap into a wall of buttons.
- Do: Keep chips on when filters can be combined. Don’t: Hide what is filtered in narrow layouts without a count. Why: People forget active filters and think data is missing.

## Content
- Name filters with nouns: "Status", "Owner".
- Chips read "Filter: value" so they make sense on their own.
- Show the number of results in end so people see the effect.

## Accessibility
- Role: toolbar, named by label; each filter is a menu button with checkbox items.
- Tab: Moves between search, triggers, chips and Clear all.
- Enter / Space / Down: Opens a filter’s menu.
- Up / Down: Move between options in the menu.
- Enter / Space: Checks or unchecks an option.
- Escape: Closes the menu and returns focus to its trigger.
- `aria-label`: On the toolbar, from label.
- `aria-expanded`: On each trigger, set by the menu.
- `menuitemcheckbox`: Each option, with aria-checked.
- Focus: Triggers show a focus ring; focus returns to the trigger when its menu closes.
- WCAG 1.3.1 Info and Relationships: Counts are announced with the trigger name, e.g. "Status, 2 selected".
- WCAG 2.1.1 Keyboard: Menus and chips work fully from the keyboard.
- WCAG 4.1.2 Name, Role, Value: Options expose their checked state.
- Active filters are shown by count and chips, not only by tint.

## Examples
### Invoice filters
Search, two filters and a result count.

```tsx
import { FilterBar, SearchField } from '@ds/react';

<FilterBar
  label="Filter invoices"
  search={<SearchField placeholder="Search invoices" />}
  filters={[
    { id: 'status', label: 'Status', options: [{ value: 'paid', label: 'Paid' }, { value: 'due', label: 'Due' }] },
    { id: 'owner', label: 'Owner', options: [{ value: 'lana', label: 'Lana' }, { value: 'omar', label: 'Omar' }] },
  ]}
  end={<span>24 results</span>}
/>
```

### Controlled
Keeps filters in state, e.g. to sync them with the URL.

```tsx
import { FilterBar } from '@ds/react';

<FilterBar label="Filter" filters={filters} value={value} onValueChange={setValue} />
```

### Without chips
Counts on the triggers only.

```tsx
import { FilterBar } from '@ds/react';

<FilterBar label="Filter" filters={filters} showChips={false} />
```

Tokens: `--filter-bar-*` (values per theme in ai/components/filter-bar.json).
