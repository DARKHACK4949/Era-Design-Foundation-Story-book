import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import './toast.css';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  tone?: ToastTone;
  title: string;
  description?: string;
  /** Milliseconds. Pass 0 to make it stay until dismissed. */
  duration?: number;
}

const ICONS: Record<ToastTone, React.ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7.25v3.5M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m5.25 8.25 1.85 1.85 3.65-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  const tone = toast.tone ?? 'info';
  const duration = toast.duration ?? 5000;
  const [paused, setPaused] = useState(false);
  const left = useRef(duration);
  const since = useRef(Date.now());

  // Pausing keeps the remaining time rather than restarting it, so hovering
  // three times does not keep the toast alive forever.
  useEffect(() => {
    if (duration === 0 || paused) return;
    since.current = Date.now();
    const t = setTimeout(() => onDismiss(toast.id), left.current);
    return () => {
      clearTimeout(t);
      left.current = Math.max(0, left.current - (Date.now() - since.current));
    };
  }, [paused, duration, toast.id, onDismiss]);

  return (
    <div
      className={cn('era-toast', `era-toast--${tone}`)}
      role={tone === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="era-toast__icon">{ICONS[tone]}</span>
      <div className="era-toast__body">
        <span className="era-toast__title">{toast.title}</span>
        {toast.description && <span className="era-toast__description">{toast.description}</span>}
      </div>
      <button type="button" className="era-toast__dismiss" onClick={() => onDismiss(toast.id)} aria-label={`Dismiss: ${toast.title}`}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function ToastRegion({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: string) => void }) {
  return (
    <div className="era-toast-region">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

/** Minimal queue so the stories, and anything else, do not each invent one. */
export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dismiss = useCallback((id: string) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const push = useCallback((toast: Omit<ToastItem, 'id'>) => {
    setToasts((t) => [...t, { ...toast, id: Math.random().toString(36).slice(2) }]);
  }, []);
  return { toasts, push, dismiss };
}
