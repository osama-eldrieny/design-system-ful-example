import {
  BarChart,
  Button,
  DateRangePicker,
  DonutChart,
  FeaturedIcon,
  IconButton,
  InputField,
  LineChart,
  MetricCard,
  PageHeader,
  ProgressCircle,
  Select,
  SelectItem,
  Sparkline,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  datePresets,
} from '@ds/react';
import {
  Boxes,
  Download,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Upload,
  Zap,
} from 'lucide-react';
import { threeYears } from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import { CompaniesTable, More, Panel, Rings, Trend, VendorsTable } from './kit';

const companyFilters = (
  <div className="proto-filters">
    <InputField
      label="Search for company"
      size="small"
      iconStart={<Search />}
      placeholder="Search"
    />
    <Select label="Status" size="small" defaultValue="customer">
      <SelectItem value="customer" dot="success">
        Customer
      </SelectItem>
      <SelectItem value="churned" dot="gray">
        Churned
      </SelectItem>
    </Select>
    <Select label="Category" size="small" defaultValue="all">
      <SelectItem value="all">View all</SelectItem>
      <SelectItem value="ai">AI</SelectItem>
      <SelectItem value="productivity">Productivity</SelectItem>
    </Select>
    <Button variant="secondary" appearance="outline" size="small" className="proto-filters__clear">
      Clear all
    </Button>
  </div>
);

/** 06 · Customer growth: concentric “active now” rings, three-year growth and companies. */
export function Dashboard06() {
  return (
    <AppShell current="06" slim>
      <div className="dash">
        <PageHeader
          title="Customers"
          actions={
            <>
              <Button variant="secondary" appearance="outline" iconStart={<Upload />}>
                Import
              </Button>
              <Button iconStart={<Plus />}>Add customer</Button>
            </>
          }
        />
        <div className="dash-grid dash-grid--1-2">
          <Panel title="Active now" menu className="kit-panel--plain">
            <div className="dash-center">
              <Rings label="Active customers by plan" values={[86, 72, 58]} center="316" />
            </div>
          </Panel>
          <Panel title="Total customers" menu className="kit-panel--plain">
            <LineChart
              title="Customers by month, three years"
              hideTitle
              data={threeYears}
              xKey="month"
              series={[
                { key: 'y2025', label: '2025', color: 2 },
                { key: 'y2026', label: '2026', color: 7 },
                { key: 'y2027', label: '2027' },
              ]}
              height={220}
              hideYAxis
            />
          </Panel>
        </div>
        <CompaniesTable plain toolbar={companyFilters} />
      </div>
    </AppShell>
  );
}

/** 07 · Customer health: three sparkline cards, date tools and companies by license use. */
export function Dashboard07() {
  return (
    <AppShell current="07" promo="verify">
      <div className="dash">
        <PageHeader
          title="Welcome back, Olivia"
          description="Track, manage and forecast your customers and orders."
          actions={
            <>
              <Button variant="secondary" appearance="outline" iconStart={<Upload />}>
                Import
              </Button>
              <Button iconStart={<Plus />}>Add</Button>
            </>
          }
        />
        <section className="dash-grid dash-grid--3" aria-label="Customer figures">
          <MetricCard
            label="Total customers"
            value="2,420"
            change="40%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            chart={<Sparkline data={[4, 5, 6, 6, 7, 6, 8, 8, 9]} />}
            actions={<More label="Options for total customers" />}
          />
          <MetricCard
            label="Members"
            value="1,210"
            change="10%"
            trend="down"
            trendStyle="simple"
            comparison="vs last month"
            chart={<Sparkline data={[9, 9, 8, 8, 7, 7, 6, 6, 5]} />}
            actions={<More label="Options for members" />}
          />
          <MetricCard
            label="Active now"
            value="316"
            change="20%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            chart={<Sparkline data={[3, 4, 3, 5, 4, 6, 7, 6, 8]} />}
            actions={<More label="Options for active now" />}
          />
        </section>
        <div className="dash-toolbar">
          <span className="row">
            <Button variant="secondary" appearance="outline" size="small">
              Today
            </Button>
            <Select label="Range" hideLabel size="small" defaultValue="7">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </Select>
            <DateRangePicker label="Dates" size="small" presets={datePresets()} />
          </span>
          <span className="dash-toolbar__end">
            <InputField
              label="Search companies"
              hideLabel
              size="small"
              iconStart={<Search />}
              shortcut="⌘K"
              placeholder="Search"
            />
            <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
              Filters
            </Button>
          </span>
        </div>
        <CompaniesTable plain licenseFirst />
      </div>
    </AppShell>
  );
}

const vendorHeader = (
  <>
    <Button variant="secondary" appearance="outline" iconStart={<Filter />}>
      Filters 3
    </Button>
    <Button variant="secondary" appearance="outline" iconStart={<SlidersHorizontal />}>
      Customize
    </Button>
    <Button variant="secondary" appearance="outline" iconStart={<Download />}>
      Export
    </Button>
  </>
);

/** 08 · Organization overview: vendor breakdown, rating vs industry, vendor movements. */
export function Dashboard08() {
  const months = threeYears.map((m, i) => ({
    month: m.month,
    you: 58 + i * 2,
    industry: 34 + i * 2.4,
  }));
  return (
    <AppShell current="08">
      <div className="dash">
        <PageHeader title="Organization overview" actions={vendorHeader} />
        <div className="dash-grid dash-grid--1-2">
          <Panel
            title="Vendor breakdown"
            menu
            footer={
              <Button variant="secondary" appearance="outline" size="small">
                View full report
              </Button>
            }
          >
            <DonutChart
              title="Vendors by security rating"
              hideTitle
              data={[
                { label: '81–100', value: 22 },
                { label: '61–80', value: 34, color: 7 },
                { label: '41–60', value: 18, color: 2 },
                { label: '21–40', value: 12, color: 5 },
                { label: '0–20', value: 14, color: 8 },
              ]}
              formatValue={(v) => `${v}%`}
              size={180}
            />
          </Panel>
          <Panel
            title="Average vendor rating"
            description="Track how your rating compares to your industry average."
            menu
          >
            <LineChart
              title="Your rating and industry average by month"
              hideTitle
              data={months}
              xKey="month"
              series={[
                { key: 'you', label: 'Your rating' },
                { key: 'industry', label: 'Industry average', color: 7 },
              ]}
              height={220}
            />
          </Panel>
        </div>
        <VendorsTable />
      </div>
    </AppShell>
  );
}

/** 09 · Vendor monitoring: stacked rating bars, monitored-spots gauge and the vendor list. */
export function Dashboard09() {
  const bars = threeYears.map((m, i) => ({
    month: m.month,
    high: 30 + (i % 4) * 4,
    mid: 18 + (i % 3) * 6,
    low: 20 + ((i * 7) % 15),
  }));
  return (
    <AppShell current="09" slim>
      <div className="dash">
        <PageHeader
          title="Welcome back, Olivia"
          actions={
            <>
              <IconButton icon={<Search />} label="Search" variant="secondary" appearance="ghost" />
              <Button variant="secondary" appearance="outline" iconStart={<SlidersHorizontal />}>
                Customize
              </Button>
              <Button variant="secondary" appearance="outline" iconStart={<Download />}>
                Export
              </Button>
            </>
          }
        />
        <div className="dash-grid dash-grid--2-1">
          <Panel
            title={
              <span className="row">
                <FeaturedIcon icon={<Boxes />} tone="secondary" appearance="solid" size="small" />
                Vendor breakdown
              </span>
            }
            description="Keep track of vendors and their security ratings."
            menu
            footer={
              <Button variant="secondary" appearance="outline" size="small">
                View full report
              </Button>
            }
          >
            <BarChart
              title="Security ratings by month"
              hideTitle
              stacked
              data={bars}
              xKey="month"
              series={[
                { key: 'high', label: 'High' },
                { key: 'mid', label: 'Medium', color: 7 },
                { key: 'low', label: 'Low', color: 8 },
              ]}
              height={220}
              showLegend={false}
            />
          </Panel>
          <Panel
            title="Vendors monitored"
            description="You’re using 80% of available spots."
            menu
            footer={
              <Button variant="secondary" appearance="outline" size="small" iconStart={<Zap />}>
                Upgrade plan
              </Button>
            }
          >
            <div className="dash-center">
              <Trend value="10%" />
              <ProgressCircle
                label="Vendors monitored"
                hideLabel
                value={80}
                shape="half"
                size="large"
                formatValue={() => '240'}
              />
              <strong>You’ve almost reached your limit</strong>
              <span className="muted text-sm">
                You have used 80% of your available spots. Upgrade to monitor more vendors.
              </span>
            </div>
          </Panel>
        </div>
        <VendorsTable
          description="Keep track of vendors and their security ratings."
          actions={
            <>
              <Button variant="secondary" appearance="outline" size="small" iconStart={<Upload />}>
                Import
              </Button>
              <Button size="small" iconStart={<Plus />}>
                Add vendor
              </Button>
            </>
          }
          toolbar={
            <div className="dash-toolbar">
              <Tabs appearance="segmented" size="small" defaultValue="all">
                <TabList label="Vendor status">
                  <Tab value="all">View all</Tab>
                  <Tab value="active">Active</Tab>
                  <Tab value="archived">Archived</Tab>
                </TabList>
                <TabPanel value="all" className="visually-hidden">
                  All vendors
                </TabPanel>
                <TabPanel value="active" className="visually-hidden">
                  Active vendors
                </TabPanel>
                <TabPanel value="archived" className="visually-hidden">
                  Archived vendors
                </TabPanel>
              </Tabs>
              <span className="dash-toolbar__end">
                <InputField
                  label="Search vendors"
                  hideLabel
                  size="small"
                  iconStart={<Search />}
                  shortcut="⌘K"
                  placeholder="Search"
                />
                <Button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  iconStart={<Filter />}
                >
                  Filters
                </Button>
              </span>
            </div>
          }
        />
      </div>
    </AppShell>
  );
}
