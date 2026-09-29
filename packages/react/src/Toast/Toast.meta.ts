import { defineMeta } from '../meta';

export default defineMeta({
  id: 'toast',
  name: 'Toast',
  category: 'Feedback',
  status: 'stable',
  since: '0.4.0',
  description:
    'A toast is a brief message about something that just happened, such as “Changes saved”, shown in a corner and dismissed automatically. It can offer one action, like Undo.',
  imports: [
    { name: 'ToastProvider', from: '@ds/react' },
    { name: 'useToast', from: '@ds/react' },
  ],
  whenToUse: [
    'To confirm an action finished (“Message sent”).',
    'To offer a quick undo after a reversible action.',
  ],
  whenNotToUse: [
    {
      text: 'For errors people must fix.',
      alternative: 'Alert next to the problem, or FormField errors',
    },
    { text: 'For a decision.', alternative: 'Modal' },
    { text: 'For persistent status.', alternative: 'Alert or Badge' },
  ],
  anatomy: [
    { name: 'Accent', description: 'Tone color on the leading edge.' },
    { name: 'Icon', description: 'Matches the tone.' },
    { name: 'Title', description: 'The message.' },
    { name: 'Description', description: 'Extra detail.', optional: true },
    { name: 'Action', description: 'One action, e.g. Undo.', optional: true },
    { name: 'Close', description: 'Dismisses it.' },
  ],
  options: [
    {
      prop: 'tone',
      title: 'Tone',
      values: [
        { value: 'primary', meaning: 'Information. Default.' },
        { value: 'success', meaning: 'Something succeeded.' },
        { value: 'warning', meaning: 'Something needs attention.' },
        { value: 'danger', meaning: 'Something failed; announced assertively.' },
      ],
    },
  ],
  states: [
    { name: 'Shown', meaning: 'Slides in; pauses on hover or focus.', trigger: 'toast(…)' },
    { name: 'Dismissed', meaning: 'After duration, swipe, close or Escape.', trigger: '—' },
  ],
  behavior: [
    {
      topic: 'Timing',
      text: 'Stays 5 s by default and pauses while hovered or focused; pass Infinity to keep it until dismissed.',
    },
    {
      topic: 'Announcements',
      text: 'Politely announced; danger toasts are announced assertively. F8 jumps to the notifications region.',
    },
    {
      topic: 'Actions',
      text: 'An action needs altText saying how to do the same thing without the toast, because it may disappear.',
    },
  ],
  content: ['Title: past tense, a few words (“Project deleted”).', 'Action: one verb (“Undo”).'],
  guidelines: [
    {
      do: 'Keep it short and about what just happened.',
      dont: 'Put instructions in a toast.',
      why: 'Toasts disappear before long text can be read.',
    },
    {
      do: 'Show errors next to their cause.',
      dont: 'Report a form error only in a toast.',
      why: 'People need the error where they fix it.',
    },
    {
      do: 'Give actions an alternative (altText).',
      dont: 'Make Undo available only in the toast.',
      why: 'Keyboard and screen reader users may miss the toast.',
    },
  ],
  accessibility: {
    role: 'status (or alert for danger) inside a labelled notifications region.',
    keyboard: [
      { keys: 'F8', action: 'Moves focus to the notifications region.' },
      { keys: 'Escape', action: 'Dismisses the focused toast.' },
      { keys: 'Tab', action: 'Reaches the action and close buttons.' },
    ],
    aria: [
      { attribute: 'aria-live', when: 'Polite; assertive for danger.' },
      { attribute: 'aria-label on close', when: 'closeLabel (“Dismiss”).' },
    ],
    focus: 'Not moved by showing a toast.',
    wcag: [
      { criterion: '4.1.3 Status Messages', how: 'Announced without moving focus.' },
      {
        criterion: '2.2.1 Timing Adjustable',
        how: 'Pauses on hover and focus; duration is configurable.',
      },
      { criterion: '1.4.1 Use of Color', how: 'Tone also shown by an icon.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'setup',
      title: 'Set up',
      description: 'Once, near the root.',
      code: `import { ToastProvider } from '@ds/react';

<ToastProvider>
  <App />
</ToastProvider>`,
    },
    {
      id: 'success',
      title: 'Success',
      description: 'After saving.',
      code: `import { useToast } from '@ds/react';

const toast = useToast();
toast({ title: 'Changes saved', tone: 'success' });`,
    },
    {
      id: 'undo',
      title: 'With Undo',
      description: 'A reversible action.',
      code: `import { useToast } from '@ds/react';

toast({
  title: 'Project deleted',
  action: { label: 'Undo', onClick: restore, altText: 'Restore it from Trash' },
});`,
    },
  ],
  tokenPrefixes: ['--toast-'],
  related: [
    { id: 'alert', relation: 'For persistent messages and errors.' },
    { id: 'modal', relation: 'For decisions.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
