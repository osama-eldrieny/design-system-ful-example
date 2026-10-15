import { useState } from 'react';
import {
  AvatarLabelGroup,
  Badge,
  Breadcrumb,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  EmptyState,
  InputField,
  MetricCard,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  PageHeader,
  Pagination,
  Select,
  SelectItem,
  Stepper,
  Table,
  TableCard,
  useToast,
  type TableColumn,
} from '@ds/react';
import {
  Ban,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  RotateCcw,
  Search,
  SearchX,
  Trash2,
} from 'lucide-react';
import { invoiceOrders } from '../dashboard-data';
import { AppShell } from '../shell/AppShell';

type Order = (typeof invoiceOrders)[number];
const tone = {
  Paid: 'success',
  Refunded: 'gray',
  Cancelled: 'danger',
  Pending: 'warning',
} as const;
const icon = {
  Paid: <CheckCircle2 />,
  Refunded: <RotateCcw />,
  Cancelled: <Ban />,
  Pending: <Clock />,
};

/** Orders: figures, filters, an invoice table with row actions, and an order detail drawer. */
export default function OrdersPage() {
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [purchase, setPurchase] = useState('all');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<Order | null>(null);
  const [remove, setRemove] = useState<Order | null>(null);

  const rows = invoiceOrders.filter(
    (o) =>
      (status === 'all' || o.status === status) &&
      (purchase === 'all' || o.purchase === purchase) &&
      `${o.id} ${o.customer.name} ${o.customer.email}`.toLowerCase().includes(query.toLowerCase()),
  );
  const clear = () => {
    setQuery('');
    setStatus('all');
    setPurchase('all');
  };

  const columns: TableColumn<Order>[] = [
    { key: 'id', header: 'Invoice', sortable: true },
    { key: 'date', header: 'Date', sortable: true, hideBelow: 'medium' },
    {
      key: 'status',
      header: 'Status',
      render: (o) => (
        <Badge tone={tone[o.status]} shape="modern" size="small" iconStart={icon[o.status]}>
          {o.status}
        </Badge>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (o) => (
        <AvatarLabelGroup
          name={o.customer.name}
          src={o.customer.src}
          supportingText={o.customer.email}
          size="small"
        />
      ),
    },
    { key: 'purchase', header: 'Purchase', hideBelow: 'large' },
    {
      key: 'amount',
      header: 'Amount',
      align: 'end',
      sortable: true,
      render: (o) => `$${o.amount.toLocaleString('en-US')}`,
    },
    {
      key: 'actions',
      header: <span className="visually-hidden">Actions</span>,
      align: 'end',
      render: (o) => (
        <span className="row">
          <Button appearance="text" variant="secondary" size="small" onClick={() => setRemove(o)}>
            Delete
          </Button>
          <Button appearance="text" size="small" onClick={() => setOpen(o)}>
            View
          </Button>
        </span>
      ),
    },
  ];

  return (
    <AppShell current="orders">
      <div className="page">
        <PageHeader
          breadcrumbs={
            <Breadcrumb homeIcon items={[{ label: 'Home', href: '#/app' }, { label: 'Orders' }]} />
          }
          title="Orders"
          description="Every invoice, its status and the customer."
          actions={
            <>
              <Button variant="secondary" appearance="outline" iconStart={<Download />}>
                Download PDF
              </Button>
              <Button variant="secondary" appearance="outline" iconStart={<Download />}>
                Download CSV
              </Button>
            </>
          }
        />

        <section className="grid-kpi" aria-label="Order figures">
          <MetricCard
            label="Orders this month"
            value="1,284"
            change="8.2%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            size="small"
          />
          <MetricCard
            label="Revenue"
            value="$124,567"
            change="12.5%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            size="small"
          />
          <MetricCard
            label="Refunds"
            value="23"
            change="4"
            trend="up"
            positive={false}
            trendStyle="simple"
            comparison="vs last month"
            size="small"
          />
          <MetricCard
            label="Average order"
            value="$97.02"
            change="1.8%"
            trend="down"
            trendStyle="simple"
            comparison="vs last month"
            size="small"
          />
        </section>

        <TableCard
          title="Invoices"
          titleAs="h2"
          badge={`${invoiceOrders.length} this week`}
          toolbar={
            <div className="proto-filters">
              <InputField
                label="Search for order"
                size="small"
                iconStart={<Search />}
                placeholder="Invoice, name or email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Select label="Status" size="small" value={status} onValueChange={setStatus}>
                <SelectItem value="all">All</SelectItem>
                {(['Paid', 'Pending', 'Refunded', 'Cancelled'] as const).map((s) => (
                  <SelectItem key={s} value={s} dot={tone[s]}>
                    {s}
                  </SelectItem>
                ))}
              </Select>
              <Select label="Purchase" size="small" value={purchase} onValueChange={setPurchase}>
                <SelectItem value="all">View all</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
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
              label="Invoice pages"
            />
          }
        >
          <Table<Order>
            caption="Invoices"
            hideCaption
            columns={columns}
            rows={rows}
            selectable
            rowLabel={(o) => `Select ${o.id}`}
            empty={
              <EmptyState
                size="small"
                titleAs="h3"
                icon={<SearchX />}
                title="No orders found"
                description="Try another search or clear the filters."
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

      <Drawer open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        {open && (
          <DrawerContent
            size="large"
            title={open.id}
            description={`${open.customer.name} · ${open.date}`}
          >
            <div className="page">
              <AvatarLabelGroup
                name={open.customer.name}
                src={open.customer.src}
                supportingText={open.customer.email}
                size="large"
              />
              <Stepper
                aria-label="Order progress"
                orientation="vertical"
                current={open.status === 'Paid' ? 3 : 1}
                steps={[
                  { label: 'Order placed', description: open.date },
                  { label: 'Payment', description: open.status },
                  { label: 'Invoice sent', description: 'By email' },
                  { label: 'Complete' },
                ]}
              />
              <Button variant="secondary" appearance="outline" iconStart={<FileText />}>
                Download invoice
              </Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button>Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>

      <Modal open={remove !== null} onOpenChange={(o) => !o && setRemove(null)}>
        {remove && (
          <ModalContent
            role="alertdialog"
            size="small"
            icon={<Trash2 />}
            iconTone="danger"
            title={`Delete ${remove.id}?`}
            description="The invoice is removed for everyone. This can’t be undone."
          >
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" appearance="outline">
                  Cancel
                </Button>
              </ModalClose>
              <Button
                variant="danger"
                onClick={() => {
                  setRemove(null);
                  toast({ title: 'Invoice deleted', tone: 'success' });
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </AppShell>
  );
}
