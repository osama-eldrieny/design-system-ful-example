import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { AppsNotifications } from './AppsNotifications';

const apps = [
  { id: 'google', name: 'Google', icon: 'assets/google.png' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'assets/linkedin.png' },
  { id: 'behance', name: 'Behance', icon: 'assets/behance.png', defaultEnabled: false },
  { id: 'twitter', name: 'X (Twitter)', icon: 'assets/twitter.png' },
];

const meta = {
  title: 'Patterns/AppsNotifications',
  component: AppsNotifications,
  tags: ['!autodocs'],
  args: { title: 'Notifications', items: apps, appearance: 'elevated', onEnabledChange: fn() },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 320 }}>{Story()}</div>],
} satisfies Meta<typeof AppsNotifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  decorators: [(Story) => <div style={{ display: 'grid', gap: 16 }}>{Story()}</div>],
  render: (args) => (
    <>
      <AppsNotifications {...args} appearance="elevated" title="Elevated" />
      <AppsNotifications {...args} appearance="outlined" title="Outlined" />
      <AppsNotifications {...args} appearance="filled" title="Filled" />
    </>
  ),
};

export const States: Story = {
  args: {
    title: 'States',
    items: [
      { id: 'on', name: 'On', defaultEnabled: true },
      { id: 'off', name: 'Off', defaultEnabled: false },
      { id: 'disabled', name: 'Disabled (managed by admin)', defaultEnabled: true, disabled: true },
    ],
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    title: 'إشعارات التطبيقات',
    items: [
      { id: 'google', name: 'جوجل', icon: 'assets/google.png' },
      { id: 'linkedin', name: 'لينكدإن', icon: 'assets/linkedin.png' },
    ],
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [(Story) => <div style={{ display: 'grid', gap: 12 }}>{Story()}</div>],
  render: (args) => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <AppsNotifications {...args} title={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** A named panel of switches named by app; clicking the name toggles and reports it. */
export const Toggle: Story = {
  tags: ['test'],
  play: async ({ args, canvas }) => {
    await expect(canvas.getByRole('region', { name: 'Notifications' })).toBeVisible();
    const behance = canvas.getByRole('switch', { name: 'Behance' });
    await expect(behance).not.toBeChecked();
    await userEvent.click(canvas.getByText('Behance'));
    await expect(behance).toBeChecked();
    await expect(args.onEnabledChange).toHaveBeenCalledWith('behance', true);
  },
};
