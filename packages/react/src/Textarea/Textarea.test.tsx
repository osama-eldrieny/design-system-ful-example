import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('is a labelled, described multi-line textbox', () => {
    render(<Textarea label="Message" description="Be brief." error="Too short." required />);
    const field = screen.getByRole('textbox', { name: /Message/ });
    expect(field.tagName).toBe('TEXTAREA');
    expect(field).toBeRequired();
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Be brief. Too short.');
  });

  it('counts characters and announces what is left only after typing pauses', () => {
    vi.useFakeTimers();
    render(<Textarea label="Bio" maxLength={10} showCount />);
    const field = screen.getByRole('textbox', { name: 'Bio' });
    expect(field).toHaveAttribute('maxlength', '10');
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole('status')).toHaveTextContent('');

    fireEvent.change(field, { target: { value: 'Hello' } });
    expect(screen.getByText('5 / 10')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole('status')).toHaveTextContent('5 characters left');
    vi.useRealTimers();
  });

  it('follows a controlled value and marks the limit', () => {
    render(<Textarea label="Bio" maxLength={5} showCount value="Hello" onChange={() => {}} />);
    expect(screen.getByText('5 / 5')).toHaveAttribute('data-over');
  });

  it('shows no counter without maxLength', () => {
    render(<Textarea label="Notes" showCount />);
    expect(screen.queryByRole('status')).toBeNull();
  });
});
