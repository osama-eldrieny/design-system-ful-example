import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PricingCard } from './PricingCard';

describe('PricingCard', () => {
  it('names the plan, shows the price and lists the features', () => {
    render(
      <PricingCard name="Pro" price="$29" period="per month" features={['One', 'Two']} action={<button type="button">Go</button>} />,
    );
    expect(screen.getByRole('heading', { level: 3, name: 'Pro' })).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('highlights the featured plan', () => {
    const { container } = render(<PricingCard name="Pro" price="$29" features={[]} action={null} featured />);
    expect(container.firstChild).toHaveClass('ds-pricing-card--featured');
  });
});
