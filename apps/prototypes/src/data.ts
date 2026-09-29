/** Sample data shared by the prototypes. */

export type Category = 'audio' | 'wearables' | 'accessories' | 'workspace';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image?: string;
  colors: string[];
  sizes?: string[];
  stock: number;
  tags: string[];
}

export const categories: { id: Category; label: string }[] = [
  { id: 'audio', label: 'Audio' },
  { id: 'wearables', label: 'Wearables' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'workspace', label: 'Workspace' },
];

export const products: Product[] = [
  {
    id: 'headphones-pro',
    title: 'Wireless Headphones Pro',
    description: 'Adaptive noise cancelling, 30-hour battery and spatial audio.',
    category: 'audio',
    price: 299,
    oldPrice: 399,
    rating: 4.8,
    reviews: 2342,
    image: 'assets/card-image-diamond.png',
    colors: ['Graphite', 'Silver', 'Sky'],
    stock: 12,
    tags: ['Bestseller', 'Sale'],
  },
  {
    id: 'earbuds-air',
    title: 'Earbuds Air',
    description: 'All-day comfort with a pocket-size charging case.',
    category: 'audio',
    price: 179,
    rating: 4.6,
    reviews: 3120,
    colors: ['White', 'Black'],
    stock: 40,
    tags: ['New'],
  },
  {
    id: 'speaker-360',
    title: 'Speaker 360',
    description: 'Room-filling sound with 360° audio and 20-hour battery.',
    category: 'audio',
    price: 89,
    rating: 4.3,
    reviews: 1523,
    colors: ['Sand', 'Forest'],
    stock: 0,
    tags: [],
  },
  {
    id: 'watch-series',
    title: 'Smart Watch Series 5',
    description: 'Health tracking, GPS and a week of battery.',
    category: 'wearables',
    price: 199,
    oldPrice: 249,
    rating: 4.6,
    reviews: 1856,
    colors: ['Midnight', 'Starlight'],
    sizes: ['41 mm', '45 mm'],
    stock: 7,
    tags: ['Sale'],
  },
  {
    id: 'fit-band',
    title: 'Fit Band 2',
    description: 'Slim tracker for sleep, steps and heart rate.',
    category: 'wearables',
    price: 59,
    rating: 4.1,
    reviews: 876,
    colors: ['Black', 'Coral'],
    sizes: ['S', 'M', 'L'],
    stock: 25,
    tags: [],
  },
  {
    id: 'charger-fast',
    title: 'Fast Charger 65 W',
    description: 'Charges a laptop and phone at once, 3× faster.',
    category: 'accessories',
    price: 79,
    rating: 4.4,
    reviews: 942,
    colors: ['White'],
    stock: 60,
    tags: [],
  },
  {
    id: 'power-bank',
    title: 'Power Bank 20k',
    description: 'Two full phone charges in a slim case.',
    category: 'accessories',
    price: 49,
    oldPrice: 69,
    rating: 4.5,
    reviews: 3214,
    colors: ['Black', 'Blue'],
    stock: 18,
    tags: ['Sale'],
  },
  {
    id: 'hub-usb-c',
    title: 'USB-C Hub 7-in-1',
    description: 'HDMI, card reader and 100 W pass-through charging.',
    category: 'accessories',
    price: 59,
    oldPrice: 79,
    rating: 4.2,
    reviews: 876,
    colors: ['Space grey'],
    stock: 30,
    tags: [],
  },
  {
    id: 'keyboard-mech',
    title: 'Mechanical Keyboard',
    description: 'Hot-swap switches, backlight and aluminium frame.',
    category: 'workspace',
    price: 149,
    oldPrice: 199,
    rating: 4.7,
    reviews: 2156,
    colors: ['Graphite', 'White'],
    sizes: ['75%', 'Full size'],
    stock: 9,
    tags: ['Bestseller'],
  },
  {
    id: 'mouse-pro',
    title: 'Wireless Mouse Pro',
    description: 'Ergonomic shape with precision tracking.',
    category: 'workspace',
    price: 49,
    rating: 4.6,
    reviews: 1234,
    colors: ['Black', 'Grey'],
    stock: 50,
    tags: [],
  },
  {
    id: 'webcam-4k',
    title: 'Webcam 4K',
    description: 'Sharp video and a privacy shutter for calls.',
    category: 'workspace',
    price: 129,
    oldPrice: 179,
    rating: 4.4,
    reviews: 1987,
    colors: ['Black'],
    stock: 3,
    tags: ['Sale'],
  },
  {
    id: 'laptop-stand',
    title: 'Laptop Stand',
    description: 'Raises your screen to eye level; folds flat.',
    category: 'workspace',
    price: 59,
    rating: 4.5,
    reviews: 2345,
    colors: ['Silver', 'Black'],
    stock: 22,
    tags: [],
  },
];

export const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

export const people = [
  {
    name: 'Osama Eldrieny',
    role: 'Founder',
    avatar: 'assets/avatar-1.png',
    status: 'online' as const,
  },
  {
    name: 'Sarah Chen',
    role: 'Head of Products',
    avatar: 'assets/avatar-2.png',
    status: 'busy' as const,
  },
  {
    name: 'Maria Garcia',
    role: 'Design Lead',
    avatar: 'assets/avatar-3.png',
    status: 'away' as const,
  },
  {
    name: 'James Wilson',
    role: 'Engineering Director',
    avatar: 'assets/avatar-4.png',
    status: 'offline' as const,
  },
];

export type OrderStatus = 'Paid' | 'Pending' | 'Shipped' | 'Refunded' | 'Failed';
export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
}

const customers = [
  'Lina Haddad',
  'Tom Becker',
  'Aisha Khan',
  'Diego Ruiz',
  'Mei Tanaka',
  'Noah Smith',
  'Sara Ali',
  'Jonas Berg',
  'Priya Nair',
  'Omar Farouk',
  'Emma Rossi',
  'Liam Walsh',
];
const statuses: OrderStatus[] = [
  'Paid',
  'Pending',
  'Shipped',
  'Paid',
  'Refunded',
  'Paid',
  'Failed',
  'Shipped',
];
export const orders: Order[] = Array.from({ length: 36 }, (_, i) => {
  const customer = customers[i % customers.length];
  return {
    id: `#${1024 + i}`,
    customer,
    email: `${customer.split(' ')[0].toLowerCase()}@example.com`,
    date: `2026-09-${String(28 - (i % 27)).padStart(2, '0')}`,
    items: (i % 4) + 1,
    total: Math.round((39 + ((i * 73) % 420)) * 100) / 100,
    status: statuses[i % statuses.length],
  };
});

export const statusTone = {
  Paid: 'success',
  Shipped: 'primary',
  Pending: 'warning',
  Refunded: 'secondary',
  Failed: 'danger',
} as const;
