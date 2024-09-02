import React from 'react';

function PaginationComponent({ totalPages, currentPage, handlePageChange }) {
  const generatePageNumbers = () => {
    if (totalPages === 1) {
      return [1];
    }

    const pages = [];
    const siblingCount = 1;
    const minRange = Math.max(2, currentPage - siblingCount);
    const maxRange = Math.min(totalPages - 1, currentPage + siblingCount);

    pages.push(1);

    if (minRange > 2) {
      pages.push('...');
    }

    for (let i = minRange; i <= maxRange; i++) {
      pages.push(i);
    }

    if (maxRange < totalPages - 1) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = generatePageNumbers();


  if (pages == 0) {
    return;
  }

  return (
    <div className="flex justify-end mt-8">
      <div className="flex items-center">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 text-sm ${
              currentPage === page ? 'bg-uni-blue text-white' : 'text-black'
            } ${page === '...' ? 'cursor-default' : ''}`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default React.memo(PaginationComponent);
