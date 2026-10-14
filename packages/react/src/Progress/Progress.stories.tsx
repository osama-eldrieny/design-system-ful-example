import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Progress, ProgressCircle } from './Progress';

const meta = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  tags: ['!autodocs'],
  args: {
    label: 'Uploading report.pdf',
    value: 45,
    showValue: true,
    tone: 'primary',
    size: 'medium',
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 360 }}>{Story()}</div>],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Progress label="Primary" value={40} showValue />
      <Progress label="Success" value={100} tone="success" showValue />
      <Progress
        label="Storage"
        value={9.1}
        max={10}
        tone="warning"
        showValue
        formatValue={(v, m) => `${v} of ${m} GB`}
      />
      <Progress label="Over quota" value={100} tone="danger" showValue />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Progress label="Medium" value={60} />
      <Progress label="Small" value={60} size="small" />
    </div>
  ),
};

/** With showValue, the value sits beside the label, after the bar or under its end. */
export const ValuePositions: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, maxInlineSize: 360 }}>
      <Progress label="Top" value={40} showValue valuePosition="top" />
      <Progress label="End" hideLabel value={60} showValue valuePosition="end" />
      <Progress label="Bottom" hideLabel value={80} showValue valuePosition="bottom" />
    </div>
  ),
};

/** ProgressCircle: a ring or half-ring gauge with the value inside. */
export const Circles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'end' }}>
      <ProgressCircle label="Small" value={40} size="small" />
      <ProgressCircle label="Storage used" value={64} caption="of 20 GB" />
      <ProgressCircle label="Goal" value={80} size="large" tone="success" caption="This month" />
      <ProgressCircle label="Gauge" value={72} shape="half" caption="Score" />
      <ProgressCircle label="Large gauge" value={30} shape="half" size="large" tone="warning" />
    </div>
  ),
};

export const Indeterminate: Story = { args: { label: 'Preparing export', value: undefined } };

export const RightToLeft: Story = { globals: { language: 'ar' }, args: { label: 'جارٍ الرفع' } };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [(Story) => <div style={{ display: 'grid', gap: 12 }}>{Story()}</div>],
  render: () => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Progress label={`${brand} ${mode}`} value={60} showValue />
            <ProgressCircle label={`${brand} ${mode} ring`} value={60} size="small" />
            <ProgressCircle
              label={`${brand} ${mode} gauge`}
              value={60}
              shape="half"
              caption="Score"
            />
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** A labelled progressbar with its value. */
export const Semantics: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    const bar = canvas.getByRole('progressbar', { name: 'Uploading report.pdf' });
    await expect(bar).toHaveAttribute('aria-valuenow', '45');
    await expect(bar).toHaveAttribute('aria-valuetext', '45%');
  },
};

/** ProgressCircle is a named progressbar with its value. */
export const CircleSemantics: Story = {
  tags: ['test'],
  render: () => <ProgressCircle label="Storage used" value={64} />,
  play: async ({ canvas }) => {
    const bar = canvas.getByRole('progressbar', { name: 'Storage used' });
    await expect(bar).toHaveAttribute('aria-valuenow', '64');
    await expect(bar).toHaveAttribute('aria-valuetext', '64%');
  },
};
