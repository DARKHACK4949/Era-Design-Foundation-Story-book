import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn';
import './input.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  size?: InputSize;
  /** Sits under the field. Replaced by the error or success message when one is present. */
  helperText?: string;
  /** Presence of this prop is what puts the field in its error state. */
  errorText?: string;
  successText?: string;
  leadingAdornment?: React.ReactNode;
  trailingAdornment?: React.ReactNode;
  /** Hides the label visually while keeping it for assistive tech. Use sparingly. */
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    size = 'md',
    helperText,
    errorText,
    successText,
    leadingAdornment,
    trailingAdornment,
    hideLabel = false,
    disabled,
    readOnly,
    required,
    id,
    className,
    ...rest
  },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;

  const state = disabled ? 'disabled' : readOnly ? 'readonly' : errorText ? 'error' : successText ? 'success' : 'default';
  const message = errorText ?? successText ?? helperText;
  const messageTone = errorText ? 'error' : successText ? 'success' : 'helper';

  return (
    <div className={cn('era-field', disabled && 'era-field--disabled', className)}>
      <label
        htmlFor={inputId}
        className="era-field__label"
        style={hideLabel ? { position: 'absolute', inlineSize: 1, blockSize: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' } : undefined}
      >
        {label}
        {required && (
          <span className="era-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className={cn('era-field__box', `era-field__box--${size}`)} data-state={state}>
        {leadingAdornment && <span className="era-field__adornment">{leadingAdornment}</span>}
        <input
          ref={ref}
          id={inputId}
          className="era-field__input"
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={errorText ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...rest}
        />
        {trailingAdornment && <span className="era-field__adornment">{trailingAdornment}</span>}
      </div>

      {message && (
        <p
          id={messageId}
          className={cn('era-field__message', messageTone !== 'helper' && `era-field__message--${messageTone}`)}
          // Errors arrive after the fact, so they need announcing. Static help does not.
          role={errorText ? 'alert' : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
});
