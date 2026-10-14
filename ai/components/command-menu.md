# CommandMenu

> A searchable list of pages and actions in a dialog, opened with ⌘K (Ctrl+K): type to filter, arrow keys to move, Enter to run. Groups, icons, descriptions and shortcut hints.

Status: stable · Category: Overlays · Since 1.1.0

```tsx
import { CommandMenu } from '@ds/react';
```

## When to use
- Fast navigation and actions in apps with many pages.
- A global search over records, with results grouped by type.

## When not to use
- For a few actions on one item. Use DropdownMenu.
- For choosing a form value. Use Combobox.

## Hotkey (`hotkey`)
- `true`: ⌘K / Ctrl+K toggles the menu anywhere. Default.
- `false`: Open it yourself, e.g. from a search button.

## States
- **Closed**: Hidden. (Default.)
- **Open**: Dialog with focus in the search. (⌘K or open.)
- **Active item**: Highlighted; Enter runs it. (Arrow keys or pointer.)
- **Empty**: Nothing matches. (Search text.)

## Props
### CommandMenu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` |  |  |
| `defaultOpen` | `boolean` | false |  |
| `onOpenChange` | `((open: boolean) => void)` |  |  |
| `groups` | `CommandMenuGroup[]` |  | Results, grouped. Filtered by the search text. |
| `label` | `string` | Command menu | Names the dialog and the search field. Default "Command menu". |
| `placeholder` | `string` | Search or type a command… | Default "Search or type a command…". |
| `emptyText` | `ReactNode` | No results | Shown when nothing matches. Default "No results". |
| `hotkey` | `boolean` | true | Opens the menu with ⌘K / Ctrl+K anywhere on the page. Default true. |
| `showFooter` | `boolean` | true | Shows key hints at the bottom. Default true. |
| `onSearchChange` | `((search: string) => void)` |  | Called with the search text, e.g. to load results from a server. |

## Guidelines
- Do: Offer a visible search button too. Don’t: Rely on the hotkey alone. Why: Not everyone knows ⌘K.
- Do: Group results by type. Don’t: Mix pages, people and actions in one list. Why: Groups make long lists scannable.
- Do: Keep shortcut hints accurate. Don’t: Show shortcuts that do nothing. Why: Hints teach faster paths.

## Content
- Name items as pages ("Orders") or verbs ("New invoice").
- Add keywords for synonyms people might type.

## Accessibility
- Role: dialog with a combobox search field controlling a listbox of options.
- ⌘K / Ctrl+K: Opens and closes.
- Arrow Up / Down: Moves between results.
- Home / End: First or last result.
- Enter: Runs the active result.
- Escape: Closes.
- `aria-activedescendant`: Points the search field at the active option.
- `role="group" + label`: Each result group.
- Focus: Focus stays in the search field; the active option is highlighted. Focus returns on close.
- WCAG 2.1.1 Keyboard: Everything works from the keyboard.
- WCAG 4.1.2 Name, Role, Value: Combobox and listbox semantics.
- ⌘K is a convention, not an operating system shortcut; avoid conflicts in your app.

## Examples
### Pages and actions
Opens with ⌘K.

```tsx
import { CommandMenu } from '@ds/react';

<CommandMenu groups={[{ label: 'Pages', items: [{ id: 'orders', label: 'Orders', onSelect: () => go('/orders') }] }]} />
```

### From a search button
Controlled open state.

```tsx
import { Button, CommandMenu } from '@ds/react';

const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Search…</Button>
<CommandMenu open={open} onOpenChange={setOpen} groups={groups} />
```

### Server results
Fetch as people type.

```tsx
import { CommandMenu } from '@ds/react';

<CommandMenu groups={results} onSearchChange={(q) => fetchResults(q)} />
```

Tokens: `--command-menu-*` (values per theme in ai/components/command-menu.json).
