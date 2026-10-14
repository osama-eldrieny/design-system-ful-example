import { defineMeta } from '../meta';

export default defineMeta({
  id: 'file-upload',
  name: 'FileUpload',
  category: 'Forms',
  status: 'stable',
  since: '1.1.0',
  description:
    'A drop zone to choose or drag files, with FileUploadItem rows that show each file’s progress, completion or error and a delete button. It handles picking and dropping; uploading is up to you.',
  imports: [
    { name: 'FileUpload', from: '@ds/react' },
    { name: 'FileUploadItem', from: '@ds/react' },
  ],
  whenToUse: ['Attaching documents, images or imports to a record or form.'],
  whenNotToUse: [
    { text: 'For a single profile picture with a preview.', alternative: 'Avatar with a Button' },
  ],
  anatomy: [
    { name: 'Drop zone', description: 'Label for the hidden file input; click or drop files.' },
    { name: 'Hint', description: 'Accepted types and size.', optional: true },
    { name: 'File rows', description: 'Name, size, progress or status, delete.', optional: true },
  ],
  options: [
    {
      prop: 'status',
      title: 'FileUploadItem status',
      values: [
        { value: 'uploading', meaning: 'Shows a progress bar (with progress).' },
        { value: 'complete', meaning: 'Shows a check and “Complete”.' },
        { value: 'error', meaning: 'Red border and the error message.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Ready.', trigger: '—' },
    { name: 'Hover', meaning: 'Pointer over the zone.', trigger: ':hover' },
    { name: 'Focus', meaning: 'Keyboard focus on the hidden input.', trigger: ':focus-visible' },
    { name: 'Dragging', meaning: 'Files are over the zone.', trigger: 'dragover' },
    { name: 'Disabled', meaning: 'No uploads.', trigger: 'disabled prop.' },
  ],
  behavior: [
    {
      topic: 'Picking',
      text: 'The zone is a label, so clicking, Enter and Space open the file picker.',
    },
    { topic: 'Accepting', text: 'Pass accept and multiple; they go to the file input.' },
    { topic: 'Uploading', text: 'Update each FileUploadItem’s progress as your upload runs.' },
  ],
  content: [
    'Hint: name the accepted types and limit, e.g. "PNG or JPG, up to 5 MB".',
    'Errors: say why and what to do, e.g. "Larger than 10 MB. Choose a smaller file."',
  ],
  guidelines: [
    {
      do: 'Say which files are accepted before people pick.',
      dont: 'Reject files without saying the rules.',
      why: 'People should not need to guess.',
    },
    {
      do: 'Show progress for each file.',
      dont: 'Leave people waiting with no feedback.',
      why: 'Uploads can take a while.',
    },
    {
      do: 'Let people retry or remove failed files.',
      dont: 'Leave failed files with no action.',
      why: 'Errors need a way forward.',
    },
  ],
  accessibility: {
    role: 'Native file input, labelled by the drop zone; a list of rows.',
    keyboard: [
      { keys: 'Tab', action: 'Focuses the file input (the zone shows the ring).' },
      { keys: 'Enter / Space', action: 'Opens the file picker.' },
    ],
    aria: [
      { attribute: 'progressbar', when: 'While uploading, named "Uploading {name}".' },
      { attribute: 'aria-label on delete', when: '"Remove {name}"; translate with removeLabel.' },
    ],
    focus: 'The zone shows the focus ring while its input has focus.',
    wcag: [
      { criterion: '2.1.1 Keyboard', how: 'Native input; dragging is optional.' },
      {
        criterion: '2.5.7 Dragging Movements',
        how: 'Clicking the zone does the same as dropping.',
      },
    ],
    notes: ['Announce upload completion with a Toast when it happens in the background.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Drop zone',
      description: 'Pick or drop files.',
      code: `import { FileUpload } from '@ds/react';\n\n<FileUpload hint="PNG or JPG, up to 5 MB" accept="image/*" multiple onFilesChange={upload} />`,
    },
    {
      id: 'items',
      title: 'With progress',
      description: 'A row per file.',
      code: `import { FileUpload, FileUploadItem } from '@ds/react';\n\n<FileUpload onFilesChange={upload}>\n  <FileUploadItem name="report.pdf" size="200 KB" progress={40} onRemove={cancel} />\n</FileUpload>`,
    },
    {
      id: 'error',
      title: 'Failed upload',
      description: 'An error with a retry.',
      code: `import { Button, FileUploadItem } from '@ds/react';\n\n<FileUploadItem name="video.mp4" status="error" error="Too large" action={<Button appearance="text" size="small">Try again</Button>} />`,
    },
  ],
  tokenPrefixes: ['--file-upload-'],
  related: [
    { id: 'progress', relation: 'The upload bar.' },
    { id: 'featured-icon', relation: 'The file and upload icons.' },
  ],
  changelog: [{ version: '1.1.0', date: '2026-10-15', changes: ['New component.'] }],
});
