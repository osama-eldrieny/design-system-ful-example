import React from 'react';
import '../styles/Footer.css';

interface FooterLink {
  label: string;
  url?: string;
  onClick?: () => void;
}

interface FooterProps {
  title?: string;
  links?: FooterLink[];
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  title = 'Osama Eldrieny © 2025',
  links = [
    { label: 'License' },
    { label: 'Help' },
    { label: 'Policy' },
  ],
  className = '',
}) => {
  return (
    <footer className={`footer-preview ${className}`}>
      <div className="footer-text">{title}</div>
      {links.length > 0 && (
        <div className="footer-links">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="footer-button"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </footer>
  );
};

Footer.displayName = 'Footer';
