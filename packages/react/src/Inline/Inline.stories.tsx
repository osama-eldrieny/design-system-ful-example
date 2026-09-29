import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Inline } from './Inline';

const box = {
  padding: 12,
  background: 'var(--color-bg-primary-1)',
  color: 'var(--color-fg-on-primary-high)',
  fontFamily: 'var(--font-family-body)',
  borderRadius: 8,
};

const meta = {
  title: 'Components/Layout/Inline',
  component: Inline,
  tags: ['!autodocs'],
  args: { gap: 'sm', justify: 'start', children: null },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <Inline {...args}>
      {['One', 'Two', 'Three', 'Four'].map((n) => (
        <div key={n} style={box}>
          {n}
        </div>
      ))}
    </Inline>
  ),
} satisfies Meta<typeof Inline>;

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
            <Inline>
              {[1, 2, 3].map((n) => (
                <div key={n} style={box}>{`${brand} ${mode} ${n}`}</div>
              ))}
            </Inline>
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
    await expect(canvasElement.querySelector('.ds-inline')).toBeInTheDocument();
  },
};
