import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Code,
  Container,
  Inline,
  Stack,
  ThemeProvider,
  themeAttributes,
  themeOptions,
  type Theme,
  type ThemeAxis,
} from '@ds/react';
import { RotateCcw } from 'lucide-react';
import { ar } from './playground-ar';
import { PlaygroundShowcase } from './PlaygroundShowcase';

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
  const tx = (text: string) => (theme.language === 'ar' ? (ar[text] ?? text) : text);
  const attrs = Object.entries(themeAttributes(theme))
    .filter(([k]) => k !== 'data-theme')
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');

  return (
    <div className="proto">
      <Container as="main" size="full" className="proto-main">
        <Stack gap="xl">
          <Stack gap="2xs">
            <h1 className="proto-title">{tx('Theme playground')}</h1>
            <p className="proto-muted">
              {tx(
                'Every component follows seven theme axes. Change them here; the preview, and the other prototypes, update.',
              )}
            </p>
          </Stack>

          <div className="proto-playground">
            <Card
              appearance="outlined"
              as="section"
              aria-labelledby="axes-title"
              className="proto-playground__panel"
            >
              <CardBody>
                <Stack gap="lg">
                  <Inline justify="between">
                    <h2 className="proto-subtitle" id="axes-title">
                      {tx('Theme')}
                    </h2>
                    <Button
                      size="small"
                      appearance="text"
                      variant="secondary"
                      iconStart={<RotateCcw />}
                      onClick={onReset}
                    >
                      {tx('Reset')}
                    </Button>
                  </Inline>
                  {(Object.keys(themeOptions) as ThemeAxis[]).map((axis) => (
                    <Stack key={axis} gap="2xs">
                      <span className="proto-muted" aria-hidden="true">
                        {tx(axisLabels[axis])}
                      </span>
                      <ButtonGroup
                        aria-label={tx(axisLabels[axis])}
                        className="proto-axis-group"
                        attached
                        value={theme[axis]}
                        onValueChange={(v) => onThemeChange({ ...theme, [axis]: v } as Theme)}
                      >
                        {themeOptions[axis].map((v) => (
                          <Button key={v} value={v} size="small" variant="secondary">
                            {tx(label(v))}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Stack>
                  ))}
                  <Stack gap="xs">
                    <h3 className="proto-subtitle">{tx('Apply it in your app')}</h3>
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
                <PlaygroundShowcase lang={theme.language} brand={theme.brand} />
              </ThemeProvider>
            </section>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export default DemoPage;
