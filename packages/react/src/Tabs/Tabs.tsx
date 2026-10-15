import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import './Tabs.css';

export type TabsAppearance = 'enclosed' | 'pill' | 'line' | 'segmented' | 'subtle';

const AppearanceContext = createContext<TabsAppearance>('enclosed');
/** False when the tabs have no TabPanels (a selector), so tabs don't point at panels. */
const PanelsContext = createContext(true);

export interface TabsProps extends Omit<
  ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
  'asChild'
> {
  /** Selected tab (controlled). Use with onValueChange. */
  value?: string;
  /** Initially selected tab when uncontrolled. */
  defaultValue?: string;
  /** Called with the new tab's value. */
  onValueChange?: (value: string) => void;
  /**
   * `enclosed` (default): tabs in a tinted container, for compact filters and toolbars.
   * `pill`: filled pill on the selected tab, no container. `line`: underline, for page sections.
   * `segmented`: bordered bar, the selected tab raised on the surface, for view switchers.
   * `subtle`: no container, the selected tab tinted in the brand color, for sidebars.
   */
  appearance?: TabsAppearance;
  /** `small` for toolbars and cards, `medium` (default). */
  size?: 'small' | 'medium';
  /** Stretches the tab list to the full width, tabs sharing it equally. */
  fullWidth?: boolean;
  /**
   * `horizontal` (default): tabs in a row above the panel. `vertical`: tabs stacked in a
   * column beside the panel, for settings pages with many sections; Up and Down arrows move
   * between tabs. On narrow screens vertical tabs sit above the panel.
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * `true` (default): each Tab shows a TabPanel. Set `false` to use the tabs as a selector for
   * content you render yourself, e.g. a Day / Week / Month switcher with the segmented
   * appearance; tabs then don't reference panels (no aria-controls).
   */
  panels?: boolean;
  /** TabList and TabPanels. */
  children: ReactNode;
}

/**
 * Switches between related views of content in the same place. Only one panel shows at a
 * time. Arrow keys move between tabs.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      appearance = 'enclosed',
      orientation = 'horizontal',
      size = 'medium',
      fullWidth = false,
      panels = true,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <AppearanceContext.Provider value={appearance}>
      <PanelsContext.Provider value={panels}>
        <TabsPrimitive.Root
          ref={ref}
          orientation={orientation}
          className={[
            'ds-tabs',
            `ds-tabs--${appearance}`,
            orientation === 'vertical' && 'ds-tabs--vertical',
            size === 'small' && 'ds-tabs--small',
            fullWidth && 'ds-tabs--full-width',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        >
          {children}
        </TabsPrimitive.Root>
      </PanelsContext.Provider>
    </AppearanceContext.Provider>
  ),
);
Tabs.displayName = 'Tabs';

export interface TabListProps extends Omit<
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  'asChild'
> {
  /** What the tabs switch between, e.g. "Product categories". Announced with the tab list. */
  label: string;
  /** Tab elements. */
  children: ReactNode;
}

/** The row of tabs. */
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ label, className, children, ...props }, ref) => {
    const appearance = useContext(AppearanceContext);
    return (
      <TabsPrimitive.List
        ref={ref}
        aria-label={label}
        className={['ds-tabs__list', `ds-tabs__list--${appearance}`, className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    );
  },
);
TabList.displayName = 'TabList';

export interface TabProps extends Omit<
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  'asChild'
> {
  /** Matches the TabPanel this tab shows. */
  value: string;
  /** Icon before the label. Hidden from screen readers. */
  icon?: ReactNode;
  /** Tab label. */
  children: ReactNode;
  /** A count after the label, e.g. unread items. */
  count?: number;
}

/** One tab. */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ icon, count, className, children, ...props }, ref) => {
    const panels = useContext(PanelsContext);
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={['ds-tabs__tab', className].filter(Boolean).join(' ')}
        {...props}
        {...(panels ? {} : { 'aria-controls': undefined })}
      >
        {icon && (
          <span className="ds-tabs__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {count !== undefined && <span className="ds-tabs__count">{count}</span>}
      </TabsPrimitive.Trigger>
    );
  },
);
Tab.displayName = 'Tab';

export interface TabPanelProps extends Omit<
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
  'asChild'
> {
  /** The tab value this panel belongs to. */
  value: string;
}

/** Content shown while its tab is selected. */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={['ds-tabs__panel', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
TabPanel.displayName = 'TabPanel';
