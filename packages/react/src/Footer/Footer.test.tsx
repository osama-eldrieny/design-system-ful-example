import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('is the contentinfo landmark with a named nav of links', () => {
    render(
      <Footer
        title="© 2026 TechHub"
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Cookie settings', onClick: () => {} },
        ]}
      />,
    );
    expect(screen.getByRole('contentinfo')).toHaveTextContent('© 2026 TechHub');
    expect(screen.getByRole('navigation', { name: 'Footer' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('button', { name: 'Cookie settings' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('renders no nav without links', () => {
    render(<Footer title="© 2026" />);
    expect(screen.queryByRole('navigation')).toBeNull();
  });
});
