import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Checkbox,
  Code,
  Container,
  Grid,
  Inline,
  InputField,
  Logo,
  Navbar,
  ProductCard,
  Select,
  SelectItem,
  Slider,
  Stack,
  Stat,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  ThemeProvider,
  themeAttributes,
  themeOptions,
  type Theme,
  type ThemeAxis,
} from '@ds/react';
import { Mail, Palette, RotateCcw } from 'lucide-react';

const axisLabels: Record<ThemeAxis, string> = {
  brand: 'Brand',
  mode: 'Mode',
  language: 'Language',
  typeface: 'Typeface',
  density: 'Density',
  radius: 'Radius',
  shadow: 'Shadow',
};
const valueLabels: Record<string, string> = {
  en: 'English',
  ar: 'العربية',
  sans: 'Sans',
  serif: 'Serif',
};
const label = (v: string) => valueLabels[v] ?? v[0].toUpperCase() + v.slice(1);

export interface DemoPageProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onReset: () => void;
}

/** Theme playground: switch every theme axis and see the components respond. */
function DemoPage({ theme, onThemeChange, onReset }: DemoPageProps) {
  const attrs = Object.entries(themeAttributes(theme))
    .filter(([k]) => k !== 'data-theme')
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');

  return (
    <div className="proto">
      <div className="proto-top">
        <Container>
          <Navbar
            logo={<Logo icon={<Palette />} name="Theme playground" href="#/demo" />}
            items={[
              { label: 'Admin', href: '#/admin' },
              { label: 'Theme playground', href: '#/demo' },
            ]}
            currentItem="Theme playground"
          />
        </Container>
      </div>

      <Container as="main" className="proto-main">
        <Stack gap="xl">
          <Stack gap="2xs">
            <h1 className="proto-title">Theme playground</h1>
            <p className="proto-muted">
              Every component follows seven theme axes. Change them here; the preview, and the other
              prototypes, update.
            </p>
          </Stack>

          <div className="proto-playground">
            <Card appearance="outlined" as="section" aria-labelledby="axes-title">
              <CardBody>
                <Stack gap="lg">
                  <Inline justify="between">
                    <h2 className="proto-subtitle" id="axes-title">
                      Theme
                    </h2>
                    <Button
                      size="small"
                      appearance="text"
                      variant="secondary"
                      iconStart={<RotateCcw />}
                      onClick={onReset}
                    >
                      Reset
                    </Button>
                  </Inline>
                  {(Object.keys(themeOptions) as ThemeAxis[]).map((axis) => (
                    <Stack key={axis} gap="2xs">
                      <span className="proto-muted" aria-hidden="true">
                        {axisLabels[axis]}
                      </span>
                      <ButtonGroup
                        aria-label={axisLabels[axis]}
                        attached
                        value={theme[axis]}
                        onValueChange={(v) => onThemeChange({ ...theme, [axis]: v } as Theme)}
                      >
                        {themeOptions[axis].map((v) => (
                          <Button key={v} value={v} size="small" variant="secondary">
                            {label(v)}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Stack>
                  ))}
                  <Stack gap="xs">
                    <h3 className="proto-subtitle">Apply it in your app</h3>
                    <Code block language="html">{`<html ${attrs}>`}</Code>
                    <Code
                      block
                      language="tsx"
                    >{`<ThemeProvider theme={${JSON.stringify(theme)}}>`}</Code>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>

            <section aria-label="Preview">
              <ThemeProvider theme={theme} className="proto-preview">
                <Stack gap="lg">
                  <Alert variant="primary" title="This preview uses the theme on the left">
                    Colors, type, spacing, corners and shadows all come from tokens.
                  </Alert>
                  <Grid minItemWidth="16rem">
                    <Card>
                      <CardBody>
                        <Stack gap="md">
                          <h2 className="proto-subtitle">Sign up</h2>
                          <InputField
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            iconStart={<Mail />}
                          />
                          <Select label="Plan" defaultValue="pro">
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="pro">Pro</SelectItem>
                            <SelectItem value="team">Team</SelectItem>
                          </Select>
                          <Slider label="Seats" defaultValue={[5]} min={1} max={20} showValue />
                          <Checkbox label="Email me product news" defaultChecked />
                          <Switch label="Dark dashboard" />
                          <Inline justify="end">
                            <Button appearance="outline" variant="secondary">
                              Cancel
                            </Button>
                            <Button>Create account</Button>
                          </Inline>
                        </Stack>
                      </CardBody>
                    </Card>
                    <Stack gap="md">
                      <ProductCard
                        title="Wireless headphones"
                        description="Noise cancelling, 30-hour battery"
                        imageUrl="assets/card-image-diamond.png"
                        price="$299"
                        oldPrice="$399"
                        rating={4.5}
                        reviews="2,342 reviews"
                      />
                      <Card appearance="outlined">
                        <CardBody>
                          <Stat
                            label="Revenue"
                            value="$124,567"
                            change="+12.5%"
                            trend="up"
                            help="vs last month"
                          />
                        </CardBody>
                      </Card>
                    </Stack>
                  </Grid>
                  <Inline gap="xs">
                    <Badge tone="success">Paid</Badge>
                    <Badge tone="warning">Due soon</Badge>
                    <Badge tone="danger">Overdue</Badge>
                    <Tag>Design</Tag>
                    <Tag tone="primary">React</Tag>
                  </Inline>
                  <Tabs defaultValue="overview">
                    <TabList label="Preview tabs">
                      <Tab value="overview">Overview</Tab>
                      <Tab value="specs">Specifications</Tab>
                    </TabList>
                    <TabPanel value="overview">
                      <p className="proto-muted">
                        Tabs, buttons and fields keep their states in every theme.
                      </p>
                    </TabPanel>
                    <TabPanel value="specs">
                      <p className="proto-muted">Specifications.</p>
                    </TabPanel>
                  </Tabs>
                </Stack>
              </ThemeProvider>
            </section>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export default DemoPage;
