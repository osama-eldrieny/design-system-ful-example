import { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Divider,
  FeaturedIcon,
  IconButton,
  InputField,
  Textarea,
} from '@ds/react';
import { FileText, Paperclip, Phone, Search, Send, SquarePen } from 'lucide-react';
import { conversations, thread } from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import './messages.css';

type Message = {
  id: number;
  from: string;
  text?: string;
  file?: { name: string; size: string };
  time: string;
  divider?: string;
};

/** Messages: an inbox beside the open conversation, with a composer. */
export default function MessagesPage() {
  const [openId, setOpenId] = useState(conversations[0].id);
  const [messages, setMessages] = useState<Message[]>(thread);
  const [draft, setDraft] = useState('');
  const open = conversations.find((c) => c.id === openId)!;

  const send = () => {
    if (!draft.trim()) return;
    setMessages((list) => [
      ...list,
      { id: list.length + 1, from: 'me', text: draft.trim(), time: 'Just now' },
    ]);
    setDraft('');
  };

  return (
    <AppShell current="messages">
      <div className="messages">
        <section className="messages__inbox" aria-labelledby="inbox-title">
          <div className="row row--between">
            <h1 className="messages__title" id="inbox-title">
              Messages{' '}
              <Badge tone="gray" shape="modern" size="small">
                40
              </Badge>
            </h1>
            <IconButton
              icon={<SquarePen />}
              label="New message"
              variant="secondary"
              appearance="outline"
              size="small"
            />
          </div>
          <InputField
            label="Search messages"
            hideLabel
            size="small"
            iconStart={<Search />}
            placeholder="Search"
          />
          <ul className="messages__list">
            {conversations.map((c) => (
              <li key={c.id}>
                <Button
                  appearance="text"
                  variant="secondary"
                  fullWidth
                  className={['messages__item', c.id === openId && 'messages__item--open']
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={c.id === openId ? 'true' : undefined}
                  onClick={() => setOpenId(c.id)}
                >
                  <Avatar
                    name={c.name}
                    src={c.src}
                    size="medium"
                    status={c.online ? 'online' : 'offline'}
                    decorative
                  />
                  <span className="messages__item-text">
                    <span className="row row--between">
                      <strong>{c.name}</strong>
                      <span className="text-sm muted">{c.time}</span>
                    </span>
                    <span className="text-sm muted messages__preview">{c.preview}</span>
                  </span>
                  {c.unread && <Badge dot tone="primary" label="Unread" />}
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section className="messages__chat" aria-label={`Conversation with ${open.name}`}>
          <header className="messages__head">
            <Avatar
              name={open.name}
              src={open.src}
              size="large"
              verified
              status={open.online ? 'online' : undefined}
              decorative
            />
            <span className="stack-text">
              <span className="row">
                <strong className="messages__name">{open.name}</strong>
                <Badge tone="success" shape="modern" size="small" withDot>
                  {open.online ? 'Online' : 'Away'}
                </Badge>
              </span>
              <span className="text-sm muted">{open.handle}</span>
            </span>
            <span className="row messages__head-actions">
              <Button variant="secondary" appearance="outline" size="small" iconStart={<Phone />}>
                Call
              </Button>
              <Button size="small" href="#/app/profile">
                View profile
              </Button>
            </span>
          </header>

          <ol className="messages__thread" aria-label="Messages">
            {messages.map((m) => (
              <li key={m.id} className={`messages__msg messages__msg--${m.from}`}>
                {m.divider && <Divider label={m.divider} className="messages__divider" />}
                <span className="text-sm muted messages__meta">
                  {m.from === 'me' ? 'You' : open.name} · {m.time}
                </span>
                {m.text && <p className="messages__bubble">{m.text}</p>}
                {m.file && (
                  <span className="messages__bubble messages__file">
                    <FeaturedIcon icon={<FileText />} size="small" tone="danger" shape="square" />
                    <span className="stack-text">
                      <strong className="text-sm">{m.file.name}</strong>
                      <span className="text-sm muted">{m.file.size}</span>
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ol>

          <form
            className="messages__composer"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <Textarea
              label="Message"
              hideLabel
              placeholder="Message"
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="row row--between">
              <IconButton
                icon={<Paperclip />}
                label="Attach a file"
                variant="secondary"
                appearance="ghost"
                size="small"
              />
              <Button type="submit" size="small" iconEnd={<Send />}>
                Send
              </Button>
            </div>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
