import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn';
import '../input/input.css';
import './select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'> {
  label: string;
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  /** Shown as a disabled first option. Without it the first real option is preselected. */
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  hideLabel?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, size = 'md', placeholder, helperText, errorText, hideLabel = false, disabled, required, id, className, defaultValue, value, ...rest },
  ref
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const messageId = `${fieldId}-message`;
  const state = disabled ? 'disabled' : errorText ? 'error' : 'default';

  return (
    <div className={cn('era-field', disabled && 'era-field--disabled', className)}>
      <label
        htmlFor={fieldId}
        className="era-field__label"
        style={hideLabel ? { position: 'absolute', inlineSize: 1, blockSize: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' } : undefined}
      >
        {label}
        {required && <span className="era-field__required" aria-hidden="true">*</span>}
      </label>

      <div className={cn('era-field__box', `era-field__box--${size}`, 'era-field__box--select')} data-state={state}>
        <select
          ref={ref}
          id={fieldId}
          className="era-select"
          disabled={disabled}
          required={required || Boolean(placeholder)}
          value={value}
          defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
          aria-invalid={errorText ? true : undefined}
          aria-describedby={errorText || helperText ? messageId : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        <svg className="era-select__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {(errorText || helperText) && (
        <p id={messageId} className={cn('era-field__message', errorText && 'era-field__message--error')} role={errorText ? 'alert' : undefined}>
          {errorText ?? helperText}
        </p>
      )}
    </div>
  );
});
