import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, HardDrive } from 'lucide-react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Attachment } from './Attachment';

const meta = {
  title: 'Components/Data display/Attachment',
  component: Attachment,
  tags: ['!autodocs'],
  args: { name: 'Guidelines.pdf', detail: '2.4 MB', href: '#', size: 'medium', onRemove: fn() },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 420 }}><Story /></div>],
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Attachment {...args} size="medium" />
      <Attachment {...args} size="small" name="Q3-report.xlsx" detail="180 KB" />
    </div>
  ),
};

export const Sources: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Attachment {...args} onRemove={undefined} />
      <Attachment name="Branding assets" detail="Google Drive" icon={<HardDrive />} onRemove={undefined} href={undefined} />
      <Attachment name="Notes.docx" detail="12 KB" icon={<FileText />} onRemove={undefined} href={undefined} />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <div dir="rtl">
      <Attachment name="الإرشادات.pdf" detail="2.4 ميغابايت" href="#" removeLabel="إزالة الإرشادات" onRemove={fn()} />
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
            <Attachment {...args} name={`${brand} ${mode}.pdf`} />
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
    await expect(canvas.getByRole('link', { name: 'Guidelines.pdf' })).toHaveAttribute('download');
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Guidelines.pdf' }));
    await expect(args.onRemove).toHaveBeenCalled();
  },
};
