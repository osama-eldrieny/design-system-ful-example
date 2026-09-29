import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Footer } from './Footer';

const links = [
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
  { label: 'Help', href: '#help' },
];

const meta = {
  title: 'Patterns/Footer',
  component: Footer,
  tags: ['!autodocs'],
  args: { title: '© 2026 TechHub', links },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TextOnly: Story = {
  args: { links: [] },
};

export const States: Story = {
  args: {
    links: [
      { label: 'Default', href: '#a' },
      { label: 'Hover', href: '#b' },
      { label: 'Focus', href: '#c' },
    ],
  },
  parameters: { pseudo: { hover: ['a[href="#b"]'], focusVisible: ['a[href="#c"]'] } },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    title: '© 2026 تك هب',
    links: [
      { label: 'الخصوصية', href: '#privacy' },
      { label: 'الشروط', href: '#terms' },
    ],
    linksLabel: 'روابط التذييل',
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          // Inside a section, so the six footers aren't six contentinfo landmarks.
          <section key={`${brand}-${mode}`} aria-label={`${brand} ${mode}`}>
            <ThemeProvider theme={{ brand, mode }} className="ds-canvas">
              <Footer {...args} linksLabel={`${brand} ${mode} links`} />
            </ThemeProvider>
          </section>
        )),
      )}
    </div>
  ),
};

/** Links are in a named nav; an item without href is a button that runs onClick. */
export const Links: Story = {
  tags: ['test'],
  args: { links: [...links, { label: 'Cookie settings', onClick: fn() }] },
  play: async ({ args, canvas }) => {
    await expect(canvas.getByRole('navigation', { name: 'Footer' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '#privacy');
    await userEvent.click(canvas.getByRole('button', { name: 'Cookie settings' }));
    await expect(args.links?.[3].onClick).toHaveBeenCalled();
  },
};
