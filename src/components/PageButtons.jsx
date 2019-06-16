import React from 'react';

const PageButtons = props => {
  const { pages, currentPage } = props;
  return (
    <div className="page-buttons">
      {pages.length > 1 &&
        pages.map((page, i) => {
          const pageNumber = i + 1;
          return (
            <button
              className="ui small basic icon button"
              key={`page${pageNumber}`}
              onClick={() => props.updatePage(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          );
        })}
    </div>
  );
};

export default PageButtons;
