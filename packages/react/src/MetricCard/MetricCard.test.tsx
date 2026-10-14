import { render, screen } from '@testing-library/react';
import { Users } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('pairs the label with the value in a description list', () => {
    render(<MetricCard label="Total revenue" value="$124,567" />);
    expect(screen.getByRole('term')).toHaveTextContent('Total revenue');
    expect(screen.getByText('$124,567')).toBeInTheDocument();
  });

  it('announces the trend direction in words', () => {
    render(
      <MetricCard label="Users" value="2,420" change="40%" trend="up" comparison="vs last month" />,
    );
    expect(screen.getByText('increased')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('colors rising costs as bad news with positive={false}', () => {
    const { container } = render(
      <MetricCard
        label="Costs"
        value="$9k"
        change="8%"
        trend="up"
        positive={false}
        trendStyle="simple"
      />,
    );
    expect(container.querySelector('.ds-metric-card__trend--down')).not.toBeNull();
  });

  it('shows an icon, chart, actions and footer', () => {
    const { container } = render(
      <MetricCard
        label="Members"
        value="128"
        icon={<Users />}
        chart={<svg data-testid="chart" />}
        actions={<button type="button">More</button>}
        footer={<a href="/team">View team</a>}
      />,
    );
    expect(container.querySelector('.ds-featured-icon')).not.toBeNull();
    expect(screen.getByTestId('chart').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('button', { name: 'More' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View team' })).toBeInTheDocument();
  });
});
