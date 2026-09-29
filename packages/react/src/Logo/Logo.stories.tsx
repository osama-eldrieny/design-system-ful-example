import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flame } from 'lucide-react';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Logo } from './Logo';

const meta = {
  title: 'Patterns/Logo',
  component: Logo,
  tags: ['!autodocs'],
  args: { name: 'TechHub', hideName: false },
  argTypes: { icon: { control: false } },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
      <Logo {...args} />
      <Logo {...args} icon={<Flame />} href="#home" />
      <Logo {...args} hideName />
    </div>
  ),
};

export const States: Story = {
  render: (args) => <Logo {...args} href="#home" id="logo-focus" />,
  parameters: { pseudo: { focusVisible: ['#logo-focus'] } },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { name: 'تك هب' },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Logo {...args} name={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** A linked logo is one link named by the product; a mark-only logo is still named. */
export const Names: Story = {
  tags: ['test'],
  render: () => (
    <>
      <Logo name="TechHub" href="#home" />
      <Logo name="Analytics" hideName />
    </>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'TechHub' })).toHaveAttribute('href', '#home');
    await expect(canvas.getByRole('img', { name: 'Analytics' })).toBeVisible();
  },
};
