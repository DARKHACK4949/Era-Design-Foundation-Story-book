import React, { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import './button.css';

export type ButtonIntent = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** What the button is for, not what it looks like. Pick by weight in the hierarchy. */
  intent?: ButtonIntent;
  /** Drives height, padding, type step and radius together. */
  size?: ButtonSize;
  /** Shows a spinner and blocks interaction. The label stays put so nothing shifts. */
  loading?: boolean;
  /** Stretches to the width of the parent. For mobile and for single-action footers. */
  fullWidth?: boolean;
  /** Rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Rendered after the label. */
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    intent = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    disabled,
    className,
    children,
    ...rest
  },
  ref
) {
  const iconOnly = !children && Boolean(leadingIcon ?? trailingIcon);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'era-btn',
        `era-btn--${intent}`,
        `era-btn--${size}`,
        fullWidth && 'era-btn--full',
        iconOnly && 'era-btn--icon-only',
        className
      )}
      disabled={disabled || loading}
      // Announce the wait rather than leaving a screen reader on a dead control.
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className="era-btn__spinner" aria-hidden="true" /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
});
