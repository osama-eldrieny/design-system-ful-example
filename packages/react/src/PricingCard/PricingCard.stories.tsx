import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { PricingCard } from './PricingCard';

const meta = {
  title: 'Patterns/PricingCard',
  component: PricingCard,
  tags: ['!autodocs'],
  args: {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing teams.',
    badge: 'Most popular',
    features: ['Unlimited projects', 'Priority support', 'Team roles'],
    action: <Button>Start free trial</Button>,
    featured: true,
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 320 }}><Story /></div>],
} satisfies Meta<typeof PricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Featured: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(2, 300px)' }}>
      <PricingCard {...args} featured={false} badge={undefined} name="Starter" price="$9" />
      <PricingCard {...args} />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <PricingCard
        {...args}
        name="احترافي"
        period="شهريًا"
        description="للفرق المتنامية."
        badge="الأكثر شيوعًا"
        features={['مشاريع غير محدودة', 'دعم ذو أولوية']}
        action={<Button>ابدأ التجربة المجانية</Button>}
      />
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
            <PricingCard {...args} name={`${brand} ${mode}`} />
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
    await expect(canvas.getByRole('heading', { level: 3, name: 'Pro' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Start free trial' })).toBeInTheDocument();
  },
};
