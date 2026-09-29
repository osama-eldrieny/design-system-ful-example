import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Stepper } from './Stepper';

const checkout = [
  { label: 'Cart', description: '3 items' },
  { label: 'Shipping', description: 'Address and speed' },
  { label: 'Payment', description: 'Card or wallet' },
  { label: 'Review' },
];

const meta = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  tags: ['!autodocs'],
  args: { 'aria-label': 'Checkout steps', steps: checkout, current: 1, orientation: 'horizontal' },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 720 }}>{Story()}</div>],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Orientation: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <Stepper {...args} />
      <Stepper {...args} aria-label="Checkout steps, vertical" orientation="vertical" current={2} />
    </div>
  ),
};

export const States: Story = {
  args: {
    current: 2,
    steps: [
      { label: 'Complete' },
      { label: 'Error', error: true },
      { label: 'Current' },
      { label: 'Upcoming' },
    ],
  },
};

const BackDemo = () => {
  const [step, setStep] = useState(2);
  return (
    <Stepper aria-label="Checkout steps" steps={checkout} current={step} onStepClick={setStep} />
  );
};

export const GoingBack: Story = { render: () => <BackDemo /> };

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    'aria-label': 'خطوات الدفع',
    steps: [{ label: 'السلة' }, { label: 'الشحن' }, { label: 'الدفع' }],
    statusLabels: { complete: 'مكتملة', current: 'الخطوة الحالية', upcoming: 'لم تبدأ' },
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Stepper
              aria-label={`${brand} ${mode}`}
              current={2}
              steps={[
                { label: 'Done' },
                { label: 'Error', error: true },
                { label: 'Current' },
                { label: 'Next' },
              ]}
            />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Status is announced; completed steps go back. */
export const Back: Story = {
  tags: ['test'],
  render: () => <BackDemo />,
  play: async ({ canvas }) => {
    const current = canvas.getByText('Payment').closest('li');
    await expect(current).toHaveAttribute('aria-current', 'step');
    await userEvent.click(canvas.getByRole('button', { name: /^Cart\b.*completed/ }));
    await expect(canvas.getByText('Cart').closest('li')).toHaveAttribute('aria-current', 'step');
  },
};
