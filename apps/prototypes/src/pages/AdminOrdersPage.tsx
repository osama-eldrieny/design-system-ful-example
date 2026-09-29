import { useMemo, useState, type Key } from 'react';
import {
  Accordion,
  AccordionItem,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Checkbox,
  ChooseCard,
  ChooseCardGroup,
  Code,
  Combobox,
  Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Drawer,
  DrawerContent,
  DrawerFooter,
  EmptyState,
  Grid,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IconButton,
  Inline,
  InputField,
  Kbd,
  Link,
  List,
  ListItem,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  Pagination,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  SelectItem,
  Slider,
  Stack,
  Stat,
  Stepper,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  Tag,
  Textarea,
  Tooltip,
  useToast,
  type TableColumn,
} from '@ds/react';
import {
  Copy,
  Download,
  Eye,
  Filter,
  Plus,
  MoreHorizontal,
  PackageSearch,
  Printer,
  Trash2,
  Truck,
} from 'lucide-react';
import { money, orders as allOrders, statusTone, type Order, type OrderStatus } from '../data';
import { AdminShell } from '../shell/AdminShell';

const PER_PAGE = 10;
const tabs: ('All' | OrderStatus)[] = ['All', 'Paid', 'Pending', 'Shipped', 'Refunded', 'Failed'];

/** Orders: tabs, search, filter popover, sortable selectable table, bulk actions, detail drawer. */
export default function AdminOrdersPage() {
  const toast = useToast();
  const [orders, setOrders] = useState(allOrders);
  const [status, setStatus] = useState<'All' | OrderStatus>('All');
  const [query, setQuery] = useState('');
  const [minTotal, setMinTotal] = useState([0]);
  const [range, setRange] = useState('30');
  const [problemsOnly, setProblemsOnly] = useState(false);
  const [selected, setSelected] = useState<Key[]>([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<Order | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Key[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [newCustomer, setNewCustomer] = useState<string | null>(null);
  const [newTotal, setNewTotal] = useState('');
  const [formError, setFormError] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter(
      (o) =>
        (status === 'All' || o.status === status) &&
        o.total >= minTotal[0] &&
        (!problemsOnly || o.status === 'Failed' || o.status === 'Refunded') &&
        (!q || `${o.id} ${o.customer} ${o.email}`.toLowerCase().includes(q)),
    );
  }, [orders, status, query, minTotal, problemsOnly]);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const count = (s: 'All' | OrderStatus) =>
    s === 'All' ? orders.length : orders.filter((o) => o.status === s).length;

  const markShipped = (ids: Key[]) => {
    setOrders((all) =>
      all.map((o) => (ids.includes(o.id) && o.status === 'Paid' ? { ...o, status: 'Shipped' } : o)),
    );
    toast({
      title: `${ids.length} ${ids.length === 1 ? 'order' : 'orders'} marked as shipped`,
      tone: 'success',
    });
    setSelected([]);
  };
  const remove = (ids: Key[]) => {
    setOrders((all) => all.filter((o) => !ids.includes(o.id)));
    toast({
      title: `${ids.length} ${ids.length === 1 ? 'order' : 'orders'} deleted`,
      action: {
        label: 'Undo',
        onClick: () => setOrders(allOrders),
        altText: 'Reload the page to restore them',
      },
    });
    setSelected([]);
    setConfirmDelete(null);
    setOpen(null);
  };

  const columns: TableColumn<Order>[] = [
    { key: 'id', header: 'Order', sortable: true, sortValue: (o) => Number(o.id.slice(1)) },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
      render: (o) => (
        <Inline gap="xs" wrap={false}>
          <Avatar name={o.customer} size="small" decorative />
          <Stack gap="none">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href="#/admin/orders">{o.customer}</Link>
              </HoverCardTrigger>
              <HoverCardContent>
                <Stack gap="xs">
                  <Inline gap="sm" wrap={false}>
                    <Avatar name={o.customer} decorative />
                    <Stack gap="none">
                      <strong>{o.customer}</strong>
                      <span className="proto-muted">{o.email}</span>
                    </Stack>
                  </Inline>
                  <span className="proto-muted">{`${orders.filter((x) => x.customer === o.customer).length} orders · customer since 2024`}</span>
                </Stack>
              </HoverCardContent>
            </HoverCard>
            <span className="proto-muted">{o.email}</span>
          </Stack>
        </Inline>
      ),
    },
    { key: 'date', header: 'Date', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (o) => <Badge tone={statusTone[o.status]}>{o.status}</Badge>,
    },
    { key: 'total', header: 'Total', align: 'end', sortable: true, render: (o) => money(o.total) },
    {
      key: 'actions',
      header: <span className="proto-visually-hidden">Actions</span>,
      align: 'end',
      render: (o) => (
        <Inline gap="2xs" wrap={false} justify="end">
          <Tooltip content="View order">
            <IconButton
              size="small"
              appearance="ghost"
              variant="secondary"
              icon={<Eye />}
              label={`View order ${o.id}`}
              onClick={() => setOpen(o)}
            />
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                size="small"
                appearance="ghost"
                variant="secondary"
                icon={<MoreHorizontal />}
                label={`More actions for ${o.id}`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                icon={<Truck />}
                disabled={o.status !== 'Paid'}
                onSelect={() => markShipped([o.id])}
              >
                Mark as shipped
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={<Printer />}
                onSelect={() => toast({ title: `Printing invoice ${o.id}` })}
              >
                Print invoice
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={<Copy />}
                shortcut="⌘C"
                onSelect={() => toast({ title: `Copied ${o.id}` })}
              >
                Copy order number
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="danger"
                icon={<Trash2 />}
                onSelect={() => setConfirmDelete([o.id])}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Inline>
      ),
    },
  ];

  const activeFilters = Number(minTotal[0] > 0) + Number(range !== '30') + Number(problemsOnly);

  return (
    <AdminShell current="orders" trail={[{ label: 'Admin', href: '#/admin' }, { label: 'Orders' }]}>
      <Stack gap="lg">
        <Inline justify="between">
          <Stack gap="2xs">
            <h1 className="proto-hero-title">Orders</h1>
            <p className="proto-muted">
              Press <Kbd keys={['Ctrl', 'K']} /> to search anywhere.
            </p>
          </Stack>
          <Inline gap="sm">
            <Button
              appearance="outline"
              variant="secondary"
              iconStart={<Download />}
              onClick={() =>
                toast({ title: 'Export started', description: 'We’ll email you the CSV.' })
              }
            >
              Export
            </Button>
            <Button iconStart={<Plus />} onClick={() => setCreating(true)}>
              New order
            </Button>
          </Inline>
        </Inline>

        <Grid stretch minItemWidth="12rem" as="section" aria-label="Order summary">
          <Card appearance="outlined">
            <CardBody>
              <Stat
                label="Open orders"
                value={String(count('Paid') + count('Pending'))}
                help="to fulfil"
              />
            </CardBody>
          </Card>
          <Card appearance="outlined">
            <CardBody>
              <Stat
                label="Shipped"
                value={String(count('Shipped'))}
                change="+6"
                trend="up"
                help="this week"
              />
            </CardBody>
          </Card>
          <Card appearance="outlined">
            <CardBody>
              <Stat
                label="Needs attention"
                value={String(count('Failed') + count('Refunded'))}
                help="failed or refunded"
              />
            </CardBody>
          </Card>
          <Card appearance="outlined">
            <CardBody>
              <Stat
                label="Average order"
                value={money(
                  Math.round(orders.reduce((a, o) => a + o.total, 0) / Math.max(orders.length, 1)),
                )}
                change="+3.1%"
                trend="up"
              />
            </CardBody>
          </Card>
        </Grid>

        <Tabs
          value={status}
          onValueChange={(v) => {
            setStatus(v as typeof status);
            setPage(1);
            setSelected([]);
          }}
          appearance="pill"
        >
          <TabList label="Order status">
            {tabs.map((t) => (
              <Tab key={t} value={t}>
                {`${t} (${count(t)})`}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        <Card>
          <CardBody>
            <Stack gap="md">
              <Inline justify="between" gap="sm">
                <div className="proto-grow">
                  <SearchField
                    label="Search orders"
                    placeholder="Order, customer or email"
                    value={query}
                    onValueChange={(v) => {
                      setQuery(v);
                      setPage(1);
                    }}
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button appearance="outline" variant="secondary" iconStart={<Filter />}>
                      {activeFilters ? `Filters (${activeFilters})` : 'Filters'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent title="Filter orders" align="end">
                    <Stack gap="md">
                      <Select
                        label="Date range"
                        size="small"
                        value={range}
                        onValueChange={setRange}
                      >
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                      </Select>
                      <Slider
                        label="Minimum total"
                        min={0}
                        max={400}
                        step={20}
                        value={minTotal}
                        onValueChange={setMinTotal}
                        showValue
                        formatValue={(v) => money(v)}
                      />
                      <Checkbox
                        label="Only orders with a problem"
                        description="Failed or refunded"
                        checked={problemsOnly}
                        onCheckedChange={setProblemsOnly}
                      />
                      <Inline justify="end">
                        <Button
                          size="small"
                          appearance="text"
                          onClick={() => {
                            setMinTotal([0]);
                            setRange('30');
                            setProblemsOnly(false);
                          }}
                        >
                          Reset
                        </Button>
                        <PopoverClose asChild>
                          <Button size="small">Done</Button>
                        </PopoverClose>
                      </Inline>
                    </Stack>
                  </PopoverContent>
                </Popover>
              </Inline>

              {(activeFilters > 0 || query) && (
                <Inline gap="xs" role="group" aria-label="Active filters">
                  {query && <Tag onRemove={() => setQuery('')}>{`Search: ${query}`}</Tag>}
                  {minTotal[0] > 0 && (
                    <Tag onRemove={() => setMinTotal([0])}>{`Over ${money(minTotal[0])}`}</Tag>
                  )}
                  {range !== '30' && (
                    <Tag onRemove={() => setRange('30')}>{`Last ${range} days`}</Tag>
                  )}
                  {problemsOnly && (
                    <Tag onRemove={() => setProblemsOnly(false)}>With a problem</Tag>
                  )}
                </Inline>
              )}

              {selected.length > 0 && (
                <Inline
                  className="proto-bulk"
                  justify="between"
                  role="region"
                  aria-label="Bulk actions"
                >
                  <strong>{`${selected.length} selected`}</strong>
                  <Inline gap="xs">
                    <Button
                      size="small"
                      appearance="outline"
                      variant="secondary"
                      iconStart={<Truck />}
                      onClick={() => markShipped(selected)}
                    >
                      Mark shipped
                    </Button>
                    <Button
                      size="small"
                      appearance="outline"
                      variant="danger"
                      iconStart={<Trash2 />}
                      onClick={() => setConfirmDelete(selected)}
                    >
                      Delete
                    </Button>
                  </Inline>
                </Inline>
              )}

              {filtered.length === 0 ? (
                <EmptyState
                  icon={<PackageSearch />}
                  titleAs="h2"
                  title="No orders found"
                  description="Try another search or status, or reset the filters."
                />
              ) : (
                <>
                  <Table
                    caption="Orders"
                    hideCaption
                    columns={columns}
                    rows={rows}
                    selectable
                    selected={selected}
                    onSelectionChange={setSelected}
                    rowLabel={(o) => `Select order ${o.id}`}
                    defaultSort={{ key: 'date', direction: 'descending' }}
                  />
                  <Divider />
                  <Inline justify="between">
                    <span className="proto-muted">{`Showing ${(current - 1) * PER_PAGE + 1}–${Math.min(current * PER_PAGE, filtered.length)} of ${filtered.length}`}</span>
                    <Pagination
                      currentPage={current}
                      totalPages={pages}
                      onPageChange={setPage}
                      label="Order pages"
                    />
                  </Inline>
                </>
              )}
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Drawer open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        {open && (
          <DrawerContent title={`Order ${open.id}`} description={`${open.customer} · ${open.date}`}>
            <Tabs defaultValue="status" appearance="line">
              <TabList label="Order details">
                <Tab value="status">Status</Tab>
                <Tab value="items">Items</Tab>
                <Tab value="notes">Notes</Tab>
              </TabList>
              <TabPanel value="status">
                <Stack gap="lg">
                  <Inline gap="xs">
                    <Badge tone={statusTone[open.status]}>{open.status}</Badge>
                    <span className="proto-muted">
                      Tracking <Code>{`TH-${open.id.slice(1)}-UAE`}</Code>
                    </span>
                  </Inline>
                  <Stepper
                    aria-label="Fulfilment"
                    orientation="vertical"
                    current={open.status === 'Shipped' ? 3 : open.status === 'Paid' ? 1 : 0}
                    steps={[
                      { label: 'Placed', description: open.date },
                      {
                        label: 'Paid',
                        error: open.status === 'Failed',
                        description: open.status === 'Failed' ? 'Card declined' : undefined,
                      },
                      { label: 'Packed' },
                      { label: 'Shipped' },
                    ]}
                  />
                </Stack>
              </TabPanel>
              <TabPanel value="items">
                <Stack gap="md">
                  <Accordion type="single" collapsible defaultValue="line-0">
                    {Array.from({ length: open.items }, (_, i) => (
                      <AccordionItem key={i} value={`line-${i}`} title={`Item ${i + 1}`}>
                        {`Qty 1 · ${money(Math.round((open.total / open.items) * 100) / 100)}`}
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <List divided>
                    <ListItem title="Total" meta={money(open.total)} />
                    <ListItem title="Email" meta={open.email} />
                  </List>
                </Stack>
              </TabPanel>
              <TabPanel value="notes">
                <Textarea
                  label="Internal note"
                  description="Only your team sees this."
                  rows={4}
                  maxLength={280}
                  showCount
                />
              </TabPanel>
            </Tabs>
            <DrawerFooter>
              <Button
                appearance="outline"
                variant="danger"
                iconStart={<Trash2 />}
                onClick={() => setConfirmDelete([open.id])}
              >
                Delete
              </Button>
              <Button
                iconStart={<Truck />}
                disabled={open.status !== 'Paid'}
                onClick={() => {
                  markShipped([open.id]);
                  setOpen(null);
                }}
              >
                Mark shipped
              </Button>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>

      <Modal open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <ModalContent
          role="alertdialog"
          size="small"
          title={
            confirmDelete?.length === 1
              ? `Delete order ${confirmDelete[0]}?`
              : `Delete ${confirmDelete?.length} orders?`
          }
          description="The customer isn’t notified. You can undo right after."
        >
          <ModalFooter>
            <ModalClose asChild>
              <Button appearance="outline" variant="secondary">
                Cancel
              </Button>
            </ModalClose>
            <Button variant="danger" onClick={() => confirmDelete && remove(confirmDelete)}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        open={creating}
        onOpenChange={(o) => {
          setCreating(o);
          setFormError(false);
        }}
      >
        <ModalContent title="New order" description="Create a manual order, e.g. for a phone sale.">
          <form
            id="new-order"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!newCustomer || !newTotal) return setFormError(true);
              setCreating(false);
              setNewCustomer(null);
              setNewTotal('');
              toast({ title: 'Order created', tone: 'success' });
            }}
          >
            <Stack gap="md">
              <Combobox
                label="Customer"
                placeholder="Type a name"
                required
                options={[...new Set(allOrders.map((o) => o.customer))].map((c) => ({
                  value: c,
                  label: c,
                }))}
                value={newCustomer}
                onValueChange={setNewCustomer}
                error={formError && !newCustomer ? 'Choose a customer.' : undefined}
              />
              <InputField
                label="Total"
                inputMode="decimal"
                required
                value={newTotal}
                onChange={(e) => setNewTotal(e.target.value)}
                error={formError && !newTotal ? 'Enter the order total.' : undefined}
              />
              <RadioGroup label="Payment" defaultValue="card" orientation="horizontal">
                <Radio value="card" label="Card" />
                <Radio value="cash" label="Cash" />
                <Radio value="invoice" label="Invoice" />
              </RadioGroup>
              <h3 className="proto-subtitle" id="delivery-label">
                Delivery
              </h3>
              <ChooseCardGroup aria-labelledby="delivery-label" defaultValue="standard">
                <ChooseCard value="standard" title="Standard" description="3–5 days" price="Free" />
                <ChooseCard value="express" title="Express" description="Next day" price="$12" />
              </ChooseCardGroup>
            </Stack>
          </form>
          <ModalFooter>
            <ModalClose asChild>
              <Button appearance="outline" variant="secondary">
                Cancel
              </Button>
            </ModalClose>
            <Button type="submit" form="new-order">
              Create order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminShell>
  );
}
