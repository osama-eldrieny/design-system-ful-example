import React from 'react';
import '../styles/ChooseCard.css';

interface ChooseCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  title: string;
  description: string;
  price: string;
  isSelected?: boolean;
  onChange?: (selected: boolean) => void;
}

export const ChooseCard = React.forwardRef<HTMLDivElement, ChooseCardProps>(
  ({ title, description, price, isSelected = false, onChange, className, ...props }, ref) => {
    const handleChange = () => {
      onChange?.(!isSelected);
    };

    return (
      <div
        ref={ref}
        className={`choose-card ${className || ''}`}
        {...props}
      >
        <input
          type="radio"
          className="choose-card-radio"
          checked={isSelected}
          onChange={handleChange}
        />
        <div className="choose-card-content">
          <div className="choose-card-info">
            <div className="choose-card-title">{title}</div>
            <div className="choose-card-description">{description}</div>
          </div>
          <div className="choose-card-price">{price}</div>
        </div>
      </div>
    );
  }
);

ChooseCard.displayName = 'ChooseCard';
