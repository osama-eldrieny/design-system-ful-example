/**
 * Orbit's page map: drives the sidebar, the command menu and the page titles.
 * Content and structure follow TailAdmin's page list; every page is built from @ds/react.
 */
import type { ReactNode } from 'react';
import {
  Bot,
  Calendar,
  ChartPie,
  FileText,
  FormInput,
  Headset,
  LayoutDashboard,
  LayoutTemplate,
  ListTodo,
  Lock,
  Mail,
  Map,
  MessageCircle,
  Palette,
  ShoppingCart,
  Table2,
  UserCircle,
} from 'lucide-react';

export interface NavPage {
  /** Path after #/saas, e.g. "/dashboards/analytics". "" is the home page. */
  path: string;
  label: string;
}

export interface NavGroup {
  id: string;
  label: string;
  icon: ReactNode;
  /** A single page, or a group of pages. */
  path?: string;
  pages?: NavPage[];
}

const p = (base: string, list: [string, string][]): NavPage[] =>
  list.map(([slug, label]) => ({ path: `${base}/${slug}`, label }));

export const navSections: { title: string; groups: NavGroup[] }[] = [
  {
    title: 'Menu',
    groups: [
      {
        id: 'dashboards',
        label: 'Dashboard',
        icon: <LayoutDashboard />,
        pages: [
          { path: '', label: 'SaaS' },
          ...p('/dashboards', [
            ['ecommerce', 'eCommerce'],
            ['analytics', 'Analytics'],
            ['marketing', 'Marketing'],
            ['crm', 'CRM'],
            ['stocks', 'Stocks'],
            ['logistics', 'Logistics'],
            ['ai', 'AI'],
            ['sales', 'Sales'],
            ['finance', 'Finance'],
          ]),
        ],
      },
      {
        id: 'ai',
        label: 'AI Assistant',
        icon: <Bot />,
        pages: p('/ai', [
          ['text', 'Text generator'],
          ['image', 'Image generator'],
          ['code', 'Code generator'],
          ['video', 'Video generator'],
          ['settings', 'AI settings'],
        ]),
      },
      {
        id: 'commerce',
        label: 'E-commerce',
        icon: <ShoppingCart />,
        pages: p('/commerce', [
          ['products', 'Products'],
          ['add-product', 'Add product'],
          ['billing', 'Billing'],
          ['invoices', 'Invoices'],
          ['invoice', 'Single invoice'],
          ['create-invoice', 'Create invoice'],
          ['transactions', 'Transactions'],
          ['transaction', 'Single transaction'],
        ]),
      },
      { id: 'calendar', label: 'Calendar', icon: <Calendar />, path: '/calendar' },
      { id: 'profile', label: 'User profile', icon: <UserCircle />, path: '/profile' },
      {
        id: 'tasks',
        label: 'Task',
        icon: <ListTodo />,
        pages: p('/tasks', [
          ['list', 'List'],
          ['kanban', 'Kanban'],
        ]),
      },
      {
        id: 'forms',
        label: 'Forms',
        icon: <FormInput />,
        pages: p('/forms', [
          ['elements', 'Form elements'],
          ['layout', 'Form layout'],
        ]),
      },
      {
        id: 'tables',
        label: 'Tables',
        icon: <Table2 />,
        pages: p('/tables', [
          ['basic', 'Basic tables'],
          ['data', 'Data tables'],
        ]),
      },
      {
        id: 'pages',
        label: 'Pages',
        icon: <FileText />,
        pages: p('/pages', [
          ['files', 'File manager'],
          ['pricing', 'Pricing tables'],
          ['faq', 'FAQ'],
          ['api-keys', 'API keys'],
          ['integrations', 'Integrations'],
          ['blank', 'Blank page'],
          ['404', '404 error'],
          ['500', '500 error'],
          ['503', '503 error'],
          ['coming-soon', 'Coming soon'],
          ['maintenance', 'Maintenance'],
          ['success', 'Success'],
        ]),
      },
      {
        id: 'layouts',
        label: 'Layouts',
        icon: <LayoutTemplate />,
        pages: p('/layouts', [
          ['1', 'Full sidebar'],
          ['2', 'Slim sidebar'],
          ['3', 'Top navigation'],
          ['4', 'Dual-tier header'],
          ['5', 'Boxed'],
          ['6', 'With side panel'],
        ]),
      },
    ],
  },
  {
    title: 'Support',
    groups: [
      { id: 'chat', label: 'Chat', icon: <MessageCircle />, path: '/support/chat' },
      {
        id: 'tickets',
        label: 'Support tickets',
        icon: <Headset />,
        pages: p('/support', [
          ['tickets', 'Ticket list'],
          ['ticket', 'Ticket reply'],
        ]),
      },
      {
        id: 'email',
        label: 'Email',
        icon: <Mail />,
        pages: p('/support', [
          ['inbox', 'Inbox'],
          ['message', 'Details'],
        ]),
      },
    ],
  },
  {
    title: 'Others',
    groups: [
      {
        id: 'charts',
        label: 'Charts',
        icon: <ChartPie />,
        pages: p('/charts', [
          ['line', 'Line chart'],
          ['bar', 'Bar chart'],
          ['pie', 'Pie chart'],
          ['radar', 'Radar chart'],
          ['radial', 'Radial chart'],
        ]),
      },
      {
        id: 'maps',
        label: 'Maps',
        icon: <Map />,
        pages: p('/maps', [
          ['dots', 'Maps'],
          ['vector', 'Vector maps'],
        ]),
      },
      {
        id: 'ui',
        label: 'UI elements',
        icon: <Palette />,
        pages: p('/ui', [
          ['alerts', 'Alerts'],
          ['avatars', 'Avatars'],
          ['badges', 'Badges'],
          ['breadcrumb', 'Breadcrumb'],
          ['buttons', 'Buttons'],
          ['button-groups', 'Button groups'],
          ['cards', 'Cards'],
          ['carousel', 'Carousel'],
          ['dropdowns', 'Dropdowns'],
          ['images', 'Images'],
          ['links', 'Links'],
          ['lists', 'Lists'],
          ['modals', 'Modals'],
          ['notifications', 'Notifications'],
          ['pagination', 'Pagination'],
          ['popovers', 'Popovers'],
          ['progress', 'Progress bars'],
          ['ribbons', 'Ribbons'],
          ['spinners', 'Spinners'],
          ['tabs', 'Tabs'],
          ['tooltips', 'Tooltips'],
          ['videos', 'Videos'],
        ]),
      },
      {
        id: 'auth',
        label: 'Authentication',
        icon: <Lock />,
        pages: p('/auth', [
          ['sign-in', 'Sign in'],
          ['sign-up', 'Sign up'],
          ['reset', 'Reset password'],
          ['verify', 'Two-step verification'],
        ]),
      },
    ],
  },
];

/** Every page, flat, with the group it sits in. */
export const allPages: (NavPage & { group: string; icon: ReactNode })[] = navSections.flatMap((s) =>
  s.groups.flatMap((g) =>
    g.pages
      ? g.pages.map((pg) => ({ ...pg, group: g.label, icon: g.icon }))
      : [{ path: g.path!, label: g.label, group: g.label, icon: g.icon }],
  ),
);

export const pageFor = (path: string) => allPages.find((pg) => pg.path === path);

/** Pages shown without the app frame. */
export const isBare = (path: string) =>
  path.startsWith('/auth/') ||
  [
    '/pages/404',
    '/pages/500',
    '/pages/503',
    '/pages/coming-soon',
    '/pages/maintenance',
    '/pages/success',
  ].includes(path);
