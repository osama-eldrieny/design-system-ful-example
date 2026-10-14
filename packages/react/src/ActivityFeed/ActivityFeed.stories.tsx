import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, Upload, UserPlus } from 'lucide-react';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { ActivityFeed, type ActivityFeedItem } from './ActivityFeed';

const items: ActivityFeedItem[] = [
  {
    id: 1,
    avatar: { name: 'Phoenix Baker', src: 'assets/avatar-1.png' },
    title: (
      <>
        <strong>Phoenix Baker</strong> commented on <strong>Q3 report</strong>
      </>
    ),
    time: 'Just now',
    content: 'Great work, the charts read much better now.',
    unread: true,
  },
  {
    id: 2,
    avatar: { name: 'Lana Steiner', src: 'assets/avatar-3.png' },
    title: (
      <>
        <strong>Lana Steiner</strong> uploaded 2 files
      </>
    ),
    time: '2 hours ago',
    content: (
      <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
        <FileText size={16} aria-hidden="true" /> Tech requirements.pdf · 720 KB
      </span>
    ),
  },
  {
    id: 3,
    icon: <UserPlus />,
    iconTone: 'success',
    title: (
      <>
        <strong>Demi Wilkinson</strong> joined the team
      </>
    ),
    time: 'Yesterday',
  },
  {
    id: 4,
    icon: <Upload />,
    iconTone: 'blue',
    title: 'Monthly export finished',
    time: 'Mon',
  },
];

const meta = {
  title: 'Components/Data display/ActivityFeed',
  component: ActivityFeed,
  tags: ['!autodocs'],
  args: { items, appearance: 'connected' },
  argTypes: { items: { control: false } },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 440 }}>{Story()}</div>],
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** A timeline line between markers, lines between items, or neither. */
export const Appearances: Story = {
  decorators: [],
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 32,
      }}
    >
      {(['connected', 'divided', 'plain'] as const).map((appearance) => (
        <ActivityFeed key={appearance} {...args} appearance={appearance} aria-label={appearance} />
      ))}
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    items: [
      {
        id: 1,
        avatar: { name: 'ليلى حداد' },
        title: (
          <>
            <strong>ليلى حداد</strong> علّقت على التقرير
          </>
        ),
        time: 'الآن',
        content: 'عمل رائع!',
      },
      { id: 2, icon: <Upload />, title: 'اكتمل التصدير الشهري', time: 'أمس' },
    ],
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <ActivityFeed {...args} aria-label={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Unread items say so to screen readers. */
export const Unread: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('listitem')[0]).toHaveTextContent(/^Unread:/);
  },
};
