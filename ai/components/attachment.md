# Attachment

> A file attached to a message, task or form: its icon, name and detail, with a download link, other actions, and a remove button before sending.

Status: stable · Category: Data display · Since 1.3.0

```tsx
import { Attachment } from '@ds/react';
```

## When to use
- To show a file on a message, comment or task, e.g. "Guidelines.pdf · 2.4 MB".
- In a composer, to show files that are about to be sent and can be removed.

## When not to use
- For uploading files; it does not pick them. Use FileUpload.
- For a list of many files with columns. Use Table.

## Size (`size`)
- `medium`: Default. Forms and lists.
- `small`: Composers and chat messages.

## States
- **Default**: Shows the file. (—)
- **Hover**: The name is underlined when it is a link. (:hover on the link.)
- **Focus**: Shows keyboard focus on the link or a control. (:focus-visible.)

## Props
### Attachment

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` |  | The file name, e.g. "Guidelines.pdf". |
| `detail` | `ReactNode` |  | Size or source shown under the name, e.g. "2.4 MB" or "Google Drive". |
| `icon` | `ReactNode` | <File /> | Icon for the file type. Default a generic file icon. |
| `href` | `string` |  | Makes the name a download link to this URL. |
| `actions` | `ReactNode` |  | Other controls at the end, e.g. a preview button. |
| `onRemove` | `(() => void)` |  | Shows a remove button; called when it is pressed (e.g. before sending). |
| `removeLabel` | `string` |  | Words for the remove button. Default "Remove {name}". |
| `size` | `AttachmentSize` | medium | `small` in composers and chat, `medium` (default) in forms and lists. |

## Guidelines
- Do: Use a remove button only before a message is sent. Don’t: Let people remove files from a message that was already sent. Why: Sent attachments are part of the record other people have seen.
- Do: Show the file type with the icon. Don’t: Use the same generic icon for every file. Why: Icons help people spot the file they need.
- Do: Make the name a download link when the file can be downloaded. Don’t: Make the name look like a link when it only opens a menu. Why: A link should do what it looks like it does.

## Content
- Show the file name as it is saved, e.g. "Q3-report.pdf".
- Show size or source as detail, e.g. "2.4 MB" or "Google Drive".

## Accessibility
- Role: group of content with a link or text for the name.
- Tab: Moves to the name link and then the actions and remove button.
- Enter: Downloads the file from the link.
- `aria-label`: On the remove button, from removeLabel or "Remove {name}".
- Focus: The link and each button show a focus ring.
- WCAG 2.4.4 Link Purpose: The link text is the file name, which says where it goes.
- WCAG 2.1.1 Keyboard: Link, actions and remove are all keyboard reachable.
- WCAG 1.4.3 Contrast: Name and detail pass AA on every background in every theme.
- The file icon is decorative; the name carries the meaning.

## Examples
### Downloadable file
A file with a link and its size.

```tsx
import { Attachment } from '@ds/react';

<Attachment name="Guidelines.pdf" detail="2.4 MB" href="/files/guidelines.pdf" />
```

### In a composer
A small file that can be removed before sending.

```tsx
import { Attachment } from '@ds/react';

<Attachment size="small" name="Q3-report.xlsx" detail="180 KB" onRemove={() => remove(file.id)} />
```

### From another app
The detail names where the file lives.

```tsx
import { Attachment } from '@ds/react';
import { HardDrive } from 'lucide-react';

<Attachment name="Branding assets" detail="Google Drive" icon={<HardDrive />} />
```

Tokens: `--attachment-*` (values per theme in ai/components/attachment.json).
