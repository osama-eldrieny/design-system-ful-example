import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Switch } from '../Switch';
import { ThemeProvider } from '../ThemeProvider';
import { FormField } from './FormField';

const Switches = () => (
  <>
    <Switch label="Comments" defaultChecked />
    <Switch label="New followers" />
    <Switch label="Product news" />
  </>
);

const meta = {
  title: 'Components/Forms/FormField',
  component: FormField,
  tags: ['!autodocs'],
  args: {
    label: 'Email me about',
    description: 'You can change this at any time.',
    group: true,
    children: null,
  },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <FormField {...args}>
      <Switches />
    </FormField>
  ),
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <FormField group label="Default" description="Help text under the controls.">
        <Switches />
      </FormField>
      <FormField group label="Required" required error="Turn on at least one.">
        <Switches />
      </FormField>
      <FormField group label="Optional" optional success="Saved.">
        <Switches />
      </FormField>
      <FormField group label="Disabled" disabled description="Managed by your admin.">
        <Switches />
      </FormField>
    </div>
  ),
};

/** Any single control: the child receives id and the ARIA wiring. */
export const CustomControl: Story = {
  args: { group: false, label: 'Start date', description: 'The first day of your trip.' },
  render: (args) => (
    <FormField {...args} required>
      <input type="date" />
    </FormField>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { label: 'راسلني بخصوص', description: 'يمكنك تغيير ذلك في أي وقت.' },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <FormField
              group
              label={`${brand} ${mode}`}
              required
              description="Help text."
              error="Error message."
            >
              <Switch label="Option" />
            </FormField>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** The label names the control; description and error describe it. */
export const Wiring: Story = {
  tags: ['test'],
  render: () => (
    <FormField label="Start date" description="First day." error="Pick a date." required>
      <input type="date" />
    </FormField>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/Start date/);
    await expect(input).toBeRequired();
    await expect(input).toBeInvalid();
    await expect(input).toHaveAccessibleDescription('First day. Pick a date.');
  },
};
