import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Inline } from './Inline';

describe('Inline', () => {
  it('renders the element given in as, with its classes', () => {
    render(
      <Inline as="ul" data-testid="layout">
        <li>One</li>
      </Inline>,
    );
    const el = screen.getByTestId('layout');
    expect(el.tagName).toBe('UL');
    expect(el).toHaveClass('ds-inline');
  });
});
