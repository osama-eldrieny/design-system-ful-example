import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plus } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { Badge, BadgeGroup } from './Badge';

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

  it('takes category hues, shapes and sizes', () => {
    const { container } = render(
      <Badge tone="teal" shape="modern" size="large" withDot>
        Design
      </Badge>,
    );
    expect(container.firstChild).toHaveClass(
      'ds-badge--teal-subtle',
      'ds-badge--modern',
      'ds-badge--large',
    );
    expect(container.querySelector('.ds-badge__status')).toHaveAttribute('aria-hidden', 'true');
  });

  it('is icon-only when it has an icon and no text, named by its label', () => {
    const { container } = render(<Badge iconStart={<Plus />} label="Add" />);
    expect(container.firstChild).toHaveClass('ds-badge--icon-only');
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('has a named remove button', async () => {
    const onDismiss = vi.fn();
    render(<Badge onDismiss={onDismiss}>Design</Badge>);
    await userEvent.click(screen.getByRole('button', { name: 'Remove Design' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});

describe('BadgeGroup', () => {
  it('is a link with href, and plain text without', () => {
    const { rerender } = render(
      <BadgeGroup badge="New" href="/news">
        Feature shipped
      </BadgeGroup>,
    );
    expect(screen.getByRole('link')).toHaveTextContent('NewFeature shipped');
    rerender(<BadgeGroup badge="New">Feature shipped</BadgeGroup>);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
