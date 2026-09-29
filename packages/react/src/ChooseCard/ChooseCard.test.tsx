import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ChooseCard, ChooseCardGroup } from './ChooseCard';

describe('ChooseCard', () => {
  it('is a named radio group of named, described radios', () => {
    render(
      <ChooseCardGroup aria-label="Plan">
        <ChooseCard value="basic" title="Basic" description="For individuals" price="Free" />
        <ChooseCard value="pro" title="Pro" />
      </ChooseCardGroup>,
    );
    expect(screen.getByRole('radiogroup', { name: 'Plan' })).toBeInTheDocument();
    const basic = screen.getByRole('radio', { name: 'Basic' });
    expect(basic).toHaveAccessibleDescription('For individuals Free');
    expect(screen.getByRole('radio', { name: 'Pro' })).not.toHaveAttribute('aria-describedby');
  });

  it('selects a card on click and reports the value', async () => {
    const onValueChange = vi.fn();
    render(
      <ChooseCardGroup aria-label="Plan" onValueChange={onValueChange}>
        <ChooseCard value="basic" title="Basic" />
        <ChooseCard value="pro" title="Pro" />
      </ChooseCardGroup>,
    );
    await userEvent.click(screen.getByText('Pro'));
    expect(onValueChange).toHaveBeenCalledWith('pro');
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });

  it('does not select a disabled card', async () => {
    render(
      <ChooseCardGroup aria-label="Plan">
        <ChooseCard value="basic" title="Basic" disabled />
      </ChooseCardGroup>,
    );
    await userEvent.click(screen.getByText('Basic'));
    expect(screen.getByRole('radio', { name: 'Basic' })).not.toBeChecked();
  });
});
