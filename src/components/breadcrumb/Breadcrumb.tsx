import { cn } from '../../lib/cn';
import './breadcrumb.css';

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: Crumb[];
  /** Collapses the middle when the trail gets long. The first and last always stay. */
  maxItems?: number;
  className?: string;
}

export function Breadcrumb({ items, maxItems = 4, className }: BreadcrumbProps) {
  let shown: Array<Crumb | 'ellipsis'> = items;
  if (items.length > maxItems) {
    shown = [items[0], 'ellipsis', ...items.slice(-(maxItems - 2))];
  }

  return (
    <nav className={cn('era-crumbs', className)} aria-label="Breadcrumb">
      <ol className="era-crumbs__list">
        {shown.map((item, i) => {
          if (item === 'ellipsis') {
            return (
              <li key="ellipsis" className="era-crumbs__item">
                <span className="era-crumbs__ellipsis" aria-hidden="true">
                  &hellip;
                </span>
              </li>
            );
          }
          const last = i === shown.length - 1;
          return (
            <li key={item.label} className="era-crumbs__item">
              {last || !item.href ? (
                // aria-current tells assistive tech which one is the page you
                // are on, which the visual weight only conveys to sighted users.
                <span className="era-crumbs__current" aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a className="era-crumbs__link" href={item.href}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
