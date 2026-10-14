import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { AreaChart, BarChart, DonutChart, LineChart, RadarChart, Sparkline } from './Chart';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenue = months.map((month, i) => ({
  month,
  revenue: Math.round(12000 + Math.sin(i / 1.7) * 3500 + i * 900),
  expenses: Math.round(8000 + Math.cos(i / 2) * 1800 + i * 400),
  profit: Math.round(4000 + Math.sin(i / 1.3) * 1600 + i * 500),
}));
const money = (v: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', notation: 'compact' }).format(
    v,
  );
const traffic = [
  { label: 'Direct', value: 4200 },
  { label: 'Search', value: 3100 },
  { label: 'Social', value: 1800 },
  { label: 'Email', value: 900 },
  { label: 'Referral', value: 600 },
];
const card = {
  padding: 24,
  border: '1px solid var(--color-border-base)',
  borderRadius: 16,
  background: 'var(--color-bg-surface)',
} as const;

const meta = {
  title: 'Components/Data display/Charts',
  component: LineChart,
  subcomponents: { AreaChart, BarChart, DonutChart, RadarChart, Sparkline },
  tags: ['!autodocs'],
  args: {
    title: 'Revenue',
    description: 'Revenue grew 38% over the year.',
    data: revenue,
    xKey: 'month',
    series: [
      { key: 'revenue', label: 'Revenue' },
      { key: 'expenses', label: 'Expenses' },
    ],
    formatValue: money,
    height: 260,
  },
  argTypes: {
    data: { control: false },
    series: { control: false },
    formatValue: { control: false },
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={card}>{Story()}</div>],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Lines over time. Hover, or focus the plot and use the arrow keys, to read values. */
export const Playground: Story = {};

/** Areas, side by side or stacked. */
export const Area: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <AreaChart {...args} title="Revenue vs expenses" />
      <AreaChart
        {...args}
        title="Stacked"
        stacked
        series={[
          { key: 'expenses', label: 'Expenses' },
          { key: 'profit', label: 'Profit' },
        ]}
      />
    </div>
  ),
};

/** Grouped, stacked and horizontal bars. */
export const Bars: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <BarChart {...args} title="Grouped" data={revenue.slice(0, 6)} />
      <BarChart
        {...args}
        title="Stacked"
        stacked
        data={revenue.slice(0, 6)}
        series={[
          { key: 'expenses', label: 'Expenses' },
          { key: 'profit', label: 'Profit' },
        ]}
      />
      <BarChart
        title="Visits by channel"
        orientation="horizontal"
        data={traffic.map((t) => ({ channel: t.label, visits: t.value }))}
        xKey="channel"
        series={[{ key: 'visits', label: 'Visits' }]}
      />
    </div>
  ),
};

/** Parts of a whole: a donut with a total in the middle, or a pie. */
export const Donut: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
      <DonutChart title="Traffic sources" data={traffic} centerValue="10.6K" centerLabel="Visits" />
      <DonutChart title="Plan mix" data={traffic.slice(0, 3)} thickness={1} size={160} />
      <DonutChart
        title="Storage"
        data={traffic.slice(0, 2)}
        thickness={0.14}
        size={140}
        centerValue="58%"
        showLegend={false}
      />
    </div>
  ),
};

/** Tiny trend lines for metric cards and table rows; green when rising, red when falling. */
export const Sparklines: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      <Sparkline data={[4, 6, 5, 8, 7, 9, 12]} label="Revenue: rising" />
      <Sparkline data={[12, 10, 11, 8, 9, 6, 5]} label="Churn: falling" />
      <Sparkline data={[5, 7, 6, 8, 7, 9, 8]} tone="primary" area={false} label="Visits" />
    </div>
  ),
};

/** Several series across several dimensions. */
export const Radar: Story = {
  render: () => (
    <RadarChart
      title="Product scores"
      axisKey="area"
      max={10}
      data={[
        { area: 'Speed', ours: 8, theirs: 6 },
        { area: 'Design', ours: 9, theirs: 7 },
        { area: 'Price', ours: 6, theirs: 8 },
        { area: 'Support', ours: 7, theirs: 5 },
        { area: 'Docs', ours: 8, theirs: 6 },
      ]}
      series={[
        { key: 'ours', label: 'Ours' },
        { key: 'theirs', label: 'Competitor' },
      ]}
    />
  ),
};

/** Axes mirror in right-to-left languages: time runs from right to left. */
export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { title: 'الإيرادات', description: 'نمت الإيرادات بنسبة 38٪.' },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
              <BarChart
                {...args}
                title={`${brand} ${mode} bars`}
                data={revenue.slice(0, 4)}
                height={160}
              />
              <DonutChart
                title={`${brand} ${mode} donut`}
                data={traffic}
                size={140}
                centerValue="10.6K"
              />
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** The plot is a slider over the points: arrow keys move, and the value is announced. */
export const KeyboardReading: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    const plot = canvas.getByRole('slider', { name: 'Revenue' });
    plot.focus();
    await userEvent.keyboard('{Home}');
    await expect(plot).toHaveAttribute('aria-valuenow', '1');
    await expect(plot.getAttribute('aria-valuetext')).toContain('Jan');
    await userEvent.keyboard('{End}');
    await expect(plot).toHaveAttribute('aria-valuenow', '12');
  },
};
