import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { VerificationCodeInput } from './VerificationCodeInput';

describe('VerificationCodeInput', () => {
  it('is a named group with one named box per character', () => {
    render(<VerificationCodeInput label="Verification code" length={4} />);
    expect(screen.getByRole('group', { name: 'Verification code' })).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
    expect(screen.getByLabelText('Character 1 of 4')).toHaveAttribute(
      'autocomplete',
      'one-time-code',
    );
  });

  it('moves to the next box while typing and completes', async () => {
    const onComplete = vi.fn();
    render(<VerificationCodeInput label="Code" length={4} onComplete={onComplete} />);
    await userEvent.click(screen.getByLabelText('Character 1 of 4'));
    await userEvent.keyboard('1234');
    expect(onComplete).toHaveBeenCalledWith('1234');
    expect(screen.getByLabelText('Character 4 of 4')).toHaveValue('4');
  });

  it('ignores letters in numeric mode and fills every box on paste', () => {
    const onValueChange = vi.fn();
    render(<VerificationCodeInput label="Code" length={6} onValueChange={onValueChange} />);
    const first = screen.getByLabelText('Character 1 of 6');
    fireEvent.change(first, { target: { value: 'a' } });
    expect(onValueChange).not.toHaveBeenCalled();
    fireEvent.paste(first, { clipboardData: { getData: () => '987 654' } });
    expect(onValueChange).toHaveBeenLastCalledWith('987654');
  });

  it('goes back with Backspace', async () => {
    render(<VerificationCodeInput label="Code" length={3} defaultValue="12" />);
    await userEvent.click(screen.getByLabelText('Character 3 of 3'));
    await userEvent.keyboard('{Backspace}');
    expect(screen.getByLabelText('Character 2 of 3')).toHaveValue('');
    expect(screen.getByLabelText('Character 2 of 3')).toHaveFocus();
  });

  it('shows an error and marks the boxes invalid', () => {
    render(<VerificationCodeInput label="Code" length={2} error="Wrong code" />);
    expect(screen.getByRole('group')).toHaveAccessibleDescription('Wrong code');
    expect(screen.getByLabelText('Character 1 of 2')).toHaveAttribute('aria-invalid', 'true');
  });
});
