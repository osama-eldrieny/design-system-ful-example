import { defineMeta } from '../meta';

export default defineMeta({
  id: 'meeting-card',
  name: 'MeetingCard',
  category: 'Patterns',
  status: 'stable',
  since: '0.2.0',
  description:
    'A meeting card shows one event in an agenda or schedule: its name, time and attendees, with a color edge for its status. It is built from Avatar and AvatarGroup.',
  imports: [{ name: 'MeetingCard', from: '@ds/react' }],
  whenToUse: [
    'In agendas, schedules and sidebars listing upcoming meetings or events.',
    'For short status items with people attached, e.g. who is on call for a service.',
  ],
  whenNotToUse: [
    { text: 'For a full calendar view.', alternative: 'A calendar layout' },
    { text: 'For a message that needs action.', alternative: 'Alert' },
    { text: 'For general content.', alternative: 'Card' },
  ],
  anatomy: [
    {
      name: 'Accent edge',
      description: 'Status color on the inline start (left in LTR, right in RTL).',
    },
    { name: 'Title', description: 'Meeting name, a heading.' },
    { name: 'Time', description: 'When it happens; a <time> element when dateTime is set.' },
    { name: 'Attendees', description: 'AvatarGroup with a “+N” count.', optional: true },
  ],
  options: [
    {
      prop: 'variant',
      title: 'Variant',
      values: [
        { value: 'primary', meaning: 'A regular meeting. Default.' },
        { value: 'success', meaning: 'Confirmed, done or healthy.' },
        { value: 'warning', meaning: 'Needs attention, e.g. starts soon or has a conflict risk.' },
        { value: 'danger', meaning: 'Cancelled, clashing or failing.' },
      ],
    },
  ],
  states: [
    {
      name: 'Default',
      meaning: 'Meeting cards are static; put links or buttons inside for actions.',
      trigger: '—',
    },
  ],
  behavior: [
    {
      topic: 'Attendees',
      text: 'Up to maxAttendees (default 4) avatars show, then “+N”. Screen readers hear the group label and each name.',
    },
    {
      topic: 'Time',
      text: 'Pass dateTime (ISO) to render a <time> element that software can read.',
    },
    { topic: 'Right-to-left', text: 'The accent edge moves to the right side.' },
  ],
  content: [
    'Title: the meeting’s name, not its type (“Q3 planning”, not “Meeting”).',
    'Time: the range in the reader’s time format; add the day if it isn’t today.',
    'If the variant matters, say it in words too, e.g. “Cancelled”.',
  ],
  guidelines: [
    {
      do: 'Say the status in the title or time, e.g. “Cancelled: Budget review”.',
      dont: 'Rely on the red edge alone to mean cancelled.',
      why: 'Color alone isn’t seen by everyone (WCAG 1.4.1).',
    },
    {
      do: 'Give every attendee a real name.',
      dont: 'Pass only photo URLs.',
      why: 'Names become initials when photos fail and are what screen readers announce.',
    },
    {
      do: 'Pick the heading level that fits the page (titleAs).',
      dont: 'Leave h3 under an h1 with no h2.',
      why: 'A logical outline helps people navigate by headings.',
    },
  ],
  accessibility: {
    role: 'article with a heading.',
    keyboard: [{ keys: '—', action: 'Not focusable itself; any links or buttons inside are.' }],
    aria: [
      {
        attribute: 'role="group" + aria-label on attendees',
        when: 'Set by AvatarGroup from attendeesLabel.',
      },
    ],
    focus: 'None.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'Heading, <time> and a labelled attendee group.',
      },
      {
        criterion: '1.4.1 Use of Color',
        how: 'Status must also be written; the guidelines require it.',
      },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Title and time pass 4.5:1 on every variant background in every theme.',
      },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Meeting',
      description: 'A meeting with attendees.',
      code: `import { MeetingCard } from '@ds/react';

<MeetingCard
  title="Q3 planning"
  time="10:00 – 11:00"
  dateTime="2026-09-29T10:00"
  attendees={[
    { name: 'Sarah Chen', src: '/avatars/sarah.png' },
    { name: 'James Wilson' },
  ]}
/>`,
    },
    {
      id: 'cancelled',
      title: 'Cancelled',
      description: 'The danger variant, with the status in words.',
      code: `import { MeetingCard } from '@ds/react';

<MeetingCard variant="danger" title="Cancelled: Budget review" time="16:00 – 17:30" />`,
    },
    {
      id: 'agenda',
      title: 'Agenda list',
      description: 'A list of meetings under a heading.',
      code: `import { MeetingCard } from '@ds/react';

<h2>Today</h2>
<ul role="list" style={{ display: 'grid', gap: 12, padding: 0, listStyle: 'none' }}>
  {meetings.map((m) => (
    <li key={m.id}>
      <MeetingCard title={m.title} time={m.time} variant={m.variant} attendees={m.people} />
    </li>
  ))}
</ul>`,
    },
  ],
  tokenPrefixes: ['--meeting-card-'],
  related: [
    { id: 'avatar', relation: 'AvatarGroup shows the attendees.' },
    { id: 'card', relation: 'For general content cards.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'attendees ({ name, src }) replaces avatars (URLs), rendered with AvatarGroup.',
        'New warning variant; accent edge uses logical properties (flips in RTL).',
        'Tokens renamed to the grammar: -title-color → -title-text-color, -time-color → -time-text-color; the direction border helpers were removed.',
      ],
    },
  ],
});
