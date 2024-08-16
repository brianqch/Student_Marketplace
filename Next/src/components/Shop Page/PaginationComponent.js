import React from 'react';

function PaginationComponent({ totalPages, currentPage, handlePageChange }) {
  const generatePageNumbers = () => {
    const pages = [];
    const siblingCount = 1; // Number of siblings on either side of the current page
    const minRange = Math.max(2, currentPage - siblingCount); // Start from 2 to always show first page
    const maxRange = Math.min(totalPages - 1, currentPage + siblingCount); // End at totalPages - 1 to always show last page

    // Always show the first page
    pages.push(1);

    // Add ellipsis before the current page range if necessary
    if (minRange > 2) {
      pages.push('...');
    }

    // Show pages around the current page
    for (let i = minRange; i <= maxRange; i++) {
      pages.push(i);
    }

    // Add ellipsis after the current page range if necessary
    if (maxRange < totalPages - 1) {
      pages.push('...');
    }

    // Always show the last page
    pages.push(totalPages);

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex justify-end mt-8">
      <div className="flex items-center">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 text-sm ${
              currentPage === page ? 'bg-uni-blue text-white' : 'text-black'
            } ${page === '...' ? 'cursor-default' : ''}`} // Disable pointer events for ellipsis
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
