/**
 * Sample data for the admin prototypes (dashboard, analytics, customers, finance, settings).
 * Content follows common SaaS dashboard patterns; every figure is made up.
 */

export const avatars = [
  'assets/avatar-1.png',
  'assets/avatar-2.png',
  'assets/avatar-3.png',
  'assets/avatar-4.png',
];

export const members = [
  {
    name: 'Olivia Rhye',
    email: 'olivia@panda.io',
    since: 'Feb 2026',
    role: 'Product Designer',
    src: avatars[1],
    team: 'Design',
    active: 'Mar 14, 2026',
    added: 'Feb 22, 2026',
    admin: true,
  },
  {
    name: 'Phoenix Baker',
    email: 'phoenix@panda.io',
    since: 'Jan 2026',
    role: 'Product Manager',
    src: avatars[0],
    team: 'Product',
    active: 'Mar 12, 2026',
    added: 'Feb 22, 2026',
    admin: true,
  },
  {
    name: 'Lana Steiner',
    email: 'lana@panda.io',
    since: 'Mar 2026',
    role: 'Frontend Developer',
    src: avatars[2],
    team: 'Engineering',
    active: 'Mar 12, 2026',
    added: 'Feb 22, 2026',
    admin: true,
  },
  {
    name: 'Demi Wilkinson',
    email: 'demi@panda.io',
    since: 'Feb 2026',
    role: 'Backend Developer',
    src: avatars[3],
    team: 'Engineering',
    active: 'Mar 14, 2026',
    added: 'Feb 22, 2026',
    admin: false,
  },
  {
    name: 'Candice Wu',
    email: 'candice@panda.io',
    since: 'Mar 2026',
    role: 'Fullstack Developer',
    src: undefined,
    team: 'Engineering',
    active: 'Mar 13, 2026',
    added: 'Feb 23, 2026',
    admin: false,
  },
  {
    name: 'Natali Craig',
    email: 'natali@panda.io',
    since: 'Apr 2026',
    role: 'UX Researcher',
    src: avatars[1],
    team: 'Design',
    active: 'Mar 14, 2026',
    added: 'Mar 1, 2026',
    admin: false,
  },
  {
    name: 'Drew Cano',
    email: 'drew@panda.io',
    since: 'Apr 2026',
    role: 'Customer Success',
    src: avatars[0],
    team: 'Operations',
    active: 'Mar 12, 2026',
    added: 'Mar 2, 2026',
    admin: false,
  },
  {
    name: 'Orlando Diggs',
    email: 'orlando@panda.io',
    since: 'May 2026',
    role: 'Sales Lead',
    src: undefined,
    team: 'Sales',
    active: 'Mar 12, 2026',
    added: 'Mar 4, 2026',
    admin: false,
  },
];

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** Monthly recurring revenue, this year and last year. */
export const mrr = months.map((month, i) => ({
  month,
  mrr: Math.round(11200 + i * 640 + Math.sin(i / 1.4) * 900),
  last: Math.round(9800 + i * 420 + Math.cos(i / 1.8) * 700),
}));

export type Period = '12m' | '30d' | '7d' | '24h';
export const periods: { value: Period; label: string }[] = [
  { value: '12m', label: '12 months' },
  { value: '30d', label: '30 days' },
  { value: '7d', label: '7 days' },
  { value: '24h', label: '24 hours' },
];

export const kpis: Record<
  Period,
  { mrr: string; mrrChange: string; members: string; paid: string; open: string }
> = {
  '12m': { mrr: '$18,880', mrrChange: '7.4%', members: '4,862', paid: '2,671', open: '82%' },
  '30d': { mrr: '$18,880', mrrChange: '3.1%', members: '612', paid: '304', open: '79%' },
  '7d': { mrr: '$4,410', mrrChange: '1.2%', members: '148', paid: '71', open: '81%' },
  '24h': { mrr: '$642', mrrChange: '0.4%', members: '22', paid: '9', open: '84%' },
};

export const salesCards = [
  {
    label: 'Sales',
    value: '$2,114.40',
    change: '2.4%',
    trend: 'up' as const,
    spark: [12, 14, 13, 16, 15, 18, 17, 21, 20, 24],
  },
  {
    label: 'Orders',
    value: '24',
    change: '8.6%',
    trend: 'up' as const,
    spark: [3, 5, 4, 6, 5, 4, 7, 6, 8, 7],
  },
  {
    label: 'Average order value',
    value: '$88.10',
    change: '6.0%',
    trend: 'up' as const,
    spark: [80, 82, 86, 84, 83, 85, 84, 82, 86, 90],
  },
];

export const purchases = [
  {
    name: 'Demi Wilkinson',
    product: 'Webflow 101',
    time: '2 min ago',
    src: avatars[3],
    unread: true,
  },
  { name: 'Aliah Lane', product: 'SEO Masterclass', time: '1 hour ago', src: avatars[1] },
  { name: 'Lana Steiner', product: 'Figma Mockups', time: '3 hours ago', src: avatars[2] },
  { name: 'Candice Wu', product: 'Webflow 101', time: 'Yesterday', src: undefined },
  { name: 'Koray Okumus', product: 'The Dashboard Bundle', time: 'Mon', src: avatars[0] },
];

export type OrderStatus = 'Paid' | 'Refunded' | 'Pending';
export const recentOrders = [
  {
    id: '#26678',
    date: 'Jan 16, 2026',
    status: 'Paid' as OrderStatus,
    amount: 100.14,
    customer: 'Sienna Hewitt',
    email: 'hi@siennahewitt.com',
    src: avatars[1],
  },
  {
    id: '#26677',
    date: 'Jan 16, 2026',
    status: 'Paid' as OrderStatus,
    amount: 96.32,
    customer: 'Ammar Foley',
    email: 'ammarfoley@gmail.com',
    src: avatars[0],
  },
  {
    id: '#26676',
    date: 'Jan 15, 2026',
    status: 'Refunded' as OrderStatus,
    amount: 104.24,
    customer: 'Pippa Wilkinson',
    email: 'pippa@pippaw.com',
    src: undefined,
  },
  {
    id: '#26675',
    date: 'Jan 14, 2026',
    status: 'Paid' as OrderStatus,
    amount: 88.48,
    customer: 'Olly Schroeder',
    email: 'olly_s@icloud.com',
    src: avatars[3],
  },
  {
    id: '#26674',
    date: 'Jan 14, 2026',
    status: 'Pending' as OrderStatus,
    amount: 96.32,
    customer: 'Mathilde Lewis',
    email: 'mathilde@hey.com',
    src: avatars[2],
  },
  {
    id: '#26673',
    date: 'Jan 14, 2026',
    status: 'Paid' as OrderStatus,
    amount: 107.1,
    customer: 'Julius Vaughan',
    email: 'juliusvaughan@gmail.com',
    src: avatars[0],
  },
  {
    id: '#26672',
    date: 'Jan 14, 2026',
    status: 'Refunded' as OrderStatus,
    amount: 82.04,
    customer: 'Zaid Schwartz',
    email: 'zaid@zaidstudio.com',
    src: undefined,
  },
  {
    id: '#26671',
    date: 'Jan 13, 2026',
    status: 'Paid' as OrderStatus,
    amount: 74.5,
    customer: 'Ava Wright',
    email: 'ava@wright.co',
    src: avatars[1],
  },
];

export const posts = [
  {
    title: 'UX review presentations',
    excerpt: 'How do you create compelling presentations that wow your colleagues?',
    author: 'Olivia Rhye',
    date: '20 Jan 2026',
    tags: [
      { label: 'Design', tone: 'purple' as const },
      { label: 'Research', tone: 'blue' as const },
    ],
  },
  {
    title: 'Migrating to Linear 101',
    excerpt: 'Linear helps streamline software projects, sprints and bug tracking.',
    author: 'Phoenix Baker',
    date: '19 Jan 2026',
    tags: [
      { label: 'Product', tone: 'sky' as const },
      { label: 'Tools', tone: 'pink' as const },
    ],
  },
];

/* Analytics */
export const traffic = Array.from({ length: 24 }, (_, i) => ({
  week: i % 2 === 0 ? months[Math.floor(i / 2)] : `${months[Math.floor(i / 2)]} 15`,
  users: Math.round(6200 + Math.sin(i / 2.2) * 1400 + i * 120 + (i % 3) * 300),
  sessions: Math.round(7600 + Math.sin(i / 2) * 1600 + i * 150 + (i % 4) * 280),
}));
export const acquisition = months.map((month, i) => ({
  month,
  direct: 1400 + ((i * 230) % 900),
  organic: 1800 + ((i * 310) % 1200),
  referral: 700 + ((i * 170) % 600),
}));
export const weekdayTraffic = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
  day,
  desktop: [820, 760, 640, 690, 580, 420, 380][i],
  mobile: [540, 610, 520, 580, 640, 880, 790][i],
  tablet: [220, 260, 240, 210, 190, 310, 280][i],
}));
export const countries = [
  { label: 'United States', value: 38 },
  { label: 'India', value: 21 },
  { label: 'United Kingdom', value: 14 },
  { label: 'Germany', value: 11 },
  { label: 'Canada', value: 9 },
  { label: 'Other', value: 7 },
];
export const topPages = [
  { path: '/pricing', views: 18240, change: 12.4 },
  { path: '/blog/ux-review', views: 12410, change: 8.1 },
  { path: '/docs/getting-started', views: 9880, change: -2.3 },
  { path: '/features', views: 7420, change: 4.6 },
  { path: '/changelog', views: 3910, change: 21.9 },
];

/* Customers */
export type CustomerStatus = 'Customer' | 'Churned' | 'Trial';
export const companies = [
  {
    name: 'Ephemeral',
    domain: 'ephemeral.io',
    status: 'Customer' as CustomerStatus,
    about: 'Content curating app',
    detail: 'Brings all your news into one place',
    license: 70,
    users: 12,
    category: 'Media',
  },
  {
    name: 'Stack3d Lab',
    domain: 'stack3dlab.com',
    status: 'Churned' as CustomerStatus,
    about: 'Design software',
    detail: 'Super lightweight design app',
    license: 60,
    users: 8,
    category: 'Design',
  },
  {
    name: 'Warpspeed',
    domain: 'getwarpspeed.com',
    status: 'Customer' as CustomerStatus,
    about: 'Data prediction',
    detail: 'AI and machine learning data',
    license: 30,
    users: 21,
    category: 'AI',
  },
  {
    name: 'CloudWatch',
    domain: 'cloudwatch.app',
    status: 'Trial' as CustomerStatus,
    about: 'Productivity app',
    detail: 'Time management and productivity',
    license: 80,
    users: 5,
    category: 'Productivity',
  },
  {
    name: 'ContrastAI',
    domain: 'contrastai.com',
    status: 'Churned' as CustomerStatus,
    about: 'Web app integrations',
    detail: 'Connect web apps seamlessly',
    license: 20,
    users: 3,
    category: 'AI',
  },
  {
    name: 'Convergence',
    domain: 'convergence.io',
    status: 'Customer' as CustomerStatus,
    about: 'Sales CRM',
    detail: 'Web-based sales doc management',
    license: 10,
    users: 14,
    category: 'Sales',
  },
  {
    name: 'Sisyphus',
    domain: 'sisyphus.com',
    status: 'Customer' as CustomerStatus,
    about: 'Automation and workflow',
    detail: 'Time tracking, invoicing and expenses',
    license: 40,
    users: 9,
    category: 'Productivity',
  },
];

/* Finance */
export const balance = months.map((month, i) => ({
  month,
  income: Math.round(8200 + Math.sin(i / 1.5) * 1200 + i * 260),
  spending: Math.round(6100 + Math.cos(i / 1.7) * 900 + i * 140),
}));
export type Category = 'Subscriptions' | 'Food and dining' | 'Income' | 'Groceries' | 'Travel';
export const categoryTone: Record<Category, 'blue' | 'pink' | 'success' | 'purple' | 'orange'> = {
  Subscriptions: 'blue',
  'Food and dining': 'pink',
  Income: 'success',
  Groceries: 'purple',
  Travel: 'orange',
};
export const transactions = [
  {
    id: 1,
    name: 'Spotify',
    amount: -18.99,
    category: 'Subscriptions' as Category,
    account: 'Visa •••• 1234',
    date: 'Jan 16',
  },
  {
    id: 2,
    name: 'A Coffee',
    amount: -4.5,
    category: 'Food and dining' as Category,
    account: 'Visa •••• 1234',
    date: 'Jan 16',
  },
  {
    id: 3,
    name: 'Stripe payout',
    amount: 880,
    category: 'Income' as Category,
    account: 'Mastercard •••• 4402',
    date: 'Jan 15',
  },
  {
    id: 4,
    name: 'Figma',
    amount: -15,
    category: 'Subscriptions' as Category,
    account: 'Visa •••• 1234',
    date: 'Jan 15',
  },
  {
    id: 5,
    name: 'Fresh F&V',
    amount: -40.2,
    category: 'Groceries' as Category,
    account: 'Visa •••• 1234',
    date: 'Jan 14',
  },
  {
    id: 6,
    name: 'Lufthansa',
    amount: -312.4,
    category: 'Travel' as Category,
    account: 'Mastercard •••• 4402',
    date: 'Jan 13',
  },
  {
    id: 7,
    name: 'TBF Bakery',
    amount: -12.5,
    category: 'Food and dining' as Category,
    account: 'Visa •••• 1234',
    date: 'Jan 12',
  },
];
export const budgets = [
  { label: 'Subscriptions', spent: 75, limit: 100, tone: 'primary' as const },
  { label: 'Food and dining', spent: 280, limit: 400, tone: 'warning' as const },
  { label: 'Groceries', spent: 300, limit: 500, tone: 'success' as const },
  { label: 'Travel', spent: 940, limit: 1000, tone: 'danger' as const },
];

/* Settings */
export const invoices = ['Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul'].map((m, i) => ({
  id: `INV-${2026}${12 - i}`,
  plan: `Business plan – ${m} 2026`,
  amount: 'USD $20.00',
  date: `${m} 1, 2026`,
  status: i === 0 ? 'Pending' : 'Paid',
}));
export const integrations = [
  {
    id: 'chat',
    name: 'Team chat',
    description: 'Send order and alert notifications to channels.',
    on: true,
  },
  { id: 'calendar', name: 'Calendar', description: 'Sync meetings and deadlines.', on: true },
  { id: 'storage', name: 'Cloud storage', description: 'Attach files from your drive.', on: false },
  { id: 'crm', name: 'CRM', description: 'Keep customers in sync both ways.', on: false },
];
