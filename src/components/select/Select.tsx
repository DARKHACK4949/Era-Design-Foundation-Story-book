import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import '../input/input.css';
import '../../styles/surface.css';
import './select.css';

export interface SelectOption {
  value: string;
  label: string;
  /** Second line under the option. This is the thing a native select cannot do. */
  hint?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  required?: boolean;
  hideLabel?: boolean;
  /** Submits with a form. Renders a hidden input carrying the current value. */
  name?: string;
  id?: string;
  className?: string;
}

const TICK = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Select({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  placeholder = 'Select an option',
  helperText,
  errorText,
  disabled,
  required,
  hideLabel = false,
  name,
  id,
  className,
}: SelectProps) {
  const uid = useId();
  const fieldId = id ?? `${uid}-trigger`;
  const listId = `${uid}-list`;
  const labelId = `${uid}-label`;
  const messageId = `${uid}-message`;

  const [internal, setInternal] = useState(defaultValue ?? '');
  const selected = value !== undefined ? value : internal;
  const current = options.find((o) => o.value === selected);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [above, setAbove] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const typed = useRef({ buffer: '', at: 0 });

  const enabled = options.filter((o) => !o.disabled);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const openList = useCallback(() => {
    const i = options.findIndex((o) => o.value === selected && !o.disabled);
    setActive(i >= 0 ? i : options.indexOf(enabled[0] ?? options[0]));
    setOpen(true);
  }, [options, selected, enabled]);

  useLayoutEffect(() => {
    if (!open || !anchor.current) return;
    const r = anchor.current.getBoundingClientRect();
    setAbove(window.innerHeight - r.bottom < 300 && r.top > 300);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!anchor.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open, close]);

  // Focus stays on the trigger; the active option is pointed at with
  // aria-activedescendant. That is the listbox pattern, and it is why the
  // trigger keeps receiving the key events while the list is open.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index='${active}']`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const move = (delta: number) => {
    const order = enabled.map((o) => options.indexOf(o));
    const at = order.indexOf(active);
    setActive(order[(at + delta + order.length) % order.length]);
  };

  const commit = (i: number) => {
    const option = options[i];
    if (!option || option.disabled) return;
    if (value === undefined) setInternal(option.value);
    onValueChange?.(option.value);
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); move(1); break;
      case 'ArrowUp': e.preventDefault(); move(-1); break;
      case 'Home': e.preventDefault(); setActive(options.indexOf(enabled[0])); break;
      case 'End': e.preventDefault(); setActive(options.indexOf(enabled[enabled.length - 1])); break;
      case 'Enter':
      case ' ': e.preventDefault(); commit(active); break;
      case 'Escape': e.preventDefault(); close(); break;
      case 'Tab': close(false); break;
      default:
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          const now = Date.now();
          typed.current.buffer = now - typed.current.at > 600 ? e.key : typed.current.buffer + e.key;
          typed.current.at = now;
          const q = typed.current.buffer.toLowerCase();
          const hit = enabled.find((o) => o.label.toLowerCase().startsWith(q));
          if (hit) setActive(options.indexOf(hit));
        }
    }
  };

  const state = disabled ? 'disabled' : errorText ? 'error' : 'default';

  return (
    <div className={cn('era-field', disabled && 'era-field--disabled', className)}>
      <span
        id={labelId}
        className="era-field__label"
        style={hideLabel ? { position: 'absolute', inlineSize: 1, blockSize: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' } : undefined}
      >
        {label}
        {required && <span className="era-field__required" aria-hidden="true">*</span>}
      </span>

      <div className="era-anchor" ref={anchor} style={{ display: 'block' }}>
        <div className={cn('era-field__box', `era-field__box--${size}`, 'era-field__box--select')} data-state={state}>
          <button
            ref={triggerRef}
            type="button"
            id={fieldId}
            className="era-select"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-labelledby={`${labelId} ${fieldId}`}
            aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
            aria-invalid={errorText ? true : undefined}
            aria-describedby={errorText || helperText ? messageId : undefined}
            aria-required={required || undefined}
            disabled={disabled}
            onClick={() => (open ? close(false) : openList())}
            onKeyDown={onKeyDown}
          >
            {current?.icon && <span className="era-surface__icon">{current.icon}</span>}
            <span className={cn('era-select__value', !current && 'era-select__value--placeholder')}>
              {current?.label ?? placeholder}
            </span>
            <svg className="era-select__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {open && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            className={cn('era-surface', 'era-surface--match-trigger', above ? 'era-surface--above' : 'era-surface--below', 'era-surface--start')}
          >
            {options.length === 0 && <li className="era-surface__empty">Nothing to choose from</li>}
            {options.map((o, i) => (
              <li
                key={o.value}
                id={`${uid}-opt-${i}`}
                role="option"
                data-index={i}
                data-active={i === active}
                aria-selected={o.value === selected}
                aria-disabled={o.disabled || undefined}
                className="era-surface__item"
                onPointerEnter={() => !o.disabled && setActive(i)}
                // pointerdown rather than click, so the list does not close
                // from the outside-click handler before the choice lands.
                onPointerDown={(e) => { e.preventDefault(); commit(i); }}
              >
                <span className="era-surface__tick">{o.value === selected ? TICK : null}</span>
                {o.icon && <span className="era-surface__icon">{o.icon}</span>}
                <span className="era-surface__text">
                  {o.label}
                  {o.hint && <span className="era-surface__hint">{o.hint}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {name && <input type="hidden" name={name} value={selected} />}

      {(errorText || helperText) && (
        <p id={messageId} className={cn('era-field__message', errorText && 'era-field__message--error')} role={errorText ? 'alert' : undefined}>
          {errorText ?? helperText}
        </p>
      )}
    </div>
  );
}
