import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { InputField } from './InputField';

describe('InputField', () => {
  it('is a textbox named by its label, even when the label is hidden', () => {
    const { rerender } = render(<InputField label="Email address" />);
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeInTheDocument();
    rerender(<InputField label="Search" hideLabel />);
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('links help text and marks errors', () => {
    render(<InputField label="Email" description="For receipts" error="Enter an email." />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('For receipts Enter an email.');
  });

  it('shows success when there is no error', () => {
    render(<InputField label="Username" success="Available" />);
    expect(screen.getByRole('textbox', { name: 'Username' })).toHaveAccessibleDescription(
      'Available',
    );
  });

  it('clears a controlled value and returns focus', async () => {
    function Harness() {
      const [value, setValue] = useState('lamp');
      return (
        <InputField
          label="Search"
          clearable
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
        />
      );
    }
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    const input = screen.getByRole('textbox', { name: 'Search' });
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });

  it('marks required fields for assistive technology', () => {
    render(<InputField label="Name" required />);
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeRequired();
  });
});
