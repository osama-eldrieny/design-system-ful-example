import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Breadcrumb } from './Breadcrumb';

const trail = [
  { label: 'Home', href: '#home' },
  { label: 'Electronics', href: '#electronics' },
  { label: 'Audio', href: '#audio' },
  { label: 'Headphones', href: '#headphones' },
  { label: 'Over-ear', href: '#over-ear' },
  { label: 'Wireless Headphones Pro' },
];

const meta = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['!autodocs'],
  args: { items: trail.slice(-3) },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Collapsed: Story = { args: { items: trail, maxItems: 4 } };

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    'aria-label': 'مسار التنقل',
    items: [
      { label: 'الرئيسية', href: '#home' },
      { label: 'الصوتيات', href: '#audio' },
      { label: 'سماعات لاسلكية' },
    ],
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Breadcrumb aria-label={`${brand} ${mode}`} items={trail} maxItems={4} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Marks the current page and expands collapsed levels. */
export const Expand: Story = {
  tags: ['test'],
  args: { items: trail, maxItems: 4 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible();
    await expect(canvas.getByText('Wireless Headphones Pro')).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(canvas.queryByRole('link', { name: 'Audio' })).toBeNull();
    await userEvent.click(canvas.getByRole('button', { name: 'Show all pages' }));
    await expect(canvas.getByRole('link', { name: 'Audio' })).toBeVisible();
  },
};
