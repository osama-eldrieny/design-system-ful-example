import React from 'react';
import '../styles/MeetingCard.css';

interface MeetingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  time: string;
  variant?: 'primary' | 'success' | 'danger';
  avatars?: string[];
}

export const MeetingCard = React.forwardRef<HTMLDivElement, MeetingCardProps>(
  ({ title, time, variant = 'primary', avatars = [], className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`meeting-card ${variant} ${className || ''}`}
        {...props}
      >
        <div className="meeting-card-info">
          <h3 className="meeting-card-title">{title}</h3>
          <p className="meeting-card-time">{time}</p>
        </div>
        {avatars.length > 0 && (
          <div className="avatar-group">
            {avatars.map((avatar, idx) => (
              <div key={idx} className="avatar">
                <img src={avatar} alt={`Attendee ${idx + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

MeetingCard.displayName = 'MeetingCard';
