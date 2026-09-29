import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('has a heading, description and actions', () => {
    render(
      <EmptyState
        title="No orders"
        titleAs="h3"
        description="None yet."
        actions={<button type="button">Create</button>}
      />,
    );
    expect(screen.getByRole('heading', { level: 3, name: 'No orders' })).toBeInTheDocument();
    expect(screen.getByText('None yet.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });
});
