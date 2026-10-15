import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IntegrationCard } from './IntegrationCard';

describe('IntegrationCard', () => {
  it('names the app and shows its connection state', () => {
    render(<IntegrationCard name="Slack" description="Post updates." icon={<span />} connected={false} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Slack' })).toBeInTheDocument();
    expect(screen.getByText('Not connected')).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Connect Slack' })).not.toBeChecked();
  });

  it('calls onConnectedChange from the switch', () => {
    const onConnectedChange = vi.fn();
    render(<IntegrationCard name="Slack" description="Post." icon={<span />} connected={false} onConnectedChange={onConnectedChange} />);
    fireEvent.click(screen.getByRole('switch', { name: 'Connect Slack' }));
    expect(onConnectedChange).toHaveBeenCalledWith(true);
  });
});
