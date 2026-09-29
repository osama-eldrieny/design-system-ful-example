import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { expect, screen, userEvent, waitFor } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { ToastProvider, useToast, type ToastOptions, type ToastTone } from './Toast';

const TONES: ToastTone[] = ['primary', 'success', 'warning', 'danger'];
const messages: Record<ToastTone, ToastOptions> = {
  primary: { title: 'New version available', description: 'Reload to update.' },
  success: { title: 'Changes saved', tone: 'success' },
  warning: { title: 'Storage almost full', description: '9.1 of 10 GB used.', tone: 'warning' },
  danger: {
    title: 'Upload failed',
    description: 'Check your connection and try again.',
    tone: 'danger',
  },
};

const Buttons = () => {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {TONES.map((tone) => (
        <Button key={tone} appearance="outline" onClick={() => toast(messages[tone])}>
          {`Show ${tone}`}
        </Button>
      ))}
      <Button
        onClick={() =>
          toast({
            title: 'Project deleted',
            action: { label: 'Undo', onClick: () => {}, altText: 'Restore it from Trash' },
          })
        }
      >
        Delete with undo
      </Button>
    </div>
  );
};

const ShowOnMount = ({ list }: { list: ToastOptions[] }) => {
  const toast = useToast();
  useEffect(() => list.forEach((t) => toast({ ...t, duration: Infinity })), [list, toast]);
  return null;
};

const meta = {
  title: 'Components/Feedback/Toast',
  component: ToastProvider,
  tags: ['!autodocs'],
  args: { children: null },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: () => (
    <ToastProvider>
      <Buttons />
    </ToastProvider>
  ),
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <ToastProvider>
      <ShowOnMount list={TONES.map((t) => messages[t])} />
    </ToastProvider>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <ToastProvider label="الإشعارات" closeLabel="إغلاق">
      <ShowOnMount list={[{ title: 'تم حفظ التغييرات', tone: 'success' }]} />
    </ToastProvider>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <ToastProvider label={`${brand} ${mode} notifications`}>
              <ShowOnMount list={[{ ...messages.success, title: `${brand} ${mode}` }]} />
            </ToastProvider>
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** A toast appears as a status, and its action and close buttons work. */
export const ShowAndDismiss: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Show success' }));
    const toast = await screen.findByText('Changes saved');
    // It slides in, so wait until it's fully shown.
    await waitFor(() => expect(toast).toBeVisible());
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() => expect(screen.queryByText('Changes saved')).toBeNull());
  },
};
