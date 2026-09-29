import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight } from 'lucide-react';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Link } from './Link';

const text = { fontFamily: 'var(--font-family-body)', color: 'var(--color-fg-on-surface-primary)' };

const meta = {
  title: 'Components/Actions/Link',
  component: Link,
  tags: ['!autodocs'],
  args: { href: '#returns', children: 'return policy', appearance: 'inline', variant: 'primary' },
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <p style={text}>
      Read our <Link {...args} /> before you send an item back.
    </p>
  ),
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <p style={text}>
        Inline: read our <Link href="#returns">return policy</Link> first.
      </p>
      <Link href="#orders" appearance="standalone" icon={<ArrowRight />}>
        Standalone: view all orders
      </Link>
      <p style={text}>
        Secondary:{' '}
        <Link href="#terms" variant="secondary">
          terms of service
        </Link>
      </p>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Link
          key={size}
          href={`#${size}`}
          appearance="standalone"
          size={size}
          icon={<ArrowRight />}
        >
          {size[0].toUpperCase() + size.slice(1)} link
        </Link>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <Link href="#default" appearance="standalone">
        Default
      </Link>
      <Link href="#hover" appearance="standalone" id="link-hover">
        Hover
      </Link>
      <Link href="#focus" appearance="standalone" id="link-focus">
        Focus
      </Link>
      <Link href="https://www.w3.org/WAI/" external>
        External
      </Link>
    </div>
  ),
  parameters: { pseudo: { hover: ['#link-hover'], focusVisible: ['#link-focus'] } },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Link href="#orders" appearance="standalone" icon={<ArrowRight />}>
      عرض كل الطلبات
    </Link>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <p style={text}>
              {brand} {mode}: <Link href={`#${brand}-${mode}`}>primary link</Link> and{' '}
              <Link href={`#${brand}-${mode}-2`} variant="secondary">
                secondary link
              </Link>
            </p>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** External links open safely in a new tab and say so; icons stay hidden. */
export const External: Story = {
  tags: ['test'],
  render: () => (
    <Link href="https://www.w3.org/WAI/" external>
      WCAG guidelines
    </Link>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'WCAG guidelines (opens in a new tab)' });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};
