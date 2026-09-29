import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('links every level but the current page', () => {
    render(<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Audio' }]} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByText('Audio')).toHaveAttribute('aria-current', 'page');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('collapses the middle levels', () => {
    const items = ['A', 'B', 'C', 'D', 'E'].map((label) => ({ label, href: `#${label}` }));
    render(<Breadcrumb items={items} maxItems={3} />);
    expect(screen.getByRole('button', { name: 'Show all pages' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'C' })).toBeNull();
  });
});
