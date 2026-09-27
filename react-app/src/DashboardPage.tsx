import React, { useState } from 'react';
import {
  Button, Card, Alert, InputField, Avatar, Logo, Navbar, Footer,
  Dropdown, RadioButton, Toggle, Tabs, Pagination, ChooseCard, MeetingCard, AppsNotifications
} from './components';
import './DashboardPage.css';

const kpiCards = [
  { id: 1, title: 'Total Revenue', value: '$124,567', change: '+12.5%', brand: 'diamond' as const },
  { id: 2, title: 'Active Users', value: '8,432', change: '+8.2%', brand: 'diamond' as const },
  { id: 3, title: 'Transactions', value: '2,156', change: '+15.3%', brand: 'diamond' as const },
  { id: 4, title: 'Growth Rate', value: '24.5%', change: '+3.1%', brand: 'diamond' as const },
];

// Revenue Category
const revenueCards = [
  { id: 1, category: 'revenue', title: 'Total Revenue', description: 'Total income from all sources this month', price: '$124,567', brand: 'diamond' as const },
  { id: 2, category: 'revenue', title: 'Revenue Growth', description: 'Month-over-month revenue increase', price: '+$12,450', brand: 'diamond' as const },
  { id: 3, category: 'revenue', title: 'Revenue Per User', description: 'Average spending per user account', price: '$15.80', brand: 'diamond' as const },
];

// Users Category
const usersCards = [
  { id: 4, category: 'users', title: 'Active Users', description: 'Users currently active on platform', price: '8,432', brand: 'diamond' as const },
  { id: 5, category: 'users', title: 'New Users', description: 'Newly registered users this month', price: '+1,245', brand: 'diamond' as const },
  { id: 6, category: 'users', title: 'Geographic Distribution', description: 'Users across different regions worldwide', price: '45 Countries', brand: 'diamond' as const },
];

// Engagement Category
const engagementCards = [
  { id: 7, category: 'engagement', title: 'Session Duration', description: 'Average time spent per user session', price: '4m 32s', brand: 'diamond' as const },
  { id: 8, category: 'engagement', title: 'Bounce Rate', description: 'Percentage of single-page sessions', price: '32.1%', brand: 'diamond' as const },
  { id: 9, category: 'engagement', title: 'User Retention', description: 'Percentage of returning users overall', price: '68.5%', brand: 'diamond' as const },
];

const allDataCards = [...revenueCards, ...usersCards, ...engagementCards];

const systemStatus = [
  { id: 1, title: 'Database: Healthy', time: 'Uptime: 99.99%', variant: 'success' as const, avatars: ['/assets/avatar-1.png', '/assets/avatar-2.png'] },
  { id: 2, title: 'API Server: Active', time: 'Latency: 120ms', variant: 'success' as const, avatars: ['/assets/avatar-2.png', '/assets/avatar-3.png'] },
  { id: 3, title: 'Backup: In Progress', time: 'ETA: 15 min', variant: 'primary' as const, avatars: ['/assets/avatar-3.png', '/assets/avatar-4.png'] },
];

const teamMembers = [
  { name: 'Osama', role: 'Admin', avatar: '/assets/avatar-1.png' },
  { name: 'Sarah', role: 'Editor', avatar: '/assets/avatar-2.png' },
  { name: 'Maria', role: 'Viewer', avatar: '/assets/avatar-3.png' },
  { name: 'James', role: 'Editor', avatar: '/assets/avatar-4.png' },
];

const integrations = [
  { id: 'google', appTitle: 'Google', appIcon: '/assets/google.png' },
  { id: 'mixpanel', appTitle: 'Mixpanel', appIcon: '/assets/linkedin.png' },
  { id: 'amplitude', appTitle: 'Amplitude', appIcon: '/assets/behance.png' },
  { id: 'segment', appTitle: 'Segment', appIcon: '/assets/twitter.png' },
];

interface DashboardPageProps {
  onNavigate?: () => void;
}

function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [timePeriod, setTimePeriod] = useState('month');
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [activeMetricTab, setActiveMetricTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRefresh, setSelectedRefresh] = useState('realtime');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  // Filter cards based on active tab
  const filteredCards = activeMetricTab === 'all'
    ? allDataCards
    : allDataCards.filter(card => card.category === activeMetricTab);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCards = filteredCards.slice(startIdx, startIdx + itemsPerPage);

  // Reset to page 1 when tab changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeMetricTab]);

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
    { label: 'Products', onClick: onNavigate },
    { label: 'Dashboard', onClick: () => setActiveMenuItem('Dashboard') },
  ];

  return (
    <div className="dashboard-page">
      {/* Integrated Top Bar with Logo & Menu */}
      <div className="dashboard-top-bar">
        <div className="top-bar-logo">
          <Logo icon={<i className="fa-solid fa-chart-line"></i>} text="Analytics" brand="diamond" />
        </div>

        <div className="top-bar-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`top-bar-menu-item ${activeMenuItem === item.label ? 'active' : ''}`}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="top-bar-controls">
          <InputField placeholder="Search..." icon={<i className="fas fa-search"></i>} />
          <div className="sort-controls">
            <button
              className="sort-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <i className="fas fa-sliders"></i> Filter
              <i className={`fas fa-chevron-down ${isDropdownOpen ? 'open' : ''}`}></i>
            </button>
            {isDropdownOpen && (
              <Dropdown
                items={dropdownItems}
                onItemClick={(id) => {
                  console.log('Filter:', id);
                  setIsDropdownOpen(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Container - 3 Column Layout */}
      <div className="dashboard-container">
        {/* Left Sidebar - Filters & Status */}
        <aside className="dashboard-sidebar">
          {/* Filters Card */}
          <div className="sidebar-filter-section">
            <h3 className="sidebar-section-title">Filters</h3>
            <div className="sidebar-subsection">
              <h3 className="sidebar-subsection-title">Time Period</h3>
              <div className="filter-options">
                <RadioButton id="today" label="Today" checked={timePeriod === 'today'} onChange={() => setTimePeriod('today')} />
                <RadioButton id="week" label="This Week" checked={timePeriod === 'week'} onChange={() => setTimePeriod('week')} />
                <RadioButton id="month" label="This Month" checked={timePeriod === 'month'} onChange={() => setTimePeriod('month')} />
                <RadioButton id="year" label="This Year" checked={timePeriod === 'year'} onChange={() => setTimePeriod('year')} />
              </div>
            </div>
            <div className="sidebar-subsection">
              <div className="realtime-toggle">
                <Toggle isActive={realtimeEnabled} onChange={setRealtimeEnabled} />
                <span className="toggle-label">Real-time</span>
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
                  avatars={status.avatars}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Alert Section */}
          {realtimeEnabled && (
            <Alert variant="primary" title="✓ Real-time data enabled. Updates every 30 seconds." />
          )}

          {/* KPI Cards Section */}
          <section className="kpi-section">
            <div className="kpi-grid">
              {kpiCards.map((kpi) => (
                <div key={kpi.id} className="kpi-card-wrapper">
                  <Card
                    title={kpi.title}
                    description={kpi.value}
                    newPrice={kpi.change}
                    brand={kpi.brand}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Analytics Data Section */}
          <section className="metrics-section">
            <div className="section-header">
              <h2>Analytics Data</h2>
              <Tabs
                items={metricTabs}
                activeTabId={activeMetricTab}
                onTabChange={setActiveMetricTab}
              />
            </div>

            <div className="data-grid">
              {paginatedCards.map((card) => (
                <div key={card.id} className="data-card-wrapper">
                  <Card
                    title={card.title}
                    description={card.description}
                    newPrice={card.price}
                    brand={card.brand}
                  />
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
          </section>

          {/* Settings Section */}
          <section className="settings-section">
            <div className="settings-section-wrapper">
              <div className="settings-header">
                <h2>Settings</h2>
                <div className="settings-actions-top">
                  <Button variant="secondary" buttonStyle="text" size="small">
                    <i className="fas fa-redo"></i> Refresh
                  </Button>
                  <Button variant="primary" buttonStyle="filled" size="small">
                    <i className="fas fa-download"></i> Export
                  </Button>
                </div>
              </div>

              <div className="settings-content">
                <div className="settings-group">
                  <h3 className="settings-group-title">Data Refresh</h3>
                  <div className="layout-cards">
                    {refreshOptions.map((option) => (
                      <ChooseCard
                        key={option.id}
                        title={option.title}
                        description={option.desc}
                        price=""
                        isSelected={selectedRefresh === option.id}
                        onChange={() => setSelectedRefresh(option.id)}
                      />
                    ))}
                  </div>
                </div>

                <div className="settings-group">
                  <h3 className="settings-group-title">Widgets</h3>
                  <div className="widget-toggles">
                    <div className="widget-toggle-item">
                      <span>KPI Cards</span>
                      <Toggle isActive={true} onChange={() => {}} />
                    </div>
                    <div className="widget-toggle-item">
                      <span>Data Charts</span>
                      <Toggle isActive={true} onChange={() => {}} />
                    </div>
                    <div className="widget-toggle-item">
                      <span>Team Activity</span>
                      <Toggle isActive={true} onChange={() => {}} />
                    </div>
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
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        size="small"
                        radius="round"
                      />
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
            <h3 className="sidebar-section-title">Apps</h3>
            <AppsNotifications
              title="Connected"
              items={integrations.map(int => ({
                id: int.id,
                appTitle: int.appTitle,
                appIcon: int.appIcon,
                isEnabled: true,
              }))}
            />
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
