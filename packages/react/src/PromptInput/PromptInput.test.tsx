import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PromptInput } from './PromptInput';

describe('PromptInput', () => {
  it('names the field and disables sending while empty', () => {
    render(<PromptInput label="Message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('sends on Enter and clears when uncontrolled', () => {
    const onSubmit = vi.fn();
    render(<PromptInput label="Message" onSubmit={onSubmit} />);
    const field = screen.getByLabelText('Message');
    fireEvent.change(field, { target: { value: '  Hi  ' } });
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('Hi');
    expect(field).toHaveValue('');
  });

  it('keeps Shift+Enter for a new line', () => {
    const onSubmit = vi.fn();
    render(<PromptInput label="Message" onSubmit={onSubmit} />);
    const field = screen.getByLabelText('Message');
    fireEvent.change(field, { target: { value: 'Line' } });
    fireEvent.keyDown(field, { key: 'Enter', shiftKey: true });
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
