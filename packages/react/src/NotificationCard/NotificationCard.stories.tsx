import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShieldCheck } from 'lucide-react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { NotificationCard } from './NotificationCard';

const actions = (
  <>
    <Button size="small" variant="secondary" appearance="outline">Dismiss</Button>
    <Button size="small">Reply</Button>
  </>
);

const meta = {
  title: 'Components/Feedback/NotificationCard',
  component: NotificationCard,
  tags: ['!autodocs'],
  args: {
    title: 'Lana replied to your comment',
    description: 'I’ve finished adding my notes!',
    time: '2 mins ago',
    avatar: { name: 'Lana Steiner', status: 'online' },
    actions,
    unread: true,
    onDismiss: fn(),
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 480, border: '1px solid transparent' }}><Story /></div>],
} satisfies Meta<typeof NotificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ReadAndUnread: Story = {
  render: (args) => (
    <div>
      <NotificationCard {...args} unread />
      <NotificationCard {...args} unread={false} title="Omar invited you to a project" />
    </div>
  ),
};

export const SystemNotice: Story = {
  args: { avatar: undefined, icon: <ShieldCheck />, iconTone: 'success', title: 'Two-factor authentication enabled', description: undefined, actions: undefined, time: 'Today' },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <NotificationCard {...args} title="ردّت لانا على تعليقك" description="انتهيت من إضافة ملاحظاتي!" time="منذ دقيقتين" actions={undefined} />
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
            <NotificationCard {...args} title={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('article', { name: 'Lana replied to your comment' })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Dismiss notification' }));
    await expect(args.onDismiss).toHaveBeenCalled();
  },
};
