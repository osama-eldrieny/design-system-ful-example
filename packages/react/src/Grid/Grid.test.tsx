import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders the element given in as, with its classes', () => {
    render(
      <Grid as="ul" data-testid="layout">
        <li>One</li>
      </Grid>,
    );
    const el = screen.getByTestId('layout');
    expect(el.tagName).toBe('UL');
    expect(el).toHaveClass('ds-grid');
  });
});

describe('Grid stretch', () => {
  it('adds the stretch class and keeps it off the DOM', () => {
    render(<Grid stretch data-testid="g" />);
    const el = screen.getByTestId('g');
    expect(el).toHaveClass('ds-grid--stretch');
    expect(el).not.toHaveAttribute('stretch');
  });
});
