import React from 'react';
import '../styles/Logo.css';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: 'diamond' | 'amber' | 'opal';
  radius?: 'round' | 'square' | 'pills';
  density?: 'comfortable' | 'compact';
  language?: 'english' | 'arabic';
  icon?: React.ReactNode;
  text?: string;
}

export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  (
    {
      brand = 'diamond',
      radius = 'round',
      density = 'comfortable',
      language = 'english',
      icon = <i className="fas fa-rocket"></i>,
      text = 'TechHub',
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      `logo--${brand}`,
      `logo--${radius}`,
      `logo--${density}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="logo__icon">{icon}</div>
        <div className="logo__name">{text}</div>
      </div>
    );
  }
);

Logo.displayName = 'Logo';
