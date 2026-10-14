import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BarChart, DonutChart, LineChart, RadarChart, Sparkline } from './Chart';
import { niceTicks } from './chart-core';

const data = [
  { month: 'Jan', revenue: 1200, costs: 800 },
  { month: 'Feb', revenue: 1800, costs: 900 },
  { month: 'Mar', revenue: 1500, costs: 1000 },
];
const series = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'costs', label: 'Costs' },
];

describe('niceTicks', () => {
  it('covers the range with round steps', () => {
    expect(niceTicks(0, 1800)).toEqual([0, 500, 1000, 1500, 2000]);
  });
});

describe('LineChart', () => {
  it('is a named figure with every value in a table', () => {
    render(<LineChart title="Revenue" data={data} xKey="month" series={series} />);
    expect(screen.getByRole('figure', { name: 'Revenue' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Revenue' })).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: 'Feb' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '1800' })).toBeInTheDocument();
  });

  it('reads points with the arrow keys', async () => {
    render(<LineChart title="Revenue" data={data} xKey="month" series={series} />);
    const plot = screen.getByRole('slider', { name: 'Revenue' });
    plot.focus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    expect(plot).toHaveAttribute('aria-valuetext', 'Feb: Revenue 1.8K, Costs 900');
  });

  it('shows a legend for several series', () => {
    render(<LineChart title="Revenue" data={data} xKey="month" series={series} area />);
    expect(screen.getByRole('list')).toHaveTextContent('RevenueCosts');
  });
});

describe('BarChart', () => {
  it('renders one bar per value', () => {
    const { container } = render(
      <BarChart title="Orders" data={data} xKey="month" series={series} />,
    );
    expect(container.querySelectorAll('.ds-chart__bar')).toHaveLength(6);
  });
});

describe('DonutChart', () => {
  it('lists shares in the legend and table', () => {
    render(
      <DonutChart
        title="Traffic"
        data={[
          { label: 'Direct', value: 3 },
          { label: 'Search', value: 1 },
        ]}
        centerValue="4"
      />,
    );
    expect(screen.getByText('Direct (75%)')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '25%' })).toBeInTheDocument();
  });
});

describe('Sparkline', () => {
  it('is decorative without a label and an image with one', () => {
    const { container, rerender } = render(<Sparkline data={[1, 3, 2, 5]} />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    rerender(<Sparkline data={[1, 3, 2, 5]} label="Rising" />);
    expect(screen.getByRole('img', { name: 'Rising' })).toBeInTheDocument();
  });
});

describe('RadarChart', () => {
  it('draws one polygon per series', () => {
    const { container } = render(
      <RadarChart
        title="Skills"
        axisKey="skill"
        data={[
          { skill: 'Design', a: 8, b: 4 },
          { skill: 'Code', a: 5, b: 9 },
          { skill: 'Writing', a: 7, b: 6 },
        ]}
        series={[
          { key: 'a', label: 'Alice' },
          { key: 'b', label: 'Bob' },
        ]}
      />,
    );
    expect(container.querySelectorAll('.ds-chart__radar')).toHaveLength(2);
  });
});
