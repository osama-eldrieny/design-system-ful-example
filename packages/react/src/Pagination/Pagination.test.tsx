import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination, pageItems } from './Pagination';

describe('pageItems', () => {
  it('lists every page when they fit', () => {
    expect(pageItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('keeps first, last and a window around the current page', () => {
    expect(pageItems(1, 20)).toEqual([1, 2, 3, 4, 5, 'ellipsis-end', 20]);
    expect(pageItems(10, 20)).toEqual([1, 'ellipsis-start', 9, 10, 11, 'ellipsis-end', 20]);
    expect(pageItems(20, 20)).toEqual([1, 'ellipsis-start', 16, 17, 18, 19, 20]);
  });

  it('widens the window with siblingCount', () => {
    expect(pageItems(10, 20, 2)).toEqual([
      1,
      'ellipsis-start',
      8,
      9,
      10,
      11,
      12,
      'ellipsis-end',
      20,
    ]);
  });
});

describe('Pagination', () => {
  it('is a labelled navigation with a current page', () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeEnabled();
  });

  it('disables arrows at the ends and reports page changes', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onChange} />,
    );
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onChange).toHaveBeenCalledWith(2);
    rerender(<Pagination currentPage={3} totalPages={3} onPageChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('does not report clicking the current page', async () => {
    const onChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={3} onPageChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows a summary in the simple appearance', () => {
    render(<Pagination appearance="simple" currentPage={2} totalPages={10} />);
    expect(screen.getByText('Page 2 of 10')).toBeInTheDocument();
  });
});
