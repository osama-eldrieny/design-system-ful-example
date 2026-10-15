import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paperclip, Mic } from 'lucide-react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button, IconButton } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { PromptInput } from './PromptInput';

const tools = (
  <>
    <IconButton icon={<Mic />} label="Voice input" variant="secondary" appearance="ghost" size="small" />
    <Button size="small" variant="secondary" appearance="outline" iconStart={<Paperclip />}>
      Attach
    </Button>
  </>
);

const meta = {
  title: 'Components/Forms/PromptInput',
  component: PromptInput,
  tags: ['!autodocs'],
  args: { label: 'Message the assistant', placeholder: 'Ask me anything…', size: 'medium', onSubmit: fn() },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 520 }}><Story /></div>],
} satisfies Meta<typeof PromptInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <PromptInput {...args} size="medium" label="Medium" />
      <PromptInput {...args} size="small" label="Small" rows={2} />
    </div>
  ),
};

export const WithTools: Story = { args: { tools, actions: <Button size="small" variant="secondary" appearance="text">GPT 5.5</Button> } };

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <PromptInput {...args} label="Empty" />
      <PromptInput {...args} label="Ready" defaultValue="Summarise the Q3 report" />
      <PromptInput {...args} label="Disabled" disabled />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <PromptInput {...args} label="أرسل رسالة" placeholder="اسألني أي شيء…" submitLabel="إرسال" tools={tools} />
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
            <PromptInput {...args} label={`${brand} ${mode}`} />
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
    const field = canvas.getByLabelText('Message the assistant');
    await userEvent.type(field, 'Hello{Shift>}{Enter}{/Shift}there');
    await expect(field).toHaveValue('Hello\nthere');
    await userEvent.clear(field);
    await userEvent.type(field, 'Send me the report{Enter}');
    await expect(args.onSubmit).toHaveBeenCalledWith('Send me the report');
    await expect(field).toHaveValue('');
  },
};
