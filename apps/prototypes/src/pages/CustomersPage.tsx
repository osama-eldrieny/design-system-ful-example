import { useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmptyState,
  IconButton,
  InputField,
  MetricCard,
  PageHeader,
  Pagination,
  Progress,
  Select,
  SelectItem,
  Table,
  TableCard,
  type TableColumn,
} from '@ds/react';
import { Download, Monitor, MoreVertical, Search, SearchX, UserCheck, Users } from 'lucide-react';
import { avatars, companies, members, type CustomerStatus } from '../dashboard-data';
import { AdminShell } from '../shell/AdminShell';

type Company = (typeof companies)[number];
const statusTone: Record<CustomerStatus, 'success' | 'gray' | 'blue'> = {
  Customer: 'success',
  Churned: 'gray',
  Trial: 'blue',
};
const logoTone = ['primary', 'blue', 'gray', 'sky', 'purple', 'teal', 'success'] as const;

const columns: TableColumn<Company>[] = [
  {
    key: 'name',
    header: 'Company',
    sortable: true,
    render: (c) => (
      <span className="proto-company">
        <Avatar name={c.name} size="small" decorative />
        <span>
          <strong>{c.name}</strong>
          <span className="proto-muted">{c.domain}</span>
        </span>
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (c) => (
      <Badge tone={statusTone[c.status]} shape="modern" size="small" withDot>
        {c.status}
      </Badge>
    ),
  },
  {
    key: 'about',
    header: 'About',
    hideBelow: 'large',
    render: (c) => (
      <span className="proto-stack-text">
        <span>{c.about}</span>
        <span className="proto-muted">{c.detail}</span>
      </span>
    ),
  },
  {
    key: 'users',
    header: 'Users',
    hideBelow: 'medium',
    render: (c) => (
      <AvatarGroup label={`${c.users} users at ${c.name}`} max={4} size="xsmall">
        {Array.from({ length: c.users }, (_, i) => (
          <Avatar
            key={i}
            name={members[i % members.length].name}
            src={avatars[i % avatars.length]}
          />
        ))}
      </AvatarGroup>
    ),
  },
  {
    key: 'license',
    header: 'License use',
    sortable: true,
    width: 200,
    hint: 'Share of purchased seats in use.',
    render: (c) => (
      <Progress
        label={`${c.name} license use`}
        hideLabel
        value={c.license}
        showValue
        valuePosition="end"
        size="small"
      />
    ),
  },
  {
    key: 'actions',
    header: <span className="proto-visually-hidden">Actions</span>,
    width: 48,
    render: (c) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            icon={<MoreVertical />}
            label={`Actions for ${c.name}`}
            variant="secondary"
            appearance="ghost"
            size="small"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View account</DropdownMenuItem>
          <DropdownMenuItem>Send email</DropdownMenuItem>
          <DropdownMenuItem variant="danger">Cancel subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

/** Customers: key figures and a filterable list of companies with seats and license use. */
export default function CustomersPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const categories = [...new Set(companies.map((c) => c.category))];
  const rows = companies.filter(
    (c) =>
      (status === 'all' || c.status === status) &&
      (category === 'all' || c.category === category) &&
      `${c.name} ${c.domain} ${c.about}`.toLowerCase().includes(query.toLowerCase()),
  );
  const clear = () => {
    setQuery('');
    setStatus('all');
    setCategory('all');
  };

  return (
    <AdminShell
      current="customers"
      trail={[{ label: 'Home', href: '#/admin' }, { label: 'Customers' }]}
    >
      <div className="proto-page">
        <PageHeader
          title="Customers"
          description="Companies that have purchased a subscription."
          actions={
            <Button variant="secondary" appearance="outline" iconStart={<Download />}>
              Download all
            </Button>
          }
        />

        <section className="proto-metrics" aria-label="Customer figures">
          <MetricCard
            label="Total customers"
            value="2,420"
            change="20%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            icon={<Users />}
            layout="horizontal"
          />
          <MetricCard
            label="Members"
            value="1,210"
            change="15%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            icon={<UserCheck />}
            layout="horizontal"
          />
          <MetricCard
            label="Active now"
            value="316"
            icon={<Monitor />}
            layout="horizontal"
            footer={
              <AvatarGroup label="Active now" max={5} size="xsmall">
                {members.map((m) => (
                  <Avatar key={m.email} name={m.name} src={m.src} />
                ))}
              </AvatarGroup>
            }
          />
        </section>

        <TableCard
          title="Companies"
          titleAs="h2"
          badge={`${companies.length} companies`}
          toolbar={
            <div className="proto-filters">
              <InputField
                label="Search companies"
                size="small"
                iconStart={<Search />}
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Select label="Status" size="small" value={status} onValueChange={setStatus}>
                <SelectItem value="all">All</SelectItem>
                {(['Customer', 'Trial', 'Churned'] as const).map((s) => (
                  <SelectItem key={s} value={s} dot={statusTone[s]}>
                    {s}
                  </SelectItem>
                ))}
              </Select>
              <Select label="Category" size="small" value={category} onValueChange={setCategory}>
                <SelectItem value="all">View all</SelectItem>
                {categories.map((c, i) => (
                  <SelectItem key={c} value={c} dot={logoTone[i % logoTone.length]}>
                    {c}
                  </SelectItem>
                ))}
              </Select>
              <Button
                variant="secondary"
                appearance="outline"
                size="small"
                onClick={clear}
                className="proto-filters__clear"
              >
                Clear all
              </Button>
            </div>
          }
          footer={
            <Pagination
              currentPage={page}
              totalPages={10}
              onPageChange={setPage}
              showArrowLabels
              layout="spread"
              label="Company pages"
            />
          }
        >
          <Table<Company>
            caption="Companies"
            hideCaption
            columns={columns}
            rows={rows}
            getRowId={(c) => c.domain}
            selectable
            rowLabel={(c) => `Select ${c.name}`}
            empty={
              <EmptyState
                size="small"
                titleAs="h3"
                icon={<SearchX />}
                title="No companies found"
                description="Try other words or clear the filters."
                actions={
                  <Button variant="secondary" appearance="outline" size="small" onClick={clear}>
                    Clear filters
                  </Button>
                }
              />
            }
          />
        </TableCard>
      </div>
    </AdminShell>
  );
}
