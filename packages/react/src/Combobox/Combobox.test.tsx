import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from './Combobox';

const options = [
  { value: 'eg', label: 'Egypt' },
  { value: 'es', label: 'Spain' },
  { value: 'se', label: 'Sweden' },
];

describe('Combobox', () => {
  it('filters options and picks one', async () => {
    const onValueChange = vi.fn();
    render(
      <Combobox label="Country" options={options} onValueChange={onValueChange} name="country" />,
    );
    const input = screen.getByRole('combobox', { name: 'Country' });
    await userEvent.type(input, 'sp');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    await userEvent.click(screen.getByRole('option', { name: 'Spain' }));
    expect(input).toHaveValue('Spain');
    expect(onValueChange).toHaveBeenCalledWith('es');
    expect(document.querySelector('input[type="hidden"][name="country"]')).toHaveValue('es');
  });

  it('shows the empty and loading messages', async () => {
    const { rerender } = render(<Combobox label="Country" options={options} />);
    await userEvent.type(screen.getByRole('combobox'), 'zz');
    expect(screen.getByText('No results')).toBeInTheDocument();
    rerender(<Combobox label="Country" options={options} loading />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('adds and removes chips in multiple mode', async () => {
    const onValueChange = vi.fn();
    render(
      <Combobox
        multiple
        label="Tags"
        options={options}
        defaultValue={['eg']}
        onValueChange={onValueChange}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Remove Egypt' }));
    expect(onValueChange).toHaveBeenLastCalledWith([]);
    await userEvent.type(screen.getByRole('combobox', { name: 'Tags' }), 'swe');
    await userEvent.click(screen.getByRole('option', { name: 'Sweden' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['se']);
    expect(screen.getByRole('button', { name: 'Remove Sweden' })).toBeInTheDocument();
  });
});
