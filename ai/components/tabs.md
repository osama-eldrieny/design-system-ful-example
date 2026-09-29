# Tabs

> Tabs switch between related views of content in the same place, one at a time. Tabs holds the state, TabList the row of Tab buttons, and each TabPanel the content for one tab.

Status: stable · Category: Navigation · Since 0.2.0

```tsx
import { Tabs } from '@ds/react';
import { TabList } from '@ds/react';
import { Tab } from '@ds/react';
import { TabPanel } from '@ds/react';
```

## When to use
- To organize related content into views people switch between without leaving the page.
- To filter one list by category, e.g. All / Electronics / Accessories.

## When not to use
- To navigate to other pages. Use Navbar or links.
- For content people need to compare side by side. Use Show it together.
- For a sequence of steps. Use Stepper.
- To choose a form value. Use RadioGroup.

## Appearance (`appearance`)
- `enclosed`: Tabs in a tinted container. Compact filters and toolbars.
- `pill`: Filled pill on the selected tab, no container. Light filtering inside cards.
- `line`: Underline under the selected tab. Page-level sections.

## Orientation (`orientation`)
- `horizontal`: Tabs in a row above the panel. Default.
- `vertical`: Tabs in a column beside the panel, e.g. settings with many sections. A row again on narrow screens.

## States
- **Default**: Not selected. (At rest.)
- **Hover**: Shows the tab responds to the pointer. (:hover.)
- **Selected**: Its panel is showing. (value matches the tab.)
- **Focus**: Shows keyboard focus. (:focus-visible; adds the focus ring.)
- **Disabled**: Not available right now. (disabled on a Tab.)

## Props
### Tabs

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` |  | Selected tab (controlled). Use with onValueChange. |
| `defaultValue` | `string` |  | Initially selected tab when uncontrolled. |
| `onValueChange` | `((value: string) => void)` |  | Called with the new tab's value. |
| `appearance` | `TabsAppearance` | enclosed | `enclosed` (default): tabs in a tinted container, for compact filters and toolbars. `pill`: filled pill on the selected tab, no container. `line`: underline, for page sections. |
| `orientation` | `"horizontal" \| "vertical"` | horizontal | `horizontal` (default): tabs in a row above the panel. `vertical`: tabs stacked in a column beside the panel, for settings pages with many sections; Up and Down arrows move between tabs. On narrow screens vertical tabs sit above the panel. |
| `children` | `ReactNode` |  | TabList and TabPanels. |

### TabList

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | What the tabs switch between, e.g. "Product categories". Announced with the tab list. |
| `children` | `ReactNode` |  | Tab elements. |

### Tab

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` |  | Matches the TabPanel this tab shows. |
| `icon` | `ReactNode` |  | Icon before the label. Hidden from screen readers. |
| `children` | `ReactNode` |  | Tab label. |

### TabPanel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` |  | The tab value this panel belongs to. |

## Guidelines
- Do: Use tabs for peer views of the same subject. Don’t: Use tabs as page navigation. Why: Tabs change content in place; links belong in navigation.
- Do: Keep to a handful of short tabs. Don’t: Squeeze in many tabs with long labels. Why: Too many tabs wrap and become hard to scan; consider a Select instead.
- Do: Select a sensible tab by default. Don’t: Show tabs with none selected. Why: A panel should always be visible so the page isn’t empty.

## Content
- Use one or two words per tab, in sentence case.
- Label the tab list with what it switches between, e.g. "Product categories".
- Keep the order stable; don’t reorder tabs based on use.

## Accessibility
- Role: tablist with tab buttons and tabpanel regions (Radix Tabs).
- Tab: Moves focus to the selected tab, then into the panel.
- Arrow Left / Right: Moves to and selects the previous or next tab.
- Home / End: Moves to the first or last tab.
- `aria-label on the tablist`: From TabList’s label prop.
- `aria-selected`: Set on the selected tab.
- `aria-controls / aria-labelledby`: Link each tab and its panel.
- Focus: Tabs and the panel show the focus ring when reached with the keyboard.
- WCAG 1.3.1 Info and Relationships: Tabs and panels are linked; the list is labelled.
- WCAG 1.4.3 Contrast (Minimum): Tab labels pass 4.5:1 in every state and theme.
- WCAG 2.1.1 Keyboard: Arrow keys, Home and End as in the WAI-ARIA tabs pattern.
- WCAG 4.1.2 Name, Role, Value: Exposed as tabs with their selected state.
- Selected tabs are shown with color and a heavier weight (and an underline in the line appearance), not color alone.

## Examples
### Sections of a page
Line tabs with a panel per tab.

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@ds/react';

<Tabs defaultValue="overview" appearance="line">
  <TabList label="Project">
    <Tab value="overview">Overview</Tab>
    <Tab value="activity">Activity</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  <TabPanel value="overview">…</TabPanel>
  <TabPanel value="activity">…</TabPanel>
  <TabPanel value="settings">…</TabPanel>
</Tabs>
```

### Filtering one list
One panel shows the list for the selected tab.

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@ds/react';

<Tabs value={category} onValueChange={setCategory}>
  <TabList label="Product categories">
    <Tab value="all">All</Tab>
    <Tab value="electronics">Electronics</Tab>
  </TabList>
  <TabPanel value={category}>
    <ProductGrid category={category} />
  </TabPanel>
</Tabs>
```

### With icons
Icons support the labels.

```tsx
import { Tabs, TabList, Tab } from '@ds/react';
import { LayoutGrid, Laptop } from 'lucide-react';

<Tabs defaultValue="all" appearance="pill">
  <TabList label="Categories">
    <Tab value="all" icon={<LayoutGrid />}>All</Tab>
    <Tab value="electronics" icon={<Laptop />}>Electronics</Tab>
  </TabList>
</Tabs>
```

Tokens: `--tabs-*` (values per theme in ai/components/tabs.json).
