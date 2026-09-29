# Drawer

> A drawer is a panel that slides in from an edge of the screen for secondary tasks such as filters, settings or item details. Like a modal, it traps focus until it closes.

Status: stable · Category: Overlays · Since 0.4.0

```tsx
import { Drawer } from '@ds/react';
import { DrawerTrigger } from '@ds/react';
import { DrawerContent } from '@ds/react';
import { DrawerFooter } from '@ds/react';
import { DrawerClose } from '@ds/react';
```

## When to use
- For filters or settings that relate to the page behind.
- For details of a list item without leaving the list.
- As a bottom sheet on phones.

## When not to use
- For a short confirmation. Use Modal.
- For the site’s main navigation on desktop. Use SideNav or Navbar.

## Side (`side`)
- `end`: Right in LTR, left in RTL. Default; details and settings.
- `start`: Left in LTR; navigation on small screens.
- `top`: Announcements or search.
- `bottom`: Bottom sheet, common on phones.

## States
- **Open**: Slides in; focus inside. (open)
- **Closed**: Focus returns to the trigger. (—)

## Props
### Drawer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### DrawerTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

### DrawerContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | Heading; names the drawer. |
| `description` | `ReactNode` |  | Short explanation under the title. |
| `side` | `"start" \| "end" \| "top" \| "bottom"` | end | Edge it slides from: `end` (default; right in LTR, left in RTL), `start`, `top` or `bottom` (common on phones). |
| `closeLabel` | `string` | Close | Accessible name of the close button. Default "Close". |
| `asChild` | `boolean` |  |  |

### DrawerFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### DrawerClose

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

## Guidelines
- Do: Use start/end sides. Don’t: Hard-code left or right. Why: Logical sides flip correctly for right-to-left languages.
- Do: Keep the page context visible behind. Don’t: Make a drawer full-screen on desktop. Why: Drawers are for tasks related to the page behind them.
- Do: Put apply/reset actions in the footer. Don’t: Apply every filter change silently with no way back. Why: People expect to confirm or reset filters.

## Content
- Title: what the panel is for (“Filters”, “Order #1024”).

## Accessibility
- Role: dialog, named by the title.
- Tab / Shift+Tab: Moves within the drawer.
- Escape: Closes it.
- `aria-modal, aria-labelledby`: Set by Radix from the title.
- `aria-label on the close button`: closeLabel.
- Focus: Trapped inside; returned to the trigger.
- WCAG 2.4.3 Focus Order: Focus moves in and back logically.
- WCAG 2.1.2 No Keyboard Trap: Escape closes it.
- WCAG 1.4.10 Reflow: Never wider or taller than the screen.

## Examples
### Filters
From the end, with actions.

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerFooter, DrawerClose, Button } from '@ds/react';

<Drawer>
  <DrawerTrigger asChild><Button appearance="outline">Filters</Button></DrawerTrigger>
  <DrawerContent title="Filters">
    {filterFields}
    <DrawerFooter>
      <Button appearance="outline" variant="secondary" onClick={reset}>Reset</Button>
      <DrawerClose asChild><Button>Show results</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Bottom sheet
On phones.

```tsx
import { Drawer, DrawerContent } from '@ds/react';

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerContent side="bottom" title="Share">{shareOptions}</DrawerContent>
</Drawer>
```

### Item details
Opened from a table row.

```tsx
import { Drawer, DrawerContent } from '@ds/react';

<Drawer open={!!order} onOpenChange={(o) => !o && setOrder(null)}>
  <DrawerContent title={`Order ${order?.id}`} description={order?.status}>{details}</DrawerContent>
</Drawer>
```

Tokens: `--drawer-*` (values per theme in ai/components/drawer.json).
