import React, { forwardRef, useId, useState } from 'react';
import { cn } from '../../lib/cn';
import '../input/input.css';
import './textarea.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  errorText?: string;
  /** Shows a live counter. Going over does not block typing, it just says so. */
  maxLength?: number;
  hideLabel?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, helperText, errorText, maxLength, hideLabel = false, disabled, readOnly, required, id, className, value, defaultValue, onChange, ...rest },
  ref
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const messageId = `${fieldId}-message`;
  const countId = `${fieldId}-count`;

  const [internal, setInternal] = useState(String(defaultValue ?? ''));
  const text = value !== undefined ? String(value) : internal;
  const used = text.length;
  const over = maxLength !== undefined && used > maxLength;
  // Only start nagging in the last 10% of the budget. Before that the number
  // is information, not a warning.
  const near = maxLength !== undefined && !over && used >= maxLength * 0.9;

  const state = disabled ? 'disabled' : readOnly ? 'readonly' : errorText || over ? 'error' : 'default';

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

      <div className="era-field__box era-field__box--md era-field__box--textarea" data-state={state}>
        <textarea
          ref={ref}
          id={fieldId}
          className="era-textarea"
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            if (value === undefined) setInternal(e.target.value);
            onChange?.(e);
          }}
          aria-invalid={errorText || over ? true : undefined}
          aria-describedby={[errorText || helperText ? messageId : null, maxLength !== undefined ? countId : null].filter(Boolean).join(' ') || undefined}
          {...rest}
        />
      </div>

      {(errorText || helperText || maxLength !== undefined) && (
        <div className="era-field__footer">
          {(errorText || helperText) && (
            <p id={messageId} className={cn('era-field__message', errorText && 'era-field__message--error')} role={errorText ? 'alert' : undefined}>
              {errorText ?? helperText}
            </p>
          )}
          {maxLength !== undefined && (
            <span
              id={countId}
              className={cn('era-field__count', near && 'era-field__count--near', over && 'era-field__count--over')}
              // Announcing every keystroke would be unusable, so the count is
              // only read out once it is actually a problem.
              aria-live={over ? 'polite' : 'off'}
            >
              {used} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
});
