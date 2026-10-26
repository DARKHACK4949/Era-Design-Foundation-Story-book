import React, { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import './switch.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: string;
  size?: 'sm' | 'md';
  /** Hides the label visually but keeps it for assistive tech. */
  hideLabel?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, size = 'md', hideLabel = false, disabled, className, ...rest },
  ref
) {
  return (
    <label className={cn('era-switch', disabled && 'era-switch--disabled', className)}>
      <input ref={ref} type="checkbox" role="switch" className="era-switch__input" disabled={disabled} {...rest} />
      <span className={cn('era-switch__track', `era-switch__track--${size}`)}>
        <span className="era-switch__thumb" />
      </span>
      <span
        className="era-switch__label"
        style={hideLabel ? { position: 'absolute', inlineSize: 1, blockSize: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' } : undefined}
      >
        {label}
      </span>
    </label>
  );
});
