import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';
import './checkbox.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  /** Secondary line under the label. Use it for consequences, not for restating the label. */
  hint?: string;
  /** Neither on nor off. For a parent whose children are partly selected. */
  indeterminate?: boolean;
  invalid?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, indeterminate = false, invalid = false, disabled, className, ...rest },
  ref
) {
  const inner = useRef<HTMLInputElement | null>(null);

  // indeterminate is a DOM property, not an attribute, so React cannot set it.
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cn('era-check', disabled && 'era-check--disabled', className)}>
      <input
        ref={(node) => {
          inner.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        type="checkbox"
        className="era-check__input"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      <span className="era-check__box" />
      <span className="era-check__text">
        {label}
        {hint && <span className="era-check__hint">{hint}</span>}
      </span>
    </label>
  );
});
