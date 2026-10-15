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

### Prototypes
- **One Panda dashboard** (`#/dashboard`), drawing on the layouts and content of Untitled UI's
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
  TailAdmin's page list; everything is built from `@ds/react`. 86 pages:
  - Dashboards: SaaS (home), eCommerce, Analytics, Marketing, CRM, Stocks, Logistics, AI, Sales,
    Finance.
  - AI assistant: text, image, code and video generators (one chat layout), AI settings.
  - E-commerce: products, add product, billing, invoices, single and create invoice,
    transactions, single transaction.
  - Calendar (month, week, day; add and edit events), profile, tasks (list and kanban).
  - Pages: file manager, pricing, FAQ, API keys, integrations, blank, 404, 500, 503, coming
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
