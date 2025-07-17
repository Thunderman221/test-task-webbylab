const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  const pageNumbers = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    pageNumbers.push(
      <button
        key="first"
        onClick={() => onPageChange(1)}
        className="pageButton"
      >
        1
      </button>
    );
    if (startPage > 2) {
      pageNumbers.push(
        <span key="ellipsis1" className="ellipsis">
          ...
        </span>
      );
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`pageButton ${currentPage === i ? "activePage" : ""}`}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="ellipsis2" className="ellipsis">
          ...
        </span>
      );
    }
    pageNumbers.push(
      <button
        key="last"
        onClick={() => onPageChange(totalPages)}
        className="pageButton"
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pageButton"
      >
        Previous
      </button>

      {pageNumbers}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pageButton"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
