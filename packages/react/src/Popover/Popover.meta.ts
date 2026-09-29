import { defineMeta } from '../meta';

export default defineMeta({
  id: 'popover',
  name: 'Popover',
  category: 'Overlays',
  status: 'stable',
  since: '0.4.0',
  description:
    'A popover shows interactive content anchored to a button, such as a small form, filters or details. It doesn’t block the page: clicking outside or Escape closes it and focus returns to the trigger.',
  imports: [
    { name: 'Popover', from: '@ds/react' },
    { name: 'PopoverTrigger', from: '@ds/react' },
    { name: 'PopoverContent', from: '@ds/react' },
    { name: 'PopoverClose', from: '@ds/react' },
  ],
  whenToUse: [
    'For small, related content or controls next to what opened them: a quick filter, a color picker, details.',
  ],
  whenNotToUse: [
    { text: 'For a list of actions.', alternative: 'DropdownMenu' },
    { text: 'For a short hint.', alternative: 'Tooltip' },
    { text: 'For tasks that need full attention.', alternative: 'Modal' },
  ],
  anatomy: [
    { name: 'Trigger', description: 'A button (aria-expanded).' },
    { name: 'Panel', description: 'Positioned next to the trigger, kept on screen.' },
    { name: 'Title', description: 'Optional heading.', optional: true },
    { name: 'Close button', description: 'Shown by default.', optional: true },
  ],
  options: [
    {
      prop: 'side',
      title: 'Side',
      values: [
        { value: 'bottom', meaning: 'Default.' },
        { value: 'top', meaning: 'Above.' },
        { value: 'right / left', meaning: 'Beside; flips when there isn’t room.' },
      ],
    },
  ],
  states: [
    { name: 'Open', meaning: 'Shown; focus moves inside.', trigger: 'trigger click' },
    { name: 'Closed', meaning: 'Focus returns to the trigger.', trigger: '—' },
  ],
  behavior: [
    {
      topic: 'Focus',
      text: 'Moves into the popover on open and back to the trigger on close; it isn’t trapped.',
    },
    { topic: 'Closing', text: 'Escape, clicking outside, the close button or a PopoverClose.' },
    { topic: 'Themes', text: 'Keeps the theme of where it opened.' },
  ],
  content: ['Keep it short; if it needs scrolling, use a Drawer or Modal.'],
  guidelines: [
    {
      do: 'Open popovers from a button.',
      dont: 'Open them on hover.',
      why: 'Hover isn’t available to keyboard and touch users; use HoverCard only for previews.',
    },
    {
      do: 'Keep content small.',
      dont: 'Put a long form in a popover.',
      why: 'Long popovers get cut off and are hard to navigate.',
    },
    {
      do: 'Use DropdownMenu for action lists.',
      dont: 'Build a menu out of buttons in a popover.',
      why: 'Menus have their own keyboard pattern and semantics.',
    },
  ],
  accessibility: {
    role: 'dialog (non-modal), controlled by the trigger button.',
    keyboard: [
      { keys: 'Enter / Space', action: 'Opens from the trigger.' },
      { keys: 'Escape', action: 'Closes and returns focus.' },
    ],
    aria: [
      { attribute: 'aria-expanded / aria-controls', when: 'On the trigger (Radix).' },
      { attribute: 'aria-label on the close button', when: 'closeLabel.' },
    ],
    focus: 'Moves in on open, back to the trigger on close.',
    wcag: [
      { criterion: '2.1.1 Keyboard', how: 'Opens, closes and works by keyboard.' },
      {
        criterion: '1.4.13 Content on Hover or Focus',
        how: 'Dismissible with Escape; stays open until dismissed.',
      },
      { criterion: '4.1.2 Name, Role, Value', how: 'Expanded state on the trigger.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Details',
      description: 'A titled popover.',
      code: `import { Popover, PopoverTrigger, PopoverContent, Button } from '@ds/react';

<Popover>
  <PopoverTrigger asChild><Button appearance="outline">Shipping</Button></PopoverTrigger>
  <PopoverContent title="Shipping">Free delivery on orders over $50.</PopoverContent>
</Popover>`,
    },
    {
      id: 'form',
      title: 'Quick filter',
      description: 'Controls inside.',
      code: `import { Popover, PopoverTrigger, PopoverContent, PopoverClose, Slider, Button } from '@ds/react';

<Popover>
  <PopoverTrigger asChild><Button appearance="outline">Price</Button></PopoverTrigger>
  <PopoverContent title="Price">
    <Slider label="Price" hideLabel defaultValue={[0, 300]} max={500} />
    <PopoverClose asChild><Button size="small">Apply</Button></PopoverClose>
  </PopoverContent>
</Popover>`,
    },
    {
      id: 'side',
      title: 'Placement',
      description: 'On the right.',
      code: `import { Popover, PopoverTrigger, PopoverContent, Button } from '@ds/react';

<Popover>
  <PopoverTrigger asChild><Button>Info</Button></PopoverTrigger>
  <PopoverContent side="right" showClose={false} aria-label="More information">More information.</PopoverContent>
</Popover>`,
    },
  ],
  tokenPrefixes: ['--popover-'],
  related: [
    { id: 'tooltip', relation: 'For short hints.' },
    { id: 'dropdown-menu', relation: 'For actions.' },
    { id: 'modal', relation: 'For blocking tasks.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
