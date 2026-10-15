import { defineMeta } from '../meta';

export default defineMeta({
  id: 'kanban-board',
  name: 'KanbanBoard',
  category: 'Data display',
  status: 'stable',
  since: '1.3.0',
  description:
    'Work grouped into columns by stage. Each column has a title and count; each task is a card with its detail, tags and any actions, such as moving it to another column.',
  imports: [
    { name: 'KanbanBoard', from: '@ds/react' },
    { name: 'KanbanCardData', from: '@ds/react' },
    { name: 'KanbanColumnData', from: '@ds/react' },
  ],
  whenToUse: [
    'To see work across stages, e.g. To do, In progress, Done.',
    'When people move items between stages.',
  ],
  whenNotToUse: [
    { text: 'For a flat list of tasks.', alternative: 'List' },
    { text: 'For tasks by date.', alternative: 'EventCalendar' },
    { text: 'For many records with columns of data.', alternative: 'Table' },
  ],
  anatomy: [
    { name: 'Column', description: 'One stage, with its title and count.' },
    { name: 'Card', description: 'One task: title, detail, metadata and actions.' },
    { name: 'Metadata', description: 'Tags, dates and counts under the detail.', optional: true },
    { name: 'Actions', description: 'Controls on the card, e.g. a move menu.', optional: true },
  ],
  options: [
    {
      prop: 'compact',
      title: 'Density',
      values: [
        { value: 'false', meaning: 'Default. Comfortable cards.' },
        { value: 'true', meaning: 'Tighter cards and gaps, to fit more tasks on screen.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Columns and their cards at rest.', trigger: '—' },
    { name: 'Empty column', meaning: 'A stage with no tasks shows a count of zero.', trigger: 'No items in the column.' },
  ],
  behavior: [
    { topic: 'Scrolling', text: 'On narrow screens the columns scroll sideways; each column keeps its width.' },
    { topic: 'Moving', text: 'The board shows stages; moving a card is done through its actions, which update your data.' },
    { topic: 'Right-to-left', text: 'Columns run from the right in Arabic.' },
  ],
  content: [
    'Name stages with verbs or states: "To do", "In progress", "Done".',
    'Keep card titles short; put details in the description.',
  ],
  guidelines: [
    {
      do: 'Show the count in each column header.',
      dont: 'Make people count cards to see how much work is in a stage.',
      why: 'The count is the quickest way to see where work is piling up.',
    },
    {
      do: 'Keep to three to five stages.',
      dont: 'Create a column for every status in the system.',
      why: 'Too many columns are hard to scan and scroll.',
    },
    {
      do: 'Put the move action on each card.',
      dont: 'Require drag and drop as the only way to move a card.',
      why: 'A menu works with the keyboard and on touch screens.',
    },
  ],
  accessibility: {
    role: 'region named by label; each column is a section with a heading.',
    keyboard: [{ keys: 'Tab', action: 'Moves through the cards’ actions in reading order.' }],
    aria: [{ attribute: 'aria-labelledby', when: 'Each column is named by its title.' }],
    focus: 'Card actions show their own focus rings.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Columns are sections with headings; cards are headings within them.' },
      { criterion: '2.1.1 Keyboard', how: 'Every card action is reachable with the keyboard.' },
    ],
    notes: ['Each column reads as a heading followed by its cards, so the stages are easy to navigate.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Three stages',
      description: 'To do, in progress and done.',
      code: `import { KanbanBoard } from '@ds/react';

<KanbanBoard
  label="Task board"
  columns={[
    { id: 'todo', title: 'To do', items: [{ id: '1', title: 'Write brief' }] },
    { id: 'doing', title: 'In progress', items: [] },
  ]}
/>`,
    },
    {
      id: 'actions',
      title: 'With a move menu',
      description: 'A menu on each card to move it to another stage.',
      code: `import { KanbanBoard } from '@ds/react';

<KanbanBoard label="Tasks" columns={columns} renderActions={(item, column) => <MoveMenu item={item} from={column.id} />} />`,
    },
    {
      id: 'meta',
      title: 'Tags and dates',
      description: 'Each card shows its tag, date and counts.',
      code: `import { KanbanBoard } from '@ds/react';

<KanbanBoard label="Campaign" columns={[{ id: 'todo', title: 'To do', items: [{ id: '1', title: 'Launch post', meta: <span>Mon</span> }] }]} />`,
    },
  ],
  tokenPrefixes: ['--kanban-board-'],
  related: [
    { id: 'list', relation: 'For a flat list of tasks.' },
    { id: 'card', relation: 'The task card this uses.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
