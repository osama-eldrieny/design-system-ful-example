import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Badge } from '../Badge';
import { IconButton } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { MoreHorizontal } from 'lucide-react';
import { KanbanBoard, type KanbanColumnData } from './KanbanBoard';

const columns: KanbanColumnData[] = [
  {
    id: 'todo',
    title: 'To do',
    items: [
      { id: '1', title: 'Change license and remove products', meta: <Badge size="small" shape="modern" tone="gray">Marketing</Badge> },
      { id: '2', title: 'Finish user onboarding', description: 'Walk through the first three steps.', meta: 'Tomorrow' },
    ],
  },
  {
    id: 'doing',
    title: 'In progress',
    items: [{ id: '3', title: 'Product update · Q4 2026', description: 'Dedicated form for a category of users.', meta: 'Feb 12, 2027' }],
  },
  { id: 'done', title: 'Completed', items: [{ id: '4', title: 'Design marketing assets', meta: 'Jan 8, 2027' }] },
];

const meta = {
  title: 'Components/Data display/KanbanBoard',
  component: KanbanBoard,
  tags: ['!autodocs'],
  args: {
    label: 'Task board',
    columns,
    renderActions: () => <IconButton icon={<MoreHorizontal />} label="Task options" variant="secondary" appearance="ghost" size="xsmall" />,
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof KanbanBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Compact: Story = { args: { compact: true } };

export const Empty: Story = {
  args: { columns: [{ id: 'todo', title: 'To do', items: [] }, { id: 'doing', title: 'In progress', items: [] }] },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <KanbanBoard
        {...args}
        label="لوحة المهام"
        columns={[
          { id: 'todo', title: 'للتنفيذ', items: [{ id: '1', title: 'اكتب الموجز' }] },
          { id: 'done', title: 'مكتمل', items: [] },
        ]}
      />
    </div>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <KanbanBoard {...args} label={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('region', { name: 'Task board' })).toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 2, name: /To do/ })).toBeInTheDocument();
    await expect(canvas.getAllByRole('listitem').length).toBeGreaterThanOrEqual(4);
  },
};
