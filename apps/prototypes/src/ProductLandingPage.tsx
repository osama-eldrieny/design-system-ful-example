import { useMemo, useState } from 'react';
import {
  AppsNotifications,
  Avatar,
  Button,
  Card,
  CardBody,
  ChooseCard,
  ChooseCardGroup,
  Container,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmptyState,
  Footer,
  Grid,
  Inline,
  InputField,
  Logo,
  MeetingCard,
  Navbar,
  Pagination,
  ProductCard,
  Radio,
  RadioGroup,
  SearchField,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  useToast,
} from '@ds/react';
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Box,
  ChevronDown,
  Flame,
  Laptop,
  Mail,
  SearchX,
  ShoppingBag,
  SlidersHorizontal,
  Star,
} from 'lucide-react';

type Category = 'electronics' | 'accessories';
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: Category;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Premium Wireless Headphones Pro',
    description: 'High-quality sound with noise cancellation',
    price: 299,
    oldPrice: 399,
    rating: 4.8,
    reviews: 2342,
    category: 'electronics',
  },
  {
    id: 2,
    title: 'Smart Watch Pro Series',
    description: 'Advanced fitness tracking and notifications',
    price: 199,
    oldPrice: 249,
    rating: 4.6,
    reviews: 1856,
    category: 'electronics',
  },
  {
    id: 3,
    title: 'Ultra Fast Charger Plus',
    description: 'Charges 3× faster than standard chargers',
    price: 79,
    rating: 4.4,
    reviews: 942,
    category: 'accessories',
  },
  {
    id: 4,
    title: 'Portable Power Bank Plus',
    description: 'Charge your devices on the go',
    price: 49,
    oldPrice: 69,
    rating: 4.5,
    reviews: 3214,
    category: 'accessories',
  },
  {
    id: 5,
    title: 'Bluetooth Speaker Premium',
    description: 'Crystal clear sound with 360° audio',
    price: 89,
    rating: 4.3,
    reviews: 1523,
    category: 'electronics',
  },
  {
    id: 6,
    title: 'USB-C Hub Multi-Port Pro',
    description: '7-in-1 connectivity hub for modern devices',
    price: 59,
    oldPrice: 79,
    rating: 4.2,
    reviews: 876,
    category: 'accessories',
  },
  {
    id: 7,
    title: 'Wireless Mouse Pro Edition',
    description: 'Ergonomic design with precision tracking',
    price: 49,
    oldPrice: 69,
    rating: 4.6,
    reviews: 1234,
    category: 'accessories',
  },
  {
    id: 8,
    title: 'Mechanical Keyboard RGB Elite',
    description: 'Customizable backlit mechanical switches',
    price: 149,
    oldPrice: 199,
    rating: 4.7,
    reviews: 2156,
    category: 'accessories',
  },
  {
    id: 9,
    title: 'Webcam 4K Ultra Quality',
    description: 'Crystal clear video for streaming and calls',
    price: 129,
    oldPrice: 179,
    rating: 4.4,
    reviews: 1987,
    category: 'electronics',
  },
  {
    id: 10,
    title: 'Laptop Stand Ergonomic Pro',
    description: 'Improve your workspace ergonomics',
    price: 59,
    oldPrice: 89,
    rating: 4.5,
    reviews: 2345,
    category: 'accessories',
  },
  {
    id: 11,
    title: 'Noise-Cancelling Earbuds',
    description: 'All-day comfort, 30-hour battery',
    price: 179,
    rating: 4.6,
    reviews: 3120,
    category: 'electronics',
  },
  {
    id: 12,
    title: 'Cable Organizer Set Plus',
    description: 'Keep your cables neat and organized',
    price: 17,
    rating: 4.1,
    reviews: 654,
    category: 'accessories',
  },
];

const meetings = [
  {
    id: 1,
    title: 'Q2 Product Review',
    time: '2:00 – 3:00 PM',
    variant: 'primary' as const,
    attendees: [
      { name: 'Osama Eldrieny', src: 'assets/avatar-1.png' },
      { name: 'Sarah Chen', src: 'assets/avatar-2.png' },
    ],
  },
  {
    id: 2,
    title: 'Confirmed: Team standup',
    time: '10:00 – 10:30 AM',
    variant: 'success' as const,
    attendees: [
      { name: 'Maria Garcia', src: 'assets/avatar-3.png' },
      { name: 'James Wilson', src: 'assets/avatar-4.png' },
    ],
  },
  {
    id: 3,
    title: 'Cancelled: Budget planning',
    time: '4:00 – 5:30 PM',
    variant: 'danger' as const,
    attendees: [
      { name: 'Osama Eldrieny', src: 'assets/avatar-1.png' },
      { name: 'Maria Garcia', src: 'assets/avatar-3.png' },
    ],
  },
];

const team = [
  { name: 'Osama Eldrieny', role: 'Founder & CEO', avatar: 'assets/avatar-1.png' },
  { name: 'Sarah Chen', role: 'Head of Products', avatar: 'assets/avatar-2.png' },
  { name: 'Maria Garcia', role: 'Design Lead', avatar: 'assets/avatar-3.png' },
  { name: 'James Wilson', role: 'Engineering Director', avatar: 'assets/avatar-4.png' },
];

const apps = [
  { id: 'google', name: 'Google', icon: 'assets/google.png' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'assets/linkedin.png' },
  { id: 'behance', name: 'Behance', icon: 'assets/behance.png', defaultEnabled: false },
  { id: 'twitter', name: 'X (Twitter)', icon: 'assets/twitter.png' },
];

const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const PER_PAGE = 6;
type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating';

function ProductLandingPage() {
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | Category>('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sort, setSort] = useState<Sort>('featured');
  const [gridView, setGridView] = useState(true);
  const [page, setPage] = useState(1);
  const [plan, setPlan] = useState('pro');
  const [email, setEmail] = useState('');

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (priceRange === 'all' ||
          (priceRange === 'budget' ? p.price < 100 : p.price >= 100 && p.price <= 300)) &&
        (!q || `${p.title} ${p.description}`.toLowerCase().includes(q)),
    );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, priceRange, sort]);

  const pages = Math.max(1, Math.ceil(shown.length / PER_PAGE));
  const current = Math.min(page, pages);
  const pageItems = shown.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const resetPage =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v);
      setPage(1);
    };

  return (
    <div className="proto">
      <div className="proto-top">
        <Container>
          <Navbar
            logo={<Logo icon={<Flame />} name="TechHub" href="#/landing" />}
            items={[
              { label: 'Products', href: '#/landing' },
              { label: 'Dashboard', href: '#/dashboard' },
              { label: 'Theme playground', href: '#/demo' },
            ]}
            currentItem="Products"
          />
        </Container>
      </div>

      <section className="proto-hero" aria-labelledby="hero-title">
        <Container size="medium">
          <Stack gap="md" align="center">
            <h1 className="proto-hero__title" id="hero-title">
              Premium tech products
            </h1>
            <p className="proto-hero__text">
              Discover the latest technology at the best quality and prices.
            </p>
            <Button
              variant="secondary"
              size="large"
              onClick={() => document.getElementById('products')?.focus()}
            >
              Explore products
            </Button>
          </Stack>
        </Container>
      </section>

      <Container as="main" className="proto-main">
        <div className="proto-layout">
          <Stack as="aside" gap="lg" aria-label="Filters and activity">
            <Card appearance="outlined" as="section" aria-labelledby="filters-title">
              <CardBody>
                <Stack gap="lg">
                  <h2 className="proto-subtitle" id="filters-title">
                    Filters
                  </h2>
                  <SearchField
                    label="Search products"
                    placeholder="Search products"
                    shortcut="/"
                    value={query}
                    onValueChange={resetPage(setQuery)}
                  />
                  <RadioGroup
                    label="Price"
                    value={priceRange}
                    onValueChange={resetPage(setPriceRange)}
                  >
                    <Radio value="all" label="All prices" />
                    <Radio value="budget" label="Under $100" />
                    <Radio value="mid" label="$100 – $300" />
                  </RadioGroup>
                  <Switch label="Grid view" checked={gridView} onCheckedChange={setGridView} />
                </Stack>
              </CardBody>
            </Card>

            <Stack as="section" gap="sm" aria-labelledby="meetings-title">
              <h2 className="proto-subtitle" id="meetings-title">
                Meetings
              </h2>
              {meetings.map((m) => (
                <MeetingCard
                  key={m.id}
                  title={m.title}
                  time={m.time}
                  variant={m.variant}
                  attendees={m.attendees}
                />
              ))}
            </Stack>

            <AppsNotifications
              appearance="outlined"
              title="Connected apps"
              titleAs="h2"
              items={apps}
            />
          </Stack>

          <Stack gap="3xl">
            <Stack as="section" gap="lg" aria-labelledby="products-title">
              <Inline justify="between" gap="md">
                <Stack gap="2xs">
                  <h2 className="proto-title" id="products-title">
                    Featured products
                  </h2>
                  <p className="proto-muted">{`${shown.length} products`}</p>
                </Stack>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      appearance="outline"
                      variant="secondary"
                      size="small"
                      iconStart={<SlidersHorizontal />}
                      iconEnd={<ChevronDown />}
                    >
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem icon={<Star />} onSelect={() => setSort('featured')}>
                      Featured
                    </DropdownMenuItem>
                    <DropdownMenuItem icon={<ArrowUp />} onSelect={() => setSort('price-asc')}>
                      Price: low to high
                    </DropdownMenuItem>
                    <DropdownMenuItem icon={<ArrowDown />} onSelect={() => setSort('price-desc')}>
                      Price: high to low
                    </DropdownMenuItem>
                    <DropdownMenuItem icon={<Star />} onSelect={() => setSort('rating')}>
                      Highest rated
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Inline>

              <Tabs
                value={category}
                onValueChange={(v) => resetPage(setCategory)(v as 'all' | Category)}
              >
                <TabList label="Product categories">
                  <Tab value="all" icon={<Box />}>
                    All products
                  </Tab>
                  <Tab value="electronics" icon={<Laptop />}>
                    Electronics
                  </Tab>
                  <Tab value="accessories" icon={<ShoppingBag />}>
                    Accessories
                  </Tab>
                </TabList>
                <TabPanel value={category} id="products" tabIndex={-1}>
                  {pageItems.length === 0 ? (
                    <EmptyState
                      icon={<SearchX />}
                      titleAs="h3"
                      title="No products match"
                      description="Try other words, another category or a wider price range."
                      actions={
                        <Button
                          appearance="outline"
                          onClick={() => {
                            setQuery('');
                            setPriceRange('all');
                            setCategory('all');
                          }}
                        >
                          Clear filters
                        </Button>
                      }
                    />
                  ) : (
                    <Stack gap="lg">
                      <Grid
                        columns={gridView ? 'auto' : 1}
                        minItemWidth="15rem"
                        as="ul"
                        style={{ listStyle: 'none', margin: 0, padding: 0 }}
                      >
                        {pageItems.map((p) => (
                          <li key={p.id}>
                            <ProductCard
                              orientation={gridView ? 'vertical' : 'horizontal'}
                              href={`#/landing/product-${p.id}`}
                              title={p.title}
                              description={p.description}
                              imageUrl="assets/card-image-diamond.png"
                              price={money(p.price)}
                              oldPrice={p.oldPrice ? money(p.oldPrice) : undefined}
                              rating={p.rating}
                              reviews={`${p.reviews.toLocaleString('en-US')} reviews`}
                            />
                          </li>
                        ))}
                      </Grid>
                      {pages > 1 && (
                        <Pagination
                          currentPage={current}
                          totalPages={pages}
                          onPageChange={setPage}
                        />
                      )}
                    </Stack>
                  )}
                </TabPanel>
              </Tabs>
            </Stack>

            <Stack as="section" gap="lg" aria-labelledby="plan-title">
              <Stack gap="2xs">
                <h2 className="proto-title" id="plan-title">
                  Choose your plan
                </h2>
                <p className="proto-muted">Switch or cancel any time.</p>
              </Stack>
              <ChooseCardGroup
                orientation="horizontal"
                aria-labelledby="plan-title"
                value={plan}
                onValueChange={setPlan}
              >
                <ChooseCard
                  value="basic"
                  title="Basic"
                  description="For individuals"
                  price="Free"
                />
                <ChooseCard
                  value="pro"
                  title="Pro"
                  description="For professionals"
                  price="$29 / month"
                />
                <ChooseCard
                  value="team"
                  title="Team"
                  description="For large teams"
                  price="Custom"
                />
              </ChooseCardGroup>
            </Stack>

            <Stack as="section" gap="lg" aria-labelledby="team-title">
              <Stack gap="2xs">
                <h2 className="proto-title" id="team-title">
                  Meet our team
                </h2>
                <p className="proto-muted">The people behind TechHub.</p>
              </Stack>
              <Grid
                minItemWidth="10rem"
                as="ul"
                style={{ listStyle: 'none', margin: 0, padding: 0 }}
              >
                {team.map((m) => (
                  <li key={m.name}>
                    <Stack gap="xs" align="center" className="proto-center">
                      <Avatar src={m.avatar} name={m.name} size="xlarge" decorative />
                      <p className="proto-subtitle">{m.name}</p>
                      <p className="proto-muted">{m.role}</p>
                    </Stack>
                  </li>
                ))}
              </Grid>
            </Stack>

            <Card as="section" aria-labelledby="news-title">
              <CardBody>
                <Stack gap="md" align="center" className="proto-center">
                  <h2 className="proto-title" id="news-title">
                    Get the latest deals
                  </h2>
                  <p className="proto-muted">Subscribe for exclusive offers. No spam.</p>
                  <Inline
                    as="form"
                    gap="sm"
                    justify="center"
                    align="end"
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast({
                        title: 'Subscribed',
                        description: `Deals will go to ${email || 'your inbox'}.`,
                        tone: 'success',
                      });
                      setEmail('');
                    }}
                  >
                    <InputField
                      label="Email address"
                      hideLabel
                      type="email"
                      placeholder="you@example.com"
                      iconStart={<Mail />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" iconStart={<Bell />}>
                      Subscribe
                    </Button>
                  </Inline>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </div>
      </Container>

      <Container>
        <Footer
          title={`© ${new Date().getFullYear()} TechHub. All rights reserved.`}
          links={[
            { label: 'Privacy', href: '#/landing/privacy' },
            { label: 'Terms', href: '#/landing/terms' },
            { label: 'Contact', href: '#/landing/contact' },
          ]}
        />
      </Container>
    </div>
  );
}

export default ProductLandingPage;
