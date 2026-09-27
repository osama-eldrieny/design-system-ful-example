import React from 'react';
import '../styles/Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  buttonStyle?: 'filled' | 'text';
  size?: 'small' | 'medium' | 'icon';
  state?: 'default' | 'hover' | 'focus' | 'disabled';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      buttonStyle = 'filled',
      size = 'medium',
      state = 'default',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseClass = `btn btn--${variant}-${buttonStyle}-${state}`;
    const sizeClass = size !== 'medium' ? ` btn--${size}` : '';

    const finalClassName = [baseClass, sizeClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={finalClassName}
        disabled={state === 'disabled' || props.disabled}
        {...props}
      >
        {size === 'icon' ? '+' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
