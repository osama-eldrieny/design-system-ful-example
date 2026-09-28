import React from 'react';
import '../styles/InputField.css';

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  placeholder?: string;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ placeholder = 'Enter text here', className = '', icon, prefix, ...props }, ref) => {
    if (icon || prefix) {
      return (
        <div className="input-field-wrapper">
          {icon && <span className="input-field-icon">{icon}</span>}
          {prefix && <span className="input-field-prefix">{prefix}</span>}
          <input
            ref={ref}
            type="text"
            className={`input-field input-field--with-icon ${className}`.trim()}
            placeholder={placeholder}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type="text"
        className={`input-field ${className}`.trim()}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

InputField.displayName = 'InputField';
