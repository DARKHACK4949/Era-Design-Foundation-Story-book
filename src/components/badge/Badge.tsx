import React from 'react';
import { cn } from '../../lib/cn';
import './badge.css';

export type BadgeTone = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'error';
export type BadgeFill = 'solid' | 'subtle' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  fill?: BadgeFill;
  size?: 'sm' | 'md';
  /** Adds a tone-coloured dot. Useful in a dense list where the fill alone reads as noise. */
  dot?: boolean;
  children: React.ReactNode;
}

export function Badge({ tone = 'neutral', fill = 'subtle', size = 'md', dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cn('era-badge', `era-badge--${fill}`, `era-badge--${tone}`, `era-badge--${size}`, className)} {...rest}>
      {dot && <span className="era-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
