import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ColorPicker } from './ColorPicker';

const swatches = [
  { value: '#2563eb', name: 'Blue' },
  { value: '#16a34a', name: 'Green' },
];

describe('ColorPicker', () => {
  it('is a group named by the legend with named swatches', () => {
    render(<ColorPicker label="Label color" swatches={swatches} />);
    expect(screen.getByRole('group', { name: 'Label color' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Blue' })).toBeChecked();
  });

  it('chooses a color', () => {
    const onValueChange = vi.fn();
    render(<ColorPicker label="Color" swatches={swatches} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole('radio', { name: 'Green' }));
    expect(onValueChange).toHaveBeenCalledWith('#16a34a');
  });

  it('adds a custom color input', () => {
    const onValueChange = vi.fn();
    render(<ColorPicker label="Color" swatches={swatches} allowCustom onValueChange={onValueChange} />);
    fireEvent.change(screen.getByLabelText('Custom color'), { target: { value: '#123456' } });
    expect(onValueChange).toHaveBeenCalledWith('#123456');
  });

  it('disables every swatch', () => {
    render(<ColorPicker label="Color" swatches={swatches} disabled />);
    expect(screen.getByRole('radio', { name: 'Green' })).toBeDisabled();
  });
});
