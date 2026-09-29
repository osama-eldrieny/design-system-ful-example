import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

describe('Popover', () => {
  it('shows its title, content and close button when open', () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Shipping</PopoverTrigger>
        <PopoverContent title="Shipping">Free delivery.</PopoverContent>
      </Popover>,
    );
    expect(screen.getByRole('dialog')).toHaveTextContent('Free delivery.');
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
