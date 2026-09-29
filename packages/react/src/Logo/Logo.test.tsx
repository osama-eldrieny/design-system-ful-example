import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('shows the name as text with a decorative mark', () => {
    const { container } = render(<Logo name="TechHub" />);
    expect(screen.getByText('TechHub')).toBeInTheDocument();
    expect(container.querySelector('.ds-logo__icon')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('is a link named by the product with href', () => {
    render(<Logo name="TechHub" href="/" />);
    expect(screen.getByRole('link', { name: 'TechHub' })).toHaveAttribute('href', '/');
  });

  it('keeps the name for screen readers when hidden', () => {
    render(<Logo name="TechHub" hideName />);
    expect(screen.getByRole('img', { name: 'TechHub' })).toBeInTheDocument();
    expect(screen.queryByText('TechHub')).toBeNull();
  });
});
