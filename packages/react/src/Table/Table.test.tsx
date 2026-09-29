import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Table } from './Table';

const rows = [
  { id: 'b', name: 'Beta', n: 2 },
  { id: 'a', name: 'Alpha', n: 10 },
];
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'n', header: 'Count', align: 'end' as const, sortable: true },
];

describe('Table', () => {
  it('is a captioned table with column headers', () => {
    render(<Table caption="Items" columns={columns} rows={rows} />);
    const table = screen.getByRole('table', { name: 'Items' });
    expect(within(table).getAllByRole('columnheader')).toHaveLength(2);
    expect(within(table).getAllByRole('row')).toHaveLength(3);
  });

  it('sorts numbers numerically and reports the sort', async () => {
    const onSortChange = vi.fn();
    render(<Table caption="Items" columns={columns} rows={rows} onSortChange={onSortChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Count' }));
    expect(onSortChange).toHaveBeenCalledWith({ key: 'n', direction: 'ascending' });
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Beta');
  });

  it('selects rows and all rows', async () => {
    const onSelectionChange = vi.fn();
    render(
      <Table
        caption="Items"
        columns={columns}
        rows={rows}
        selectable
        onSelectionChange={onSelectionChange}
      />,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(['b', 'a']);
    expect(screen.getAllByRole('row')[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('shows the empty message', () => {
    render(<Table caption="Items" columns={columns} rows={[]} empty="Nothing yet" />);
    expect(screen.getByText('Nothing yet')).toBeInTheDocument();
  });
});
