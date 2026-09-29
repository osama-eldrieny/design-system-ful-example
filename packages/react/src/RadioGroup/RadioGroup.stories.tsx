import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Radio, RadioGroup } from './RadioGroup';

const PERIODS = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'year', label: 'This year' },
];

const meta = {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ['!autodocs'],
  args: {
    label: 'Time period',
    defaultValue: 'month',
    orientation: 'vertical',
    disabled: false,
    onValueChange: fn(),
    children: PERIODS.map((p) => <Radio key={p.value} {...p} />),
  },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Orientation: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <RadioGroup {...args} label="Vertical" orientation="vertical" />
      <RadioGroup {...args} label="Horizontal" orientation="horizontal" defaultValue="yes">
        <Radio value="yes" label="Yes" />
        <Radio value="no" label="No" />
      </RadioGroup>
    </div>
  ),
};

export const WithDescriptions: Story = {
  args: {
    label: 'Plan',
    defaultValue: 'pro',
    description: 'You can change plans at any time.',
    children: [
      <Radio key="free" value="free" label="Free" description="1 project, community support" />,
      <Radio key="pro" value="pro" label="Pro" description="Unlimited projects, email support" />,
      <Radio
        key="team"
        value="team"
        label="Team"
        description="Everything in Pro, plus shared workspaces"
      />,
    ],
  },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <RadioGroup {...args} label="Hover, focus" defaultValue="week">
        <Radio value="today" label="Hover" id="radio-hover" />
        <Radio value="week" label="Selected" />
        <Radio value="month" label="Focus" id="radio-focus" />
        <Radio value="year" label="Disabled" disabled />
      </RadioGroup>
      <RadioGroup {...args} label="Error" defaultValue={undefined} error="Choose a time period." />
      <RadioGroup {...args} label="Disabled group" disabled />
    </div>
  ),
  parameters: { pseudo: { hover: ['#radio-hover'], focusVisible: ['#radio-focus'] } },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    label: 'الفترة الزمنية',
    children: [
      <Radio key="today" value="today" label="اليوم" />,
      <Radio key="week" value="week" label="هذا الأسبوع" />,
      <Radio key="month" value="month" label="هذا الشهر" />,
    ],
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <RadioGroup
              {...args}
              label={`${brand} ${mode}`}
              orientation="horizontal"
              error={mode === 'dark' ? 'Choose one' : undefined}
            />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** One Tab stop; arrow keys move the selection; clicking a label selects it. */
export const KeyboardAndPointer: Story = {
  tags: ['test'],
  render: function Render(args) {
    const [value, setValue] = useState('today');
    return (
      <RadioGroup
        {...args}
        value={value}
        onValueChange={(v) => {
          setValue(v);
          args.onValueChange?.(v);
        }}
      />
    );
  },
  play: async ({ args, canvas, step }) => {
    const group = canvas.getByRole('radiogroup', { name: 'Time period' });
    await step('Clicking a label selects its option', async () => {
      await userEvent.click(canvas.getByText('This week'));
      await expect(canvas.getByRole('radio', { name: 'This week' })).toBeChecked();
    });
    await step('Arrow keys move focus; Space selects', async () => {
      // Clicking a label doesn't move focus; keyboard users arrive on the selected option.
      canvas.getByRole('radio', { name: 'This week' }).focus();
      await userEvent.keyboard('{ArrowDown}');
      const month = canvas.getByRole('radio', { name: 'This month' });
      await waitFor(() => expect(month).toHaveFocus());
      await userEvent.keyboard(' ');
      await expect(month).toBeChecked();
      await expect(args.onValueChange).toHaveBeenLastCalledWith('month');
    });
    await expect(group).toBeInTheDocument();
  },
};
