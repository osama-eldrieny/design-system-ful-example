import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Code } from './Code';

describe('Code', () => {
  it('renders inline code', () => {
    render(<Code>npm install</Code>);
    expect(screen.getByText('npm install').tagName).toBe('CODE');
  });

  it('copies a block and announces it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(
      <Code block language="bash">
        npm run build
      </Code>,
    );
    expect(screen.getByRole('group', { name: 'bash code' })).toBeInTheDocument();
    await act(() => userEvent.click(screen.getByRole('button', { name: 'Copy code' })));
    expect(writeText).toHaveBeenCalledWith('npm run build');
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
  });
});
