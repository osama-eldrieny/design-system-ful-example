import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Grid } from './Grid';

const box = {
  padding: 12,
  background: 'var(--color-bg-primary-1)',
  color: 'var(--color-fg-on-primary-high)',
  fontFamily: 'var(--font-family-body)',
  borderRadius: 8,
};

const meta = {
  title: 'Components/Layout/Grid',
  component: Grid,
  tags: ['!autodocs'],
  args: { columns: 'auto', gap: 'md', minItemWidth: '10rem', children: null },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <Grid {...args}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} style={box}>
          Cell {n}
        </div>
      ))}
    </Grid>
  ),
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const RightToLeft: Story = { globals: { language: 'ar' } };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Grid columns={3}>
              {[1, 2, 3].map((n) => (
                <div key={n} style={box}>{`${brand} ${mode} ${n}`}</div>
              ))}
            </Grid>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Renders the chosen element with its layout class. */
export const Semantics: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.ds-grid')).toBeInTheDocument();
  },
};
