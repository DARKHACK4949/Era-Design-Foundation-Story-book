import React, { useId } from 'react';
import { cn } from '../../lib/cn';
import './tooltip.css';

export interface TooltipProps {
  /** Short. If it needs a sentence with a comma in it, this is the wrong component. */
  label: string;
  placement?: 'top' | 'bottom';
  children: React.ReactElement;
  className?: string;
}

export function Tooltip({ label, placement = 'top', children, className }: TooltipProps) {
  const id = useId();

  return (
    <span className={cn('era-tooltip', className)}>
      {/* aria-describedby rather than aria-label, so the control keeps its own
          accessible name and the tooltip is read as extra detail. */}
      {React.cloneElement(children, { 'aria-describedby': id } as Record<string, unknown>)}
      <span id={id} role="tooltip" className={cn('era-tooltip__bubble', placement === 'bottom' && 'era-tooltip__bubble--bottom')}>
        {label}
      </span>
    </span>
  );
}
