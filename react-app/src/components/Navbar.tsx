import React, { useState } from 'react';
import '../styles/Navbar.css';
import { Logo } from './Logo';

export interface NavItem {
  label: string;
  icon?: string;
  onClick?: () => void;
}

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items?: NavItem[];
  defaultActiveItem?: string;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ logo, items = [], defaultActiveItem = 'Home', className, ...props }, ref) => {
    const [activeItem, setActiveItem] = useState(defaultActiveItem);

    const handleItemClick = (item: NavItem) => {
      setActiveItem(item.label);
      item.onClick?.();
    };

    return (
      <nav ref={ref} className={`navbar-preview ${className || ''}`} {...props}>
        <div className="navbar-logo">{logo || <Logo text="TechHub" />}</div>
        <div className="navbar-items">
          {items.map((item) => (
            <div
              key={item.label}
              className={`navbar-item ${activeItem === item.label ? 'navbar-item--active' : ''}`}
              onClick={() => handleItemClick(item)}
              style={{ cursor: 'pointer' }}
            >
              {item.icon && <span className="navbar-item-icon">{item.icon}</span>}
              <span className="navbar-item-text">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';
