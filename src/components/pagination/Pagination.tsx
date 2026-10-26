import { cn } from '../../lib/cn';
import './pagination.css';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Total rows, for the "showing x to y of z" line. */
  totalItems?: number;
  pageSize?: number;
  className?: string;
}

/** First, last, and a window of two either side of the current page. Anything
 *  skipped becomes a gap, so the control never grows with the page count. */
function pageList(page: number, count: number): Array<number | 'gap'> {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const out: Array<number | 'gap'> = [1];
  const from = Math.max(2, page - 1);
  const to = Math.min(count - 1, page + 1);
  if (from > 2) out.push('gap');
  for (let i = from; i <= to; i++) out.push(i);
  if (to < count - 1) out.push('gap');
  out.push(count);
  return out;
}

export function Pagination({ page, pageCount, onPageChange, totalItems, pageSize, className }: PaginationProps) {
  const pages = pageList(page, pageCount);
  const first = totalItems !== undefined && pageSize ? (page - 1) * pageSize + 1 : null;
  const last = totalItems !== undefined && pageSize ? Math.min(page * pageSize, totalItems) : null;

  return (
    <nav className={cn('era-pagination', className)} aria-label="Pagination">
      <button type="button" className="era-pagination__btn" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m10 4-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ol className="era-pagination__list">
        {pages.map((p, i) =>
          p === 'gap' ? (
            <li key={`gap-${i}`} className="era-pagination__gap" aria-hidden="true">
              &hellip;
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className="era-pagination__btn"
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ol>

      <button type="button" className="era-pagination__btn" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="Next page">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {first !== null && last !== null && (
        <span className="era-pagination__summary">
          {first} to {last} of {totalItems}
        </span>
      )}
    </nav>
  );
}
