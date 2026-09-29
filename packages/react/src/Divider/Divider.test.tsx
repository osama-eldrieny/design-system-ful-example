import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('is a separator, vertical when asked', () => {
    const { rerender } = render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
    rerender(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders a label', () => {
    render(<Divider label="or" />);
    expect(screen.getByText('or')).toBeInTheDocument();
  });
});
