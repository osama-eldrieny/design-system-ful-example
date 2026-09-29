import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Skeleton } from './Skeleton';

const CardSkeleton = () => (
  <div aria-busy="true" style={{ display: 'grid', gap: 12, maxInlineSize: 280 }}>
    <Skeleton variant="rect" height={140} />
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Skeleton variant="circle" width={40} />
      <Skeleton width="50%" />
    </div>
    <Skeleton lines={3} />
  </div>
);

const meta = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  tags: ['!autodocs'],
  args: { variant: 'text', lines: 3 },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 360 }}>{Story()}</div>],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = { render: () => <CardSkeleton /> };

export const RightToLeft: Story = { globals: { language: 'ar' }, render: () => <CardSkeleton /> };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <CardSkeleton />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Hidden from screen readers. */
export const Hidden: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.ds-skeleton')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    await expect(canvasElement.querySelectorAll('.ds-skeleton__line')).toHaveLength(3);
  },
};
