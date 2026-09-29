import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('is a switch named by its label', () => {
    render(<Switch label="Email notifications" />);
    expect(screen.getByRole('switch', { name: 'Email notifications' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('toggles from the label, pointer and keyboard', async () => {
    const onChange = vi.fn();
    render(<Switch label="Wi-Fi" onCheckedChange={onChange} />);
    const control = screen.getByRole('switch', { name: 'Wi-Fi' });
    await userEvent.click(screen.getByText('Wi-Fi'));
    expect(control).toHaveAttribute('aria-checked', 'true');
    control.focus();
    await userEvent.keyboard(' ');
    expect(control).toHaveAttribute('aria-checked', 'false');
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    expect(onChange).toHaveBeenNthCalledWith(2, false);
  });

  it('links the description', () => {
    render(<Switch label="Updates" description="Every 30 seconds" />);
    expect(screen.getByRole('switch', { name: 'Updates' })).toHaveAccessibleDescription(
      'Every 30 seconds',
    );
  });

  it('does not toggle when disabled', async () => {
    const onChange = vi.fn();
    render(<Switch label="Locked" disabled onCheckedChange={onChange} />);
    await userEvent.click(screen.getByRole('switch', { name: 'Locked' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('works without a visible label when given aria-label', () => {
    render(<Switch aria-label="Dark mode" />);
    expect(screen.getByRole('switch', { name: 'Dark mode' })).toBeInTheDocument();
  });
});
