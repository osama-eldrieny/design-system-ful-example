import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  tags: ['!autodocs'],
  args: { label: 'Loading orders', size: 'medium' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Spinner size="small" label="Small" />
      <Spinner size="medium" label="Medium" />
      <Spinner size="large" label="Large" />
    </div>
  ),
};

export const RightToLeft: Story = { globals: { language: 'ar' }, args: { label: 'جارٍ التحميل' } };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Spinner label={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** A status announcing its label. */
export const Announcement: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status')).toHaveTextContent('Loading orders');
  },
};
