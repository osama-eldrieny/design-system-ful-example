import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders the name, job title and the heading at the chosen level', () => {
    render(
      <Header name="Sarah Chen" jobTitle="Head of Products" heading="Portfolio" headingAs="h2" />,
    );
    expect(screen.getByRole('banner')).toHaveTextContent('Sarah Chen');
    expect(screen.getByText('Head of Products')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Portfolio' })).toBeInTheDocument();
  });

  it('defaults to h1 and omits missing parts', () => {
    render(<Header name="Sarah Chen" heading="About" />);
    expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument();
    expect(screen.queryByText('Head of Products')).toBeNull();
  });
});
