import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart3, House, Package, Settings, Users } from 'lucide-react';
import { expect, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { SideNav, type SideNavSection } from './SideNav';

const sections: SideNavSection[] = [
  {
    items: [
      { id: 'home', label: 'Home', href: '#home', icon: <House /> },
      { id: 'orders', label: 'Orders', href: '#orders', icon: <Package /> },
      {
        id: 'reports',
        label: 'Reports',
        icon: <BarChart3 />,
        items: [
          { id: 'sales', label: 'Sales', href: '#sales' },
          { id: 'traffic', label: 'Traffic', href: '#traffic' },
        ],
      },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { id: 'team', label: 'Team', href: '#team', icon: <Users /> },
      { id: 'settings', label: 'Settings', href: '#settings', icon: <Settings /> },
    ],
  },
];

const meta = {
  title: 'Components/Navigation/SideNav',
  component: SideNav,
  tags: ['!autodocs'],
  args: { sections, currentItem: 'sales' },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 260 }}>{Story()}</div>],
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Flat: Story = {
  args: {
    currentItem: 'orders',
    sections: [sections[1], { items: sections[0].items.slice(0, 2) }],
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    'aria-label': 'جانبي',
    currentItem: 'orders',
    sections: [
      {
        items: [
          { id: 'home', label: 'الرئيسية', href: '#home', icon: <House /> },
          { id: 'orders', label: 'الطلبات', href: '#orders', icon: <Package /> },
        ],
      },
    ],
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [(Story) => <div style={{ display: 'grid', gap: 12 }}>{Story()}</div>],
  render: () => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <SideNav aria-label={`${brand} ${mode}`} sections={sections} currentItem="sales" />
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** The group holding the current page starts open; groups toggle. */
export const Groups: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Sales' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    const reports = canvas.getByRole('button', { name: 'Reports' });
    await expect(reports).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(reports);
    await expect(reports).toHaveAttribute('aria-expanded', 'false');
    await expect(canvas.queryByRole('link', { name: 'Sales' })).toBeNull();
  },
};
