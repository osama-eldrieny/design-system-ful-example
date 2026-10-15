import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Avatar } from '../Avatar';
import './MessageThread.css';

export interface ThreadAuthor {
  name: string;
  /** Photo URL; initials show without it. */
  avatar?: string;
}

export interface ThreadMessage {
  id: string;
  author: ThreadAuthor;
  /** Message text or rich content. */
  content: ReactNode;
  /** When it was sent, as shown, e.g. "9:41". */
  time?: string;
  /** Sent by the person viewing the thread: shown at the end, in the accent color. */
  own?: boolean;
  /** Delivery status under your own last message, e.g. "Read". */
  status?: string;
}

export type MessageThreadDensity = 'comfortable' | 'compact';

export interface MessageThreadProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the conversation, e.g. "Conversation with Lana". */
  label: string;
  messages: ThreadMessage[];
  /** Shows a "… is typing" bubble for this person. */
  typing?: ThreadAuthor;
  /** Words for the typing bubble. Default "{name} is typing". */
  typingLabel?: (name: string) => string;
  /** `comfortable` (default) shows avatars and names; `compact` hides avatars for narrow panels. */
  density?: MessageThreadDensity;
}

/**
 * A conversation as chat bubbles: other people's messages at the start, yours at the end.
 * Consecutive messages from the same person are grouped under one name and avatar.
 */
export const MessageThread = forwardRef<HTMLDivElement, MessageThreadProps>(
  (
    {
      label,
      messages,
      typing,
      typingLabel = (name) => `${name} is typing`,
      density = 'comfortable',
      className,
      ...props
    },
    ref,
  ) => {
    // Group runs of messages by the same author.
    const groups: ThreadMessage[][] = [];
    for (const m of messages) {
      const last = groups[groups.length - 1];
      if (last && last[0].author.name === m.author.name && !!last[0].own === !!m.own) last.push(m);
      else groups.push([m]);
    }
    const avatars = density === 'comfortable';

    return (
      <div
        ref={ref}
        role="log"
        aria-label={label}
        className={['ds-message-thread', `ds-message-thread--${density}`, className].filter(Boolean).join(' ')}
        {...props}
      >
        {groups.map((group) => {
          const first = group[0];
          const own = !!first.own;
          return (
            <div
              key={first.id}
              className={['ds-message-thread__group', own && 'ds-message-thread__group--own'].filter(Boolean).join(' ')}
            >
              {avatars && !own && (
                <Avatar className="ds-message-thread__avatar" name={first.author.name} src={first.author.avatar} size="small" decorative />
              )}
              <div className="ds-message-thread__messages">
                {!own && <div className="ds-message-thread__author">{first.author.name}</div>}
                {group.map((m) => (
                  <div key={m.id} className="ds-message-thread__message">
                    <div className="ds-message-thread__bubble">{m.content}</div>
                    {(m.time || m.status) && (
                      <div className="ds-message-thread__meta">
                        {m.time && <time>{m.time}</time>}
                        {m.time && m.status && ' · '}
                        {m.status}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {typing && (
          <div className="ds-message-thread__group">
            {avatars && (
              <Avatar className="ds-message-thread__avatar" name={typing.name} src={typing.avatar} size="small" decorative />
            )}
            <div className="ds-message-thread__messages">
              <div className="ds-message-thread__bubble ds-message-thread__typing" role="status" aria-label={typingLabel(typing.name)}>
                <span className="ds-message-thread__dot" />
                <span className="ds-message-thread__dot" />
                <span className="ds-message-thread__dot" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);
MessageThread.displayName = 'MessageThread';
