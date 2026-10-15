import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PaymentCard } from './PaymentCard';

describe('PaymentCard', () => {
  it('labels the card with brand, last four digits, holder and expiry', () => {
    render(<PaymentCard holder="Maya Okafor" last4="1234" expiry="06/28" brand="Orbit" />);
    expect(screen.getByRole('img', { name: 'Orbit card ending in 1234, Maya Okafor, expires 06/28' })).toBeInTheDocument();
  });

  it('never renders more than the last four digits', () => {
    const { container } = render(<PaymentCard holder="Maya" last4="1234" expiry="06/28" />);
    expect(container.textContent).not.toMatch(/\d{12}/);
  });

  it('applies tone and size classes', () => {
    const { container } = render(<PaymentCard holder="Maya" last4="1234" expiry="06/28" tone="dark" size="small" />);
    expect(container.firstChild).toHaveClass('ds-payment-card--dark', 'ds-payment-card--small');
  });
});
