import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stat } from './Stat';

describe('Stat', () => {
  it('pairs label and value and says the trend', () => {
    render(<Stat label="Revenue" value="$10" change="+5%" trend="up" />);
    expect(screen.getByRole('term')).toHaveTextContent('Revenue');
    expect(screen.getAllByRole('definition')[0]).toHaveTextContent('$10');
    expect(screen.getByText('increased')).toBeInTheDocument();
  });

  it('colors a rise as bad when positive is false', () => {
    const { container } = render(
      <Stat label="Churn" value="2%" change="+1%" trend="up" positive={false} />,
    );
    expect(container.querySelector('.ds-stat__change--down')).toBeInTheDocument();
  });
});
