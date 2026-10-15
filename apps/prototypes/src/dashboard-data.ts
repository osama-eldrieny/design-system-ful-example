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

/* Overview */
export const revenueByMonth = months.map((month, i) => ({
  month,
  revenue: Math.round(38000 + i * 2900 + Math.sin(i / 1.3) * 5200),
  expenses: Math.round(24000 + i * 1300 + Math.cos(i / 1.6) * 3100),
}));
export const planMix = [
  { label: 'Business', value: 46 },
  { label: 'Starter', value: 31 },
  { label: 'Enterprise', value: 23 },
];

export const projects = [
  {
    id: 'marketing',
    name: 'Marketing site redesign',
    client: 'Ephemeral',
    progress: 72,
    due: 'Oct 28',
    status: 'On track' as const,
    tone: 'success' as const,
    team: [0, 1, 2, 3],
  },
  {
    id: 'mobile',
    name: 'Mobile app v2',
    client: 'Warpspeed',
    progress: 45,
    due: 'Nov 12',
    status: 'At risk' as const,
    tone: 'warning' as const,
    team: [1, 3, 4],
  },
  {
    id: 'billing',
    name: 'Billing migration',
    client: 'Convergence',
    progress: 91,
    due: 'Oct 19',
    status: 'On track' as const,
    tone: 'success' as const,
    team: [2, 5],
  },
  {
    id: 'design-system',
    name: 'Design system 2.0',
    client: 'Internal',
    progress: 28,
    due: 'Dec 3',
    status: 'Delayed' as const,
    tone: 'danger' as const,
    team: [0, 4, 5, 6, 7],
  },
];

export const meetings = [
  {
    id: 1,
    title: 'Weekly sync',
    time: '09:30 – 10:00',
    who: 'Product team',
    tone: 'primary' as const,
    day: 'Today',
  },
  {
    id: 2,
    title: 'Lunch with Olivia',
    time: '12:00 – 13:00',
    who: 'Olivia Rhye',
    tone: 'success' as const,
    day: 'Today',
  },
  {
    id: 3,
    title: 'Product demo',
    time: '13:30 – 14:30',
    who: 'Warpspeed',
    tone: 'blue' as const,
    day: 'Tomorrow',
  },
  {
    id: 4,
    title: 'Design review',
    time: '15:00 – 16:00',
    who: 'Design team',
    tone: 'purple' as const,
    day: 'Fri',
  },
];

/* Messages */
export const conversations = [
  {
    id: 'katherine',
    name: 'Katherine Moss',
    handle: '@kathy',
    src: avatars[1],
    time: '20 mins ago',
    preview: 'You: Sure thing, I’ll have a look today.',
    unread: false,
    online: true,
  },
  {
    id: 'phoenix',
    name: 'Phoenix Baker',
    handle: '@phoenix',
    src: avatars[0],
    time: '5 mins ago',
    preview: 'Hey Olivia, Katherine sent me the latest doc. Quick question…',
    unread: true,
    online: true,
  },
  {
    id: 'mollie',
    name: 'Mollie Hall',
    handle: '@mollie',
    src: avatars[2],
    time: '1 hour ago',
    preview: 'I’ve just published the site again. Looks like it fixed it.',
    unread: true,
    online: false,
  },
  {
    id: 'rosalee',
    name: 'Rosalee Melvin',
    handle: '@rosalee',
    src: undefined,
    time: '2 hours ago',
    preview: 'Thanks for chasing up the release for me.',
    unread: false,
    online: false,
  },
  {
    id: 'koray',
    name: 'Koray Okumus',
    handle: '@koray',
    src: avatars[3],
    time: '4 hours ago',
    preview: 'Thanks! Looks great!',
    unread: true,
    online: true,
  },
];
export const thread = [
  {
    id: 1,
    from: 'them',
    text: 'Thanks Olivia! Almost there. I’ll work on the changes you suggested and send them over.',
    time: 'Mon 2:20 pm',
  },
  {
    id: 2,
    from: 'them',
    text: 'I’ve finished the requirements doc and left notes for Phoenix.',
    time: 'Mon 2:21 pm',
  },
  {
    id: 3,
    from: 'them',
    file: { name: 'Tech requirements.pdf', size: '1.2 MB' },
    time: 'Mon 2:21 pm',
  },
  { id: 4, from: 'me', text: 'Awesome! Thanks. I’ll look at this today.', time: 'Mon 3:02 pm' },
  {
    id: 5,
    from: 'them',
    text: 'No rush though — we still have to wait for Lana’s designs.',
    time: 'Mon 3:05 pm',
  },
  {
    id: 6,
    from: 'them',
    text: 'Hey Olivia, can you please review the latest design when you can?',
    time: 'Today 9:41 am',
    divider: 'Today',
  },
  {
    id: 7,
    from: 'me',
    text: 'Sure thing, I’ll have a look today. They’re looking great!',
    time: 'Just now',
  },
];

/* Calendar (week of Oct 11–17, 2026; hours from 9:00) */
export const weekDays = ['Sun 11', 'Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17'];
export const events = [
  { id: 1, day: 1, start: 9.5, end: 10, title: 'Weekly sync', tone: 'primary' as const },
  { id: 2, day: 1, start: 11.5, end: 12.5, title: 'Coffee with Ali', tone: 'gray' as const },
  { id: 3, day: 1, start: 14.5, end: 16, title: 'Marketing site kickoff', tone: 'purple' as const },
  { id: 4, day: 3, start: 10, end: 11, title: 'Hiring panel', tone: 'orange' as const },
  { id: 5, day: 4, start: 12, end: 13, title: 'Lunch with Olivia', tone: 'success' as const },
  { id: 6, day: 5, start: 13.5, end: 15.5, title: 'Product demo', tone: 'blue' as const },
  { id: 7, day: 6, start: 11, end: 12.5, title: 'House inspection', tone: 'warning' as const },
  { id: 8, day: 2, start: 15, end: 16, title: 'Design review', tone: 'pink' as const },
];

/* Orders (invoices) */
export const invoiceOrders = [
  {
    id: 'INV-3066',
    date: 'Oct 6, 2026',
    status: 'Paid',
    customer: members[0],
    purchase: 'Monthly',
    amount: 120,
  },
  {
    id: 'INV-3065',
    date: 'Oct 6, 2026',
    status: 'Paid',
    customer: members[1],
    purchase: 'Monthly',
    amount: 120,
  },
  {
    id: 'INV-3064',
    date: 'Oct 6, 2026',
    status: 'Paid',
    customer: members[2],
    purchase: 'Yearly',
    amount: 1200,
  },
  {
    id: 'INV-3063',
    date: 'Oct 5, 2026',
    status: 'Paid',
    customer: members[3],
    purchase: 'Monthly',
    amount: 120,
  },
  {
    id: 'INV-3062',
    date: 'Oct 5, 2026',
    status: 'Refunded',
    customer: members[4],
    purchase: 'Monthly',
    amount: 120,
  },
  {
    id: 'INV-3061',
    date: 'Oct 5, 2026',
    status: 'Paid',
    customer: members[5],
    purchase: 'Yearly',
    amount: 1200,
  },
  {
    id: 'INV-3060',
    date: 'Oct 4, 2026',
    status: 'Cancelled',
    customer: members[6],
    purchase: 'Monthly',
    amount: 120,
  },
  {
    id: 'INV-3059',
    date: 'Oct 4, 2026',
    status: 'Pending',
    customer: members[7],
    purchase: 'Monthly',
    amount: 120,
  },
] as const;

/* Profile */
export const experience = [
  {
    role: 'Lead Product Designer',
    company: 'ContrastAI',
    period: 'May 2020 – Present',
    tone: 'purple' as const,
  },
  {
    role: 'Product Designer',
    company: 'Sisyphus',
    period: 'Jan 2018 – May 2020',
    tone: 'success' as const,
  },
  {
    role: 'UX Designer',
    company: 'Ephemeral',
    period: 'Mar 2017 – Jan 2018',
    tone: 'blue' as const,
  },
];
