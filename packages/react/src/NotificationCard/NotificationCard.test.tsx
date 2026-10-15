import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NotificationCard } from './NotificationCard';

describe('NotificationCard', () => {
  it('is an article named by its title', () => {
    render(<NotificationCard title="Lana replied" time="2 mins ago" />);
    expect(screen.getByRole('article', { name: 'Lana replied' })).toBeInTheDocument();
    expect(screen.getByText('2 mins ago').tagName).toBe('TIME');
  });

  it('calls onDismiss from the close button', () => {
    const onDismiss = vi.fn();
    render(<NotificationCard title="Done" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('marks unread notices', () => {
    const { container } = render(<NotificationCard title="New" unread />);
    expect(container.firstChild).toHaveClass('ds-notification-card--unread');
  });
});
