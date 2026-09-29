import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Radio, RadioGroup } from './RadioGroup';

const renderGroup = (props: Partial<Parameters<typeof RadioGroup>[0]> = {}) =>
  render(
    <RadioGroup label="Time period" {...props}>
      <Radio value="today" label="Today" />
      <Radio value="week" label="This week" />
      <Radio value="month" label="This month" disabled />
    </RadioGroup>,
  );

describe('RadioGroup', () => {
  it('is a radio group named by its label', () => {
    renderGroup();
    expect(screen.getByRole('radiogroup', { name: 'Time period' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('selects an option from its label and reports the value', async () => {
    const onChange = vi.fn();
    renderGroup({ onValueChange: onChange });
    await userEvent.click(screen.getByText('This week'));
    expect(screen.getByRole('radio', { name: 'This week' })).toBeChecked();
    expect(onChange).toHaveBeenCalledWith('week');
  });

  it('does not select a disabled option', async () => {
    const onChange = vi.fn();
    renderGroup({ onValueChange: onChange });
    await userEvent.click(screen.getByText('This month'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('marks the group invalid and announces the error', () => {
    renderGroup({ error: 'Choose a time period.' });
    const group = screen.getByRole('radiogroup', { name: 'Time period' });
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAccessibleDescription('Choose a time period.');
  });

  it('links an option description', () => {
    render(
      <RadioGroup label="Plan">
        <Radio value="pro" label="Pro" description="Unlimited projects" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Pro' })).toHaveAccessibleDescription(
      'Unlimited projects',
    );
  });
});
