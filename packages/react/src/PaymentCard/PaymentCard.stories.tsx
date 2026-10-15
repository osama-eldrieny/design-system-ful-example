import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { PaymentCard } from './PaymentCard';

const meta = {
  title: 'Components/Data display/PaymentCard',
  component: PaymentCard,
  tags: ['!autodocs'],
  args: { holder: 'Maya Okafor', last4: '1234', expiry: '06/28', brand: 'Orbit', tone: 'brand', size: 'medium' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof PaymentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <PaymentCard {...args} tone="brand" />
      <PaymentCard {...args} tone="dark" last4="9911" />
      <PaymentCard {...args} tone="light" last4="4242" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'end' }}>
      <PaymentCard {...args} size="medium" />
      <PaymentCard {...args} size="small" />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <PaymentCard {...args} holder="مايا أوكافور" />
    </div>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <PaymentCard {...args} tone="light" />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('img', { name: /ending in 1234/ })).toBeInTheDocument();
  },
};
