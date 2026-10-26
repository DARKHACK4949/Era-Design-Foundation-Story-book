import { cn } from '../../lib/cn';
import './progress.css';

export interface ProgressProps {
  /** Leave undefined when the end is genuinely unknown. */
  value?: number;
  max?: number;
  label?: string;
  /** Hides the percentage while keeping the label. */
  hideValue?: boolean;
  tone?: 'default' | 'success' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

export function Progress({ value, max = 100, label, hideValue = false, tone = 'default', size = 'md', className }: ProgressProps) {
  const indeterminate = value === undefined;
  const pct = indeterminate ? 0 : Math.round((Math.min(Math.max(value, 0), max) / max) * 100);

  return (
    <div className={cn('era-progress', tone !== 'default' && `era-progress--${tone}`, indeterminate && 'era-progress--indeterminate', className)}>
      {(label || (!hideValue && !indeterminate)) && (
        <div className="era-progress__head">
          {label && <span>{label}</span>}
          {!hideValue && !indeterminate && <span className="era-progress__value">{pct}%</span>}
        </div>
      )}
      <div
        className={cn('era-progress__track', size === 'sm' && 'era-progress__track--sm')}
        role="progressbar"
        aria-label={label ?? 'Progress'}
        // An indeterminate progressbar omits aria-valuenow entirely; that
        // absence is what tells assistive tech the end is unknown.
        aria-valuenow={indeterminate ? undefined : pct}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : 100}
      >
        <div className="era-progress__fill" style={indeterminate ? undefined : { inlineSize: `${pct}%` }} />
      </div>
    </div>
  );
}
