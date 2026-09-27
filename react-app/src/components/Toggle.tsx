import React from 'react';
import '../styles/Toggle.css';

interface ToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  isActive?: boolean;
  onChange?: (isActive: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>(
  ({ isActive = false, onChange, className, ...props }, ref) => {
    const handleClick = () => {
      onChange?.(!isActive);
    };

    return (
      <div
        ref={ref}
        className={`toggle-switch ${isActive ? 'active' : ''} ${className || ''}`}
        onClick={handleClick}
        {...props}
      >
        <div className="toggle-circle"></div>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
