import { cn } from '../../lib/cn';
import './skeleton.css';

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ variant = 'text', width, height, className }: SkeletonProps) {
  return (
    <span
      className={cn('era-skeleton', `era-skeleton--${variant}`, className)}
      style={{ display: 'block', inlineSize: width, blockSize: height }}
      aria-hidden="true"
    />
  );
}

export interface SkeletonGroupProps {
  /** What is loading, for assistive tech. The boxes themselves say nothing. */
  label: string;
  loading: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Marks the region busy while the placeholders are up, so a screen reader is
 *  told once that something is loading instead of nothing at all. */
export function SkeletonGroup({ label, loading, children, className }: SkeletonGroupProps) {
  return (
    <div className={cn('era-skeleton-group', className)} aria-busy={loading || undefined} aria-label={loading ? label : undefined} role={loading ? 'status' : undefined}>
      {children}
    </div>
  );
}
