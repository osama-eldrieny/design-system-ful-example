import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Container } from './Container';

const box = {
  padding: 12,
  background: 'var(--color-bg-primary-1)',
  color: 'var(--color-fg-on-primary-high)',
  fontFamily: 'var(--font-family-body)',
  borderRadius: 8,
};

const meta = {
  title: 'Components/Layout/Container',
  component: Container,
  tags: ['!autodocs'],
  args: { size: 'medium', children: null },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <div style={{ background: 'var(--color-bg-default)' }}>
      <Container {...args}>
        <div style={box}>Centered content with gutters</div>
      </Container>
    </div>
  ),
} satisfies Meta<typeof Container>;

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
            <Container size="small">
              <div style={box}>{`${brand} ${mode}`}</div>
            </Container>
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
    await expect(canvasElement.querySelector('.ds-container')).toBeInTheDocument();
  },
};
