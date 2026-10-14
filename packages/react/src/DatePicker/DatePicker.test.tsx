import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Calendar, DatePicker } from './DatePicker';

const may = new Date(2026, 4, 15);

describe('Calendar', () => {
  it('is a grid named by its month, with today marked', () => {
    render(<Calendar defaultMonth={may} today={may} locale="en-US" />);
    expect(screen.getByRole('grid', { name: 'May 2026' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Friday, May 15, 2026' })).toHaveAttribute(
      'aria-current',
      'date',
    );
  });

  it('moves with the arrow keys and picks with Enter', async () => {
    const onValueChange = vi.fn();
    render(
      <Calendar defaultMonth={may} today={may} locale="en-US" onValueChange={onValueChange} />,
    );
    screen.getByRole('button', { name: 'Friday, May 15, 2026' }).focus();
    await userEvent.keyboard('{ArrowRight}{ArrowDown}{Enter}');
    expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 4, 23));
  });

  it('goes to the next month with Page Down', async () => {
    render(<Calendar defaultMonth={may} today={may} locale="en-US" />);
    screen.getByRole('button', { name: 'Friday, May 15, 2026' }).focus();
    await userEvent.keyboard('{PageDown}');
    expect(screen.getByRole('grid', { name: 'June 2026' })).toBeInTheDocument();
  });

  it('picks a range: start, then end', async () => {
    const onRangeChange = vi.fn();
    render(
      <Calendar
        mode="range"
        defaultMonth={may}
        today={may}
        locale="en-US"
        range={{ start: new Date(2026, 4, 4), end: null }}
        onRangeChange={onRangeChange}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Monday, May 11, 2026' }));
    expect(onRangeChange).toHaveBeenCalledWith({
      start: new Date(2026, 4, 4),
      end: new Date(2026, 4, 11),
    });
  });

  it('does not pick disabled dates', () => {
    render(<Calendar defaultMonth={may} today={may} locale="en-US" min={may} />);
    expect(screen.getByRole('button', { name: 'Thursday, May 14, 2026' })).toBeDisabled();
  });
});

describe('DatePicker', () => {
  it('opens a calendar and shows the picked date on the trigger', async () => {
    render(<DatePicker label="Due date" defaultMonth={may} today={may} locale="en-US" />);
    await userEvent.click(screen.getByRole('button', { name: 'Due date: Select date' }));
    await userEvent.click(screen.getByRole('button', { name: 'Wednesday, May 20, 2026' }));
    expect(screen.getByRole('button', { name: 'Due date: May 20, 2026' })).toBeInTheDocument();
  });
});
