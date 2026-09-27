import React, { useState } from 'react';
import {
  Button, Card, Alert, InputField, Avatar, Logo, Navbar, Footer,
  Dropdown, RadioButton, Toggle, Tabs, Pagination, ChooseCard, MeetingCard, AppsNotifications
} from './components';
import './ProductLandingPage.css';

const products = [
  {
    id: 1,
    title: 'Premium Wireless Headphones Pro',
    description: 'High-quality sound with noise cancellation',
    price: '$299',
    oldPrice: '$399',
    reviews: '2,342 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 2,
    title: 'Smart Watch Pro Series',
    description: 'Advanced fitness tracking and notifications',
    price: '$199',
    oldPrice: '$249',
    reviews: '1,856 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 3,
    title: 'Ultra Fast Charger Plus',
    description: 'Charges 3x faster than standard chargers',
    price: '$79',
    reviews: '942 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 4,
    title: 'Portable Power Bank Plus',
    description: 'Charge your devices on the go',
    price: '$49',
    oldPrice: '$69',
    reviews: '3,214 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 5,
    title: 'Bluetooth Speaker Premium',
    description: 'Crystal clear sound with 360° audio',
    price: '$89',
    reviews: '1,523 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 6,
    title: 'USB-C Hub Multi-Port Pro',
    description: '7-in-1 connectivity hub for modern devices',
    price: '$59',
    oldPrice: '$79',
    reviews: '876 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 7,
    title: 'Wireless Mouse Pro Edition',
    description: 'Ergonomic design with precision tracking',
    price: '$49',
    oldPrice: '$69',
    reviews: '1,234 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 8,
    title: 'Mechanical Keyboard RGB Elite',
    description: 'Customizable backlit mechanical switches',
    price: '$149',
    oldPrice: '$199',
    reviews: '2,156 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 9,
    title: 'USB-C Cable Premium Plus',
    description: 'Fast charging and data transfer cable',
    price: '$19',
    reviews: '856 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 10,
    title: 'Webcam 4K Ultra Quality',
    description: 'Crystal clear video for streaming and calls',
    price: '$129',
    oldPrice: '$179',
    reviews: '1,987 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 11,
    title: 'USB Hub Expansion Pro',
    description: 'Expand your connectivity options',
    price: '$39',
    reviews: '765 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 12,
    title: 'Screen Protector Pack Set',
    description: 'Tempered glass protection for your devices',
    price: '$29',
    reviews: '1,432 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 13,
    title: 'Phone Stand Adjustable Plus',
    description: 'Universal mount for all devices',
    price: '$24',
    reviews: '1,098 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 14,
    title: 'Laptop Stand Ergonomic Pro',
    description: 'Improve your workspace ergonomics',
    price: '$59',
    oldPrice: '$89',
    reviews: '2,345 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
  {
    id: 15,
    title: 'Cable Organizer Set Plus',
    description: 'Keep your cables neat and organized',
    price: '$17',
    reviews: '654 reviews',
    brand: 'diamond' as const,
    image: '/assets/card-image-diamond.png',
  },
];

const meetings = [
  {
    id: 1,
    title: 'Q2 Product Review',
    time: '2:00 PM - 3:00 PM',
    variant: 'primary' as const,
    avatars: ['/assets/avatar-1.png', '/assets/avatar-2.png'],
  },
  {
    id: 2,
    title: 'Team Standup',
    time: '10:00 AM - 10:30 AM',
    variant: 'success' as const,
    avatars: ['/assets/avatar-3.png', '/assets/avatar-4.png'],
  },
  {
    id: 3,
    title: 'Budget Planning',
    time: '4:00 PM - 5:30 PM',
    variant: 'danger' as const,
    avatars: ['/assets/avatar-1.png', '/assets/avatar-3.png'],
  },
];

const teamMembers = [
  { name: 'Osama Eldrieny', role: 'Founder & CEO', avatar: '/assets/avatar-1.png' },
  { name: 'Sarah Chen', role: 'Head of Products', avatar: '/assets/avatar-2.png' },
  { name: 'Maria Garcia', role: 'Design Lead', avatar: '/assets/avatar-3.png' },
  { name: 'James Wilson', role: 'Engineering Director', avatar: '/assets/avatar-4.png' },
];

interface ProductLandingPageProps {
  onNavigate?: () => void;
}

function ProductLandingPage({ onNavigate }: ProductLandingPageProps) {
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState('all');
  const [gridView, setGridView] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const itemsPerPage = 3;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIdx, startIdx + itemsPerPage);

  const dropdownItems = [
    { id: 'price-low', label: 'Price: Low to High', icon: 'fa-solid fa-arrow-up' },
    { id: 'price-high', label: 'Price: High to Low', icon: 'fa-solid fa-arrow-down' },
    { id: 'rating', label: 'Highest Rated', icon: 'fa-solid fa-star' },
  ];

  const tabs = [
    { id: 'all', label: 'All Products', icon: 'fa-solid fa-cube' },
    { id: 'electronics', label: 'Electronics', icon: 'fa-solid fa-laptop' },
    { id: 'accessories', label: 'Accessories', icon: 'fa-solid fa-bag-shopping' },
  ];

  const pricingPlans = [
    { id: 'basic', title: 'Basic', desc: 'For individuals', price: 'Free' },
    { id: 'pro', title: 'Pro', desc: 'For professionals', price: '$29/mo' },
    { id: 'enterprise', title: 'Enterprise', desc: 'For large teams', price: 'Custom' },
  ];

  const notifications = [
    { id: 'google', appTitle: 'Google', appIcon: '/assets/google.png' },
    { id: 'linkedin', appTitle: 'LinkedIn', appIcon: '/assets/linkedin.png' },
    { id: 'behance', appTitle: 'Behance', appIcon: '/assets/behance.png' },
    { id: 'twitter', appTitle: 'Twitter', appIcon: '/assets/twitter.png' },
  ];

  return (
    <div className="product-landing-page">
      {/* Navbar */}
      <Navbar
        logo={<Logo icon={<i className="fa-solid fa-fire"></i>} text="TechHub" brand="diamond" />}
        items={[
          { label: 'Products', onClick: () => {} },
          { label: 'Dashboard', onClick: onNavigate },
        ]}
        defaultActiveItem="Products"
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Premium Tech Products</h2>
          <p>Discover the latest technology with the best quality and prices</p>
          <Button variant="primary" buttonStyle="filled">Explore Products</Button>
        </div>
      </section>


      {/* Main Layout with Left Sidebar */}
      <div className="page-layout">
        {/* Left Sidebar - Filters, Meetings, Apps */}
        <aside className="page-sidebar">
          {/* Section 1: Filters */}
          <div className="sidebar-filter-section">
            {/* Search */}
            <div className="sidebar-subsection">
              <h3 className="sidebar-subsection-title">Search</h3>
              <InputField
                placeholder="Search products..."
                icon={<i className="fas fa-search"></i>}
              />
            </div>

            {/* Price Filter */}
            <div className="sidebar-subsection">
              <h3 className="sidebar-subsection-title">Price Range</h3>
              <div className="filter-options">
                <RadioButton id="price-all" label="All Prices" checked={priceRange === 'all'} onChange={() => setPriceRange('all')} />
                <RadioButton id="price-budget" label="Under $100" checked={priceRange === 'budget'} onChange={() => setPriceRange('budget')} />
                <RadioButton id="price-mid" label="$100 - $300" checked={priceRange === 'mid'} onChange={() => setPriceRange('mid')} />
              </div>
            </div>

            {/* View Mode */}
            <div className="sidebar-subsection">
              <h3 className="sidebar-subsection-title">View Mode</h3>
              <div className="view-toggle">
                <Toggle isActive={gridView} onChange={setGridView} />
                <span className="toggle-label">{gridView ? 'Grid View' : 'List View'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Meetings */}
          <div className="sidebar-meetings-section">
            <h3 className="sidebar-section-title">Meetings</h3>
            <div className="sidebar-meetings">
              {meetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.title}
                  time={meeting.time}
                  variant={meeting.variant}
                  avatars={meeting.avatars}
                />
              ))}
            </div>
          </div>

          {/* Section 3: Connected Apps */}
          <div className="sidebar-apps-section">
            <h3 className="sidebar-section-title">Connected Apps</h3>
            <AppsNotifications
              title="Connected Apps"
              items={notifications.map(notif => ({
                id: notif.id,
                appTitle: notif.appTitle,
                appIcon: notif.appIcon,
                isEnabled: true,
              }))}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="page-main">

          {/* Products Section */}
          <section className="products-section">
            <div className="section-header">
              <h2>Featured Products</h2>
              <p>Browse our curated selection of premium tech products</p>
            </div>

            <div className="products-controls">
              <div className="sort-controls">
                <button
                  className="sort-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <i className="fas fa-sliders"></i> Sort By
                  <i className={`fas fa-chevron-down ${isDropdownOpen ? 'open' : ''}`}></i>
                </button>
                {isDropdownOpen && (
                  <Dropdown
                    items={dropdownItems}
                    onItemClick={(id) => {
                      console.log('Sort:', id);
                      setIsDropdownOpen(false);
                    }}
                  />
                )}
              </div>

              <Tabs
                items={tabs}
                activeTabId={activeTab}
                onTabChange={setActiveTab}
              />
            </div>

            <div className={`products-grid ${gridView ? 'grid' : 'list'}`}>
              {paginatedProducts.map((product) => (
                <div key={product.id} className="product-wrapper">
                  <Card
                    title={product.title}
                    description={product.description}
                    imageUrl={product.image}
                    newPrice={product.price}
                    oldPrice={product.oldPrice}
                    reviews={product.reviews}
                    brand={product.brand}
                  />
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </section>

          {/* Pricing Plans - Feature Comparison */}
          <section className="pricing-section">
            <div className="pricing-section-wrapper">
              <div className="section-header">
                <h2>Choose Your Plan</h2>
                <p>Select the perfect plan for your needs</p>
              </div>
              <div className="pricing-cards">
                {pricingPlans.map((plan) => (
                  <ChooseCard
                    key={plan.id}
                    title={plan.title}
                    description={plan.desc}
                    price={plan.price}
                    isSelected={selectedPlan === plan.id}
                    onChange={() => setSelectedPlan(plan.id)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <div className="team-section-wrapper">
              <div className="section-header">
                <h2>Meet Our Team</h2>
                <p>The talented people behind TechHub</p>
              </div>
              <div className="team-grid">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="team-member">
                    <div className="team-avatar-wrapper">
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        size="xlarge"
                        radius="round"
                      />
                    </div>
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="newsletter-section">
            <div className="newsletter-section-wrapper">
              <h3>Get Latest Deals & Updates</h3>
              <p>Subscribe to our newsletter for exclusive offers</p>
              <div className="newsletter-form">
                <InputField
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<i className="fas fa-envelope"></i>}
                />
                <Button variant="primary" buttonStyle="filled" size="small">
                  <i className="fas fa-bell"></i> Subscribe
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer Component */}
      <Footer
        title="© 2024 TechHub. All rights reserved."
        links={[
          { label: 'Privacy Policy', onClick: () => {} },
          { label: 'Terms of Service', onClick: () => {} },
          { label: 'Contact Us', onClick: () => {} },
        ]}
      />
    </div>
  );
}

export default ProductLandingPage;
