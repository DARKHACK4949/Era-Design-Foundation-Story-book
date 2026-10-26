import React, { useId, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import './tabs.css';

export interface TabItem {
  id: string;
  label: string;
  /** Rendered after the label. For a queue count, not for decoration. */
  count?: number;
  disabled?: boolean;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  /** Names the tab strip for assistive tech. */
  label: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, label, className }: TabsProps) {
  const uid = useId();
  const [active, setActive] = useState(defaultTab ?? tabs.find((t) => !t.disabled)?.id ?? tabs[0]?.id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const enabled = tabs.filter((t) => !t.disabled);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = enabled.findIndex((t) => t.id === active);
    if (i < 0) return;
    const go = (n: number) => {
      e.preventDefault();
      const next = enabled[(n + enabled.length) % enabled.length];
      setActive(next.id);
      refs.current[next.id]?.focus();
    };
    if (e.key === 'ArrowRight') go(i + 1);
    else if (e.key === 'ArrowLeft') go(i - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(enabled.length - 1);
  };

  return (
    <div className={cn('era-tabs', className)}>
      <div role="tablist" aria-label={label} className="era-tabs__list" onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(n) => { refs.current[t.id] = n; }}
            type="button"
            role="tab"
            id={`${uid}-tab-${t.id}`}
            className="era-tabs__tab"
            aria-selected={t.id === active}
            aria-controls={`${uid}-panel-${t.id}`}
            // Only the selected tab is reachable with Tab; the rest are reached
            // with the arrow keys, which is what the ARIA pattern expects.
            tabIndex={t.id === active ? 0 : -1}
            disabled={t.disabled}
            onClick={() => setActive(t.id)}
          >
            {t.label}
            {t.count !== undefined && <span className="era-tabs__count">{t.count}</span>}
          </button>
        ))}
      </div>
      {tabs.map((t) =>
        t.id === active ? (
          <div key={t.id} role="tabpanel" id={`${uid}-panel-${t.id}`} aria-labelledby={`${uid}-tab-${t.id}`} className="era-tabs__panel" tabIndex={0}>
            {t.content}
          </div>
        ) : null
      )}
    </div>
  );
}
