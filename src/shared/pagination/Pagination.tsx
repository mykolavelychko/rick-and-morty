import React from "react";

interface PaginationProps {
  pageInfo: {
    prev?: number;
    next?: number;
  };
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ pageInfo, onPageChange }: PaginationProps) => {
  return (
    <div>
      <button onClick={() => pageInfo.prev && onPageChange(pageInfo.prev)} disabled={!pageInfo.prev}>
        Previous
      </button>
      <button onClick={() => pageInfo.next && onPageChange(pageInfo.next)} disabled={!pageInfo.next}>
        Next
      </button>
    </div>
  );
};

export default Pagination;