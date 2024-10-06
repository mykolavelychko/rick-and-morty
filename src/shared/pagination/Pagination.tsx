import { PaginationButton, PaginationContainer } from "./Pagination.styles";

interface PaginationProps {
  pageInfo: {
    prev?: number;
    next?: number;
  };
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ pageInfo, onPageChange }: PaginationProps) => {
  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => pageInfo.prev && onPageChange(pageInfo.prev)}
        disabled={!pageInfo.prev}
      >
        Previous
      </PaginationButton>
      <PaginationButton
        onClick={() => pageInfo.next && onPageChange(pageInfo.next)}
        disabled={!pageInfo.next}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
