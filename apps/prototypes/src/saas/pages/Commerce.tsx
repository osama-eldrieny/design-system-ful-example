/**
 * Orbit's E-commerce pages: products, add product, billing, invoices (list, single, create),
 * transactions (list, single). Structure follows TailAdmin; visuals are @ds/react.
 */
import { useMemo, useState, type ReactNode } from 'react';
import {
  ActivityFeed,
  AvatarLabelGroup,
  Badge,
  Button,
  Divider,
  FeaturedIcon,
  FileUpload,
  IconButton,
  InputField,
  MetricCard,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  Progress,
  Select,
  SelectItem,
  Table,
  Tabs,
  Tab,
  TabList,
  Textarea,
  useToast,
  type TableColumn,
} from '@ds/react';
import {
  AlarmClock,
  Check,
  Clock,
  CreditCard,
  Download,
  Eye,
  Mail,
  Package,
  Pencil,
  Plus,
  Printer,
  Receipt,
  RotateCcw,
  ShoppingCart,
  Trash2,
  Wallet,
} from 'lucide-react';
import { go } from '../../router';
import { people } from '../data';
import { Page, to } from '../Shell';
import { DataTable, Panel, RowMenu, Status, Toggle } from '../ui';

const usd = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ---------------------------------------------------------------- data */

const catalog = [
  ['MacBook Pro 13”', 'Laptop', 'Apple', 2399, 24],
  ['Apple Watch Ultra', 'Watch', 'Apple', 879, 8],
  ['iPhone 15 Pro Max', 'Phone', 'Apple', 1869, 52],
  ['iPad Pro 3rd Gen', 'Electronics', 'Apple', 1699, 0],
  ['AirPods Pro 2nd Gen', 'Accessories', 'Apple', 240, 140],
  ['Galaxy S24 Ultra', 'Phone', 'Samsung', 1299, 31],
  ['Galaxy Watch 6', 'Watch', 'Samsung', 349, 12],
  ['UltraGear 27” monitor', 'Electronics', 'LG', 449, 18],
  ['Gram 16 laptop', 'Laptop', 'LG', 1599, 6],
  ['Galaxy Buds 3', 'Accessories', 'Samsung', 179, 0],
  ['StanbyME Go', 'Electronics', 'LG', 999, 4],
  ['Magic Keyboard', 'Accessories', 'Apple', 299, 77],
].map(([name, category, brand, price, stock], i) => ({
  id: `P-${1040 + i}`,
  name: name as string,
  category: category as string,
  brand: brand as string,
  price: price as number,
  stock: stock as number,
  created: `${12 - (i % 12)} Oct 2026`,
}));

type Product = (typeof catalog)[number];

const stockStatus = (n: number) => (n === 0 ? 'Out of stock' : n < 10 ? 'Low stock' : 'In stock');

const invoiceRows = people.flatMap((p, i) => [
  {
    id: `INV-${2048 + i * 2}`,
    p,
    created: `${2 + i} Oct 2026`,
    due: `${16 + i} Oct 2026`,
    total: 420 + i * 137.5,
    status: ['Paid', 'Unpaid', 'Draft', 'Paid', 'Overdue', 'Paid', 'Unpaid', 'Paid'][i],
  },
  {
    id: `INV-${2049 + i * 2}`,
    p,
    created: `${1 + i} Sep 2026`,
    due: `${15 + i} Sep 2026`,
    total: 210 + i * 92.25,
    status: ['Paid', 'Paid', 'Unpaid', 'Draft', 'Paid', 'Overdue', 'Paid', 'Paid'][i],
  },
]);
type InvoiceRow = (typeof invoiceRows)[number];

const lineItems = [
  { product: 'MacBook Pro 13”', qty: 1, unit: 1200, discount: 0 },
  { product: 'Apple Watch Ultra', qty: 1, unit: 300, discount: 50 },
  { product: 'iPhone 15 Pro Max', qty: 2, unit: 800, discount: 0 },
  { product: 'iPad Pro 3rd Gen', qty: 1, unit: 900, discount: 0 },
];
type Line = (typeof lineItems)[number];
const lineTotal = (l: Line) => l.qty * l.unit * (1 - l.discount / 100);

const txns = people.flatMap((p, i) => [
  {
    id: `#${34834 + i * 3}`,
    p,
    amount: 4235 - i * 310,
    due: `${25 - i} Aug 2026`,
    status: [
      'Completed',
      'Pending',
      'Completed',
      'Failed',
      'Completed',
      'Completed',
      'Pending',
      'Completed',
    ][i],
    days: i * 2,
  },
  {
    id: `#${34835 + i * 3}`,
    p,
    amount: 980 + i * 120,
    due: `${20 - i} Aug 2026`,
    status: [
      'Completed',
      'Completed',
      'Refunded',
      'Completed',
      'Pending',
      'Completed',
      'Completed',
      'Failed',
    ][i],
    days: i * 3 + 1,
  },
]);
type Txn = (typeof txns)[number];

/* ----------------------------------------------------------- helpers */

function Filters({
  first,
  second,
  extra,
}: {
  first: [string, string[]];
  second: [string, string[]];
  extra?: ReactNode;
}) {
  return (
    <div className="orbit-toolbar">
      <span className="row">
        {[first, second].map(([label, options]) => (
          <Select key={label} label={label} hideLabel placeholder={label} size="small">
            {options.map((o) => (
              <SelectItem key={o} value={o.toLowerCase()}>
                {o}
              </SelectItem>
            ))}
          </Select>
        ))}
        <Button size="small" variant="secondary" appearance="outline">
          Apply
        </Button>
      </span>
      {extra}
    </div>
  );
}

/** The line items, subtotal, VAT and total of an order or invoice. */
function OrderLines({ lines, onRemove }: { lines: Line[]; onRemove?: (i: number) => void }) {
  const sub = lines.reduce((s, l) => s + lineTotal(l), 0);
  const columns: TableColumn<Line & { n: number }>[] = [
    { key: 'n', header: 'No.', width: 56 },
    { key: 'product', header: 'Product', render: (l) => <strong>{l.product}</strong> },
    { key: 'qty', header: 'Qty', align: 'end' },
    {
      key: 'unit',
      header: 'Unit cost',
      align: 'end',
      hideBelow: 'small',
      render: (l) => usd(l.unit),
    },
    {
      key: 'discount',
      header: 'Discount',
      align: 'end',
      hideBelow: 'medium',
      render: (l) => `${l.discount}%`,
    },
    { key: 'total', header: 'Total', align: 'end', render: (l) => usd(lineTotal(l)) },
    ...(onRemove
      ? [
          {
            key: 'remove',
            header: <span className="visually-hidden">Remove</span>,
            width: 48,
            render: (l: Line & { n: number }) => (
              <IconButton
                icon={<Trash2 />}
                label={`Remove ${l.product}`}
                variant="secondary"
                appearance="ghost"
                size="small"
                onClick={() => onRemove(l.n - 1)}
              />
            ),
          },
        ]
      : []),
  ];
  return (
    <>
      <div className="orbit-table">
        <Table
          caption="Order lines"
          hideCaption
          columns={columns}
          rows={lines.map((l, i) => ({ ...l, n: i + 1 }))}
          getRowId={(l) => `${l.n}`}
          empty="No products yet."
        />
      </div>
      <dl className="orbit-totals">
        <dt>Subtotal</dt>
        <dd>{usd(sub)}</dd>
        <dt>VAT (10%)</dt>
        <dd>{usd(sub * 0.1)}</dd>
        <dt className="orbit-totals__grand">Total</dt>
        <dd className="orbit-totals__grand">{usd(sub * 1.1)}</dd>
      </dl>
    </>
  );
}

/* ------------------------------------------------------------- products */

function Products() {
  const toast = useToast();
  const [remove, setRemove] = useState<Product | null>(null);
  const columns: TableColumn<Product>[] = [
    {
      key: 'name',
      header: 'Product',
      sortable: true,
      render: (p) => (
        <span className="row">
          <FeaturedIcon icon={<Package />} size="small" appearance="modern" shape="square" />
          <span className="stack-text">
            <strong>{p.name}</strong>
            <span className="muted text-sm">{p.id}</span>
          </span>
        </span>
      ),
    },
    { key: 'category', header: 'Category', hideBelow: 'medium' },
    { key: 'brand', header: 'Brand', hideBelow: 'large' },
    { key: 'price', header: 'Price', align: 'end', sortable: true, render: (p) => usd(p.price) },
    { key: 'stock', header: 'Stock', render: (p) => <Status>{stockStatus(p.stock)}</Status> },
    { key: 'created', header: 'Created', hideBelow: 'large' },
    {
      key: 'menu',
      header: <span className="visually-hidden">Actions</span>,
      width: 48,
      render: (p) => (
        <RowMenu
          label={p.name}
          onView={() => go('/saas/commerce/add-product')}
          onDelete={() => setRemove(p)}
        />
      ),
    },
  ];
  return (
    <Page
      path="/commerce/products"
      title="Products"
      description="Track your store’s catalogue and stock."
      actions={
        <>
          <Button variant="secondary" appearance="outline" iconStart={<Download />}>
            Export
          </Button>
          <Button iconStart={<Plus />} href={to('/commerce/add-product')}>
            Add product
          </Button>
        </>
      }
    >
      <DataTable
        title="All products"
        badge={`${catalog.length} products`}
        toolbar={
          <Filters
            first={['Category', ['Laptop', 'Phone', 'Watch', 'Electronics', 'Accessories']]}
            second={['Brand', ['Apple', 'Samsung', 'LG']]}
          />
        }
        columns={columns}
        rows={catalog}
        rowId={(p) => p.id}
        selectable
        rowLabel={(p) => `Select ${p.name}`}
        pageSize={8}
      />
      <Modal open={remove !== null} onOpenChange={(o) => !o && setRemove(null)}>
        {remove && (
          <ModalContent
            role="alertdialog"
            size="small"
            icon={<Trash2 />}
            iconTone="danger"
            title={`Delete ${remove.name}?`}
            description="It’s removed from your store and every open cart."
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
                  toast({ title: 'Product deleted', tone: 'success' });
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </Page>
  );
}

function AddProduct() {
  const toast = useToast();
  const opts = (list: string[]) =>
    list.map((o) => (
      <SelectItem key={o} value={o.toLowerCase()}>
        {o}
      </SelectItem>
    ));
  return (
    <Page
      path="/commerce/add-product"
      description="Describe the product, set its price and stock, then add photos."
      actions={
        <>
          <Button
            variant="secondary"
            appearance="outline"
            onClick={() => toast({ title: 'Saved as draft' })}
          >
            Save draft
          </Button>
          <Button onClick={() => toast({ title: 'Product published', tone: 'success' })}>
            Publish product
          </Button>
        </>
      }
    >
      <Panel title="Product description">
        <div className="orbit-form">
          <InputField label="Product name" required placeholder="e.g. MacBook Pro 13”" />
          <div className="orbit-form__two">
            <Select label="Category" placeholder="Select category">
              {opts(['Laptop', 'Phone', 'Watch', 'Electronics', 'Accessories'])}
            </Select>
            <Select label="Brand" placeholder="Select brand">
              {opts(['Apple', 'Samsung', 'LG'])}
            </Select>
          </div>
          <div className="orbit-form__three">
            <Select label="Color" placeholder="Select color">
              {opts(['Black', 'White', 'Silver', 'Blue', 'Gold'])}
            </Select>
            <InputField label="Weight" type="number" suffix="kg" />
            <InputField label="Length" type="number" suffix="cm" />
            <InputField label="Width" type="number" suffix="cm" />
          </div>
          <Textarea
            label="Description"
            rows={5}
            maxLength={600}
            showCount
            placeholder="What makes it worth buying?"
          />
        </div>
      </Panel>
      <Panel title="Pricing & availability">
        <div className="orbit-form__three">
          <InputField label="Price" type="number" prefix="$" required />
          <Select label="Discount" defaultValue="0">
            {['0', '10', '20', '50'].map((d) => (
              <SelectItem key={d} value={d}>{`${d}%`}</SelectItem>
            ))}
          </Select>
          <InputField label="Stock quantity" type="number" />
          <Select label="Availability" placeholder="Select availability">
            {opts(['In stock', 'Out of stock', 'Pre-order'])}
          </Select>
        </div>
      </Panel>
      <Panel title="Product images">
        <FileUpload
          id="product-images"
          multiple
          accept="image/*"
          hint="SVG, PNG, JPG or GIF (max. 800×400px)"
        />
      </Panel>
    </Page>
  );
}

/* --------------------------------------------------------------- billing */

function Billing() {
  const toast = useToast();
  const [cards, setCards] = useState([
    { id: 'mc', brand: 'Mastercard', detail: '•••• 9029 · expires 01/28' },
    { id: 'visa', brand: 'Visa', detail: '•••• 4328 · expires 01/29' },
    { id: 'pp', brand: 'PayPal', detail: 'maya@orbit.app' },
  ]);
  const [primary, setPrimary] = useState('mc');
  return (
    <Page path="/commerce/billing" description="Your plan, payment methods and invoices.">
      <div className="orbit-row">
        <Panel
          title="Professional plan"
          description="$199.00 per month · renews 22 Mar 2027"
          actions={
            <Badge tone="primary" shape="modern">
              Current plan
            </Badge>
          }
          footer={
            <>
              <Button variant="secondary" appearance="outline">
                Cancel subscription
              </Button>
              <Button href={to('/pages/pricing')}>Upgrade plan</Button>
            </>
          }
        >
          <Progress
            label="Orders this month"
            value={15299}
            max={25000}
            showValue
            formatValue={(v, m) => `${v.toLocaleString('en-US')} of ${m.toLocaleString('en-US')}`}
          />
          <ul className="orbit-checks">
            {[
              '25,000 orders per month',
              'Unlimited integrations',
              '30% AutoFile discount',
              '10 GB storage',
              'Custom templates',
              'Advanced marketing tools',
            ].map((b) => (
              <li key={b}>
                <Check aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel
          title="Payment methods"
          actions={
            <Button size="small" variant="secondary" appearance="outline" iconStart={<Plus />}>
              Add card
            </Button>
          }
        >
          <ul className="orbit-list">
            {cards.map((c) => (
              <li key={c.id} className="orbit-method">
                <FeaturedIcon
                  icon={c.id === 'pp' ? <Wallet /> : <CreditCard />}
                  appearance="modern"
                  shape="square"
                />
                <span className="stack-text">
                  <strong>
                    {c.brand}{' '}
                    {primary === c.id && (
                      <Badge tone="success" shape="modern" size="small">
                        Default
                      </Badge>
                    )}
                  </strong>
                  <span className="muted text-sm">{c.detail}</span>
                </span>
                <span className="row">
                  {primary !== c.id && (
                    <Button appearance="text" size="small" onClick={() => setPrimary(c.id)}>
                      Make default
                    </Button>
                  )}
                  <IconButton
                    icon={<Pencil />}
                    label={`Edit ${c.brand}`}
                    variant="secondary"
                    appearance="ghost"
                    size="small"
                  />
                  <IconButton
                    icon={<Trash2 />}
                    label={`Delete ${c.brand}`}
                    variant="secondary"
                    appearance="ghost"
                    size="small"
                    disabled={primary === c.id}
                    onClick={() => {
                      setCards((l) => l.filter((x) => x.id !== c.id));
                      toast({ title: `${c.brand} removed` });
                    }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <DataTable
        title="Invoices"
        description="Every invoice for your workspace."
        actions={
          <Button variant="secondary" appearance="outline" size="small" iconStart={<Download />}>
            Download all
          </Button>
        }
        rows={['Oct', 'Sep', 'Aug', 'Jul', 'Jun', 'May', 'Apr', 'Mar'].map((m, i) => ({
          name: `Invoice #${3120 - i}`,
          date: `1 ${m} 2026`,
          price: '$199.00',
          plan: 'Professional',
          status: i === 0 ? 'Pending' : 'Paid',
        }))}
        rowId={(r) => r.name}
        columns={[
          { key: 'name', header: 'Name', render: (r) => <strong>{r.name}</strong> },
          { key: 'date', header: 'Date', hideBelow: 'small' },
          { key: 'price', header: 'Price', align: 'end' },
          { key: 'plan', header: 'Plan', hideBelow: 'medium' },
          { key: 'status', header: 'Status', render: (r) => <Status>{r.status}</Status> },
          {
            key: 'dl',
            header: <span className="visually-hidden">Download</span>,
            width: 48,
            render: (r) => (
              <IconButton
                icon={<Download />}
                label={`Download ${r.name}`}
                variant="secondary"
                appearance="ghost"
                size="small"
              />
            ),
          },
        ]}
      />
    </Page>
  );
}

/* -------------------------------------------------------------- invoices */

function Invoices() {
  const [tab, setTab] = useState('all');
  const rows = invoiceRows.filter(
    (r) =>
      tab === 'all' ||
      (tab === 'unpaid' ? ['Unpaid', 'Overdue'].includes(r.status) : r.status === 'Draft'),
  );
  return (
    <Page
      path="/commerce/invoices"
      description="Create, send and track invoices."
      actions={
        <Button iconStart={<Plus />} href={to('/commerce/create-invoice')}>
          Create invoice
        </Button>
      }
    >
      <section className="orbit-grid" aria-label="Invoice summary">
        <MetricCard
          label="Overdue"
          value="$120.80"
          icon={<AlarmClock />}
          iconTone="danger"
          size="small"
        />
        <MetricCard label="Due in the next 30 days" value="$0.00" icon={<Clock />} size="small" />
        <MetricCard
          label="Average time to get paid"
          value="24 days"
          icon={<Receipt />}
          size="small"
        />
        <MetricCard
          label="Upcoming payout"
          value="$3,450.50"
          icon={<Wallet />}
          iconTone="success"
          size="small"
        />
      </section>
      <DataTable
        title="Invoices"
        toolbar={
          <div className="orbit-toolbar">
            <Tabs panels={false} appearance="line" value={tab} onValueChange={setTab}>
              <TabList label="Invoice status">
                <Tab value="all">All invoices</Tab>
                <Tab value="unpaid">Unpaid</Tab>
                <Tab value="draft">Draft</Tab>
              </TabList>
            </Tabs>
            <Filters
              first={['Category', ['Services', 'Products', 'Subscriptions']]}
              second={['Customer', people.slice(0, 5).map((p) => p.name)]}
              extra={
                <Button
                  size="small"
                  variant="secondary"
                  appearance="outline"
                  iconStart={<Download />}
                >
                  Export
                </Button>
              }
            />
          </div>
        }
        rows={rows}
        rowId={(r) => r.id}
        selectable
        rowLabel={(r) => `Select ${r.id}`}
        columns={
          [
            { key: 'id', header: 'Invoice', render: (r) => <strong>{r.id}</strong> },
            {
              key: 'p',
              header: 'Customer',
              render: (r) => <AvatarLabelGroup name={r.p.name} src={r.p.src} size="small" />,
            },
            { key: 'created', header: 'Created', hideBelow: 'large' },
            { key: 'due', header: 'Due', hideBelow: 'medium' },
            { key: 'total', header: 'Total', align: 'end', render: (r) => usd(r.total) },
            { key: 'status', header: 'Status', render: (r) => <Status>{r.status}</Status> },
            {
              key: 'view',
              header: <span className="visually-hidden">Open</span>,
              width: 48,
              render: (r) => (
                <IconButton
                  icon={<Eye />}
                  label={`Open ${r.id}`}
                  variant="secondary"
                  appearance="ghost"
                  size="small"
                  onClick={() => go('/saas/commerce/invoice')}
                />
              ),
            },
          ] satisfies TableColumn<InvoiceRow>[]
        }
        pageSize={8}
      />
    </Page>
  );
}

function Party({ label, name, lines }: { label: string; name: string; lines: string[] }) {
  return (
    <div className="stack-text">
      <span className="muted text-sm">{label}</span>
      <strong>{name}</strong>
      {lines.map((l) => (
        <span key={l} className="muted text-sm">
          {l}
        </span>
      ))}
    </div>
  );
}

function SingleInvoice() {
  return (
    <Page
      path="/commerce/invoice"
      title="Invoice #348"
      description="Issued 11 Mar 2027 · due 16 Mar 2027"
      actions={
        <>
          <Button
            variant="secondary"
            appearance="outline"
            iconStart={<Printer />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button iconStart={<CreditCard />}>Proceed to payment</Button>
        </>
      }
    >
      <section className="panel orbit-document" aria-label="Invoice">
        <div className="orbit-document__head">
          <Party
            label="From"
            name="Orbit Labs LLC"
            lines={['1280 Rua Augusta', 'Lisbon 1100-053, Portugal']}
          />
          <Party
            label="To"
            name="Albert Ward"
            lines={['355 Shobe Lane', 'Fort Collins, CO 80525']}
          />
          <Status>Unpaid</Status>
        </div>
        <Divider />
        <OrderLines lines={lineItems} />
      </section>
    </Page>
  );
}

function CreateInvoice() {
  const toast = useToast();
  const [lines, setLines] = useState<Line[]>(lineItems.slice(0, 2));
  const [draft, setDraft] = useState({ product: '', unit: '', qty: '1', discount: '0' });
  const add = () => {
    if (!draft.product || !draft.unit) return;
    setLines((l) => [
      ...l,
      {
        product: draft.product,
        unit: Number(draft.unit),
        qty: Number(draft.qty) || 1,
        discount: Number(draft.discount),
      },
    ]);
    setDraft({ product: '', unit: '', qty: '1', discount: '0' });
  };
  return (
    <Page
      path="/commerce/create-invoice"
      description="Fill in the customer and products; totals update as you go."
      actions={
        <>
          <Button
            variant="secondary"
            appearance="outline"
            iconStart={<Eye />}
            href={to('/commerce/invoice')}
          >
            Preview
          </Button>
          <Button onClick={() => toast({ title: 'Invoice saved', tone: 'success' })}>
            Save invoice
          </Button>
        </>
      }
    >
      <Panel title="Invoice details">
        <div className="orbit-form__three">
          <InputField label="Invoice number" defaultValue="#34834" />
          <InputField label="Customer name" placeholder="Jane Cooper" />
          <InputField label="Customer address" placeholder="Street, city, postcode" />
          <Select label="Payment terms" defaultValue="net30">
            {[
              'Due on receipt',
              'Net 7',
              'Net 15',
              'Net 30',
              'Net 60',
              'Net 90',
              'Cash on delivery',
            ].map((o) => (
              <SelectItem key={o} value={o.toLowerCase().replace(/ /g, '')}>
                {o}
              </SelectItem>
            ))}
          </Select>
          <Select label="Currency" defaultValue="usd">
            {['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'AED'].map((c) => (
              <SelectItem key={c} value={c.toLowerCase()}>
                {c}
              </SelectItem>
            ))}
          </Select>
          <InputField label="Issue date" type="date" defaultValue="2026-10-15" />
          <InputField label="Due date" type="date" defaultValue="2026-11-14" />
        </div>
        <Textarea label="Additional info" rows={3} placeholder="Thanks for your business." />
      </Panel>
      <Panel title="Products">
        <form
          className="orbit-line-editor"
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
        >
          <InputField
            label="Product name"
            value={draft.product}
            onChange={(e) => setDraft({ ...draft, product: e.target.value })}
          />
          <InputField
            label="Price"
            type="number"
            prefix="$"
            value={draft.unit}
            onChange={(e) => setDraft({ ...draft, unit: e.target.value })}
          />
          <InputField
            label="Quantity"
            type="number"
            value={draft.qty}
            onChange={(e) => setDraft({ ...draft, qty: e.target.value })}
          />
          <Select
            label="Discount"
            value={draft.discount}
            onValueChange={(v) => setDraft({ ...draft, discount: v })}
          >
            {['0', '10', '20', '50'].map((d) => (
              <SelectItem key={d} value={d}>{`${d}%`}</SelectItem>
            ))}
          </Select>
          <Button type="submit" iconStart={<Plus />}>
            Add product
          </Button>
        </form>
        <OrderLines lines={lines} onRemove={(i) => setLines((l) => l.filter((_, j) => j !== i))} />
      </Panel>
    </Page>
  );
}

/* ---------------------------------------------------------- transactions */

function Transactions() {
  const [range, setRange] = useState('Last 30 days');
  const days = Number(range.match(/\d+/)![0]);
  const rows = useMemo(() => txns.filter((t) => t.days <= days), [days]);
  return (
    <Page
      path="/commerce/transactions"
      description="Your most recent transactions."
      actions={
        <Button variant="secondary" appearance="outline" iconStart={<Download />}>
          Export CSV
        </Button>
      }
    >
      <DataTable
        title="Transactions"
        badge={`${rows.length} shown`}
        toolbar={
          <Toggle
            label="Range"
            options={['Last 7 days', 'Last 10 days', 'Last 15 days', 'Last 30 days']}
            value={range}
            onChange={setRange}
          />
        }
        rows={rows}
        rowId={(t) => t.id}
        pageSize={8}
        columns={
          [
            { key: 'id', header: 'Order ID', render: (t) => <strong>{t.id}</strong> },
            {
              key: 'p',
              header: 'Customer',
              render: (t) => <AvatarLabelGroup name={t.p.name} src={t.p.src} size="small" />,
            },
            { key: 'email', header: 'Email', hideBelow: 'large', render: (t) => t.p.email },
            { key: 'amount', header: 'Amount', align: 'end', render: (t) => usd(t.amount) },
            { key: 'due', header: 'Due date', hideBelow: 'medium' },
            { key: 'status', header: 'Status', render: (t) => <Status>{t.status}</Status> },
            {
              key: 'view',
              header: <span className="visually-hidden">Open</span>,
              width: 48,
              render: (t) => (
                <IconButton
                  icon={<Eye />}
                  label={`Open ${t.id}`}
                  variant="secondary"
                  appearance="ghost"
                  size="small"
                  onClick={() => go('/saas/commerce/transaction')}
                />
              ),
            },
          ] satisfies TableColumn<Txn>[]
        }
      />
    </Page>
  );
}

function SingleTransaction() {
  const toast = useToast();
  const p = people[2];
  return (
    <Page
      path="/commerce/transaction"
      title="Order #34834"
      description="Due 25 Aug 2026"
      actions={
        <>
          <Status>Completed</Status>
          <Button
            variant="secondary"
            appearance="outline"
            iconStart={<RotateCcw />}
            onClick={() => toast({ title: 'Refund started' })}
          >
            Refund
          </Button>
          <Button iconStart={<Receipt />}>View receipt</Button>
        </>
      }
    >
      <div className="orbit-row">
        <Panel title="Order details">
          <OrderLines lines={lineItems} />
        </Panel>
        <div className="orbit-stack">
          <Panel title="Customer">
            <AvatarLabelGroup name={p.name} src={p.src} supportingText={p.email} />
            <dl className="orbit-facts">
              <dt>Phone</dt>
              <dd>+1 (973) 555-0142</dd>
              <dt>Country</dt>
              <dd>United States</dd>
              <dt>Address</dt>
              <dd>65 Halsey St, Newark, NJ 07102</dd>
            </dl>
          </Panel>
          <Panel title="Order history">
            <ActivityFeed
              aria-label="Order history"
              items={[
                {
                  id: 1,
                  icon: <ShoppingCart />,
                  title: (
                    <>
                      <strong>Checkout started</strong> on orbit.app
                    </>
                  ),
                  time: '12 Apr, 12:54',
                },
                {
                  id: 2,
                  icon: <CreditCard />,
                  iconTone: 'success',
                  title: (
                    <>
                      <strong>Paid $4,235.00</strong> with PayPal
                    </>
                  ),
                  time: '12 Apr, 12:58',
                },
                {
                  id: 3,
                  icon: <Mail />,
                  title: (
                    <>
                      <strong>Receipt sent</strong> · #1734535
                    </>
                  ),
                  time: '12 Apr, 12:58',
                },
              ]}
            />
            <span className="row">
              <Button size="small" variant="secondary" appearance="outline">
                Resend
              </Button>
              <Button size="small" variant="secondary" appearance="outline">
                Forward
              </Button>
            </span>
          </Panel>
        </div>
      </div>
    </Page>
  );
}

const pages: Record<string, () => ReactNode> = {
  products: Products,
  'add-product': AddProduct,
  billing: Billing,
  invoices: Invoices,
  invoice: SingleInvoice,
  'create-invoice': CreateInvoice,
  transactions: Transactions,
  transaction: SingleTransaction,
};

export default function Commerce({ path }: { path: string }) {
  const P = pages[path.split('/')[2]] ?? Products;
  return <P />;
}
