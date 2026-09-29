import { useState } from 'react';
import {
  AppsNotifications,
  Avatar,
  Button,
  Card,
  CardBody,
  ChooseCard,
  ChooseCardGroup,
  Combobox,
  Divider,
  FormField,
  Grid,
  Inline,
  InputField,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  Stack,
  Switch,
  Textarea,
  useToast,
} from '@ds/react';
import { Trash2, Upload } from 'lucide-react';
import { people } from '../data';
import { AdminShell } from '../shell/AdminShell';

const zones = [
  'Africa/Cairo',
  'Asia/Dubai',
  'Asia/Riyadh',
  'Europe/Berlin',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Tokyo',
].map((z) => ({ value: z, label: z.replace('_', ' ') }));

/** Settings: profile, notifications, security and appearance, with a danger zone. */
export default function SettingsPage() {
  const toast = useToast();
  const me = people[1];
  const [name, setName] = useState(me.name);
  const [bio, setBio] = useState('Leading product at TechHub. Previously design systems at scale.');
  const [digest, setDigest] = useState('weekly');
  const [confirmText, setConfirmText] = useState('');
  const save = (what: string) => toast({ title: `${what} saved`, tone: 'success' });

  return (
    <AdminShell
      current="settings"
      trail={[{ label: 'Admin', href: '#/admin' }, { label: 'Settings' }]}
    >
      <Stack gap="xl">
        <Stack gap="2xs">
          <h1 className="proto-hero-title">Settings</h1>
          <p className="proto-muted">Manage your profile, notifications and security.</p>
        </Stack>
        <Stack gap="xl">
          <Grid stretch minItemWidth="24rem">
            <Stack gap="xl">
              <Stack as="section" gap="md" aria-labelledby="profile-title">
                <Card>
                  <CardBody>
                    <Stack
                      as="form"
                      gap="lg"
                      onSubmit={(e) => {
                        e.preventDefault();
                        save('Profile');
                      }}
                    >
                      <Stack gap="2xs">
                        <h2 className="proto-subtitle" id="profile-title">
                          Profile
                        </h2>
                        <p className="proto-muted">Your photo, name and how others see you.</p>
                      </Stack>
                      <Inline gap="md">
                        <Avatar
                          name={name}
                          src={me.avatar}
                          size="xlarge"
                          status="online"
                          statusLabel="Online"
                        />
                        <Stack gap="xs">
                          <Button
                            size="small"
                            appearance="outline"
                            variant="secondary"
                            iconStart={<Upload />}
                            type="button"
                          >
                            Change photo
                          </Button>
                          <span className="proto-muted">JPG or PNG, up to 2 MB.</span>
                        </Stack>
                      </Inline>
                      <Grid stretch minItemWidth="16rem">
                        <InputField
                          label="Full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <InputField
                          label="Email"
                          type="email"
                          defaultValue="sarah@techhub.example"
                          description="We’ll send a link to confirm a new address."
                        />
                      </Grid>
                      <Textarea
                        label="Bio"
                        rows={3}
                        autoResize
                        maxRows={6}
                        maxLength={160}
                        showCount
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        description="Shown on your public profile."
                      />
                      <Combobox label="Time zone" options={zones} defaultValue="Asia/Dubai" />
                      <Inline justify="end">
                        <Button type="submit">Save profile</Button>
                      </Inline>
                    </Stack>
                  </CardBody>
                </Card>
              </Stack>
              <Stack as="section" gap="md" aria-labelledby="danger-title">
                <Card appearance="outlined" className="proto-danger-zone">
                  <CardBody>
                    <Stack gap="sm">
                      <Stack gap="2xs">
                        <h2 className="proto-subtitle" id="danger-title">
                          Delete account
                        </h2>
                        <p className="proto-muted">Permanently remove your account.</p>
                      </Stack>
                      <p className="proto-muted">
                        Deletes your profile and settings. Orders stay with the store.
                      </p>
                      <Modal>
                        <Inline>
                          <ModalTrigger asChild>
                            <Button variant="danger" appearance="outline" iconStart={<Trash2 />}>
                              Delete account
                            </Button>
                          </ModalTrigger>
                        </Inline>
                        <ModalContent
                          role="alertdialog"
                          size="small"
                          title="Delete your account?"
                          description="This can’t be undone. Type DELETE to confirm."
                        >
                          <Stack gap="md">
                            <InputField
                              label="Type DELETE"
                              value={confirmText}
                              onChange={(e) => setConfirmText(e.target.value)}
                            />
                            <ModalFooter>
                              <ModalClose asChild>
                                <Button appearance="outline" variant="secondary">
                                  Cancel
                                </Button>
                              </ModalClose>
                              <Button
                                variant="danger"
                                disabled={confirmText !== 'DELETE'}
                                onClick={() =>
                                  toast({ title: 'Account deletion requested', tone: 'danger' })
                                }
                              >
                                Delete account
                              </Button>
                            </ModalFooter>
                          </Stack>
                        </ModalContent>
                      </Modal>
                    </Stack>
                  </CardBody>
                </Card>
              </Stack>
            </Stack>
            <Stack as="section" gap="md" aria-labelledby="notifications-title">
              <Stack gap="lg">
                <Card>
                  <CardBody>
                    <Stack gap="lg">
                      <Stack gap="2xs">
                        <h2 className="proto-subtitle" id="notifications-title">
                          Notifications
                        </h2>
                        <p className="proto-muted">
                          What we email you about, and the apps connected to the admin.
                        </p>
                      </Stack>
                      <FormField
                        group
                        label="Email me about"
                        description="Changes save automatically."
                      >
                        <Switch
                          label="New orders"
                          labelPosition="start"
                          className="proto-switch-row"
                          defaultChecked
                          onCheckedChange={() => save('Notification')}
                        />
                        <Switch
                          label="Refund requests"
                          labelPosition="start"
                          className="proto-switch-row"
                          defaultChecked
                          onCheckedChange={() => save('Notification')}
                        />
                        <Switch
                          label="Low stock"
                          labelPosition="start"
                          className="proto-switch-row"
                          description="When fewer than 10 are left"
                          onCheckedChange={() => save('Notification')}
                        />
                        <Switch
                          label="Product news"
                          labelPosition="start"
                          className="proto-switch-row"
                          onCheckedChange={() => save('Notification')}
                        />
                      </FormField>
                      <Divider />
                      <Stack gap="xs">
                        <h3 className="proto-subtitle" id="digest-title">
                          Summary email
                        </h3>
                        <ChooseCardGroup
                          aria-labelledby="digest-title"
                          orientation="horizontal"
                          value={digest}
                          onValueChange={setDigest}
                        >
                          <ChooseCard
                            value="daily"
                            title="Daily"
                            description="Every morning at 8:00"
                          />
                          <ChooseCard value="weekly" title="Weekly" description="Mondays at 8:00" />
                          <ChooseCard value="never" title="Never" description="No summary email" />
                        </ChooseCardGroup>
                      </Stack>
                    </Stack>
                  </CardBody>
                </Card>
                <AppsNotifications
                  title="Connected apps"
                  titleAs="h3"
                  items={[
                    { id: 'slack', name: 'Slack', icon: 'assets/linkedin.png' },
                    { id: 'google', name: 'Google', icon: 'assets/google.png' },
                    {
                      id: 'behance',
                      name: 'Behance',
                      icon: 'assets/behance.png',
                      defaultEnabled: false,
                    },
                    { id: 'x', name: 'X (Twitter)', icon: 'assets/twitter.png', disabled: true },
                  ]}
                />
              </Stack>
            </Stack>
          </Grid>
        </Stack>
      </Stack>
    </AdminShell>
  );
}
