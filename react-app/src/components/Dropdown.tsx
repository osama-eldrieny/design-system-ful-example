import React, { useState } from 'react';
import '../styles/Dropdown.css';

interface DropdownItem {
  id: string;
  label: string;
  icon: string;
  onClick?: () => void;
}

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DropdownItem[];
  onItemClick?: (itemId: string) => void;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ items, onItemClick, className, ...props }, ref) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    return (
      <div ref={ref} className={`dropdown ${className || ''}`} {...props}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`dropdown__item ${hoverIndex === idx ? 'dropdown__item--hover' : ''}`}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => {
              item.onClick?.();
              onItemClick?.(item.id);
            }}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
