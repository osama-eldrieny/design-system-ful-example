import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  tags: ['!autodocs'],
  args: {
    label: 'Message',
    description: 'Tell us how we can help.',
    placeholder: 'Write your message',
    size: 'medium',
    rows: 3,
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 480 }}>{Story()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Textarea {...args} size="small" label="Small" />
      <Textarea {...args} size="medium" label="Medium" />
      <Textarea {...args} size="large" label="Large" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Textarea {...args} label="Default" />
      <Textarea {...args} label="Hover" id="textarea-hover" />
      <Textarea {...args} label="Focus" id="textarea-focus" />
      <Textarea {...args} label="Error" defaultValue="Hi" error="Write at least 20 characters." />
      <Textarea
        {...args}
        label="Success"
        defaultValue="Thanks for the quick reply!"
        success="Sent."
      />
      <Textarea {...args} label="Read-only" readOnly defaultValue="Submitted on 29 September." />
      <Textarea {...args} label="Disabled" disabled />
    </div>
  ),
  parameters: { pseudo: { hover: ['#textarea-hover'], focusVisible: ['#textarea-focus'] } },
};

export const Counter: Story = {
  args: {
    label: 'Bio',
    description: undefined,
    maxLength: 160,
    showCount: true,
    defaultValue: 'Designer and developer.',
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Comment',
    rows: 2,
    autoResize: true,
    maxRows: 6,
    defaultValue: 'This field grows as you type.\nTry adding a few more lines.',
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    label: 'الرسالة',
    description: 'أخبرنا كيف يمكننا المساعدة.',
    placeholder: 'اكتب رسالتك',
    maxLength: 200,
    showCount: true,
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
            <Textarea
              {...args}
              label={`${brand} ${mode}`}
              error="Error message."
              maxLength={100}
              showCount
            />
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** Labelled, described by help and counter; the count updates and is announced after a pause. */
export const Typing: Story = {
  tags: ['test'],
  args: { label: 'Bio', description: 'Shown on your profile.', maxLength: 20, showCount: true },
  play: async ({ canvas }) => {
    const field = canvas.getByRole('textbox', { name: 'Bio' });
    await expect(field).toHaveAccessibleDescription('Shown on your profile. 0 / 20');
    await userEvent.type(field, 'Hello');
    await expect(canvas.getByText('5 / 20')).toBeVisible();
    await waitFor(() => expect(canvas.getByRole('status')).toHaveTextContent('15 characters left'));
  },
};
