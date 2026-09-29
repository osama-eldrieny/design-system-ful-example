import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Slider } from './Slider';

const price = (v: number) => `$${v}`;

const meta = {
  title: 'Components/Forms/Slider',
  component: Slider,
  tags: ['!autodocs'],
  args: {
    label: 'Volume',
    defaultValue: [60],
    showValue: true,
    formatValue: (v: number) => `${v}%`,
    onValueChange: fn(),
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 360 }}>{Story()}</div>],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Range: Story = {
  args: {
    label: 'Price',
    min: 0,
    max: 500,
    step: 10,
    defaultValue: [100, 300],
    formatValue: price,
    marks: [{ value: 0 }, { value: 250 }, { value: 500 }],
    description: 'Drag either end, or use the arrow keys.',
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Slider label="Default" defaultValue={[40]} />
      <Slider label="Error" defaultValue={[90]} error="Keep it under 80 to avoid clipping." />
      <Slider label="Disabled" defaultValue={[40]} disabled />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    label: 'السعر',
    defaultValue: [100, 300],
    min: 0,
    max: 500,
    formatValue: price,
    marks: [{ value: 0 }, { value: 500 }],
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [(Story) => <div style={{ display: 'grid', gap: 12 }}>{Story()}</div>],
  render: () => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Slider
              label={`${brand} ${mode}`}
              defaultValue={[20, 70]}
              showValue
              marks={[{ value: 0 }, { value: 100 }]}
            />
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** Range thumbs are named and announce formatted values; keys move them. */
export const Keyboard: Story = {
  tags: ['test'],
  args: {
    label: 'Price',
    min: 0,
    max: 500,
    step: 10,
    defaultValue: [100, 300],
    formatValue: price,
  },
  play: async ({ args, canvas }) => {
    const low = canvas.getByRole('slider', { name: 'Price Minimum' });
    const high = canvas.getByRole('slider', { name: 'Price Maximum' });
    await expect(low).toHaveAttribute('aria-valuetext', '$100');
    await userEvent.click(low);
    await userEvent.keyboard('{ArrowRight}');
    await expect(low).toHaveAttribute('aria-valuetext', '$110');
    await userEvent.keyboard('{Home}');
    await expect(low).toHaveAttribute('aria-valuetext', '$0');
    await expect(high).toHaveAttribute('aria-valuetext', '$300');
    await expect(args.onValueChange).toHaveBeenCalled();
    await expect(canvas.getByText('$0 – $300')).toBeVisible();
  },
};
