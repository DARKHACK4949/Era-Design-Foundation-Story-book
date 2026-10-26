import React from 'react';
import { cn } from '../../lib/cn';
import './card.css';

export type CardElevation = 'flat' | 'outlined' | 'raised';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  elevation?: CardElevation;
  title?: string;
  subtitle?: string;
  /** Top-right slot. A badge, a menu trigger, a timestamp. */
  aside?: React.ReactNode;
  actions?: React.ReactNode;
  /** Drops the body padding for a child that brings its own, such as an empty state. */
  flush?: boolean;
  /** Makes the whole card activatable. Renders a real button, not a div with a handler. */
  onActivate?: () => void;
  href?: string;
  selected?: boolean;
  children?: React.ReactNode;
}

export function Card({
  elevation = 'outlined',
  title,
  subtitle,
  aside,
  actions,
  onActivate,
  href,
  selected,
  flush = false,
  className,
  children,
  ...rest
}: CardProps) {
  const interactive = Boolean(onActivate || href);
  const Tag = (href ? 'a' : onActivate ? 'button' : 'div') as React.ElementType;

  return (
    <Tag
      className={cn('era-card', `era-card--${elevation}`, interactive && 'era-card--interactive', className)}
      {...(href ? { href } : {})}
      {...(onActivate && !href ? { type: 'button', onClick: onActivate } : {})}
      {...(interactive && selected !== undefined ? { 'aria-pressed': selected } : {})}
      {...rest}
    >
      {(title || aside) && (
        <div className="era-card__header">
          <div>
            {title && <div className="era-card__title">{title}</div>}
            {subtitle && <div className="era-card__subtitle">{subtitle}</div>}
          </div>
          {aside}
        </div>
      )}
      {children && <div className={cn('era-card__body', flush && 'era-card__body--flush')}>{children}</div>}
      {actions && <div className="era-card__footer">{actions}</div>}
    </Tag>
  );
}
