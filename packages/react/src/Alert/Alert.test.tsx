import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('announces danger and warning immediately, others politely', () => {
    const { rerender } = render(<Alert variant="danger" title="Payment failed." />);
    expect(screen.getByRole('alert')).toHaveTextContent('Payment failed.');
    rerender(<Alert variant="warning" title="Trial ends soon." />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    rerender(<Alert variant="success" title="Saved." />);
    expect(screen.getByRole('status')).toHaveTextContent('Saved.');
  });

  it('renders the description and actions', () => {
    render(
      <Alert title="Payment failed." actions={<button type="button">Retry</button>}>
        Your card was declined.
      </Alert>,
    );
    expect(screen.getByText('Your card was declined.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('calls onDismiss from a named dismiss button', async () => {
    const onDismiss = vi.fn();
    render(<Alert title="Saved." onDismiss={onDismiss} dismissLabel="Close message" />);
    await userEvent.click(screen.getByRole('button', { name: 'Close message' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('hides the icon from assistive technology and allows removing it', () => {
    const { container, rerender } = render(<Alert title="Saved." />);
    expect(container.querySelector('.ds-alert__icon')).toHaveAttribute('aria-hidden', 'true');
    rerender(<Alert title="Saved." icon={null} />);
    expect(container.querySelector('.ds-alert__icon')).toBeNull();
  });
});
