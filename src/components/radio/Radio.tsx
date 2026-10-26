import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn';
import './radio.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  hint?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, hint, disabled, className, ...rest },
  ref
) {
  return (
    <label className={cn('era-radio', disabled && 'era-radio--disabled', className)}>
      <input ref={ref} type="radio" className="era-radio__input" disabled={disabled} {...rest} />
      <span className="era-radio__dot" />
      <span className="era-radio__text">
        {label}
        {hint && <span className="era-radio__hint">{hint}</span>}
      </span>
    </label>
  );
});

export interface RadioGroupProps {
  legend: string;
  /** Shared by every radio inside. Without it the browser does not know they belong together. */
  name: string;
  helperText?: string;
  errorText?: string;
  children: React.ReactNode;
  className?: string;
}

/** Wraps the radios in a fieldset so the legend is announced once for the group
 *  rather than repeated on every option. */
export function RadioGroup({ legend, name, helperText, errorText, children, className }: RadioGroupProps) {
  const id = useId();
  const message = errorText ?? helperText;

  return (
    <fieldset
      className={cn('era-radio-group', className)}
      aria-describedby={message ? `${id}-msg` : undefined}
      aria-invalid={errorText ? true : undefined}
    >
      <legend className="era-radio-group__legend">{legend}</legend>
      {React.Children.map(children, (child) =>
        React.isValidElement<RadioProps>(child) ? React.cloneElement(child, { name }) : child
      )}
      {message && (
        <span id={`${id}-msg`} className={cn('era-radio-group__message', errorText && 'era-radio-group__message--error')} role={errorText ? 'alert' : undefined}>
          {message}
        </span>
      )}
    </fieldset>
  );
}
