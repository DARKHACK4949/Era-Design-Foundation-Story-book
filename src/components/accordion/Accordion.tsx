import React from 'react';
import { cn } from '../../lib/cn';
import './accordion.css';

export interface AccordionItem {
  id: string;
  label: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Opening one closes the others. Leave it off when people need to compare sections. */
  exclusive?: boolean;
  className?: string;
}

export function Accordion({ items, exclusive = false, className }: AccordionProps) {
  // A shared name is how <details> does exclusivity natively, with no state to
  // keep in sync.
  const groupName = React.useId();

  return (
    <div className={cn('era-accordion', className)}>
      {items.map((item) => (
        <details
          key={item.id}
          className="era-accordion__item"
          open={item.defaultOpen}
          {...(exclusive ? { name: groupName } : {})}
        >
          <summary className="era-accordion__summary">
            <svg className="era-accordion__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="era-accordion__label">{item.label}</span>
          </summary>
          <div className="era-accordion__panel">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
