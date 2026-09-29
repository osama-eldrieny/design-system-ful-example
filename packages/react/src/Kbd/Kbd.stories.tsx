import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Kbd } from './Kbd';
import { ThemeProvider } from '../ThemeProvider';

const meta = {
  title: 'Components/Data display/Kbd',
  component: Kbd,
  tags: ['!autodocs'],
  args: { children: 'Esc' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Combinations: Story = {
  render: () => (
    <p
      style={{ fontFamily: 'var(--font-family-body)', color: 'var(--color-fg-on-surface-primary)' }}
    >
      Press <Kbd keys={['Ctrl', 'K']} /> to search, <Kbd keys={['Shift', 'Enter']} /> for a new
      line, or <Kbd>Esc</Kbd> to close.
    </p>
  ),
};

export const RightToLeft: Story = { globals: { language: 'ar' }, args: { keys: ['Ctrl', 'K'] } };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Kbd keys={['Ctrl', 'K']} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Keys are kbd elements. */
export const Semantics: Story = {
  tags: ['test'],
  args: { keys: ['Ctrl', 'K'] },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('kbd kbd')).toHaveLength(2);
  },
};
