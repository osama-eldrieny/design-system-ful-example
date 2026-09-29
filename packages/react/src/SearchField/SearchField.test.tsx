import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchField } from './SearchField';

describe('SearchField', () => {
  it('is a searchbox named "Search" by default', () => {
    render(<SearchField placeholder="Search products" />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('searches on Enter, clears on Escape and with the clear button', async () => {
    const onSearch = vi.fn();
    render(<SearchField onSearch={onSearch} />);
    const field = screen.getByRole('searchbox');
    await userEvent.type(field, 'lamp{Enter}');
    expect(onSearch).toHaveBeenCalledWith('lamp');
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(field).toHaveValue('');
    await userEvent.type(field, 'x{Escape}');
    expect(field).toHaveValue('');
  });

  it('focuses on its shortcut, but not while typing in another field', () => {
    render(
      <>
        <input aria-label="Other" />
        <SearchField shortcut="/" />
      </>,
    );
    const field = screen.getByRole('searchbox');
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Other' }), { key: '/' });
    expect(field).not.toHaveFocus();
    fireEvent.keyDown(document.body, { key: '/' });
    expect(field).toHaveFocus();
  });
});
