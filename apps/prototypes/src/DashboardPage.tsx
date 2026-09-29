import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardDescription,
  ThemeProvider,
  Alert,
  InputField,
  Avatar,
  Logo,
  Navbar,
  Footer,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  RadioGroup,
  Radio,
  Switch,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Pagination,
  ChooseCard,
  ChooseCardGroup,
  MeetingCard,
  AppsNotifications,
} from '@ds/react';
import { ChartLine } from 'lucide-react';
import './DashboardPage.css';

const kpiCards = [
  { id: 1, title: 'Total Revenue', value: '$124,567', change: '+12.5%', brand: 'diamond' as const },
  { id: 2, title: 'Active Users', value: '8,432', change: '+8.2%', brand: 'diamond' as const },
  { id: 3, title: 'Transactions', value: '2,156', change: '+15.3%', brand: 'diamond' as const },
  { id: 4, title: 'Growth Rate', value: '24.5%', change: '+3.1%', brand: 'diamond' as const },
];

// Revenue Category
const revenueCards = [
  {
    id: 1,
    category: 'revenue',
    title: 'Total Revenue',
    description: 'Total income from all sources this month',
    price: '$124,567',
    brand: 'diamond' as const,
  },
  {
    id: 2,
    category: 'revenue',
    title: 'Revenue Growth',
    description: 'Month-over-month revenue increase',
    price: '+$12,450',
    brand: 'diamond' as const,
  },
  {
    id: 3,
    category: 'revenue',
    title: 'Revenue Per User',
    description: 'Average spending per user account',
    price: '$15.80',
    brand: 'diamond' as const,
  },
];

// Users Category
const usersCards = [
  {
    id: 4,
    category: 'users',
    title: 'Active Users',
    description: 'Users currently active on platform',
    price: '8,432',
    brand: 'diamond' as const,
  },
  {
    id: 5,
    category: 'users',
    title: 'New Users',
    description: 'Newly registered users this month',
    price: '+1,245',
    brand: 'diamond' as const,
  },
  {
    id: 6,
    category: 'users',
    title: 'Geographic Distribution',
    description: 'Users across different regions worldwide',
    price: '45 Countries',
    brand: 'diamond' as const,
  },
];

// Engagement Category
const engagementCards = [
  {
    id: 7,
    category: 'engagement',
    title: 'Session Duration',
    description: 'Average time spent per user session',
    price: '4m 32s',
    brand: 'diamond' as const,
  },
  {
    id: 8,
    category: 'engagement',
    title: 'Bounce Rate',
    description: 'Percentage of single-page sessions',
    price: '32.1%',
    brand: 'diamond' as const,
  },
  {
    id: 9,
    category: 'engagement',
    title: 'User Retention',
    description: 'Percentage of returning users overall',
    price: '68.5%',
    brand: 'diamond' as const,
  },
];

const allDataCards = [...revenueCards, ...usersCards, ...engagementCards];

const systemStatus = [
  {
    id: 1,
    title: 'Database: Healthy',
    time: 'Uptime: 99.99%',
    variant: 'success' as const,
    attendees: [
      { name: 'Osama', src: 'assets/avatar-1.png' },
      { name: 'Sarah', src: 'assets/avatar-2.png' },
    ],
  },
  {
    id: 2,
    title: 'API Server: Active',
    time: 'Latency: 120ms',
    variant: 'success' as const,
    attendees: [
      { name: 'Sarah', src: 'assets/avatar-2.png' },
      { name: 'Maria', src: 'assets/avatar-3.png' },
    ],
  },
  {
    id: 3,
    title: 'Backup: In Progress',
    time: 'ETA: 15 min',
    variant: 'primary' as const,
    attendees: [
      { name: 'Maria', src: 'assets/avatar-3.png' },
      { name: 'James', src: 'assets/avatar-4.png' },
    ],
  },
];

const teamMembers = [
  { name: 'Osama', role: 'Admin', avatar: 'assets/avatar-1.png' },
  { name: 'Sarah', role: 'Editor', avatar: 'assets/avatar-2.png' },
  { name: 'Maria', role: 'Viewer', avatar: 'assets/avatar-3.png' },
  { name: 'James', role: 'Editor', avatar: 'assets/avatar-4.png' },
];

const integrations = [
  { id: 'google', name: 'Google', icon: 'assets/google.png' },
  { id: 'mixpanel', name: 'Mixpanel', icon: 'assets/linkedin.png' },
  { id: 'amplitude', name: 'Amplitude', icon: 'assets/behance.png' },
  { id: 'segment', name: 'Segment', icon: 'assets/twitter.png' },
];

function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState('month');
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [activeMetricTab, setActiveMetricTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRefresh, setSelectedRefresh] = useState('realtime');

  // Filter cards based on active tab
  const filteredCards =
    activeMetricTab === 'all'
      ? allDataCards
      : allDataCards.filter((card) => card.category === activeMetricTab);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCards = filteredCards.slice(startIdx, startIdx + itemsPerPage);

  const dropdownItems = [
    { id: 'revenue', label: 'By Revenue', icon: 'fa-solid fa-arrow-down' },
    { id: 'users', label: 'By Users', icon: 'fa-solid fa-arrow-up' },
    { id: 'growth', label: 'By Growth', icon: 'fa-solid fa-chart-line' },
  ];

  const metricTabs = [
    { id: 'all', label: 'All Metrics', icon: 'fa-solid fa-chart-line' },
    { id: 'revenue', label: 'Revenue', icon: 'fa-solid fa-dollar-sign' },
    { id: 'users', label: 'Users', icon: 'fa-solid fa-users' },
    { id: 'engagement', label: 'Engagement', icon: 'fa-solid fa-chart-bar' },
  ];

  const refreshOptions = [
    { id: 'realtime', title: 'Real-time', desc: 'Live updates' },
    { id: '5min', title: 'Every 5 min', desc: 'Frequent' },
    { id: '15min', title: 'Every 15 min', desc: 'Standard' },
  ];

  const menuItems = [
    { label: 'Products', href: '#/landing' },
    { label: 'Dashboard', href: '#/dashboard' },
  ];

  return (
    <div className="dashboard-page">
      {/* Top bar: logo, navigation and search */}
      <div className="dashboard-top-bar">
        <Navbar
          logo={<Logo icon={<ChartLine />} name="Analytics" href="#/dashboard" />}
          items={menuItems}
          currentItem="Dashboard"
          actions={
            <div className="top-bar-controls">
              <InputField
                label="Search"
                hideLabel
                type="search"
                placeholder="Search..."
                iconStart={<i className="fas fa-search"></i>}
              />
              <div className="sort-controls">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="sort-button">
                      <i className="fas fa-sliders"></i> Filter
                      <i className="fas fa-chevron-down"></i>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {dropdownItems.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        icon={<i className={item.icon}></i>}
                        onSelect={() => console.log('Filter:', item.id)}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          }
        />
      </div>

      {/* Main Container - 3 Column Layout */}
      <div className="dashboard-container">
        {/* Left Sidebar - Filters & Status */}
        <aside className="dashboard-sidebar">
          {/* Filters Card */}
          <div className="sidebar-filter-section">
            <h3 className="sidebar-section-title">Filters</h3>
            <div className="sidebar-subsection">
              <h3 className="sidebar-subsection-title" id="time-period-label">
                Time Period
              </h3>
              <RadioGroup
                aria-labelledby="time-period-label"
                value={timePeriod}
                onValueChange={setTimePeriod}
              >
                <Radio value="today" label="Today" />
                <Radio value="week" label="This Week" />
                <Radio value="month" label="This Month" />
                <Radio value="year" label="This Year" />
              </RadioGroup>
            </div>
            <div className="sidebar-subsection">
              <div className="realtime-toggle">
                <Switch
                  label="Real-time"
                  checked={realtimeEnabled}
                  onCheckedChange={setRealtimeEnabled}
                />
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="sidebar-status-section">
            <h3 className="sidebar-section-title">System Status</h3>
            <div className="status-cards">
              {systemStatus.map((status) => (
                <MeetingCard
                  key={status.id}
                  title={status.title}
                  time={status.time}
                  variant={status.variant}
                  attendees={status.attendees}
                  attendeesLabel="On call"
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Alert Section */}
          {realtimeEnabled && (
            <Alert variant="success" title="Real-time data enabled.">
              Updates every 30 seconds.
            </Alert>
          )}

          {/* KPI Cards Section */}
          <section className="kpi-section">
            <div className="kpi-grid">
              {kpiCards.map((kpi) => (
                <div key={kpi.id} className="kpi-card-wrapper">
                  <ThemeProvider theme={{ brand: kpi.brand }}>
                    <Card>
                      <CardBody>
                        <CardTitle>{kpi.title}</CardTitle>
                        <CardDescription>{kpi.value}</CardDescription>
                        <p className="kpi-change">{kpi.change}</p>
                      </CardBody>
                    </Card>
                  </ThemeProvider>
                </div>
              ))}
            </div>
          </section>

          {/* Analytics Data Section */}
          <section className="metrics-section">
            <Tabs
              value={activeMetricTab}
              onValueChange={(id) => {
                setActiveMetricTab(id);
                setCurrentPage(1);
              }}
            >
              <div className="section-header">
                <h2>Analytics Data</h2>
                <TabList label="Metric categories">
                  {metricTabs.map((t) => (
                    <Tab key={t.id} value={t.id} icon={<i className={t.icon}></i>}>
                      {t.label}
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanel value={activeMetricTab}>
                <div className="data-grid">
                  {paginatedCards.map((card) => (
                    <div key={card.id} className="data-card-wrapper">
                      <ThemeProvider theme={{ brand: card.brand }}>
                        <Card>
                          <CardBody>
                            <CardTitle>{card.title}</CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                            <p className="kpi-change">{card.price}</p>
                          </CardBody>
                        </Card>
                      </ThemeProvider>
                    </div>
                  ))}
                </div>

                <div className="pagination-container">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </TabPanel>
            </Tabs>
          </section>

          {/* Settings Section */}
          <section className="settings-section">
            <div className="settings-section-wrapper">
              <div className="settings-header">
                <h2>Settings</h2>
                <div className="settings-actions-top">
                  <Button variant="secondary" appearance="text" size="small">
                    <i className="fas fa-redo"></i> Refresh
                  </Button>
                  <Button variant="primary" appearance="filled" size="small">
                    <i className="fas fa-download"></i> Export
                  </Button>
                </div>
              </div>

              <div className="settings-content">
                <div className="settings-group">
                  <h3 className="settings-group-title" id="refresh-heading">
                    Data Refresh
                  </h3>
                  <ChooseCardGroup
                    className="layout-cards"
                    orientation="horizontal"
                    aria-labelledby="refresh-heading"
                    value={selectedRefresh}
                    onValueChange={setSelectedRefresh}
                  >
                    {refreshOptions.map((option) => (
                      <ChooseCard
                        key={option.id}
                        value={option.id}
                        title={option.title}
                        description={option.desc}
                      />
                    ))}
                  </ChooseCardGroup>
                </div>

                <div className="settings-group">
                  <h3 className="settings-group-title">Widgets</h3>
                  <div className="widget-toggles">
                    <Switch
                      className="widget-toggle-item"
                      label="KPI Cards"
                      labelPosition="start"
                      defaultChecked
                    />
                    <Switch
                      className="widget-toggle-item"
                      label="Data Charts"
                      labelPosition="start"
                      defaultChecked
                    />
                    <Switch
                      className="widget-toggle-item"
                      label="Team Activity"
                      labelPosition="start"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar - Team & Apps */}
        <aside className="dashboard-right-sidebar">
          {/* Team Section */}
          <section className="dashboard-team-section">
            <div className="dashboard-team-wrapper">
              <h3 className="sidebar-section-title">Team</h3>
              <div className="dashboard-team-grid">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="dashboard-team-member">
                    <div className="dashboard-team-avatar">
                      <Avatar src={member.avatar} name={member.name} size="medium" decorative />
                    </div>
                    <div className="dashboard-team-info">
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Apps Section */}
          <div className="sidebar-integrations-section">
            <AppsNotifications appearance="outlined" title="Connected apps" items={integrations} />
          </div>
        </aside>
      </div>

      {/* Footer */}
      <div className="dashboard-footer-wrapper">
        <Footer
          title="© 2024 Analytics Dashboard. All rights reserved."
          links={[
            { label: 'Privacy Policy', onClick: () => {} },
            { label: 'Terms of Service', onClick: () => {} },
            { label: 'Support', onClick: () => {} },
          ]}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
