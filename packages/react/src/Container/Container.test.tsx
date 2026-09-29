import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renders the element given in as, with its classes', () => {
    render(
      <Container as="ul" data-testid="layout">
        <li>One</li>
      </Container>,
    );
    const el = screen.getByTestId('layout');
    expect(el.tagName).toBe('UL');
    expect(el).toHaveClass('ds-container');
  });
});
