import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Badge } from '../Badge';
import { Card, CardDescription, CardFooter, CardHeader } from '../Card';
import { FeaturedIcon } from '../FeaturedIcon';
import { Switch } from '../Switch';
import './IntegrationCard.css';

export interface IntegrationCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** The app or service, e.g. "Slack". */
  name: string;
  /** What connecting it does, in a sentence. */
  description: ReactNode;
  /** The app's logo or an icon. */
  icon: ReactNode;
  /** Whether it is connected (controlled). */
  connected: boolean;
  /** Called when the switch is turned on or off. */
  onConnectedChange?: (connected: boolean) => void;
  /** Further actions in the footer, e.g. "Configure". */
  actions?: ReactNode;
}

/**
 * An app or service that can be connected to the product: its icon, what it does, whether it is
 * connected, and a switch to connect or disconnect.
 */
export const IntegrationCard = forwardRef<HTMLElement, IntegrationCardProps>(
  ({ name, description, icon, connected, onConnectedChange, actions, className, ...props }, ref) => (
    <Card
      ref={ref}
      as="article"
      appearance="outlined"
      className={['ds-integration-card', connected && 'ds-integration-card--connected', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <CardHeader
        titleAs="h3"
        title={name}
        actions={
          <span className="ds-integration-card__state">
            <Badge tone={connected ? 'success' : 'gray'} shape="modern" size="small">
              {connected ? 'Connected' : 'Not connected'}
            </Badge>
            <Switch
              aria-label={`Connect ${name}`}
              checked={connected}
              onCheckedChange={(value) => onConnectedChange?.(value)}
            />
          </span>
        }
      />
      <div className="ds-integration-card__icon">
        <FeaturedIcon icon={icon} appearance="modern" shape="square" size="medium" />
      </div>
      <CardDescription>{description}</CardDescription>
      {actions && <CardFooter>{actions}</CardFooter>}
    </Card>
  ),
);
IntegrationCard.displayName = 'IntegrationCard';
