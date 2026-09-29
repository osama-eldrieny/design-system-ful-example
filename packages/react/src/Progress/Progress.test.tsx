import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('is a labelled progressbar with a clamped value', () => {
    render(<Progress label="Upload" value={150} showValue />);
    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar).toHaveAttribute('aria-valuenow', '100');
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('is indeterminate without a value', () => {
    render(<Progress label="Preparing" />);
    expect(screen.getByRole('progressbar', { name: 'Preparing' })).not.toHaveAttribute(
      'aria-valuenow',
    );
  });

  it('keeps a hidden label', () => {
    render(
      <Progress label="Storage" hideLabel value={3} max={10} formatValue={(v, m) => `${v}/${m}`} />,
    );
    expect(screen.getByRole('progressbar', { name: 'Storage' })).toHaveAttribute(
      'aria-valuetext',
      '3/10',
    );
  });
});
