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
