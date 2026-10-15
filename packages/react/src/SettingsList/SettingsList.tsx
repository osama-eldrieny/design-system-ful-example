import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './SettingsList.css';

export interface SettingsListItem {
  id: string;
  /** The setting, e.g. "Two-factor authentication". */
  title: ReactNode;
  /** Optional detail under the title. */
  description?: ReactNode;
  /** The control at the end: a Switch, a Button or a Select. */
  control: ReactNode;
}

export interface SettingsListProps extends HTMLAttributes<HTMLUListElement> {
  items: SettingsListItem[];
  /** Draws a border around the list, for a settings card. */
  framed?: boolean;
}

/**
 * A list of settings, each a title and optional description with a control at the end. Use it
 * for on/off switches and one-off actions in account and security settings.
 */
export const SettingsList = forwardRef<HTMLUListElement, SettingsListProps>(
  ({ items, framed = false, className, ...props }, ref) => (
    <ul
      ref={ref}
      className={['ds-settings-list', framed && 'ds-settings-list--framed', className].filter(Boolean).join(' ')}
      {...props}
    >
      {items.map((item) => (
        <li key={item.id} className="ds-settings-list__row">
          <span className="ds-settings-list__text">
            <span className="ds-settings-list__title">{item.title}</span>
            {item.description && <span className="ds-settings-list__description">{item.description}</span>}
          </span>
          <span className="ds-settings-list__control">{item.control}</span>
        </li>
      ))}
    </ul>
  ),
);
SettingsList.displayName = 'SettingsList';
