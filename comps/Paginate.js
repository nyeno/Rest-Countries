import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  paginate,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="mt-8 lg:flex lg:justify-end lg:space-x-4 space-x-2 grid grid-cols-8">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`lg:px-4 px-2 py-2 rounded-lg shadow ${
              page == currentPage ? "bg-gray-200  dark:bg-dark-element " : ""
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
