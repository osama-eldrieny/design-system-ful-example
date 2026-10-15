import { defineMeta } from '../meta';

export default defineMeta({
  id: 'message-thread',
  name: 'MessageThread',
  category: 'Data display',
  status: 'stable',
  since: '1.2.0',
  description:
    'A conversation shown as chat bubbles: other people’s messages at the start with their avatar and name, yours at the end in the accent color, with an optional typing indicator.',
  imports: [
    { name: 'MessageThread', from: '@ds/react' },
    { name: 'ThreadMessage', from: '@ds/react' },
  ],
  whenToUse: [
    'For direct messages, support chats and comment conversations.',
    'To show an AI assistant conversation.',
  ],
  whenNotToUse: [
    { text: 'For a timeline of events, not messages.', alternative: 'ActivityFeed' },
    { text: 'For a one-off notice.', alternative: 'Toast' },
  ],
  anatomy: [
    { name: 'Avatar', description: 'Who wrote the messages; once per group.', optional: true },
    { name: 'Author', description: 'The name above someone else’s group of messages.' },
    { name: 'Bubble', description: 'One message; the last in a group has a smaller corner pointing at the author.' },
    { name: 'Meta', description: 'Time and delivery status under a message.', optional: true },
    { name: 'Typing indicator', description: 'Three pulsing dots while someone writes.', optional: true },
  ],
  options: [
    {
      prop: 'density',
      title: 'Density',
      values: [
        { value: 'comfortable', meaning: 'Default. Avatars beside other people’s messages.' },
        { value: 'compact', meaning: 'No avatars, wider bubbles, for narrow side panels.' },
      ],
    },
  ],
  states: [
    { name: 'Incoming', meaning: 'Someone else’s message.', trigger: 'own is false.' },
    { name: 'Outgoing', meaning: 'Your message.', trigger: 'own is true.' },
    { name: 'Typing', meaning: 'Someone is writing a reply.', trigger: 'typing prop.' },
  ],
  behavior: [
    { topic: 'Grouping', text: 'Consecutive messages from the same person share one avatar and name.' },
    { topic: 'Live updates', text: 'The thread is a log region, so screen readers announce new messages politely.' },
    { topic: 'Long words', text: 'Long links and words wrap inside the bubble.' },
    { topic: 'Right-to-left', text: 'Incoming messages sit on the right and outgoing on the left in Arabic.' },
  ],
  content: [
    'Show times in the reader’s own format, e.g. "9:41" or "Yesterday".',
    'Show delivery status only under your last message.',
    'Name the thread after the other people, e.g. "Conversation with Lana".',
  ],
  guidelines: [
    {
      do: 'Put the reply box directly under the thread.',
      dont: 'Separate the composer from the conversation.',
      why: 'People read the last message and answer right below it.',
    },
    {
      do: 'Give status only to the latest own message.',
      dont: 'Show "Read" under every message.',
      why: 'Repeating it adds noise without new information.',
    },
    {
      do: 'Use compact density in narrow panels.',
      dont: 'Squeeze avatars into a 280px drawer.',
      why: 'Bubbles need the width more than the avatars.',
    },
  ],
  accessibility: {
    role: 'log, named by label; the typing indicator is a status.',
    keyboard: [{ keys: 'Tab', action: 'Moves through links and buttons inside messages.' }],
    aria: [
      { attribute: 'role="log"', when: 'Always; new messages are announced politely.' },
      { attribute: 'aria-label', when: 'From label, e.g. "Conversation with Lana".' },
    ],
    focus: 'The thread itself takes no focus; interactive content inside messages does.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Authors are named in text, not shown only by side or color.' },
      { criterion: '1.4.3 Contrast', how: 'Bubble text meets AA on both bubble colors in every theme.' },
      { criterion: '4.1.3 Status Messages', how: 'New messages and typing are announced without moving focus.' },
    ],
    notes: ['Avatars are decorative because the author name is in the text.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Direct message',
      description: 'Two people with times and a read status.',
      code: `import { MessageThread } from '@ds/react';

<MessageThread
  label="Conversation with Lana"
  messages={[
    { id: '1', author: { name: 'Lana Steiner' }, content: 'Is the report ready?', time: '9:40' },
    { id: '2', author: { name: 'You' }, own: true, content: 'Sending it now.', time: '9:41', status: 'Read' },
  ]}
/>`,
    },
    {
      id: 'typing',
      title: 'Typing',
      description: 'Shows that the other person is writing.',
      code: `import { MessageThread } from '@ds/react';

<MessageThread label="Support chat" messages={messages} typing={{ name: 'Support' }} />`,
    },
    {
      id: 'compact',
      title: 'In a side panel',
      description: 'Compact density without avatars.',
      code: `import { MessageThread } from '@ds/react';

<MessageThread label="Comments" messages={messages} density="compact" />`,
    },
  ],
  tokenPrefixes: ['--message-thread-'],
  related: [
    { id: 'activity-feed', relation: 'Use for event timelines.' },
    { id: 'avatar', relation: 'Shows who wrote each group.' },
  ],
  changelog: [{ version: '1.2.0', date: '2026-10-15', changes: ['New component.'] }],
});
