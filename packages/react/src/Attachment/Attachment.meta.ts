import { defineMeta } from '../meta';

export default defineMeta({
  id: 'attachment',
  name: 'Attachment',
  category: 'Data display',
  status: 'stable',
  since: '1.3.0',
  description:
    'A file attached to a message, task or form: its icon, name and detail, with a download link, other actions, and a remove button before sending.',
  imports: [{ name: 'Attachment', from: '@ds/react' }],
  whenToUse: [
    'To show a file on a message, comment or task, e.g. "Guidelines.pdf · 2.4 MB".',
    'In a composer, to show files that are about to be sent and can be removed.',
  ],
  whenNotToUse: [
    { text: 'For uploading files; it does not pick them.', alternative: 'FileUpload' },
    { text: 'For a list of many files with columns.', alternative: 'Table' },
  ],
  anatomy: [
    { name: 'Icon', description: 'A tile showing the file type.' },
    { name: 'Name', description: 'The file name; a download link when href is set.' },
    { name: 'Detail', description: 'Size or source, e.g. "2.4 MB" or "Google Drive".', optional: true },
    { name: 'Actions', description: 'Other controls, e.g. preview.', optional: true },
    { name: 'Remove', description: 'Removes the file before it is sent.', optional: true },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'medium', meaning: 'Default. Forms and lists.' },
        { value: 'small', meaning: 'Composers and chat messages.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Shows the file.', trigger: '—' },
    { name: 'Hover', meaning: 'The name is underlined when it is a link.', trigger: ':hover on the link.' },
    { name: 'Focus', meaning: 'Shows keyboard focus on the link or a control.', trigger: ':focus-visible.' },
  ],
  behavior: [
    { topic: 'Download', text: 'With href the name downloads the file; the browser decides where it goes.' },
    { topic: 'Removing', text: 'onRemove is called when the close button is pressed; remove the item in your handler.' },
    { topic: 'Long names', text: 'Long names are cut with an ellipsis; the full name stays in the link.' },
  ],
  content: [
    'Show the file name as it is saved, e.g. "Q3-report.pdf".',
    'Show size or source as detail, e.g. "2.4 MB" or "Google Drive".',
  ],
  guidelines: [
    {
      do: 'Use a remove button only before a message is sent.',
      dont: 'Let people remove files from a message that was already sent.',
      why: 'Sent attachments are part of the record other people have seen.',
    },
    {
      do: 'Show the file type with the icon.',
      dont: 'Use the same generic icon for every file.',
      why: 'Icons help people spot the file they need.',
    },
    {
      do: 'Make the name a download link when the file can be downloaded.',
      dont: 'Make the name look like a link when it only opens a menu.',
      why: 'A link should do what it looks like it does.',
    },
  ],
  accessibility: {
    role: 'group of content with a link or text for the name.',
    keyboard: [
      { keys: 'Tab', action: 'Moves to the name link and then the actions and remove button.' },
      { keys: 'Enter', action: 'Downloads the file from the link.' },
    ],
    aria: [{ attribute: 'aria-label', when: 'On the remove button, from removeLabel or "Remove {name}".' }],
    focus: 'The link and each button show a focus ring.',
    wcag: [
      { criterion: '2.4.4 Link Purpose', how: 'The link text is the file name, which says where it goes.' },
      { criterion: '2.1.1 Keyboard', how: 'Link, actions and remove are all keyboard reachable.' },
      { criterion: '1.4.3 Contrast', how: 'Name and detail pass AA on every background in every theme.' },
    ],
    notes: ['The file icon is decorative; the name carries the meaning.'],
  },
  examples: [
    {
      id: 'download',
      title: 'Downloadable file',
      description: 'A file with a link and its size.',
      code: `import { Attachment } from '@ds/react';

<Attachment name="Guidelines.pdf" detail="2.4 MB" href="/files/guidelines.pdf" />`,
    },
    {
      id: 'composer',
      title: 'In a composer',
      description: 'A small file that can be removed before sending.',
      code: `import { Attachment } from '@ds/react';

<Attachment size="small" name="Q3-report.xlsx" detail="180 KB" onRemove={() => remove(file.id)} />`,
    },
    {
      id: 'external',
      title: 'From another app',
      description: 'The detail names where the file lives.',
      code: `import { Attachment } from '@ds/react';
import { HardDrive } from 'lucide-react';

<Attachment name="Branding assets" detail="Google Drive" icon={<HardDrive />} />`,
    },
  ],
  tokenPrefixes: ['--attachment-'],
  related: [
    { id: 'file-upload', relation: 'For picking and uploading files.' },
    { id: 'list', relation: 'For a plain list of files.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
