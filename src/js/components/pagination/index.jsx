import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-wrap justify-center mt-6 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 text-sm rounded-md border transition-all duration-200 ${
            page === currentPage
              ? "bg-blue-600 text-white cursor-not-allowed border-blue-600"
              : "bg-white text-gray-700 hover:bg-blue-100 border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
