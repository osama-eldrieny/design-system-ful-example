import { render, screen } from '@testing-library/react';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { describe, expect, it } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('is a native link', () => {
    render(<Link href="/returns">return policy</Link>);
    expect(screen.getByRole('link', { name: 'return policy' })).toHaveAttribute('href', '/returns');
  });

  it('marks external links and opens them safely in a new tab', () => {
    render(
      <Link href="https://example.com" external>
        Example
      </Link>,
    );
    const link = screen.getByRole('link', { name: /Example.*opens in a new tab/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a router link through `as`', () => {
    const RouterLink = forwardRef<
      HTMLAnchorElement,
      AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
    >(({ to, children, ...props }, ref) => (
      <a ref={ref} href={to} data-router="" {...props}>
        {children}
      </a>
    ));
    render(
      <Link as={RouterLink} {...({ to: '/settings' } as object)}>
        Settings
      </Link>,
    );
    const link = screen.getByRole('link', { name: 'Settings' });
    expect(link).toHaveAttribute('href', '/settings');
    expect(link).toHaveAttribute('data-router');
    expect(link).toHaveClass('ds-link');
  });
});
