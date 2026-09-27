import React from 'react';
import '../styles/Avatar.css';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'small' | 'xlarge';
  radius?: 'square' | 'round' | 'pills';
  src: string;
  alt: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = 'xlarge',
      radius = 'pills',
      src,
      alt,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      'avatar',
      `avatar--${size}`,
      `avatar--${radius}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes}>
        <img src={src} alt={alt} {...props} />
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
