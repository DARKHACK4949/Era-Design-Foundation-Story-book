import React from 'react';
import { cn } from '../../lib/cn';
import './empty.css';

export type EmptyReason = 'first-run' | 'no-results' | 'error';

export interface EmptyStateProps {
  /** Why it is empty. This is the prop that matters: the three cases need different words and different actions. */
  reason?: EmptyReason;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

const ICONS: Record<EmptyReason, React.ReactNode> = {
  'first-run': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 9v6M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'no-results': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="m15.5 15.5 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4 21 19H3L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 10v4M12 16.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export function EmptyState({ reason = 'no-results', title, description, actions, className }: EmptyStateProps) {
  return (
    <div className={cn('era-empty', reason === 'error' && 'era-empty--error', className)} role={reason === 'error' ? 'alert' : 'status'}>
      <span className="era-empty__icon">{ICONS[reason]}</span>
      <span className="era-empty__title">{title}</span>
      {description && <p className="era-empty__description">{description}</p>}
      {actions && <div className="era-empty__actions">{actions}</div>}
    </div>
  );
}
