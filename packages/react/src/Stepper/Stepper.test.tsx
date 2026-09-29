import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Stepper } from './Stepper';

const steps = [{ label: 'Cart' }, { label: 'Shipping' }, { label: 'Payment' }];

describe('Stepper', () => {
  it('marks statuses and the current step', () => {
    render(<Stepper aria-label="Checkout" steps={steps} current={1} />);
    expect(screen.getByRole('list', { name: 'Checkout' })).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent(/Cart.*completed/);
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[2]).toHaveTextContent(/Payment.*not started/);
  });

  it('only makes completed steps clickable', async () => {
    const onStepClick = vi.fn();
    render(<Stepper aria-label="Checkout" steps={steps} current={1} onStepClick={onStepClick} />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
    await userEvent.click(screen.getByRole('button'));
    expect(onStepClick).toHaveBeenCalledWith(0);
  });
});
