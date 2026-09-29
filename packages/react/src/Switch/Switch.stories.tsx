import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Forms/Switch',
  component: Switch,
  tags: ['!autodocs'],
  args: {
    label: 'Email notifications',
    defaultChecked: true,
    disabled: false,
    labelPosition: 'end',
    onCheckedChange: fn(),
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LabelPosition: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, maxInlineSize: 320 }}>
      <Switch {...args} label="Label at the end" labelPosition="end" />
      <Switch {...args} label="Label at the start" labelPosition="start" />
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    label: 'Real-time updates',
    description: 'Refreshes the dashboard every 30 seconds.',
  },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Switch {...args} label="Off" defaultChecked={false} />
      <Switch {...args} label="On" defaultChecked />
      <Switch {...args} label="Hover" id="switch-hover" />
      <Switch {...args} label="Focus" id="switch-focus" />
      <Switch {...args} label="Disabled off" defaultChecked={false} disabled />
      <Switch {...args} label="Disabled on" defaultChecked disabled />
    </div>
  ),
  parameters: { pseudo: { hover: ['#switch-hover'], focusVisible: ['#switch-focus'] } },
};

export const SettingsList: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxInlineSize: 280 }}>
      {['KPI cards', 'Data charts', 'Team activity'].map((label) => (
        <Switch
          key={label}
          label={label}
          labelPosition="start"
          defaultChecked
          style={{ justifyContent: 'space-between' }}
        />
      ))}
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { label: 'إشعارات البريد الإلكتروني' },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={{ display: 'flex', gap: 24 }}>
              <Switch label={`${brand} ${mode} on`} defaultChecked />
              <Switch label={`${brand} ${mode} off`} />
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Keyboard and pointer toggle the switch; the label is its accessible name. */
export const KeyboardAndPointer: Story = {
  tags: ['test'],
  args: { defaultChecked: false },
  render: function Render(args) {
    const [on, setOn] = useState(false);
    return (
      <Switch
        {...args}
        checked={on}
        onCheckedChange={(v) => {
          setOn(v);
          args.onCheckedChange?.(v);
        }}
      />
    );
  },
  play: async ({ args, canvas, step }) => {
    const control = canvas.getByRole('switch', { name: 'Email notifications' });
    await step('Clicking the label toggles it on', async () => {
      await userEvent.click(canvas.getByText('Email notifications'));
      await expect(control).toHaveAttribute('aria-checked', 'true');
    });
    await step('Space toggles it off', async () => {
      control.focus();
      await userEvent.keyboard(' ');
      await expect(control).toHaveAttribute('aria-checked', 'false');
      await expect(args.onCheckedChange).toHaveBeenCalledTimes(2);
    });
  },
};
