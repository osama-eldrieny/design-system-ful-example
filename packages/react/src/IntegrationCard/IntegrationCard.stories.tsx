import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar, MessageSquare } from 'lucide-react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { IntegrationCard } from './IntegrationCard';

const meta = {
  title: 'Patterns/IntegrationCard',
  component: IntegrationCard,
  tags: ['!autodocs'],
  args: {
    name: 'Slack',
    description: 'Post updates to a channel.',
    icon: <MessageSquare />,
    connected: false,
    onConnectedChange: fn(),
    actions: <Button size="small" variant="secondary" appearance="outline">Configure</Button>,
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 360 }}><Story /></div>],
} satisfies Meta<typeof IntegrationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <IntegrationCard {...args} connected={false} />
      <IntegrationCard {...args} name="Google Calendar" icon={<Calendar />} connected />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <IntegrationCard {...args} name="سلاك" description="انشر التحديثات في قناة." actions={undefined} />
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
            <IntegrationCard {...args} name={`${brand} ${mode}`} connected />
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
    await userEvent.click(canvas.getByRole('switch', { name: 'Connect Slack' }));
    await expect(args.onConnectedChange).toHaveBeenCalledWith(true);
  },
};
