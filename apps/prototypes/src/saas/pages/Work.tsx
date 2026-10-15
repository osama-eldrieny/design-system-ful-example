/**
 * Orbit's work pages: tasks (list and kanban) and the calendar.
 */
import { useMemo, useState, type ReactNode } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FileUpload,
  FileUploadItem,
  IconButton,
  InputField,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  Tab,
  TabList,
  Tabs,
  Textarea,
  useToast,
  type BadgeColor,
  List,
  ListItem,
} from '@ds/react';
import {
  ArrowUpDown,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
} from 'lucide-react';
import { people } from '../data';
import { Page } from '../Shell';
import { Segmented } from '../../Segmented';

/* ----------------------------------------------------------------- tasks */

type Status = 'todo' | 'progress' | 'done';
const statusLabel: Record<Status, string> = {
  todo: 'To do',
  progress: 'In progress',
  done: 'Completed',
};
const tagColor: Record<string, BadgeColor> = {
  Marketing: 'pink',
  Template: 'blue',
  Development: 'purple',
  Design: 'orange',
};

type Task = {
  id: number;
  title: string;
  status: Status;
  tag?: string;
  due: string;
  comments: number;
  files: number;
  who: number;
  note?: string;
};

const seedTasks: Task[] = [
  {
    id: 1,
    title: 'Finish user onboarding',
    status: 'todo',
    tag: 'Marketing',
    due: 'Tomorrow',
    comments: 1,
    files: 0,
    who: 0,
  },
  {
    id: 2,
    title: 'Solve the Dribbble prioritisation issue with the team',
    status: 'todo',
    due: 'Jan 8, 2027',
    comments: 2,
    files: 1,
    who: 1,
  },
  {
    id: 3,
    title: 'Change license and remove products',
    status: 'todo',
    tag: 'Marketing',
    due: 'Feb 12, 2027',
    comments: 1,
    files: 0,
    who: 2,
  },
  {
    id: 4,
    title: 'Work-in-progress (WIP) dashboard',
    status: 'progress',
    due: 'Today',
    comments: 1,
    files: 0,
    who: 3,
  },
  {
    id: 5,
    title: 'Kanban flow manager',
    status: 'progress',
    tag: 'Template',
    due: 'Feb 12, 2027',
    comments: 8,
    files: 2,
    who: 4,
  },
  {
    id: 6,
    title: 'Product update · Q4 2026',
    status: 'progress',
    due: 'Feb 12, 2027',
    comments: 8,
    files: 0,
    who: 5,
    note: 'Dedicated form for a category of users that will perform actions.',
  },
  {
    id: 7,
    title: 'Make the bot comment when a ticket is moved back to the inbox',
    status: 'progress',
    due: 'Mar 8, 2027',
    comments: 1,
    files: 0,
    who: 6,
  },
  {
    id: 8,
    title: 'Manage internal feedback',
    status: 'done',
    due: 'Tomorrow',
    comments: 1,
    files: 0,
    who: 7,
  },
  {
    id: 9,
    title: 'Do some projects in React Native and Flutter',
    status: 'done',
    tag: 'Development',
    due: 'Jan 8, 2027',
    comments: 0,
    files: 0,
    who: 0,
  },
  {
    id: 10,
    title: 'Design marketing assets',
    status: 'done',
    tag: 'Marketing',
    due: 'Jan 8, 2027',
    comments: 2,
    files: 1,
    who: 1,
  },
  {
    id: 11,
    title: 'Kanban flow manager v2',
    status: 'done',
    tag: 'Template',
    due: 'Feb 12, 2027',
    comments: 8,
    files: 0,
    who: 2,
  },
];

function TaskMeta({ t }: { t: Task }) {
  const p = people[t.who];
  return (
    <span className="orbit-task__meta">
      {t.tag && (
        <Badge color={tagColor[t.tag]} shape="modern" size="small">
          {t.tag}
        </Badge>
      )}
      <span className="orbit-task__fact">
        <CalendarDays aria-hidden="true" />
        {t.due}
      </span>
      {t.comments > 0 && (
        <span className="orbit-task__fact">
          <MessageSquare aria-hidden="true" />
          {t.comments}
          <span className="visually-hidden"> comments</span>
        </span>
      )}
      {t.files > 0 && (
        <span className="orbit-task__fact">
          <Paperclip aria-hidden="true" />
          {t.files}
          <span className="visually-hidden"> attachments</span>
        </span>
      )}
      <Avatar name={p.name} src={p.src} size="xsmall" />
    </span>
  );
}

function MoveMenu({ t, onMove }: { t: Task; onMove: (s: Status) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          icon={<MoreHorizontal />}
          label={`Actions for ${t.title}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Move to</DropdownMenuLabel>
        {(Object.keys(statusLabel) as Status[])
          .filter((s) => s !== t.status)
          .map((s) => (
            <DropdownMenuItem key={s} onSelect={() => onMove(s)}>
              {statusLabel[s]}
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AddTask({ onAdd }: { onAdd: (t: Task) => void }) {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Status>('todo');
  const [tag, setTag] = useState('Marketing');
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button iconStart={<Plus />}>Add task</Button>
      </ModalTrigger>
      <ModalContent
        title="Add a new task"
        description="Give it a title, a due date and an owner."
        size="large"
      >
        <div className="orbit-form">
          <InputField
            label="Task title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="orbit-form__two">
            <InputField label="Due date" type="date" />
            <Select label="Assignee" defaultValue="0">
              {people.slice(0, 5).map((p, i) => (
                <SelectItem key={p.email} value={`${i}`}>
                  {p.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <RadioGroup
            label="Status"
            orientation="horizontal"
            value={status}
            onValueChange={(v) => setStatus(v as Status)}
          >
            {(Object.keys(statusLabel) as Status[]).map((s) => (
              <Radio key={s} value={s} label={statusLabel[s]} />
            ))}
          </RadioGroup>
          <Select label="Tag" value={tag} onValueChange={setTag}>
            {Object.keys(tagColor).map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </Select>
          <Textarea label="Description" rows={3} />
          <FileUpload id="task-files" multiple hint="Any file up to 20 MB">
            <FileUploadItem
              name="Guidelines.pdf"
              size="2.4 MB"
              progress={100}
              onRemove={() => {}}
            />
          </FileUpload>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary" appearance="outline">
              Cancel
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button
              disabled={!title.trim()}
              onClick={() => {
                onAdd({
                  id: Date.now(),
                  title,
                  status,
                  tag,
                  due: 'Next week',
                  comments: 0,
                  files: 0,
                  who: 0,
                });
                setTitle('');
                toast({ title: 'Task created', tone: 'success' });
              }}
            >
              Create task
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Tasks({ view }: { view: 'list' | 'kanban' }) {
  const [tasks, setTasks] = useState(seedTasks);
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [sortAsc, setSortAsc] = useState(true);
  const [checked, setChecked] = useState<number[]>([8, 9, 10, 11]);
  const move = (id: number, status: Status) =>
    setTasks((l) => l.map((t) => (t.id === id ? { ...t, status } : t)));
  const counts = useMemo(
    () => ({
      all: tasks.length,
      todo: 0,
      progress: 0,
      done: 0,
      ...Object.fromEntries(
        (Object.keys(statusLabel) as Status[]).map((s) => [
          s,
          tasks.filter((t) => t.status === s).length,
        ]),
      ),
    }),
    [tasks],
  );
  const groups = (Object.keys(statusLabel) as Status[]).filter(
    (s) => filter === 'all' || filter === s,
  );
  const sorted = (list: Task[]) =>
    [...list].sort((a, b) =>
      sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
    );

  return (
    <Page
      path={`/tasks/${view}`}
      title={view === 'list' ? 'Task list' : 'Task board'}
      description="Plan, assign and track your team’s work."
      actions={<AddTask onAdd={(t) => setTasks((l) => [t, ...l])} />}
      header={
        <div className="orbit-toolbar">
          <Tabs
            panels={false}
            appearance="segmented"
            value={filter}
            onValueChange={(v) => setFilter(v as typeof filter)}
          >
            <TabList label="Task status" className="scroll-x">
              <Tab value="all" count={counts.all}>
                All tasks
              </Tab>
              {(Object.keys(statusLabel) as Status[]).map((s) => (
                <Tab key={s} value={s} count={counts[s]}>
                  {statusLabel[s]}
                </Tab>
              ))}
            </TabList>
          </Tabs>
          <Button
            variant="secondary"
            appearance="outline"
            size="small"
            iconStart={<ArrowUpDown />}
            onClick={() => setSortAsc((s) => !s)}
          >
            Sort {sortAsc ? 'A–Z' : 'Z–A'}
          </Button>
        </div>
      }
    >
      {view === 'kanban' ? (
        <div className="orbit-board">
          {groups.map((s) => (
            <section key={s} className="orbit-board__col" aria-labelledby={`col-${s}`}>
              <h2 id={`col-${s}`} className="orbit-board__title">
                {statusLabel[s]}{' '}
                <Badge size="small" shape="modern" tone="gray">
                  {counts[s]}
                </Badge>
              </h2>
              <ul className="orbit-board__cards">
                {sorted(tasks.filter((t) => t.status === s)).map((t) => (
                  <li key={t.id} className="orbit-card">
                    <div className="row row--between orbit-card__head">
                      <strong>{t.title}</strong>
                      <MoveMenu t={t} onMove={(to) => move(t.id, to)} />
                    </div>
                    {t.note && <p className="muted text-sm orbit-card__note">{t.note}</p>}
                    <TaskMeta t={t} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        groups.map((s) => (
          <section key={s} className="panel orbit-tasks" aria-labelledby={`group-${s}`}>
            <h2 id={`group-${s}`} className="orbit-board__title">
              {statusLabel[s]}{' '}
              <Badge size="small" shape="modern" tone="gray">
                {counts[s]}
              </Badge>
            </h2>
            <List divided>
              {sorted(tasks.filter((t) => t.status === s)).map((t) => (
                <ListItem
                  key={t.id}
                  done={checked.includes(t.id)}
                  start={
                    <Checkbox
                      aria-label={t.title}
                      checked={checked.includes(t.id)}
                      onCheckedChange={(v) =>
                        setChecked((c) => (v ? [...c, t.id] : c.filter((x) => x !== t.id)))
                      }
                    />
                  }
                  title={t.title}
                  meta={
                    <>
                      <TaskMeta t={t} />
                      <MoveMenu t={t} onMove={(to) => move(t.id, to)} />
                    </>
                  }
                />
              ))}
            </List>
          </section>
        ))
      )}
    </Page>
  );
}

/* --------------------------------------------------------------- calendar */

type EventTone = 'danger' | 'success' | 'primary' | 'warning';
type CalEvent = {
  id: number;
  title: string;
  day: number;
  length: number;
  tone: EventTone;
  time: string;
};

const toneColor: Record<EventTone, BadgeColor> = {
  danger: 'danger',
  success: 'success',
  primary: 'primary',
  warning: 'warning',
};

const seedEvents: CalEvent[] = [
  { id: 1, title: 'Sprint planning', day: 2, length: 1, tone: 'primary', time: '09:30' },
  { id: 2, title: 'Pricing page launch', day: 6, length: 2, tone: 'success', time: 'All day' },
  { id: 3, title: 'Board meeting', day: 9, length: 1, tone: 'warning', time: '14:00' },
  { id: 4, title: 'SOC 2 audit window', day: 13, length: 3, tone: 'danger', time: 'All day' },
  { id: 5, title: 'Customer advisory call', day: 15, length: 1, tone: 'primary', time: '16:00' },
  { id: 6, title: 'Design review', day: 20, length: 1, tone: 'success', time: '11:00' },
  { id: 7, title: 'Webinar: activation', day: 22, length: 1, tone: 'warning', time: '17:00' },
  { id: 8, title: 'Quarter close', day: 30, length: 1, tone: 'danger', time: 'All day' },
];

function CalendarPage() {
  const toast = useToast();
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  const [view, setView] = useState('month');
  const [events, setEvents] = useState(seedEvents);
  const [edit, setEdit] = useState<Partial<CalEvent> | null>(null);
  const year = month.getFullYear();
  const first = (month.getDay() + 6) % 7;
  const days = new Date(year, month.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((first + days) / 7) * 7 }, (_, i) => i - first + 1);
  const label = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const on = (d: number) => events.filter((e) => d >= e.day && d < e.day + e.length);
  const today = 15;
  const week = cells.slice(
    Math.floor((first + today - 1) / 7) * 7,
    Math.floor((first + today - 1) / 7) * 7 + 7,
  );

  const save = () => {
    if (!edit?.title) return;
    setEvents((l) =>
      edit.id
        ? l.map((e) => (e.id === edit.id ? ({ ...e, ...edit } as CalEvent) : e))
        : [
            ...l,
            {
              id: Date.now(),
              day: 1,
              length: 1,
              tone: 'primary',
              time: 'All day',
              ...edit,
            } as CalEvent,
          ],
    );
    setEdit(null);
    toast({ title: edit.id ? 'Event updated' : 'Event added', tone: 'success' });
  };

  const chip = (e: CalEvent) => (
    <li key={e.id}>
      <Button
        appearance="text"
        variant="secondary"
        size="small"
        className={`orbit-event-chip orbit-event-chip--${e.tone}`}
        onClick={() => setEdit(e)}
      >
        {e.title}
      </Button>
    </li>
  );

  return (
    <Page
      path="/calendar"
      description="Meetings, launches and deadlines."
      actions={
        <Button
          iconStart={<Plus />}
          onClick={() => setEdit({ day: today, tone: 'primary', time: 'All day', length: 1 })}
        >
          Add event
        </Button>
      }
    >
      <section className="panel" aria-label={`Calendar, ${label}`}>
        <div className="orbit-toolbar">
          <span className="row">
            <IconButton
              icon={<ChevronLeft />}
              label="Previous month"
              variant="secondary"
              appearance="outline"
              size="small"
              onClick={() => setMonth(new Date(year, month.getMonth() - 1, 1))}
            />
            <IconButton
              icon={<ChevronRight />}
              label="Next month"
              variant="secondary"
              appearance="outline"
              size="small"
              onClick={() => setMonth(new Date(year, month.getMonth() + 1, 1))}
            />
            <Button
              variant="secondary"
              appearance="outline"
              size="small"
              onClick={() => setMonth(new Date(2026, 9, 1))}
            >
              Today
            </Button>
          </span>
          <h2 className="orbit-h2" aria-live="polite">
            {label}
          </h2>
          <Segmented
            label="View"
            options={[
              ['month', 'Month'],
              ['week', 'Week'],
              ['day', 'Day'],
            ]}
            value={view}
            onChange={setView}
          />
        </div>
        {view === 'day' ? (
          <ul className="orbit-agenda">
            {(on(today).length ? on(today) : []).map((e) => (
              <li key={e.id}>
                <span className="muted text-sm">{e.time}</span>
                {chip(e)}
              </li>
            ))}
            {on(today).length === 0 && <li className="muted">No events on October {today}.</li>}
          </ul>
        ) : (
          <div className="orbit-cal" role="grid" aria-label={label}>
            <div role="row" className="orbit-cal__row orbit-cal__row--head">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <span key={d} role="columnheader" className="orbit-cal__dow">
                  {d}
                </span>
              ))}
            </div>
            {Array.from({ length: (view === 'week' ? week : cells).length / 7 }, (_, r) => (
              <div
                role="row"
                key={r}
                className={`orbit-cal__row${view === 'week' ? ' orbit-cal__row--tall' : ''}`}
              >
                {(view === 'week' ? week : cells).slice(r * 7, r * 7 + 7).map((d, i) => (
                  <div
                    role="gridcell"
                    key={i}
                    className={[
                      'orbit-cal__cell',
                      (d < 1 || d > days) && 'orbit-cal__cell--out',
                      d === today && 'orbit-cal__cell--today',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {d >= 1 && d <= days && (
                      <>
                        <span className="orbit-cal__date">{d}</span>
                        <ul className="orbit-cal__events">{on(d).map(chip)}</ul>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      <Modal open={edit !== null} onOpenChange={(o) => !o && setEdit(null)}>
        {edit && (
          <ModalContent
            title={edit.id ? 'Edit event' : 'Add event'}
            description="Plan your next big moment: schedule or edit an event to stay on track."
          >
            <div className="orbit-form">
              <InputField
                label="Event title"
                value={edit.title ?? ''}
                onChange={(e) => setEdit({ ...edit, title: e.target.value })}
              />
              <RadioGroup
                label="Color"
                orientation="horizontal"
                value={edit.tone}
                onValueChange={(v) => setEdit({ ...edit, tone: v as EventTone })}
              >
                {(Object.keys(toneColor) as EventTone[]).map((t) => (
                  <Radio key={t} value={t} label={t[0].toUpperCase() + t.slice(1)} />
                ))}
              </RadioGroup>
              <div className="orbit-form__two">
                <InputField
                  label="Start date"
                  type="number"
                  min={1}
                  max={31}
                  value={`${edit.day ?? ''}`}
                  onChange={(e) => setEdit({ ...edit, day: Number(e.target.value) })}
                  description="Day of the month"
                />
                <InputField
                  label="Length"
                  type="number"
                  min={1}
                  max={7}
                  value={`${edit.length ?? 1}`}
                  onChange={(e) => setEdit({ ...edit, length: Number(e.target.value) })}
                  suffix="days"
                />
              </div>
            </div>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" appearance="outline">
                  Close
                </Button>
              </ModalClose>
              <Button onClick={save} disabled={!edit.title}>
                {edit.id ? 'Update event' : 'Add event'}
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </Page>
  );
}

export default function Work({ path }: { path: string }): ReactNode {
  if (path === '/calendar') return <CalendarPage />;
  return <Tasks view={path.endsWith('kanban') ? 'kanban' : 'list'} />;
}
