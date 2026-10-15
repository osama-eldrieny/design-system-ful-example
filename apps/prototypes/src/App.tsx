import { useEffect, useState, type ReactElement } from 'react';
import { applyTheme, defaultTheme, ThemeProvider, ToastProvider, type Theme } from '@ds/react';
import { useRoute } from './router';
import CalendarPage from './pages/CalendarPage';
import DemoPage from './pages/DemoPage';
import MessagesPage from './pages/MessagesPage';
import OrdersPage from './pages/OrdersPage';
import { Dashboard } from './dashboards/Dashboard';
import ProjectPage from './pages/ProjectPage';
import SettingsPage from './pages/SettingsPage';
import './prototype.css';

const STORAGE_KEY = 'ds-prototype-theme';
const savedTheme = (): Theme => {
  try {
    return { ...defaultTheme, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') };
  } catch {
    return defaultTheme;
  }
};

function Page({
  route,
  theme,
  setTheme,
}: {
  route: string;
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const app: Record<string, () => ReactElement> = {
    projects: () => <ProjectPage />,
    messages: () => <MessagesPage />,
    calendar: () => <CalendarPage />,
    orders: () => <OrdersPage />,
    settings: () => <SettingsPage section={route.split('/')[3] ?? 'details'} />,
  };
  const appPage = app[route.split('/')[2]];
  if (route.startsWith('/app/') && appPage) return appPage();
  if (route.startsWith('/demo'))
    return (
      <DemoPage theme={theme} onThemeChange={setTheme} onReset={() => setTheme(defaultTheme)} />
    );
  // The dashboard is the prototypes' home page.
  return <Dashboard />;
}

/** The prototypes app: the TechHub admin, the theme playground, toasts and the saved theme. */
function App() {
  const route = useRoute();
  const [theme, setTheme] = useState<Theme>(savedTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch {
      // Storage unavailable (private mode): the theme just isn't remembered.
    }
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Page route={route} theme={theme} setTheme={setTheme} />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
