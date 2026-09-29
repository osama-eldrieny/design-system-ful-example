# SearchField

> A search field has a search icon, a clear button and an optional keyboard shortcut that focuses it from anywhere on the page. Enter searches and Escape clears. It is built on InputField.

Status: stable · Category: Forms · Since 0.3.0

```tsx
import { SearchField } from '@ds/react';
```

## When to use
- To search or filter content on a page or across the site.
- In toolbars and headers, often with a shortcut such as / or ⌘K.

## When not to use
- To pick a value from a known list. Use Combobox or Select.
- For other single-line text. Use InputField.

## Size (from InputField) (`size`)
- `small`: Toolbars and dense UI.
- `medium`: Default.
- `large`: Hero or page-level search.

## States
- **Empty**: Placeholder and shortcut hint. (—)
- **Filled**: Clear button instead of the hint. (a query)
- **Focus, hover, disabled**: From InputField. (—)

## Props
### SearchField

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | Search | Names the field. Default "Search"; hidden unless showLabel is set. |
| `showLabel` | `boolean` | false | Shows the label above the field. By default the search icon and placeholder carry it. |
| `shortcut` | `string` |  | Key that focuses the field from anywhere on the page, e.g. "/" or "mod+k" (⌘K on Mac, Ctrl+K elsewhere). Shown as a hint and exposed with aria-keyshortcuts. |
| `onSearch` | `((query: string) => void)` |  | Called with the query when Enter is pressed. |
| `onValueChange` | `((query: string) => void)` |  | Called with the new query as people type or clear. |
| `size` | `InputFieldSize` |  | `small` for dense UI, `medium` by default, `large` for prominent forms. |
| `hideLabel` | `boolean` |  | Hides the label visually but keeps it for screen readers. Only for fields whose purpose is obvious from context, such as a search box with a search icon. |
| `optional` | `boolean` |  | Marks the field optional with text after the label. Use when most fields are required. |
| `optionalLabel` | `string` |  | Text shown for optional fields. Default "(optional)". |
| `description` | `ReactNode` |  | Help text under the field, e.g. format hints. |
| `error` | `ReactNode` |  | Error message. Marks the field invalid and replaces the success message. |
| `success` | `ReactNode` |  | Confirmation message, e.g. "Username is available". |
| `clearLabel` | `string` |  | Accessible name of the clear button. Default "Clear". |

## Guidelines
- Do: Say what is searched in the placeholder or label. Don’t: Write just “Type here”. Why: People need to know the scope of the search.
- Do: Use a familiar shortcut like / or ⌘K. Don’t: Bind letters people type everywhere, like s. Why: Single-letter shortcuts clash with typing and assistive tech.
- Do: Show results as people type only when it’s fast. Don’t: Run a slow search on every keystroke. Why: Laggy results are worse than pressing Enter.

## Content
- Placeholder: what can be searched, e.g. “Search products”.
- Wrap page-level search in a <search> element or role="search" landmark.

## Accessibility
- Role: searchbox (input type="search").
- Shortcut: Focuses the field.
- Enter: Searches.
- Escape: Clears the query.
- `aria-keyshortcuts`: With shortcut.
- `aria-label on the clear button`: From InputField (“Clear”).
- Focus: Clearing returns focus to the field.
- WCAG 2.1.4 Character Key Shortcuts: Single-key shortcuts only fire when not typing elsewhere.
- WCAG 3.3.2 Labels or Instructions: Always has an accessible label.
- WCAG 4.1.2 Name, Role, Value: Native search input.

## Examples
### Search
Searches on Enter.

```tsx
import { SearchField } from '@ds/react';

<SearchField placeholder="Search products" onSearch={(q) => navigate(`/search?q=${q}`)} />
```

### With a shortcut
⌘K / Ctrl+K focuses it.

```tsx
import { SearchField } from '@ds/react';

<search>
  <SearchField placeholder="Search docs" shortcut="mod+k" />
</search>
```

### Live filter
Controlled; filters as people type.

```tsx
import { SearchField } from '@ds/react';

<SearchField label="Filter orders" placeholder="Filter orders" value={q} onValueChange={setQ} size="small" />
```

Tokens: `--search-field-*` (values per theme in ai/components/search-field.json).
