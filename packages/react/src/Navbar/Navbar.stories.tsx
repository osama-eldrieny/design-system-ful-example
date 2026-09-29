import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, CreditCard, BookOpen, Search } from 'lucide-react';
import { expect, fn, userEvent } from 'storybook/test';
import { Button } from '../Button';
import { Logo } from '../Logo';
import { ThemeProvider } from '../ThemeProvider';
import { Navbar } from './Navbar';

const items = [
  { label: 'Products', href: '#products' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
];

const meta = {
  title: 'Patterns/Navbar',
  component: Navbar,
  tags: ['!autodocs'],
  args: {
    logo: <Logo name="TechHub" href="#home" />,
    items,
    defaultCurrentItem: 'Products',
    onCurrentItemChange: fn(),
  },
  argTypes: { logo: { control: false }, actions: { control: false } },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithIconsAndActions: Story = {
  args: {
    items: [
      { label: 'Products', href: '#products', icon: <Box /> },
      { label: 'Pricing', href: '#pricing', icon: <CreditCard /> },
      { label: 'Docs', href: '#docs', icon: <BookOpen /> },
    ],
    actions: (
      <>
        <Button size="small" appearance="text" variant="secondary" iconStart={<Search />}>
          Search
        </Button>
        <Button size="small">Sign in</Button>
      </>
    ),
  },
};

export const States: Story = {
  args: {
    items: [
      { label: 'Default', href: '#a' },
      { id: 'hover', label: 'Hover', href: '#b' },
      { label: 'Current', href: '#c' },
      { id: 'focus', label: 'Focus', href: '#d' },
    ],
    defaultCurrentItem: 'Current',
  },
  parameters: {
    pseudo: { hover: ['a[href="#b"]'], focusVisible: ['a[href="#d"]'] },
  },
};

export const Narrow: Story = {
  decorators: [(Story) => <div style={{ maxInlineSize: 360 }}>{Story()}</div>],
  args: { actions: <Button size="small">Sign in</Button> },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    logo: <Logo name="تك هب" href="#home" />,
    items: [
      { label: 'المنتجات', href: '#products' },
      { label: 'الأسعار', href: '#pricing' },
    ],
    defaultCurrentItem: 'المنتجات',
    'aria-label': 'الرئيسية',
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Navbar
              {...args}
              aria-label={`${brand} ${mode}`}
              logo={<Logo name={`${brand} ${mode}`} />}
            />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** A named nav of links; clicking an item makes it the current page. */
export const CurrentPage: Story = {
  tags: ['test'],
  // Cancel the navigation, as a single-page-app router would, so the test page stays put.
  args: {
    items: items.map((item) => ({ ...item, onClick: (event) => event.preventDefault() })),
  },
  play: async ({ args, canvas }) => {
    await expect(canvas.getByRole('navigation', { name: 'Main' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Products' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    const pricing = canvas.getByRole('link', { name: 'Pricing' });
    await userEvent.click(pricing);
    await expect(pricing).toHaveAttribute('aria-current', 'page');
    await expect(canvas.getByRole('link', { name: 'Products' })).not.toHaveAttribute(
      'aria-current',
    );
    await expect(args.onCurrentItemChange).toHaveBeenCalledWith('Pricing');
  },
};
