import React from 'react';
import '../styles/Header.css';
import { Avatar } from './Avatar';

interface HeaderProps {
  name?: string;
  role?: string;
  title?: string;
  avatar?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  name = 'Osama Eldrieny',
  role = 'Design System Designer',
  title = 'Multi-Theme Design System',
  avatar,
  className = '',
}) => {
  return (
    <header className={`header ${className}`}>
      <div className="header-personal-info">
        {avatar && (
          <Avatar src={avatar} alt={name} size="xlarge" radius="round" />
        )}
        <div className="header-text-group">
          <div className="header-name">{name}</div>
          <div className="header-role">{role}</div>
        </div>
      </div>
      <div className="header-title">{title}</div>
    </header>
  );
};

Header.displayName = 'Header';
