import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { ColorPicker, type ColorSwatch } from './ColorPicker';

const swatches: ColorSwatch[] = [
  { value: '#2563eb', name: 'Blue' },
  { value: '#7c3aed', name: 'Purple' },
  { value: '#db2777', name: 'Pink' },
  { value: '#dc2626', name: 'Red' },
  { value: '#ea580c', name: 'Orange' },
  { value: '#facc15', name: 'Yellow' },
  { value: '#16a34a', name: 'Green' },
  { value: '#0d9488', name: 'Teal' },
  { value: '#64748b', name: 'Gray' },
  { value: '#ffffff', name: 'White' },
];

const meta = {
  title: 'Components/Forms/ColorPicker',
  component: ColorPicker,
  tags: ['!autodocs'],
  args: {
    label: 'Label color',
    swatches,
    defaultValue: '#2563eb',
    size: 'medium',
    allowCustom: false,
    disabled: false,
    onValueChange: fn(),
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <ColorPicker {...args} label="Small" size="small" />
      <ColorPicker {...args} label="Medium" size="medium" />
    </div>
  ),
};

export const CustomColor: Story = { args: { allowCustom: true, label: 'Project color' } };

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <ColorPicker {...args} label="Selected: Green" defaultValue="#16a34a" />
      <ColorPicker {...args} label="Custom color chosen" allowCustom defaultValue="#a0522d" />
      <ColorPicker {...args} label="Disabled" disabled />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <ColorPicker
        {...args}
        label="لون التصنيف"
        customLabel="لون مخصص"
        allowCustom
        swatches={[
          { value: '#2563eb', name: 'أزرق' },
          { value: '#16a34a', name: 'أخضر' },
          { value: '#dc2626', name: 'أحمر' },
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
            <ColorPicker {...args} label={`${brand} ${mode}`} allowCustom />
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
    await userEvent.click(canvas.getByRole('radio', { name: 'Green' }));
    await expect(args.onValueChange).toHaveBeenCalledWith('#16a34a');
    await expect(canvas.getByRole('radio', { name: 'Green' })).toBeChecked();
  },
};
