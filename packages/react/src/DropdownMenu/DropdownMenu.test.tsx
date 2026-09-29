import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropdownMenu';

const Menu = ({ onSelect = vi.fn() }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>Options</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onSelect={onSelect}>Duplicate</DropdownMenuItem>
      <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

describe('DropdownMenu', () => {
  it('opens a menu from its trigger and runs the chosen item', async () => {
    const onSelect = vi.fn();
    render(<Menu onSelect={onSelect} />);
    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await userEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('menuitem', { name: 'Duplicate' }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('keeps the theme of the ThemeProvider it opened from', async () => {
    render(
      <ThemeProvider theme={{ brand: 'amber', mode: 'dark' }}>
        <Menu />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Options' }));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveAttribute('data-brand', 'amber');
    expect(menu).toHaveAttribute('data-mode', 'dark');
  });
});
