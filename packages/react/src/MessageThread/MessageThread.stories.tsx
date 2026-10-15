import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { MessageThread, type ThreadMessage } from './MessageThread';

const lana = { name: 'Lana Steiner' };
const you = { name: 'You' };
const messages: ThreadMessage[] = [
  { id: '1', author: lana, content: 'Morning! Did the Q3 numbers come in?', time: '9:38' },
  { id: '2', author: lana, content: 'I need them for the board deck.', time: '9:38' },
  { id: '3', author: you, own: true, content: 'Yes, revenue is up 12%. Sending the report now.', time: '9:40' },
  { id: '4', author: you, own: true, content: 'It’s in the shared folder.', time: '9:41', status: 'Read' },
  { id: '5', author: lana, content: 'Perfect, thank you!', time: '9:42' },
];

const meta = {
  title: 'Components/Data display/MessageThread',
  component: MessageThread,
  tags: ['!autodocs'],
  args: { label: 'Conversation with Lana', messages, density: 'comfortable' },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 420 }}><Story /></div>],
} satisfies Meta<typeof MessageThread>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Density: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <MessageThread {...args} label="Comfortable" density="comfortable" />
      <MessageThread {...args} label="Compact" density="compact" />
    </div>
  ),
};

export const Typing: Story = { args: { typing: lana } };

export const States: Story = {
  args: { typing: lana },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <div dir="rtl">
      <MessageThread
        label="محادثة مع لانا"
        typingLabel={(n) => `${n} تكتب`}
        typing={{ name: 'لانا' }}
        messages={[
          { id: '1', author: { name: 'لانا' }, content: 'صباح الخير! هل وصلت الأرقام؟', time: '9:38' },
          { id: '2', author: { name: 'أنت' }, own: true, content: 'نعم، أرسلت التقرير الآن.', time: '9:40', status: 'تمت القراءة' },
        ]}
      />
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
            <MessageThread {...args} label={`${brand} ${mode}`} messages={messages.slice(1, 4)} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  args: { typing: lana },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('log', { name: 'Conversation with Lana' })).toBeInTheDocument();
    await expect(canvas.getByRole('status', { name: 'Lana Steiner is typing' })).toBeInTheDocument();
    // Lana's first two messages share one name label.
    await expect(canvas.getAllByText('Lana Steiner')).toHaveLength(2);
  },
};
