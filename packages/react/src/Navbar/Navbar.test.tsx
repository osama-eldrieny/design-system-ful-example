import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('is a named navigation landmark with a list of links', () => {
    render(
      <Navbar
        aria-label="Primary"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Pricing', href: '/pricing' },
        ]}
        currentItem="Home"
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Pricing' })).not.toHaveAttribute('aria-current');
  });

  it('renders items without href as buttons and calls onClick', async () => {
    const onClick = vi.fn();
    render(<Navbar items={[{ label: 'Overview', onClick }]} />);
    await userEvent.click(screen.getByRole('button', { name: 'Overview' }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('keeps the controlled current item', async () => {
    const onCurrentItemChange = vi.fn();
    render(
      <Navbar
        items={[
          { id: 'a', label: 'A', onClick: () => {} },
          { id: 'b', label: 'B', onClick: () => {} },
        ]}
        currentItem="a"
        onCurrentItemChange={onCurrentItemChange}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onCurrentItemChange).toHaveBeenCalledWith('b');
    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-current', 'page');
  });
});
