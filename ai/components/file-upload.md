# FileUpload

> A drop zone to choose or drag files, with FileUploadItem rows that show each file’s progress, completion or error and a delete button. It handles picking and dropping; uploading is up to you.

Status: stable · Category: Forms · Since 1.1.0

```tsx
import { FileUpload } from '@ds/react';
import { FileUploadItem } from '@ds/react';
```

## When to use
- Attaching documents, images or imports to a record or form.

## When not to use
- For a single profile picture with a preview. Use Avatar with a Button.

## FileUploadItem status (`status`)
- `uploading`: Shows a progress bar (with progress).
- `complete`: Shows a check and “Complete”.
- `error`: Red border and the error message.

## States
- **Default**: Ready. (—)
- **Hover**: Pointer over the zone. (:hover)
- **Focus**: Keyboard focus on the hidden input. (:focus-visible)
- **Dragging**: Files are over the zone. (dragover)
- **Disabled**: No uploads. (disabled prop.)

## Props
### FileUpload

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onFilesChange` | `((files: File[]) => void)` |  | Called with the chosen or dropped files. |
| `label` | `ReactNode` |  | Main line in the zone. Default "Click to upload or drag and drop". |
| `actionLabel` | `ReactNode` | Click to upload | Words of the label styled as the action. Default "Click to upload". |
| `hint` | `ReactNode` |  | Help under the label, e.g. "SVG, PNG or JPG (max. 800×400px)". |
| `children` | `ReactNode` |  | Uploaded or uploading files, as FileUploadItem elements, shown under the zone. |

### FileUploadItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` |  | File name. |
| `size` | `string` |  | Size, formatted, e.g. "200 KB". |
| `progress` | `number` |  | Upload progress, 0–100. Omit when done. |
| `status` | `"error" \| "uploading" \| "complete"` |  | `uploading`, `complete` or `error`. Default: uploading while progress is set, else complete. |
| `error` | `ReactNode` |  | What went wrong, shown with status="error". |
| `icon` | `ReactNode` | <FileText /> | Icon for the file type. Default a document. |
| `onRemove` | `(() => void)` |  | Shows a delete button. |
| `removeLabel` | `string` |  | Accessible name of the delete button. Default "Remove {name}". |
| `action` | `ReactNode` |  | Extra action after the text, e.g. "Try again" for errors. |

## Guidelines
- Do: Say which files are accepted before people pick. Don’t: Reject files without saying the rules. Why: People should not need to guess.
- Do: Show progress for each file. Don’t: Leave people waiting with no feedback. Why: Uploads can take a while.
- Do: Let people retry or remove failed files. Don’t: Leave failed files with no action. Why: Errors need a way forward.

## Content
- Hint: name the accepted types and limit, e.g. "PNG or JPG, up to 5 MB".
- Errors: say why and what to do, e.g. "Larger than 10 MB. Choose a smaller file."

## Accessibility
- Role: Native file input, labelled by the drop zone; a list of rows.
- Tab: Focuses the file input (the zone shows the ring).
- Enter / Space: Opens the file picker.
- `progressbar`: While uploading, named "Uploading {name}".
- `aria-label on delete`: "Remove {name}"; translate with removeLabel.
- Focus: The zone shows the focus ring while its input has focus.
- WCAG 2.1.1 Keyboard: Native input; dragging is optional.
- WCAG 2.5.7 Dragging Movements: Clicking the zone does the same as dropping.
- Announce upload completion with a Toast when it happens in the background.

## Examples
### Drop zone
Pick or drop files.

```tsx
import { FileUpload } from '@ds/react';

<FileUpload hint="PNG or JPG, up to 5 MB" accept="image/*" multiple onFilesChange={upload} />
```

### With progress
A row per file.

```tsx
import { FileUpload, FileUploadItem } from '@ds/react';

<FileUpload onFilesChange={upload}>
  <FileUploadItem name="report.pdf" size="200 KB" progress={40} onRemove={cancel} />
</FileUpload>
```

### Failed upload
An error with a retry.

```tsx
import { Button, FileUploadItem } from '@ds/react';

<FileUploadItem name="video.mp4" status="error" error="Too large" action={<Button appearance="text" size="small">Try again</Button>} />
```

Tokens: `--file-upload-*` (values per theme in ai/components/file-upload.json).
