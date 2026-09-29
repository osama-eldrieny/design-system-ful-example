import { defineMeta } from '../meta';

export default defineMeta({
  id: 'drawer',
  name: 'Drawer',
  category: 'Overlays',
  status: 'stable',
  since: '0.4.0',
  description:
    'A drawer is a panel that slides in from an edge of the screen for secondary tasks such as filters, settings or item details. Like a modal, it traps focus until it closes.',
  imports: [
    { name: 'Drawer', from: '@ds/react' },
    { name: 'DrawerTrigger', from: '@ds/react' },
    { name: 'DrawerContent', from: '@ds/react' },
    { name: 'DrawerFooter', from: '@ds/react' },
    { name: 'DrawerClose', from: '@ds/react' },
  ],
  whenToUse: [
    'For filters or settings that relate to the page behind.',
    'For details of a list item without leaving the list.',
    'As a bottom sheet on phones.',
  ],
  whenNotToUse: [
    { text: 'For a short confirmation.', alternative: 'Modal' },
    { text: 'For the site’s main navigation on desktop.', alternative: 'SideNav or Navbar' },
  ],
  anatomy: [
    { name: 'Scrim', description: 'Dims the page.' },
    { name: 'Panel', description: 'Slides from its side; the inner corners are rounded.' },
    { name: 'Header', description: 'Title and close button.' },
    { name: 'Body', description: 'Scrolls when long.' },
    { name: 'Footer', description: 'Actions.', optional: true },
  ],
  options: [
    {
      prop: 'side',
      title: 'Side',
      values: [
        { value: 'end', meaning: 'Right in LTR, left in RTL. Default; details and settings.' },
        { value: 'start', meaning: 'Left in LTR; navigation on small screens.' },
        { value: 'top', meaning: 'Announcements or search.' },
        { value: 'bottom', meaning: 'Bottom sheet, common on phones.' },
      ],
    },
  ],
  states: [
    { name: 'Open', meaning: 'Slides in; focus inside.', trigger: 'open' },
    { name: 'Closed', meaning: 'Focus returns to the trigger.', trigger: '—' },
  ],
  behavior: [
    {
      topic: 'Focus',
      text: 'Trapped while open and returned to the trigger; Escape and clicking outside close it.',
    },
    {
      topic: 'Direction',
      text: 'start and end follow the reading direction, so drawers flip in Arabic.',
    },
    { topic: 'Motion', text: 'Slides in; appears without motion for reduced motion.' },
  ],
  content: ['Title: what the panel is for (“Filters”, “Order #1024”).'],
  guidelines: [
    {
      do: 'Use start/end sides.',
      dont: 'Hard-code left or right.',
      why: 'Logical sides flip correctly for right-to-left languages.',
    },
    {
      do: 'Keep the page context visible behind.',
      dont: 'Make a drawer full-screen on desktop.',
      why: 'Drawers are for tasks related to the page behind them.',
    },
    {
      do: 'Put apply/reset actions in the footer.',
      dont: 'Apply every filter change silently with no way back.',
      why: 'People expect to confirm or reset filters.',
    },
  ],
  accessibility: {
    role: 'dialog, named by the title.',
    keyboard: [
      { keys: 'Tab / Shift+Tab', action: 'Moves within the drawer.' },
      { keys: 'Escape', action: 'Closes it.' },
    ],
    aria: [
      { attribute: 'aria-modal, aria-labelledby', when: 'Set by Radix from the title.' },
      { attribute: 'aria-label on the close button', when: 'closeLabel.' },
    ],
    focus: 'Trapped inside; returned to the trigger.',
    wcag: [
      { criterion: '2.4.3 Focus Order', how: 'Focus moves in and back logically.' },
      { criterion: '2.1.2 No Keyboard Trap', how: 'Escape closes it.' },
      { criterion: '1.4.10 Reflow', how: 'Never wider or taller than the screen.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'filters',
      title: 'Filters',
      description: 'From the end, with actions.',
      code: `import { Drawer, DrawerTrigger, DrawerContent, DrawerFooter, DrawerClose, Button } from '@ds/react';

<Drawer>
  <DrawerTrigger asChild><Button appearance="outline">Filters</Button></DrawerTrigger>
  <DrawerContent title="Filters">
    {filterFields}
    <DrawerFooter>
      <Button appearance="outline" variant="secondary" onClick={reset}>Reset</Button>
      <DrawerClose asChild><Button>Show results</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    },
    {
      id: 'bottom',
      title: 'Bottom sheet',
      description: 'On phones.',
      code: `import { Drawer, DrawerContent } from '@ds/react';

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerContent side="bottom" title="Share">{shareOptions}</DrawerContent>
</Drawer>`,
    },
    {
      id: 'details',
      title: 'Item details',
      description: 'Opened from a table row.',
      code: `import { Drawer, DrawerContent } from '@ds/react';

<Drawer open={!!order} onOpenChange={(o) => !o && setOrder(null)}>
  <DrawerContent title={\`Order \${order?.id}\`} description={order?.status}>{details}</DrawerContent>
</Drawer>`,
    },
  ],
  tokenPrefixes: ['--drawer-'],
  related: [
    { id: 'modal', relation: 'For focused tasks and confirmations.' },
    { id: 'popover', relation: 'For small, non-blocking content.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
