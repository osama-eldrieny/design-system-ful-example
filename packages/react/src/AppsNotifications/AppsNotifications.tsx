import { forwardRef, useId, type ReactNode } from 'react';
import { Card, CardBody, CardTitle, type CardProps, type CardTitleProps } from '../Card';
import { Switch } from '../Switch';
import './AppsNotifications.css';

export interface AppNotificationSetting {
  /** Stable id, passed back in onEnabledChange. */
  id: string;
  /** App name. Labels the switch. */
  name: string;
  /** App icon URL. Decorative, since the name is next to it. */
  icon?: string;
  /** On or off (controlled). Use with onEnabledChange. */
  enabled?: boolean;
  /** Initial state when uncontrolled. Default on. */
  defaultEnabled?: boolean;
  /** Prevents changing this app's setting. */
  disabled?: boolean;
}

export interface AppsNotificationsProps extends Omit<CardProps, 'children' | 'title' | 'as'> {
  /** Heading of the panel. Default "Notifications". */
  title?: ReactNode;
  /** Heading level that fits the page outline. Default h3. */
  titleAs?: CardTitleProps['as'];
  /** One row per app. */
  items: AppNotificationSetting[];
  /** Called when a switch changes, with the app's id and its new state. */
  onEnabledChange?: (id: string, enabled: boolean) => void;
}

/**
 * A panel of per-app notification switches. Built from Card and Switch; each change applies
 * immediately.
 */
export const AppsNotifications = forwardRef<HTMLElement, AppsNotificationsProps>(
  ({ title = 'Notifications', titleAs, items, onEnabledChange, className, ...props }, ref) => {
    const titleId = useId();
    return (
      <Card
        ref={ref}
        as="section"
        aria-labelledby={titleId}
        className={['ds-apps-notifications', className].filter(Boolean).join(' ')}
        {...props}
      >
        <CardBody>
          <CardTitle id={titleId} as={titleAs}>
            {title}
          </CardTitle>
          <ul className="ds-apps-notifications__list">
            {items.map((item) => (
              <li key={item.id} className="ds-apps-notifications__item">
                <Switch
                  className="ds-apps-notifications__switch"
                  labelPosition="start"
                  label={
                    <span className="ds-apps-notifications__app">
                      {item.icon && (
                        <img className="ds-apps-notifications__icon" src={item.icon} alt="" />
                      )}
                      <span className="ds-apps-notifications__name">{item.name}</span>
                    </span>
                  }
                  checked={item.enabled}
                  defaultChecked={
                    item.enabled === undefined ? (item.defaultEnabled ?? true) : undefined
                  }
                  disabled={item.disabled}
                  onCheckedChange={(enabled) => onEnabledChange?.(item.id, enabled)}
                />
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    );
  },
);
AppsNotifications.displayName = 'AppsNotifications';
