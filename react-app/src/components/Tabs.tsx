import React, { useState } from 'react';
import '../styles/Tabs.css';

interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ items, activeTabId = items[0]?.id, onTabChange, className, ...props }, ref) => {
    const [activeId, setActiveId] = useState(activeTabId);

    const handleTabClick = (tabId: string) => {
      setActiveId(tabId);
      onTabChange?.(tabId);
    };

    return (
      <div ref={ref} className={`tabs-container ${className || ''}`} {...props}>
        {items.map((item) => (
          <button
            key={item.id}
            className={`tab-item ${activeId === item.id ? 'tab-item--active' : ''}`}
            onClick={() => handleTabClick(item.id)}
          >
            {item.icon && <i className={`${item.icon} tab-item-icon`}></i>}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
