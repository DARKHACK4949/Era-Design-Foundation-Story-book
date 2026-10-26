import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import '../../styles/surface.css';

export interface MenuItemDef {
  id: string;
  label: string;
  /** Second line. For consequences, not for restating the label. */
  hint?: string;
  icon?: React.ReactNode;
  /** Shown right-aligned. This is a reminder of a shortcut, it does not bind one. */
  shortcut?: string;
  disabled?: boolean;
  /** Destructive. Rendered in the error tone and kept away from the first position. */
  danger?: boolean;
  onSelect?: () => void;
}

export interface MenuGroup {
  /** Optional heading for the group. Groups without one just get a separator. */
  label?: string;
  items: MenuItemDef[];
}

export interface MenuProps {
  /** The control that opens the menu. It is cloned, so it keeps its own styling. */
  trigger: React.ReactElement;
  groups: MenuGroup[];
  align?: 'start' | 'end';
  /** Names the menu for assistive tech. */
  label: string;
  className?: string;
}

/**
 * A menu holds commands. Every item does something when chosen, which is what
 * separates it from a Select, where items are values and one of them is always
 * the current one.
 *
 * Keyboard follows the WAI-ARIA menu button pattern: Enter, Space or Down
 * opens and lands on the first item, Up opens on the last, arrows move, Home
 * and End jump, typing a letter jumps to the next item starting with it,
 * Escape closes and puts focus back on the trigger.
 */
export function Menu({ trigger, groups, align = 'start', label, className }: MenuProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [above, setAbove] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const typed = useRef({ buffer: '', at: 0 });

  const flat = groups.flatMap((g) => g.items);
  const enabled = flat.filter((i) => !i.disabled);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Open downwards unless there is not room, which matters for a menu at the
  // bottom of a table row.
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

  // Focus the highlighted item so the screen reader follows the highlight
  // rather than being left behind on the trigger.
  useEffect(() => {
    if (!open) return;
    const node = list.current?.querySelector<HTMLElement>(`[data-index='${active}']`);
    node?.focus();
  }, [open, active]);

  const openAt = (where: 'first' | 'last') => {
    const idx = where === 'first' ? flat.indexOf(enabled[0]) : flat.indexOf(enabled[enabled.length - 1]);
    setActive(Math.max(0, idx));
    setOpen(true);
  };

  const move = (delta: number) => {
    const order = enabled.map((i) => flat.indexOf(i));
    const at = order.indexOf(active);
    const next = order[(at + delta + order.length) % order.length];
    setActive(next);
  };

  const choose = (item: MenuItemDef) => {
    if (item.disabled) return;
    item.onSelect?.();
    close();
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); move(1); break;
      case 'ArrowUp': e.preventDefault(); move(-1); break;
      case 'Home': e.preventDefault(); setActive(flat.indexOf(enabled[0])); break;
      case 'End': e.preventDefault(); setActive(flat.indexOf(enabled[enabled.length - 1])); break;
      case 'Escape': e.preventDefault(); close(); break;
      case 'Tab': close(false); break;
      default:
        // Type-ahead. The buffer resets after a pause so "se" finds Settings
        // but a later "s" starts again rather than searching for "ses".
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          const now = Date.now();
          typed.current.buffer = now - typed.current.at > 600 ? e.key : typed.current.buffer + e.key;
          typed.current.at = now;
          const q = typed.current.buffer.toLowerCase();
          const hit = enabled.find((i) => i.label.toLowerCase().startsWith(q));
          if (hit) setActive(flat.indexOf(hit));
        }
    }
  };

  let index = -1;

  return (
    <div className={cn('era-anchor', className)} ref={anchor}>
      {React.cloneElement(trigger, {
        ref: triggerRef,
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': open ? `${uid}-menu` : undefined,
        onClick: (e: React.MouseEvent) => {
          (trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
          open ? close(false) : openAt('first');
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); openAt('first'); }
          if (e.key === 'ArrowUp') { e.preventDefault(); openAt('last'); }
        },
      } as Record<string, unknown>)}

      {open && (
        <div
          ref={list}
          id={`${uid}-menu`}
          role="menu"
          aria-label={label}
          aria-orientation="vertical"
          className={cn('era-surface', above ? 'era-surface--above' : 'era-surface--below', `era-surface--${align}`)}
          onKeyDown={onListKeyDown}
        >
          {groups.map((group, gi) => (
            <React.Fragment key={group.label ?? gi}>
              {gi > 0 && <hr className="era-surface__separator" />}
              {group.label && <div className="era-surface__group-label">{group.label}</div>}
              {group.items.map((item) => {
                index += 1;
                const i = index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    data-index={i}
                    data-active={i === active}
                    tabIndex={-1}
                    aria-disabled={item.disabled || undefined}
                    className={cn('era-surface__item', item.danger && 'era-surface__item--danger')}
                    onPointerEnter={() => !item.disabled && setActive(i)}
                    onClick={() => choose(item)}
                  >
                    {item.icon && <span className="era-surface__icon">{item.icon}</span>}
                    <span className="era-surface__text">
                      {item.label}
                      {item.hint && <span className="era-surface__hint">{item.hint}</span>}
                    </span>
                    {item.shortcut && <kbd className="era-surface__shortcut">{item.shortcut}</kbd>}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
