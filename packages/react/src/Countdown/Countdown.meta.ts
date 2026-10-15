import { defineMeta } from '../meta';

export default defineMeta({
  id: 'countdown',
  name: 'Countdown',
  category: 'Data display',
  status: 'stable',
  since: '1.3.0',
  description:
    'A live countdown to a moment, shown as days, hours, minutes and seconds. It ticks every second and shows a finished message when the time has passed.',
  imports: [
    { name: 'Countdown', from: '@ds/react' },
    { name: 'CountdownSize', from: '@ds/react' },
  ],
  whenToUse: [
    'To count down to a launch, a deadline or the end of a sale.',
    'On a page where the date is the main message.',
  ],
  whenNotToUse: [
    { text: 'To show how long something took.', alternative: 'Stat' },
    { text: 'For a short timeout in a form.', alternative: 'Spinner' },
  ],
  anatomy: [
    { name: 'Units', description: 'Days, hours, minutes and seconds, each a number over its name.' },
    { name: 'Ended message', description: 'Shown instead of the units once the time has passed.', optional: true },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Inside a card or a banner.' },
        { value: 'medium', meaning: 'Default.' },
        { value: 'large', meaning: 'The main message of a launch page.' },
      ],
    },
  ],
  states: [
    { name: 'Counting', meaning: 'Time remains; the units tick.', trigger: 'to is in the future.' },
    { name: 'Ended', meaning: 'The time has passed; the ended message shows.', trigger: 'to is in the past.' },
  ],
  behavior: [
    { topic: 'Ticking', text: 'The countdown updates every second using the live clock, unless a fixed now is given.' },
    { topic: 'Announcements', text: 'The countdown is read as one sentence, not every second, so screen readers are not flooded.' },
    { topic: 'Right-to-left', text: 'Units are laid out from the start in Arabic; numbers stay in Western digits unless you set them.' },
  ],
  content: [
    'Name what is counted, e.g. "Launch in".',
    'Give the units in the language of the page through the units prop.',
  ],
  guidelines: [
    {
      do: 'Show the date as well as the countdown.',
      dont: 'Show only a countdown with no date.',
      why: 'The date lets people plan and confirms what the countdown means.',
    },
    {
      do: 'Replace the countdown with a clear message when it ends.',
      dont: 'Leave a counter stuck at zero.',
      why: 'A finished message tells people the moment has passed.',
    },
    {
      do: 'Use one countdown per page.',
      dont: 'Stack several countdowns to different dates.',
      why: 'Several moving numbers compete for attention.',
    },
  ],
  accessibility: {
    role: 'section named with the full sentence, e.g. "Launch in 12 days, 8 hours, 45 minutes, 20 seconds".',
    keyboard: [{ keys: '—', action: 'No keyboard interaction; use the controls inside, if any.' }],
    aria: [{ attribute: 'aria-label', when: 'On the section: the whole countdown as one sentence.' }],
    focus: 'Not focusable; static display.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Units are a list with their names beside the numbers.' },
      { criterion: '2.2.1 Timing Adjustable', how: 'The countdown is informational and does not end content or require a response.' },
    ],
    notes: ['The visible units are hidden from assistive technology; the section label reads them once.'],
  },
  examples: [
    {
      id: 'launch',
      title: 'Launch',
      description: 'A large countdown on a launch page.',
      code: `import { Countdown } from '@ds/react';

<Countdown label="Launch in" to={new Date('2026-11-01T09:00:00Z')} size="large" />`,
    },
    {
      id: 'card',
      title: 'In a card',
      description: 'A small countdown inside a promotion card.',
      code: `import { Countdown } from '@ds/react';

<Countdown label="Sale ends in" to={saleEnds} size="small" endedLabel="Sale over" />`,
    },
    {
      id: 'translated',
      title: 'Translated',
      description: 'Units in another language.',
      code: `import { Countdown } from '@ds/react';

<Countdown label="يبدأ خلال" to={launch} units={{ days: 'يوم', hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية' }} />`,
    },
  ],
  tokenPrefixes: ['--countdown-'],
  related: [
    { id: 'stat', relation: 'For a single figure.' },
    { id: 'notification-card', relation: 'For an event that has happened.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
