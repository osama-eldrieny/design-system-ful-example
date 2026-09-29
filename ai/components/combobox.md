# Combobox

> A combobox is a text field with a list of suggestions: people type to filter and pick one option, or several shown as removable chips. It works with local options or results fetched as people type.

Status: stable · Category: Forms · Since 0.3.0

```tsx
import { Combobox } from '@ds/react';
```

## When to use
- To pick from a long list people will search, e.g. countries, users or products.
- To pick several options without a long checkbox list (multiple).
- For search-as-you-type against a server.

## When not to use
- For a short list of known options. Use Select or RadioGroup.
- For free-text search without picking a value. Use SearchField.

## Selection (`multiple`)
- `false`: One option; the input shows it. Default.
- `true`: Several options as chips; the list stays open to pick more.

## Size (`size`)
- `small`: Dense UI.
- `medium`: Default.
- `large`: Prominent forms.

## States
- **Open**: List shown; chevron flips. (typing, ↓ or the toggle)
- **Loading**: “Loading…” in the list. (loading)
- **Empty**: “No results”. (no matches)
- **Error / success**: Border and message from FormField. (error / success)
- **Disabled**: Dimmed; can’t type or open. (disabled)

## Props
### Combobox

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `multiple` | `boolean` |  | Lets people pick several options, shown as removable chips. |
| `value` | `string \| string[] \| null` |  | Selected value (controlled). |
| `defaultValue` | `string \| string[] \| null` |  |  |
| `onValueChange` | `((value: string \| null) => void) \| ((value: string[]) => void)` |  |  |
| `label` | `ReactNode` |  | What to choose, e.g. "Country". Always required: it names the field. |
| `hideLabel` | `boolean` |  |  |
| `description` | `ReactNode` |  |  |
| `error` | `ReactNode` |  |  |
| `success` | `ReactNode` |  |  |
| `required` | `boolean` |  |  |
| `optional` | `boolean` |  |  |
| `placeholder` | `string` |  |  |
| `options` | `ComboboxOption[]` |  | All options, or for async search the current results. |
| `filter` | `false \| ((option: ComboboxOption, query: string) => boolean)` |  | How typed text filters options. Default: case-insensitive “contains” on the label. Pass false when options are already filtered, e.g. by a server. |
| `inputValue` | `string` |  | Typed text (controlled), e.g. to fetch results. |
| `onInputChange` | `((query: string) => void)` |  | Called with the typed text. |
| `loading` | `boolean` |  | Shows the loading message instead of options, e.g. while fetching. |
| `emptyMessage` | `string` |  | Text when nothing matches. Default "No results". |
| `loadingMessage` | `string` |  | Text while loading. Default "Loading…". |
| `removeLabel` | `((label: string) => string)` |  | Accessible name of each chip's remove button, for translation. |
| `size` | `ComboboxSize` |  |  |
| `disabled` | `boolean` |  |  |
| `name` | `string` |  | Form field name; selected values are submitted as hidden inputs. |
| `id` | `string` |  |  |
| `className` | `string` |  |  |

## Guidelines
- Do: Debounce server searches and show loading. Don’t: Fetch on every keystroke with no feedback. Why: People need to know results are coming.
- Do: Use Select for short lists. Don’t: Make people type to find one of five options. Why: A short list is faster to scan than to search.
- Do: Keep chips short and removable. Don’t: Let a multiple combobox grow to dozens of chips. Why: Long chip lists are hard to review; use a separate list for many items.

## Content
- Placeholder: what to type, e.g. “Type a country”.
- Empty message: help people recover, e.g. “No countries match. Check the spelling.”

## Accessibility
- Role: combobox input with a listbox (ARIA 1.2 pattern).
- ↓ / ↑: Open and move through options.
- Enter: Pick the highlighted option.
- Escape: Close the list.
- Backspace / ← on chips: Move to and remove chips.
- `aria-expanded, aria-controls, aria-activedescendant`: From Downshift on the input.
- `aria-labelledby`: The input and list are named by the field label.
- `role="status"`: Announces the number of results.
- `aria-label on chip buttons`: “Remove {option}”.
- Focus: Focus stays in the input while moving through options.
- WCAG 2.1.1 Keyboard: Everything works from the keyboard.
- WCAG 4.1.2 Name, Role, Value: Labelled combobox and listbox; selected options marked.
- WCAG 4.1.3 Status Messages: Result counts are announced.

## Examples
### Single
Filter a local list.

```tsx
import { Combobox } from '@ds/react';

<Combobox label="Country" placeholder="Type a country" options={countries} onValueChange={setCountry} />
```

### Multiple
Chips for several choices.

```tsx
import { Combobox } from '@ds/react';

<Combobox multiple label="Skills" options={skills} defaultValue={['react']} name="skills" />
```

### Async results
Server-filtered options with loading.

```tsx
import { Combobox } from '@ds/react';

const [query, setQuery] = useState('');
const { data = [], isLoading } = useUsers(useDebounce(query, 250));

<Combobox
  label="Assignee"
  options={data.map((u) => ({ value: u.id, label: u.name }))}
  filter={false}
  inputValue={query}
  onInputChange={setQuery}
  loading={isLoading}
/>
```

Tokens: `--combobox-*` (values per theme in ai/components/combobox.json).
