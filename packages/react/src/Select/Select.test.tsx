import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Select, SelectItem } from './Select';

// Opening the list needs real pointer events; see the Keyboard story for interaction.
describe('Select', () => {
  it('is a combobox named by its label and described by help and error', () => {
    render(
      <Select
        label="Sort by"
        description="Applies to the list."
        error="Choose one."
        placeholder="Choose"
      >
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    const trigger = screen.getByRole('combobox', { name: 'Sort by' });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAccessibleDescription('Applies to the list. Choose one.');
    expect(trigger).toHaveTextContent('Choose');
  });

  it('shows the selected option and disables the trigger', () => {
    render(
      <Select label="Plan" defaultValue="pro" disabled>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
      </Select>,
    );
    const trigger = screen.getByRole('combobox', { name: 'Plan' });
    expect(trigger).toHaveTextContent('Pro');
    expect(trigger).toBeDisabled();
  });
});
