import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  Grid,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IconButton,
  Inline,
  InputField,
  Link,
  List,
  ListItem,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  Progress,
  SearchField,
  Select,
  SelectItem,
  Stack,
  Stat,
  Switch,
  Table,
  Textarea,
  Tooltip,
  useToast,
  type TableColumn,
} from '@ds/react';
import { Mail, MoreHorizontal, Send, UserMinus, UserPlus, Users } from 'lucide-react';
import { people } from '../data';
import { AdminShell } from '../shell/AdminShell';

type Role = 'Owner' | 'Admin' | 'Editor' | 'Viewer';
type Status = 'online' | 'busy' | 'away' | 'offline';
interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  team: string;
  status: Status;
  avatar?: string;
  lastActive: string;
}

const SEATS = 12;
const roles: Role[] = ['Owner', 'Admin', 'Editor', 'Viewer'];
const roleTone = {
  Owner: 'primary',
  Admin: 'warning',
  Editor: 'success',
  Viewer: 'secondary',
} as const;
const permissions: Record<Role, { id: string; label: string; on: boolean }[]> = {
  Owner: [
    { id: 'billing', label: 'Manage billing', on: true },
    { id: 'members', label: 'Invite and remove members', on: true },
    { id: 'orders', label: 'Refund orders', on: true },
  ],
  Admin: [
    { id: 'billing', label: 'Manage billing', on: false },
    { id: 'members', label: 'Invite and remove members', on: true },
    { id: 'orders', label: 'Refund orders', on: true },
  ],
  Editor: [
    { id: 'products', label: 'Edit products', on: true },
    { id: 'orders', label: 'Refund orders', on: false },
  ],
  Viewer: [{ id: 'reports', label: 'See reports', on: true }],
};

const initialMembers: Member[] = [
  ...people.map((p, i) => ({
    id: `m${i}`,
    name: p.name,
    email: `${p.name.split(' ')[0].toLowerCase()}@techhub.com`,
    role: (['Owner', 'Admin', 'Editor', 'Editor'] as Role[])[i],
    team: ['Leadership', 'Product', 'Design', 'Engineering'][i],
    status: p.status,
    avatar: p.avatar,
    lastActive: ['Now', '5 min ago', '1 h ago', 'Yesterday'][i],
  })),
  {
    id: 'm4',
    name: 'Lina Haddad',
    email: 'lina@techhub.com',
    role: 'Viewer',
    team: 'Support',
    status: 'online',
    lastActive: 'Now',
  },
  {
    id: 'm5',
    name: 'Omar Farouk',
    email: 'omar@techhub.com',
    role: 'Editor',
    team: 'Engineering',
    status: 'away',
    lastActive: '2 h ago',
  },
  {
    id: 'm6',
    name: 'Mei Tanaka',
    email: 'mei@techhub.com',
    role: 'Viewer',
    team: 'Support',
    status: 'offline',
    lastActive: '3 days ago',
  },
];
const initialInvites = [
  { id: 'i1', email: 'priya@techhub.com', role: 'Editor' as Role, sent: '2 days ago' },
  { id: 'i2', email: 'jonas@techhub.com', role: 'Viewer' as Role, sent: 'Today' },
];

/** Team: seats, members table with roles, pending invitations and role permissions. */
export default function AdminTeamPage() {
  const toast = useToast();
  const [members, setMembers] = useState(initialMembers);
  const [invites, setInvites] = useState(initialInvites);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all');
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [inviteRole, setInviteRole] = useState<Role>('Editor');
  const [removing, setRemoving] = useState<Member | null>(null);

  const used = members.length + invites.length;
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter(
      (m) =>
        (roleFilter === 'all' || m.role === roleFilter) &&
        (!q || `${m.name} ${m.email} ${m.team}`.toLowerCase().includes(q)),
    );
  }, [members, query, roleFilter]);

  const setRole = (id: string, role: Role) => {
    setMembers((all) => all.map((m) => (m.id === id ? { ...m, role } : m)));
    toast({ title: `Role changed to ${role}`, tone: 'success' });
  };

  const columns: TableColumn<Member>[] = [
    {
      key: 'name',
      header: 'Member',
      sortable: true,
      render: (m) => (
        <Inline gap="sm" wrap={false}>
          <Avatar name={m.name} src={m.avatar} status={m.status} size="small" />
          <Stack gap="none">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href="#/admin/team">{m.name}</Link>
              </HoverCardTrigger>
              <HoverCardContent>
                <Inline gap="sm" wrap={false}>
                  <Avatar name={m.name} src={m.avatar} size="large" decorative />
                  <Stack gap="none">
                    <strong>{m.name}</strong>
                    <span className="proto-muted">{`${m.role} · ${m.team}`}</span>
                    <span className="proto-muted">{`Last active: ${m.lastActive}`}</span>
                  </Stack>
                </Inline>
              </HoverCardContent>
            </HoverCard>
            <span className="proto-muted">{m.email}</span>
          </Stack>
        </Inline>
      ),
    },
    { key: 'team', header: 'Team', sortable: true },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (m) => <Badge tone={roleTone[m.role]}>{m.role}</Badge>,
    },
    { key: 'lastActive', header: 'Last active' },
    {
      key: 'actions',
      header: <span className="proto-visually-hidden">Actions</span>,
      align: 'end',
      render: (m) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton
              size="small"
              appearance="ghost"
              variant="secondary"
              icon={<MoreHorizontal />}
              label={`Actions for ${m.name}`}
              disabled={m.role === 'Owner'}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {roles
              .filter((r) => r !== 'Owner' && r !== m.role)
              .map((r) => (
                <DropdownMenuItem key={r} onSelect={() => setRole(m.id, r)}>
                  {`Make ${r}`}
                </DropdownMenuItem>
              ))}
            <DropdownMenuItem
              icon={<Mail />}
              onSelect={() => toast({ title: `Email sent to ${m.name}` })}
            >
              Send email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger" icon={<UserMinus />} onSelect={() => setRemoving(m)}>
              Remove from team
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminShell current="team" trail={[{ label: 'Admin', href: '#/admin' }, { label: 'Team' }]}>
      <Stack gap="xl">
        <Inline justify="between" align="end">
          <Stack gap="2xs">
            <h1 className="proto-hero-title">Team</h1>
            <p className="proto-muted">
              People who can use the TechHub admin, and what they can do.
            </p>
          </Stack>
          <Button
            iconStart={<UserPlus />}
            onClick={() => setInviting(true)}
            disabled={used >= SEATS}
          >
            Invite people
          </Button>
        </Inline>

        <Grid stretch minItemWidth="13rem" as="section" aria-label="Team summary">
          <Card appearance="outlined">
            <CardBody>
              <Stat
                label="Members"
                value={String(members.length)}
                help={`${members.filter((m) => m.status === 'online').length} online now`}
              />
            </CardBody>
          </Card>
          <Card appearance="outlined">
            <CardBody>
              <Stat label="Pending invitations" value={String(invites.length)} />
            </CardBody>
          </Card>
          <Card appearance="outlined">
            <CardBody>
              <Stack gap="xs">
                <Stat label="Seats used" value={`${used} of ${SEATS}`} />
                <Progress
                  label="Seats used"
                  hideLabel
                  value={(used / SEATS) * 100}
                  tone={used / SEATS > 0.8 ? 'warning' : 'primary'}
                />
              </Stack>
            </CardBody>
          </Card>
        </Grid>

        {used / SEATS > 0.8 && (
          <Alert
            variant="warning"
            title="You’re running out of seats"
            actions={
              <Link href="#/settings" appearance="standalone">
                Add seats
              </Link>
            }
          >
            {`${SEATS - used} seats left on your plan.`}
          </Alert>
        )}

        <Card as="section" aria-labelledby="members-title">
          <CardBody>
            <Stack gap="md">
              <h2 className="proto-subtitle" id="members-title">
                {`Members (${members.length})`}
              </h2>
              <Stack gap="md">
                <Inline gap="sm">
                  <div className="proto-grow">
                    <SearchField
                      label="Search members"
                      placeholder="Name, email or team"
                      value={query}
                      onValueChange={setQuery}
                    />
                  </div>
                  <div className="proto-sort">
                    <Select
                      label="Role"
                      hideLabel
                      value={roleFilter}
                      onValueChange={(v) => setRoleFilter(v as typeof roleFilter)}
                    >
                      <SelectItem value="all">All roles</SelectItem>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </Inline>
                {shown.length === 0 ? (
                  <EmptyState
                    icon={<Users />}
                    titleAs="h2"
                    title="No members found"
                    description="Try another name or role."
                    actions={
                      <Button
                        appearance="outline"
                        onClick={() => {
                          setQuery('');
                          setRoleFilter('all');
                        }}
                      >
                        Clear search
                      </Button>
                    }
                  />
                ) : (
                  <Table
                    caption="Team members"
                    hideCaption
                    columns={columns}
                    rows={shown}
                    defaultSort={{ key: 'name', direction: 'ascending' }}
                  />
                )}
              </Stack>
            </Stack>
          </CardBody>
        </Card>

        <Grid stretch minItemWidth="22rem">
          <Card as="section" aria-labelledby="invites-title">
            <CardBody>
              <Stack gap="md">
                <h2 className="proto-subtitle" id="invites-title">
                  {`Pending invitations (${invites.length})`}
                </h2>
                {invites.length === 0 ? (
                  <EmptyState
                    icon={<Send />}
                    titleAs="h2"
                    title="No pending invitations"
                    description="Invite people to give them access to the admin."
                    actions={<Button onClick={() => setInviting(true)}>Invite people</Button>}
                  />
                ) : (
                  <List divided>
                    {invites.map((i) => (
                      <ListItem
                        key={i.id}
                        icon={<Mail />}
                        title={i.email}
                        description={`Invited as ${i.role} · ${i.sent}`}
                        meta={
                          <Inline gap="xs" wrap={false}>
                            <Tooltip content="Send the invitation again">
                              <Button
                                size="small"
                                appearance="outline"
                                variant="secondary"
                                onClick={() => toast({ title: `Invitation resent to ${i.email}` })}
                              >
                                Resend
                              </Button>
                            </Tooltip>
                            <Button
                              size="small"
                              appearance="text"
                              variant="danger"
                              onClick={() => setInvites((all) => all.filter((x) => x.id !== i.id))}
                            >
                              Revoke
                            </Button>
                          </Inline>
                        }
                      />
                    ))}
                  </List>
                )}
              </Stack>
            </CardBody>
          </Card>

          <Card as="section" aria-labelledby="roles-title">
            <CardBody>
              <Stack gap="md">
                <h2 className="proto-subtitle" id="roles-title">
                  Roles and permissions
                </h2>
                <Accordion type="single" collapsible defaultValue="Admin">
                  {roles.map((r) => (
                    <AccordionItem
                      key={r}
                      value={r}
                      title={`${r} · ${members.filter((m) => m.role === r).length} members`}
                    >
                      <Stack gap="sm">
                        {permissions[r].map((p) => (
                          <Switch
                            key={p.id}
                            label={p.label}
                            defaultChecked={p.on}
                            disabled={r === 'Owner'}
                          />
                        ))}
                      </Stack>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Modal
        open={inviting}
        onOpenChange={(o) => {
          setInviting(o);
          setEmailError(false);
        }}
      >
        <ModalContent title="Invite people" description="They’ll get an email with a link to join.">
          <form
            id="invite"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) return setEmailError(true);
              setInvites((all) => [
                ...all,
                { id: `i${Date.now()}`, email, role: inviteRole, sent: 'Just now' },
              ]);
              toast({ title: `Invitation sent to ${email}`, tone: 'success' });
              setEmail('');
              setInviting(false);
            }}
          >
            <Stack gap="md">
              <InputField
                label="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError ? 'Enter an email address like name@techhub.com.' : undefined}
              />
              <Select
                label="Role"
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v as Role)}
              >
                {roles
                  .filter((r) => r !== 'Owner')
                  .map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
              </Select>
              <CheckboxGroup label="Also give access to" defaultValue={['reports']}>
                <Checkbox value="reports" label="Reports" />
                <Checkbox
                  value="billing"
                  label="Billing"
                  description="Only admins can pay invoices."
                />
              </CheckboxGroup>
              <Textarea label="Personal message" optional rows={3} maxLength={200} showCount />
            </Stack>
          </form>
          <ModalFooter>
            <ModalClose asChild>
              <Button appearance="outline" variant="secondary">
                Cancel
              </Button>
            </ModalClose>
            <Button type="submit" form="invite" iconStart={<Send />}>
              Send invitation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal open={!!removing} onOpenChange={(o) => !o && setRemoving(null)}>
        <ModalContent
          role="alertdialog"
          size="small"
          title={`Remove ${removing?.name}?`}
          description="They lose access to the admin right away. You can invite them again later."
        >
          <ModalFooter>
            <ModalClose asChild>
              <Button appearance="outline" variant="secondary">
                Cancel
              </Button>
            </ModalClose>
            <Button
              variant="danger"
              onClick={() => {
                const m = removing;
                setMembers((all) => all.filter((x) => x.id !== m?.id));
                setRemoving(null);
                toast({
                  title: `${m?.name} removed`,
                  action: {
                    label: 'Undo',
                    onClick: () => m && setMembers((all) => [...all, m]),
                    altText: 'Invite them again from the Team page',
                  },
                });
              }}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminShell>
  );
}
