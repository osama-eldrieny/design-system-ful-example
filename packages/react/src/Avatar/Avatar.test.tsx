import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar', () => {
  it('is an image named after the person, with status', () => {
    render(<Avatar name="Sarah Chen" status="online" />);
    expect(screen.getByRole('img', { name: 'Sarah Chen, Online' })).toBeInTheDocument();
  });

  it('shows initials without a photo and after the photo fails', () => {
    const { container, rerender } = render(<Avatar name="Sarah Chen" />);
    expect(container).toHaveTextContent('SC');
    rerender(<Avatar name="Sarah Chen" src="broken.png" />);
    fireEvent.error(container.querySelector('img')!);
    expect(container).toHaveTextContent('SC');
    expect(container.querySelector('img')).toBeNull();
  });

  it('can be hidden from assistive technology', () => {
    const { container } = render(<Avatar name="Sarah Chen" decorative />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('AvatarGroup', () => {
  it('limits avatars and announces the rest', () => {
    render(
      <AvatarGroup label="Attendees" max={2}>
        <Avatar name="Ann Lee" />
        <Avatar name="Bo Kim" />
        <Avatar name="Cy Do" />
        <Avatar name="Di Ng" />
      </AvatarGroup>,
    );
    expect(screen.getByRole('group', { name: 'Attendees' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Ann Lee' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Cy Do' })).toBeNull();
    expect(screen.getByRole('img', { name: 'and 2 more' })).toHaveTextContent('+2');
  });
});
