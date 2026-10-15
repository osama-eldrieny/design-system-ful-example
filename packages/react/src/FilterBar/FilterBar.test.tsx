import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FilterBar } from './FilterBar';

const filters = [
  { id: 'status', label: 'Status', options: [{ value: 'paid', label: 'Paid' }, { value: 'due', label: 'Due' }] },
];

describe('FilterBar', () => {
  it('is a named toolbar with a trigger per filter', () => {
    render(<FilterBar label="Filter" filters={filters} />);
    expect(screen.getByRole('toolbar', { name: 'Filter' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Status' })).toBeInTheDocument();
  });

  it('shows the count and chips for chosen values', () => {
    render(<FilterBar label="Filter" filters={filters} defaultValue={{ status: ['paid', 'due'] }} />);
    expect(screen.getByRole('button', { name: 'Status, 2 selected' })).toBeInTheDocument();
    expect(screen.getByText('Status: Paid')).toBeInTheDocument();
  });

  it('removes a chip and clears all', () => {
    const onValueChange = vi.fn();
    render(<FilterBar label="Filter" filters={filters} defaultValue={{ status: ['paid', 'due'] }} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Status: Paid' }));
    expect(onValueChange).toHaveBeenLastCalledWith({ status: ['due'] });
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onValueChange).toHaveBeenLastCalledWith({});
    expect(screen.queryByText('Status: Due')).toBeNull();
  });

  it('hides chips when showChips is false', () => {
    render(<FilterBar label="Filter" filters={filters} defaultValue={{ status: ['paid'] }} showChips={false} />);
    expect(screen.queryByText('Status: Paid')).toBeNull();
  });
});
