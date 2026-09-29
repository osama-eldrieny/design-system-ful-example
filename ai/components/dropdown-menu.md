# DropdownMenu

> A dropdown menu shows a list of actions or options when people press a button. It keeps secondary actions out of the way until needed and closes after a choice.

Status: stable · Category: Overlays · Since 0.2.0

```tsx
import { DropdownMenu } from '@ds/react';
import { DropdownMenuTrigger } from '@ds/react';
import { DropdownMenuContent } from '@ds/react';
import { DropdownMenuItem } from '@ds/react';
import { DropdownMenuCheckboxItem } from '@ds/react';
import { DropdownMenuRadioGroup } from '@ds/react';
import { DropdownMenuRadioItem } from '@ds/react';
import { DropdownMenuLabel } from '@ds/react';
import { DropdownMenuSeparator } from '@ds/react';
import { DropdownMenuSub } from '@ds/react';
import { DropdownMenuSubTrigger } from '@ds/react';
import { DropdownMenuSubContent } from '@ds/react';
```

## When to use
- For a set of actions that don’t all fit on screen, e.g. a “More” menu on a card.
- For view options such as sort order or visible columns.

## When not to use
- To choose a value in a form. Use Select or RadioGroup.
- For navigation between pages. Use Navbar or links.
- When there are only one or two actions. Use Buttons.

## Item variant (`variant`)
- `default`: Ordinary actions.
- `danger`: Destructive actions such as Delete; place them last, after a separator.

## States
- **Closed**: Only the trigger shows. (Default.)
- **Open**: The menu shows below the trigger. (Trigger pressed, or Enter / Space / Arrow Down on it.)
- **Highlighted**: The item under the pointer or keyboard. (Hover or arrow keys.)
- **Checked**: A checkbox or radio item is on. (checked / value.)
- **Disabled**: The item can’t be used right now. (disabled on the item.)

## Props
### DropdownMenu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### DropdownMenuTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

### DropdownMenuContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sideOffset` | `number` | 4 | Distance from the trigger in px. |
| `asChild` | `boolean` |  |  |

### DropdownMenuItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "danger"` | default | `danger` for destructive actions such as Delete. |
| `asChild` | `boolean` |  |  |
| `icon` | `ReactNode` |  | Icon before the label. Hidden from screen readers. |
| `shortcut` | `string` |  | Keyboard shortcut hint shown at the end, e.g. "⌘D". Only a hint; wire the shortcut yourself. |

### DropdownMenuCheckboxItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |
| `shortcut` | `string` |  | Keyboard shortcut hint shown at the end, e.g. "⌘D". Only a hint; wire the shortcut yourself. |

### DropdownMenuRadioGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

### DropdownMenuRadioItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |
| `shortcut` | `string` |  | Keyboard shortcut hint shown at the end, e.g. "⌘D". Only a hint; wire the shortcut yourself. |

### DropdownMenuLabel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

### DropdownMenuSeparator

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

### DropdownMenuSub

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### DropdownMenuSubTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |
| `icon` | `ReactNode` |  | Icon before the label. Hidden from screen readers. |

### DropdownMenuSubContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` |  |  |

## Guidelines
- Do: Give the trigger a clear label or an icon with an accessible name. Don’t: Use an unlabelled “…” icon with no name. Why: People and screen readers need to know what the menu holds before opening it.
- Do: Put destructive items last, after a separator, in the danger variant. Don’t: Mix Delete in among everyday actions. Why: Separating risky actions prevents accidental clicks.
- Do: Keep menus short: about seven items or fewer. Don’t: Put long lists or forms inside a menu. Why: Long menus are hard to scan; use a dialog or page for complex choices.

## Content
- Start item labels with a verb: “Duplicate”, “Move to…”, “Delete”.
- Use an ellipsis (…) when an item needs more input before it happens.
- Group related items and put destructive ones last.

## Accessibility
- Role: button (trigger) with aria-haspopup="menu", and a menu with menuitem, menuitemcheckbox and menuitemradio items (Radix).
- Enter / Space / Arrow Down: Opens the menu from the trigger and focuses the first item.
- Arrow Up / Down: Moves between items.
- Letters: Jumps to the next item starting with that letter.
- Enter / Space: Chooses the focused item.
- Arrow Right / Left: Opens or closes a submenu.
- Escape: Closes the menu and returns focus to the trigger.
- `aria-haspopup, aria-expanded`: Set on the trigger automatically.
- `aria-checked`: Set on checkbox and radio items.
- `aria-hidden on icons and shortcuts`: They’re visual hints; labels carry the meaning.
- Focus: Focus moves into the menu when it opens and back to the trigger when it closes.
- WCAG 2.1.1 Keyboard: Everything works from the keyboard, per the WAI-ARIA menu button pattern.
- WCAG 2.4.3 Focus Order: Focus returns to the trigger after closing.
- WCAG 1.4.3 Contrast (Minimum): Items pass 4.5:1 at rest and highlighted, in every theme.
- WCAG 4.1.2 Name, Role, Value: Menu, items and checked states are exposed.
- Shortcut hints are shown only; wire the actual keyboard shortcuts in your app.

## Examples
### Actions menu
A button that opens actions.

```tsx
import { Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@ds/react';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button appearance="outline" variant="secondary">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onSelect={duplicate}>Duplicate</DropdownMenuItem>
    <DropdownMenuItem onSelect={archive}>Archive</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="danger" onSelect={remove}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Sort order
Radio items for one exclusive choice.

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, Button } from '@ds/react';

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button appearance="outline">Sort</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
    <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
      <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

### Icon trigger
An IconButton trigger with an accessible name.

```tsx
import { IconButton, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@ds/react';
import { Ellipsis } from 'lucide-react';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <IconButton icon={<Ellipsis />} label="More actions" appearance="ghost" variant="secondary" />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Rename</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Tokens: `--menu-*` (values per theme in ai/components/dropdown-menu.json).
