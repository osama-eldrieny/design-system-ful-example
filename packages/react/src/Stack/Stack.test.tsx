import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders the element given in as, with its classes', () => {
    render(
      <Stack as="ul" data-testid="layout">
        <li>One</li>
      </Stack>,
    );
    const el = screen.getByTestId('layout');
    expect(el.tagName).toBe('UL');
    expect(el).toHaveClass('ds-stack');
  });
});
