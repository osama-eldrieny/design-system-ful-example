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

describe('Stat variants', () => {
  it('shows the change as a badge beside the value, with a note', () => {
    const { container } = render(
      <Stat label="Profit" value="$212K" change="23%" trend="up" changeAppearance="badge" size="large" note="Updated today" />,
    );
    expect(container.querySelector('.ds-stat--large')).toBeInTheDocument();
    expect(container.querySelector('.ds-stat__row .ds-stat__change--badge')).toHaveTextContent('increased 23%');
    expect(screen.getByText('Updated today')).toBeInTheDocument();
  });
});
