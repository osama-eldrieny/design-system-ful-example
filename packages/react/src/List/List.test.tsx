import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { List, ListItem } from './List';

describe('List', () => {
  it('renders link, button and static rows', async () => {
    const onClick = vi.fn();
    render(
      <List ordered>
        <ListItem title="A" href="#a" />
        <ListItem title="B" onClick={onClick} />
        <ListItem title="C" meta="Today" />
      </List>,
    );
    expect(screen.getByRole('list').tagName).toBe('OL');
    expect(screen.getByRole('link', { name: 'A' })).toHaveAttribute('href', '#a');
    await userEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByText('Today')).toBeInTheDocument();
  });
});
