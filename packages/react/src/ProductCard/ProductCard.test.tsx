import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('names the product and announces rating and old price in words', () => {
    render(
      <ProductCard
        title="Wireless headphones"
        price="$299"
        oldPrice="$399"
        rating={4.5}
        reviews="2,342 reviews"
      />,
    );
    expect(screen.getByRole('heading', { name: 'Wireless headphones' })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Rated 4.5 out of 5, 2,342 reviews' }),
    ).toBeInTheDocument();
    expect(screen.getByText('$399').closest('del')).toHaveTextContent('Was $399');
  });

  it('is one link when given href', () => {
    render(<ProductCard title="Smart watch" price="$199" href="/p/watch" />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Smart watch' })).toHaveAttribute('href', '/p/watch');
  });

  it('supports translated labels', () => {
    render(
      <ProductCard
        title="سماعات"
        price="299 $"
        oldPrice="399 $"
        rating={4}
        labels={{ rating: (r) => `التقييم ${r} من 5`, was: 'كان' }}
      />,
    );
    expect(screen.getByRole('img', { name: 'التقييم 4 من 5' })).toBeInTheDocument();
    expect(screen.getByText('399 $').closest('del')).toHaveTextContent('كان 399 $');
  });
});
