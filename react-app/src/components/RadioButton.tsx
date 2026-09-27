import React from 'react';
import '../styles/RadioButton.css';

interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className={`radio-example ${className || ''}`}>
        <input ref={ref} type="radio" id={props.id} className="radio-input" {...props} />
        {label && <label htmlFor={props.id}>{label}</label>}
      </div>
    );
  }
);

RadioButton.displayName = 'RadioButton';
