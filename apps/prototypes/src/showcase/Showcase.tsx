import { useState } from 'react';
import {
  Button,
  Logo,
  Select,
  SelectItem,
  ThemeProvider,
  themeAttributes,
  themeOptions,
  useToast,
  type Theme,
  type ThemeAxis,
} from '@ds/react';
import { Copy, Orbit, RotateCcw } from 'lucide-react';
import { ar } from './ar';
import {
  AiPrompt,
  Alerts,
  Avatars,
  Badges,
  Buttons,
  DateTile,
  Destructive,
  DialogTile,
  Inputs,
  Metrics,
  Navigation,
  Notification,
  Overlays,
  PeoplePicker,
  Product,
  ProgressTile,
  Selection,
  TableTile,
  TabsTile,
  type T,
} from './tiles';
import './showcase.css';
import { Segmented } from '../Segmented';

const axisLabels: Record<ThemeAxis, string> = {
  brand: 'Brand',
  mode: 'Mode',
  language: 'Language',
  typeface: 'Typeface',
  density: 'Density',
  radius: 'Radius',
  shadow: 'Shadow',
};
const valueLabel = (v: string) =>
  ({ en: 'English', ar: 'العربية' })[v] ?? v[0].toUpperCase() + v.slice(1);

/** Ready-made themes for the side-by-side comparison. */
const presets: Record<string, Partial<Theme>> = {
  'Diamond · light': {
    brand: 'diamond',
    mode: 'light',
    radius: 'round',
    density: 'comfortable',
    shadow: 'subtle',
  },
  'Amber · dark': {
    brand: 'amber',
    mode: 'dark',
    radius: 'round',
    density: 'comfortable',
    shadow: 'subtle',
  },
  'Opal · pills, compact': {
    brand: 'opal',
    mode: 'light',
    radius: 'pills',
    density: 'compact',
    shadow: 'raised',
  },
  'Diamond · dark, square': {
    brand: 'diamond',
    mode: 'dark',
    radius: 'square',
    density: 'comfortable',
    shadow: 'flat',
  },
  'Amber · serif': {
    brand: 'amber',
    mode: 'light',
    typeface: 'serif',
    radius: 'round',
    shadow: 'default',
  },
  'Opal · dark, compact': {
    brand: 'opal',
    mode: 'dark',
    radius: 'round',
    density: 'compact',
    shadow: 'raised',
  },
};

function ThemeBar({
  theme,
  onChange,
  onReset,
  t,
}: {
  theme: Theme;
  onChange: (t: Theme) => void;
  onReset: () => void;
  t: T;
}) {
  const toast = useToast();
  const attrs = Object.entries(themeAttributes(theme))
    .filter(([k]) => k !== 'data-theme')
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
  return (
    <div className="sc-bar__controls" role="group" aria-label={t('Theme')}>
      {(Object.keys(themeOptions) as ThemeAxis[]).map((axis) => (
        <div key={axis} className="sc-axis">
          <span className="sc-axis__label" aria-hidden="true">
            {t(axisLabels[axis])}
          </span>
          <Segmented
            label={t(axisLabels[axis])}
            options={themeOptions[axis].map(
              (v) => [v, axis === 'language' ? valueLabel(v) : t(valueLabel(v))] as const,
            )}
            value={theme[axis] as string}
            onChange={(v) => onChange({ ...theme, [axis]: v })}
          />
        </div>
      ))}
      <div className="sc-axis sc-axis--actions">
        <Button
          size="xsmall"
          variant="secondary"
          appearance="ghost"
          iconStart={<RotateCcw />}
          onClick={onReset}
        >
          {t('Reset')}
        </Button>
        <Button
          size="xsmall"
          variant="secondary"
          appearance="ghost"
          iconStart={<Copy />}
          onClick={() => {
            void navigator.clipboard?.writeText(attrs).catch(() => {});
            toast({ title: t('Theme attributes copied'), description: attrs });
          }}
        >
          {t('Copy attributes')}
        </Button>
      </div>
    </div>
  );
}

/** Theme showcase: a wall of component tiles that follows every theme axis, plus a side-by-side comparison. */
export default function Showcase({
  theme,
  onThemeChange,
  onReset,
}: {
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  onReset: () => void;
}) {
  const t: T = (s) => (theme.language === 'ar' ? (ar[s] ?? s) : s);
  const locale = theme.language === 'ar' ? 'ar' : 'en';
  const names = Object.keys(presets);
  const [compare, setCompare] = useState([names[0], names[1], names[2]]);

  return (
    <div className="proto sc">
      <aside className="sc-bar" aria-label={t('Theme')}>
        <div className="sc-bar__head">
          <Logo icon={<Orbit />} name="Orbit" href="#/saas" />
          <div className="sc-bar__title">
            <h1>{t('Theme showcase')}</h1>
            <p>
              {t(
                'Every component follows seven theme axes. Change them and the whole wall updates.',
              )}
            </p>
          </div>
        </div>
        <ThemeBar theme={theme} onChange={onThemeChange} onReset={onReset} t={t} />
      </aside>

      <main className="sc-main">
        <div className="sc-wall">
          <Buttons t={t} />
          <Metrics t={t} />
          <Product t={t} />
          <Inputs t={t} />
          <Badges t={t} />
          <AiPrompt t={t} />
          <Selection t={t} />
          <Notification t={t} />
          <PeoplePicker t={t} />
          <Destructive t={t} />
          <Navigation t={t} />
          <TabsTile t={t} />
          <DateTile t={t} locale={locale} />
          <Avatars t={t} />
          <Alerts t={t} />
          <ProgressTile t={t} />
          <TableTile t={t} />
          <DialogTile t={t} />
          <Overlays t={t} />
        </div>

        <section className="sc-compare" aria-labelledby="compare-title">
          <div className="sc-compare__head">
            <h2 id="compare-title">{t('Compare themes')}</h2>
            <p>
              {t('The same components in three themes at once. Pick any theme for each column.')}
            </p>
          </div>
          <div className="sc-compare__cols">
            {compare.map((name, i) => (
              <div key={i} className="sc-compare__col">
                <Select
                  label={`${t('Theme')} ${i + 1}`}
                  hideLabel
                  size="small"
                  value={name}
                  onValueChange={(v) => setCompare((c) => c.map((x, j) => (j === i ? v : x)))}
                >
                  {names.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </Select>
                <ThemeProvider
                  theme={{ ...presets[name], language: theme.language }}
                  className="sc-compare__frame"
                >
                  <div className="sc-compare__stack">
                    <Product t={t} />
                    <Buttons t={t} />
                    <Metrics t={t} />
                    <Selection t={t} />
                    <Alerts t={t} />
                  </div>
                </ThemeProvider>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
