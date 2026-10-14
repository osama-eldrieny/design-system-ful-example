import { render, screen } from '@testing-library/react';
import { Upload } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { ActivityFeed } from './ActivityFeed';

describe('ActivityFeed', () => {
  it('is an ordered list of events with time and content', () => {
    render(
      <ActivityFeed
        items={[
          {
            id: 1,
            avatar: { name: 'Olivia Rhye' },
            title: (
              <>
                <strong>Olivia Rhye</strong> commented
              </>
            ),
            time: '2 min ago',
            content: 'Looks great!',
          },
          { id: 2, icon: <Upload />, title: 'Report exported' },
        ]}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
    expect(screen.getByText('Looks great!')).toBeInTheDocument();
  });

  it('announces unread items', () => {
    render(<ActivityFeed items={[{ id: 1, title: 'New order', unread: true }]} />);
    expect(screen.getByRole('listitem')).toHaveTextContent('Unread: New order');
  });
});
