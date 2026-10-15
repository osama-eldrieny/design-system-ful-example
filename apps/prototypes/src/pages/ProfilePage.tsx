import {
  Avatar,
  Badge,
  Button,
  FeaturedIcon,
  IconButton,
  Link,
  MetricCard,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  useToast,
} from '@ds/react';
import { Briefcase, Mail, MapPin, MoreHorizontal, Globe } from 'lucide-react';
import { experience, members } from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import './profile.css';

const work = [
  { title: 'Analytics dashboard', tag: 'Product design', tone: 'purple' as const, shot: 1 },
  { title: 'Marketing site', tag: 'Web design', tone: 'blue' as const, shot: 2 },
  { title: 'Brand refresh', tag: 'Branding', tone: 'pink' as const, shot: 3 },
];

/** A person’s profile: cover, about, contact details, experience and work. */
export default function ProfilePage() {
  const toast = useToast();
  const me = members[0];

  return (
    <AppShell current="profile">
      <div className="page">
        <section className="profile" aria-labelledby="profile-name">
          <div className="profile__cover" aria-hidden="true" />
          <div className="profile__head">
            <Avatar
              name={me.name}
              src={me.src}
              size="xlarge"
              verified
              className="profile__avatar"
            />
            <div className="stack-text">
              <h1 className="profile__name" id="profile-name">
                {me.name}
              </h1>
              <span className="muted">{me.role} based in Melbourne.</span>
            </div>
            <div className="row profile__actions">
              <IconButton
                icon={<MoreHorizontal />}
                label="More profile actions"
                variant="secondary"
                appearance="outline"
              />
              <Button variant="secondary" appearance="outline">
                View portfolio
              </Button>
              <Button onClick={() => toast({ title: `You follow ${me.name}`, tone: 'success' })}>
                Follow
              </Button>
            </div>
          </div>
        </section>

        <section className="grid-kpi" aria-label="Profile figures">
          <MetricCard label="Projects" value="48" size="small" />
          <MetricCard
            label="Followers"
            value="12.4k"
            change="320"
            trend="up"
            trendStyle="simple"
            comparison="this month"
            size="small"
          />
          <MetricCard label="Appreciations" value="3,210" size="small" />
        </section>

        <div className="profile__body">
          <section className="panel" aria-labelledby="about-title">
            <h2 className="profile__h2" id="about-title">
              About me
            </h2>
            <p>
              I’m a Product Designer based in Melbourne, Australia. I enjoy working on product
              design, design systems and Webflow projects.
            </p>
            <p className="muted">
              I’ve worked with some of the world’s most exciting companies, helping startups grow,
              improve their UX and customer experience.
            </p>
            <div className="row">
              {['Product design', 'Design systems', 'Prototyping', 'Research'].map((s, i) => (
                <Badge
                  key={s}
                  tone={(['purple', 'blue', 'teal', 'orange'] as const)[i]}
                  size="small"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </section>
          <section className="panel" aria-labelledby="contact-title">
            <h2 className="profile__h2" id="contact-title">
              Details
            </h2>
            <dl className="profile__facts">
              <div>
                <dt className="muted">
                  <MapPin aria-hidden="true" /> Location
                </dt>
                <dd>Melbourne, AU</dd>
              </div>
              <div>
                <dt className="muted">
                  <Globe aria-hidden="true" /> Website
                </dt>
                <dd>
                  <Link href="#/app/profile">olivia.design</Link>
                </dd>
              </div>
              <div>
                <dt className="muted">
                  <Mail aria-hidden="true" /> Email
                </dt>
                <dd>
                  <Link href={`mailto:${me.email}`}>{me.email}</Link>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <section className="profile__section" aria-labelledby="experience-title">
          <h2 className="profile__h2" id="experience-title">
            Experience
          </h2>
          <ul className="profile__cards">
            {experience.map((e) => (
              <li key={e.role} className="panel">
                <div className="row">
                  <FeaturedIcon icon={<Briefcase />} tone={e.tone} />
                  <div className="stack-text">
                    <strong>{e.role}</strong>
                    <span className="muted">{e.company}</span>
                  </div>
                </div>
                <span className="text-sm muted">{e.period}</span>
                <Link appearance="standalone" href="#/app/projects">
                  View project
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel" aria-labelledby="work-title">
          <h2 className="profile__h2" id="work-title">
            Work
          </h2>
          <Tabs appearance="segmented" size="small" defaultValue="all">
            <TabList label="Filter work">
              <Tab value="all">View all</Tab>
              <Tab value="product">Product design</Tab>
              <Tab value="web">Web design</Tab>
            </TabList>
            {(['all', 'product', 'web'] as const).map((tab) => (
              <TabPanel key={tab} value={tab}>
                <ul className="profile__cards">
                  {work
                    .filter(
                      (w) =>
                        tab === 'all' ||
                        (tab === 'product' ? w.tag === 'Product design' : w.tag === 'Web design'),
                    )
                    .map((w) => (
                      <li key={w.title} className="profile__work">
                        <div
                          className={`profile__shot profile__shot--${w.shot}`}
                          aria-hidden="true"
                        />
                        <strong>{w.title}</strong>
                        <Badge tone={w.tone} size="small">
                          {w.tag}
                        </Badge>
                      </li>
                    ))}
                </ul>
              </TabPanel>
            ))}
          </Tabs>
        </section>
      </div>
    </AppShell>
  );
}
