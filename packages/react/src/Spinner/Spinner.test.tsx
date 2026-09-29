import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('is a status with its label', () => {
    render(<Spinner label="Loading orders" />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading orders');
  });

  it('defaults the label to Loading', () => {
    render(<Spinner size="small" />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
  });
});
