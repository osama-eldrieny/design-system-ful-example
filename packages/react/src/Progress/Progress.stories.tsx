import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Progress } from './Progress';

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
