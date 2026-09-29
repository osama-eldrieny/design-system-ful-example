import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SideNav } from './SideNav';

describe('SideNav', () => {
  it('marks the current page and opens its group', () => {
    render(
      <SideNav
        currentItem="b"
        sections={[
          {
            title: 'Main',
            items: [
              { id: 'a', label: 'A', href: '#a' },
              { label: 'Group', items: [{ id: 'b', label: 'B', href: '#b' }] },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Side' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Group' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'B' })).toHaveAttribute('aria-current', 'page');
  });
});
