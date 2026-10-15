import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MessageThread } from './MessageThread';

const a = { name: 'Ada' };
const me = { name: 'Me' };

describe('MessageThread', () => {
  it('is a named log', () => {
    render(<MessageThread label="Chat" messages={[]} />);
    expect(screen.getByRole('log', { name: 'Chat' })).toBeInTheDocument();
  });

  it('groups consecutive messages by author', () => {
    const { container } = render(
      <MessageThread
        label="Chat"
        messages={[
          { id: '1', author: a, content: 'One' },
          { id: '2', author: a, content: 'Two' },
          { id: '3', author: me, own: true, content: 'Three', status: 'Read' },
        ]}
      />,
    );
    expect(container.querySelectorAll('.ds-message-thread__group')).toHaveLength(2);
    expect(screen.getAllByText('Ada')).toHaveLength(1);
    expect(container.querySelector('.ds-message-thread__group--own')).toHaveTextContent('Three');
    expect(screen.getByText('Read')).toBeInTheDocument();
  });

  it('compact density hides avatars', () => {
    const { container } = render(
      <MessageThread label="Chat" density="compact" messages={[{ id: '1', author: a, content: 'Hi' }]} />,
    );
    expect(container.querySelector('.ds-message-thread__avatar')).toBeNull();
  });

  it('shows a typing status', () => {
    render(<MessageThread label="Chat" messages={[]} typing={a} />);
    expect(screen.getByRole('status', { name: 'Ada is typing' })).toBeInTheDocument();
  });
});
