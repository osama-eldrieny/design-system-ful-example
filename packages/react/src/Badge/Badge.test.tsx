import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('shows text in its tone', () => {
    render(<Badge tone="danger">Overdue</Badge>);
    expect(screen.getByText('Overdue').parentElement).toHaveClass('ds-badge--danger-subtle');
  });

  it('caps counts and replaces them with the label for screen readers', () => {
    render(<Badge count={120} max={99} label="120 unread" />);
    expect(screen.getByText('99+')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('120 unread')).toBeInTheDocument();
  });

  it('renders a labelled dot', () => {
    const { container } = render(<Badge dot label="Online" />);
    expect(container.firstChild).toHaveClass('ds-badge--dot');
    expect(screen.getByText('Online')).toBeInTheDocument();
  });
});
