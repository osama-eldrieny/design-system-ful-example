import React, { useState } from 'react';
import '../styles/AppsNotifications.css';

interface NotificationItem {
  id: string;
  appTitle: string;
  appIcon: string;
  isEnabled?: boolean;
  onChange?: (enabled: boolean) => void;
}

interface AppsNotificationsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  items: NotificationItem[];
}

export const AppsNotifications = React.forwardRef<HTMLDivElement, AppsNotificationsProps>(
  ({ title = 'Notifications', items, className, ...props }, ref) => {
    const [enabledItems, setEnabledItems] = useState<Record<string, boolean>>(
      items.reduce((acc, item) => ({ ...acc, [item.id]: item.isEnabled ?? true }), {})
    );

    const handleToggle = (itemId: string) => {
      setEnabledItems(prev => {
        const newState = { ...prev, [itemId]: !prev[itemId] };
        items.find(i => i.id === itemId)?.onChange?.(!prev[itemId]);
        return newState;
      });
    };

    return (
      <div ref={ref} className={`apps-notifications ${className || ''}`} {...props}>
        <h3 className="apps-notifications-title">{title}</h3>
        <div className="apps-list">
          {items.map((item) => (
            <div key={item.id} className="notification-list-item">
              <div className="app-list-item">
                {item.appIcon && (
                  <img src={item.appIcon} alt={item.appTitle} className="app-icon" />
                )}
                <span className="app-title">{item.appTitle}</span>
              </div>
              <div
                className={`toggle-switch ${enabledItems[item.id] ? 'active' : 'inactive'}`}
                onClick={() => handleToggle(item.id)}
              >
                <div className="toggle-circle"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

AppsNotifications.displayName = 'AppsNotifications';
