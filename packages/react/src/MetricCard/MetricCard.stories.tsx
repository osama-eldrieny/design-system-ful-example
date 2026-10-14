import type { Meta, StoryObj } from '@storybook/react-vite';
import { DollarSign, MoreVertical, ShoppingBag, Users } from 'lucide-react';
import { expect } from 'storybook/test';
import { Button, IconButton } from '../Button';
import { Sparkline } from '../Chart';
import { ThemeProvider } from '../ThemeProvider';
import { MetricCard, type MetricTrendStyle } from './MetricCard';

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: 16,
} as const;

const Spark = () => <Sparkline data={[4, 6, 5, 8, 7, 9, 12]} />;

const More = () => (
  <IconButton
    icon={<MoreVertical />}
    label="More options"
    variant="secondary"
    appearance="ghost"
    size="small"
  />
);

const meta = {
  title: 'Components/Data display/MetricCard',
  component: MetricCard,
  tags: ['!autodocs'],
  args: {
    label: 'Total revenue',
    value: '$124,567',
    change: '12%',
    trend: 'up',
    comparison: 'vs last month',
    trendStyle: 'badge',
    layout: 'vertical',
    size: 'medium',
  },
  argTypes: {
    icon: { control: false },
    chart: { control: false },
    actions: { control: false },
    footer: { control: false },
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 360 }}>{Story()}</div>],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Simple arrow and text, a tinted badge (default), or a neutral modern badge. */
export const TrendStyles: Story = {
  decorators: [(Story) => <div style={grid}>{Story()}</div>],
  render: (args) => (
    <>
      {(['simple', 'badge', 'modern'] as MetricTrendStyle[]).map((trendStyle) => (
        <MetricCard
          key={trendStyle}
          {...args}
          trendStyle={trendStyle}
          label={`Revenue (${trendStyle})`}
        />
      ))}
      <MetricCard {...args} trend="down" change="4%" label="Orders" value="1,210" />
      <MetricCard
        {...args}
        trend="up"
        positive={false}
        change="8%"
        label="Refunds"
        value="$3,240"
      />
    </>
  ),
};

/** An icon on top or beside the figures, a chart beside the value, actions and a footer. */
export const Layouts: Story = {
  decorators: [(Story) => <div style={grid}>{Story()}</div>],
  render: (args) => (
    <>
      <MetricCard {...args} icon={<DollarSign />} actions={<More />} />
      <MetricCard
        {...args}
        icon={<Users />}
        iconTone="blue"
        iconAppearance="light"
        layout="horizontal"
        label="Active users"
        value="2,420"
      />
      <MetricCard {...args} label="Orders" value="1,210" chart={<Spark />} actions={<More />} />
      <MetricCard
        {...args}
        icon={<ShoppingBag />}
        label="Sales"
        value="316"
        chart={<Spark />}
        footer={
          <Button appearance="text" size="small">
            View report
          </Button>
        }
      />
      <MetricCard
        {...args}
        size="small"
        label="Bounce rate"
        value="32%"
        trend="down"
        positive
        change="2%"
        trendStyle="simple"
      />
    </>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { label: 'إجمالي الإيرادات', comparison: 'مقارنة بالشهر الماضي', icon: <DollarSign /> },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={grid}>
              {(['simple', 'badge', 'modern'] as MetricTrendStyle[]).map((trendStyle) => (
                <MetricCard
                  key={trendStyle}
                  {...args}
                  trendStyle={trendStyle}
                  icon={<DollarSign />}
                  label={`${brand} ${mode}`}
                />
              ))}
              <MetricCard {...args} trend="down" trendStyle="simple" label="Down" />
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** The trend direction is announced in words, not only by color and arrow. */
export const TrendAnnounced: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getByText('increased')).toBeInTheDocument();
    await expect(canvas.getByRole('term')).toHaveTextContent('Total revenue');
  },
};
