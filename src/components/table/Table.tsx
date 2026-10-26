import React from 'react';
import { cn } from '../../lib/cn';
import './table.css';

export type SortDirection = 'asc' | 'desc';

export interface TableColumn<Row> {
  key: string;
  header: string;
  /** Right-aligns and uses tabular figures. Set this for money, counts and dates. */
  numeric?: boolean;
  sortable?: boolean;
  render: (row: Row) => React.ReactNode;
}

export interface TableProps<Row> {
  columns: Array<TableColumn<Row>>;
  rows: Row[];
  rowKey: (row: Row) => string;
  caption: string;
  /** Hide the caption visually. It stays in the accessibility tree either way. */
  hideCaption?: boolean;
  zebra?: boolean;
  sort?: { key: string; direction: SortDirection };
  onSortChange?: (key: string) => void;
  selectedKeys?: string[];
  className?: string;
}

const SORT_ICON = (
  <svg className="era-table__sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 2.5v7M3.25 6.75 6 9.5l2.75-2.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Table<Row>({
  columns,
  rows,
  rowKey,
  caption,
  hideCaption = true,
  zebra = false,
  sort,
  onSortChange,
  selectedKeys = [],
  className,
}: TableProps<Row>) {
  const selected = new Set(selectedKeys);

  return (
    <div className={cn('era-table-wrap', className)}>
      <table className={cn('era-table', zebra && 'era-table--zebra')}>
        <caption
          style={
            hideCaption
              ? { position: 'absolute', inlineSize: 1, blockSize: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }
              : { textAlign: 'start', padding: 'var(--spacing-space-12)', color: 'var(--sem-fg-secondary)' }
          }
        >
          {caption}
        </caption>
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sort?.key === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    'era-table__th',
                    col.numeric && 'era-table__th--numeric',
                    isSorted && 'era-table__th--sorted',
                    isSorted && sort?.direction === 'desc' && 'era-table__th--sorted-desc'
                  )}
                  // Tells assistive tech the current sort rather than leaving the
                  // arrow as a visual-only cue.
                  aria-sort={isSorted ? (sort?.direction === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  {col.sortable && onSortChange ? (
                    <button type="button" className="era-table__sort" onClick={() => onSortChange(col.key)}>
                      {col.header}
                      {SORT_ICON}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const key = rowKey(row);
            return (
              <tr key={key} className="era-table__tr" aria-selected={selected.has(key) || undefined}>
                {columns.map((col) => (
                  <td key={col.key} className={cn('era-table__td', col.numeric && 'era-table__td--numeric')}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
