import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/Forms/SearchField',
  component: SearchField,
  tags: ['!autodocs'],
  args: { placeholder: 'Search products', shortcut: '/', onSearch: fn(), onValueChange: fn() },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 360 }}>{Story()}</div>],
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <SearchField {...args} size="small" label="Small search" shortcut={undefined} />
      <SearchField {...args} size="medium" label="Medium search" shortcut="mod+k" />
      <SearchField {...args} size="large" label="Large search" shortcut={undefined} />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    showLabel: true,
    label: 'Search orders',
    placeholder: 'Order number or name',
    shortcut: undefined,
  },
};

export const Filled: Story = { args: { defaultValue: 'headphones' } };

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { label: 'بحث', placeholder: 'ابحث عن المنتجات' },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [(Story) => <div style={{ display: 'grid', gap: 12 }}>{Story()}</div>],
  render: (args) => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <SearchField {...args} label={`${brand} ${mode} search`} shortcut="/" />
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** The shortcut focuses it; Enter searches; Escape clears. */
export const Keyboard: Story = {
  tags: ['test'],
  play: async ({ args, canvas }) => {
    const field = canvas.getByRole('searchbox', { name: 'Search' });
    await expect(field).toHaveAttribute('aria-keyshortcuts', '/');
    field.blur();
    await userEvent.keyboard('/');
    await expect(field).toHaveFocus();
    await userEvent.keyboard('lamp{Enter}');
    await expect(args.onSearch).toHaveBeenCalledWith('lamp');
    await userEvent.keyboard('{Escape}');
    await expect(field).toHaveValue('');
  },
};
