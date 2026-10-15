# KanbanBoard

> Work grouped into columns by stage. Each column has a title and count; each task is a card with its detail, tags and any actions, such as moving it to another column.

Status: stable · Category: Data display · Since 1.3.0

```tsx
import { KanbanBoard } from '@ds/react';
import { KanbanCardData } from '@ds/react';
import { KanbanColumnData } from '@ds/react';
```

## When to use
- To see work across stages, e.g. To do, In progress, Done.
- When people move items between stages.

## When not to use
- For a flat list of tasks. Use List.
- For tasks by date. Use EventCalendar.
- For many records with columns of data. Use Table.

## Density (`compact`)
- `false`: Default. Comfortable cards.
- `true`: Tighter cards and gaps, to fit more tasks on screen.

## States
- **Default**: Columns and their cards at rest. (—)
- **Empty column**: A stage with no tasks shows a count of zero. (No items in the column.)

## Props
### KanbanBoard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Names the board, e.g. "Task board". |
| `columns` | `KanbanColumnData[]` |  |  |
| `compact` | `boolean` | false | Tighter cards and gaps, to fit more tasks on screen. |
| `renderActions` | `((item: KanbanCardData, column: KanbanColumnData) => ReactNode)` |  | Controls at the end of each card, e.g. a menu to move it to another column. |

### KanbanCardData

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### KanbanColumnData

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Show the count in each column header. Don’t: Make people count cards to see how much work is in a stage. Why: The count is the quickest way to see where work is piling up.
- Do: Keep to three to five stages. Don’t: Create a column for every status in the system. Why: Too many columns are hard to scan and scroll.
- Do: Put the move action on each card. Don’t: Require drag and drop as the only way to move a card. Why: A menu works with the keyboard and on touch screens.

## Content
- Name stages with verbs or states: "To do", "In progress", "Done".
- Keep card titles short; put details in the description.

## Accessibility
- Role: region named by label; each column is a section with a heading.
- Tab: Moves through the cards’ actions in reading order.
- `aria-labelledby`: Each column is named by its title.
- Focus: Card actions show their own focus rings.
- WCAG 1.3.1 Info and Relationships: Columns are sections with headings; cards are headings within them.
- WCAG 2.1.1 Keyboard: Every card action is reachable with the keyboard.
- Each column reads as a heading followed by its cards, so the stages are easy to navigate.

## Examples
### Three stages
To do, in progress and done.

```tsx
import { KanbanBoard } from '@ds/react';

<KanbanBoard
  label="Task board"
  columns={[
    { id: 'todo', title: 'To do', items: [{ id: '1', title: 'Write brief' }] },
    { id: 'doing', title: 'In progress', items: [] },
  ]}
/>
```

### With a move menu
A menu on each card to move it to another stage.

```tsx
import { KanbanBoard } from '@ds/react';

<KanbanBoard label="Tasks" columns={columns} renderActions={(item, column) => <MoveMenu item={item} from={column.id} />} />
```

### Tags and dates
Each card shows its tag, date and counts.

```tsx
import { KanbanBoard } from '@ds/react';

<KanbanBoard label="Campaign" columns={[{ id: 'todo', title: 'To do', items: [{ id: '1', title: 'Launch post', meta: <span>Mon</span> }] }]} />
```

Tokens: `--kanban-board-*` (values per theme in ai/components/kanban-board.json).
