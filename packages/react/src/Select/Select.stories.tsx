import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, userEvent, waitFor } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Select, SelectGroup, SelectItem, SelectSeparator } from './Select';

const sortOptions = (
  <>
    <SelectItem value="newest">Newest first</SelectItem>
    <SelectItem value="price-asc">Price: low to high</SelectItem>
    <SelectItem value="price-desc">Price: high to low</SelectItem>
    <SelectItem value="rating" disabled>
      Rating (coming soon)
    </SelectItem>
  </>
);

const meta = {
  title: 'Components/Forms/Select',
  component: Select,
  subcomponents: { SelectItem, SelectGroup, SelectSeparator },
  tags: ['!autodocs'],
  args: {
    label: 'Sort by',
    placeholder: 'Choose an order',
    description: 'Applies to the product list.',
    size: 'medium',
    onValueChange: fn(),
    children: sortOptions,
  },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 320 }}>{Story()}</div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Select {...args} size="small" label="Small" />
      <Select {...args} size="medium" label="Medium" />
      <Select {...args} size="large" label="Large" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Select {...args} label="Placeholder" />
      <Select {...args} label="Selected" defaultValue="newest" />
      <Select {...args} label="Hover" id="select-hover" />
      <Select {...args} label="Focus" id="select-focus" />
      <Select {...args} label="Error" required error="Choose an order." />
      <Select {...args} label="Success" defaultValue="newest" success="Saved." />
      <Select {...args} label="Disabled" disabled defaultValue="newest" />
    </div>
  ),
  parameters: { pseudo: { hover: ['#select-hover'], focusVisible: ['#select-focus'] } },
};

export const Groups: Story = {
  args: {
    label: 'Time zone',
    placeholder: undefined,
    description: undefined,
    defaultValue: 'cet',
    children: (
      <>
        <SelectGroup label="Europe">
          <SelectItem value="gmt">London (GMT)</SelectItem>
          <SelectItem value="cet">Berlin (CET)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup label="Middle East">
          <SelectItem value="gst">Dubai (GST)</SelectItem>
          <SelectItem value="ast">Riyadh (AST)</SelectItem>
        </SelectGroup>
      </>
    ),
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    label: 'ترتيب حسب',
    placeholder: 'اختر ترتيبًا',
    description: undefined,
    children: (
      <>
        <SelectItem value="newest">الأحدث أولاً</SelectItem>
        <SelectItem value="price">السعر</SelectItem>
      </>
    ),
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
            <div style={{ display: 'grid', gap: 12 }}>
              <Select {...args} label={`${brand} ${mode}`} defaultValue="newest" />
              <Select {...args} label={`${brand} ${mode} error`} error="Error message." />
            </div>
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** Opens from the keyboard, skips disabled options, selects and reports the value. */
export const Keyboard: Story = {
  tags: ['test'],
  play: async ({ args, canvas }) => {
    const trigger = canvas.getByRole('combobox', { name: 'Sort by' });
    await expect(trigger).toHaveAccessibleDescription('Applies to the product list.');
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    // The list renders in a portal, outside the story canvas.
    const listbox = await screen.findByRole('listbox');
    // It fades in, so wait until it's fully shown.
    await waitFor(() => expect(listbox).toBeVisible());
    await expect(screen.getByRole('option', { name: 'Rating (coming soon)' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    await userEvent.click(screen.getByRole('option', { name: 'Price: low to high' }));
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
    await expect(trigger).toHaveTextContent('Price: low to high');
    await expect(args.onValueChange).toHaveBeenCalledWith('price-asc');
  },
};
