import { defineMeta } from '../meta';

export default defineMeta({
  id: 'modal',
  name: 'Modal',
  category: 'Overlays',
  status: 'stable',
  since: '0.4.0',
  description:
    'A modal is a dialog over the page that people must deal with before going back: a short form, a confirmation or details. Focus is trapped inside, Escape closes it, and focus returns to the trigger.',
  imports: [
    { name: 'Modal', from: '@ds/react' },
    { name: 'ModalTrigger', from: '@ds/react' },
    { name: 'ModalContent', from: '@ds/react' },
    { name: 'ModalFooter', from: '@ds/react' },
    { name: 'ModalClose', from: '@ds/react' },
  ],
  whenToUse: [
    'To confirm a destructive or important action (role="alertdialog").',
    'For a short, focused task such as editing one item.',
  ],
  whenNotToUse: [
    { text: 'For content people want next to the page.', alternative: 'Drawer or Popover' },
    { text: 'For long, multi-step flows.', alternative: 'A full page' },
    { text: 'To confirm that something succeeded.', alternative: 'Toast' },
  ],
  anatomy: [
    { name: 'Scrim', description: 'Dims the page behind.' },
    { name: 'Title', description: 'Names the dialog.' },
    { name: 'Description', description: 'Describes it.', optional: true },
    { name: 'Close button', description: 'Not shown on alert dialogs.', optional: true },
    { name: 'Footer', description: 'Actions; the primary one last.', optional: true },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Confirmations.' },
        { value: 'medium', meaning: 'Forms. Default.' },
        { value: 'large', meaning: 'Rich or long content.' },
      ],
    },
    {
      prop: 'role',
      title: 'Role',
      values: [
        { value: 'dialog', meaning: 'Default; clicking outside closes it.' },
        { value: 'alertdialog', meaning: 'Urgent; no outside-click close and no close icon.' },
      ],
    },
  ],
  states: [
    { name: 'Open', meaning: 'Shown over a scrim; focus inside.', trigger: 'open' },
    { name: 'Closed', meaning: 'Focus back on the trigger.', trigger: '—' },
  ],
  behavior: [
    {
      topic: 'Focus',
      text: 'Moves to the first focusable element, is trapped inside, and returns to the trigger on close.',
    },
    {
      topic: 'Closing',
      text: 'Escape, the close button, a ModalClose action or, for dialogs (not alert dialogs), clicking outside.',
    },
    {
      topic: 'Scrolling',
      text: 'The page behind doesn’t scroll; long content scrolls inside the modal.',
    },
    { topic: 'Themes', text: 'Rendered in a portal but keeps the theme of where it was opened.' },
  ],
  content: [
    'Title: the task or the question (“Delete project?”).',
    'Buttons: specific verbs (“Delete project”), not “OK”.',
  ],
  guidelines: [
    {
      do: 'Label the primary action with a specific verb.',
      dont: 'Use “Yes” and “No”.',
      why: 'Specific labels make the outcome clear without rereading the question.',
    },
    {
      do: 'Use role="alertdialog" for destructive confirmations.',
      dont: 'Let a stray click outside dismiss a delete confirmation.',
      why: 'The question must be answered on purpose.',
    },
    {
      do: 'Keep modals short and focused.',
      dont: 'Put a whole settings page in a modal.',
      why: 'Long content is hard to use inside a trapped dialog, especially on phones.',
    },
  ],
  accessibility: {
    role: 'dialog or alertdialog, named by the title and described by the description.',
    keyboard: [
      { keys: 'Tab / Shift+Tab', action: 'Moves within the dialog only.' },
      { keys: 'Escape', action: 'Closes it.' },
    ],
    aria: [
      { attribute: 'aria-modal', when: 'Set by Radix.' },
      { attribute: 'aria-labelledby / aria-describedby', when: 'Title and description.' },
      { attribute: 'aria-label on the close button', when: 'closeLabel (“Close”).' },
    ],
    focus: 'Trapped inside while open; returned to the trigger afterwards.',
    wcag: [
      { criterion: '2.4.3 Focus Order', how: 'Focus moves in and back logically.' },
      { criterion: '2.1.2 No Keyboard Trap', how: 'Escape always closes it.' },
      { criterion: '4.1.2 Name, Role, Value', how: 'A named dialog.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'confirm',
      title: 'Confirm a delete',
      description: 'An alert dialog with Cancel and Delete.',
      code: `import { Modal, ModalTrigger, ModalContent, ModalFooter, ModalClose, Button } from '@ds/react';

<Modal>
  <ModalTrigger asChild>
    <Button variant="danger">Delete</Button>
  </ModalTrigger>
  <ModalContent role="alertdialog" size="small" title="Delete project?" description="This can’t be undone.">
    <ModalFooter>
      <ModalClose asChild>
        <Button appearance="outline" variant="secondary">Cancel</Button>
      </ModalClose>
      <Button variant="danger" onClick={remove}>Delete project</Button>
    </ModalFooter>
  </ModalContent>
</Modal>`,
    },
    {
      id: 'form',
      title: 'Edit form',
      description: 'Controlled, closing after save.',
      code: `import { Modal, ModalContent, ModalFooter, InputField, Button } from '@ds/react';

<Modal open={open} onOpenChange={setOpen}>
  <ModalContent title="Rename file">
    <InputField label="Name" defaultValue={file.name} />
    <ModalFooter>
      <Button onClick={() => { save(); setOpen(false); }}>Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>`,
    },
    {
      id: 'large',
      title: 'Long content',
      description: 'Scrolls inside.',
      code: `import { Modal, ModalTrigger, ModalContent, Button } from '@ds/react';

<Modal>
  <ModalTrigger asChild><Button appearance="text">View terms</Button></ModalTrigger>
  <ModalContent size="large" title="Terms of service">{terms}</ModalContent>
</Modal>`,
    },
  ],
  tokenPrefixes: ['--modal-'],
  related: [
    { id: 'drawer', relation: 'For side panels.' },
    { id: 'popover', relation: 'For non-blocking content.' },
    { id: 'toast', relation: 'For brief confirmations.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
