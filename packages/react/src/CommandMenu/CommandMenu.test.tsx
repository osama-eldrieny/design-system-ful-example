import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CommandMenu } from './CommandMenu';

const groups = (onSelect = vi.fn()) => [
  {
    label: 'Pages',
    items: [
      { id: 'home', label: 'Dashboard' },
      { id: 'orders', label: 'Orders', keywords: ['sales'] },
    ],
  },
  { label: 'Actions', items: [{ id: 'new', label: 'New invoice', onSelect }] },
];

describe('CommandMenu', () => {
  it('opens with Ctrl+K and filters by text and keywords', async () => {
    render(<CommandMenu groups={groups()} />);
    await userEvent.keyboard('{Control>}k{/Control}');
    const input = screen.getByRole('combobox', { name: 'Command menu' });
    expect(screen.getAllByRole('option')).toHaveLength(3);
    await userEvent.type(input, 'sales');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option')).toHaveTextContent('Orders');
  });

  it('moves with arrows and runs with Enter, then closes', async () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(<CommandMenu defaultOpen groups={groups(onSelect)} onOpenChange={onOpenChange} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, '{ArrowDown}{ArrowDown}');
    expect(screen.getByRole('option', { name: 'New invoice' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await userEvent.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('says when nothing matches', async () => {
    render(<CommandMenu defaultOpen groups={groups()} emptyText="Nothing found" />);
    await userEvent.type(screen.getByRole('combobox'), 'zzz');
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });
});
