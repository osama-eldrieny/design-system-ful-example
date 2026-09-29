import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { Alert, type AlertAppearance, type AlertVariant } from './Alert';

const VARIANTS: AlertVariant[] = ['primary', 'success', 'warning', 'danger'];
const APPEARANCES: AlertAppearance[] = ['subtle', 'solid', 'outline'];
const TITLES: Record<AlertVariant, string> = {
  primary: 'Real-time data enabled.',
  success: 'Payment received.',
  warning: 'Your trial ends in 3 days.',
  danger: 'Payment failed.',
};

const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['!autodocs'],
  args: {
    variant: 'primary',
    appearance: 'subtle',
    title: 'Real-time data enabled.',
    children: 'Updates every 30 seconds.',
  },
  argTypes: { icon: { control: false }, actions: { control: false } },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 520 }}>{Story()}</div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {VARIANTS.map((v) => (
        <Alert key={v} {...args} variant={v} title={TITLES[v]} />
      ))}
    </div>
  ),
};

export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {APPEARANCES.map((a) => (
        <Alert key={a} {...args} appearance={a} title={`${a[0].toUpperCase()}${a.slice(1)}`} />
      ))}
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    variant: 'danger',
    title: 'Payment failed.',
    children: 'Your card was declined. Update it to keep your plan.',
    actions: (
      <>
        <Button size="small" variant="danger">
          Update card
        </Button>
        <Button size="small" variant="danger" appearance="text">
          View invoice
        </Button>
      </>
    ),
  },
};

export const Dismissible: Story = {
  render: function Render(args) {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Alert
        {...args}
        variant="success"
        title="Profile updated."
        onDismiss={() => setVisible(false)}
      />
    ) : (
      <Button appearance="outline" onClick={() => setVisible(true)}>
        Show alert again
      </Button>
    );
  },
};

export const States: Story = {
  render: (args) => <Alert {...args} onDismiss={() => {}} dismissLabel="Dismiss message" />,
  parameters: { pseudo: { hover: ['.ds-alert__dismiss'] } },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    title: 'تم تفعيل البيانات المباشرة.',
    children: 'يتم التحديث كل 30 ثانية.',
    onDismiss: fn(),
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={{ display: 'grid', gap: 8 }}>
              {APPEARANCES.flatMap((a) =>
                VARIANTS.map((v) => (
                  <Alert
                    key={`${a}-${v}`}
                    {...args}
                    variant={v}
                    appearance={a}
                    title={`${brand} ${mode} ${a} ${v}`}
                  />
                )),
              )}
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Dismiss works from pointer and keyboard. */
export const DismissInteraction: Story = {
  tags: ['test'],
  args: { onDismiss: fn() },
  play: async ({ args, canvas }) => {
    const dismiss = canvas.getByRole('button', { name: 'Dismiss' });
    await userEvent.click(dismiss);
    dismiss.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onDismiss).toHaveBeenCalledTimes(2);
    await expect(canvas.getByRole('status')).toHaveTextContent('Real-time data enabled.');
  },
};
