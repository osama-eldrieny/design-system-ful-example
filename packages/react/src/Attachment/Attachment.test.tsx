import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Attachment } from './Attachment';

describe('Attachment', () => {
  it('links the name for download when href is set', () => {
    render(<Attachment name="Guidelines.pdf" detail="2.4 MB" href="/g.pdf" />);
    expect(screen.getByRole('link', { name: 'Guidelines.pdf' })).toHaveAttribute('download');
    expect(screen.getByText('2.4 MB')).toBeInTheDocument();
  });

  it('shows the name as text without a link', () => {
    render(<Attachment name="Notes.txt" />);
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByText('Notes.txt')).toBeInTheDocument();
  });

  it('calls onRemove from the remove button', () => {
    const onRemove = vi.fn();
    render(<Attachment name="Q3.xlsx" onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Q3.xlsx' }));
    expect(onRemove).toHaveBeenCalled();
  });
});
