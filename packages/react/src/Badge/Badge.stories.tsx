import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUp, ArrowUpRight, Plus, Star } from 'lucide-react';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Badge, BadgeGroup, BADGE_HUES, BADGE_TONES, type BadgeSize } from './Badge';

const TONES = BADGE_TONES;
const COLORS = [...BADGE_TONES, ...BADGE_HUES];
const SIZES: BadgeSize[] = ['small', 'medium', 'large'];
const PHOTO =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" fill="%2394a3b8"/><circle cx="8" cy="6" r="3" fill="%23f1f5f9"/><rect x="3" y="10" width="10" height="6" rx="3" fill="%23f1f5f9"/></svg>';
const row = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' } as const;

const meta = {
  title: 'Components/Feedback/Badge',
  component: Badge,
  subcomponents: { BadgeGroup },
  tags: ['!autodocs'],
  args: { children: 'Paid', tone: 'success', appearance: 'subtle' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['subtle', 'solid'] as const).map((appearance) => (
        <div key={appearance} style={row}>
          {TONES.map((tone) => (
            <Badge key={tone} tone={tone} appearance={appearance}>
              {tone}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Category hues for labels with no meaning of their own: departments, projects, file types. */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['subtle', 'solid'] as const).map((appearance) => (
        <div key={appearance} style={row}>
          {COLORS.map((tone) => (
            <Badge key={tone} tone={tone} appearance={appearance}>
              {tone}
            </Badge>
          ))}
        </div>
      ))}
      <div style={row}>
        {COLORS.map((tone) => (
          <Badge key={tone} tone={tone} bordered>
            {tone}
          </Badge>
        ))}
      </div>
    </div>
  ),
};

/** Pill (default), rounded corners, or modern: neutral with a border, only the dot is colored. */
export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['pill', 'rounded', 'modern'] as const).map((shape) => (
        <div key={shape} style={row}>
          {COLORS.slice(0, 7).map((tone) => (
            <Badge key={tone} tone={tone} shape={shape} withDot>
              {shape}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={row}>
      {SIZES.map((size) => (
        <Badge key={size} size={size} tone="primary" withDot>
          {size}
        </Badge>
      ))}
    </div>
  ),
};

/** A status dot, icons, an image, a remove button, or an icon only. */
export const WithContent: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['pill', 'rounded', 'modern'] as const).map((shape) => (
        <div key={shape} style={row}>
          <Badge shape={shape} tone="success" withDot>
            Active
          </Badge>
          <Badge shape={shape} tone="success" iconStart={<ArrowUp />}>
            12%
          </Badge>
          <Badge shape={shape} tone="blue" iconEnd={<ArrowUpRight />}>
            Docs
          </Badge>
          <Badge shape={shape} tone="gray" image={PHOTO}>
            Olivia Rhye
          </Badge>
          <Badge shape={shape} tone="indigo" onDismiss={fn()}>
            Design
          </Badge>
          <Badge shape={shape} tone="orange" iconStart={<Plus />} label="Add label" />
          <Badge shape={shape} tone="warning" iconStart={<Star />} label="Starred" />
        </div>
      ))}
    </div>
  ),
};

/** A badge with a message, to announce something. With href it is a link. */
export const Groups: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <BadgeGroup badge="New feature" href="#">
        We've just released a new feature
      </BadgeGroup>
      <BadgeGroup badge="Fix" tone="danger" href="#">
        Billing page bug fixed
      </BadgeGroup>
      <BadgeGroup badge="Beta" tone="success" badgePosition="trailing" href="#">
        Analytics dashboard
      </BadgeGroup>
      <BadgeGroup badge="v1.4" tone="gray">
        Release notes
      </BadgeGroup>
    </div>
  ),
};

export const CountsAndDots: Story = {
  render: () => (
    <div style={row}>
      <Badge appearance="solid" tone="danger" count={3} label="3 unread messages" />
      <Badge appearance="solid" tone="danger" count={128} label="128 unread messages" />
      <Badge dot tone="success" label="Online" />
      <Badge dot tone="warning" label="Away" />
    </div>
  ),
};

export const RightToLeft: Story = { globals: { language: 'ar' }, args: { children: 'مدفوع' } };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={row}>
              {COLORS.flatMap((tone) =>
                (['subtle', 'solid'] as const).map((appearance) => (
                  <Badge key={tone + appearance} tone={tone} appearance={appearance}>
                    {tone}
                  </Badge>
                )),
              )}
              {COLORS.map((tone) => (
                <Badge key={tone} tone={tone} shape="modern" withDot>
                  {tone}
                </Badge>
              ))}
              <BadgeGroup badge="New" href="#">
                Released
              </BadgeGroup>
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Counts cap at max and are announced with their label. */
export const Labels: Story = {
  tags: ['test'],
  render: () => <Badge count={128} label="128 unread messages" />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('99+')).toHaveAttribute('aria-hidden', 'true');
    await expect(canvas.getByText('128 unread messages')).toBeInTheDocument();
  },
};

/** The remove button is named after the badge and calls onDismiss. */
export const Dismiss: Story = {
  tags: ['test'],
  args: { onDismiss: fn(), children: 'Design', tone: 'indigo' },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Remove Design' });
    await userEvent.click(button);
    await expect(args.onDismiss).toHaveBeenCalledTimes(1);
  },
};
