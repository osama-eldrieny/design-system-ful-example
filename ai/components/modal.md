# Modal

> A modal is a dialog over the page that people must deal with before going back: a short form, a confirmation or details. Focus is trapped inside, Escape closes it, and focus returns to the trigger.

Status: stable · Category: Overlays · Since 0.4.0

```tsx
import { Modal } from '@ds/react';
import { ModalTrigger } from '@ds/react';
import { ModalContent } from '@ds/react';
import { ModalFooter } from '@ds/react';
import { ModalClose } from '@ds/react';
```

## When to use
- To confirm a destructive or important action (role="alertdialog").
- For a short, focused task such as editing one item.

## When not to use
- For content people want next to the page. Use Drawer or Popover.
- For long, multi-step flows. Use A full page.
- To confirm that something succeeded. Use Toast.

## Size (`size`)
- `small`: Confirmations.
- `medium`: Forms. Default.
- `large`: Rich or long content.

## Role (`role`)
- `dialog`: Default; clicking outside closes it.
- `alertdialog`: Urgent; no outside-click close and no close icon.

## States
- **Open**: Shown over a scrim; focus inside. (open)
- **Closed**: Focus back on the trigger. (—)

## Props
### Modal

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### ModalTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

### ModalContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | Heading of the dialog; names it for screen readers. |
| `description` | `ReactNode` |  | Short explanation under the title; describes the dialog. |
| `size` | `"small" \| "medium" \| "large"` | medium | `small` for confirmations, `medium` (default) for forms, `large` for rich content. |
| `role` | `"dialog" \| "alertdialog"` | dialog | `alertdialog` for urgent confirmations (e.g. delete): clicking outside doesn't close it and there's no close icon, so people choose an action. |
| `closeLabel` | `string` | Close | Accessible name of the close button. Default "Close". |
| `asChild` | `boolean` |  |  |

### ModalFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### ModalClose

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

## Guidelines
- Do: Label the primary action with a specific verb. Don’t: Use “Yes” and “No”. Why: Specific labels make the outcome clear without rereading the question.
- Do: Use role="alertdialog" for destructive confirmations. Don’t: Let a stray click outside dismiss a delete confirmation. Why: The question must be answered on purpose.
- Do: Keep modals short and focused. Don’t: Put a whole settings page in a modal. Why: Long content is hard to use inside a trapped dialog, especially on phones.

## Content
- Title: the task or the question (“Delete project?”).
- Buttons: specific verbs (“Delete project”), not “OK”.

## Accessibility
- Role: dialog or alertdialog, named by the title and described by the description.
- Tab / Shift+Tab: Moves within the dialog only.
- Escape: Closes it.
- `aria-modal`: Set by Radix.
- `aria-labelledby / aria-describedby`: Title and description.
- `aria-label on the close button`: closeLabel (“Close”).
- Focus: Trapped inside while open; returned to the trigger afterwards.
- WCAG 2.4.3 Focus Order: Focus moves in and back logically.
- WCAG 2.1.2 No Keyboard Trap: Escape always closes it.
- WCAG 4.1.2 Name, Role, Value: A named dialog.

## Examples
### Confirm a delete
An alert dialog with Cancel and Delete.

```tsx
import { Modal, ModalTrigger, ModalContent, ModalFooter, ModalClose, Button } from '@ds/react';

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
</Modal>
```

### Edit form
Controlled, closing after save.

```tsx
import { Modal, ModalContent, ModalFooter, InputField, Button } from '@ds/react';

<Modal open={open} onOpenChange={setOpen}>
  <ModalContent title="Rename file">
    <InputField label="Name" defaultValue={file.name} />
    <ModalFooter>
      <Button onClick={() => { save(); setOpen(false); }}>Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Long content
Scrolls inside.

```tsx
import { Modal, ModalTrigger, ModalContent, Button } from '@ds/react';

<Modal>
  <ModalTrigger asChild><Button appearance="text">View terms</Button></ModalTrigger>
  <ModalContent size="large" title="Terms of service">{terms}</ModalContent>
</Modal>
```

Tokens: `--modal-*` (values per theme in ai/components/modal.json).
