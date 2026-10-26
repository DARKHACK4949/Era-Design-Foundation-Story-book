import React from 'react';
import { cn } from '../../lib/cn';
import './alert.css';

export type AlertTone = 'neutral' | 'info' | 'success' | 'warning' | 'error';

/**
 * Distinct shapes, not just distinct colours: a triangle for something that
 * needs attention, an octagon for something that has gone wrong, a tick for
 * something that worked. Someone who cannot tell the fills apart can still
 * tell these apart.
 */
const ICONS: Record<AlertTone, React.ReactNode> = {
  neutral: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7.25v3.5M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.25 8.25 7.1 10.1l3.65-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.25 14.5 13.5h-13L8 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6.75v3M8 11.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.6 1.75h4.8L13.75 5.1v4.8L10.4 13.25H5.6L2.25 9.9V5.1L5.6 1.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 5.25v3.5M8 10.75h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  title: string;
  description?: React.ReactNode;
  /** Pass a handler to show the dismiss control. Without one there is nothing to dismiss. */
  onDismiss?: () => void;
  /** Action buttons, rendered under the description. */
  actions?: React.ReactNode;
}

export function Alert({ tone = 'info', title, description, onDismiss, actions, className, ...rest }: AlertProps) {
  return (
    <div
      className={cn('era-alert', `era-alert--${tone}`, className)}
      // Errors interrupt; everything else waits for a pause.
      role={tone === 'error' ? 'alert' : 'status'}
      {...rest}
    >
      <span className="era-alert__icon">{ICONS[tone]}</span>
      <div className="era-alert__body">
        <span className="era-alert__title">{title}</span>
        {description && <div className="era-alert__description">{description}</div>}
        {actions && <div style={{ display: 'flex', gap: 'var(--spacing-space-8)', marginBlockStart: 'var(--spacing-space-8)' }}>{actions}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="era-alert__dismiss" onClick={onDismiss} aria-label={`Dismiss: ${title}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
