import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { Download, Plus, Search } from 'lucide-react';
import { AvatarLabelGroup } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { InputField } from '../InputField';
import { Pagination } from '../Pagination';
import { Progress } from '../Progress';
import { ThemeProvider } from '../ThemeProvider';
import { Table, TableCard, type TableColumn } from './Table';

interface Order {
  id: string;
  customer: string;
  status: 'Paid' | 'Pending' | 'Refunded';
  total: number;
}

const orders: Order[] = [
  { id: '1024', customer: 'Sarah Chen', status: 'Paid', total: 299 },
  { id: '1025', customer: 'James Wilson', status: 'Pending', total: 1299 },
  { id: '1026', customer: 'Maria Garcia', status: 'Refunded', total: 79 },
  { id: '1027', customer: 'Osama Eldrieny', status: 'Paid', total: 549 },
];
const tone = { Paid: 'success', Pending: 'warning', Refunded: 'secondary' } as const;
const columns: TableColumn<Order>[] = [
  { key: 'id', header: 'Order', sortable: true },
  { key: 'customer', header: 'Customer', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <Badge tone={tone[r.status]}>{r.status}</Badge>,
  },
  {
    key: 'total',
    header: 'Total',
    align: 'end',
    sortable: true,
    render: (r) => `$${r.total.toLocaleString('en-US')}`,
  },
];

// A Table typed for these rows.
const OrderTable = Table<Order>;

const meta = {
  title: 'Components/Data display/Table',
  component: OrderTable,
  tags: ['!autodocs'],
  args: { caption: 'Recent orders', columns, rows: orders },
  argTypes: { columns: { control: false }, rows: { control: false } },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof OrderTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Selectable: Story = {
  args: {
    selectable: true,
    defaultSelected: ['1025'],
    rowLabel: (r: Order) => `Select order ${r.id}`,
  },
};

export const Density: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <OrderTable {...args} caption="Striped" striped />
      <OrderTable {...args} caption="Compact" compact />
    </div>
  ),
};

export const LoadingAndEmpty: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <OrderTable {...args} caption="Loading" loading />
      <OrderTable {...args} caption="Empty" rows={[]} empty="No orders yet." />
    </div>
  ),
};

export const StickyHeader: Story = {
  render: (args) => (
    <div style={{ blockSize: 180, display: 'flex' }}>
      <Table
        {...args}
        rows={[...orders, ...orders.map((o) => ({ ...o, id: `${o.id}b` }))]}
        stickyHeader
      />
    </div>
  ),
};

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  team: 'Design' | 'Product' | 'Engineering';
  status: 'Active' | 'Away';
  usage: number;
}

const members: Member[] = [
  {
    id: 1,
    name: 'Olivia Rhye',
    email: 'olivia@untitled.com',
    role: 'Product Designer',
    team: 'Design',
    status: 'Active',
    usage: 72,
  },
  {
    id: 2,
    name: 'Phoenix Baker',
    email: 'phoenix@untitled.com',
    role: 'Product Manager',
    team: 'Product',
    status: 'Active',
    usage: 54,
  },
  {
    id: 3,
    name: 'Lana Steiner',
    email: 'lana@untitled.com',
    role: 'Frontend Developer',
    team: 'Engineering',
    status: 'Away',
    usage: 31,
  },
  {
    id: 4,
    name: 'Demi Wilkinson',
    email: 'demi@untitled.com',
    role: 'Backend Developer',
    team: 'Engineering',
    status: 'Active',
    usage: 88,
  },
];

const teamTone = { Design: 'indigo', Product: 'blue', Engineering: 'teal' } as const;

const memberColumns: TableColumn<Member>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (m) => <AvatarLabelGroup name={m.name} supportingText={m.email} size="small" />,
  },
  {
    key: 'status',
    header: 'Status',
    render: (m) => (
      <Badge tone={m.status === 'Active' ? 'success' : 'gray'} shape="modern" size="small" withDot>
        {m.status}
      </Badge>
    ),
  },
  { key: 'role', header: 'Role', hideBelow: 'medium' },
  {
    key: 'team',
    header: 'Team',
    hideBelow: 'small',
    render: (m) => (
      <Badge tone={teamTone[m.team]} size="small">
        {m.team}
      </Badge>
    ),
  },
  {
    key: 'usage',
    header: 'Usage',
    hint: 'Share of the seat’s monthly quota used.',
    sortable: true,
    hideBelow: 'large',
    width: 180,
    render: (m) => (
      <Progress
        label={`${m.name} usage`}
        hideLabel
        value={m.usage}
        showValue
        valuePosition="end"
        size="small"
      />
    ),
  },
];

/**
 * TableCard: a header with a title, badge, description and actions, a toolbar with tabs and
 * search, and pagination in the footer. Cells show avatars, badges and progress; less
 * important columns hide on narrow screens.
 */
export const InACard: Story = {
  render: () => (
    <TableCard
      title="Team members"
      badge="100 users"
      description="Manage your team members and their account permissions here."
      actions={
        <>
          <Button variant="secondary" appearance="outline" size="small" iconStart={<Download />}>
            Export
          </Button>
          <Button size="small" iconStart={<Plus />}>
            Add member
          </Button>
        </>
      }
      toolbar={
        <>
          <ButtonGroup aria-label="Filter members" attached defaultValue="all">
            <Button value="all" variant="secondary" appearance="outline" size="small">
              View all
            </Button>
            <Button value="design" variant="secondary" appearance="outline" size="small">
              Design
            </Button>
            <Button value="eng" variant="secondary" appearance="outline" size="small">
              Engineering
            </Button>
          </ButtonGroup>
          <div style={{ marginInlineStart: 'auto', minInlineSize: 200 }}>
            <InputField
              label="Search members"
              hideLabel
              size="small"
              iconStart={<Search />}
              placeholder="Search"
            />
          </div>
        </>
      }
      footer={
        <Pagination
          currentPage={1}
          totalPages={10}
          showArrowLabels
          layout="spread"
          label="Member pages"
        />
      }
    >
      <Table<Member>
        caption="Team members"
        hideCaption
        columns={memberColumns}
        rows={members}
        selectable
        rowLabel={(m) => `Select ${m.name}`}
      />
    </TableCard>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    caption: 'الطلبات الأخيرة',
    columns: [
      { key: 'id', header: 'الطلب', sortable: true },
      { key: 'customer', header: 'العميل' },
      { key: 'total', header: 'المجموع', align: 'end', render: (r: Order) => `$${r.total}` },
    ],
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Table
              caption={`${brand} ${mode}`}
              columns={columns}
              rows={orders}
              selectable
              defaultSelected={['1025']}
              striped
              defaultSort={{ key: 'total', direction: 'descending' }}
              rowLabel={(r) => `Select order ${r.id} (${brand} ${mode})`}
            />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Sorting cycles and is exposed; select-all is mixed when some rows are selected. */
export const SortAndSelect: Story = {
  tags: ['test'],
  args: { selectable: true, rowLabel: (r: Order) => `Select order ${r.id}` },
  play: async ({ canvas }) => {
    const totalHeader = canvas.getByRole('columnheader', { name: /Total/ });
    await expect(totalHeader).toHaveAttribute('aria-sort', 'none');
    await userEvent.click(canvas.getByRole('button', { name: 'Total' }));
    await expect(totalHeader).toHaveAttribute('aria-sort', 'ascending');
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('$79');
    await userEvent.click(canvas.getByRole('button', { name: 'Total' }));
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('$1,299');
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Select order 1024' }));
    await expect(canvas.getByRole('checkbox', { name: 'Select all rows' })).toHaveProperty(
      'indeterminate',
      true,
    );
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Select all rows' }));
    await expect(canvas.getByRole('checkbox', { name: 'Select order 1026' })).toBeChecked();
  },
};
