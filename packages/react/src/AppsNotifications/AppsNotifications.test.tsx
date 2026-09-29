import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AppsNotifications } from './AppsNotifications';

describe('AppsNotifications', () => {
  it('is a region named by its heading, with one named switch per app', () => {
    const { container } = render(
      <AppsNotifications
        title="Email"
        items={[
          { id: 'a', name: 'Slack', icon: '/slack.png' },
          { id: 'b', name: 'GitHub', defaultEnabled: false },
        ]}
      />,
    );
    expect(screen.getByRole('region', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Slack' })).toBeChecked();
    expect(screen.getByRole('switch', { name: 'GitHub' })).not.toBeChecked();
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('reports changes with the app id', async () => {
    const onEnabledChange = vi.fn();
    render(
      <AppsNotifications
        items={[{ id: 'slack', name: 'Slack' }]}
        onEnabledChange={onEnabledChange}
      />,
    );
    await userEvent.click(screen.getByRole('switch', { name: 'Slack' }));
    expect(onEnabledChange).toHaveBeenCalledWith('slack', false);
  });

  it('follows enabled when controlled', async () => {
    render(<AppsNotifications items={[{ id: 'slack', name: 'Slack', enabled: false }]} />);
    const toggle = screen.getByRole('switch', { name: 'Slack' });
    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });
});
