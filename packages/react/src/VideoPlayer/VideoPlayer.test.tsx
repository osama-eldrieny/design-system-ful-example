import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VideoPlayer } from './VideoPlayer';

describe('VideoPlayer', () => {
  it('renders a native video with controls when given a source', () => {
    const { container } = render(<VideoPlayer label="Tour" src="/tour.mp4" poster="/tour.jpg" />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src', '/tour.mp4');
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('aria-label', 'Tour');
  });

  it('shows a placeholder with a play button without a source', () => {
    const onPlay = vi.fn();
    render(<VideoPlayer label="Tour" onPlay={onPlay} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Tour' }));
    expect(onPlay).toHaveBeenCalled();
  });
});
