import { useState } from 'react';
import {
  ActivityFeed,
  Avatar,
  AvatarGroup,
  AvatarLabelGroup,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  EmptyState,
  FileUpload,
  FileUploadItem,
  MetricCard,
  PageHeader,
  Progress,
  Stepper,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Textarea,
  useToast,
} from '@ds/react';
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  ListChecks,
  MessageSquare,
  Pencil,
  Share2,
  UserPlus,
} from 'lucide-react';
import { avatars, members, projects } from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import './project.css';

const project = projects[0];
const initialGoals = [
  { id: 'brief', label: 'Agree on the brief and success metrics', done: true },
  { id: 'research', label: 'Interview 8 customers', done: true },
  { id: 'wireframes', label: 'Wireframes for 6 key pages', done: true },
  { id: 'visual', label: 'Visual design and design review', done: false },
  { id: 'build', label: 'Build and launch on the new CMS', done: false },
];

/** A project’s overview: brief, goals, timeline, team, files and recent activity. */
export default function ProjectPage() {
  const toast = useToast();
  const [goals, setGoals] = useState(initialGoals);
  const done = goals.filter((g) => g.done).length;

  return (
    <AppShell current="projects">
      <div className="page">
        <PageHeader
          breadcrumbs={
            <Breadcrumb
              homeIcon
              items={[
                { label: 'Home', href: '#/dashboard' },
                { label: 'Projects', href: '#/app/projects' },
                { label: project.name },
              ]}
            />
          }
          title={project.name}
          description={`${project.client} · Due ${project.due}`}
          actions={
            <>
              <Button variant="secondary" appearance="outline" iconStart={<UserPlus />}>
                Add team
              </Button>
              <Button
                variant="secondary"
                appearance="outline"
                iconStart={<Share2 />}
                onClick={() => toast({ title: 'Link copied', tone: 'success' })}
              >
                Share
              </Button>
              <Button iconStart={<Pencil />}>Edit</Button>
            </>
          }
        />

        <section className="grid-kpi" aria-label="Project figures">
          <MetricCard
            label="Progress"
            value={`${project.progress}%`}
            icon={<CheckCircle2 />}
            layout="horizontal"
            size="small"
          />
          <MetricCard
            label="Tasks done"
            value="38 / 52"
            change="6 this week"
            trend="up"
            trendStyle="simple"
            icon={<ListChecks />}
            layout="horizontal"
            size="small"
          />
          <MetricCard
            label="Days left"
            value="13"
            icon={<CalendarDays />}
            iconTone="warning"
            iconAppearance="light"
            layout="horizontal"
            size="small"
          />
          <MetricCard
            label="Comments"
            value="124"
            change="18"
            trend="up"
            trendStyle="simple"
            icon={<MessageSquare />}
            layout="horizontal"
            size="small"
          />
        </section>

        <div className="project">
          <Tabs appearance="segmented" defaultValue="overview" className="project__main">
            <TabList label="Project sections">
              <Tab value="overview">Overview</Tab>
              <Tab value="tasks" count={14}>
                Tasks
              </Tab>
              <Tab value="team">Team</Tab>
              <Tab value="files" count={3}>
                Files
              </Tab>
            </TabList>

            <TabPanel value="overview">
              <div className="project__panel">
                <section className="panel" aria-labelledby="brief-title">
                  <PageHeader
                    size="small"
                    titleAs="h2"
                    title={<span id="brief-title">Project brief</span>}
                    description="The goal, the audience and what success looks like."
                  />
                  <p className="project__lead">
                    Redesign Ephemeral’s marketing site so visitors understand the product in one
                    scroll and start a trial without talking to sales.
                  </p>
                  <div className="project__gallery" aria-hidden="true">
                    <div className="project__shot project__shot--1" />
                    <div className="project__shot project__shot--2" />
                    <div className="project__shot project__shot--3" />
                  </div>
                  <h3 className="project__h3">Target audience</h3>
                  <p className="muted">
                    Content teams of 5–50 people who publish daily and have outgrown spreadsheets
                    and shared drives.
                  </p>
                  <h3 className="project__h3">What does success look like?</h3>
                  <ul className="project__bullets">
                    <li>Trial sign-ups up 30% within two months of launch.</li>
                    <li>Bounce rate on the home page under 40%.</li>
                    <li>Every page passes WCAG 2.2 AA.</li>
                  </ul>
                </section>

                <section className="panel" aria-labelledby="goals-title">
                  <div className="row row--between">
                    <h2 className="project__h2" id="goals-title">
                      Milestones
                    </h2>
                    <Badge tone="primary" shape="modern" size="small">
                      {`${done} of ${goals.length}`}
                    </Badge>
                  </div>
                  <Progress
                    label="Milestones done"
                    hideLabel
                    value={done}
                    max={goals.length}
                    size="small"
                  />
                  <ul className="list-reset">
                    {goals.map((g) => (
                      <li key={g.id}>
                        <Checkbox
                          label={g.label}
                          checked={g.done}
                          onCheckedChange={(on) =>
                            setGoals((list) =>
                              list.map((x) => (x.id === g.id ? { ...x, done: on } : x)),
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="panel" aria-labelledby="timeline-title">
                  <h2 className="project__h2" id="timeline-title">
                    Timeline
                  </h2>
                  <Stepper
                    aria-label="Project phases"
                    current={2}
                    marker="dot"
                    steps={[
                      { label: 'Discovery', description: 'Sep 1 – Sep 12' },
                      { label: 'Design', description: 'Sep 15 – Oct 10' },
                      { label: 'Build', description: 'Oct 13 – Oct 24' },
                      { label: 'Launch', description: 'Oct 28' },
                    ]}
                  />
                </section>
              </div>
            </TabPanel>

            <TabPanel value="tasks">
              <EmptyState
                size="small"
                titleAs="h2"
                icon={<ListChecks />}
                title="Tasks live in the board"
                description="Open the board to sort, assign and move tasks."
                actions={<Button>Open board</Button>}
              />
            </TabPanel>

            <TabPanel value="team">
              <section className="panel">
                <ul className="list-reset">
                  {members.slice(0, 6).map((m) => (
                    <li key={m.email} className="row row--between">
                      <AvatarLabelGroup
                        name={m.name}
                        src={m.src}
                        supportingText={m.role}
                        size="medium"
                      />
                      <Badge tone={m.admin ? 'primary' : 'gray'} shape="modern" size="small">
                        {m.admin ? 'Owner' : 'Member'}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>
            </TabPanel>

            <TabPanel value="files">
              <section className="panel">
                <FileUpload id="project-files" multiple hint="Any file up to 50 MB">
                  <FileUploadItem
                    name="Tech requirements.pdf"
                    size="720 KB"
                    progress={100}
                    onRemove={() => {}}
                  />
                  <FileUploadItem
                    name="Design brief and ideas.txt"
                    size="2.2 MB"
                    progress={100}
                    onRemove={() => {}}
                  />
                  <FileUploadItem
                    name="Prototype draft 03.mp4"
                    size="6.6 MB"
                    progress={62}
                    onRemove={() => {}}
                  />
                </FileUpload>
              </section>
            </TabPanel>
          </Tabs>

          <aside className="project__rail" aria-label="Project activity">
            <section className="panel" aria-labelledby="team-title">
              <h2 className="project__h2" id="team-title">
                Team
              </h2>
              <AvatarGroup
                label="Project team"
                size="medium"
                max={5}
                onAdd={() => {}}
                addLabel="Add to project"
              >
                {project.team.map((i) => (
                  <Avatar key={i} name={members[i].name} src={members[i].src} />
                ))}
              </AvatarGroup>
            </section>
            <section className="panel" aria-labelledby="recent-title">
              <h2 className="project__h2" id="recent-title">
                Recent activity
              </h2>
              <ActivityFeed
                aria-labelledby="recent-title"
                appearance="divided"
                items={[
                  {
                    id: 1,
                    avatar: { name: 'Phoenix Baker', src: avatars[0] },
                    title: (
                      <>
                        <strong>Phoenix Baker</strong> added a file
                      </>
                    ),
                    time: 'Just now',
                    content: (
                      <span className="row text-sm">
                        <FileText aria-hidden="true" size={16} /> Tech requirements.pdf
                      </span>
                    ),
                    unread: true,
                  },
                  {
                    id: 2,
                    avatar: { name: 'Lana Steiner', src: avatars[2] },
                    title: (
                      <>
                        <strong>Lana Steiner</strong> was invited by Alina Hester
                      </>
                    ),
                    time: '2 mins ago',
                    unread: true,
                  },
                  {
                    id: 3,
                    avatar: { name: 'Natali Craig', src: avatars[1] },
                    title: (
                      <>
                        <strong>Natali Craig</strong> added 3 labels
                      </>
                    ),
                    time: '6 hours ago',
                    content: (
                      <span className="row">
                        <Badge tone="purple" size="small">
                          Design
                        </Badge>
                        <Badge tone="blue" size="small">
                          Product
                        </Badge>
                        <Badge tone="indigo" size="small">
                          Marketing
                        </Badge>
                      </span>
                    ),
                  },
                  {
                    id: 4,
                    avatar: { name: 'Kate Morrison' },
                    title: (
                      <>
                        <strong>Kate Morrison</strong> sent you a message
                      </>
                    ),
                    time: '5:20 pm',
                    content: '“We should ask Oli about this today.”',
                  },
                ]}
              />
              <Textarea label="Comment" hideLabel placeholder="Write a comment…" rows={2} />
              <Button
                size="small"
                onClick={() => toast({ title: 'Comment posted', tone: 'success' })}
              >
                Comment
              </Button>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
