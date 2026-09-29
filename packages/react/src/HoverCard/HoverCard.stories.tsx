import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor } from 'storybook/test';
import { Avatar } from '../Avatar';
import { Link } from '../Link';
import { ThemeProvider } from '../ThemeProvider';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

const Profile = ({ open }: { open?: boolean }) => (
  <HoverCard openDelay={100} defaultOpen={open}>
    <HoverCardTrigger asChild>
      <Link href="#sarah">@sarah</Link>
    </HoverCardTrigger>
    <HoverCardContent>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar name="Sarah Chen" src="assets/avatar-2.png" />
        <div>
          <strong>Sarah Chen</strong>
          <div>Head of Products</div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

const meta = {
  title: 'Components/Overlays/HoverCard',
  component: HoverCard,
  tags: ['!autodocs'],
  parameters: { a11y: { test: 'error' } },
  render: () => (
    <p style={{ fontFamily: 'var(--font-family-body)' }}>
      Reviewed by <Profile />.
    </p>
  ),
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = { render: () => <Profile open /> };

export const RightToLeft: Story = { globals: { language: 'ar' }, render: () => <Profile open /> };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 96 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <HoverCard defaultOpen>
              <HoverCardTrigger asChild>
                <Link href={`#${brand}-${mode}`}>{`${brand} ${mode}`}</Link>
              </HoverCardTrigger>
              <HoverCardContent side="right">Preview text.</HoverCardContent>
            </HoverCard>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Opens on keyboard focus, not only hover. */
export const KeyboardFocus: Story = {
  tags: ['test'],
  play: async () => {
    await userEvent.tab();
    const card = await screen.findByText('Head of Products');
    // It fades in, so wait until it's fully shown.
    await waitFor(() => expect(card).toBeVisible());
  },
};
