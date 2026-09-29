import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox, CheckboxGroup } from './Checkbox';

describe('Checkbox', () => {
  it('is a native checkbox toggled by its label', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Email me" name="email" onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole('checkbox', { name: 'Email me' });
    expect(box).toHaveAttribute('type', 'checkbox');
    await userEvent.click(screen.getByText('Email me'));
    expect(box).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('describes a single checkbox with its error', () => {
    render(<Checkbox label="Terms" description="Required." error="Accept the terms." />);
    const box = screen.getByRole('checkbox', { name: 'Terms' });
    expect(box).toHaveAttribute('aria-invalid', 'true');
    expect(box).toHaveAccessibleDescription('Required. Accept the terms.');
  });

  it('sets the indeterminate property', () => {
    render(<Checkbox label="All" indeterminate />);
    expect(screen.getByRole('checkbox', { name: 'All' })).toHaveProperty('indeterminate', true);
  });

  it('collects values in a named group', async () => {
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup
        label="Topics"
        name="topics"
        defaultValue={['a']}
        onValueChange={onValueChange}
      >
        <Checkbox value="a" label="A" />
        <Checkbox value="b" label="B" />
      </CheckboxGroup>,
    );
    expect(screen.getByRole('group', { name: 'Topics' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'A' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'B' })).toHaveAttribute('name', 'topics');
    await userEvent.click(screen.getByRole('checkbox', { name: 'B' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['a', 'b']);
    await userEvent.click(screen.getByRole('checkbox', { name: 'A' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['b']);
  });

  it('disables every checkbox in a disabled group', () => {
    render(
      <CheckboxGroup label="Topics" disabled>
        <Checkbox value="a" label="A" />
      </CheckboxGroup>,
    );
    expect(screen.getByRole('checkbox', { name: 'A' })).toBeDisabled();
  });
});
