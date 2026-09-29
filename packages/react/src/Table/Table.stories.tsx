import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { Badge } from '../Badge';
import { ThemeProvider } from '../ThemeProvider';
import { Table, type TableColumn } from './Table';

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
