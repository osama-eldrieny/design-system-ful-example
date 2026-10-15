/**
 * Sample data for Orbit, the SaaS prototype. Every figure is made up.
 */
export const avatars = [
  'assets/avatar-1.png',
  'assets/avatar-2.png',
  'assets/avatar-3.png',
  'assets/avatar-4.png',
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

export const traffic = Array.from({ length: 24 }, (_, i) => ({
  week: i % 2 === 0 ? months[Math.floor(i / 2)] : `${months[Math.floor(i / 2)]} 15`,
  users: Math.round(6200 + Math.sin(i / 2.2) * 1400 + i * 120 + (i % 3) * 300),
  sessions: Math.round(7600 + Math.sin(i / 2) * 1600 + i * 150 + (i % 4) * 280),
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

export const me = {
  name: 'Maya Okafor',
  email: 'maya@orbit.app',
  role: 'Head of Growth',
  location: 'Lisbon, Portugal',
  src: avatars[1],
};

/** People who appear across the app; some have photos, the rest show initials. */
export const people = [
  { name: 'Jenny Wilson', email: 'jenny@northwind.io', src: avatars[0], company: 'Northwind' },
  { name: 'Devon Lane', email: 'devon@acme.co', src: avatars[2], company: 'Acme' },
  { name: 'Kristin Watson', email: 'kristin@globex.com', company: 'Globex' },
  { name: 'Cody Fisher', email: 'cody@initech.com', src: avatars[3], company: 'Initech' },
  { name: 'Theresa Webb', email: 'theresa@umbrella.io', company: 'Umbrella' },
  { name: 'Courtney Henry', email: 'courtney@hooli.com', src: avatars[1], company: 'Hooli' },
  { name: 'Bessie Cooper', email: 'bessie@stark.dev', company: 'Stark' },
  { name: 'Francisco Gibbs', email: 'francisco@wayne.co', src: avatars[0], company: 'Wayne' },
];

export type Person = (typeof people)[number];

/* ------------------------------------------------------------ SaaS overview */

export type Range = 'weekly' | 'monthly' | 'yearly';

export const saasKpis: Record<
  Range,
  { label: string; value: string; change: string; up: boolean; good?: boolean }[]
> = {
  weekly: [
    { label: 'Total revenue', value: '$48,210', change: '2.5%', up: true },
    { label: 'Active users', value: '9,528', change: '9.5%', up: true },
    { label: 'Customer lifetime value', value: '$849.54', change: '1.6%', up: false },
    { label: 'Customer acquisition cost', value: '$41.20', change: '3.5%', up: true, good: false },
  ],
  monthly: [
    { label: 'Total revenue', value: '$200,458', change: '4.1%', up: true },
    { label: 'Active users', value: '24,310', change: '6.2%', up: true },
    { label: 'Customer lifetime value', value: '$862.10', change: '1.2%', up: true },
    { label: 'Customer acquisition cost', value: '$39.80', change: '2.1%', up: false, good: true },
  ],
  yearly: [
    { label: 'Total revenue', value: '$2.31M', change: '18.4%', up: true },
    { label: 'Active users', value: '61,904', change: '24.0%', up: true },
    { label: 'Customer lifetime value', value: '$905.32', change: '7.9%', up: true },
    { label: 'Customer acquisition cost', value: '$36.15', change: '9.3%', up: false, good: true },
  ],
};

/** New signups per month from web and mobile. */
export const userGrowth = months.map((month, i) => ({
  month,
  web: Math.round(1800 + i * 120 + Math.sin(i) * 220),
  mobile: Math.round(900 + i * 95 + Math.cos(i / 1.3) * 160),
}));

/** Monthly churn in percent. */
export const churn = months.map((month, i) => ({
  month,
  churn: Number((5.4 - i * 0.1 + Math.sin(i / 1.5) * 0.35).toFixed(2)),
}));

export const funnel = [
  { stage: 'Visited site', count: 48200 },
  { stage: 'Started trial', count: 9640 },
  { stage: 'Activated', count: 5210 },
  { stage: 'Subscribed', count: 2380 },
  { stage: 'Renewed', count: 1945 },
];

export type InvoiceStatus = 'Complete' | 'Pending' | 'Cancelled';

export const recentInvoices: {
  id: string;
  closed: string;
  person: Person;
  amount: string;
  status: InvoiceStatus;
}[] = [
  {
    id: '#DF429',
    closed: 'Apr 28, 2026',
    person: people[0],
    amount: '$473.85',
    status: 'Complete',
  },
  {
    id: '#HTY274',
    closed: 'Oct 30, 2026',
    person: people[1],
    amount: '$293.01',
    status: 'Complete',
  },
  { id: '#LKE600', closed: 'May 1, 2026', person: people[2], amount: '$782.01', status: 'Pending' },
  {
    id: '#HRP447',
    closed: 'Sep 12, 2026',
    person: people[3],
    amount: '$202.87',
    status: 'Cancelled',
  },
  {
    id: '#WRH647',
    closed: 'Jul 14, 2026',
    person: people[4],
    amount: '$490.51',
    status: 'Complete',
  },
  {
    id: '#QKX912',
    closed: 'Aug 3, 2026',
    person: people[5],
    amount: '$1,120.00',
    status: 'Pending',
  },
];

export const productPerformance = {
  daily: {
    label: 'Daily sales',
    figures: [
      { label: 'Digital products', value: '790' },
      { label: 'Physical products', value: '572' },
    ],
    total: { label: 'Average daily sales', value: '$2,950', change: '0.52%' },
    bars: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
      day,
      digital: 90 + ((i * 37) % 60),
      physical: 60 + ((i * 23) % 45),
    })),
  },
  online: {
    label: 'Online sales',
    figures: [
      { label: 'Digital products', value: '8,490' },
      { label: 'Physical products', value: '950' },
    ],
    total: { label: 'Total online sales', value: '$59,410', change: '0.52%' },
    bars: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
      day,
      digital: 1000 + ((i * 310) % 700),
      physical: 110 + ((i * 47) % 90),
    })),
  },
  users: {
    label: 'New users',
    figures: [
      { label: 'From web', value: '4,120' },
      { label: 'From mobile', value: '1,780' },
    ],
    total: { label: 'Total new users', value: '5.9K', change: '0.52%' },
    bars: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
      day,
      digital: 600 + ((i * 130) % 300),
      physical: 220 + ((i * 70) % 160),
    })),
  },
};

export const activities = [
  { who: people[7], action: 'paid invoice', ref: 'PQ-4491C', time: 'Just now' },
  { who: people[5], action: 'upgraded to Business', ref: 'HK-234G', time: '15 min ago' },
  { who: people[6], action: 'requested a refund for', ref: 'LH-2891C', time: '2 h ago' },
  {
    who: people[4],
    action: 'invited 4 teammates to',
    ref: 'Umbrella workspace',
    time: 'Yesterday',
  },
  { who: people[1], action: 'cancelled', ref: 'CK-125NH', time: '2 weeks ago' },
];

export const notifications = [
  { who: people[0], text: 'started a trial of the Business plan', time: '5 min ago', unread: true },
  {
    who: people[3],
    text: 'opened ticket #4281: SSO login loops',
    time: '22 min ago',
    unread: true,
  },
  { who: people[5], text: 'paid invoice #HK-234G', time: '1 h ago', unread: true },
  { who: people[2], text: 'commented on “Q4 roadmap”', time: 'Yesterday', unread: false },
];
