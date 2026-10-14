import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FileUpload, FileUploadItem } from './FileUpload';

describe('FileUpload', () => {
  it('is a file input named by its label', async () => {
    const onFilesChange = vi.fn();
    render(<FileUpload onFilesChange={onFilesChange} hint="PNG up to 2 MB" />);
    const input = screen.getByLabelText(/Click to upload/);
    expect(input).toHaveAttribute('type', 'file');
    const file = new File(['x'], 'logo.png', { type: 'image/png' });
    await userEvent.upload(input, file);
    expect(onFilesChange).toHaveBeenCalledWith([file]);
  });

  it('accepts dropped files', () => {
    const onFilesChange = vi.fn();
    const { container } = render(<FileUpload onFilesChange={onFilesChange} />);
    const file = new File(['x'], 'a.pdf');
    fireEvent.drop(container.querySelector('.ds-file-upload__zone')!, {
      dataTransfer: { files: [file] },
    });
    expect(onFilesChange).toHaveBeenCalledWith([file]);
  });
});

describe('FileUploadItem', () => {
  it('shows progress while uploading and a named remove button', () => {
    render(
      <ul>
        <FileUploadItem name="report.pdf" size="200 KB" progress={40} onRemove={() => {}} />
      </ul>,
    );
    expect(screen.getByRole('progressbar', { name: 'Uploading report.pdf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove report.pdf' })).toBeInTheDocument();
  });

  it('shows complete and error states', () => {
    render(
      <ul>
        <FileUploadItem name="a.pdf" size="1 MB" />
        <FileUploadItem name="b.pdf" status="error" error="Too large" />
      </ul>,
    );
    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Too large')).toBeInTheDocument();
  });
});
