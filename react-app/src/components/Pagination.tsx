import React from 'react';
import '../styles/Pagination.css';

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  showPrevious?: boolean;
  showNext?: boolean;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, showPrevious = true, showNext = true, className, ...props }, ref) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div ref={ref} className={`pagination-container ${className || ''}`} {...props}>
        {showPrevious && (
          <button
            className="pagination-item pagination-arrow"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-item pagination-number ${currentPage === page ? 'pagination-item--active' : ''}`}
            onClick={() => onPageChange?.(page)}
          >
            {page}
          </button>
        ))}

        {showNext && (
          <button
            className="pagination-item pagination-arrow"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
