import React from 'react';
import '../styles/Alert.css';
import { InboxIcon, LockIcon, BadgeCheckIcon, ShieldCheckIcon } from '../icons';

interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'primary' | 'danger' | 'success' | 'warning';
  icon?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}

const getDefaultIcon = (variant: string) => {
  const iconMap = {
    primary: <InboxIcon />,
    danger: <LockIcon />,
    success: <BadgeCheckIcon />,
    warning: <ShieldCheckIcon />,
  };
  return iconMap[variant as keyof typeof iconMap] || iconMap.primary;
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'primary',
      icon,
      title,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseClass = `alert alert--${variant}`;
    const finalClassName = [baseClass, className].filter(Boolean).join(' ');
    const displayIcon = icon ?? getDefaultIcon(variant);

    return (
      <div ref={ref} className={finalClassName} {...props}>
        <div className="alert-icon">{displayIcon}</div>
        <div className="alert-content">
          <div className="alert-title">{title}</div>
          {children}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
