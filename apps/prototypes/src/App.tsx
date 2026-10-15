import { useEffect, useState, type ReactElement } from 'react';
import { applyTheme, defaultTheme, ThemeProvider, ToastProvider, type Theme } from '@ds/react';
import { useRoute } from './router';
import AnalyticsPage from './pages/AnalyticsPage';
import CalendarPage from './pages/CalendarPage';
import CustomersPage from './pages/CustomersPage';
import DemoPage from './pages/DemoPage';
import FinancePage from './pages/FinancePage';
import MessagesPage from './pages/MessagesPage';
import OrdersPage from './pages/OrdersPage';
import OverviewPage from './pages/OverviewPage';
import ProfilePage from './pages/ProfilePage';
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
    analytics: () => <AnalyticsPage />,
    projects: () => <ProjectPage />,
    messages: () => <MessagesPage />,
    calendar: () => <CalendarPage />,
    orders: () => <OrdersPage />,
    customers: () => <CustomersPage />,
    finance: () => <FinancePage />,
    profile: () => <ProfilePage />,
    settings: () => <SettingsPage section={route.split('/')[3] ?? 'details'} />,
  };
  if (route.startsWith('/app/')) return (app[route.split('/')[2]] ?? (() => <OverviewPage />))();
  if (route.startsWith('/demo'))
    return (
      <DemoPage theme={theme} onThemeChange={setTheme} onReset={() => setTheme(defaultTheme)} />
    );
  // The app overview is the prototypes' home page.
  return <OverviewPage />;
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
