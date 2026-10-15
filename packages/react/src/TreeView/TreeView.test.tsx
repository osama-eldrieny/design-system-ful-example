import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TreeView, type TreeItem } from './TreeView';

const items: TreeItem[] = [
  { id: 'a', label: 'Alpha', children: [{ id: 'a1', label: 'Alpha one' }] },
  { id: 'b', label: 'Beta' },
];

describe('TreeView', () => {
  it('renders a named tree with one tab stop', () => {
    render(<TreeView label="Files" items={items} />);
    expect(screen.getByRole('tree', { name: 'Files' })).toBeInTheDocument();
    const rows = screen.getAllByRole('treeitem');
    expect(rows).toHaveLength(2);
    expect(rows.filter((r) => r.tabIndex === 0)).toHaveLength(1);
  });

  it('expands with ArrowRight and collapses with ArrowLeft', () => {
    render(<TreeView label="Files" items={items} />);
    const alpha = screen.getByRole('treeitem', { name: /Alpha/ });
    fireEvent.keyDown(alpha, { key: 'ArrowRight' });
    expect(alpha).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('treeitem', { name: 'Alpha one' })).toHaveAttribute('aria-level', '2');
    fireEvent.keyDown(alpha, { key: 'ArrowLeft' });
    expect(alpha).toHaveAttribute('aria-expanded', 'false');
  });

  it('selects on click', () => {
    const onSelect = vi.fn();
    render(<TreeView label="Files" items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Beta'));
    expect(onSelect).toHaveBeenCalledWith('b');
    expect(screen.getByRole('treeitem', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true');
  });

  it('moves focus with ArrowDown', () => {
    render(<TreeView label="Files" items={items} />);
    const alpha = screen.getByRole('treeitem', { name: /Alpha/ });
    alpha.focus();
    fireEvent.keyDown(alpha, { key: 'ArrowDown' });
    expect(screen.getByRole('treeitem', { name: 'Beta' })).toHaveFocus();
  });
});
