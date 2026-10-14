import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { VerificationCodeInput } from './VerificationCodeInput';

const meta = {
  title: 'Components/Forms/VerificationCodeInput',
  component: VerificationCodeInput,
  tags: ['!autodocs'],
  args: {
    label: 'Verification code',
    length: 6,
    size: 'medium',
    description: 'Enter the 6-digit code we sent to olivia@example.com.',
    onValueChange: fn(),
    onComplete: fn(),
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof VerificationCodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <VerificationCodeInput
          key={size}
          {...args}
          size={size}
          label={`Code (${size})`}
          length={4}
        />
      ))}
    </div>
  ),
};

/** Four or six boxes; a dash can split six into two groups of three. */
export const Lengths: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <VerificationCodeInput {...args} length={4} size="small" label="4 digits" />
      <VerificationCodeInput
        {...args}
        length={6}
        size="small"
        separatorAfter={3}
        label="6 digits"
      />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <VerificationCodeInput {...args} size="small" label="Filled" defaultValue="123456" />
      <VerificationCodeInput
        {...args}
        size="small"
        label="Error"
        defaultValue="123456"
        error="That code is wrong. Try again."
      />
      <VerificationCodeInput {...args} size="small" label="Disabled" disabled />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { label: 'رمز التحقق', description: 'أدخل الرمز المكون من 6 أرقام.', size: 'small' },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <VerificationCodeInput
              label={`${brand} ${mode}`}
              size="small"
              length={4}
              defaultValue="12"
              description="Sent by email"
              error={mode === 'dark' ? 'Wrong code' : undefined}
            />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Typing moves forward and completes; Backspace moves back. */
export const Typing: Story = {
  tags: ['test'],
  args: { length: 4, description: undefined },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByLabelText('Character 1 of 4'));
    await userEvent.keyboard('2468');
    await expect(args.onComplete).toHaveBeenCalledWith('2468');
    await userEvent.keyboard('{Backspace}{Backspace}');
    await expect(canvas.getByLabelText('Character 3 of 4')).toHaveFocus();
  },
};
