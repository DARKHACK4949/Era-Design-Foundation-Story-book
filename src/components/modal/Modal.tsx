import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';
import './modal.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** Buttons for the footer. Put the confirming action last, nearest the thumb. */
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'danger';
  /** Clicking the backdrop closes. Turn this off when losing the content would hurt. */
  dismissOnBackdrop?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = 'md',
  tone = 'default',
  dismissOnBackdrop = true,
  className,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // showModal is what makes the page behind inert and traps focus. Setting the
  // open attribute instead gives a dialog that looks right and behaves wrong.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn('era-modal', `era-modal--${size}`, tone === 'danger' && 'era-modal--danger', className)}
      // Escape fires cancel, and the browser closes the dialog on its own, so
      // the parent's state has to be told rather than asked.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (!dismissOnBackdrop) return;
        // The dialog element fills the viewport, so a click that lands on the
        // element itself rather than on its contents is a backdrop click.
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="era-modal-title"
      aria-describedby={description ? 'era-modal-desc' : undefined}
    >
      <div className="era-modal__inner">
        <div className="era-modal__header">
          <div className="era-modal__heading">
            <h2 id="era-modal-title" className="era-modal__title">
              {title}
            </h2>
            {description && (
              <p id="era-modal-desc" className="era-modal__description">
                {description}
              </p>
            )}
          </div>
          <button type="button" className="era-modal__close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children && <div className="era-modal__body">{children}</div>}
        {actions && <div className="era-modal__footer">{actions}</div>}
      </div>
    </dialog>
  );
}
