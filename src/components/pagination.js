import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const PaginationComponent = ({
  resultPerPage,
  totalResults,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(totalResults / resultPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination
      className="d-flex justify-content-center mt-5"
      page={currentPage}
      onChange={(e, newPage) => setCurrentPage(newPage)}
      count={pageNumbers.length + 1}
      showFirstButton
      showLastButton
    />
  );
};

export default PaginationComponent;
