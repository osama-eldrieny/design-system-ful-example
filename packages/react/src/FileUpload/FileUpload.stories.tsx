import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { FileUpload, FileUploadItem } from './FileUpload';

const meta = {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  subcomponents: { FileUploadItem },
  tags: ['!autodocs'],
  args: { hint: 'SVG, PNG, JPG or GIF (max. 800×400px)', onFilesChange: fn(), multiple: true },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 480 }}>{Story()}</div>],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Rows for uploading, complete and failed files. */
export const WithFiles: Story = {
  render: (args) => (
    <FileUpload {...args}>
      <FileUploadItem name="Tech requirements.pdf" size="200 KB" progress={40} onRemove={fn()} />
      <FileUploadItem name="Dashboard prototype.fig" size="16 MB" onRemove={fn()} />
      <FileUploadItem
        name="Product video.mp4"
        size="4.2 GB"
        status="error"
        error="Upload failed: file is larger than 1 GB."
        action={
          <Button appearance="text" variant="danger" size="small">
            Try again
          </Button>
        }
        onRemove={fn()}
      />
    </FileUpload>
  ),
};

const UploadDemo = () => {
  const [files, setFiles] = useState<{ name: string; size: string; progress: number }[]>([]);
  return (
    <FileUpload
      multiple
      hint="Any file, up to 10 MB"
      onFilesChange={(list) =>
        setFiles((prev) => [
          ...prev,
          ...list.map((f) => ({
            name: f.name,
            size: `${Math.ceil(f.size / 1024)} KB`,
            progress: 100,
          })),
        ])
      }
    >
      {files.map((f, i) => (
        <FileUploadItem
          key={`${f.name}-${i}`}
          {...f}
          onRemove={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
        />
      ))}
    </FileUpload>
  );
};

/** Pick files and they appear in the list. */
export const Interactive: Story = { render: () => <UploadDemo /> };

export const Disabled: Story = { args: { disabled: true } };

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { label: 'انقر للرفع أو اسحب الملفات وأفلتها', hint: 'PNG أو JPG' },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <FileUpload {...args} id={`upload-${brand}-${mode}`}>
              <FileUploadItem name={`${brand}-${mode}.pdf`} size="200 KB" progress={60} />
              <FileUploadItem name="done.pdf" size="1 MB" />
              <FileUploadItem name="failed.pdf" status="error" />
            </FileUpload>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** The zone is the file input's label. */
export const Labelled: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/Click to upload/)).toHaveAttribute('type', 'file');
  },
};
