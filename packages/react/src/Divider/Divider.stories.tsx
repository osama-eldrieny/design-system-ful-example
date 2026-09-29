import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Divider } from './Divider';
import { ThemeProvider } from '../ThemeProvider';

const meta = {
  title: 'Components/Layout/Divider',
  component: Divider,
  tags: ['!autodocs'],
  args: {},
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        ...{ fontFamily: 'var(--font-family-body)', color: 'var(--color-fg-on-surface-primary)' },
        maxInlineSize: 360,
      }}
    >
      <p>Above</p>
      <Divider />
      <p>Below</p>
      <Divider label="or" />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        Left <Divider orientation="vertical" /> Right
      </div>
    </div>
  ),
};

export const RightToLeft: Story = { globals: { language: 'ar' }, args: { label: 'أو' } };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div
              style={{
                fontFamily: 'var(--font-family-body)',
                color: 'var(--color-fg-on-surface-primary)',
              }}
            >
              <Divider label={`${brand} ${mode}`} />
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Horizontal dividers are separators. */
export const Semantics: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('separator')).toBeInTheDocument();
  },
};
