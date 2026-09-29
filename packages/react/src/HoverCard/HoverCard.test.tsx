import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

describe('HoverCard', () => {
  it('shows the preview when open', () => {
    render(
      <HoverCard defaultOpen>
        <HoverCardTrigger href="/u/sarah">@sarah</HoverCardTrigger>
        <HoverCardContent>Sarah Chen</HoverCardContent>
      </HoverCard>,
    );
    expect(screen.getByRole('link', { name: '@sarah' })).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });
});
