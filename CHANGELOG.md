# Changelog

## 1.1.0 — 2026-10-15 (Phase 9: dashboard-grade components)

More variants and new components so real dashboards can be built from the library, inspired
by Untitled UI React. Every new property is a component token.

### Tokens
- Category palette: gray, blue, sky, indigo, purple, pink, orange, teal (`themes/palette.css`),
  the same in every brand, light and dark.
- Chart colors `--color-chart-1…8`, grid, axis, positive and negative.
- Half-step sizing (`--sizing-4xs` … `--sizing-6xl`).
- Contrast: 2,430 checked pairs, 0 failures.

### New components
FeaturedIcon, BadgeGroup, MetricCard, Charts (LineChart, AreaChart, BarChart, DonutChart,
RadarChart, Sparkline), ProgressCircle, TableCard, AvatarLabelGroup, PageHeader, ActivityFeed,
FileUpload / FileUploadItem, CommandMenu, Calendar / DatePicker / DateRangePicker,
VerificationCodeInput.

### New variants
- **Badge:** 8 category hues, shapes (pill, rounded, modern), sizes, dot, icons, image,
  dismiss, icon-only.
- **Button:** xsmall and xlarge; `href` links; `loadingText`.
- **Avatar:** xsmall, verified mark, add button in groups.
- **Tag:** hues, sizes, count, image.
- **InputField:** prefix and suffix, shortcut hint, hint tooltip.
- **Select:** options with icon, avatar, dot and supporting text.
- **Tabs:** segmented and subtle, small, full width, counts.
- **Pagination:** labelled arrows, spread layout.
- **Progress:** value position. **Stepper:** icon and dot markers, small.
- **Breadcrumb:** slash, home icon, button style. **Divider:** label alignment.
- **Table:** column hints, responsive columns, 14px cells. **SideNav:** badges, collapsed,
  header and footer.
- **Modal:** featured icon, centered, xlarge. **Drawer:** sizes. **EmptyState:** sizes,
  illustration. **Alert:** banner. **Tooltip:** title and arrow. **Switch:** small.
  **ChooseCard:** icon.

### Breaking
- **ButtonGroup:** segmented selection (`value`, `defaultValue`, `onValueChange`) is removed;
  ButtonGroup groups actions only. To pick one of a few options, use
  `<Tabs appearance="segmented" panels={false}>`. The attached (joined) layout is removed too:
  buttons in a group are always spaced (`--button-group-border-width` removed). Every usage in the
  docs and prototypes is migrated.

### Fixes (from review comments)
- **Docs Introduction:** the component catalog is a grid of cards, each with a live preview on a
  faint grid, the name and "N components + M variants" (from each component's metadata).
- **Radius:** section surfaces (cards, sections, containers, choose cards, `--radius-2xl`) are
  16px in round and 24px in pills (new primitive `--radius-24`). The segmented tab bar's corner is
  concentric with its selected tab (tab radius + padding + border) in every radius style.
- **Theme coverage:** the named spacing and radius scales now change with density and radius, so
  every component built on them follows (before, only components with explicit overrides did).
  Compact makes `--spacing-sm` … `--spacing-5xl` one step smaller; square and pills reshape
  `--radius-2xs` … `--radius-4xl`. `--radius-full` stays round.
- **Tabs:** new `panels={false}` for using tabs as a selector without TabPanels (no aria-controls).
- **Theme showcase:** the product card is its own section on the wall (shadow and radius on the
  section, not on a card inside it); shorter title.
- **Tabs:** the selected pill and enclosed tab and the line indicator use the strong brand colour
  (like the primary button) in every brand and mode; the selected segment uses the new
  `--color-bg-raised`, so it's lifted in dark mode too.
- **Colors:** new semantic `--color-bg-raised` (white in light mode, a step lighter than the page in
  dark); new primitive `--color-amber-base-700`. Amber dark secondary text is now distinct from
  primary text (`--color-amber-neutral-700`, at least 5:1 on every dark surface).
- **MetricCard:** the chart grows to fill its row, beside the figures or below them.
- **Theme showcase:** tiles are elevated Cards, so the shadow and radius themes show on the wall.
- **Alert:** buttons in a solid alert's actions are inverted (new `--alerts-{variant}-solid-action-*`
  tokens) so they stay visible; text buttons take the alert's text colour.
- **Modal:** every size is at least `--modal-min-width` (the medium width), so confirmations aren't
  cramped; phones still fit the screen.
- **Card:** the theme placeholder image shows whole (contain); horizontal cards keep a minimum media
  height (`--card-horizontal-media-min-height`).
- **List:** ordered lists now show their numbers (`--list-number-*` tokens).
- **VerificationCodeInput:** boxes shrink evenly and stay square when the container is narrow.

### Prototypes
- **Theme showcase** (`#/demo`) replaces the old theme playground: a sticky bar with the seven theme
  axes (plus Reset and Copy attributes), a masonry wall of 18 component tiles on a dotted background,
  and a side-by-side comparison of any three themes. Arabic flips the page and translates its labels.
- **Panda removed.** The old dashboard, its app pages (projects, messages, calendar, orders,
  settings) and its frame are deleted; Orbit is the prototypes' home page. Old `#/dashboard`,
  `#/app/…` and `#/admin/…` links open the matching Orbit page.
- **One Panda dashboard** (since removed) (`#/dashboard`), drawing on the layouts and content of Untitled UI's
  19 dashboard examples: sparkline KPIs; a performance chart with tabbed figures; sales by
  channel; customer acquisition; a monthly goal gauge; recent orders with status filters; live
  purchases; top pages; active users by country. Full width.
- Shell: sidebar with ⌘K search, pages with badges, a promo card and the account menu; a slim
  (icon-only) variant and an optional end rail.
- Apps: Projects, Messages, Calendar, Orders and Settings. Old `#/admin…`, `#/app` and
  `#/dashboards/…` links redirect.
- InputField shrinks inside narrow flex and grid layouts (it overflowed phones).
- Panda header: a top bar with breadcrumbs, search, upgrade, settings, notifications and account;
  the dashboard header has actions, section tabs, periods, dates and filters. Settings rebuilt
  with a section list beside the selected section's cards (each with Cancel/Save) and a working
  Appearance section. Support removed from the sidebar.
- **Orbit, a SaaS prototype** (`#/saas`), separate from Panda. Its content and structure follow
  TailAdmin's page list; everything is built from `@ds/react`. 84 pages:
  - Dashboards: SaaS (home), eCommerce, Analytics, Marketing, CRM, Stocks, Logistics, AI, Sales,
    Finance.
  - AI assistant: text, image, code and video generators (one chat layout), AI settings.
  - E-commerce: products, add product, billing, invoices, single and create invoice,
    transactions, single transaction.
  - Calendar (month, week, day; add and edit events), profile, tasks (list and kanban).
  - Pages: file manager, pricing, FAQ, API keys, integrations, blank, 404, coming
    soon, maintenance, success.
  - Support: chat, tickets and reply, inbox and message.
  - Reference pages: forms, tables, charts, maps and 22 UI-element pages; six layout variants
    (full, slim, top navigation, dual-tier, boxed, side panel); sign in, sign up, reset
    password, two-step verification.
  - Shell: grouped sidebar that opens the current group, a drawer on small screens, ⌘K search
    over every page, a dark-mode toggle, notifications, and an account menu with language.
- `check:responsive` covers 19 Orbit pages.

## 1.0.0 — 2026-09-29

The first release of the rebuilt design system: code is the source of truth, and tokens,
components, docs, AI files and prototypes all come from this repository.

### Tokens (`@ds/tokens`)
- Plain CSS custom properties in three tiers (primitives → semantic themes → component tokens).
- Seven theme axes: brand (Diamond, Amber, Opal), mode, language (English, Arabic RTL),
  typeface, density, radius and shadow; `applyTheme()` and `<ThemeProvider>`.
- WCAG AA contrast in every brand and mode (1440 checked pairs, 0 failures).
- Fixes from the Figma export: Amber's warning palette (was purple), `--space-2` (was 0).

### Components (`@ds/react`) — 53
- **Actions:** Button, IconButton, ButtonGroup, Link
- **Forms:** FormField, InputField, Textarea, Checkbox, RadioGroup, Switch, Select, Combobox,
  SearchField, Slider
- **Feedback:** Alert, Badge, Tag, Toast, Progress, Spinner, Skeleton, EmptyState
- **Overlays:** Modal, Drawer, Popover, Tooltip, HoverCard, DropdownMenu
- **Navigation:** Tabs, Pagination, Breadcrumb, Stepper, SideNav
- **Data display:** Card, Table, List, Accordion, Avatar, Stat, Kbd, Code
- **Layout:** Stack, Inline, Grid, Container, Divider
- **Patterns:** ProductCard, ChooseCard, MeetingCard, AppsNotifications, Header, Footer, Logo, Navbar

Every component: its own tokens, keyboard support, stories in every theme and RTL, axe
checks, unit tests, a docs page and a machine-readable contract.

### Docs
- Storybook at the site root with a standard 18-section page per component, foundations,
  theming and AI guides, and Examples. Old static-doc URLs redirect to their new pages.

### AI readiness
- `AGENTS.md`, `ai/` contracts, `llms.txt` / `llms-full.txt`, `DESIGN.md`.
- `@ds/mcp` (local MCP server), `eslint-plugin-ds` and `ds-validate`, the `ds-builder`
  Agent Skill, an eval harness (not yet run), and CI drift guards.

### Quality
- Visual regression baselines, responsive check (375–1440 px, in CI), tree-shakable
  package build with a bundle-size report (library 35 kB gzipped).

### Prototypes
- Landing page, dashboard and a theme playground, built only from the library.
