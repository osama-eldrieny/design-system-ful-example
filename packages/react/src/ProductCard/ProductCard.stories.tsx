import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { ProductCard } from './ProductCard';

const meta = {
  title: 'Patterns/ProductCard',
  component: ProductCard,
  tags: ['!autodocs'],
  args: {
    title: 'Wireless headphones',
    description: 'Noise cancelling, 30-hour battery',
    price: '$299',
    oldPrice: '$399',
    rating: 4.5,
    reviews: '2,342 reviews',
    appearance: 'elevated',
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 300 }}>{Story()}</div>],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  decorators: [(Story) => <div style={{ display: 'flex', gap: 16 }}>{Story()}</div>],
  render: (args) => (
    <>
      <ProductCard {...args} appearance="elevated" />
      <ProductCard {...args} appearance="outlined" />
      <ProductCard {...args} appearance="filled" />
    </>
  ),
};

export const WithAction: Story = {
  args: { actions: <Button size="small">Add to cart</Button>, href: '#product' },
};

export const States: Story = {
  render: (args) => <ProductCard {...args} href="#product" id="product-hover" />,
  parameters: { pseudo: { hover: ['#product-hover'] } },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    title: 'سماعات لاسلكية',
    description: 'عزل للضوضاء، بطارية 30 ساعة',
    price: '299 $',
    oldPrice: '399 $',
    reviews: '2,342 مراجعة',
    labels: { rating: (r) => `التقييم ${r} من 5`, was: 'كان' },
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [(Story) => <div style={{ display: 'grid', gap: 12 }}>{Story()}</div>],
  render: (args) => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <ProductCard {...args} title={`${brand} ${mode}`} href="#" />
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** Rating and old price are announced in words. */
export const Announcements: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', { name: 'Rated 4.5 out of 5, 2,342 reviews' }),
    ).toBeInTheDocument();
    await expect(canvas.getByText('$399').closest('del')).toHaveTextContent('Was $399');
  },
};
