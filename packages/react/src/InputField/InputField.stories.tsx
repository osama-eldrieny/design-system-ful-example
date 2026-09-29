import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Search } from 'lucide-react';
import { useState } from 'react';
import { expect, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { InputField } from './InputField';

const meta = {
  title: 'Components/Forms/InputField',
  component: InputField,
  tags: ['!autodocs'],
  args: {
    label: 'Email address',
    placeholder: 'name@company.com',
    type: 'email',
    size: 'medium',
    hideLabel: false,
    disabled: false,
    readOnly: false,
    required: false,
  },
  argTypes: { iconStart: { control: false }, iconEnd: { control: false } },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 360 }}>{Story()}</div>],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { description: 'We’ll send the receipt here.' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <InputField {...args} size="small" label="Small" />
      <InputField {...args} size="medium" label="Medium" />
      <InputField {...args} size="large" label="Large" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <InputField {...args} iconStart={<Mail />} />
      <InputField
        {...args}
        label="Search"
        hideLabel
        type="search"
        placeholder="Search…"
        iconStart={<Search />}
      />
    </div>
  ),
};

export const Clearable: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('Wireless headphones');
    return (
      <InputField
        {...args}
        label="Search products"
        type="search"
        iconStart={<Search />}
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <InputField {...args} label="Default" />
      <InputField {...args} label="Hover" id="input-hover" />
      <InputField {...args} label="Focus" id="input-focus" />
      <InputField
        {...args}
        label="Error"
        required
        defaultValue="name@"
        error="Enter an email address like name@company.com."
      />
      <InputField {...args} label="Success" defaultValue="osama" success="Username is available." />
      <InputField {...args} label="Read-only" readOnly defaultValue="osama@example.com" />
      <InputField {...args} label="Disabled" disabled defaultValue="osama@example.com" />
    </div>
  ),
  parameters: {
    pseudo: {
      hover: ['.ds-input-field:has(#input-hover) .ds-input-field__control'],
      focusWithin: ['.ds-input-field:has(#input-focus) .ds-input-field__control'],
    },
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    label: 'البريد الإلكتروني',
    placeholder: 'name@company.com',
    description: 'سنرسل الإيصال إلى هنا.',
    iconStart: <Mail />,
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={{ display: 'grid', gap: 12 }}>
              <InputField
                {...args}
                label={`${brand} ${mode}`}
                defaultValue="osama@example.com"
                description="Help text"
              />
              <InputField {...args} label="Error" required error="Enter an email address." />
              <InputField {...args} label="Success" defaultValue="osama" success="Available." />
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Typing, the clear button and focus return. */
export const TypeAndClear: Story = {
  tags: ['test'],
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <InputField
        {...args}
        label="Search"
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
  play: async ({ canvas, step }) => {
    const input = canvas.getByRole('textbox', { name: 'Search' });
    await step('Typing shows the clear button', async () => {
      await userEvent.type(input, 'lamp');
      await expect(input).toHaveValue('lamp');
    });
    await step('Clear empties the field and returns focus', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Clear' }));
      await expect(input).toHaveValue('');
      await expect(input).toHaveFocus();
    });
  },
};
