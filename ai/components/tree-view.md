# TreeView

> A hierarchy of items, such as files in folders or pages in sections, that people expand, collapse and select. Follows the WAI-ARIA tree pattern.

Status: stable · Category: Navigation · Since 1.2.0

```tsx
import { TreeView } from '@ds/react';
import { TreeItem } from '@ds/react';
```

## When to use
- To browse nested content more than two levels deep, e.g. a file explorer.
- To pick one item from a hierarchy, e.g. a folder to move a file into.

## When not to use
- For a site’s main navigation with one or two levels. Use SideNav.
- To show and hide sections of a page. Use Accordion.
- For a flat list of items. Use List.

## Size (`size`)
- `small`: Dense sidebars and panels.
- `medium`: Default.

## Guides (`guides`)
- `false`: Default. Indentation alone shows the levels.
- `true`: Adds lines down each open branch, for deep trees.

## States
- **Collapsed**: A branch whose children are hidden. (Id not in expanded.)
- **Expanded**: A branch whose children show. (Id in expanded.)
- **Hover**: Highlights the row under the pointer. (:hover.)
- **Focus**: Shows which row the keyboard is on. (:focus-visible.)
- **Selected**: The chosen item. (selected matches the id.)
- **Disabled**: Cannot be selected. (disabled on the item.)

## Props
### TreeView

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the tree, e.g. "Files". |
| `items` | `TreeItem[]` |  |  |
| `expanded` | `string[]` |  | Ids of open branches (controlled). |
| `defaultExpanded` | `string[]` | [] | Ids of branches open at first. |
| `onExpandedChange` | `((ids: string[]) => void)` |  |  |
| `selected` | `string \| null` |  | Id of the selected item (controlled). |
| `defaultSelected` | `string \| null` |  |  |
| `onSelect` | `((id: string) => void)` |  |  |
| `size` | `TreeViewSize` | medium | `small` for dense sidebars, `medium` (default). |
| `guides` | `boolean` | false | Draws lines that connect children to their parent. |

### TreeItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Open the branch that holds the selected item. Don’t: Start with the selected item hidden in a closed branch. Why: People need to see where they are.
- Do: Use guides for trees deeper than three levels. Don’t: Rely on indentation alone in deep trees. Why: Lines make it clear which parent a row belongs to.
- Do: Use a tree for real hierarchies. Don’t: Use a tree for a flat list or for page navigation. Why: Tree keyboard behavior is unexpected where there is no hierarchy.

## Content
- Keep labels short; long labels are truncated with an ellipsis.
- Use icons consistently: the same icon for every item of the same kind.
- Name the tree with label, e.g. "Files" or "Pages".

## Accessibility
- Role: tree, with treeitem rows and group for each branch’s children.
- Up / Down: Move to the previous or next visible row.
- Right: Opens a closed branch, or moves to its first child.
- Left: Closes an open branch, or moves to the parent.
- Home / End: Move to the first or last visible row.
- Enter: Selects the row and opens or closes a branch.
- Space: Selects the row.
- `aria-label`: From label, on the tree.
- `aria-expanded`: On branches: whether they are open.
- `aria-selected`: On every row: whether it is selected.
- `aria-level`: On every row: its depth, starting at 1.
- Focus: One row is focusable at a time (roving tabindex); a ring outlines the focused row.
- WCAG 1.3.1 Info and Relationships: Levels and nesting are exposed with tree roles and aria-level.
- WCAG 2.1.1 Keyboard: Every action works with the arrow keys, Enter and Space.
- WCAG 4.1.2 Name, Role, Value: Expanded and selected states are exposed on each row.
- Selection is shown by background and weight, not color alone.

## Examples
### File tree
Folders with icons, one branch open.

```tsx
import { TreeView } from '@ds/react';

<TreeView
  label="Files"
  defaultExpanded={['src']}
  items={[
    { id: 'src', label: 'src', children: [{ id: 'app', label: 'App.tsx' }] },
    { id: 'readme', label: 'README.md' },
  ]}
/>
```

### Controlled selection
Shows the selected page elsewhere.

```tsx
import { TreeView } from '@ds/react';

<TreeView label="Pages" items={pages} selected={page} onSelect={setPage} />
```

### Deep tree with guides
Small rows with connecting lines.

```tsx
import { TreeView } from '@ds/react';

<TreeView label="Components" items={items} size="small" guides />
```

Tokens: `--tree-view-*` (values per theme in ai/components/tree-view.json).
